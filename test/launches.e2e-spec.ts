import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { LaunchesModule } from '../src/modules/launches/launches.module';
import { LaunchesService } from '../src/modules/launches/services/launches.service';
import { AppModule } from '../src/app.module';

describe('LaunchesController (e2e)', () => {
  let app: INestApplication;

  const mockLaunchesService = {
    launchesPizzaGraphStats: jest.fn(),
    list: jest.fn(),
    updateCron: jest.fn(),
    launchesBarGraphStats: jest.fn(),
    getReusedRocketsLaunches: jest.fn(),
    getNewRocketsLaunches: jest.fn(),
    random_rgba: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LaunchesModule, AppModule],
    })
      .overrideProvider(LaunchesService)
      .useValue(mockLaunchesService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('GET: launches/', () => {
    beforeEach(() => {
      jest.spyOn(mockLaunchesService, 'list');
    });
    it('should return OK', async () => {
      await request(app.getHttpServer()).get('/launches').expect(200, {});
    });
  });

  describe('GET: launches/stats/pizza', () => {
    beforeEach(() => {
      jest.spyOn(mockLaunchesService, 'launchesPizzaGraphStats');
    });
    it('should return OK', async () => {
      await request(app.getHttpServer())
        .get('/launches/stats/pizza')
        .expect(200, {});
    });
  });

  describe('GET: launches/stats/bar', () => {
    beforeEach(() => {
      jest.spyOn(mockLaunchesService, 'launchesBarGraphStats');
    });
    it('should return OK', async () => {
      await request(app.getHttpServer())
        .get('/launches/stats/bar')
        .expect(200, {});
    });
  });
});
