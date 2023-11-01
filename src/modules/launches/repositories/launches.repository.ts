import { Model } from 'mongoose';
import { Launch } from '../entities/Launch.schema';
import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LaunchesPaginatedDto } from '../dto/launches-paginated.dto';
import axios from 'axios';
import * as moment from 'moment';
import { LaunchSearchDto } from '../dto/launch-search.dto';
import { LaunchesByYearDto } from '../dto/launches-by-year.dto';

@Injectable()
export class LaunchesRepository {
  constructor(
    @InjectModel(Launch.name)
    private launchModel: Model<Launch>,
  ) {}

  async listPaginated(
    launchSearchDto: LaunchSearchDto,
  ): Promise<LaunchesPaginatedDto> {
    const paginatedResult: LaunchesPaginatedDto = new LaunchesPaginatedDto();
    const updated = await this.wasUpdatedToday();

    if (!updated) {
      await this.updateDatabase();
    }

    const query = launchSearchDto?.search
      ? { $text: { $search: launchSearchDto.search } }
      : {};

    paginatedResult.results = await this.launchModel
      .find(query)
      .limit(launchSearchDto.limit)
      .skip(launchSearchDto.offset)
      .lean();

    paginatedResult.totalDocs = await this.launchModel.find(query).count();
    paginatedResult.page =
      launchSearchDto?.offset > 0
        ? launchSearchDto.offset / launchSearchDto.limit + 1
        : 1;
    const totalPages =
      Number((paginatedResult.totalDocs / launchSearchDto.limit).toFixed(0)) ??
      1;
    paginatedResult.totalPages = totalPages == 0 ? 1 : totalPages;
    paginatedResult.hasNext =
      paginatedResult.page <= paginatedResult.totalPages &&
      paginatedResult.totalPages > 1;
    paginatedResult.hasPrev = paginatedResult.page > 1;

    return paginatedResult;
  }

  async getLaunches(): Promise<Launch[]> {
    return await axios
      .get('https://api.spacexdata.com/v5/launches', {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        }
      })
      .catch((err) => {
        if (err.response) {
          throw new HttpException(
            'Problemas com a api de lançamentos',
            err.response.status,
          );
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
      });
  }

  async updateDatabase(): Promise<void> {
    const launches = await this.getLaunches();
    await Promise.all(
      launches.map(async (l) => {
        await this.launchModel.findOneAndUpdate({ id: l.id }, l, {
          upsert: true,
        });
      }),
    );
  }

  async wasUpdatedToday(): Promise<boolean> {
    const today = moment().startOf('day');
    const todayList = await this.launchModel
      .find({
        $or: [
          {
            created_at: {
              $gte: today.toDate(),
              $lte: moment(today).endOf('day').toDate(),
            },
          },
          {
            updated_at: {
              $gte: today.toDate(),
              $lte: moment(today).endOf('day').toDate(),
            },
          },
        ],
      })
      .count();
    if (todayList > 0) {
      return true;
    }
    return false;
  }

  async listStats(): Promise<Launch[]> {
    const updated = await this.wasUpdatedToday();

    if (!updated) {
      await this.updateDatabase();
    }
    return await this.launchModel.find().lean();
  }

  async listLauchesByYear(): Promise<LaunchesByYearDto[]> {
    const launches = await this.launchModel.aggregate([
      {
        $group: {
          _id: {
            year: {
              $year: {
                $dateFromString: {
                  dateString: '$date_utc',
                },
              },
            },
          },
          results: { $push: '$$ROOT' },
        },
      },
    ]);
    return launches.sort((a, b) => a._id.year - b._id.year);
  }
}
