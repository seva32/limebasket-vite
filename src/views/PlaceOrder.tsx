/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../store/hooks";
import { createOrder } from "../store/actions/shop/orderActions";
import { CART_CLEAR } from "../store/actions/shop/shopActionTypes/cartActionTypes";
import { Loader } from "../common";

function PlaceOrder() {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const orderCreate = useAppSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate as {
    loading: boolean;
    success: any;
    error: string;
    order: any;
  };

  const { cartItems, shipping, payment, promo } = cart as {
    cartItems: any;
    shipping: any;
    payment: any;
    promo: any;
  };

  if (!shipping?.address) {
    navigate("/shipping");
  } else if (!payment.paymentMethod) {
    navigate("/payment");
  }

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (success) {
      dispatch({ type: CART_CLEAR });
      navigate(`/order/${order._id}`);
    }
  }, [success, navigate, order._id, dispatch]);

  useEffect(() => {
    if (cartItems && payment && shipping) {
      const itemsPrice = cartItems.reduce(
        (a: any, c: any) => a + c.price * c.qty,
        0
      );
      const shippingPrice = itemsPrice > 100 ? 0 : 10;
      const taxPrice = 0.15 * itemsPrice;
      const totalPrice = itemsPrice + shippingPrice + taxPrice;
      dispatch(
        createOrder({
          orderItems: cartItems,
          shipping,
          payment,
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
          promo,
        })
      );
    }
  }, [cartItems, dispatch, payment, shipping, promo]);

  if (loading || error) {
    return <Loader />;
  }

  return <Loader />;
}

export default PlaceOrder;
