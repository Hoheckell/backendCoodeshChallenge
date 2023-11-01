import { Controller, Get, HttpCode, Param } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RocketDto } from '../dto/rocket.dto';
import { RocketsService } from '../services/rockets.service';

@ApiTags('rockets')
@Controller('rockets')
export class RocketsController {
  constructor(private readonly rocketsService: RocketsService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ description: 'Obter Foguetes' })
  @ApiOkResponse({ type: RocketDto, isArray: true })
  async rocketsList(): Promise<RocketDto[]> {
    return await this.rocketsService.list();
  }

  @Get('/:rocketId')
  @HttpCode(200)
  @ApiOperation({ description: 'Obter Foguete' })
  @ApiOkResponse({ type: RocketDto })
  async getRocket(@Param('rocketId') rocketId: string): Promise<RocketDto> {
    return await this.rocketsService.getRocket(rocketId);
  }
}
