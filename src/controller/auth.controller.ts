import { Request, Response } from "express";

import bcrypt from "bcryptjs";
import { createAuditLog } from "../db/repositories/auditLog.repository";
import { createOtp, deleteAllOtp, getLatestOtpByNumber } from "../db/repositories/otp.repository";
import {
  createUser,
  getUserByNumber
} from "../db/repositories/user.respository";
import { generateToken, verifyToken } from "../helpers/auth.helper";
import { generateOtp } from "../helpers/otp.helper";
import { UserResponse } from "../models/user.model";
import { LoginResponse, LoginStatusResponse } from "../types/response.types";

export const login = async (req: Request, res: Response<LoginResponse>) => {
  try {
    const { number, password } = req.body;

    if (!number || !password) {
      return res.status(400).json({
        message: "Number and password are required."
      });
    }

    const user = await getUserByNumber(number).select("+password");
    if (!user) {
      return res.status(400).json({
        message: "User not found."
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(403).json({
        message: "Invalid password."
      });
    }

    const userResponse: UserResponse = {
      _id: user.id,
      number: user.number,
      name: user.name,
      isAdmin: user.isAdmin
    };

    const { accessToken } = await generateToken(userResponse);

    res.cookie("Authorization", `Bearer ${accessToken}`, {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      sameSite: "none",
      secure: false,
      path: "/",
      httpOnly: true,
    });

    await createAuditLog({
      userId: user.id,
      actionType: "login",
      timestamp: new Date()
    })


    return res.status(200).json({
      message: "Logged in successfully.",
    });

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: `Internal Server Error`
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { number } = req.body;
    if (!number) {
      return res.status(400).json({
        message: "Number is required."
      });
    }

    const existingUser = await getUserByNumber(number);

    if (existingUser) {
      return res.status(400).json({
        message: "User already exist."
      });
    }

    const otpExpiryInMilliseconds = parseInt(process.env.OTP_EXPIRY_IN_MINUTES || '5', 10) * 60 * 1000;

    const otpData = {
      phoneNumber: number,
      otp: generateOtp(),
      expiresAt: new Date(Date.now() + otpExpiryInMilliseconds),
    };

    const otp = await createOtp(otpData);

    if (!otp) {
      return res.status(500).json({
        message: "Failed to generate OTP.",
      });
    }

    return res.status(200).json({
      message: "OTP sent successfully.",
    });

  } catch (error) {
    console.error("Error creating audit log:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

export const submitOtp = async (req: Request, res: Response) => {
  try {
    const { user, otp } = req.body;

    if (!user || !otp) {
      return res.status(400).json({ message: "User details or OTP missing." });
    }

    const { name, number, password } = user;

    if (!name || !number || !password) {
      return res.status(400).json({ message: "Incomplete user details." });
    }

    const otpObj = await getLatestOtpByNumber(number);

    if (!otpObj) {
      return res.status(400).json({ message: "OTP expired or not found." });
    }

    if (otp !== otpObj.otp) {
      return res.status(400).json({ message: "Incorrect OTP. Please try again." });
    }

    const createdUser = await createUser(user);

    await Promise.all([
      deleteAllOtp(number),
      createAuditLog({
        userId: createdUser._id,
        actionType: "signup",
        timestamp: new Date()
      })
    ]);


    return res.status(201).json({
      message: "Registration successful! Please log in.",
    });

  } catch (error) {
    console.error("Error in submitOtp:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};

export const isUserLoggedIn = async (req: Request, res: Response<LoginStatusResponse>) => {
  const authorization = req.cookies.Authorization;

  if (!authorization) {
    return res.status(200).json({
      data: { isUserLoggedIn: false }
    });
  }

  const accessToken = authorization.split(" ")[1];

  if (!accessToken) {
    return res.status(200).json({
      data: { isUserLoggedIn: false }
    });
  }

  const isValidToken = verifyToken(accessToken);
  if (!isValidToken) {
    return res.status(200).json({
      data: { isUserLoggedIn: false }
    });
  }


  return res.status(200).json({
    data: { isUserLoggedIn: true }
  });
};


export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie("Authorization", {
      path: "/",
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};