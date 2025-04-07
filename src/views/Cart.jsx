/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react/jsx-curly-newline */
import React from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { addToCart, removeFromCart } from "../store/actions/shop/cartActions";

import { Head, Loader, Policies, Navbar, Button } from "../common";

const url =
  process.env.NODE_ENV === "development"
    ? "http://localhost:4939/lime-api"
    : "https://lime-api.sfantini.us/lime-api";

function RandomKey() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

function formatCurrency(value) {
  return Number(value).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

function Header() {
  return (
    <div>
      <h1 className="py-12 text-space whitespace-no-wrap">
        Lime Basket Shopping Cart
      </h1>
    </div>
  );
}

function ProductList({
  products,
  removeFromCartHandler,
  updateQuantity,
  itemsBackup = [],
}) {
  const itemCount = products.reduce(
    (quantity, product) => quantity + +product.qty,
    0
  );

  return (
    <div className="w-full h-auto relative z-0">
      <h3 className="absolute top-0 right-0 text-united bg-white p-2 rounded-full mt-4 mr-4 z-10">
        {itemCount} item(s) in the bag
      </h3>

      {/* cart items  */}
      <ul className="flex flex-col flex-no-wrap">
        {products.map((item) => (
          <li
            className="p-4 relative w-full mb-2 bg-honeydew rounded-lg shadow flex flex-col sm:flex-row flex-no-wrap"
            key={RandomKey()}
          >
            {/* product image and details */}
            <div className="w-full sm:w-3/5 float-left flex h-180p sm:h-256p overflow-hidden justify-center items-center">
              {/* image */}
              <div className="w-1/2 h-full rounded-lg relative flex">
                <Link to={`/product/${item.product}`}>
                  <img
                    className="min-w-full h-full rounded-lg object-cover"
                    src={
                      item.image ||
                      itemsBackup.find((i) => i._id === item.product)?.image ||
                      "https://res.cloudinary.com/seva32/image/upload/v1602275957/tags_v8n3rz.svg"
                    }
                    alt={item.name}
                  />
                </Link>
              </div>
              {/* product description */}
              <div className="w-1/2 p-4 rounded-lg text-space">
                <Link className="uppercase" to={`/product/${item.product}`}>
                  <h3 className="pl-4 pb-6 font-2rem">
                    {item.name ||
                      itemsBackup.find((i) => i._id === item.product)?.name}
                  </h3>
                </Link>
                <div className="pl-4 pb-6 font-body w-full h-auto">
                  {item.description ||
                    itemsBackup.find((i) => i._id === item.product)
                      ?.description}
                </div>
                <h3 className="font-2rem pl-4 py-2 sm:py-4">
                  {item.price ||
                  itemsBackup.find((i) => i._id === item.product)?.price
                    ? formatCurrency(
                        item.price ||
                          itemsBackup.find((i) => i._id === item.product).price
                      )
                    : "not available"}
                </h3>
              </div>
            </div>

            {/* qty */}
            <div className="w-full sm:w-2/5 pt-2 sm:pt-0 pb-2 h-60p sm:h-75p flex justify-center items-center sm:self-center sm:flex sm:justify-center sm:items-center">
              {/* change qty */}
              <div className="w-3/5 sm:w-3/4 flex flex-no-wrap justify-around items-center font-2rem text-space">
                <div className="w-1/4">
                  <Button
                    size="md"
                    padding="p-0"
                    noArrow
                    handleClick={() =>
                      updateQuantity(item.product, item.qty + 1)
                    }
                    disabled={item.qty >= item.countInStock}
                  >
                    <strong>+</strong>
                  </Button>
                </div>
                <span className="w-1/4 align-middle inline-block text-center font-bold text-base sm:text-lg lg:text-xl">
                  {item.qty}
                </span>
                <div className="w-1/4">
                  <Button
                    size="md"
                    padding="p-0"
                    noArrow
                    handleClick={() =>
                      updateQuantity(item.product, item.qty - 1)
                    }
                    disabled={item.qty <= 0}
                  >
                    <strong>-</strong>
                  </Button>
                </div>
              </div>
              {/* remove item */}
              <div className="w-2/5 sm:w-1/4 flex justify-center sm:justify-end items-center">
                <button
                  className="w-1/3 sm:w-1/2 self-center sm:h-40p"
                  type="button"
                  onClick={() => removeFromCartHandler(item.product)}
                >
                  <img
                    src="https://res.cloudinary.com/seva32/image/upload/v1606237737/delete_oefc0p.svg"
                    alt="delete"
                  />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  removeFromCartHandler: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
};

function Summary({
  products,
  tax,
  discount,
  onEnterPromoCode,
  checkPromoCode,
  checkoutHandler,
}) {
  const subTotal = products.reduce(
    (total, product) => total + product.price * +product.qty,
    0
  );
  const discountTotal = (subTotal * discount) / 100;
  const total = subTotal > 0 ? subTotal - discount + tax : 0;

  return (
    <div className="w-full h-auto my-8 flex flex-col justify-center items-center">
      {/* promo code subtotal tax total */}
      <ul className="w-full flex flex-col flex-no-wrap justify-center items-end font-body text-space">
        <li className="w-full sm:w-1/2 flex-grow h-40p bg-honeydew rounded-lg shadow-md flex items-center mb-4">
          <span className="inline-block w-1/3 pl-4">Promo Code?</span>
          <form
            className="inline-block w-2/3 h-30p pr-4 rounded-md"
            onSubmit={checkPromoCode}
          >
            <input
              id="promo-code"
              type="text"
              onChange={onEnterPromoCode}
              className="w-full h-full"
            />
          </form>
        </li>

        <li className="w-full sm:w-1/2 flex-grow h-40p bg-honeydew rounded-lg shadow-md flex items-center mb-4">
          <span className="inline-block w-1/3 pl-4">Subtotal</span>
          <span className="flex justify-end items-center w-2/3 h-30p mr-4 text-right pr-4 rounded-md bg-white">
            {formatCurrency(subTotal)}
          </span>
        </li>
        {discountTotal > 0 && (
          <li className="w-full sm:w-1/2 flex-grow h-40p bg-honeydew rounded-lg shadow-md flex items-center mb-4">
            <span className="inline-block w-1/3 pl-4">Discount</span>
            <span className="flex justify-end items-center w-2/3 h-30p mr-4 text-right pr-4 rounded-md bg-white ">
              {formatCurrency(discountTotal)}
            </span>
          </li>
        )}
        <li className="w-full sm:w-1/2 flex-grow h-40p bg-honeydew rounded-lg shadow-md flex items-center mb-4">
          <span className="inline-block w-1/3 pl-4">Tax</span>
          <span className="flex justify-end items-center w-2/3 h-30p mr-4 text-right pr-4 rounded-md bg-white ">
            {subTotal > 0 ? formatCurrency(tax) : 0}
          </span>
        </li>
        <li className="w-full sm:w-1/2 flex-grow h-40p bg-honeydew rounded-lg shadow-md flex items-center uppercase font-2rem">
          <span className="inline-block w-1/3 pl-4">
            <strong>Total</strong>
          </span>
          <span className="flex justify-end items-center w-2/3 h-30p mr-4 rounded-md pr-4 bg-white text-right">
            {formatCurrency(total)}
          </span>
        </li>
      </ul>

      {/* checkout button */}
      <div className="my-8">
        <Button
          size="md"
          padding="p-0"
          handleClick={checkoutHandler}
          disabled={subTotal <= 0}
        >
          <div className="font-button">Check out</div>
        </Button>
      </div>
    </div>
  );
}

Summary.propTypes = {
  products: PropTypes.array.isRequired, // eslint-disable-line
  tax: PropTypes.number,
  discount: PropTypes.number,
  onEnterPromoCode: PropTypes.func.isRequired,
  checkPromoCode: PropTypes.func.isRequired,
  checkoutHandler: PropTypes.func.isRequired,
};

Summary.defaultProps = {
  tax: 0,
  discount: 0,
};

function Page() {
  const cart = useAppSelector((state) => state.cart);
  const [localCartItems, setLocalCartItems] = React.useState(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("localCart");
      return storedCart ? JSON.parse(storedCart) : cart.cartItems;
    }
    return cart.cartItems;
  });

  const auth = useAppSelector((state) => state.auth);
  const { authenticated } = auth;
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [promoCode, setPromoCode] = React.useState("");
  const [discount, setDiscount] = React.useState(0);

  const productId = id || null;
  const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    (async () => {
      await dispatch(addToCart(id, qty, "", (initialCart) => {
        setLocalCartItems([initialCart]);
      }));
    })();
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [productId]);

  React.useEffect(() => {
    localStorage.setItem("localCart", JSON.stringify(localCartItems));
  }, [localCartItems]);

  React.useEffect(() => {
    setLocalCartItems(cart.cartItems);
  }, [cart.cartItems]);

  // React.useEffect(() => {
  //   if (productId && qty) {
  //     setLocalCartItems((prev) => {
  //       const existingItem = prev.find((item) => item.product === productId);
  //       if (existingItem) {
  //         return prev.map((item) =>
  //           item.product === productId ? { ...item, qty } : item
  //         );
  //       }
  //       return [...prev, { product: productId, qty }];
  //     });
  //   }
  // }, []);

  const tax = 5;
  const promotions = [
    {
      code: "SUMMER",
      discount: "50%",
    },
    {
      code: "AUTUMN",
      discount: "40%",
    },
    {
      code: "WINTER",
      discount: "30%",
    },
  ];

  const onEnterPromoCode = (event) => {
    setPromoCode(event.target.value);
  };

  const checkPromoCode = () => {
    for (let i = 0; i < promotions.length; i++) {
      if (promoCode === promotions[i].code) {
        setDiscount(parseFloat(promotions[i].discount.replace("%", "")));
        return;
      }
    }

    setPromoCode("");
    alert("Sorry, the Promotional code you entered is not valid!");
  };

  return (
    <>
      <Head title="Lime Basket | Cart" />

      <div className="relative mb-24r z-0" id="top">
        {/* product screen */}
        <div className="min-h-screen sm:min-h-600p flex flex-col flex-no-wrap items-center relative w-full z-0">
          <div className="flex-none relative w-full">
            <Policies textColor="space" />
          </div>
          <hr className="text-space w-full sm:w-125per z-10 pb-1" />
          <div className="flex-none relative w-full z-10">
            <Navbar
              logged={!!authenticated}
              showSearchModal={false}
              clearModal={() => undefined}
              dark
              noSearchNoBag
            />
          </div>
          <div className="flex-none relative w-full text-center block">
            <Header />
          </div>

          {localCartItems.length > 0 ? (
            <>
              <ProductList
                products={localCartItems}
                updateQuantity={(id, qty) => {
                  setLocalCartItems((prev) =>
                    prev.map((item) =>
                      item.product === id ? { ...item, qty } : item
                    )
                  );
                }}
                removeFromCartHandler={(id) => {
                  setLocalCartItems((prev) =>
                    prev.filter((item) => item.product !== id)
                  );
                  dispatch(removeFromCart(id));
                }}
                itemsBackup={cart.cartItems}
              />

              <Summary
                products={localCartItems}
                discount={discount}
                tax={localCartItems.length > 0 ? tax : 0}
                onEnterPromoCode={onEnterPromoCode}
                checkPromoCode={checkPromoCode}
                checkoutHandler={() => {
                  localCartItems.forEach((item) => {
                    dispatch(
                      addToCart(item.product, item.qty, promoCode, () => {})
                    );
                  });
                  localStorage.removeItem("localCart");
                  navigate("/shipping");
                }}
              />
            </>
          ) : (
            <div className="empty-product text-center">
              <div className="text-indigo-800 text-sm md:text-base lg:text-lg text-center">
                There are no products in your cart.
              </div>
              <Link to="/products/all">
                <Button size="lg" handleClick={() => undefined} padding="pt-10">
                  <div className="font-button">Shopping now</div>
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Page;
