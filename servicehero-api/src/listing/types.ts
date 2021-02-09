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

export class FilterQueryParams {
  listingTypes: ListingType[];
  hourlyRateFrom: number;
  hourlyRateTo: number;
  rating: number;
  constructor(query) {
    this.listingTypes = this.parseListingType(query.listingTypes);
    this.hourlyRateFrom =
      query.hourlyRateFrom && parseInt(query.hourlyRateFrom, 10);
    this.hourlyRateTo = query.hourlyRateTo && parseInt(query.hourlyRateTo, 10);
    this.rating = query.rating ? parseInt(query.rating, 10) : 0;
  }

  parseListingType(listingType) {
    if (Array.isArray(listingType)) {
      return listingType;
    } else if (typeof listingType === 'string') {
      return [listingType];
    }
    return null;
  }

  toMongoQuery() {
    const query = {} as any;
    if (this.hourlyRateFrom) {
      query.hourlyRate = { ...query.hourlyRate, $gte: this.hourlyRateFrom };
    }
    if (this.hourlyRateTo) {
      query.hourlyRate = { ...query.hourlyRate, $lte: this.hourlyRateTo };
    }
    if (this.listingTypes) {
      query.type = { $in: this.listingTypes };
    }
    return query;
  }
}
