// PaymentScreen.js
import React, { useState } from 'react';
import { Box, Button, Typography, TextField, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { Card, CardBody } from 'reactstrap';
import { Payment as PaymentIcon, LocalShipping, AccountBalance } from '@mui/icons-material';

const PaymentScreen = () => {
  const [paymentMethod, setPaymentMethod] = useState('');

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'upi':
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              name="upi"
              label="UPI ID"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" fullWidth>
              Pay with UPI
            </Button>
          </Box>
        );
      case 'cod':
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>
              Cash on Delivery
            </Typography>
            <Button variant="contained" color="primary" fullWidth>
              Confirm Cash on Delivery
            </Button>
          </Box>
        );
      case 'card':
        return (
          <Box sx={{ mt: 2 }}>
            <TextField
              name="cardNumber"
              label="Card Number"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              name="expiryDate"
              label="Expiry Date"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              name="cvv"
              label="CVV"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" color="primary" fullWidth>
              Pay with Card
            </Button>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Card className="payment-details">
        <CardBody>
          <Typography variant="h5" gutterBottom>
            Payment
          </Typography>
          <RadioGroup value={paymentMethod} onChange={handlePaymentMethodChange}>
            <FormControlLabel
              value="upi"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PaymentIcon sx={{ mr: 1 }} /> UPI
                </Box>
              }
            />
            <FormControlLabel
              value="cod"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalShipping sx={{ mr: 1 }} /> Cash on Delivery
                </Box>
              }
            />
            <FormControlLabel
              value="card"
              control={<Radio />}
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
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
