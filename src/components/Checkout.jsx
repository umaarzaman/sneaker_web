import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import './Checkout.css';

const Checkout = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, checkout, checkoutComplete, setCheckoutComplete } = useStore();
  
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    zipCode: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });
  const [isProcessing, setIsProcessing] = useState(false);

  // If they came here with an empty cart and haven't just completed an order
  if (cart.length === 0 && !checkoutComplete) {
    return (
      <div className="checkout-empty">
        <h2>Your cart is empty</h2>
        <button className="glass-button" onClick={() => navigate('/')}>Return to Store</button>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate API call processing
    setTimeout(() => {
      checkout();
      setIsProcessing(false);
    }, 2000);
  };

  if (checkoutComplete) {
    return (
      <div className="checkout-page success-state">
        <CheckCircle size={80} color="var(--accent)" />
        <h1 className="text-title">Order Confirmed</h1>
        <p className="text-subtitle">Your premium sneakers will be shipped to {formData.address || 'your address'}.</p>
        <button 
          className="glass-button home-btn" 
          onClick={() => {
            setCheckoutComplete(false);
            navigate('/');
          }}
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          <ChevronLeft size={24} /> Back to Store
        </button>
        <h1 className="brand">NEUROSOLE</h1>
      </div>

      <div className="checkout-content">
        <div className="checkout-form-container glass-panel">
          <h2>Delivery Information</h2>
          <form className="checkout-form" onSubmit={handleSubmit}>
            <div className="form-group full-width">
              <label>Email Address</label>
              <input required type="email" name="email" value={formData.email} onChange={handleChange} placeholder="johndoe@example.com" />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label>First Name</label>
                <input required type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="John" />
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input required type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Doe" />
              </div>
            </div>

            <div className="form-group full-width">
              <label>Delivery Address</label>
              <input required type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Sneaker St" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input required type="text" name="city" value={formData.city} onChange={handleChange} placeholder="New York" />
              </div>
              <div className="form-group">
                <label>ZIP / Postal Code</label>
                <input required type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} placeholder="10001" />
              </div>
            </div>

            <h2 className="payment-heading">Payment Detail</h2>
            
            <div className="form-group full-width">
              <label>Card Number</label>
              <input required type="text" name="cardNumber" value={formData.cardNumber} onChange={handleChange} placeholder="0000 0000 0000 0000" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry Date</label>
                <input required type="text" name="expiry" value={formData.expiry} onChange={handleChange} placeholder="MM/YY" />
              </div>
              <div className="form-group">
                <label>CVV</label>
                <input required type="text" name="cvv" value={formData.cvv} onChange={handleChange} placeholder="123" />
              </div>
            </div>

            <button type="submit" className="glass-button submit-order-btn" disabled={isProcessing}>
              {isProcessing ? 'Processing Order...' : `Pay $${cartTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        <div className="checkout-summary glass-panel">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <div className="summary-item-image">
                  <img src={item.image} alt={item.name} />
                  <span className="summary-item-badge">{item.quantity}</span>
                </div>
                <div className="summary-item-info">
                  <h4>{item.name}</h4>
                  <p>{item.brand}</p>
                </div>
                <div className="summary-item-price">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
          
          <div className="summary-totals">
            <div className="totals-row">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="totals-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="totals-row grand-total">
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
