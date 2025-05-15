import { useState } from 'react';
import './OrderHistory.css';

function OrderHistory() {
  const [activeTab, setActiveTab] = useState('open');
  
  return (
    <div className="order-history">
      <div className="order-history__tabs">
        <button 
          className={`order-history__tab-btn ${activeTab === 'open' ? 'order-history__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('open')}
        >
          Open Orders
        </button>
        <button 
          className={`order-history__tab-btn ${activeTab === 'positions' ? 'order-history__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('positions')}
        >
          Positions
        </button>
        <button 
          className={`order-history__tab-btn ${activeTab === 'order-history' ? 'order-history__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('order-history')}
        >
          Order History
        </button>
        <button 
          className={`order-history__tab-btn ${activeTab === 'trade-history' ? 'order-history__tab-btn--active' : ''}`}
          onClick={() => setActiveTab('trade-history')}
        >
          Trade History
        </button>
      </div>
      
      <div className="order-history__content">
        <div className="order-history__empty">
          <h3 className="order-history__empty-title">No Open Orders</h3>
          <p className="order-history__empty-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.<br />
            Id pulvinar nullam sit imperdiet pulvinar.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderHistory;