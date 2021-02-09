/**
 *
 * ProjectManager
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, projectManagerActions } from './slice';
import { selectIsSuccess, selectError } from './selectors';
import { projectManagerSaga } from './saga';
import { message } from 'antd';

interface Props {}

export function ProjectManager(props: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: projectManagerSaga });
  const dispatch = useDispatch();

  const isSuccess = useSelector(selectIsSuccess);
  const error = useSelector(selectError);

  useEffect(() => {
    if (isSuccess) {
      message.success('Saved!');
      dispatch(projectManagerActions.reset());
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (error) {
      message.error('Failed to save!');
      dispatch(projectManagerActions.reset());
    }
  }, [error, dispatch]);

  return <></>;
}
