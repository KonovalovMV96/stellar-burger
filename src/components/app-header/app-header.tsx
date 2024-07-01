import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { getUserData } from '../../services/slices/userAuthSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(getUserData);
  return <AppHeaderUI userName={userData ? userData.name : ''} />;
};
