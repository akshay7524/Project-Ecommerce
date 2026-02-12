import React, { Suspense } from "react";
import NavBar from "./NavBar";
import { Routes, Route } from "react-router-dom";
import { Spinner } from "reactstrap";

// Lazy loading components
const Cart = React.lazy(() => import("./Cart"));
const ProductDetail = React.lazy(() => import("./ProductDetail"));
const AddressDetails = React.lazy(() => import("./AddressDetails"));
const Home = React.lazy(() => import("./Home"));
const PaymentScreen = React.lazy(() => import("./PaymentScreen"));

const Main = () => {
  return (
    <>
      <NavBar />
      <Suspense
        fallback={
          <div className="EmptCartText">
            <Spinner color="primary" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ProductDetail/:productId" element={<ProductDetail />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/address" element={<AddressDetails />} />
          <Route path="/payment" element={<PaymentScreen />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default Main;
