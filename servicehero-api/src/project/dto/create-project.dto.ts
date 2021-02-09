import { IsString, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ProjectStatus } from '../types';

export class CreateProjectDto {
  @IsString()
  listingId: string;
}

export class CreateReviewDto {
  @IsString()
  comment: string;

  @IsNumber()
  rating: number;
}

export class UpdateStatusDto {
  @IsEnum(ProjectStatus)
  status: ProjectStatus;
}
