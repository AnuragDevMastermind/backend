import { Agenda, Job } from "agenda";
import { inActiveSpenders, overspentUsers } from "../../db/repositories/user.respository";
import { SEND_EMAIL_JOB } from "../scheduler";

export const defineSendEmailJob = (agenda: Agenda) => {
  agenda.define(SEND_EMAIL_JOB, async (job: Job<any>) => {

    const overspentUsersArr = (await overspentUsers()).map(user => ({
      ...user,
      _id: user._id.toString()
    }));

    const inActiveSpendersArr = (await inActiveSpenders()).map(user => ({
      ...user,
      _id: user._id.toString()
    }));

    console.log({
      overspentUsersArr,
      inActiveSpendersArr
    });

  });
};
