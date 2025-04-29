import { Request, Response, NextFunction } from "express";
import { verifyToken, getUserFromToken } from "../helpers/auth.helper";

declare module "express" {
  interface Request {
    userResponse?: ReturnType<typeof getUserFromToken>;
  }
}

export const LOGGED_IN_USER = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const authCookie = req.cookies.Authorization;

    if (!authCookie) {
      return res
        .status(403)
        .json({ message: "Please login again! Session expired.." })
        .end();
    }

    const accessToken = authCookie.split(" ")[1];

    if (!accessToken) {
      return res
        .status(403)
        .json({ message: "Please login again! Session expired.." })
        .end();
    }

    const isValidToken = verifyToken(accessToken);
    if (!isValidToken) {
      return res
        .status(401)
        .json({ message: "Please login again! Session expired.." })
        .end();
    }
    req.userResponse = getUserFromToken(accessToken);

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const ADMIN = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {

    const authCookie = req.cookies.Authorization;

    if (!authCookie) {
      return res
        .status(403)
        .json({ message: "Please login again! Session expired.." })
        .end();
    }

    const accessToken = authCookie.split(" ")[1];

    if (!accessToken) {
      return res
        .status(403)
        .json({ message: "Please login again! Session expired.." })
        .end();
    }

    const isValidToken = verifyToken(accessToken);
    if (!isValidToken) {
      return res
        .status(401)
        .json({ message: "Please login again! Session expired.." })
        .end();
    }

    const user = getUserFromToken(accessToken);
    
    if (!user.isAdmin) {
      return res
        .status(401)
        .json({ message: "Admin access required" })
        .end();
    }

    req.userResponse = user;

    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

