import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sneakers } from '../data/sneakers';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Heart } from 'lucide-react';
import './ExploreMode.css';

const ExploreMode = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const { addToCart, toggleWishlist, wishlist } = useStore();

  const handleScroll = (e) => {
    if (isScrolling) return;

    if (e.deltaY > 50 && activeIndex < sneakers.length - 1) {
      setIsScrolling(true);
      setActiveIndex(prev => prev + 1);
      setTimeout(() => setIsScrolling(false), 1000);
    } else if (e.deltaY < -50 && activeIndex > 0) {
      setIsScrolling(true);
      setActiveIndex(prev => prev - 1);
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: false });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [activeIndex, isScrolling]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isScrolling) return;
      if (e.key === 'ArrowDown' && activeIndex < sneakers.length - 1) {
        setIsScrolling(true);
        setActiveIndex(prev => prev + 1);
        setTimeout(() => setIsScrolling(false), 1000);
      } else if (e.key === 'ArrowUp' && activeIndex > 0) {
        setIsScrolling(true);
        setActiveIndex(prev => prev - 1);
        setTimeout(() => setIsScrolling(false), 1000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, isScrolling]);

  const activeShoe = sneakers[activeIndex];
  const isWishlisted = wishlist.includes(activeShoe.id);

  return (
    <div className="explore-container">
      {/* Dynamic Background Glow */}
      <motion.div 
        className="background-glow"
        animate={{ backgroundColor: activeShoe.color }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />

      {/* Massive Background Text */}
      <AnimatePresence mode="wait">
        <motion.h1 
          key={`bg-text-${activeShoe.id}`}
          className="background-text"
          style={{ zIndex: 1 }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {activeShoe.brand.toUpperCase()}
        </motion.h1>
      </AnimatePresence>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeShoe.id}
          className="shoe-display"
          style={{ zIndex: 10 }}
          initial={{ opacity: 0, scale: 0.8, y: 100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 1.1, y: -100 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <img src={activeShoe.image} alt={activeShoe.name} className="main-shoe-image" />
        </motion.div>
      </AnimatePresence>

      <div className="explore-content">
        <AnimatePresence mode="wait">
          <motion.div 
            key={`info-${activeShoe.id}`}
            className="info-panel glass-panel"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {activeShoe.badge && <span className="badge">{activeShoe.badge}</span>}
            <h2 className="text-giant">{activeShoe.name}</h2>
            <p className="text-subtitle">{activeShoe.tagline}</p>
            <div className="price-tag">${activeShoe.price}</div>
            
            <div className="action-buttons">
              <button className="glass-button add-to-cart" onClick={() => addToCart(activeShoe)}>
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button 
                className={`glass-icon-button wishlist-btn ${isWishlisted ? 'active' : ''}`}
                onClick={() => toggleWishlist(activeShoe.id)}
              >
                <Heart size={20} fill={isWishlisted ? 'white' : 'transparent'} />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-progress">
          {sneakers.map((_, i) => (
            <div 
              key={i} 
              className={`progress-dot ${i === activeIndex ? 'active' : ''}`} 
              onClick={() => setActiveIndex(i)}
            />
          ))}
        </div>
        <p>Scroll to explore</p>
      </div>
    </div>
  );
};

export default ExploreMode;
