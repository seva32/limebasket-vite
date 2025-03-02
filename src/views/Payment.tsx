import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { savePayment } from "../store/actions/shop/cartActions";
import { Loader } from "../common";

function Payment() {
  const [paymentMethod] = useState("paypal");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    dispatch(savePayment({ paymentMethod }));
    navigate("place-order");
  });

  return <Loader />;
}

export default Payment;
