import { IsString, IsOptional } from 'class-validator';

export class FilterStaffDto {
  @IsString()
  @IsOptional()
  searchTerm?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
