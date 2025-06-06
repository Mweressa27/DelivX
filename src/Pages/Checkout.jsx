import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { Toaster, toast } from 'sonner';


function Checkout() {
  const { id } = useParams();
  const [orderError, setOrderError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    address: '',
    phone: '',
    instructions: '',
  })

  useEffect(() => {
    if (isNaN(parseInt(id))) {
      setOrderError('Invalid order ID');
    }
  }, [id])  

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4050/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: id,
          ...formData,
          status: 'Pending',
          createdAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

      const data = await response.json();      
      toast.success('Order placed successfully!');
      setFormData({
        name: '',
        address: '',
        phone: '',
        instructions: '',
      });
    } catch (error) {      
      setOrderError('Failed to place order. Try again.');
    }
  };

  if (orderError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <h1 className="text-2xl font-bold text-red-600">{orderError}</h1>
      </div>
    );
  }

  return (    
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <Toaster position="top-center" richColors />
      <h2 className="text-2xl font-bold mb-4">Delivery Details</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="text"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-3 border rounded"
          required
        />
        <textarea
          name="instructions"
          placeholder="Special Instructions"
          value={formData.instructions}
          onChange={handleChange}
          className="w-full p-3 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#4CAF50] text-white p-3 rounded hover:bg-[#D32F2F] transition"
        >
          Submit Order
        </button>
      </form>
      <div className="mt-8 border-t pt-4 text-sm text-gray-700">
      <p className="font-semibold">Pay on Delivery</p>
      <p>
        <strong>M-Pesa Paybill:</strong> 88880<br />
        <strong>Account Number:</strong> 555555555
      </p>
      <p className="mt-2 text-gray-500">
        You will be asked to pay upon delivery.
      </p>
    </div>
    </div>
  );
}

export default Checkout;

