import mongoose, { Schema, Document, Types } from "mongoose";

export type AuditLog = {
  userId: Types.ObjectId;
  actionType: string;
  timestamp: Date;
};

interface AuditLogDocument extends Document, AuditLog { }

const auditLogSchema = new Schema<AuditLogDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    actionType: {
      type: String,
      enum: ['login', 'signup', 'logout'],
      required: true
    },
    timestamp: { type: Date, required: true, default: Date.now },
  },
  { versionKey: false, timestamps: false }
);

export const AuditLogModel = mongoose.model<AuditLogDocument>("AuditLog", auditLogSchema);
