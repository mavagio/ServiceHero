/**
 *
 * ProfilePage
 *
 */

import React, { memo } from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/containers/Authentication/selectors';
import { UserType } from 'types';
import { SpecialistProfile } from './SpecialistProfile';
import { ClientProfile } from './ClientProfile';

interface Props {}

export const ProfilePage = memo((props: Props) => {
  const user = useSelector(selectUser);

  if (user?.type === UserType.Specialist) {
    return <SpecialistProfile />;
  }
  return <ClientProfile />;
});
