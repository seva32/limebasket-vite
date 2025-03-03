import { Navigate, Route, Routes } from "react-router-dom";
import loadable from "@loadable/component";
import { ErrorBoundary } from "../common/ErrorBoundary";

import { ScrollToTop, Layout } from "../common";

export type RouteProp = {
  path: string;
  page: string;
  loadData?: (value: string) => void;
};

const Home = loadable(() => import("../views/Home"));
const Signin = loadable(() => import("../views/Signin"));
const Signup = loadable(() => import("../views/Signup"));
const Signout = loadable(() => import("../views/Signout"));
const NotFound = loadable(() => import("../views/NotFound"));
const Profile = loadable(() => import("../views/Profile"));
const Store = loadable(() => import("../views/Store"));
const ResetPassword = loadable(() => import("../views/ResetPassword"));
const ChangePassword = loadable(() => import("../views/ChangePassword"));
const Payment = loadable(() => import("../views/Payment"));
const Products = loadable(() => import("../views/Products"));
const Product = loadable(() => import("../views/Product"));
const Cart = loadable(() => import("../views/Cart"));
const Order = loadable(() => import("../views/Order"));
const PlaceOrder = loadable(() => import("../views/PlaceOrder"));
const Shipping = loadable(() => import("../views/Shipping"));
const Terms = loadable(() => import("../views/Terms"));

// const UniversalComponent = loadable(
//   async (props: RouteProp) => {
//     const result = await new Promise((resolve) =>
//       setTimeout(() => resolve("good"), 500)
//     );
//     console.log("result", result);
//     return import(`../views/${props.page}`);
//   },
//   {
//     fallback: <div>Loading...</div>,
//   }
// );

export const routes: RouteProp[] = [
  {
    path: "/",
    page: "Home",
    loadData: (value: string) => console.log(value),
  },
  {
    path: "/signin",
    page: "Signin",
  },
  {
    path: "/signup",
    page: "Signup",
  },
  {
    path: "/signout",
    page: "Signout",
  },
  {
    path: "/profile",
    page: "Profile",
  },
  {
    path: "/store",
    page: "Store",
  },
  {
    path: "/reset-password",
    page: "ResetPassword",
  },
  {
    path: "/reset-password/:token/:email",
    page: "ChangePassword",
  },
  {
    path: "/products/:id?",
    page: "Products",
  },
  {
    path: "/product/:id?",
    page: "Product",
  },
  {
    path: "/cart/:id?",
    page: "Cart",
  },
  {
    path: "/order/:id?",
    page: "Order",
  },
  {
    path: "/payment",
    page: "Payment",
  },
  {
    path: "/place-order",
    page: "PlaceOrder",
  },
  {
    path: "/shipping",
    page: "Shipping",
  },
  {
    path: "/about",
    page: "About",
  },
  {
    path: "/terms",
    page: "Terms",
  },
  //   {
  //     path: "/paypal",
  //     page: "Paypal",
  //   },
  //   {
  //     path: "/braintree",
  //     page: "Braintree",
  //   },
];

export default function appRouter() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Layout>
        <ScrollToTop />
        <Routes>
          {/* {routes.map((route: RouteProp, key: any) => (
          <Route
            key={key}
            element={<UniversalComponent {...route} />}
            {...route}
          />
        ))} */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signout" element={<Signout />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/store" element={<Store />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/reset-password/:token/:email"
            element={<ChangePassword />}
          />
          <Route path="/payment" element={<Payment />} />
          <Route path="/products/:id" element={<Products />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path="/order/:id" element={<Order />} />
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </ErrorBoundary>
  );
}
