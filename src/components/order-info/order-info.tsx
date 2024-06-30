import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { getIngredientsBurger } from '../../services/slices/ingredientSlice';
import { useParams } from 'react-router-dom';
import { getFeedOrders } from '../../services/slices/feedSlice';
import {
  getOrderDetails,
  getOrderDetailsLoading,
  orderDetails
} from '../../services/slices/orderDetailsSlice';

export const OrderInfo: FC = () => {
  const { number } = useParams<{ number: string }>();
  const newNumber = Number(number);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(orderDetails(newNumber));
  }, []);

  const orderData = useSelector(getOrderDetails)?.find((item) => item);
  const loading = useSelector(getOrderDetailsLoading);

  const ingredients: TIngredient[] = useSelector(getIngredientsBurger);

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo || loading) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
