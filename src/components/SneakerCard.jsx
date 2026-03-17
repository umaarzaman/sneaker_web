import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import './SneakerCard.css';

const SneakerCard = ({ sneaker }) => {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWishlisted = wishlist.includes(sneaker.id);

  return (
    <motion.div 
      className="sneaker-card glass-panel"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      layout
    >
      <div 
        className="card-image-bg" 
        style={{ backgroundColor: sneaker.color + '40' }} // adding transparency hex
      >
        <img src={sneaker.image} alt={sneaker.name} className="card-image" />
        
        {sneaker.badge && <span className="card-badge">{sneaker.badge}</span>}
        
        <button 
          className="card-wishlist"
          onClick={() => toggleWishlist(sneaker.id)}
        >
          <Heart size={20} fill={isWishlisted ? 'white' : 'transparent'} color="white" />
        </button>
      </div>

      <div className="card-info">
        <h3 className="card-title">{sneaker.name}</h3>
        <p className="card-brand">{sneaker.brand}</p>
        
        <div className="card-footer">
          <span className="card-price">${sneaker.price}</span>
          <button 
            className="card-add-btn"
            onClick={() => addToCart(sneaker)}
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default SneakerCard;
