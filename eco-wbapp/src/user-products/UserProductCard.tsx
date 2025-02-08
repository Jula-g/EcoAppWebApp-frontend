import {
    Box,
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    CircularProgress,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ProductDto } from '../EcoWebClient';
import { useApi } from '../apiContext';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
    product: ProductDto;
    onDelete: () => void;
}

export default function ProductCard({ product, onDelete }: ProductCardProps) {
    const userId = JSON.parse(localStorage.getItem('authUser') || '{}').userId;
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [loading, setLoading] = useState(false);
    const apiClient = useApi();
    const navigate = useNavigate();

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

    // Open delete confirmation dialog
    const handleDeleteClick = () => {
        console.log('Delete clicked');
        setOpenDeleteDialog(true);
    };

    // Close delete confirmation dialog
    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
    };

    // Confirm deletion
    const handleConfirmDelete = async () => {
        setLoading(true); // Set loading state while deleting
        try {
            console.log('Deleting product using userID:', userId);
            console.log('Deleting product using productID:', product.id);
            const response = await apiClient.deleteProduct(userId, product.id);
            if (response.success) {
                alert('Product deleted successfully');
                onDelete(); // Trigger parent component to update product list
            } else {
                alert('Error deleting product');
            }
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('An error occurred while deleting the product');
        } finally {
            setLoading(false);
            setOpenDeleteDialog(false);
        }
    };

    const handleEditClick = () => {
        localStorage.setItem('productToEdit', JSON.stringify(product));
        navigate('/update-product', { replace: true });
    };

    return (
        <Card
            sx={{
                width: 600,  // Set width for horizontal layout
                height: 120, // Reduced height
                backgroundColor: '#fff',
                color: '#123524',
                display: 'flex',
                flexDirection: 'row',  // Horizontal layout
                borderRadius: 2,
                p: 1,
            }}
        >
            <CardMedia
                component="img"
                sx={{
                    width: 100,  // Smaller image width
                    height: 100, // Keep the image square
                    objectFit: 'cover',
                    borderRadius: 1,
                    marginRight: 2,  // Spacing between image and text
                }}
                image={firstImage}
                alt={product.name}
            />
            <CardContent
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    flex: 1,
                    padding: 0,
                }}
            >
                {/* Name and Price on top */}
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
            </CardContent>

            {/* Buttons on the right side */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'flex-end',
                padding: 1,
            }}>
                <Button
                    variant="outlined"
                    startIcon={<EditIcon />}
                    sx={{
                        mb: 1,
                        width: '100%',
                        borderColor: '#123524', // Set the border color
                        color: '#123524', // Set the text color
                        '&:hover': {
                            borderColor: '#85A947',
                            color: '#85A947',
                            backgroundColor: 'rgba(18, 53, 36, 0.1)', // Set hover background color
                        },
                    }}
                    onClick={handleEditClick}
                >
                    Edit
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    sx={{
                        mb: 1,
                        width: '100%',
                    }}
                    onClick={handleDeleteClick}
                >
                    Delete
                </Button>
            </Box>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={openDeleteDialog}
                onClose={handleCloseDeleteDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Are you sure you want to delete {product.name} from your listed product?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        color="error"
                        autoFocus
                        disabled={loading}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}
