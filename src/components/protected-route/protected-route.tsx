import { ReactElement } from 'react';
import { Preloader } from '../ui/preloader';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import {
  getAuthChecked,
  getUserData
} from '../../services/slices/userAuthSlice';

type TProtectedRouteProps = {
  children: ReactElement;
  onlyUnAuth?: boolean;
};

export const ProtectedRoute = ({
  children,
  onlyUnAuth = false
}: TProtectedRouteProps): ReactElement => {
  const isAuthChecked = useSelector(getAuthChecked);
  const user = useSelector(getUserData);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }
  //Не авторизован и нет данных пользователя
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  return children;
};
