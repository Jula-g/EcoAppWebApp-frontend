import React, { useState } from 'react';
import { useSprings, animated } from 'react-spring';
import './Swiping.css'; // For styling

// Define the products array (you can also import this from an external file)

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'Product 1',
    price: 10,
    quantity: 0,
    image:
      'https://m.media-amazon.com/images/I/81nyYcdA+HL._AC_UF894,1000_QL80_.jpg',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 20,
    quantity: 0,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 30,
    quantity: 0,
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 40,
    quantity: 0,
    image: 'https://via.placeholder.com/150',
  },
];

const ProductSwiping = () => {
  const [gone, setGone] = useState<number[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  // Update the springs logic with correct parameters
  const springs = useSprings(
    products.length,
    products.map((_, i) => ({
      opacity: gone.includes(i) ? 0 : 1,
      transform: gone.includes(i) ? 'scale(0.5)' : 'scale(1)',
      from: { opacity: 0, transform: 'scale(1.1)' },
    }))
  );

  const handleSwipe = (index: number, direction: string) => {
    setGone((prevGone) => [...prevGone, index]);
    if (direction === 'right') {
      setSelectedProducts((prev) => [...prev, products[index]]);
    }
  };

  return (
    <div className="swipe-container">
      {springs.map((props, index: number) => (
        <animated.div
          key={products[index].id}
          className="product-card"
          style={props}
        >
          <div className="product-image">
            <img src={products[index].image} alt={products[index].name} />
          </div>
          <div className="product-info">
            <h3>{products[index].name}</h3>
            <p>${products[index].price}</p>
          </div>
          <div className="swipe-buttons">
            <button
              className="swipe-left"
              onClick={() => handleSwipe(index, 'left')}
            >
              No
            </button>
            <button
              className="swipe-right"
              onClick={() => handleSwipe(index, 'right')}
            >
              Yes
            </button>
          </div>
        </animated.div>
      ))}
      <div className="selected-products">
        <h2>Selected Products</h2>
        <ul>
          {selectedProducts.map((product) => (
            <li key={product.id}>
              {product.name} - ${product.price}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductSwiping;
