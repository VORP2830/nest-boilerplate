import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class HealthService {
  constructor() {}

  //@Cron('* * * * *')
  handleCron() {
    console.log("Cron job em execução")
  }
}
