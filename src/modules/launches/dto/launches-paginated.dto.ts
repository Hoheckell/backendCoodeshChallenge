import { Launch } from 'src/modules/launches/entities/Launch.schema';

export class LaunchesPaginatedDto {
  results: Launch[];
  totalDocs: number;
  page: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}
