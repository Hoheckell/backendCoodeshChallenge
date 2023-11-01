import { Controller, Get, HttpCode, Query } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LaunchesService } from '../services/launches.service';
import { LaunchSearchDto } from '../dto/launch-search.dto';
import { LaunchesPaginatedDto } from '../dto/launches-paginated.dto';
import { ApiPaginatedResponse } from '../../../swagger/api-paginated-response.decorator';
import { PieGraphDto } from '../dto/pie-graph.dto';
import { BarGraphDto } from '../dto/bar-graph.dto';

@ApiTags('launches')
@Controller('launches')
export class LaunchesController {
  constructor(private readonly launchesService: LaunchesService) {}

  @Get()
  @HttpCode(200)
  @ApiOperation({ description: 'Obter Lançamentos' })
  @ApiPaginatedResponse({ status: 200 }, LaunchesPaginatedDto)
  async launchesList(
    @Query() launchSearchDto: LaunchSearchDto,
  ): Promise<LaunchesPaginatedDto> {
    return await this.launchesService.list(launchSearchDto);
  }

  @Get('/stats/pizza')
  @HttpCode(200)
  @ApiOperation({ description: 'Obter dados para o grafico de pizza' })
  @ApiOkResponse({ type: PieGraphDto })
  async launchesPizzaGraphStats(): Promise<PieGraphDto> {
    return await this.launchesService.launchesPizzaGraphStats();
  }

  @Get('/stats/bar')
  @HttpCode(200)
  @ApiOperation({ description: 'Obter dados para o grafico de barras' })
  @ApiOkResponse({ type: BarGraphDto })
  async launchesBarGraphStats(): Promise<BarGraphDto> {
    return await this.launchesService.launchesBarGraphStats();
  }
}
