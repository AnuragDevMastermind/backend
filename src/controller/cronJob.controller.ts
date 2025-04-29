import { Request, Response } from "express";
import { agenda } from "../jobs/agenda";
import { scheduleEmailReminder, SEND_EMAIL_JOB } from "../jobs/scheduler";

export const startEmailReminder = async (req: Request, res: Response) => {
  try {
    const existingJobs = await agenda.jobs({ name: SEND_EMAIL_JOB });
  
    if (existingJobs.length > 0) {
      return res.status(400).json({ message: "Job already running." });
    }

    const { cron } = req.body

    if (!cron) {
      return res.status(400).json({
        message: "Missing required field: cron",
      });
    }

    await scheduleEmailReminder(cron);

    res.json({ message: "Email reminder job started." });
  } catch (error) {
    console.error("Failed to start email reminder", error);
    res.status(500).json({ message: "Failed to start job", error });
  }
};

export const stopEmailReminder = async (req: Request, res: Response) => {
  try {
    await agenda.cancel({ name: SEND_EMAIL_JOB });
    res.json({ message: "Email reminder job stopped." });
  } catch (error) {
    console.error("Failed to stop email reminder", error);
    res.status(500).json({ message: "Failed to stop job", error });
  }
};
