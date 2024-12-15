import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import PurchaseProductComponent from './PurchaseProductComponent';
import PurchaseNavBar from './PurchaseNavBar';
import products from '../products';
import CustomizedSteppers from './ProgressComponent';

export default function PurchaseListComponent() {
  // State for purchases
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
        flexDirection: 'column',
      }}
    >
      <PurchaseNavBar />
      <Box
        sx={{
          backgroundColor: '#1b052b',
          padding: '20px',
          width: '100%',
          maxWidth: '85%',
          minHeight: '100vh',
          margin: 'auto',
          marginTop: '70px',
          display: 'flex',
          borderRadius: '28px',
          flexDirection: 'column',
        }}
      >
        {/* Yellow box at the top */}
        <Box
          sx={{
            backgroundColor: 'yellow',
            width: '100%',
            minHeight: '100px',
            paddingTop: '40px',
            borderRadius: '28px',
            marginBottom: '20px',
          }}
        >
          <CustomizedSteppers />
        </Box>

        {/* Main content with products on the left and total on the right */}
        <Box
          sx={{
            backgroundColor: '#dbcae8',
            padding: '20px',
            borderRadius: '28px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              width: '100%',
              gap: '20px',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#4f4f4d',
                width: '65%', // Adjust width as necessary
                minHeight: '100px',
                padding: '20px',
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
                width: '30%',
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
      </Box>
    </Box>
  );
}
