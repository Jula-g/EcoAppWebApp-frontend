import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
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

  // const mockData = [
  //   {
  //     id: 1,
  //     name: 'Product 1',
  //     price: '$10.00',
  //     image:
  //       'https://m.media-amazon.com/images/I/81nyYcdA+HL._AC_UF894,1000_QL80_.jpg',
  //   },
  //   {
  //     id: 2,
  //     name: 'Product 2',
  //     price: '$20.00',
  //     image:
  //       'https://m.media-amazon.com/images/I/61W-5euDA0L._AC_UF894,1000_QL80_.jpg',
  //   },
  //   {
  //     id: 3,
  //     name: 'Product 3',
  //     price: '$30.00',
  //     image:
  //       'https://m.media-amazon.com/images/I/71i0jBUszvL._AC_UF894,1000_QL80_.jpg',
  //   },
  //   {
  //     id: 4,
  //     name: 'Product 4',
  //     price: '$40.00',
  //     image: 'https://via.placeholder.com/150',
  //   },
  // ];

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/products");
        const data = await response.json();
        console.log("Fetched Products:", data);
        setProducts(data);
      } catch (error) {
        setError("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  return (
    <Carousel responsive={responsive}>
      {products.map((item) => (
        <Card
          key={item.id}
          sx={{
            maxWidth: '220px',
            margin: ' 10px',
            padding: '30px',
            marginBottom: '60px',
            marginTop: '20px',
          }}
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
