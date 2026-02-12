import React from "react";
import { useSelector } from "react-redux";
import { Card, CardBody } from "reactstrap";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const CartTotal = () => {
  const cartData = useSelector((state) => state.cartData);
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartData.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const roundOff = (floatNum) => parseFloat(floatNum.toFixed(2));
  const subTotal = calculateTotal();
  const tax = roundOff(0.18 * subTotal);
  const totalAmount = roundOff(subTotal + tax);
                                                                  


  
  const handleProceedToCheckout = () => {
    navigate("/address");
  };

  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Card className="cart-total">
        <CardBody>
          <h2><b>Cart Total</b></h2>
          <p>Cart Subtotal: ${subTotal.toFixed(2)}</p>
          <p>Shipping: $TBD</p>
          <p>Tax (18%): ${tax.toFixed(2)}</p>
          <p className="total-amount">Total Amount: ${totalAmount}</p>
          <Button variant="contained" color="primary" fullWidth onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </Button>
        </CardBody>
      </Card>
    </Box>
  );
};

export default CartTotal;
