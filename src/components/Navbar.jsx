import React from 'react';
import { ShoppingBag, Heart, LayoutGrid, Maximize } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import './Navbar.css';

const Navbar = () => {
  const { viewMode, setViewMode, toggleCart, cartCount } = useStore();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="brand">NEUROSOLE</h1>
      </div>

      <div className="navbar-center glass-panel">
        <button 
          className={`mode-toggle ${viewMode === 'explore' ? 'active' : ''}`}
          onClick={() => setViewMode('explore')}
        >
          <Maximize size={18} />
          <span>Explore</span>
        </button>
        <button 
          className={`mode-toggle ${viewMode === 'shop' ? 'active' : ''}`}
          onClick={() => setViewMode('shop')}
        >
          <LayoutGrid size={18} />
          <span>Shop</span>
        </button>
      </div>

      <div className="navbar-right">
        <button className="glass-icon-button" aria-label="Wishlist">
          <Heart size={20} />
        </button>
        <button className="glass-icon-button cart-btn" onClick={toggleCart} aria-label="Cart">
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
