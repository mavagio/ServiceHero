/**
 *
 * FilterPanel
 *
 */

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer } from 'utils/redux-injectors';
import { reducer, sliceKey, filterPanelActions } from './slice';
import {
  selectHourlyRateFrom,
  selectHourlyRateTo,
  selectListingTypes,
  selectRating,
} from './selectors';
import { toFilterQueryString } from 'app/services/QueryParamService/index';
import { useEffect } from 'react';
import { Select, Input, Typography } from 'antd';
import { ListingType } from 'types';

const { Text } = Typography;
const { Option } = Select;

interface Props {}

export function FilterPanel(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });

  const hourlyRateFrom = useSelector(selectHourlyRateFrom);
  const hourlyRateTo = useSelector(selectHourlyRateTo);
  const listingTypes = useSelector(selectListingTypes);
  const rating = useSelector(selectRating);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      filterPanelActions.setQueryParams(
        toFilterQueryString({
          hourlyRateFrom,
          hourlyRateTo,
          listingTypes,
          rating,
        }),
      ),
    );
  }, [dispatch, hourlyRateFrom, hourlyRateTo, listingTypes, rating]);

  const onListingChange = value => {
    if (value) {
      dispatch(filterPanelActions.setListingTypes([value]));
    } else {
      dispatch(filterPanelActions.setListingTypes(null));
    }
  };

  const onFromChange = event => {
    const value = event.target.value;
    if (value != null && value.length > 0) {
      dispatch(filterPanelActions.setHourlyRateFrom(value));
    } else {
      dispatch(filterPanelActions.setHourlyRateFrom(null));
    }
  };

  const onToChange = event => {
    const value = event.target.value;
    if (value != null && value.length > 0) {
      dispatch(filterPanelActions.setHourlyRateTo(value));
    } else {
      dispatch(filterPanelActions.setHourlyRateTo(null));
    }
  };

  const onRatingChange = rating => {
    if (rating != null) {
      dispatch(filterPanelActions.setRating(rating));
    } else {
      dispatch(filterPanelActions.setRating(null));
    }
  };

  return (
    <Wrapper>
      <FilterContent>
        <Label>Select service: </Label>
        <Select
          placeholder="Select service to filter"
          showSearch
          onChange={onListingChange}
          allowClear={true}
          dropdownMatchSelectWidth={false}
          style={{ width: '200px' }}
        >
          {Object.values(ListingType).map(type => (
            <Option key={type} value={type}>
              {type}
            </Option>
          ))}
        </Select>
      </FilterContent>
      <FilterContent>
        <HourlyRate>
          <Label>Select hourly rate: </Label>
          <Input
            style={{ width: '100px' }}
            placeholder="from"
            prefix="€"
            onBlur={onFromChange}
          />{' '}
          -{' '}
          <Input
            style={{ width: '100px' }}
            placeholder="to"
            prefix="€"
            onBlur={onToChange}
          />
        </HourlyRate>
      </FilterContent>
      <FilterContent>
        <Label>Select rating: </Label>
        <Select
          placeholder="Select rating"
          onChange={onRatingChange}
          allowClear={true}
          dropdownMatchSelectWidth={false}
          style={{ width: '150px' }}
        >
          {[0, 1, 2, 3, 4].map(star => (
            <Option key={star} value={star}>
              {star} star and above
            </Option>
          ))}
        </Select>
      </FilterContent>
    </Wrapper>
  );
}

const FilterContent = styled.div`
  padding: 10px 0px;
`;

const Label = styled(Text)`
  margin: 0px 20px;
  font-size: 16px;
`;

const HourlyRate = styled.span`
  margin-left: 20px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
`;
