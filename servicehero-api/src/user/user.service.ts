import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { AverageRating } from '../project/types';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async fineOneById(_id: string) {
    return this.userModel.findOne({ _id }, { password: 0, __v: 0 });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userProps } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    const createdUser = new this.userModel({ ...userProps, password: hash });
    return createdUser.save();
  }

  async updateRating({ _id, rating }: AverageRating): Promise<User> {
    return this.userModel.findOneAndUpdate({ _id }, { rating });
  }

  async deleteByEmail(email: string): Promise<User> {
    return this.userModel.findOneAndRemove({ email });
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find({}, { password: 0 }).exec();
  }
}
