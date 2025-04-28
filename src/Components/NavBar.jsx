import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function NavBar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const isHomePage = location.pathname === '/';

  
  if (isHomePage) {
    return null; 
  }

  return (
    <header className="bg-white shadow p-4">
      <nav className="flex items-center gap-4 justify-between max-w-6xl mx-auto">
        <Link to="/" className="text-[#FF6F00] font-bold text-4xl">🍔DelivX</Link>

        <div className="flex items-center gap-4 uppercase">
          {user ? (
            <>
              <span className="text-sm font-medium text-green-700">{user.username}</span>
              <Link
                to="/restaurants"
                className="hover:text-[#FF6F00] hover:font-bold transition-all duration-200"
              >
                Make an order
              </Link>                           
              <Link
                to="/partner"
                className="hover:text-[#FF6F00] hover:font-bold transition-all duration-200"
              >
                Partner with us
              </Link>

              <button onClick={logout} className="text-red-600 font-medium">Logout</button>
            </>
          ) : (
            <>              
              <Link to="/login" className="text-green-600 font-medium">Login</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default NavBar;
