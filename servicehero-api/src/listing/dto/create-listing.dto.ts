import { ListingType } from '../types';
import { IsNotEmpty, IsEnum, IsNumber } from 'class-validator';

export class CreateListingDto {

  @IsEnum(ListingType)
  type: ListingType;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  hourlyRate: number;

  @IsNotEmpty()
  availability: string[];
}
