import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import { useStore } from './context/StoreContext';
import ExploreMode from './components/ExploreMode';
import ShopMode from './components/ShopMode';
import Checkout from './components/Checkout';

function App() {
  const { viewMode } = useStore();

  return (
    <>
      <Navbar />
      <Cart />
      <main>
        <Routes>
          <Route path="/" element={viewMode === 'explore' ? <ExploreMode /> : <ShopMode />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
