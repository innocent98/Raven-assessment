import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faClock, faArrowUp, faArrowDown, faChartBar, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useTradingPairs } from '../../contexts/TradingPairsContext';
import './TradingPairInfo.css';

function TradingPairInfo() {
  const { selectedPair, setSelectedPair, searchQuery, setSearchQuery, filteredPairs } = useTradingPairs();
  const [showResults, setShowResults] = useState(false);
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(e.target.value.length > 0);
  };
  
  const handlePairSelect = (pair) => {
    setSelectedPair(pair);
    setSearchQuery('');
    setShowResults(false);
  };
  
  const handleClickOutside = (e) => {
    if (!e.target.closest('.trading-pair__search')) {
      setShowResults(false);
    }
  };
  
  return (
    <section className="trading-pair" onClick={handleClickOutside}>
      <div className="trading-pair__container">
        <div className="trading-pair__selector">
          <div className="trading-pair__icons">
            <div 
              className="trading-pair__icon trading-pair__icon--base" 
              style={{ backgroundColor: selectedPair.baseColor }}
            >
              {selectedPair.base.charAt(0)}
            </div>
            <div 
              className="trading-pair__icon trading-pair__icon--quote" 
              style={{ backgroundColor: selectedPair.quoteColor }}
            >
              {selectedPair.quote.charAt(0)}
            </div>
          </div>
          <div className="trading-pair__name">{selectedPair.base}/{selectedPair.quote}</div>
          <FontAwesomeIcon icon={faChevronDown} className="trading-pair__dropdown-icon" />
        </div>
        
        <div className="trading-pair__price">
          <div className="trading-pair__current-price">${selectedPair.price.toLocaleString()}</div>
        </div>
        
        <div className="trading-pair__search">
          <div className="trading-pair__search-wrapper">
            <input 
              type="text" 
              className="trading-pair__search-input" 
              placeholder="Search pairs..." 
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <FontAwesomeIcon icon={faSearch} className="trading-pair__search-icon" />
          </div>
          
          {showResults && (
            <div className="trading-pair__search-results">
              {filteredPairs.length > 0 ? (
                filteredPairs.map((pair, index) => (
                  <div 
                    key={index} 
                    className="trading-pair__search-item"
                    onClick={() => handlePairSelect(pair)}
                  >
                    <div className="trading-pair__search-icons">
                      <div 
                        className="trading-pair__search-icon-coin" 
                        style={{ backgroundColor: pair.baseColor }}
                      >
                        {pair.base.charAt(0)}
                      </div>
                      <div 
                        className="trading-pair__search-icon-coin" 
                        style={{ backgroundColor: pair.quoteColor, marginLeft: '-8px' }}
                      >
                        {pair.quote.charAt(0)}
                      </div>
                    </div>
                    <div className="trading-pair__search-name">{pair.base}/{pair.quote}</div>
                    <div 
                      className="trading-pair__search-price"
                      style={{ color: pair.change >= 0 ? 'var(--color-accent)' : 'var(--color-negative)' }}
                    >
                      ${pair.price.toFixed(2)} ({pair.change >= 0 ? '+' : ''}{pair.change}%)
                    </div>
                  </div>
                ))
              ) : (
                <div className="trading-pair__search-item">No results found</div>
              )}
            </div>
          )}
        </div>
      </div>
      
      <div className="trading-pair__stats">
        <div className="trading-pair__stat">
          <div className="trading-pair__stat-label">
            <FontAwesomeIcon icon={faClock} />
            24h change
          </div>
          <div className={`trading-pair__stat-value ${selectedPair.change >= 0 ? 'trading-pair__stat-value--positive' : 'trading-pair__stat-value--negative'}`}>
            {selectedPair.price.toFixed(2)} {selectedPair.change >= 0 ? '+' : ''}{selectedPair.change}%
          </div>
        </div>
        
        <div className="trading-pair__stat">
          <div className="trading-pair__stat-label">
            <FontAwesomeIcon icon={faArrowUp} />
            24h high
          </div>
          <div className="trading-pair__stat-value">
            {(selectedPair.price * 1.05).toFixed(2)} +1.25%
          </div>
        </div>
        
        <div className="trading-pair__stat">
          <div className="trading-pair__stat-label">
            <FontAwesomeIcon icon={faArrowDown} />
            24h low
          </div>
          <div className="trading-pair__stat-value">
            {(selectedPair.price * 0.95).toFixed(2)} +1.25%
          </div>
        </div>
        
        <div className="trading-pair__stat">
          <div className="trading-pair__stat-label">
            <FontAwesomeIcon icon={faChartBar} />
            24h volume
          </div>
          <div className="trading-pair__stat-value">75,655.26</div>
        </div>
      </div>
    </section>
  );
}

export default TradingPairInfo;