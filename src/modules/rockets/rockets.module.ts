import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RocketsRepository } from './repositories/rockets.repository';
import { RocketsService } from './services/rockets.service';
import { RocketsController } from './controllers/rockets.controller';
import { Rocket, RocketSchema } from './entities/Rocket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rocket.name, schema: RocketSchema }]),
  ],
  controllers: [RocketsController],
  providers: [RocketsRepository, RocketsService],
})
export class RocketsModule {}
