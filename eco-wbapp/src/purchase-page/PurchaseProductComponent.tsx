import React from 'react';
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

interface Purchase {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface PurchaseProductComponentProps {
  purchases: Purchase[];
  setPurchases: React.Dispatch<React.SetStateAction<Purchase[]>>;
}
export default function PurchaseProductComponent({
  purchases,
  setPurchases,
}: PurchaseProductComponentProps) {
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
