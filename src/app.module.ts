import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ScheduleModule } from '@nestjs/schedule';
import { ConfigModule } from '@nestjs/config';
import { LaunchesController } from './modules/launches/controllers/launches.controller';
import { LaunchesModule } from './modules/launches/launches.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LaunchesRepository } from './modules/launches/repositories/launches.repository';
import { LaunchesService } from './modules/launches/services/launches.service';
import {
  Launch,
  LaunchSchema,
} from './modules/launches/entities/Launch.schema';
import { TasksModule } from './modules/tasks/tasks.module';
import { RocketsRepository } from './modules/rockets/repositories/rockets.repository';
import { RocketsService } from './modules/rockets/services/rockets.service';
import { RocketsModule } from './modules/rockets/rockets.module';
import { RocketsController } from './modules/rockets/controllers/rockets.controller';
import { Rocket, RocketSchema } from './modules/rockets/entities/Rocket.schema';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGODB_URI),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forFeatureAsync([
      {
        name: Launch.name,
        useFactory: () => {
          const schema = LaunchSchema;
          return schema;
        },
      },
      {
        name: Rocket.name,
        useFactory: () => {
          const schema = RocketSchema;
          return schema;
        },
      },
    ]),
    ScheduleModule.forRoot(),
    LaunchesModule,
    RocketsModule,
    TasksModule,
  ],
  controllers: [AppController, LaunchesController, RocketsController],
  providers: [
    AppService,
    LaunchesService,
    LaunchesRepository,
    RocketsRepository,
    RocketsService,
  ],
})
export class AppModule {}
