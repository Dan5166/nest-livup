import { IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { MailStatus } from '../enums/mail-status.enum';

export class CreateMailDto {
  @IsEmail()
  to: string;

  @IsString()
  subject: string;

  @IsString()
  html: string;

  @IsOptional()
  @IsString()
  text?: string;

  @IsOptional()
  @IsEnum(MailStatus)
  status?: MailStatus;

  @IsOptional()
  @IsString()
  relatedEntityId?: string;
}
