import { subject } from '@casl/ability';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ValidatedUser } from '../auth/types';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Action } from '../casl/types';
import { Listing } from '../listing/listing.schema';
import { ListingService } from '../listing/listing.service';
import { UserType } from '../user/types';
import {
  CreateProjectDto,
  CreateReviewDto,
  UpdateStatusDto,
} from './dto/create-project.dto';
import { Project, ProjectDocument, Review } from './project.schema';
import { AverageRating, ProjectStatus, Status } from './types';
import * as mongoose from 'mongoose';
import { UserService } from '../user/user.service';

const ObjectId = mongoose.Types.ObjectId;

@Injectable()
export class ProjectService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
    private listingService: ListingService,
    private userService: UserService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async getAverageRatingPerSpecialist(
    specialistId: string,
  ): Promise<AverageRating[]> {
    return this.projectModel.aggregate([
      { $match: { specialist: ObjectId(specialistId) } },
      { $group: { _id: '$specialist', rating: { $avg: '$review.rating' } } },
    ]);
  }

  async updateStatus(
    projectId: string,
    updateStatusDto: UpdateStatusDto,
    user: ValidatedUser,
  ): Promise<Project> {
    const ability = this.caslAbilityFactory.createForUser(user);
    const project: Project = await this.projectModel
      .findById({ _id: projectId })
      .exec();
    if (
      ability.can(Action.Update, subject(Project.modelName, project)) &&
      ability.can(Action.Update, subject(Status.modelName, updateStatusDto))
    ) {
      return this.projectModel.findByIdAndUpdate(
        { _id: projectId },
        { status: updateStatusDto.status },
      );
    } else {
      throw new HttpException(
        'Not authorize to create resource',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async updateReview(
    projectId: string,
    reviewDto: CreateReviewDto,
    user: ValidatedUser,
  ): Promise<Project> {
    const ability = this.caslAbilityFactory.createForUser(user);
    const project: Project = await this.projectModel
      .findById({ _id: projectId })
      .exec();
    if (ability.can(Action.Update, subject(Review.modelName, project))) {
      const session = await this.projectModel.startSession();
      session.startTransaction();

      const updatedProject = await this.projectModel
        .findByIdAndUpdate(
          { _id: projectId },
          { review: reviewDto },
          {
            new: true,
          },
        )
        .exec();
      const averageRatings = await this.getAverageRatingPerSpecialist(
        project.specialist,
      );
      await this.userService.updateRating(averageRatings[0]);

      await session.commitTransaction();
      session.endSession();
      return updatedProject;
    } else {
      throw new HttpException(
        'Not authorize to create resource',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findByUserId(
    userId: string,
    user: ValidatedUser,
    status: ProjectStatus | null,
    userType: UserType,
  ): Promise<Project[]> {
    const ability = this.caslAbilityFactory.createForUser(user);
    if (ability.can(Action.Read, Project.modelName)) {
      const query: any =
        userType === UserType.Specialist
          ? { specialist: userId }
          : { client: userId };
      if (status) {
        query.status = status;
      }
      return this.projectModel
        .find(query)
        .populate('specialist', '-password')
        .populate('client', '-password')
        .exec();
    } else {
      throw new HttpException(
        'Not authorize to create resource',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async create(
    { listingId }: CreateProjectDto,
    user: ValidatedUser,
  ): Promise<Project> {
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.can(Action.Create, Project.modelName)) {
      const listing: Listing = await this.listingService.findOne(listingId);
      const createdProject = new this.projectModel({
        client: user.id,
        specialist: listing.specialist,
        listing,
        status: ProjectStatus.OfferPending,
      });
      return createdProject.save();
    } else {
      throw new HttpException(
        'Not authorize to create resource',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
