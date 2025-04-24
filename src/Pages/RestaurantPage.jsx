import { useAuth } from '../context/AuthContext';

function RestaurantPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">DelivX Restaurants</h1>
        {user && (
          <span className="text-lg text-gray-700">
            👋 Welcome, <strong>{user.username}</strong>
          </span>
        )}
      </header>

      {/* ...restaurant listing */}
    </div>
  );
}

export default RestaurantPage