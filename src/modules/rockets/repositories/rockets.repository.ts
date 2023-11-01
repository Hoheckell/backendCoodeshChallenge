import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { Rocket } from '../entities/Rocket.schema';
import { RocketDto } from '../dto/rocket.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as moment from 'moment';

@Injectable()
export class RocketsRepository {
  constructor(
    @InjectModel(Rocket.name)
    private rocketModel: Model<Rocket>,
  ) {}

  async list(): Promise<RocketDto[]> {
    const updated = await this.wasUpdatedToday();

    if (!updated) {
      await this.updateDatabase();
    }
    return await this.rocketModel.find().lean();
  }

  async getRockets() {
    return await axios
      .get(`https://api.spacexdata.com/v4/rockets`, {
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
            'Problemas com a api de foguetes',
            err.response.status,
          );
        } else if (err.request) {
          console.log(err.request);
        } else {
          console.log('Error', err.message);
        }
      });
  }
  async getRocket(rocket: string): Promise<Rocket> {
    const updated = await this.wasUpdatedToday();

    if (!updated) {
      await this.updateDatabase();
    }
    return await this.rocketModel.findOne({ id: rocket }).lean();
  }

  async updateDatabase(): Promise<void> {
    const rockets = await this.getRockets();
    await Promise.all(
      rockets.map(async (r) => {
        await this.rocketModel.findOneAndUpdate({ id: r.id }, r, {
          upsert: true,
        });
      }),
    );
  }

  async wasUpdatedToday(): Promise<boolean> {
    const today = moment().startOf('day');
    const todayList = await this.rocketModel
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
}
