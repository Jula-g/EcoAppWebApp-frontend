import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ProductDto } from '../EcoWebClient';

interface ProductCardProps {
  product: ProductDto;
}

export default function ProductCard({ product }: ProductCardProps) {
  // Fallback image if no base64 images exist
  const firstImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : 'https://via.placeholder.com/140x140';

  // Price is a string, convert to float for display
  const parsedPrice = parseFloat(product.price || '0');
  const priceDisplay = !isNaN(parsedPrice)
    ? `${parsedPrice.toFixed(2)} zł`
    : '---';

  return (
    <Card
      sx={{
        display: 'flex',
        backgroundColor: '#fff',
        color: '#123524',
        p: 2,
        mb: 2,
        borderRadius: 2,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 140, height: 140, objectFit: 'cover' }}
        // If your base64 includes "data:image/jpeg;base64," already, just do image={firstImage}
        image={firstImage}
        alt={product.name}
      />
      <CardContent
        sx={{ flex: 1, ml: 2, display: 'flex', flexDirection: 'column' }}
      >
        {/* Name and price in one row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5">{product.name}</Typography>
          <Typography variant="h5">{priceDisplay}</Typography>
        </Box>

        {/* Additional fields */}
        <Typography variant="body2" sx={{ mt: 1 }}>
          Condition: {product.condition}
        </Typography>
        <Typography variant="body2">Category: {product.category}</Typography>

        {/* Add to cart button at the bottom */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 'auto' }}>
          <Button
            size="medium"
            startIcon={<ShoppingCartIcon />}
            sx={{
              mt: 2,
              backgroundColor: '#123524',
              color: 'white',
              '&:hover': { backgroundColor: '#0e291b' },
            }}
          >
            ADD TO CART
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
