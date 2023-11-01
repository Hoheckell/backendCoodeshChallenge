import { createMock } from '@golevelup/ts-jest';
import { RocketsService } from './rockets.service';
import { RocketsRepository } from '../repositories/rockets.repository';
import { RocketStub } from '../../../../test/stubs/rocket.stub';

describe('RocketsService', () => {
  const mockedRocketsRepository = createMock<RocketsRepository>();
  let service: RocketsService;

  beforeEach(async () => {
    service = new RocketsService(mockedRocketsRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getRocket', () => {
    it('should have a rocket by id', async () => {
      mockedRocketsRepository.getRocket.mockResolvedValue(RocketStub);
      const rocket = await service.getRocket('5e9d0d95eda69955f709d1eb');
      expect(rocket.id).toBe('5e9d0d95eda69955f709d1eb');
      expect(mockedRocketsRepository.getRocket).toBeCalledTimes(1);
    });
  });

  describe('UpdateCron', () => {
    it('should execute updatecron method', async () => {
      mockedRocketsRepository.updateDatabase.mockResolvedValue();
      const nothing = await service.updateCron();
      expect(nothing).toBeUndefined();
      expect(mockedRocketsRepository.updateDatabase).toBeCalledTimes(1);
    });
  });

  describe('list', () => {
    it('should get a list of rockets', async () => {
      mockedRocketsRepository.list.mockResolvedValue([RocketStub]);
      await service.list();
      expect(mockedRocketsRepository.list).toBeCalledTimes(1);
    });
  });
});
