import React, { useState } from 'react';
import { X, Minus, Plus, ShoppingBag, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import './Cart.css';

const Cart = () => {
  const { cartOpen, setCartOpen, cart, removeFromCart, updateQuantity, cartTotal, checkoutComplete } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setCartOpen(false);
      setIsProcessing(false);
      navigate('/checkout');
    }, 500);
  };

  if (!cartOpen) return null;

  return (
    <>
      <div className="cart-backdrop" onClick={() => setCartOpen(false)} />
      <div className={`cart-panel ${cartOpen ? 'open' : ''} glass-panel`}>
        <div className="cart-header">
          <h2>Your Cart</h2>
          <button className="glass-icon-button" onClick={() => setCartOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-items">
          {checkoutComplete ? (
            <div className="checkout-success">
              <CheckCircle size={64} color="var(--accent)" />
              <h3>Order Confirmed</h3>
              <p>Your premium sneakers are on the way.</p>
              <button className="glass-button continue-btn" onClick={() => setCartOpen(false)}>
                Continue Shopping
              </button>
            </div>
          ) : cart.length === 0 ? (
            <div className="empty-cart">
              <ShoppingBag size={48} color="var(--text-secondary)" />
              <p>Your cart is empty.</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p className="cart-item-price">${item.price}</p>
                  <div className="cart-quantity">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  <X size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {!checkoutComplete && cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <button 
              className="checkout-btn glass-button" 
              onClick={handleCheckout}
              disabled={isProcessing}
            >
              {isProcessing ? 'Processing...' : 'Checkout'}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
