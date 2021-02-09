import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Listing, ListingDocument } from './listing.schema';
import { CreateListingDto } from './dto/create-listing.dto';
import { Model } from 'mongoose';
import { ValidatedUser } from '../auth/types';
import { CaslAbilityFactory } from '../casl/casl-ability.factory';
import { Action } from '../casl/types';
import { subject } from '@casl/ability';
import { FilterQueryParams } from './types';
import { User } from '../user/user.schema';

@Injectable()
export class ListingService {
  constructor(
    @InjectModel(Listing.name) private listingModel: Model<ListingDocument>,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  async findOne(_id: string): Promise<ListingDocument> {
    return this.listingModel.findById({ _id }).exec();
  }

  async create(
    createListingDto: CreateListingDto,
    user: ValidatedUser,
  ): Promise<Listing> {
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.can(Action.Create, Listing.modelName)) {
      const createdListing = new this.listingModel({
        ...createListingDto,
        specialist: user.id,
      });
      return createdListing.save();
    } else {
      throw new HttpException(
        'Not authorize to create resource',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async update(
    _id: string,
    updatedListing: CreateListingDto,
    user: ValidatedUser,
  ): Promise<ListingDocument> {
    const ability = this.caslAbilityFactory.createForUser(user);
    const listing: Listing = await this.listingModel.findById(_id).exec();

    if (ability.can(Action.Update, subject(Listing.modelName, listing))) {
      return this.listingModel
        .findByIdAndUpdate({ _id }, updatedListing, {
          new: true,
        })
        .exec();
    } else {
      throw new HttpException(
        'Not authorized to update the resource',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async delete(_id: string, user: ValidatedUser): Promise<ListingDocument> {
    const ability = this.caslAbilityFactory.createForUser(user);
    const listing: Listing = await this.listingModel.findById(_id).exec();

    if (ability.can(Action.Delete, subject(Listing.modelName, listing))) {
      return this.listingModel.findOneAndDelete({ _id }).exec();
    } else {
      throw new HttpException(
        'Not authorized to delete the resource',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  async findAll(filterParams: FilterQueryParams): Promise<ListingDocument[]> {
    const listings = await this.listingModel
      .find(filterParams.toMongoQuery())
      .populate('specialist', '-password')
      .exec();
    return listings.filter(
      listing => !((listing.specialist as User)?.rating < filterParams.rating),
    );
  }

  async findAllBySpecialist(userId: string): Promise<ListingDocument[]> {
    return this.listingModel
      .find({ specialist: userId })
      .populate({ path: 'specialist', select: '-password' })
      .exec();
  }
}
