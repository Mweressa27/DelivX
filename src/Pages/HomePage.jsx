import React from 'react'
import { Link } from 'react-router-dom'; 
import Footer from '../Components/Footer'

function HomePage() {
  return (
    <div className="text-white font-sans">      
      <section className="relative min-h-screen flex flex-col overflow-hidden">        
        <div className="absolute top-0 left-0 w-full z-0">
          <svg viewBox="0 0 1440 320" className="w-full h-[300px]">
            <path
              fill="#FF6F00"
              d="M0,224L60,213.3C120,203,240,181,360,181.3C480,181,600,203,720,197.3C840,192,960,160,1080,154.7C1200,149,1320,171,1380,181.3L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
            />
          </svg>
        </div>

        
        <header className="relative z-10 flex justify-between items-center px-8 py-6 text-black">
          <div className="flex items-center space-x-2">
            <h1 className="text-4xl font-extrabold tracking-wide" style={{ fontFamily: "'Chewy', cursive" }}>
              🍔DelivX
            </h1>
          </div>
          <nav className="space-x-4">
           
            <Link to="/signup">
              <button className="px-5 py-2 rounded bg-[#D32F2F] hover:bg-[#E0E0E0] text-white font-medium transition">
                Sign Up
              </button>
            </Link>
            
            <Link to="/login">
              <button className="px-5 py-2 rounded bg-gray-700 hover:bg-[#E0E0E0] text-white font-medium transition">
                Log In
              </button>
            </Link>
          </nav>
        </header>

        
        <div className="relative z-10 flex-grow flex flex-col justify-center items-center px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-black">Hungry or Craving Something?</h2>
          <p className="text-lg md:text-xl max-w-xl mx-auto mb-12 text-black">
            Get your favorite meals delivered fast, fresh, and right to your doorstep.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 max-w-6xl w-full text-[#FF6F00]">
            <div className="flex flex-col items-center text-center">
              <img src="/burger.png" alt="Fast Foods" className="w-20 h-20 mb-2" />
              <h3 className="text-lg font-semibold">Fast Foods</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="/drink.png" alt="Drinks" className="w-20 h-20 mb-2" />
              <h3 className="text-lg font-semibold">Drinks</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="/pizza.png" alt="Pizza" className="w-20 h-20 mb-2" />
              <h3 className="text-lg font-semibold">Pizza</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="/shopping-bag.png" alt="Groceries" className="w-20 h-20 mb-2" />
              <h3 className="text-lg font-semibold">Groceries</h3>
            </div>
            <div className="flex flex-col items-center text-center">
              <img src="/sweets.png" alt="Pastries & Snacks" className="w-20 h-20 mb-2" />
              <h3 className="text-lg font-semibold">Pastries & Snacks</h3>
            </div>
          </div>
        </div>
      </section>
      
      <section className="text-center py-16 bg-white text-black">
        <h2 className="text-3xl font-bold mb-10">How DelivX Works</h2>
        <div className="flex justify-around flex-wrap gap-8 px-6">
          <div className="w-60">
            <h3 className="font-semibold text-lg">Choose Your Meal</h3>
            <p className="text-sm">Pick your favorites from top local restaurants.</p>
            <img src="./click.png" alt="" className="mx-auto mb-3 w-16" />
          </div>
          <div className="w-60">
            <h3 className="font-semibold text-lg">Quick Delivery</h3>
            <p className="text-sm">We bring it to your door, hot and fresh.</p>
            <img src="./motorbike.png" alt="delivery" className="mx-auto mb-3 w-16" />
          </div>
          <div className="w-60">
            <h3 className="font-semibold text-lg">Enjoy the Feast</h3>
            <p className="text-sm">Kick back and dig in!</p>
            <img src="./dinner.png" alt="" className="mx-auto mb-3 w-16" />
          </div>
        </div>
      </section>

     
      <section className="bg-gray-100 py-16 text-black text-center">
        <h2 className="text-3xl font-bold mb-10">Loved by Foodies Everywhere</h2>
        <div className="flex justify-center gap-8 flex-wrap px-6">
          <div className="bg-white p-6 rounded shadow w-80">
            <p>“DelivX is my go-to when I’m too lazy to cook. Always fast!”</p>
            <span className="mt-4 block font-semibold">– Jordan</span>
          </div>
          <div className="bg-white p-6 rounded shadow w-80">
            <p>“The app is super easy to use, and the food is always hot!”</p>
            <span className="mt-4 block font-semibold">– Aisha</span>
          </div>
        </div>
      </section>

      
      <section className="text-center py-16 px-6 bg-white text-black">
        <h2 className="text-3xl font-bold mb-4">Order on the Go</h2>
        <p className="max-w-md mx-auto mb-6">
          Download the DelivX app and enjoy seamless ordering, tracking, and deals wherever you are.
        </p>
        <div className="flex justify-center gap-4">
          <img src="/google-play.png" alt="Google Play" className="w-28" />
          <img src="/game.png" alt="App Store" className="w-28" />
        </div>
      </section>

      
      <section className="bg-white text-black py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Get Exclusive Deals</h2>
        <p className="mb-4">Join our newsletter for food discounts and updates!</p>
        <div className="flex justify-center gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 border border-gray-400 rounded w-64"
          />
          <button className="bg-[#FF6F00] text-white px-4 py-2 rounded">Subscribe</button>
        </div>
      </section>

    
      <Footer />
    </div>
  );
}

export default HomePage
