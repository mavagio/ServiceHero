/**
 *
 * Listing
 *
 */
import React, { useState } from 'react';
import styled from 'styled-components/macro';
import { Card as AntCard, Button, Skeleton, Avatar } from 'antd';
import { ShoppingOutlined } from '@ant-design/icons';
import { UserType, Project } from 'types';
import { Link as RouterLink } from 'react-router-dom';
import { Rate, Space, Tag as AntTag, Divider, Input } from 'antd';
import { useDispatch } from 'react-redux';
import { projectManagerActions } from 'app/containers/ProjectManager/slice';
import { ProjectStatusMapping } from 'types/mappings';
import { useEffect } from 'react';
const { Meta } = AntCard;

interface Props {
  project: Project;
  loading: boolean;
  userType?: UserType;
  userId?: string;
}

export enum ProjectStatus {
  OfferPending = 'OfferPending',
  InProgress = 'InProgress',
  OfferRejected = 'OfferRejected',
  CompletePending = 'CompletePending',
  CompleteRejected = 'CompleteRejected',
  Completed = 'Completed',
}

const getClientAction = (project, userId, callback) => {
  if (project?.client?._id === userId) {
    if (project?.status === ProjectStatus.CompletePending) {
      return [
        <Button
          type="primary"
          shape="round"
          key={ProjectStatus.Completed}
          onClick={() => callback(ProjectStatus.Completed)}
        >
          Complete
        </Button>,
        <Button
          type="primary"
          danger={true}
          shape="round"
          key={ProjectStatus.CompleteRejected}
          onClick={() => callback(ProjectStatus.CompleteRejected)}
        >
          Reject
        </Button>,
      ];
    }
  }
  return [];
};

const getSpecialistActions = (project, userId, callback) => {
  if (project?.specialist?._id === userId) {
    if (project?.status === ProjectStatus.OfferPending) {
      return [
        <Button
          type="primary"
          shape="round"
          key={ProjectStatus.InProgress}
          onClick={() => callback(ProjectStatus.InProgress)}
        >
          Accept offer
        </Button>,
        <Button
          type="primary"
          shape="round"
          danger={true}
          key={ProjectStatus.InProgress}
          onClick={() => callback(ProjectStatus.OfferRejected)}
        >
          Reject offer
        </Button>,
      ];
    } else if (project?.status === ProjectStatus.InProgress) {
      return [
        <Button
          type="primary"
          shape="round"
          key={ProjectStatus.CompletePending}
          onClick={() => callback(ProjectStatus.CompletePending)}
        >
          Complete
        </Button>,
      ];
    }
  }
  return [];
};

export const ProjectCard = ({
  project,
  loading,
  userType = UserType.Unknown,
  userId,
}: Props) => {
  const dispatch = useDispatch();
  const [canReview, setCanReview] = useState(false);
  const onActionTaken = value => {
    dispatch(
      projectManagerActions.updateStatus({
        projectId: project._id,
        newStatus: value,
      }),
    );
  };

  useEffect(() => {
    if (
      project?.client?._id === userId &&
      (project?.status === ProjectStatus.Completed ||
        project?.status === ProjectStatus.CompleteRejected)
    ) {
      setCanReview(true);
    } else {
      setCanReview(false);
    }
  }, [project.client._id, project.status, userId]);

  const onCommentChange = e => {
    const value = e.target.value;
    dispatch(
      projectManagerActions.updateReview({
        projectId: project._id,
        review: { comment: value, rating: project?.review?.rating || 0 },
      }),
    );
  };
  const onRatingChange = value => {
    dispatch(
      projectManagerActions.updateReview({
        projectId: project._id,
        review: { comment: project?.review?.comment || '', rating: value },
      }),
    );
  };

  const actions: Record<UserType, any> = {
    [UserType.Client]: getClientAction(project, userId, onActionTaken),
    [UserType.Specialist]: getSpecialistActions(project, userId, onActionTaken),
    [UserType.Unknown]: [],
  };
  return (
    <Wrapper>
      <Card hoverable={true} loading={loading} actions={actions[userType]}>
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar icon={<ShoppingOutlined />} />}
            title={
              <Title>
                {project?.listing?.type} project for
                <Link to={`/specialist/${project?.specialist?._id}`}>
                  {project?.specialist?.name}
                </Link>{' '}
                requested by {project?.client?.name}
              </Title>
            }
            description={
              <>
                <Space direction={'vertical'}>
                  <HourlyRate>
                    € {project?.listing.hourlyRate} / hour
                  </HourlyRate>
                </Space>
                <Description>{project?.listing.description}</Description>
                <Availability>
                  Hours: {project?.listing.availability.join(', ')}
                </Availability>
                <Divider />
                Status:{' '}
                <Tag color={ProjectStatusMapping[project?.status].color}>
                  {project?.status}
                </Tag>
                <Review>
                  <Rate
                    disabled={!canReview}
                    defaultValue={project?.review?.rating || 0}
                    allowHalf={true}
                    onChange={onRatingChange}
                  />
                  <Comment
                    bordered={true}
                    disabled={!canReview}
                    maxLength={135}
                    defaultValue={project?.review?.comment}
                    onBlur={onCommentChange}
                    placeholder={
                      canReview ? 'Leave a comment' : 'Not commented yet'
                    }
                  />
                </Review>
              </>
            }
          />
        </Skeleton>
      </Card>
    </Wrapper>
  );
};

const Link = styled(RouterLink)`
  margin: 0px 4px;
`;

const Title = styled.span`
  display: flex;
  flex-wrap: wrap;
`;

const Review = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tag = styled(AntTag)`
  border-radius: 4px;
`;

const Comment = styled(Input.TextArea)`
  border-radius: 8px;
  padding: 12px;
  background: #fafafa;
  max-width: 200px;
  resize: none;
`;

const Description = styled.div``;

const HourlyRate = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  color: ${props => props.theme['primary-color']};
`;

const Availability = styled.div``;

const Card = styled(AntCard)`
  width: 300px;
  border-radius: 8px;
  cursor: initial;
`;

const Wrapper = styled.div`
  margin: 8px;
`;
