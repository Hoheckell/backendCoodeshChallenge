import { Injectable } from '@nestjs/common';
import { LaunchesRepository } from '../repositories/launches.repository';
import { LaunchSearchDto } from '../dto/launch-search.dto';
import { LaunchesPaginatedDto } from '../dto/launches-paginated.dto';
import { PieGraphDto } from '../dto/pie-graph.dto';
import { RocketsService } from '../../rockets/services/rockets.service';
import { BarGraphDto } from '../dto/bar-graph.dto';
import { Launch } from '../entities/Launch.schema';

@Injectable()
export class LaunchesService {
  constructor(
    private readonly launchesRepository: LaunchesRepository,
    private readonly rocketService: RocketsService,
  ) {}

  async list(launchSearchDto: LaunchSearchDto): Promise<LaunchesPaginatedDto> {
    return await this.launchesRepository.listPaginated(launchSearchDto);
  }

  async updateCron(): Promise<void> {
    await this.launchesRepository.updateDatabase();
  }

  async launchesPizzaGraphStats(): Promise<PieGraphDto> {
    const data = await this.launchesRepository.listStats();
    const graphData: PieGraphDto = new PieGraphDto();
    graphData.labels = [];
    graphData.success = 0;
    graphData.fail = 0;
    graphData.datasets = [];
    graphData.datasets.push({
      label: 'Lançamentos de Foguetes',
      data: [],
      backgroundColor: [],
      borderColor: [],
    });

    const newrockets = this.getNewRocketsLaunches(data);
    const reuseds = this.getReusedRocketsLaunches(data);

    const rocketPromises = [];
    data.map((l) => {
      if (l?.success) {
        graphData.success += 1;
      } else {
        graphData.fail += 1;
      }
    });

    for (const [key, value] of newrockets) {
      rocketPromises.push(
        this.rocketService.getRocket(key).then((rocket) => {
          graphData.labels.push(rocket.name);
          graphData.datasets[0].data.push(value);
        }),
      );
    }

    for (const [key, value] of reuseds) {
      rocketPromises.push(
        this.rocketService.getRocket(key).then((rocket) => {
          const rockerName = 'Used ' + rocket.name;
          graphData.labels.push(rockerName);
          graphData.datasets[0].data.push(value);
        }),
      );
    }
    await Promise.all(rocketPromises);
    return graphData;
  }

  async launchesBarGraphStats(): Promise<BarGraphDto> {
    const graphData: BarGraphDto = new BarGraphDto();
    graphData.labels = [];
    graphData.datasets = [];
    const launchesByYear = await this.launchesRepository.listLauchesByYear();
    const rocketTimes = [];
    const rocketNamesSet = new Set<string>();

    await Promise.all(
      launchesByYear.map(async (l) => {
        const year = l._id.year;
        graphData.labels.push(year);
        for (const r of l.results) {
          const rocket = await this.rocketService.getRocket(r.rocket);
          const reused = r.cores[0].reused;
          const rocketName = reused ? 'Used ' + rocket.name : rocket.name;

          // Update rocketTimes
          const existingRocketTime = rocketTimes.find(
            (x) => x.rocket === rocketName && x.year == year,
          );
          if (existingRocketTime) {
            existingRocketTime.times += 1;
          } else {
            rocketTimes.push({
              rocket: rocketName,
              year: year,
              times: 1,
            });
          }

          if (!rocketNamesSet.has(rocketName)) {
            graphData.datasets.push({
              label: rocketName,
              data: [],
              backgroundColor: this.random_rgba(),
              stack: 'Stack 0',
            });
            rocketNamesSet.add(rocketName);
          }
        }
      }),
    );
    rocketTimes.sort((a, b) => a.year - b.year);
    graphData.labels.sort((a, b) => a - b);

    graphData.labels.forEach((e, i) => {
      graphData.datasets.map((ds) => {
        rocketTimes.forEach((rt) => {
          if (ds.label == rt.rocket && rt.year == e) ds.data[i] = rt.times;
        });
      });
    });

    return graphData;
  }

  random_rgba() {
    const colors = [
      'rgba(0, 0, 0, 1)',
      'rgba(245, 124, 0, 1)',
      'rgba(18, 103, 252, 1)',
      'rgba(217, 217, 217, 1)',
      'rgba(250, 243, 221, 1)',
      'rgba(255, 159, 64, 1)',
    ];
    const num = Math.floor(Math.random() * 6);

    return colors[num];
  }

  getReusedRocketsLaunches(launches: Launch[]): Map<string, number> {
    const reuseds = new Map<string, number>();
    if (launches?.length > 0) {
      launches.map((l) => {
        if (l.cores[0].reused) {
          if (!reuseds.has(l.rocket)) {
            reuseds.set(l.rocket, 1);
          } else {
            const value = reuseds.get(l.rocket);
            reuseds.set(l.rocket, value + 1);
          }
        }
      });
    }

    return reuseds;
  }

  getNewRocketsLaunches(launches: Launch[]): Map<string, number> {
    const newRockets = new Map<string, number>();
    if (launches?.length > 0) {
      launches.map((l) => {
        if (!l.cores[0].reused) {
          if (!newRockets.has(l.rocket)) {
            newRockets.set(l.rocket, 1);
          } else {
            const value = newRockets.get(l.rocket);
            newRockets.set(l.rocket, value + 1);
          }
        }
      });
    }
    return newRockets;
  }
}
