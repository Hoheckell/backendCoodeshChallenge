import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { LaunchesService } from '../../launches/services/launches.service';
import { RocketsService } from '../../rockets/services/rockets.service';

@Injectable()
export class TasksService {
  constructor(
    private launchesService: LaunchesService,
    private rocketsService: RocketsService,
  ) {}

  private readonly logger = new Logger(TasksService.name);

  @Cron('0 0 9 * * *')
  async handleCron() {
    await this.launchesService.updateCron();
    await this.rocketsService.updateCron();
    this.logger.warn('Launches/Rockets Updated');
  }
}
