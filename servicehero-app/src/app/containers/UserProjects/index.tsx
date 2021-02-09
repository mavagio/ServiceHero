/**
 *
 * UserProjects
 *
 */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';

import { useInjectReducer, useInjectSaga } from 'utils/redux-injectors';
import { reducer, sliceKey, userProjectsActions } from './slice';
import { selectLoading, selectProjects } from './selectors';
import { userProjectsSaga } from './saga';
import { UserType } from 'types';
import { ProjectCard } from 'app/components/ProjectCard';
import { Empty } from 'antd';
import { selectIsSuccess } from 'app/containers/ProjectManager/selectors';
import { selectUser } from 'app/containers/Authentication/selectors';
interface Props {
  userId: string;
  userType: UserType;
}

export function UserProjects({ userId, userType }: Props) {
  useInjectReducer({ key: sliceKey, reducer: reducer });
  useInjectSaga({ key: sliceKey, saga: userProjectsSaga });

  const projects = useSelector(selectProjects);
  const loading = useSelector(selectLoading);

  const isProjectUpdated = useSelector(selectIsSuccess);

  const authUser = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userProjectsActions.loadProjects({ userId, userType }));
  }, [dispatch, userId, userType]);

  useEffect(() => {
    if (userId && isProjectUpdated) {
      dispatch(userProjectsActions.loadProjects({ userId, userType }));
    }
  }, [dispatch, userType, userId, isProjectUpdated]);

  return (
    <Wrapper>
      {authUser ? (
        <ListingContainer>
          {projects.length > 0 ? (
            projects.map(project => (
              <ProjectCard
                key={project._id}
                loading={loading}
                project={project}
                userType={userType}
                userId={authUser?.sub}
              />
            ))
          ) : (
            <Empty description="No projects" />
          )}
        </ListingContainer>
      ) : (
        <Empty description="Please login to view the projects" />
      )}
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
