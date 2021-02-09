import React from 'react';
import { ListingType, ProjectStatus } from 'types';
import {
  CarOutlined,
  SettingOutlined,
  ShopOutlined,
  HomeOutlined,
  DeleteOutlined,
  DropboxOutlined,
} from '@ant-design/icons';

export const ListingTypeMapping: any = {
  [ListingType.CarRepair]: {
    icon: p => <CarOutlined />,
  },
  [ListingType.Carpentry]: {
    icon: p => <ShopOutlined />,
  },
  [ListingType.Cleaning]: {
    icon: p => <HomeOutlined />,
  },
  [ListingType.Demolition]: {
    icon: p => <DeleteOutlined />,
  },
  [ListingType.HomeImprovement]: {
    icon: p => <HomeOutlined />,
  },
  [ListingType.Landscaping]: {
    icon: p => <CarOutlined />,
  },
  [ListingType.Moving]: {
    icon: p => <DropboxOutlined />,
  },
  [ListingType.Other]: {
    icon: p => <SettingOutlined />,
  },
};

export const ProjectStatusMapping: any = {
  [ProjectStatus.OfferPending]: {
    color: 'blue',
  },
  [ProjectStatus.InProgress]: {
    color: 'purple',
  },
  [ProjectStatus.OfferRejected]: {
    color: 'red',
  },
  [ProjectStatus.CompletePending]: {
    color: 'blue',
  },
  [ProjectStatus.CompleteRejected]: {
    color: 'red',
  },
  [ProjectStatus.Completed]: {
    color: 'green',
  },
};
