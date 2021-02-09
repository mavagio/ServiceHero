export enum ProjectStatus {
  OfferPending = 'OfferPending',
  InProgress = 'InProgress',
  OfferRejected = 'OfferRejected',
  CompletePending = 'CompletePending',
  CompleteRejected = 'CompleteRejected',
  Completed = 'Completed',
}

export enum SpecialistStatus {
  OfferRejected = 'OfferRejected',
  CompletePending = 'CompletePending',
  InProgress = 'InProgress',
}

export enum ClientStatus {
  OfferPending = 'OfferPending',
  Completed = 'Completed',
  CompleteRejected = 'CompleteRejected',
}

export class Status {
  static readonly modelName = 'Status';
}

export interface AverageRating {
  _id: string;
  rating: number;
}
