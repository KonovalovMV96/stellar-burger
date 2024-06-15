import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getOrders, getOrdersUser } from '../../services/slices/ordersGetSlice';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector(getOrders);

  useEffect(() => {
    dispatch(getOrdersUser());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
