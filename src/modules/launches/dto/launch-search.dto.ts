import { IsOptional } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LaunchSearchDto {
  @ApiProperty()
  @IsOptional()
  search?: string;

  @ApiProperty()
  @IsOptional()
  offset?: number;

  @ApiProperty()
  @IsOptional()
  limit?: number;
}
