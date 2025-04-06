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

export default function appRouter() {
  return (
    <ErrorBoundary fallback={<p>Something went wrong</p>}>
      <Layout>
        <ScrollToTop />
        <Routes>
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
