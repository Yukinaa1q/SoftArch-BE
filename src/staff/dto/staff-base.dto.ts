import {
  IsString,
  IsNumber,
  IsEnum,
  IsArray,
  IsDate,
  IsUrl,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
} from 'class-validator';

export class StaffBaseDto {
  @IsNumber()
  @IsOptional()
  id?: number;

  @IsString()
  name: string;

  @IsString()
  department: string;

  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  joinDate: string;

  @IsArray()
  @IsString({ each: true })
  certifications: string[];

  @IsString()
  scheduleHours: string;

  @IsEnum(['Active', 'On Leave', 'Remote', 'Terminated'])
  status: string;

  @IsUrl()
  imageUrl: string;
}
