import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  condition: string;
  category: string;
}

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card
      sx={{
        display: 'flex',
        backgroundColor: '#fff', // White card background
        color: '#FFFFFF', // Light text (you may want to adjust if background is white)
        p: 2,
        mb: 2,
        borderRadius: 2,
      }}
    >
      {/* IMAGE SECTION */}
      <CardMedia
        component="img"
        sx={{
          width: 140,
          height: 140,
          objectFit: 'cover',
        }}
        image={product.image}
        alt={product.name}
      />

      {/* CONTENT SECTION */}
      <CardContent
        sx={{ flex: 1, ml: 2, display: 'flex', flexDirection: 'column' }}
      >
        {/* ROW: Name (left) & Price (right) */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontFamily: 'Poppins', color: '#123524', m: 0 }}
          >
            {product.name}
          </Typography>

          <Typography
            variant="h5"
            sx={{ fontFamily: 'Poppins', color: '#123524', m: 0 }}
          >
            {product.price}
          </Typography>
        </Box>

        {/* CONDITION OR OTHER DETAILS */}
        <Typography
          variant="body2"
          sx={{ mt: 2, fontFamily: 'Poppins', color: '#123524' }}
        >
          Condition: {product.condition}
        </Typography>

        {/* BUTTON (right-aligned if desired) */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
          <Button
            size="medium"
            startIcon={<ShoppingCartIcon />}
            sx={{
              mt: 2,
              backgroundColor: '#123524',
              fontFamily: 'Poppins',
              color: 'white',
            }}
          >
            ADD TO CART
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
