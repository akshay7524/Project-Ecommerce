import React from "react";
import CartProduct from "./CartProduct";
import LoginModal from "./LoginModal";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Row, Col, Table } from "reactstrap";
import { clearCart } from "../redux/Action";
import CartTotal from "./CartTotal";

const Cart = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
                         
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();

  const handleCheckout = () => {
    dispatch(clearCart());
    Swal.fire({
      title: "Order Placed",
      icon: "success",
    });
  };

  const totalAmount = cartData.reduce(
    (total, item) => total + item.quantity * item.price,
    0
    );

  if (!isLoggedIn) {
    return <LoginModal />;
  } else
    return (
      <div>
        {cartData.length ? (
          <Container fluid="md" className="CartContainer p-4">
            <Table responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                <CartProduct />
                
              </tbody>
            </Table>
           
          </Container>
          
        ) : (
          <div className="EmptyCartText">
            {" "}
            <h3>Go to home for more shopping!!!</h3>
          </div>
        )}
        <CartTotal />
      </div>
    );
};

export default Cart;
