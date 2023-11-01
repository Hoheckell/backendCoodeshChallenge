import { BarDatasetDto } from './bar-dataset.dto';

export class BarGraphDto {
  labels: number[];
  datasets: BarDatasetDto[];
}
