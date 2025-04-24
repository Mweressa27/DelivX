import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <header>      
      <nav className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm font-medium">Hi, {user.username}</span>
            <Link to="/restaurants" className="hover:underline">Restaurants</Link>
            <Link to="/checkout" className="hover:underline">Checkout</Link>
            <Link to="/partner" className="hover:underline">Partner with us</Link>
            <button onClick={logout} className="text-red-600 font-medium">Logout</button>
          </>
        )}        
      </nav>
    </header>
  );
}

export default NavBar
