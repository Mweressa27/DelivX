import React, { useState, useEffect } from 'react';
import RestaurantList from '../Components/RestaurantList';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon, MicrophoneIcon } from '@heroicons/react/24/outline';

function RestaurantPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cuisineFilter, setCuisineFilter] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [randomMenuItems, setRandomMenuItems] = useState([]);
  const [visibleRestaurants, setVisibleRestaurants] = useState(6);

  // ✅ Initialize as empty array to avoid reduce error
  const [restaurants, setRestaurants] = useState([]);

  const { user } = useAuth();

  // ✅ Fetch restaurant data on mount
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

  // ✅ Generate random top dishes when restaurant data is ready
  useEffect(() => {
    if (restaurants.length > 0) {
      const allItems = restaurants.reduce((items, restaurant) => {
        const menuWithRestaurant = restaurant.menu.map((item) => ({
          ...item,
          restaurantName: restaurant.name,
          restaurantId: restaurant.id
        }));
        return [...items, ...menuWithRestaurant];
      }, []);

      const shuffled = [...allItems].sort(() => 0.5 - Math.random());
      setRandomMenuItems(shuffled.slice(0, 3));
    }
  }, [restaurants]);

  // ✅ Filter restaurants based on search and selected filters
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (cuisineFilter === '' || restaurant.cuisine === cuisineFilter) &&
    (ratingFilter === '' || restaurant.rating >= parseFloat(ratingFilter))
  );

  const loadMore = () => {
    setVisibleRestaurants((prev) => Math.min(prev + 6, filteredRestaurants.length));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex justify-between items-center">        
        {user && (
          <span className="text-lg text-gray-700">
            👋 Welcome, <strong>{user.username}</strong>
          </span>
        )}
      </header>

      {/* Search Input */}
      <div className="relative md:max-w-2xl mx-auto">
        <div className="relative flex items-center justify-center shadow-lg rounded-full overflow-hidden">
          <MagnifyingGlassIcon className="absolute left-4 w-6 h-6 text-gray-400" />
          <input
            type="text"
            placeholder="Restaurants or cuisines..."
            className="w-full pl-12 pr-4 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-lg text-lg"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="absolute right-4 p-2 hover:bg-yellow-100 rounded-full transition-colors">
            <MicrophoneIcon className="w-5 h-5 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Top Dishes */}
      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">Top Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {randomMenuItems.map((item) => (
            <div
              key={item.id}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md"
            >
              <Link to={`/restaurant/${item.restaurantId}`}>
                <div className="relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full rounded-sm h-48 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300">
                    <p className="absolute bottom-2 left-2 text-sm text-white bg-black/70 px-2 py-1 rounded-md">
                      {item.description || 'Delicious Dish'}
                    </p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold group-hover:text-indigo-600">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">
                    From <span className="font-bold">{item.restaurantName}</span>
                  </p>
                  <p className="text-indigo-600 dark:text-indigo-400 font-bold text-lg">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Filters */}
      <div className="flex justify-between mt-12">
        <h2 className="text-2xl font-bold pt-4">Top Restaurants</h2>
        <div className="max-w-7xl mx-auto px-4 mb-6">
          <div className="flex flex-wrap gap-4 justify-end items-center mt-2">
            <select
              className="px-7 py-2 rounded-lg border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={cuisineFilter}
              onChange={(e) => setCuisineFilter(e.target.value)}
            >
              <option value="">All Cuisines</option>
              {[...new Set(restaurants.map((r) => r.cuisine))].map((cuisine) => (
                <option key={cuisine} value={cuisine}>{cuisine}</option>
              ))}
            </select>
            <select
              className="px-8 py-2 rounded-lg border border-gray-300 text-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
            >
              <option value="">All Ratings</option>
              <option value="4.5">4.5+</option>
              <option value="4.0">4.0+</option>
              <option value="3.5">3.5+</option>
            </select>
          </div>
        </div>
      </div>

      {/* Restaurant Cards */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRestaurants.slice(0, visibleRestaurants).map((restaurant) => (
            <div
              key={restaurant.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <Link to={`/restaurant/${restaurant.id}`} className="block">
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full px-3 py-1">
                    ⭐ {restaurant.rating}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-bold mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {restaurant.deliveryTime} mins
                    </span>
                    <span className="text-indigo-600 dark:text-indigo-400">
                      View Menu →
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleRestaurants < filteredRestaurants.length && (
          <div className="text-center mt-8">
            <button
              onClick={loadMore}
              className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors"
            >
              See More
            </button>
          </div>
        )}
      </section>
      
    </div>
  );
}

export default RestaurantPage;
