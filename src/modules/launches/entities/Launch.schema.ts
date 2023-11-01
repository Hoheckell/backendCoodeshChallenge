import { Links } from './Links';
import { Fairings } from './Fairings';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Cores } from './Cores';

@Schema({
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
})
export class Launch {
  @Prop({ required: false, unique: true })
  id: string;

  @Prop({ required: false })
  fairings: Fairings | null;

  @Prop({ required: false })
  links: Links;

  @Prop({ required: false })
  static_fire_date_utc: string;

  @Prop({ required: false })
  static_fire_date_unix: number;

  @Prop({ required: false })
  tbd: boolean;

  @Prop({ required: false })
  net: boolean;

  @Prop({ required: false })
  window: number;

  @Prop({ required: false })
  rocket: string;

  @Prop({ required: false })
  success: boolean;

  @Prop({ required: false })
  failures: Array<any>;

  @Prop({ required: false })
  details: string;

  @Prop({ required: false })
  crew: Array<string>;

  @Prop({ required: false })
  ships: Array<string>;

  @Prop({ required: false })
  capsules: Array<string>;

  @Prop({ required: false })
  payloads: Array<string>;

  @Prop({ required: false })
  launchpad: string;

  @Prop({ required: false })
  auto_update: boolean;

  @Prop({ required: false })
  flight_number: number;

  @Prop({ required: false })
  name: string;

  @Prop({ required: false })
  date_utc: string;

  @Prop({ required: false })
  date_unix: number;

  @Prop({ required: false })
  date_local: string;

  @Prop({ required: false })
  date_precision: string;

  @Prop({ required: false })
  upcoming: boolean;

  @Prop({ required: false })
  cores: Array<Cores>;
}

export const LaunchSchema = SchemaFactory.createForClass(Launch);
LaunchSchema.index({
  static_fire_date_utc: 'text',
  rocket: 'text',
  date_precision: 'text',
  date_utc: 'text',
  name: 'text',
  launchpad: 'text',
  details: 'text',
});
