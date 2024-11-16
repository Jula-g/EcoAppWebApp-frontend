import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import LoginForm from './login-form/LoginForm';
import CartPage from './purchase-page/CartPage';
import ProductSwiping from './tinderComponent/productSwiping';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/tinder" element={<ProductSwiping />} />
    </Routes>
  );
}

export default App;
