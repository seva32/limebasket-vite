/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-alert */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable implicit-arrow-linebreak */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import authHeader from "../../utils/misc/auth-header";

const baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4939/lime-api"
    : "https://lime-api.sfantini.us/lime-api";
const clientId = process.env.VITE_PAYPAL_CLIENT;

const PaypalButton = ({
  onButtonReady,
  amount,
  onSuccessCapture,
  onCancelPay,
}) => {
  const [sdkReady, setSdkReady] = useState(false);
  const windowPaypal = React.useRef(null);

  const addPaypalSdk = (token) => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = `https://www.paypal.com/sdk/js?components=hosted-fields,buttons&client-id=${clientId}`;
    script.async = true;
    script["data-client-token"] = token;
    script.onload = () => {
      setSdkReady(true);
    };
    script.onerror = () => {
      throw new Error("Paypal SDK could not be loaded. Script.");
    };
    document.body.appendChild(script);
  };

  const axiosinstance = React.useRef(null);

  useEffect(() => {
    let isMounted = true;
    const defaultOptions = {
      headers: authHeader(),
    };
    axiosinstance.current = axios.create(defaultOptions);

    // get access token from server
    if (!sdkReady) {
      // here check for unmounted component
      axiosinstance.current
        .get(`${baseURL}/payment/create-access-token`)
        .then(({ data: { data } }) => data.client_token)
        .then((token) => {
          if (isMounted) {
            addPaypalSdk(token);
          }
        })
        .catch((e) => {
          console.log("Error on paypal sdk load. ", e.message);
        });
    }

    if (sdkReady) {
      onButtonReady({ message: "button ready" });

      windowPaypal.current = window.paypal;

      windowPaypal.current
        .Buttons({
          commit: false,
          createOrder(data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: parseFloat(amount),
                  },
                },
              ],
            });
          },
          onCancel(data) {
            onCancelPay(data);
          },
          onApprove(data, actions) {
            // data:
            // billingToken: null
            // facilitatorAccessToken: "A21AAFA1vtHjek2i329pL...UlVoycO16BxLfwPkX3EDRu4xuw"
            // orderID: "3XN16909EC3087418"
            // payerID: "FV226882NKSMA"
            // paymentID: null
            // This function captures the funds from the transaction
            return actions.order.capture().then((details) => {
              // details
              // create_time: "2020-08-27T00:23:27Z"
              // id: "3XN16909EC3087418"
              // intent: "CAPTURE"
              // links: (1) […] 0: {…} href: "https://api.sandbox.paypal.com/v2/checkout/orders/3XN16909EC3087418"
              // method: "GET"
              // payer: {…}
              // address: Object { country_code: "US" }
              // email_address: "person@sebastianfantini.com"
              // name: Object { given_name: "hola", surname: "chau" }
              // payer_id: "FV226882NKSMA"
              // purchase_units: (1) […] 0: {…} amount: Obj { value: "2.00", currency_code: "USD" }
              // payee: Obj{ email_address: "business@seb...", merchant_id: "8WTP5WQJUEMSW" }
              // payments: Object { captures: (1) […] }
              // reference_id: "default"
              // shipping: Object { name: {…}, address: {…} }
              // soft_descriptor: "PAYPAL *SUSILUSTEST"
              // status: "COMPLETED"
              // update_time: "2020-08-27T00:26:11Z"

              // This function shows a transaction success message to your buyer
              onSuccessCapture({ ...details });
            });
          },
        })
        .render("#paypal-button-container");
    }

    return () => {
      isMounted = false;
      windowPaypal.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sdkReady]);

  return <div id="paypal-button-container" />;
};

PaypalButton.propTypes = {
  onButtonReady: PropTypes.func,
  amount: PropTypes.string,
  onSuccessCapture: PropTypes.func,
  onCancelPay: PropTypes.func,
};

PaypalButton.defaultProps = {
  onButtonReady: () => {},
  amount: null,
  onSuccessCapture: () => {},
  onCancelPay: () => {},
};

export default PaypalButton;
