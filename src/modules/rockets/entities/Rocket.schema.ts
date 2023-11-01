import { Diameter } from './Diameter';
import { Engine } from './Engine';
import { FirstStage } from './FirstStage';
import { Height } from './Height';
import { LandingLegs } from './LandingLegs';
import { Mass } from './Mass';
import { PayloadWeight } from './PayloadWeight';
import { SecondStage } from './SecondStage';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Rocket {
  @Prop({ required: false, unique: true })
  id: string;

  @Prop({ required: false })
  height: Height;

  @Prop({ required: false })
  diameter: Diameter;

  @Prop({ required: false })
  mass: Mass;

  @Prop({ required: false })
  first_stage: FirstStage;

  @Prop({ required: false })
  second_stage: SecondStage;

  @Prop({ required: false })
  engines: Engine;

  @Prop({ required: false })
  landing_legs: LandingLegs;

  @Prop({ required: false })
  payload_weights: Array<PayloadWeight>;

  @Prop({ required: false })
  flickr_images: Array<string>;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  type: string;

  @Prop({ required: false })
  active: boolean;

  @Prop({ required: false })
  stages: number;

  @Prop({ required: false })
  boosters: number;

  @Prop({ required: false })
  cost_per_launch: number;

  @Prop({ required: false })
  success_rate_pct: number;

  @Prop({ required: false })
  first_flight: string;

  @Prop({ required: false })
  country: string;

  @Prop({ required: false })
  company: string;

  @Prop({ required: false })
  wikipedia: string;

  @Prop({ required: false })
  description: string;
}

export const RocketSchema = SchemaFactory.createForClass(Rocket);
RocketSchema.index({
  description: 'text',
  wikipedia: 'text',
  company: 'text',
  country: 'text',
  first_flight: 'text',
  name: 'text',
  type: 'text',
});
