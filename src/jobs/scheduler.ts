import { agenda } from "./agenda";

export const SEND_EMAIL_JOB = "send email"

export const scheduleEmailReminder = async (
  cron: string
) => {
  await agenda.every(cron, SEND_EMAIL_JOB, {});
};
