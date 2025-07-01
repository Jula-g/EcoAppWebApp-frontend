import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import PurchaseProductComponent from './PurchaseProductComponent';

interface ProductSelectionProps {
  purchases: any[];
  setPurchases: React.Dispatch<React.SetStateAction<any[]>>;
  totalAmount: number;
  onNext: () => void;
}

const ProductSelection: React.FC<ProductSelectionProps> = ({
  purchases,
  setPurchases,
  totalAmount,
  onNext,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row', // Use row to create two columns
        gap: '20px',
        alignItems: 'flex-start',
      }}
    >
      {/* Left Column: Product List */}
      <Box
        sx={{
          flex: 2,
          backgroundColor: '#f5f5f5',
          padding: '20px',
          borderRadius: '8px',
        }}
      >
        <PurchaseProductComponent
          purchases={purchases}
          setPurchases={setPurchases}
        />
      </Box>

      {/* Right Column: Total and Next Button */}
      <Box
        sx={{
          flex: 1,
          backgroundColor: '#e0e0e0',
          padding: '20px',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Typography variant="h6" sx={{ color: 'black' }}>
          Total: ${totalAmount.toFixed(2)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={onNext}
          sx={{ alignSelf: 'center', width: '100%' }}
        >
          Confirm
        </Button>
      </Box>
    </Box>
  );
};

export default ProductSelection;
