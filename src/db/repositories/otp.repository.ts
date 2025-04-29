import { OtpModel } from "../../models/otp.model";

export const createOtp = (
  values: Record<string, any>
) => new OtpModel(values).save().then((otp) => otp.toObject());

export const getLatestOtpByNumber = (
  phoneNumber: string
) => OtpModel.aggregate([
  { $match: { phoneNumber } },
  { $sort: { createdAt: -1 } },
  { $limit: 1 }
]).then(results => results[0] || null);

export const deleteAllOtp = (
  phoneNumber: string
) => OtpModel.deleteMany({ phoneNumber });