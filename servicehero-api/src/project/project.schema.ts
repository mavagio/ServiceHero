import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Listing } from '../listing/listing.schema';
import { ProjectStatus } from './types';

export type ProjectDocument = Project & Document;

@Schema()
export class Review {
  static readonly modelName = 'Review';

  @Prop({ type: String })
  comment: string;

  @Prop({ type: Number, min: 0, max: 5 })
  rating: number;
}

@Schema()
export class Project {
  static readonly modelName = 'Project';

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  client: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  specialist: string;

  @Prop({ type: Object, required: true })
  listing: Listing;

  @Prop({ type: String, required: true, enum: Object.keys(ProjectStatus) })
  status: ProjectStatus;

  @Prop({ type: Object, required: false })
  review: Review;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
