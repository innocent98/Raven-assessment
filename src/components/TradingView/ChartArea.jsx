/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { useTradingPairs } from '../../contexts/TradingPairsContext';
import { fetchCandlestickData, getApiInterval } from '../../services/api';
import './ChartArea.css';

function ChartArea() {
  const { selectedPair } = useTradingPairs();
  const [candlestickData, setCandlestickData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [interval, setInterval] = useState('1D');
  
  // Listen for interval changes from ChartControls
  useEffect(() => {
    const handleIntervalChange = (event) => {
      if (event.detail && event.detail.interval) {
        setInterval(event.detail.interval);
      }
    };
    
    window.addEventListener('chart-interval-change', handleIntervalChange);
    
    return () => {
      window.removeEventListener('chart-interval-change', handleIntervalChange);
    };
  }, []);
  
  // Fetch candlestick data when selected pair or interval changes
  useEffect(() => {
    if (!selectedPair) return;
    
    const loadCandlestickData = async () => {
      try {
        setIsLoading(true);
        const apiInterval = getApiInterval(interval);
        const data = await fetchCandlestickData(selectedPair.symbol, apiInterval, 100);
        setCandlestickData(data);
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load chart data.');
        setIsLoading(false);
      }
    };
    
    loadCandlestickData();
  }, [selectedPair, interval]);
  
  // Get the most recent candle data
  const getLatestCandle = () => {
    if (candlestickData.length === 0) return null;
    return candlestickData[candlestickData.length - 1];
  };
  
  const latestCandle = getLatestCandle();
  
  // Calculate price change percentage
  const calculatePriceChange = () => {
    if (candlestickData.length < 2) return 0;
    
    const firstCandle = candlestickData[0];
    const lastCandle = candlestickData[candlestickData.length - 1];
    
    return ((lastCandle.close - firstCandle.open) / firstCandle.open) * 100;
  };
  
  // Calculate highest and lowest prices in the dataset
  const calculateHighLow = () => {
    if (candlestickData.length === 0) return { high: 0, low: 0 };
    
    const high = Math.max(...candlestickData.map(candle => candle.high));
    const low = Math.min(...candlestickData.map(candle => candle.low));
    
    return { high, low };
  };
  
  const priceChange = calculatePriceChange();
  const { high, low } = calculateHighLow();
  
  // Prepare candles for display
  const prepareCandles = () => {
    if (candlestickData.length === 0) return [];
    
    // Get a subset of candles to display
    const displayCandles = candlestickData.slice(-20);
    
    // Calculate the min and max values for scaling
    const minValue = Math.min(...displayCandles.map(candle => candle.low));
    const maxValue = Math.max(...displayCandles.map(candle => candle.high));
    const valueRange = maxValue - minValue;
    
    // Scale the candles to fit in the chart area
    return displayCandles.map(candle => {
      const isUp = candle.close >= candle.open;
      const bodyHeight = Math.abs(candle.close - candle.open) / valueRange * 100;
      const wickTop = isUp 
        ? (candle.high - candle.close) / valueRange * 100 
        : (candle.high - candle.open) / valueRange * 100;
      const wickBottom = isUp 
        ? (candle.open - candle.low) / valueRange * 100 
        : (candle.close - candle.low) / valueRange * 100;
      
      return {
        time: candle.time,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
        volume: candle.volume,
        type: isUp ? 'up' : 'down',
        bodyHeight: Math.max(bodyHeight, 1), // Ensure minimum height
        wickTop,
        wickBottom
      };
    });
  };
  
  const displayCandles = prepareCandles();
  
  if (isLoading && !candlestickData.length) {
    return (
      <div className="chart-area chart-area--loading">
        <FontAwesomeIcon icon={faSpinner} spin className="chart-area__spinner" />
        <div>Loading chart data...</div>
      </div>
    );
  }
  
  if (error && !candlestickData.length) {
    return (
      <div className="chart-area chart-area--error">
        <div>{error}</div>
      </div>
    );
  }
  
  if (!selectedPair || !latestCandle) {
    return (
      <div className="chart-area chart-area--empty">
        <div>No chart data available</div>
      </div>
    );
  }
  
  return (
    <div className="chart-area">
      <div className="chart-area__info">
        <div className="chart-area__pair">{selectedPair.base}/{selectedPair.quote}</div>
        <div className="chart-area__stats">
          <div className="chart-area__stat chart-area__stat--open">O {latestCandle.open.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
          <div className="chart-area__stat chart-area__stat--high">H {high.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
          <div className="chart-area__stat chart-area__stat--low">L {low.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
          <div className="chart-area__stat chart-area__stat--close">C {latestCandle.close.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
          <div className="chart-area__stat chart-area__stat--change">Change: {priceChange.toFixed(2)}%</div>
          <div className="chart-area__stat chart-area__stat--amplitude">Amplitude: {((high - low) / low * 100).toFixed(2)}%</div>
        </div>
      </div>
      
      <div className="chart-area__candlestick">
        <div className="chart-area__placeholder">
          {displayCandles.map((candle, index) => (
            <div 
              key={index}
              className={`chart-area__candle chart-area__candle--${candle.type}`}
              style={{ height: `${candle.bodyHeight}%` }}
            >
              <div 
                className="chart-area__candle-wick-top"
                style={{ height: `${candle.wickTop}%` }}
              ></div>
              <div 
                className="chart-area__candle-wick-bottom"
                style={{ height: `${candle.wickBottom}%` }}
              ></div>
              
              {/* Tooltip on hover */}
              <div className="chart-area__candle-tooltip">
                <div>O: {candle.open.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                <div>H: {candle.high.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                <div>L: {candle.low.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                <div>C: {candle.close.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                <div>Date: {new Date(candle.time).toLocaleString()}</div>
              </div>
            </div>
          ))}
          <div className="chart-area__price-line">
            {latestCandle.close.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}
          </div>
        </div>
      </div>
      
      <div className="chart-area__volume">
        <div className="chart-area__volume-bars">
          {displayCandles.map((candle, index) => {
            // Normalize volume for display
            const maxVolume = Math.max(...displayCandles.map(c => c.volume));
            const volumeHeight = (candle.volume / maxVolume) * 100;
            
            return (
              <div 
                key={index}
                className={`chart-area__volume-bar chart-area__volume-bar--${candle.type}`}
                style={{ height: `${volumeHeight}%` }}
              ></div>
            );
          })}
        </div>
        <div className="chart-area__volume-info">
          <div className="chart-area__volume-label">
            Vol({selectedPair.base}): {(latestCandle.volume).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
          <div className="chart-area__volume-label">
            Vol({selectedPair.quote}): {(latestCandle.volume * latestCandle.close).toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChartArea;