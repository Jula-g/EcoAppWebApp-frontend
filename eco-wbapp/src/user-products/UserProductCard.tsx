import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductDto } from '../EcoWebClient';
import { useApi } from '../apiContext';
import { useEffect, useState } from 'react';

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
                width: 200,
                height: 300,
                backgroundColor: '#fff',
                color: '#123524',
                p: 2,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    height: 140,
                    objectFit: 'cover',
                    borderRadius: 1,
                }}
                image={firstImage}
                alt={product.name}
            />
            <CardContent
                sx={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    padding: 0,
                }}
            >
                {/* Name and Price on top, stacked */}
                <Box sx={{ mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#666' }}>
                        {priceDisplay}
                    </Typography>
                </Box>

                {/* Status */}
                <Typography variant="body2" sx={{ color: '#666' }}>
                    Status: {product.status}
                </Typography>

                {/* Buttons below */}
                <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        startIcon={<EditIcon />}
                        sx={{ width: '48%' }}
                    >
                        Edit
                    </Button>
                    <Button
                        variant="outlined"
                        color="error"
                        startIcon={<DeleteIcon />}
                        sx={{ width: '48%' }}
                    >
                        Delete
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
