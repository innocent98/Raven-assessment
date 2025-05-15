// Base URL for Binance API
const BASE_URL = 'https://api.binance.com';

// Fetch trading pairs data (24hr ticker)
export const fetchTradingPairs = async () => {
  try {
    const response = await fetch(`${BASE_URL}/api/v3/ticker/24hr`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    
    // Filter for common trading pairs and format the data
    return data
      .filter(pair => 
        pair.symbol.endsWith('USDT') || 
        pair.symbol.endsWith('BTC') || 
        pair.symbol.endsWith('ETH')
      )
      .map(pair => {
        // Extract base and quote currencies
        let base, quote;
        if (pair.symbol.endsWith('USDT')) {
          base = pair.symbol.slice(0, -4);
          quote = 'USDT';
        } else if (pair.symbol.endsWith('BTC')) {
          base = pair.symbol.slice(0, -3);
          quote = 'BTC';
        } else if (pair.symbol.endsWith('ETH')) {
          base = pair.symbol.slice(0, -3);
          quote = 'ETH';
        }
        
        // Assign colors based on currency
        const baseColor = getCurrencyColor(base);
        const quoteColor = getCurrencyColor(quote);
        
        return {
          symbol: pair.symbol,
          base,
          quote,
          baseColor,
          quoteColor,
          price: parseFloat(pair.lastPrice),
          change: parseFloat(pair.priceChangePercent),
          volume: parseFloat(pair.volume),
          high: parseFloat(pair.highPrice),
          low: parseFloat(pair.lowPrice)
        };
      })
      .sort((a, b) => b.volume - a.volume) // Sort by volume
      .slice(0, 50); // Limit to top 50 pairs
  } catch (error) {
    console.error('Error fetching trading pairs:', error);
    throw error;
  }
};

// Fetch order book data for a specific symbol
export const fetchOrderBook = async (symbol, limit = 20) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v3/depth?symbol=${symbol}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    
    // Format the order book data
    return {
      bids: data.bids.map(bid => ({
        price: parseFloat(bid[0]),
        amount: parseFloat(bid[1]),
        total: parseFloat(bid[0]) * parseFloat(bid[1])
      })),
      asks: data.asks.map(ask => ({
        price: parseFloat(ask[0]),
        amount: parseFloat(ask[1]),
        total: parseFloat(ask[0]) * parseFloat(ask[1])
      }))
    };
  } catch (error) {
    console.error(`Error fetching order book for ${symbol}:`, error);
    throw error;
  }
};

// Fetch candlestick data for a specific symbol and interval
export const fetchCandlestickData = async (symbol, interval = '1d', limit = 100) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    const data = await response.json();
    
    // Format the candlestick data
    return data.map(candle => ({
      time: candle[0], // Open time
      open: parseFloat(candle[1]),
      high: parseFloat(candle[2]),
      low: parseFloat(candle[3]),
      close: parseFloat(candle[4]),
      volume: parseFloat(candle[5]),
      closeTime: candle[6],
      quoteAssetVolume: parseFloat(candle[7]),
      numberOfTrades: candle[8],
      takerBuyBaseAssetVolume: parseFloat(candle[9]),
      takerBuyQuoteAssetVolume: parseFloat(candle[10])
    }));
  } catch (error) {
    console.error(`Error fetching candlestick data for ${symbol}:`, error);
    throw error;
  }
};

// Helper function to get a color for a currency
const getCurrencyColor = (currency) => {
  const colors = {
    'BTC': '#f7931a',
    'ETH': '#627eea',
    'BNB': '#f3ba2f',
    'SOL': '#00ffbd',
    'XRP': '#23292f',
    'ADA': '#0033ad',
    'DOGE': '#c3a634',
    'DOT': '#e6007a',
    'MATIC': '#8247e5',
    'AVAX': '#e84142',
    'USDT': '#26a17b',
    'USDC': '#2775ca',
    'BUSD': '#f0b90b'
  };
  
  return colors[currency] || `#${Math.floor(Math.random()*16777215).toString(16)}`;
};

// Map Binance intervals to our UI intervals
export const intervalMap = {
  '1m': '1m',
  '5m': '5m',
  '15m': '15m',
  '30m': '30m',
  '1h': '1h',
  '2h': '2h',
  '4h': '4h',
  '1d': '1d',
  '1w': '1w',
  '1M': '1M'
};

// Convert our UI intervals to Binance intervals
export const getApiInterval = (uiInterval) => {
  const mapping = {
    '1m': '1m',
    '5m': '5m',
    '15m': '15m',
    '30m': '30m',
    '1H': '1h',
    '2H': '2h',
    '4H': '4h',
    '1D': '1d',
    '3D': '3d',
    '1W': '1w',
    '1M': '1M'
  };
  
  return mapping[uiInterval] || '1d';
};