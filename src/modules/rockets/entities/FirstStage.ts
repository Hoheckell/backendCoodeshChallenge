import { Thrust } from './Thrust';

export class FirstStage {
  thrust_sea_level: Thrust;

  thrust_vacuum: Thrust;

  reusable: boolean;

  engines: number;

  fuel_amount_tons: number;

  burn_time_sec: number;
}
