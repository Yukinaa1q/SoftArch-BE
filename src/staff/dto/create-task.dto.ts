import {
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsEnum,
} from 'class-validator';

export class CreateTaskDto {
  @IsNumber()
  @IsNotEmpty()
  staffId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsNotEmpty()
  date: string;

  @IsString()
  @IsNotEmpty()
  startTime: string;

  @IsString()
  @IsNotEmpty()
  endTime: string;

  @IsOptional()
  @IsEnum(['Pending', 'In Progress', 'Completed'])
  status?: string;

  @IsString()
  @IsOptional()
  description?: string;
}
