import React from "react";
import CartProduct from "./CartProduct";
import LoginModal from "./LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table } from "reactstrap";
import CartTotal from "./CartTotal";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const cartData = useSelector((state) => state.cartData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartData.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  // ⭐ LOGIN REQUIRED
  if (!isLoggedIn) {
    return (
      <LoginModal toggleShowModal={() => navigate("/")} />
    );
  }

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

          <h4>Total Amount: ₹ {totalAmount}</h4>
        </Container>
      ) : (
        <div className="EmptyCartText">
          <h3>Go to home for more shopping!!!</h3>
        </div>
      )}

      <CartTotal />
    </div>
  );
};

export default Cart;
