import { useState } from 'react';
import './MobileTabs.css';

function MobileTabs() {
  const [activeTab, setActiveTab] = useState('charts');
  
  return (
    <div className="mobile-tabs">
      <button 
        className={`mobile-tabs__btn ${activeTab === 'charts' ? 'mobile-tabs__btn--active' : ''}`}
        onClick={() => setActiveTab('charts')}
      >
        Charts
      </button>
      <button 
        className={`mobile-tabs__btn ${activeTab === 'orderbook' ? 'mobile-tabs__btn--active' : ''}`}
        onClick={() => setActiveTab('orderbook')}
      >
        Orderbook
      </button>
      <button 
        className={`mobile-tabs__btn ${activeTab === 'trades' ? 'mobile-tabs__btn--active' : ''}`}
        onClick={() => setActiveTab('trades')}
      >
        Recent trades
      </button>
    </div>
  );
}

export default MobileTabs;