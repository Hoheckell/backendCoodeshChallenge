import { Module } from '@nestjs/common';
import { TasksService } from './services/tasks.service';
import { LaunchesService } from '../launches/services/launches.service';
import { LaunchesRepository } from '../launches/repositories/launches.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Launch, LaunchSchema } from '../launches/entities/Launch.schema';
import { RocketsService } from '../rockets/services/rockets.service';
import { RocketsRepository } from '../rockets/repositories/rockets.repository';
import { Rocket, RocketSchema } from '../rockets/entities/Rocket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Launch.name, schema: LaunchSchema },
      { name: Rocket.name, schema: RocketSchema },
    ]),
  ],
  providers: [
    TasksService,
    LaunchesService,
    LaunchesRepository,
    RocketsService,
    RocketsRepository,
  ],
})
export class TasksModule {}
