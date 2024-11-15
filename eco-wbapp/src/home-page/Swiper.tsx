import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

function Swiper() {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const mockData = [
    {
      id: 1,
      name: 'Product 1',
      price: '$10.00',
      image:
        'https://m.media-amazon.com/images/I/81nyYcdA+HL._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: 2,
      name: 'Product 2',
      price: '$20.00',
      image:
        'https://m.media-amazon.com/images/I/61W-5euDA0L._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: 3,
      name: 'Product 3',
      price: '$30.00',
      image:
        'https://m.media-amazon.com/images/I/71i0jBUszvL._AC_UF894,1000_QL80_.jpg',
    },
    {
      id: 4,
      name: 'Product 4',
      price: '$40.00',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <Carousel responsive={responsive}>
      {mockData.map((item) => (
        <Card
          key={item.id}
          sx={{ maxWidth: '220px', margin: ' 10px', padding: '30px' }}
        >
          <CardMedia
            component="img"
            height="200px"
            image={item.image}
            alt={item.name}
          />
          <CardContent>
            <Typography variant="h6" component="div">
              {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.price}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Carousel>
  );
}

export default Swiper;
