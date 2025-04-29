import { Request, Response } from "express";
import { createAuditLog } from "../db/repositories/auditLog.repository";
import { UserResponse } from "../models/user.model";

export const createNewAuditLog = async (req: Request, res: Response) => {
  try {
    const userResponse = req.userResponse as UserResponse;
    let auditLog = req.body;
    auditLog.userId = userResponse._id
    const newLog = await createAuditLog(auditLog);
    res.status(201).json({
      message: "Audit log created successfully",
      data: newLog,
    });
  } catch (error) {
    console.error("Error creating audit log:", error);
    res.status(500).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};
