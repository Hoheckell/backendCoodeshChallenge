import { Module } from '@nestjs/common';
import { LaunchesController } from './controllers/launches.controller';
import { LaunchesService } from './services/launches.service';
import { Launch, LaunchSchema } from './entities/Launch.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LaunchesRepository } from './repositories/launches.repository';
import { RocketsRepository } from '../rockets/repositories/rockets.repository';
import { RocketsService } from '../rockets/services/rockets.service';
import { Rocket, RocketSchema } from '../rockets/entities/Rocket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Launch.name, schema: LaunchSchema },
      { name: Rocket.name, schema: RocketSchema },
    ]),
  ],
  controllers: [LaunchesController],
  providers: [
    LaunchesService,
    LaunchesRepository,
    RocketsRepository,
    RocketsService,
  ],
})
export class LaunchesModule {}
