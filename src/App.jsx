import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'sonner'; 
import NavBar from './Components/NavBar';
import HomePage from './Pages/HomePage';
import RestaurantPage from './Pages/RestaurantPage';
import PartnerPage from './Pages/PartnerPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import FoodOrderPage from './Pages/FoodOrderPage';
import Checkout from './Pages/Checkout'

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
          <Route path="/signup" element={<SignUp />} />
          <Route path="/restaurants" element={<ProtectedRoute><RestaurantPage /></ProtectedRoute>} />        
          <Route path="/restaurant/:id" element={<ProtectedRoute><FoodOrderPage /></ProtectedRoute>} />
          <Route path="/order/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/partner" element={<PartnerPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
