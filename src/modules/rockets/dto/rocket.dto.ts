import { Diameter } from '../entities/Diameter';
import { Engine } from '../entities/Engine';
import { FirstStage } from '../entities/FirstStage';
import { Height } from '../entities/Height';
import { LandingLegs } from '../entities/LandingLegs';
import { Mass } from '../entities/Mass';
import { PayloadWeight } from '../entities/PayloadWeight';
import { SecondStage } from '../entities/SecondStage';

export class RocketDto {
  id: string;
  height: Height;
  diameter: Diameter;
  mass: Mass;
  first_stage: FirstStage;
  second_stage: SecondStage;
  engines: Engine;
  landing_legs: LandingLegs;
  payload_weights: Array<PayloadWeight>;
  flickr_images: Array<string>;
  name: string;
  type: string;
  active: boolean;
  stages: number;
  boosters: number;
  cost_per_launch: number;
  success_rate_pct: number;
  first_flight: string;
  country: string;
  company: string;
  wikipedia: string;
  description: string;
}
