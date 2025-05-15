/* eslint-disable no-unused-vars */
import { createContext, useState, useContext, useEffect } from 'react';
import { fetchTradingPairs } from '../services/api';

const TradingPairsContext = createContext();

export function TradingPairsProvider({ children }) {
  const [tradingPairs, setTradingPairs] = useState([]);
  const [selectedPair, setSelectedPair] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch trading pairs on component mount
  useEffect(() => {
    const loadTradingPairs = async () => {
      try {
        setIsLoading(true);
        const data = await fetchTradingPairs();
        setTradingPairs(data);
        setSelectedPair(data[0]); // Set the first pair as selected by default
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load trading pairs. Please try again later.');
        setIsLoading(false);
      }
    };

    loadTradingPairs();
  }, []);

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
      filteredPairs,
      isLoading,
      error
    }}>
      {children}
    </TradingPairsContext.Provider>
  );
}

export function useTradingPairs() {
  return useContext(TradingPairsContext);
}