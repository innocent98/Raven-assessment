import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChartLine } from '@fortawesome/free-solid-svg-icons';
import './ChartControls.css';

function ChartControls() {
  const [activeInterval, setActiveInterval] = useState('1D');
  const [showDropdown, setShowDropdown] = useState(false);
  
  const timeIntervals = ['1H', '2H', '4H', '1D', '1W', '1M'];
  const dropdownIntervals = ['5m', '15m', '30m', '3D'];
  
  const handleIntervalClick = (interval) => {
    setActiveInterval(interval);
    
    // Dispatch event for other components to listen to
    const event = new CustomEvent('chart-interval-change', {
      detail: { interval }
    });
    window.dispatchEvent(event);
  };
  
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };
  
  const handleDropdownItemClick = (interval) => {
    setActiveInterval(interval);
    setShowDropdown(false);
    
    // Dispatch event for other components to listen to
    const event = new CustomEvent('chart-interval-change', {
      detail: { interval }
    });
    window.dispatchEvent(event);
  };
  
  return (
    <div className="chart-controls">
      <div className="chart-controls__time-frames">
        {timeIntervals.map(interval => (
          <button 
            key={interval}
            className={`chart-controls__time-btn ${activeInterval === interval ? 'chart-controls__time-btn--active' : ''}`}
            onClick={() => handleIntervalClick(interval)}
          >
            {interval}
          </button>
        ))}
        <button 
          className="chart-controls__time-btn chart-controls__time-btn--dropdown"
          onClick={handleDropdownToggle}
        >
          <FontAwesomeIcon icon={faChevronDown} />
        </button>
        
        {showDropdown && (
          <div className="chart-controls__dropdown-menu">
            {dropdownIntervals.map(interval => (
              <button 
                key={interval}
                className="chart-controls__dropdown-item"
                onClick={() => handleDropdownItemClick(interval)}
              >
                {interval}
              </button>
            ))}
          </div>
        )}
      </div>
      
      <div className="chart-controls__indicators">
        <button className="chart-controls__indicator-btn">
          <FontAwesomeIcon icon={faChartLine} />
          <span>Fx Indicators</span>
        </button>
      </div>
    </div>
  );
}

export default ChartControls;