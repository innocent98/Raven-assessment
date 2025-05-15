import { useState } from 'react';
import './MobileActions.css';

function MobileActions() {
  const [activeAction, setActiveAction] = useState('buy');
  
  return (
    <div className="mobile-actions">
      <button 
        className={`mobile-actions__btn mobile-actions__btn--buy ${activeAction === 'buy' ? 'mobile-actions__btn--active' : ''}`}
        onClick={() => setActiveAction('buy')}
      >
        Buy
      </button>
      <button 
        className={`mobile-actions__btn mobile-actions__btn--sell ${activeAction === 'sell' ? 'mobile-actions__btn--active' : ''}`}
        onClick={() => setActiveAction('sell')}
      >
        Sell
      </button>
    </div>
  );
}

export default MobileActions;