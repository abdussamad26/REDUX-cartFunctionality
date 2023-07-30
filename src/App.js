import logo from './logo.svg';
import './App.css';
import Navbar from '../src/components/Navbar/Navbar'
import { useState, useEffect } from 'react';
import Footer from './components/Footer/Footer';


function App() {
  const [cartItems, setCartItems] = useState(0);

  const handleAddToCart = () => {
    setCartItems(cartItems + 1);

  };
  return (
    <div className="App">
       <Navbar />
       <Footer/>
    </div>
  );
}

export default App;
