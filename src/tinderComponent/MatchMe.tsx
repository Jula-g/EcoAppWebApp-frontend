import React, { useEffect, useState } from 'react';
import { Box, Divider, IconButton, Typography } from '@mui/material';
import SwipeCards from './MatchMeComponent';
import MenuAppBar from '../menu-bar/MenuAppBar';
import { ProductDto } from '../EcoWebClient';
import { useApi } from '../apiContext';

import FavoriteIcon from '@mui/icons-material/Favorite'; // Heart Icon
import CloseIcon from '@mui/icons-material/Close'; // X Icon

export default function MatchMe() {
  const api = useApi();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState<number>(0); // Track the current product index
  const [triggerSwipe, setTriggerSwipe] = useState<number>(0);

  useEffect(() => {
    (async () => {
      try {
        const allProducts = await api.getAllProducts();
        setProducts(allProducts.data ?? []); // Store the fetched products
      } catch (err) {
        console.error('Error fetching products:', err);
      }
    })();
  }, [api]);

  // Get the current product details
  const currentProduct = products[currentProductIndex];

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
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: '#EFE3C2',
          maxHeight: '100%',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: '90%',
            padding: '5%',
            height: '70%',
            marginTop: '60px',
            backgroundColor: 'white',
            borderRadius: '28px',
            boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
            p: '40px 20px',
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '20px',
          }}
        >
          {/* LEFT SIDE: Information Text */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              paddingLeft: '20px',
              alignItems: { xs: 'center', md: 'flex-start' },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontFamily: 'Poppins',
                color: '#123524',
                fontWeight: 'bold',
                mb: 2
              }}
            >
              Product Information
            </Typography>
            {currentProduct && (
              <Box sx={{ width: '100%' }}>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                  }}
                >
                  {/* Display details of the current product */}
                  <Box sx={{ width: '90%' }}>
                    <Typography variant="h5" sx={{ fontFamily: 'Poppins', fontWeight: 'bold', color: '#555555' }}>
                      {currentProduct.name}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#555555', mb: 2 }}>
                      {currentProduct.description}
                    </Typography>
                    <Divider>

                    </Divider>
                    <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#555555', mt: 2 }}>
                      Condition: {currentProduct.condition}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#555555' }}>
                      Transaction Type: {currentProduct.transactionType}
                    </Typography>
                    <Typography variant="body1" sx={{ fontFamily: 'Poppins', color: '#555555' }}>
                      Pickup address: {currentProduct.adress.city}, {currentProduct.adress.street} street
                    </Typography>
                  </Box>

                  <Box sx={{ width: '10%' }}>
                    <Typography variant='h2' sx={{ fontFamily: 'Poppins', color: '#555555', mb: 2 }}>
                      ${currentProduct.price}
                    </Typography>

                  </Box>

                </Box>
              </Box>
            )}
          </Box>

          {/* RIGHT SIDE: Swipe Component */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              position: 'relative'
            }}
          >

            {/* X Icon on the left */}
            <IconButton
              sx={{
                position: 'absolute',
                left: '80px',
                bottom: '-10px',
                zIndex: 1,
                backgroundColor: '#A63D40',
                borderRadius: '50%',
                color: '#fff',
                padding: '10px',
                '&:hover': {
                  backgroundColor: '#D04B47',
                },
              }}
              onClick={() => setTriggerSwipe(triggerSwipe - 1)}
            >
              <CloseIcon sx={{ fontSize: '80px' }} />
            </IconButton>

            {/* Heart Icon on the right */}
            <IconButton
              sx={{
                position: 'absolute',
                right: '-10px',
                bottom: '-10px',
                zIndex: 1,
                backgroundColor: '#85A947',
                borderRadius: '50%',
                color: '#fff',
                padding: '20px',
                '&:hover': {
                  backgroundColor: '#6B9A3B',
                },
              }}
              onClick={() => setTriggerSwipe(triggerSwipe + 1)}
            >
              <FavoriteIcon sx={{ fontSize: '60px' }} />
            </IconButton>

            {/* Pass products and the current product index to SwipeCards */}
            <SwipeCards
              products={products}
              currentProductIndex={currentProductIndex}
              setCurrentProductIndex={setCurrentProductIndex}
              triggerSwipe={triggerSwipe}
            />
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          width: '100%',
          backgroundColor: '#123524',
          color: '#ffffff',
          padding: '30px 20px',
          textAlign: 'center',
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
