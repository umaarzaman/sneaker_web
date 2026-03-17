import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { sneakers } from '../data/sneakers';
import SneakerCard from './SneakerCard';
import './ShopMode.css';

const ShopMode = () => {
  const [filter, setFilter] = useState('All');
  
  const categories = ['All', 'Nike', 'Adidas', 'Puma'];
  
  const filteredSneakers = filter === 'All' 
    ? sneakers 
    : sneakers.filter(s => s.brand === filter);

  return (
    <div className="shop-mode">
      <div className="shop-header">
        <h2 className="text-title">Explore Collection</h2>
        
        <div className="filters glass-panel">
          {categories.map(cat => (
            <button 
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        className="sneaker-grid"
        layout
      >
        {filteredSneakers.map((sneaker) => (
          <SneakerCard key={sneaker.id} sneaker={sneaker} />
        ))}
      </motion.div>
    </div>
  );
};

export default ShopMode;
