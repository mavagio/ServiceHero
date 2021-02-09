/**
 *
 * Listing
 *
 */
import React, { memo } from 'react';
import styled from 'styled-components/macro';
import {
  Card as AntCard,
  Button,
  Skeleton,
  Avatar,
  Rate as AntRate,
} from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Listing, UserType } from 'types';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { listingEditorModalActions } from 'app/containers/ListingEditorModal/slice';
import { listingManagerActions } from 'app/containers/ListingManager/slice';
import { projectManagerActions } from 'app/containers/ProjectManager/slice';
import { ListingTypeMapping } from 'types/mappings';

const { Meta } = AntCard;

interface Props {
  listing: Listing;
  loading: boolean;
  userType?: UserType;
  userId?: string;
}

export const ListingCard = memo(
  ({ listing, loading, userType = UserType.Unknown, userId }: Props) => {
    const dispatch = useDispatch();

    const openListingModal = () => {
      dispatch(listingEditorModalActions.openModal(listing));
    };

    const onListingDelete = () => {
      dispatch(listingManagerActions.deleteListing(listing._id));
    };

    const onHire = () => {
      dispatch(projectManagerActions.createProject(listing._id));
    };

    const actions: Record<UserType, any> = {
      [UserType.Client]: [
        <Button type="default" shape="round" key="hire" onClick={onHire}>
          Hire
        </Button>,
      ],
      [UserType.Specialist]:
        listing?.specialist?._id === userId
          ? [
              <EditOutlined onClick={openListingModal} />,
              <DeleteOutlined onClick={onListingDelete} />,
            ]
          : [],
      [UserType.Unknown]: [],
    };
    return (
      <Wrapper>
        <Card loading={loading} actions={actions[userType]} hoverable={true}>
          <Skeleton loading={false} avatar active>
            <Meta
              avatar={
                <Avatar icon={ListingTypeMapping[listing.type]?.icon()} />
              }
              title={
                <Title>
                  {listing.type} service by
                  <Link to={`/specialist/${listing?.specialist?._id}`}>
                    {listing?.specialist?.name}
                  </Link>
                </Title>
              }
              description={
                <>
                  <Rate
                    disabled={true}
                    value={listing?.specialist?.rating}
                    count={5}
                  />
                  <br />
                  <HourlyRate>€ {listing.hourlyRate} / hour</HourlyRate>
                  <Description>{listing.description}</Description>
                  <Availability>
                    Hours: {listing.availability.join(', ')}
                  </Availability>
                </>
              }
            />
          </Skeleton>
        </Card>
      </Wrapper>
    );
  },
);

const Rate = styled(AntRate)`
  display: inline-block;
`;

const Link = styled(RouterLink)`
  margin-left: 4px;
`;

const Title = styled.span`
  display: flex;
  flex-wrap: wrap;
`;

const Description = styled.div``;

const HourlyRate = styled.span`
  font-size: 1.2em;
  font-weight: bold;
  color: ${props => props.theme['primary-color']};
`;

const Availability = styled.div``;

const Card = styled(AntCard)`
  max-width: 300px;
  min-width: 300px;
  cursor: default;
  border-radius: 8px;
`;

const Wrapper = styled.div`
  margin: 8px;
`;
