import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Body,
  UseGuards,
  Request,
  Param,
} from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing.dto';
import { ListingService } from './listing.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ListingDocument } from './listing.schema';
import { FilterQueryParams } from './types';

@Controller('listing')
export class ListingController {
  constructor(private listingService: ListingService) {}

  @Get()
  findAll(@Query() query): Promise<ListingDocument[]> {
    return this.listingService.findAll(new FilterQueryParams(query));
  }

  @Get('specialist/:id')
  findAllForSpecialist(@Param() params): Promise<ListingDocument[]> {
    return this.listingService.findAllBySpecialist(params.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  delete(@Param() param, @Request() req): Promise<ListingDocument> {
    return this.listingService.delete(param.id, req.user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createListingDto: CreateListingDto, @Request() req) {
    return this.listingService.create(createListingDto, req.user);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Body() createListingDto: CreateListingDto,
    @Param() params,
    @Request() req,
  ) {
    return this.listingService.update(params.id, createListingDto, req.user);
  }
}
