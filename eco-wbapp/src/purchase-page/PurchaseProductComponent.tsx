import React, { useState } from 'react';
import {
  Box,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function PurchaseProductComponent() {
  const [purchases, setPurchases] = useState([
    {
      id: 1,
      name: 'Product 1',
      price: 10,
      quantity: 1,
      image:
        'https://m.media-amazon.com/images/I/81nyYcdA+HL._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 20,
      quantity: 1,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 30,
      quantity: 1,
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 40,
      quantity: 1,
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const handleIncreaseQuantity = (id: number) => {
    setPurchases((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id: number) => {
    setPurchases((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setPurchases((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <List>
      {purchases.map((item) => (
        <React.Fragment key={item.id}>
          <ListItem alignItems="flex-start" sx={{ width: '100%' }}>
            <Card
              sx={{
                maxWidth: '70px',
                maxHeight: '110px',
                marginRight: '20px',
              }}
            >
              <img
                src={item.image}
                alt={item.name}
                style={{ width: '100%', height: '100%' }}
              />
            </Card>
            <ListItemText
              primary={
                <>
                  <Typography variant="h6">{item.name}</Typography>
                  <Typography variant="subtitle1">
                    ${(item.price * item.quantity).toFixed(2)}
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Box display="flex" alignItems="center" mt={1}>
                    <IconButton
                      color="primary"
                      onClick={() => handleDecreaseQuantity(item.id)}
                    >
                      <RemoveIcon />
                    </IconButton>
                    <Typography variant="body2" sx={{ mx: 1 }}>
                      {item.quantity}
                    </Typography>
                    <IconButton
                      color="primary"
                      onClick={() => handleIncreaseQuantity(item.id)}
                    >
                      <AddIcon />
                    </IconButton>
                  </Box>
                </>
              }
            />
            <IconButton
              edge="end"
              color="error"
              onClick={() => handleDeleteItem(item.id)}
            >
              <DeleteIcon />
            </IconButton>
          </ListItem>
          <Divider component="li" />
        </React.Fragment>
      ))}
    </List>
  );
}
