import { FilterTypes } from 'types';

export const toFilterQueryString = ({
  listingTypes = null,
  hourlyRateFrom = null,
  hourlyRateTo = null,
  rating = null,
}: FilterTypes): string => {
  const queryParams = new URLSearchParams();
  if (listingTypes && listingTypes?.length > 0) {
    queryParams.append('listingTypes', listingTypes.join(','));
  }
  if (hourlyRateFrom !== null) {
    queryParams.append('hourlyRateFrom', hourlyRateFrom.toString());
  }
  if (hourlyRateTo !== null) {
    queryParams.append('hourlyRateTo', hourlyRateTo.toString());
  }
  if (rating !== null) {
    queryParams.append('rating', rating.toString());
  }
  return queryParams.toString();
};
