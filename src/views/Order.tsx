import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import isEmpty from "lodash.isempty";
import moment from "moment";

import { detailsOrder, payOrder } from "../store/actions/shop/orderActions";
import { ORDER_PAY_RESET } from "../store/actions/shop/shopActionTypes/orderActionTypes";
import PaypalButton from "../common/Paypal";
import randomKey from "../utils/misc/randomKey";

import { Head, Loader, Policies, Navbar } from "../common";

function Order() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loaded, setLoaded] = React.useState(false);
  const orderDetails: { order: any; loading: boolean; error: string } =
    useAppSelector((state) => state.orderDetails);
  const order = orderDetails.order;
  const loading = orderDetails.loading;
  const error = orderDetails.error;
  const authen = useAppSelector((state) => state.auth);
  const auth = authen.authenticated;
  const orderPay = useAppSelector((state) => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [order, successPay, errorPay, id]);

  React.useEffect(() => {
    if (order && !order.isPaid && successPay) {
      dispatch({ type: ORDER_PAY_RESET });
      if (auth) {
        navigate("/profile");
      } else {
        navigate("/");
      }
    } else {
      (async () => {
        if (!order._id || successPay || order._id !== id) {
          const orderData = await dispatch(detailsOrder(id));
          if (orderData) {
            setLoaded(true);
          }
        } else if (order._id === id) {
          setLoaded(true);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [successPay]);

  const handleSuccessPayment = (paymentResult: any) => {
    setLoaded(false);
    const paymentData = {
      paymentMethod: paymentResult,
      payerId: paymentResult.payer.payer_id,
      orderId: paymentResult.id,
      paymentId: paymentResult.paymentId ? paymentResult.paymentId : null,
    };

    (async () => {
      const data = await dispatch(payOrder(order, paymentData));
      if (data) {
        setLoaded(false);
        const orderData = await dispatch(detailsOrder(id));
        if (orderData) {
          alert("Payment successful!");
          setLoaded(true);
        }
      }
    })();
  };

  if (errorPay) {
    console.log(errorPay);
  }

  const onButtonReady = (m: any) => {
    console.log(m);
  };

  const onCancel = (m: any) => {
    console.log(m);
  };

  const panel = (title: any, content: any) => (
    <div className="w-full h-full flex flex-row flex-no-wrap font-body text-space p-4">
      <div className="w-1/3">
        <strong>{title}:</strong>
      </div>
      <div className="w-2/3 pl-4">{content}</div>
    </div>
  );

  if (loading || error || isEmpty(order)) {
    return <Loader />;
  }

  return (
    <>
      <Head title="Lime Basket | Order" />

      <div className="relative mb-24r z-0">
        {/* product screen */}
        <div className="min-h-screen sm:min-h-600p flex flex-col flex-no-wrap items-center relative w-full z-0">
          <div className="flex-none relative w-full">
            <Policies textColor="space" />
          </div>
          <hr className="text-space w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10">
            <Navbar
              logged={!isEmpty(auth)}
              showSearchModal={false}
              clearModal={() => undefined}
              dark
              noSearchNoBag
            />
          </div>
          <div className="w-90% mx-auto rounded-lg bg-dirty shadow-md my-16 text-space">
            {/* order header */}
            <div className="flex flex-row flex-wrap justify-between items-center content-center p-4">
              <h2>order # {order.sort}</h2>
              <h3 className="">
                Placed on {moment(order.createdAt).format("YYYY-MM-DD")}
              </h3>
              <h3 className="">
                Status: {order.isDelivered ? "Shipped" : "NOT Shipped"}
              </h3>
              <h3 className="">track package</h3>
            </div>

            {/* customer info */}
            <div className="w-full flex flex-col md:flex-row">
              {/* customer */}
              <div
                style={{ maxHeight: "150px" }}
                className="w-full md:w-2/3 flex h-150p"
              >
                <div className="w-1/2 h-full flex flex-col bg-honeydew rounded-lg mx-2">
                  {panel("Placed by", order.user.nickname)}
                  <hr className="text-aero pb-1" />
                  {panel("Payment method", order.payment.paymentMethod)}
                </div>
                <div className="w-1/2 h-full flex flex-col bg-honeydew rounded-lg mx-2">
                  {panel("Billed to", order.shipping.address)}
                  <hr className="text-aero pb-1" />
                  {panel("Discounts used", order.promo || "-")}
                </div>
              </div>
              {/* pay btn */}
              <div
                style={{ overflowY: "scroll", minHeight: "40vh" }}
                className="w-2/3 md:w-1/3 bg-honeydew flex justify-center items-center mx-auto mt-4 md:mt-0 md:mx-2 rounded-lg"
              >
                {loadingPay && <div>Finishing Payment...</div>}
                {!order.isPaid && !loadingPay && (
                  <PaypalButton
                    amount={order.totalPrice.toFixed(2)}
                    onButtonReady={onButtonReady}
                    onSuccessCapture={handleSuccessPayment}
                    onCancelPay={onCancel}
                  />
                )}
                {order.isPaid && (
                  <div>
                    <h2 className="p-4 rounded-md bg-lime">Paid!</h2>
                  </div>
                )}
              </div>
            </div>

            {/* summary header */}
            <div className="flex flex-row flex-wrap justify-start items-center content-center p-4">
              <h2>Order summary</h2>
              <h3 className="pl-16">
                {order.orderItems.reduce(
                  (quantity: any, item: any) => quantity + +item.qty,
                  0
                )}{" "}
                item/s
              </h3>
            </div>

            {/* summary items */}
            <div className="w-full flex flex-col md:flex-row flex-no-wrap">
              {/* items */}
              <div className="w-90% md:w-2/3 h-auto mx-auto md:ml-2 md:pr-5">
                {order.orderItems.length === 0 ? (
                  <div className="w-full h-full flex justify-center items-center">
                    <h3>Cart is empty</h3>
                  </div>
                ) : (
                  <ul className="w-full md:h-150p flex flex-col flex-no-wrap bg-honeydew rounded-lg mb-4">
                    {order.orderItems.map((item: any) => (
                      <li
                        key={randomKey()}
                        className="w-full h-75p font-body text-space flex flex-row flex-no-wrap justify-start items-center p-4 bg-honeydew rounded-lg"
                      >
                        <div className="w-15% h-60p">
                          <img
                            src={item.image}
                            alt="product"
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>
                        <div className="w-30% pl-4">
                          <strong>{item.name}</strong>
                        </div>
                        <div className="flex-grow flex justify-between">
                          <div className="flex flex-col items-start">
                            <div>
                              <strong>Category:</strong>
                            </div>
                            <div>{item.category}</div>
                          </div>
                          <div className="flex flex-col items-start">
                            <div>
                              <strong>Qty:</strong>
                            </div>
                            <div>{item.qty}</div>
                          </div>
                          <div className="flex flex-col items-start">
                            <div>
                              <strong>Price:</strong>
                            </div>
                            <div>{Number(item.price).toFixed(2)}</div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* amounts */}
              <div className="w-2/3 mx-auto md:w-1/3 h-256p flex flex-col justify-center items-center bg-honeydew rounded-lg mb-4 font-body text-space md:mr-2">
                <div className="w-full h-15% flex justify-between items-center">
                  <div className="pl-4">
                    <strong>Items subtotal:</strong>
                  </div>
                  <div className="pr-4">{order.itemsPrice.toFixed(2)}</div>
                </div>
                <div className="w-full h-15% flex justify-between items-center">
                  <div className="pl-4">
                    <strong>Promotions & discounts:</strong>
                  </div>
                  <div className="pr-4">-</div>
                </div>
                <div className="w-full h-15% flex justify-between items-center">
                  <div className="pl-4">
                    <strong>Shipping:</strong>
                  </div>
                  <div className="pr-4">{order.shippingPrice.toFixed(2)}</div>
                </div>
                <div className="w-full h-15% flex justify-between items-center">
                  <div className="pl-4">
                    <strong>Tax collected:</strong>
                  </div>
                  <div className="pr-4">
                    {order.taxPrice ? order.taxPrice.toFixed(2) : 0}
                  </div>
                </div>
                <div className="w-full flex-grow flex justify-between items-center font-2rem uppercase">
                  <div className="pl-4">
                    <strong className="">Total</strong>
                  </div>
                  <div className="pr-4">$ {order.totalPrice.toFixed(2)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Order;
