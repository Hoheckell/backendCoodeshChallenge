import { Injectable } from '@nestjs/common';
import { RocketsRepository } from '../repositories/rockets.repository';
import { Rocket } from '../entities/Rocket.schema';
import { RocketDto } from '../dto/rocket.dto';

@Injectable()
export class RocketsService {
  constructor(private readonly rocketsRepository: RocketsRepository) {}

  async getRocket(rocket: string): Promise<Rocket> {
    return await this.rocketsRepository.getRocket(rocket);
  }

  async updateCron(): Promise<void> {
    await this.rocketsRepository.updateDatabase();
  }

  async list(): Promise<RocketDto[]> {
    return await this.rocketsRepository.list();
  }
}
