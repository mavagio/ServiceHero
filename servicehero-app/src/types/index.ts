import { RootState } from './RootState';

export interface JwtPayload {
  name: string;
  sub: string;
  type: string;
  email: string;
  iat: number;
  exp: number;
}

export enum UserType {
  Client = 'Client',
  Specialist = 'Specialist',
  Unknown = 'Unknown',
}

export enum ListingType {
  CarRepair = 'CarRepair',
  Carpentry = 'Carpentry',
  Cleaning = 'Cleaning',
  Demolition = 'Demolition',
  HomeImprovement = 'HomeImprovement',
  Landscaping = 'Landscaping',
  Moving = 'Moving',
  Other = 'Other',
}
export interface User {
  _id: string;
  name: string;
  email: string;
  type: UserType;
  rating?: number;
}
export interface Listing {
  _id: string;
  type: ListingType;
  description: string;
  hourlyRate: number;
  availability: string[];
  specialist: User;
}

export interface ListingDto {
  type: ListingType;
  description: string;
  hourlyRate: number;
  availability: string[];
}

export interface FilterTypes {
  hourlyRateFrom?: number | null;
  hourlyRateTo?: number | null;
  listingTypes?: ListingType[] | null;
  rating?: number | null;
}

export enum ProjectStatus {
  OfferPending = 'OfferPending',
  InProgress = 'InProgress',
  OfferRejected = 'OfferRejected',
  CompletePending = 'CompletePending',
  CompleteRejected = 'CompleteRejected',
  Completed = 'Completed',
}

export interface Review {
  comment: string;
  rating: number;
}
export interface Project {
  _id: string;
  client: User;
  specialist: User;
  listing: Listing;
  status: ProjectStatus;
  review: Review;
}

export type { RootState };
