import { useTradingPairs } from '../../contexts/TradingPairsContext';
import './ChartArea.css';

function ChartArea() {
  const { selectedPair } = useTradingPairs();
  
  // Generate random candles for the chart
  const generateCandles = () => {
    const candles = [];
    for (let i = 0; i < 8; i++) {
      const isUp = Math.random() > 0.5;
      candles.push({
        type: isUp ? 'up' : 'down',
        height: 30 + Math.random() * 40,
        wickTop: 5 + Math.random() * 20,
        wickBottom: 5 + Math.random() * 20
      });
    }
    return candles;
  };
  
  const candles = generateCandles();
  
  return (
    <div className="chart-area">
      <div className="chart-area__info">
        <div className="chart-area__pair">{selectedPair.base}/USD</div>
        <div className="chart-area__stats">
          <div className="chart-area__stat chart-area__stat--open">O 36,641.54</div>
          <div className="chart-area__stat chart-area__stat--high">H 36,641.54</div>
          <div className="chart-area__stat chart-area__stat--low">L 36,641.54</div>
          <div className="chart-area__stat chart-area__stat--close">C 36,641.54</div>
          <div className="chart-area__stat chart-area__stat--change">Change: 2.33%</div>
          <div className="chart-area__stat chart-area__stat--amplitude">Amplitude: 5.59%</div>
        </div>
      </div>
      
      <div className="chart-area__candlestick">
        <div className="chart-area__placeholder">
          {candles.map((candle, index) => (
            <div 
              key={index}
              className={`chart-area__candle chart-area__candle--${candle.type}`}
              style={{ height: `${candle.height}px` }}
            >
              <div 
                className="chart-area__candle-wick-top"
                style={{ height: `${candle.wickTop}px` }}
              ></div>
              <div 
                className="chart-area__candle-wick-bottom"
                style={{ height: `${candle.wickBottom}px` }}
              ></div>
            </div>
          ))}
          <div className="chart-area__price-line">36,641.20</div>
        </div>
      </div>
      
      <div className="chart-area__volume">
        <div className="chart-area__volume-bars">
          {candles.map((candle, index) => (
            <div 
              key={index}
              className={`chart-area__volume-bar chart-area__volume-bar--${candle.type}`}
              style={{ height: `${candle.height * 0.4}px` }}
            ></div>
          ))}
        </div>
        <div className="chart-area__volume-info">
          <div className="chart-area__volume-label">Vol(BTC): 66.254k</div>
          <div className="chart-area__volume-label">Vol(USDT): 2.148B</div>
        </div>
      </div>
    </div>
  );
}

export default ChartArea;