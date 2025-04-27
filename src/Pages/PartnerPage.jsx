import React, { useState } from 'react';

function PartnerPage() {
  const [formData, setFormData] = useState({
    businessType: '',
    businessName: '',
    contactPerson: '',
    email: '',
    phone: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3001/partners', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(data => {
        alert('Thank you for partnering with us!');
        setFormData({
          businessType: '',
          businessName: '',
          contactPerson: '',
          email: '',
          phone: '',
          location: '',
        });
      })
      .catch(err => console.error('Error submitting form:', err));
  };

  return (
    <div className="bg-[#E0E0E0] min-h-screen py-10 px-4">
      <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold text-[#FF6F00] mb-4">Partner with Us</h2>
        <p className="text-gray-700 mb-6">
          Join our platform as a restaurant, grocery store, beverage & dessert shop, or rider.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Business Type</label>
            <select
              name="businessType"
              value={formData.businessType}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            >
              <option value="">Select...</option>
              <option value="restaurant">Restaurant</option>
              <option value="grocery">Grocery Store</option>
              <option value="beverage">Beverage & Dessert Shop</option>
              <option value="rider">Rider (Delivery Partner)</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold">Business/Personal Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

                    <div>
            <label className="block text-sm font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#4CAF50] text-white py-2 px-4 rounded hover:bg-green-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default PartnerPage;

