import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  UseGuards,
  Body,
  Request,
  Query,
} from '@nestjs/common';
import { UserType } from '../user/types';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProjectDto, CreateReviewDto, UpdateStatusDto } from './dto/create-project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private projectService: ProjectService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createListingDto: CreateProjectDto, @Request() req) {
    return this.projectService.create(createListingDto, req.user);
  }

  @Patch('review/:id')
  @UseGuards(JwtAuthGuard)
  updateReview(@Body() createReviewDto: CreateReviewDto, @Request() req, @Param('id') id) {
    return this.projectService.updateReview(id, createReviewDto, req.user);
  }

  @Patch('status/:id')
  @UseGuards(JwtAuthGuard)
  updateStatus(@Body() updateStatusDto: UpdateStatusDto, @Request() req, @Param('id') id) {
    return this.projectService.updateStatus(id, updateStatusDto, req.user);
  }

  @Get('specialist/:id')
  @UseGuards(JwtAuthGuard)
  getAllSpecialistProjects(@Request() req, @Param() param, @Query('status') status) {
    return this.projectService.findByUserId(param.id, req.user, status, UserType.Specialist);
  }

  @Get('client/:id')
  @UseGuards(JwtAuthGuard)
  getAllClientProjects(@Request() req, @Param() param, @Query('status') status) {
    return this.projectService.findByUserId(param.id, req.user, status, UserType.Client);
  }

  @Get('average/:id')
  getAverageRating(@Param() param) {
    return this.projectService.getAverageRatingPerSpecialist(param.id);
  }
}
