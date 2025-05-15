/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowUp, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useTradingPairs } from '../../contexts/TradingPairsContext';
import { fetchOrderBook } from '../../services/api';
import './OrderBook.css';

function OrderBook() {
  const { selectedPair } = useTradingPairs();
  const [activeTab, setActiveTab] = useState('orderbook');
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [depthLimit, setDepthLimit] = useState(10);
  
  // Fetch order book data when selected pair changes
  useEffect(() => {
    if (!selectedPair) return;
    
    const loadOrderBook = async () => {
      try {
        setIsLoading(true);
        const data = await fetchOrderBook(selectedPair.symbol, 20);
        setOrderBook(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load order book data.');
        setIsLoading(false);
      }
    };
    
    loadOrderBook();
    
    // Set up polling for order book updates
    const intervalId = setInterval(loadOrderBook, 5000);
    
    return () => clearInterval(intervalId);
  }, [selectedPair]);
  
  // Calculate depth percentages
  const calculateDepth = (orders) => {
    if (orders.length === 0) return [];
    
    const maxTotal = Math.max(...orders.map(order => order.total));
    
    return orders.map(order => ({
      ...order,
      depthPercent: (order.total / maxTotal) * 100
    }));
  };
  
  const bidsWithDepth = calculateDepth(orderBook.bids);
  const asksWithDepth = calculateDepth(orderBook.asks);
  
  // Get the spread between highest bid and lowest ask
  const getSpread = () => {
    if (orderBook.bids.length === 0 || orderBook.asks.length === 0) return null;
    
    const highestBid = orderBook.bids[0].price;
    const lowestAsk = orderBook.asks[0].price;
    const spread = lowestAsk - highestBid;
    const spreadPercent = (spread / lowestAsk) * 100;
    
    return {
      spread,
      spreadPercent
    };
  };
  
  const spread = getSpread();
  
  if (isLoading && !orderBook.bids.length) {
    return (
      <section className="order-book order-book--loading">
        <FontAwesomeIcon icon={faSpinner} spin className="order-book__spinner" />
        <div>Loading order book...</div>
      </section>
    );
  }
  
  if (error && !orderBook.bids.length) {
    return (
      <section className="order-book order-book--error">
        <div>{error}</div>
      </section>
    );
  }
  
  return (
    <section className="order-book">
      <div className="order-book__header">
        <div className="order-book__tabs">
          <button 
            className={`order-book__tab ${activeTab === 'orderbook' ? 'order-book__tab--active' : ''}`}
            onClick={() => setActiveTab('orderbook')}
          >
            Order Book
          </button>
          <button 
            className={`order-book__tab ${activeTab === 'trades' ? 'order-book__tab--active' : ''}`}
            onClick={() => setActiveTab('trades')}
          >
            Recent trades
          </button>
        </div>
        <div className="order-book__view-selector">
          <div className="order-book__dropdown">
            <span>{depthLimit}</span>
            <FontAwesomeIcon icon={faChevronDown} onClick={() => setDepthLimit(depthLimit === 10 ? 20 : 10)} />
          </div>
        </div>
      </div>
      
      <div className="order-book__table-header">
        <div className="order-book__column-header">Price <span>({selectedPair?.quote})</span></div>
        <div className="order-book__column-header">Amounts <span>({selectedPair?.base})</span></div>
        <div className="order-book__column-header">Total</div>
      </div>
      
      <div className="order-book__sell-orders">
        {asksWithDepth.slice(0, depthLimit).map((order, index) => (
          <div key={index} className="order-book__order order-book__order--sell">
            <div className="order-book__price order-book__price--sell">
              {order.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
            </div>
            <div className="order-book__amount">
              {order.amount.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 8 })}
            </div>
            <div className="order-book__total">
              {order.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div 
              className="order-book__depth order-book__depth--sell"
              style={{ width: `${order.depthPercent}%` }}
            ></div>
          </div>
        ))}
      </div>
      
      {spread && (
        <div className="order-book__spread">
          <div className="order-book__spread-price">
            <span style={{ color: 'var(--color-accent)' }}>
              {spread.spread.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
            </span>
            <FontAwesomeIcon icon={faArrowUp} />
            <span>{spread.spreadPercent.toFixed(2)}%</span>
          </div>
        </div>
      )}
      
      <div className="order-book__buy-orders">
        {bidsWithDepth.slice(0, depthLimit).map((order, index) => (
          <div key={index} className="order-book__order order-book__order--buy">
            <div className="order-book__price order-book__price--buy">
              {order.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
            </div>
            <div className="order-book__amount">
              {order.amount.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 8 })}
            </div>
            <div className="order-book__total">
              {order.total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>
            <div 
              className="order-book__depth order-book__depth--buy"
              style={{ width: `${order.depthPercent}%` }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderBook;