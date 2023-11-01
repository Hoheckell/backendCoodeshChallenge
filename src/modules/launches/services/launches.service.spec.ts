import { LaunchesService } from './launches.service';
import { LaunchesRepository } from '../repositories/launches.repository';
import { createMock } from '@golevelup/ts-jest';
import { RocketsService } from '../../rockets/services/rockets.service';
import { LaunchSearchDto } from '../dto/launch-search.dto';
import { Rocket } from '../../rockets/entities/Rocket.schema';
import { LaunchStub } from '../../../../test/stubs/launch.stub';

describe('LaunchesService', () => {
  const mockedLaunchesRepository = createMock<LaunchesRepository>();
  const mockedRocketsService = createMock<RocketsService>();
  let service: LaunchesService;

  beforeEach(async () => {
    service = new LaunchesService(
      mockedLaunchesRepository,
      mockedRocketsService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('list', () => {
    it('should have list of launches', async () => {
      const launchSearchDto = new LaunchSearchDto();
      launchSearchDto.search = 'a';
      mockedLaunchesRepository.listPaginated.mockResolvedValue({
        results: [],
        totalDocs: 0,
        page: 1,
        totalPages: null,
        hasNext: false,
        hasPrev: false,
      });
      const paginated = await service.list(launchSearchDto);
      expect(paginated.page).toBe(1);
      expect(mockedLaunchesRepository.listPaginated).toBeCalledTimes(1);
    });
  });

  describe('UpdateCron', () => {
    it('should execute updatecron methos', async () => {
      mockedLaunchesRepository.updateDatabase.mockResolvedValue();
      const nothing = await service.updateCron();
      expect(nothing).toBeUndefined();
      expect(mockedLaunchesRepository.updateDatabase).toBeCalledTimes(1);
    });
  });

  describe('launchesPizzaGraphStats', () => {
    it('should get pizza graph data', async () => {
      mockedLaunchesRepository.listStats.mockResolvedValue([{ ...LaunchStub }]);
      mockedRocketsService.getRocket.mockResolvedValue(new Rocket());
      await service.launchesPizzaGraphStats();
      expect(mockedLaunchesRepository.listStats).toBeCalledTimes(1);
      expect(mockedRocketsService.getRocket).toBeCalledTimes(1);
    });
  });
  describe('launchesBarGraphStats', () => {
    it('should get bar graph data', async () => {
      mockedLaunchesRepository.listLauchesByYear.mockResolvedValue([
        {
          _id: { year: 2018 },
          results: [{ ...LaunchStub }],
        },
      ]);
      mockedRocketsService.getRocket.mockResolvedValue(new Rocket());
      await service.launchesBarGraphStats();
      expect(mockedLaunchesRepository.listLauchesByYear).toBeCalledTimes(1);
      expect(mockedRocketsService.getRocket).toBeCalledTimes(2);
    });
  });
});
