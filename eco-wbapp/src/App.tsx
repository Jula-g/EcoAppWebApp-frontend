import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import LoginForm from './login-form/LoginForm';
import CartPage from './purchase-page/CartPage';
import MapComp from './home-page/MapComonent';
import RegisterFieldsComponent from './register-page/RegisterFiledsComponent';
import MatchMe from './tinderComponent/MatchMe';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/tinder" element={<MatchMe />} />
      <Route path="/map" element={<MapComp />} />
      <Route path="/signup" element={<RegisterFieldsComponent />} />
      <Route path="*" element={<div>404 Not Found</div>} />
    </Routes>
  );
}

export default App;
