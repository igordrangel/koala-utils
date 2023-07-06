import { diff } from "../operators/date";
import { KlAbstract } from "./KlAbstract";

export class KlCron extends KlAbstract<number> {
  private startDate?: Date;
  private endDate?: Date;

  constructor() {
    super(0);
  }

  start() {
    this.startDate = new Date();
    return this;
  }

  end() {
    this.endDate = new Date();
    return this;
  }

  duration() {
    if (!this.startDate) throw new Error("The cron is not started.");
    if (!this.endDate) throw new Error("The cron is not ended.");

    this.value = diff(this.startDate, this.endDate, "seconds");

    return this;
  }
}
