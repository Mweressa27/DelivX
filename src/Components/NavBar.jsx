import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();

  return (
    <header className="flex justify-between items-center px-8 py-4 bg-white shadow text-black">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="DelivX Logo" className="w-8 h-8" />
        <Link to="/" className="text-2xl font-extrabold">DelivX</Link>
      </div>
      <nav className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm font-medium">Hi, {user.username}</span>
            <Link to="/restaurants" className="hover:underline">Restaurants</Link>
            <Link to="/checkout" className="hover:underline">Checkout</Link>
            <button onClick={logout} className="text-red-600 font-medium">Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" className="text-blue-600">Log In</Link>
            <Link to="/signup" className="text-blue-600">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default NavBar
