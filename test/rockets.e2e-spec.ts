import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { RocketsService } from '../src/modules/rockets/services/rockets.service';
import { RocketsModule } from '../src/modules/rockets/rockets.module';

describe('RocketsController (e2e)', () => {
  let app: INestApplication;

  const mockRocketsService = {
    getRocket: jest.fn(),
    updateCron: jest.fn(),
    list: jest.fn(),
  };

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [RocketsModule, AppModule],
    })
      .overrideProvider(RocketsService)
      .useValue(mockRocketsService)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  describe('GET: rockets/', () => {
    beforeEach(() => {
      jest.spyOn(mockRocketsService, 'list');
    });
    it('should return OK', async () => {
      await request(app.getHttpServer()).get('/rockets').expect(200, {});
    });
  });

  describe('GET: /rockets/:rocketId', () => {
    beforeEach(() => {
      jest.spyOn(mockRocketsService, 'getRocket');
    });
    it('should return OK', async () => {
      await request(app.getHttpServer())
        .get('/rockets/5e9d0d95eda69955f709d1eb')
        .expect(200, {});
    });
  });
});
