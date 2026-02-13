// PaymentScreen.js
import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio
} from "@mui/material";
import { Card, CardBody } from "reactstrap";
import {
  Payment as PaymentIcon,
  LocalShipping,
  AccountBalance
} from "@mui/icons-material";

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const navigate = useNavigate();

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // ⭐ PAYMENT SUCCESS FUNCTION
  const handlePaymentSuccess = () => {
    Swal.fire({
      title: "Order Successful ✅",
      text: "Your order has been placed successfully!",
      icon: "success",
      confirmButtonText: "OK"
    }).then(() => {
      navigate("/"); // HOME PAGE REDIRECT
    });
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case "upi":
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="UPI ID"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handlePaymentSuccess}
            >
              Pay with UPI
            </Button>
          </Box>
        );

      case "cod":
        return (
          <Box sx={{ mt: 2 }}>
            <Typography sx={{ mb: 2 }}>
              Cash on Delivery
            </Typography>
            <Button
              variant="contained"
              fullWidth
              onClick={handlePaymentSuccess}
            >
              Confirm Cash on Delivery
            </Button>
          </Box>
        );

      case "card":
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Card Number"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Expiry Date"
              fullWidth
              margin="normal"
            />
            <TextField
              label="CVV"
              fullWidth
              margin="normal"
            />
            <Button
              variant="contained"
              fullWidth
              onClick={handlePaymentSuccess}
            >
              Pay with Card
            </Button>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: "auto", mt: 4 }}>
      <Card>
        <CardBody>
          <Typography variant="h5">
            Payment
          </Typography>

          <RadioGroup
            value={paymentMethod}
            onChange={handlePaymentMethodChange}
          >
            <FormControlLabel
              value="upi"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <PaymentIcon sx={{ mr: 1 }} /> UPI
                </Box>
              }
            />

            <FormControlLabel
              value="cod"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <LocalShipping sx={{ mr: 1 }} /> Cash on Delivery
                </Box>
              }
            />

            <FormControlLabel
              value="card"
              control={<Radio />}
              label={
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AccountBalance sx={{ mr: 1 }} /> Credit/Debit Card
                </Box>
              }
            />
          </RadioGroup>

          {renderPaymentForm()}
        </CardBody>
      </Card>
    </Box>
  );
};

export default PaymentScreen;
