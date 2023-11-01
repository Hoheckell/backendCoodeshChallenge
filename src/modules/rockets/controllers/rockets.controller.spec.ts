import { Test, TestingModule } from '@nestjs/testing';
import { RocketsController } from './rockets.controller';
import { RocketsService } from '../services/rockets.service';

describe('ControllersController', () => {
  let controller: RocketsController;
  let service: RocketsService;

  beforeEach(async () => {
    const ApiServiceProvider = {
      provide: RocketsService,
      useFactory: () => ({
        getRocket: jest.fn(() => []),
        list: jest.fn(() => []),
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RocketsController],
      providers: [RocketsService, ApiServiceProvider],
    }).compile();

    controller = module.get<RocketsController>(RocketsController);
    service = module.get<RocketsService>(RocketsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  it('calling rocketsList method', () => {
    controller.rocketsList();
    expect(service.list).toHaveBeenCalled();
  });

  it('calling getRocket method', () => {
    controller.getRocket('rocket');
    expect(service.getRocket).toHaveBeenCalled();
  });
});
