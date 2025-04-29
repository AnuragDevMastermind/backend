import mongoose, { Schema, Document } from "mongoose";

export type Otp = {
  phoneNumber: string;
  otp: string;
  expiresAt: Date;
};

interface OtpDocument extends Document, Otp {}

const otpSchema = new Schema<OtpDocument>(
  {
    phoneNumber: { type: String, required: true },
    otp: { type: String, required: true },
    expiresAt: { type: Date, required: true },
  },
  { versionKey: false, timestamps: true }
);

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const OtpModel = mongoose.model<OtpDocument>("Otp", otpSchema);
