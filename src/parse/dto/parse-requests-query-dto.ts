import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, Max, Min } from 'class-validator';

export class ParseRequestsQueryDto {
  @Transform((p) => parseInt(p.value))
  @IsNumber()
  @Min(0)
  @IsOptional()
  page?: number;

  @Transform((p) => parseInt(p.value))
  @IsNumber()
  @Min(1)
  @Max(300)
  @IsOptional()
  pageSize?: number;
}
