import { PieGraphDatasetDto } from './pie-graph-dataset.dto';

export class PieGraphDto {
  labels: string[];
  datasets: PieGraphDatasetDto[];
  success: number;
  fail: number;
}
