import React, { useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddressDetails = () => {
  const [address, setAddress] = useState({
    name: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prevAddress) => ({
      ...prevAddress,
      [name]: value
    }));
  };

  const navigate = useNavigate();

  const handleProceedToPayment = () => {
    
    console.log(address);
    navigate('/payment'); 
  };

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Card className="address-details">
        <CardBody>
          <Typography variant="h5" gutterBottom>
            Address Details
          </Typography>
          <form>
            <TextField
              name="name"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address.name}
              onChange={handleChange}
            />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address.email}
              onChange={handleChange}
            />
            <TextField
              name="addressLine1"
              label="Address Line 1"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address.addressLine1}
              onChange={handleChange}
            />
            <TextField
              name="addressLine2"
              label="Address Line 2"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address.addressLine2}
              onChange={handleChange}
            />
            <TextField
              name="city"
              label="City"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address.city}
              onChange={handleChange}
            />
            <TextField
              name="state"
              label="State"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address.state}
              onChange={handleChange}
            />
            <TextField
              name="zip"
              label="Zip Code"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address.zip}
              onChange={handleChange}
            />
            <TextField
              name="country"
              label="Country"
              variant="outlined"
              fullWidth
              margin="normal"
              value={address.country}
              onChange={handleChange}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleProceedToPayment}
              sx={{ mt: 2 }}
            >
              Proceed to Payment
            </Button>
          </form>
        </CardBody>
      </Card>
    </Box>
  );
};

export default AddressDetails;
