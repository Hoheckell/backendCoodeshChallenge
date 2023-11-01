import { Launch } from '../entities/Launch.schema';

export class LaunchesByYearDto {
  _id: { year: number };
  results: Launch[];
}
