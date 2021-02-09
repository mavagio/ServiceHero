/**
 *
 * SpecialistServices
 *
 */

import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, specialistServicesActions } from './slice';
import { selectLoading, selectListings } from './selectors';
import { specialistServicesSaga } from './saga';
import { ListingCard } from 'app/components/ListingCard';
import { useEffect } from 'react';
import { UserType } from 'types';
import { Empty } from 'antd';
import { selectIsSuccess } from 'app/containers/ListingManager/selectors';
import { selectUser } from 'app/containers/Authentication/selectors';

interface Props {
  specialistId?: string;
}

export function SpecialistServices({ specialistId }: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: specialistServicesSaga });

  const listings = useSelector(selectListings);
  const loading = useSelector(selectLoading);

  const isListingChanged = useSelector(selectIsSuccess);

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    if (specialistId) {
      dispatch(specialistServicesActions.loadListings(specialistId));
    }
  }, [dispatch, specialistId]);

  useEffect(() => {
    if (specialistId && isListingChanged) {
      dispatch(specialistServicesActions.loadListings(specialistId));
    }
  }, [dispatch, specialistId, isListingChanged]);

  return (
    <Wrapper>
      <ListingContainer>
        {listings.length > 0 ? (
          listings.map(listing => (
            <ListingCard
              key={listing._id}
              loading={loading}
              listing={listing}
              userType={UserType.Specialist}
              userId={user?.sub}
            />
          ))
        ) : (
          <Empty description="You have no services" />
        )}
      </ListingContainer>
    </Wrapper>
  );
}

const Wrapper = styled.div``;

const ListingContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  overflow-x: auto;
`;
