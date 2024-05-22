import { IsOptional, IsString } from 'class-validator';

export class UpdateCarDto {
  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()
  readonly model?: string;
}
