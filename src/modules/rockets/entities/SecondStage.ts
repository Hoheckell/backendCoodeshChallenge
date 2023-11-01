import { Payload } from './Payload';
import { Thrust } from './Thrust';

export class SecondStage {
  thrust: Thrust;

  payloads: Payload;

  reusable: boolean;

  engines: number;

  fuel_amount_tons: number;

  burn_time_sec: number;
}
