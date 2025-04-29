import { Request, Response } from "express";
import { createOtp } from "../db/repositories/otp.repository";
import { generateOtp } from "../helpers/otp.helper";
import { UserResponse } from "../models/user.model";

export const sendOtp = async (req: Request, res: Response) => {

  try {
    const userResponse = req.userResponse as UserResponse;

    const otpExpiryInMilliseconds = parseInt(process.env.OTP_EXPIRY_IN_MINUTES || '5', 10) * 60 * 1000;

    const otpData = {
      phoneNumber: userResponse.number,
      otp: generateOtp(),
      expiresAt: new Date(Date.now() + otpExpiryInMilliseconds),
    };

    const otp = await createOtp(otpData)

    res.status(201).json({
      message: "OTP created successfully",
      data: otp,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create OTP",
      error: (error as Error).message,
    });
  }
};
