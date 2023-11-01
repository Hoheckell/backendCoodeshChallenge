import { Test, TestingModule } from '@nestjs/testing';
import { LaunchesController } from './launches.controller';
import { LaunchesService } from '../services/launches.service';
import { LaunchSearchDto } from '../dto/launch-search.dto';

describe('LaunchesController', () => {
  let controller: LaunchesController;
  let spyservice: LaunchesService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: LaunchesService,
      useFactory: () => ({
        list: jest.fn(() => []),
        launchesList: jest.fn(() => []),
        launchesPizzaGraphStats: jest.fn(() => []),
        launchesBarGraphStats: jest.fn(() => []),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LaunchesController],
      providers: [LaunchesService, ApiServiceProvider],
    }).compile();

    controller = module.get<LaunchesController>(LaunchesController);
    spyservice = module.get<LaunchesService>(LaunchesService);
  });

  it('define', () => {
    expect(LaunchesController).toBeDefined();
    expect(spyservice).toBeDefined();
  });

  it('calling launchesList method', async () => {
    const launchSearchDto = new LaunchSearchDto();
    launchSearchDto.search = 'a';
    await controller.launchesList(launchSearchDto);
    expect(spyservice.list).toHaveBeenCalled();
  });

  it('calling launchesPizzaGraphStats method', async () => {
    await controller.launchesPizzaGraphStats();
    expect(spyservice.launchesPizzaGraphStats).toHaveBeenCalled();
  });

  it('calling launchesBarGraphStats method', async () => {
    await controller.launchesBarGraphStats();
    expect(spyservice.launchesBarGraphStats).toHaveBeenCalled();
  });
});
