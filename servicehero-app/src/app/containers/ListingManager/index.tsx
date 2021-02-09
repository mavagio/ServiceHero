/**
 *
 * ListingManager
 *
 */

import React, { useEffect } from 'react';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, listingManagerActions } from './slice';
import { listingManagerSaga } from './saga';
import { useSelector, useDispatch } from 'react-redux';
import { selectIsSuccess, selectError } from './selectors';
import { message } from 'antd';

interface Props {}

export function ListingManager(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: listingManagerSaga });
  const dispatch = useDispatch();

  const isSuccess = useSelector(selectIsSuccess);
  const error = useSelector(selectError);

  useEffect(() => {
    if (isSuccess) {
      message.success('Saved!');
      dispatch(listingManagerActions.reset());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (error) {
      message.error('Failed to save!');
      dispatch(listingManagerActions.reset());
    }
  }, [error, dispatch]);

  return <></>;
}
