import { Types } from "mongoose";
import { AuditLogModel } from "../../models/auditLog.model";

export const createAuditLog = (
  values: Record<string, any>
) => new AuditLogModel(values).save().then((log) => log.toObject());

export const activeUsers = (
  userId: string,
  month: number,
  year: number
) => AuditLogModel.aggregate([
  {
    $match: {
      userId: new Types.ObjectId(userId),
      actionType: "login",
      $expr: {
        $and: [
          {
            $eq: [{ $month: "$timestamp" }, month] 
          },
          {
            $eq: [{ $year: "$timestamp" }, year] 
          }
        ]
      }
    }
  },
  {
    $group: {
      _id: {
        day: { $dayOfMonth: "$timestamp" },
        month: { $month: "$timestamp" },
        year: { $year: "$timestamp" }
      }
    }
  },
  {
    $count: "activeDays"
  }
]).then(results => results[0] || { activeDays: 0});