import { createContext, useState, useContext } from 'react';

// Sample trading pairs data
const tradingPairsData = [
  { base: 'BTC', quote: 'USDT', baseColor: '#f7931a', quoteColor: '#26a17b', price: 20634.00, change: 1.25 },
  { base: 'ETH', quote: 'USDT', baseColor: '#627eea', quoteColor: '#26a17b', price: 1789.45, change: 0.75 },
  { base: 'SOL', quote: 'USDT', baseColor: '#00ffbd', quoteColor: '#26a17b', price: 43.21, change: -2.15 },
  { base: 'BNB', quote: 'USDT', baseColor: '#f3ba2f', quoteColor: '#26a17b', price: 243.87, change: 0.32 },
  { base: 'XRP', quote: 'USDT', baseColor: '#23292f', quoteColor: '#26a17b', price: 0.5123, change: -0.45 },
  { base: 'ADA', quote: 'USDT', baseColor: '#0033ad', quoteColor: '#26a17b', price: 0.4321, change: 1.05 },
  { base: 'DOGE', quote: 'USDT', baseColor: '#c3a634', quoteColor: '#26a17b', price: 0.0876, change: 3.45 },
  { base: 'DOT', quote: 'USDT', baseColor: '#e6007a', quoteColor: '#26a17b', price: 6.78, change: -0.23 },
  { base: 'MATIC', quote: 'USDT', baseColor: '#8247e5', quoteColor: '#26a17b', price: 0.9876, change: 2.34 },
  { base: 'AVAX', quote: 'USDT', baseColor: '#e84142', quoteColor: '#26a17b', price: 21.43, change: 1.12 },
  { base: 'BTC', quote: 'USD', baseColor: '#f7931a', quoteColor: '#6b8aff', price: 20635.50, change: 1.27 },
  { base: 'ETH', quote: 'USD', baseColor: '#627eea', quoteColor: '#6b8aff', price: 1790.12, change: 0.78 }
];

const TradingPairsContext = createContext();

export function TradingPairsProvider({ children }) {
  const [tradingPairs] = useState(tradingPairsData);
  const [selectedPair, setSelectedPair] = useState(tradingPairsData[0]);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter trading pairs based on search query
  const filteredPairs = searchQuery
    ? tradingPairs.filter(pair => {
        const pairName = `${pair.base}${pair.quote}`.toLowerCase();
        const pairWithSlash = `${pair.base}/${pair.quote}`.toLowerCase();
        return pairName.includes(searchQuery.toLowerCase()) || pairWithSlash.includes(searchQuery.toLowerCase());
      })
    : tradingPairs;

  return (
    <TradingPairsContext.Provider value={{
      tradingPairs,
      selectedPair,
      setSelectedPair,
      searchQuery,
      setSearchQuery,
      filteredPairs
    }}>
      {children}
    </TradingPairsContext.Provider>
  );
}

export function useTradingPairs() {
  return useContext(TradingPairsContext);
}