import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name: string;

  // 🇨🇱 RUT chileno (formato simple)
  @IsString()
  @Matches(/^\d{7,8}-[\dkK]$/, {
    message: 'rut must be in format 12345678-9',
  })
  rut: string;

  @IsEmail()
  email: string;

  @IsInt()
  @IsPositive()
  @Min(0)
  @Max(120)
  age: number;

  @IsString()
  @MinLength(8)
  @MaxLength(15)
  phone: string;

  @IsString()
  @MinLength(10)
  @MaxLength(1000)
  description: string;

  // 🔹 Por si después lo necesitas
  @IsOptional()
  @IsString()
  professionalId?: string;
}
