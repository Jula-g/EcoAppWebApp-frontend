import {
  Box,
  Typography,
  Grid,
  TextField,
  Pagination,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
} from '@mui/material';
import { useState, useEffect } from 'react';

import MenuAppBar from '../menu-bar/MenuAppBar';
import { useApi } from '../apiContext';

import ProductCard from '../home-page/ProductCard';

export default function ShoppingPage() {
  // --- Dummy product data ---
  const products = Array.from({ length: 100 }, (_, index) => ({
    id: index + 1,
    name: `Product ${index + 1}`,
    price: `${(5000 + index * 100).toFixed(2)} zł`,
    image: 'https://via.placeholder.com/200x200',
    condition: index % 2 === 0 ? 'Nowy' : 'Używany',
    category: ['Meble', 'Żywność', 'Ubrania', 'Elektronika'][index % 4],
  }));

  // --- States ---
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedConditions, setSelectedConditions] = useState({
    New: false,
    Excellent: false,
    Good: false,
    Fair: false,
    Poor: false,
  });

  const [selectedCategories, setSelectedCategories] = useState({
    Furniture: false,
    Food: false,
    Clothes: false,
    Electronics: false,
  });

  const handleClick = () => {
    const token = localStorage.getItem('authToken');
    if (token && !isTokenExpired(token)) {
      navigate('/add-product');
    } else {
      alert('You must be logged in to sell a product. Please log in to continue.');
      navigate('/');
    }
  };


  // Show/Hide search bar on scroll
  const [showSearch, setShowSearch] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Fetch products on mount
  useEffect(() => {
    (async () => {
      try {
        const allProducts = await api.getAllProducts();
        setProducts(allProducts.data ?? []);
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    })();
  }, [api]);

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
      const noCategorySelected = Object.values(selectedCategories).every(
        (val) => !val
      );
      const categoryMatches =
        selectedCategories[product.category as keyof typeof selectedCategories];
      const categoryCheck = noCategorySelected || categoryMatches;

      // Condition filter (Fix: Ensure `product.condition` is defined)
      const condition = product.condition
        ? product.condition.toLowerCase()
        : '';
      const isNew = condition === 'nowy';
      const isUsed = condition === 'używany';
      const conditionCheck =
        (newCondition && product.condition === 'Nowy') ||
        (usedCondition && product.condition === 'Używany') ||
        (!newCondition && !usedCondition);

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
  const handleConditionChange = (condition: string) => {
    setSelectedConditions((prev) => ({
      ...prev,
      [condition]: !prev[condition as keyof typeof selectedConditions],
    }));
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#EFE3C2' }}>
        {' '}
        <MenuAppBar />
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
        <Box
          sx={{
            marginTop: '80px',
            display: 'flex',
            backgroundColor: '#EFE3C2',
            minHeight: '200vh', // just to ensure scrolling
            px: 2,
            py: 2,
          }}
        >
          {/* SIDEBAR */}
          <Box
            sx={{
              width: '20%',
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '8px',
              position: 'sticky',
              top: '80px',
              height: 'fit-content',
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginBottom: '20px', color: '#000' }}
            >
              Kategorie
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

            <Typography
              variant="h6"
              sx={{ marginTop: '20px', marginBottom: '10px', color: '#000' }}
            >
              Filtruj
            </Typography>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={newCondition}
                    onChange={(e) => setNewCondition(e.target.checked)}
                  />
                }
                label="Nowe"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={usedCondition}
                    onChange={(e) => setUsedCondition(e.target.checked)}
                  />
                }
                label="Używane"
              />
            </FormGroup>
          </Box>

        {/* Main products grid */}
        <Box sx={{ flex: 1, marginLeft: '20px' }}>
          <Grid container spacing={2}>
            {paginatedProducts.map((product, idx) => (
              <Grid item xs={12} key={idx}>
                <ProductCard product={product} />
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
