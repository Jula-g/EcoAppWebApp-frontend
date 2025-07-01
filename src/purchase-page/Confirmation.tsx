import React from 'react';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';

interface ConfirmationProps {
  userData: { name: string; address: string; email: string };
  deliveryOption: string;
  totalAmount: number;
  onBack: () => void;
  onConfirm: () => void;
}

const Confirmation: React.FC<ConfirmationProps> = ({
  userData,
  deliveryOption,
  totalAmount,
  onBack,
  onConfirm,
}) => {
  const deliveryCharge =
    deliveryOption === 'standard' ? 5 : deliveryOption === 'express' ? 10 : 0;
  const finalAmount = totalAmount + deliveryCharge;

  // Payment method options (for mock purposes)
  const [paymentMethod, setPaymentMethod] = React.useState<string>('');

  const handlePaymentChange = (event: SelectChangeEvent<string>) => {
    setPaymentMethod(event.target.value as string);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <Typography variant="h6" sx={{ color: 'black' }}>
        Confirmation
      </Typography>
      <Typography variant="body1" sx={{ color: 'black' }}>
        Name: {userData.name}
      </Typography>
      <Typography variant="body1" sx={{ color: 'black' }}>
        Address: {userData.address}
      </Typography>
      <Typography variant="body1" sx={{ color: 'black' }}>
        Email: {userData.email}
      </Typography>
      <Typography variant="body1" sx={{ color: 'black' }}>
        Delivery Option: {deliveryOption}
      </Typography>
      <Typography variant="h6" sx={{ color: 'black' }}>
        Total: ${finalAmount.toFixed(2)}
      </Typography>

      {/* Payment Option (shown when the totalAmount > 0) */}
      {finalAmount > 0 && (
        <Box sx={{ marginTop: '20px' }}>
          <FormControl fullWidth>
            <InputLabel>Payment Method</InputLabel>
            <Select
              value={paymentMethod}
              onChange={handlePaymentChange}
              label="Payment Method"
            >
              <MenuItem value="credit-card">Credit Card</MenuItem>
              <MenuItem value="paypal">PayPal</MenuItem>
              <MenuItem value="bank-transfer">Bank Transfer</MenuItem>
            </Select>
          </FormControl>
        </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
        }}
      >
        <Button variant="outlined" onClick={onBack}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={finalAmount > 0 && !paymentMethod} // Disable if payment method is not selected
        >
          {finalAmount > 0 ? 'Pay' : 'Confirm'}
        </Button>
      </Box>
    </Box>
  );
};

export default Confirmation;
