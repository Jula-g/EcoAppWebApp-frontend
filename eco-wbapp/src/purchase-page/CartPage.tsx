import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PurchaseProductComponent from './PurchaseProductComponent';
import PurchaseNavBar from './PurchaseNavBar';
import products from '../products';

export default function PurchaseListComponent() {
  // Move purchases state here
  const [purchases, setPurchases] = useState(products);

  // Calculate the total amount
  const totalAmount = purchases.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <Box
      sx={{
        backgroundColor: '#bdbcb9',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '20px',
      }}
    >
      <PurchaseNavBar />
      <Box
        sx={{
          backgroundColor: '#7a7a79',
          padding: '20px',
          width: '100%',
          maxWidth: '85%',
          minHeight: '100vh',
          margin: 'auto',
          display: 'flex',
          marginTop: '70px',
        }}
      >
        <Box
          sx={{
            backgroundColor: '#4f4f4d',
            width: '60%',
            minHeight: '100px',
            marginRight: '40px',
          }}
        >
          <PurchaseProductComponent
            purchases={purchases}
            setPurchases={setPurchases}
          />
        </Box>
        <Box
          sx={{
            backgroundColor: '#363632',
            width: '35%',
            padding: '20px',
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'white',
            }}
          >
            Total: ${totalAmount.toFixed(2)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
