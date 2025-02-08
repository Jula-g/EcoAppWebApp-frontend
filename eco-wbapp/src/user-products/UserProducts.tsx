import React, { useState, useEffect } from 'react';
import { useApi } from '../apiContext';
import { Box, Container, Typography, CircularProgress, Menu } from '@mui/material';
import ProductCard from './UserProductCard';  // Import the ProductCard component
import MenuAppBar from '../menu-bar/MenuAppBar';
import { ProductDto } from '../EcoWebClient';

const UserProductPage = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const apiClient = useApi();

    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    const userId = user.userId;
    console.log('userId:', userId);

    const [products, setProducts] = useState<ProductDto[]>([]);

    useEffect(() => {
        if (userId) {
            apiClient.getProductsByUserId(userId)
                .then((response) => {
                    console.log("API Response:", response);
                    if (response.success) {
                        console.log("Fetched Products:", response.data);
                        setProducts(response.data || []);
                    } else {
                        console.error('Error fetching products:', response.status);
                        setError("Failed to fetch products.");
                    }
                })
                .catch((err) => {
                    console.error('API call error:', err);
                    setError("An error occurred while fetching products.");
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [userId]);


    if (!userId) return <p>Please log in to see your products.</p>;

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh',
                    color: 'red',
                    fontSize: '1.2rem',
                }}
            >
                {error}
            </Box>
        );
    }

    return (
        <Box
            sx={{
                backgroundColor: '#EFE3C2',
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <MenuAppBar />
            <Box
                sx={{
                    maxWidth: '100%',
                    height: '100vh',
                    marginTop: '50px',
                    padding: '2%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '20px',
                    backgroundColor: '#EFE3C2',
                    overflowY: 'auto',
                }}
            >

                {products.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))}

            </Box>
        </Box>
    );
};

export default UserProductPage;
