import React, { useState, useEffect } from 'react';
import { useApi } from '../apiContext';
import { Box, Container, Typography, CircularProgress, Menu, FormGroup, FormControlLabel, Checkbox, Button, TextField, Grid, Pagination } from '@mui/material';
import ProductCard from './UserProductCard';  // Import the ProductCard component
import MenuAppBar from '../menu-bar/MenuAppBar';
import { ProductDto } from '../EcoWebClient';

export default function UserProductPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const apiClient = useApi();

    const user = JSON.parse(localStorage.getItem('authUser') || '{}');
    const userId = user.userId;
    console.log('userId:', userId);

    const [products, setProducts] = useState<ProductDto[]>([]);

    const handleProductDelete = () => {
        // Re-fetch products after deletion
        const fetchProducts = async () => {
            try {
                const response = await apiClient.getProductsByUserId(userId);
                if (response.success) {
                    setProducts(response.data ?? []);
                }
            } catch (err) {
                console.error('Error fetching products:', err);
            }
        };

        fetchProducts();
    };

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


    // State for search, pagination, and filters
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedStatus, setSelectedStatus] = useState({
        Available: false,
        Sold: false,
        Reserved: false,
    });

    const [selectedCategories, setSelectedCategories] = useState({
        Furniture: false,
        Food: false,
        Clothes: false,
        Electronics: false,
    });

    // Show/Hide search bar on scroll
    const [showSearch, setShowSearch] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    // Listen to scroll events to hide/show search bar
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY + 5) {
                setShowSearch(false);
            } else if (currentScrollY < lastScrollY - 5) {
                setShowSearch(true);
            }
            setLastScrollY(currentScrollY);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);

    // --- Filtering Logic ---
    const filteredProducts = products
        .filter((product) => {
            // Category filter
            const categoryCheck =
                Object.values(selectedCategories).every((isChecked) => !isChecked) ||
                selectedCategories[product.category as keyof typeof selectedCategories];

            const formattedStatus =
                product.status.charAt(0) + product.status.slice(1).toLowerCase();

            // Status filter
            const conditionCheck =
                Object.values(selectedStatus).every((isChecked) => !isChecked) ||
                selectedStatus[formattedStatus as keyof typeof selectedStatus];

            return categoryCheck && conditionCheck;
        })
        .filter((product) =>
            product.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );

    // Pagination
    const itemsPerPage = 15;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedProducts = filteredProducts.slice(
        startIndex,
        startIndex + itemsPerPage
    );

    // Handlers
    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
        setCurrentPage(1); // reset to page 1 on new search
    };

    const handlePageChange = (event: unknown, value: number) => {
        setCurrentPage(value);
    };

    const handleCategoryChange = (category: string) => {
        setSelectedCategories((prev) => ({
            ...prev,
            [category]: !prev[category as keyof typeof selectedCategories],
        }));
        setCurrentPage(1); // reset to page 1 on new filter
    };

    const handleStatusChange = (status: string) => {
        setSelectedStatus((prev) => ({
            ...prev,
            [status]: !prev[status as keyof typeof selectedStatus],
        }));
    };


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
        <Box sx={{ backgroundColor: '#EFE3C2', minHeight: '100vh' }}>
            {/* Optional menu bar */}
            <MenuAppBar />

            {/* Sticky search bar */}
            <Box
                sx={{
                    position: 'sticky',
                    top: '64px',
                    zIndex: 1099,
                    backgroundColor: '#123524',
                    transition: 'transform 0.3s ease-in-out',
                    transform: showSearch ? 'translateY(0)' : 'translateY(-80px)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    py: 2,
                    px: 2,
                }}
            >
                <TextField
                    placeholder="Szukaj"
                    variant="filled"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    InputProps={{ disableUnderline: true }}
                    sx={{
                        width: '60%',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '16px',
                        '& .MuiFilledInput-root': {
                            borderRadius: '16px',
                            height: '48px',
                            padding: 0,
                            alignItems: 'center',
                        },
                        '& .MuiFilledInput-input': {
                            padding: '0 12px',
                            lineHeight: 'normal',
                        },
                        '& .MuiFilledInput-root::before, & .MuiFilledInput-root::after': {
                            display: 'none',
                        },
                    }}
                />
            </Box>

            {/* Main content + sidebar */}
            <Box
                sx={{
                    display: 'flex',
                    px: 2,
                    py: 2,
                    backgroundColor: '#EFE3C2',
                    marginTop: '80px',
                    gap: 2,
                }}
            >

                <Box
                    sx={{
                        width: '20%',
                        borderRadius: '8px',
                        position: 'sticky',
                        top: '80px',
                        height: 'fit-content',
                    }}
                >
                    {/* Sidebar */}
                    <Box
                        sx={{
                            width: '85%',
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '8px',
                            position: 'sticky',
                            top: '80px',
                            height: 'fit-content',
                        }}
                    >
                        <Typography variant="h6" sx={{ marginBottom: '20px', color: '#000' }}>
                            Category
                        </Typography>
                        <FormGroup>
                            {Object.keys(selectedCategories).map((category) => (
                                <FormControlLabel
                                    key={category}
                                    control={
                                        <Checkbox
                                            checked={
                                                selectedCategories[
                                                category as keyof typeof selectedCategories
                                                ]
                                            }
                                            onChange={() => handleCategoryChange(category)}
                                        />
                                    }
                                    label={category}
                                />
                            ))}
                        </FormGroup>

                        <Typography variant="h6" sx={{ mt: 2, mb: 1, color: '#000' }}>
                            Status
                        </Typography>
                        <FormGroup>
                            {Object.keys(selectedStatus).map((status) => (
                                <FormControlLabel
                                    key={status}
                                    control={
                                        <Checkbox
                                            checked={
                                                selectedStatus[
                                                status as keyof typeof selectedStatus
                                                ]
                                            }
                                            onChange={() => handleStatusChange(status)}
                                        />
                                    }
                                    label={status}
                                />
                            ))}
                        </FormGroup>
                    </Box>
                </Box>

                {/* Main products grid */}
                <Box sx={{ flex: 1, marginLeft: '20px' }}>
                    <Grid container spacing={2}>
                        {/* {products.map((product, index) => (
                            <ProductCard key={index} product={product} onDelete={handleProductDelete} />
                        ))} */}

                        {paginatedProducts.map((product, idx) => (
                            <Grid item xs={12} key={idx}>
                                <ProductCard product={product} onDelete={handleProductDelete} />
                            </Grid>
                        ))}
                    </Grid>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <Pagination
                            count={totalPages}
                            page={currentPage}
                            onChange={handlePageChange}
                            sx={{ mt: '20px', display: 'flex', justifyContent: 'center' }}
                        />
                    )}
                </Box>
            </Box>

            {/* Footer */}
            <Box
                sx={{
                    width: '100%',
                    backgroundColor: '#123524',
                    color: '#ffffff',
                    padding: '30px 20px',
                    textAlign: 'center',
                    marginTop: '60px',
                    boxSizing: 'border-box',
                }}
            >
                <Typography
                    variant="body1"
                    sx={{
                        fontFamily: 'Poppins',
                        fontSize: '16px',
                        color: '#85A947',
                    }}
                >
                    &copy; {new Date().getFullYear()} EcoStore. Crafted with care for our
                    planet.
                </Typography>
            </Box>
        </Box>
    );
}