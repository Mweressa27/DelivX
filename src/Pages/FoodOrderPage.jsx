import React, { useState, useRef, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar, FaShoppingCart, FaArrowLeft } from 'react-icons/fa';
import FoodCard from '../Components/FoodCard';
import Sidebar from '../Components/SideBar';

function FoodOrderPage() {
const [restaurants, setRestaurants] = useState([]);
useEffect(() => {
    fetch('http://localhost:4050/restaurants')
      .then((res) => res.json())
      .then((json) => {
        setRestaurants(json);
      })
      .catch((err) => {
        console.log('Error fetching data:', err);
      });
  }, []); 

  const { id } = useParams();
  const [cart, setCart] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);  
  const restaurant = restaurants.find(r => r.id === parseInt(id));

  const addToCart = (item) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
    toast.success(`Added ${item.name} to cart`);
    setIsSidebarOpen(true); // Open sidebar when item is added to cart
  };

  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity === 0) {
      removeFromCart(itemId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    // Order processing logic here
    setCart([]);
    setIsSidebarOpen(false);
    toast.success('Order placed successfully!');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(prevState => !prevState); // Toggling the sidebar state
  };

  const scrollCategories = (direction) => {
    if (categoriesRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      categoriesRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }


  return (
    <div className="min-h-screen bg-[#E0E0E0]">
      
        {/* <title>{restaurant.name} | Restaurant | DelivX Food - Delivery</title>
        <meta
          name="description"
          content={`Bringing delicious food right to your doorstep. Order delicious ${restaurant.cuisine} from ${restaurant.name}. ${restaurant.description}`}
        />
        <meta name="keywords" content="Restaurant, food delivery, DelivX Food" />
        <link rel="canonical" href={`https://www.DelivXfood.netlify.app/restaurant/${id}`} /> */}
      
      
      <div className='sticky top-0 z-20 w-10'>
      <Link to={`/restaurants`} className="block">
        <button className='flex items-center gap-2 p-4 text-center'>
          
          <FaArrowLeft className="w-6 h-6" />
      
        </button>
        </Link>
      </div>
    
      <div className="relative h-[300px] z-30">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h1 className="text-4xl font-bold mb-2">{restaurant.name}</h1>
          <div className="flex items-center gap-4">
            <span className="flex gap-2 items-center">
              <FaStar className="w-5 h-5 text-yellow-400" />
              {restaurant.rating}
            </span>
            <span>•</span>
            <span>{restaurant.cuisine}</span>
            <span>•</span>
            <span>{restaurant.deliveryTime} mins</span>
          </div>
        </div>
      </div>

      
      <div className="max-w-7xl mt-4 mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {restaurant.menu.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FoodCard food={item} onAddToCart={addToCart} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleSidebar}
        className="bottom-4 right-4 bg-indigo-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center fixed z-50"
      >
        <FaShoppingCart className="h-6 w-6" />
        {cart.length > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
          >
            {cart.length}
          </motion.span>
        )}
      </motion.button>

      <AnimatePresence>
        {isSidebarOpen && (
          <Sidebar
            isOpen={isSidebarOpen}
            cart={cart}
            removeItem={removeFromCart}
            updateQuantity={updateQuantity}
            placeOrder={placeOrder}
            toggleSidebar={toggleSidebar}
          />
        )}
      </AnimatePresence>

    </div>
  );
}

export default FoodOrderPage
