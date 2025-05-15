import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import './OrderBook.css';

function OrderBook() {
  const [activeTab, setActiveTab] = useState('orderbook');
  
  // Generate sample order data
  const generateOrders = (isSell) => {
    const orders = [];
    const basePrice = isSell ? 36920.12 : 36820.12;
    
    for (let i = 0; i < 5; i++) {
      const price = isSell 
        ? basePrice + (i * 10) 
        : basePrice - (i * 10);
      
      orders.push({
        price: price.toFixed(2),
        amount: (0.758965 - (i * 0.01)).toFixed(6),
        total: (price * (0.758965 - (i * 0.01))).toFixed(2),
        depth: 30 - (i * 5)
      });
    }
    
    return orders;
  };
  
  const sellOrders = generateOrders(true);
  const buyOrders = generateOrders(false);
  
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
            <span>10</span>
            <FontAwesomeIcon icon={faChevronDown} />
          </div>
        </div>
      </div>
      
      <div className="order-book__table-header">
        <div className="order-book__column-header">Price <span>(USD)</span></div>
        <div className="order-book__column-header">Amounts <span>(BTC)</span></div>
        <div className="order-book__column-header">Total</div>
      </div>
      
      <div className="order-book__sell-orders">
        {sellOrders.map((order, index) => (
          <div key={index} className="order-book__order order-book__order--sell">
            <div className="order-book__price order-book__price--sell">{order.price}</div>
            <div className="order-book__amount">{order.amount}</div>
            <div className="order-book__total">{order.total}</div>
            <div 
              className="order-book__depth order-book__depth--sell"
              style={{ width: `${order.depth}%` }}
            ></div>
          </div>
        ))}
      </div>
      
      <div className="order-book__spread">
        <div className="order-book__spread-price">
          <span style={{ color: 'lightgreen' }}>36,641.20</span>
          <FontAwesomeIcon icon={faArrowUp} />
          <span>36,641.20</span>
        </div>
      </div>
      
      <div className="order-book__buy-orders">
        {buyOrders.map((order, index) => (
          <div key={index} className="order-book__order order-book__order--buy">
            <div className="order-book__price order-book__price--buy">{order.price}</div>
            <div className="order-book__amount">{order.amount}</div>
            <div className="order-book__total">{order.total}</div>
            <div 
              className="order-book__depth order-book__depth--buy"
              style={{ width: `${order.depth}%` }}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OrderBook;