import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage';
import RestaurantPage from './Pages/RestaurantPage';
import CheckoutPage from './Pages/Checkout';
import PartnerPage from './Pages/PartnerPage';
import Login from './Pages/Login';
import Signup from './Pages/SignUp';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/restaurants" element={<ProtectedRoute><RestaurantPage /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} />
          <Route path="/partner" element={<PartnerPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
