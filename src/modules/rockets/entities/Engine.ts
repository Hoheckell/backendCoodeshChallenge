import { Isp } from './Isp';
import { Thrust } from './Thrust';

export class Engine {
  isp: Isp;

  thrust_sea_level: Thrust;

  thrust_vacuum: Thrust;

  number: number;

  type: string;

  version: string;

  layout: string;

  engine_loss_max: number;

  propellant_1: string;

  propellant_2: string;

  thrust_to_weight: number;
}
