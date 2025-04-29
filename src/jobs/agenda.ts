// agenda.ts
import { Agenda } from "agenda";
import dotenv from "dotenv";
import { defineSendEmailJob } from "./definitions/sendEmailJob";

dotenv.config();

const MONGO_URL = `${process.env.MONGO_URI}`;

export const agenda = new Agenda({
  db: { address: MONGO_URL, collection: "cronJobs" },
});

defineSendEmailJob(agenda);

export const startAgenda = async () => {
  await agenda.start();
};

export const stopAgenda = async () => {
  await agenda.stop();
};
