import { createContext, useContext, useState, useEffect } from 'react';

const StoreContext = createContext();

export const useStore = () => useContext(StoreContext);

export const StoreProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('explore'); // 'explore' or 'shop'
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

  const toggleCart = () => {
    setCartOpen(!cartOpen);
    if (!cartOpen && checkoutComplete) {
      setCheckoutComplete(false); // Reset success state when reopening cart
    }
  };
  
  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (id) => {
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(itemId => itemId !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const checkout = () => {
    setCart([]);
    setCheckoutComplete(true);
  };

  return (
    <StoreContext.Provider value={{
      viewMode, setViewMode,
      cartOpen, setCartOpen, toggleCart,
      cart, addToCart, removeFromCart, updateQuantity,
      cartTotal, cartCount,
      wishlist, toggleWishlist,
      checkout, checkoutComplete, setCheckoutComplete
    }}>
      {children}
    </StoreContext.Provider>
  );
};
