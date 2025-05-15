import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { useTradingPairs } from '../../contexts/TradingPairsContext';
import './OrderForm.css';

function OrderForm() {
  const { selectedPair } = useTradingPairs();
  const [orderType, setOrderType] = useState('buy');
  const [orderMode, setOrderMode] = useState('limit');
  const [price, setPrice] = useState(selectedPair.price.toFixed(2));
  const [amount, setAmount] = useState('0.00');
  const [total, setTotal] = useState('0.00');
  const [postOnly, setPostOnly] = useState(true);
  
  // Update price when selected pair changes
  useEffect(() => {
    setPrice(selectedPair.price.toFixed(2));
    calculateTotal();
  }, [selectedPair]);
  
  // Calculate total when price or amount changes
  useEffect(() => {
    calculateTotal();
  }, [price, amount]);
  
  const calculateTotal = () => {
    const calculatedTotal = parseFloat(price) * parseFloat(amount) || 0;
    setTotal(calculatedTotal.toFixed(2));
  };
  
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };
  
  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };
  
  const handlePercentageClick = (percentage) => {
    // In a real app, this would be based on available balance
    const availableBalance = 1; // 1 BTC
    const calculatedAmount = (availableBalance * percentage / 100).toFixed(6);
    setAmount(calculatedAmount);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (parseFloat(price) <= 0 || parseFloat(amount) <= 0) {
      alert('Please enter valid price and amount values.');
      return;
    }
    
    alert(`Order placed: ${orderType.toUpperCase()} ${amount} ${selectedPair.base} at $${price} for a total of $${total}`);
  };
  
  return (
    <div className="order-form">
      <div className="order-form__tabs">
        <button 
          className={`order-form__tab-btn ${orderType === 'buy' ? 'order-form__tab-btn--active' : ''}`}
          onClick={() => setOrderType('buy')}
        >
          Buy
        </button>
        <button 
          className={`order-form__tab-btn ${orderType === 'sell' ? 'order-form__tab-btn--active' : ''}`}
          onClick={() => setOrderType('sell')}
        >
          Sell
        </button>
      </div>
      
      <div className="order-form__types">
        <button 
          className={`order-form__type-btn ${orderMode === 'limit' ? 'order-form__type-btn--active' : ''}`}
          onClick={() => setOrderMode('limit')}
        >
          Limit
        </button>
        <button 
          className={`order-form__type-btn ${orderMode === 'market' ? 'order-form__type-btn--active' : ''}`}
          onClick={() => setOrderMode('market')}
        >
          Market
        </button>
        <button 
          className={`order-form__type-btn ${orderMode === 'stop-limit' ? 'order-form__type-btn--active' : ''}`}
          onClick={() => setOrderMode('stop-limit')}
        >
          Stop-Limit
        </button>
      </div>
      
      <form className="order-form__inputs" onSubmit={handleSubmit}>
        <div className="order-form__input-group">
          <label className="order-form__label">
            Limit price
            <FontAwesomeIcon icon={faInfoCircle} className="order-form__info-icon" />
          </label>
          <div className="order-form__input-wrapper">
            <input 
              type="text" 
              className="order-form__input" 
              value={price}
              onChange={handlePriceChange}
            />
            <span className="order-form__input-suffix">USD</span>
          </div>
        </div>
        
        <div className="order-form__input-group">
          <label className="order-form__label">
            Amount
            <FontAwesomeIcon icon={faInfoCircle} className="order-form__info-icon" />
          </label>
          <div className="order-form__input-wrapper">
            <input 
              type="text" 
              className="order-form__input" 
              value={amount}
              onChange={handleAmountChange}
            />
            <span className="order-form__input-suffix">BTC</span>
          </div>
          
          <div className="order-form__percentage-buttons">
            <button type="button" onClick={() => handlePercentageClick(25)}>25%</button>
            <button type="button" onClick={() => handlePercentageClick(50)}>50%</button>
            <button type="button" onClick={() => handlePercentageClick(75)}>75%</button>
            <button type="button" onClick={() => handlePercentageClick(100)}>100%</button>
          </div>
        </div>
        
        <div className="order-form__input-group">
          <label className="order-form__label">
            Type
            <FontAwesomeIcon icon={faInfoCircle} className="order-form__info-icon" />
          </label>
          <div className="order-form__select-wrapper">
            <select className="order-form__select">
              <option>Good till cancelled</option>
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="order-form__select-icon" />
          </div>
        </div>
        
        <div className="order-form__checkbox-group">
          <input 
            type="checkbox" 
            id="post-only" 
            className="order-form__checkbox" 
            checked={postOnly}
            onChange={() => setPostOnly(!postOnly)}
          />
          <label htmlFor="post-only" className="order-form__checkbox-label">
            Post Only
            <FontAwesomeIcon icon={faInfoCircle} className="order-form__info-icon" />
          </label>
        </div>
        
        <div className="order-form__total">
          <div className="order-form__total-label">Total</div>
          <div className="order-form__total-value">{total}</div>
        </div>
        
        <button 
          type="submit" 
          className="order-form__submit-btn"
          style={{ 
            background: orderType === 'buy' 
              ? 'linear-gradient(to right, var(--color-button-gradient-start), var(--color-button-gradient-end))' 
              : 'var(--color-negative)'
          }}
        >
          {orderType === 'buy' ? 'Buy' : 'Sell'} {selectedPair.base}
        </button>
        
        <div className="order-form__account">
          <div className="order-form__account-row">
            <div className="order-form__account-label">Total account value</div>
            <div className="order-form__account-value">
              <span>0.00</span>
              <select className="order-form__currency-select">
                <option>NGN</option>
              </select>
            </div>
          </div>
          
          <div className="order-form__account-row">
            <div className="order-form__account-label">Open Orders</div>
            <div className="order-form__account-value">0.00</div>
          </div>
          
          <div className="order-form__account-row">
            <div className="order-form__account-label">Available</div>
            <div className="order-form__account-value">0.00</div>
          </div>
        </div>
        
        <button type="button" className="trading-form__deposit-btn">Deposit</button>
      </form>
    </div>
  );
}

export default OrderForm;