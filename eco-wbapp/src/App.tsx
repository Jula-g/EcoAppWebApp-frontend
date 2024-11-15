import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import LoginForm from './login-form/LoginForm';
import CartPage from './purchase-page/CartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;
