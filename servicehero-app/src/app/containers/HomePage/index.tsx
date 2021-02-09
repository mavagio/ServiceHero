/**
 *
 * HomePage
 *
 */

import React, { memo, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, homePageActions } from './slice';
import { homePageSaga } from './saga';
import { ListingCard } from 'app/components/ListingCard';
import { selectListings, selectLoading } from './selectors';
import { selectUser } from 'app/containers/Authentication/selectors';
import { UserType } from 'types';
import { Divider, Typography, Empty } from 'antd';
import { selectIsSuccess } from 'app/containers/ListingManager/selectors';
import { FilterPanel } from '../FilterPanel';
import { selectQueryParam } from 'app/containers/FilterPanel/selectors';

const { Title } = Typography;
interface Props {}

export const HomePage = memo((props: Props) => {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: homePageSaga });

  const dispatch = useDispatch();

  const listings = useSelector(selectListings);
  const loading = useSelector(selectLoading);
  const user = useSelector(selectUser);

  const filterQueryParams = useSelector(selectQueryParam);

  const isListingChanged = useSelector(selectIsSuccess);

  useEffect(() => {
    if (isListingChanged) {
      dispatch(homePageActions.loadListings(filterQueryParams));
    }
  }, [dispatch, isListingChanged, filterQueryParams]);

  useEffect(() => {
    dispatch(homePageActions.loadListings(filterQueryParams));
  }, [dispatch, filterQueryParams]);

  return (
    <Wrapper>
      <FilterPanel />
      <Divider>
        <Title level={2}>Services</Title>
      </Divider>
      <ListingContainer>
        {listings.length > 0 ? (
          listings.map(listing => (
            <ListingCard
              key={listing._id}
              userType={user?.type ? UserType[user.type] : UserType.Unknown}
              userId={user?.sub}
              loading={loading}
              listing={listing}
            />
          ))
        ) : (
          <Empty description="There are no available services" />
        )}
      </ListingContainer>
    </Wrapper>
  );
});

const ListingContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Wrapper = styled.div``;
