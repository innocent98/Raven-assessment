import ChartArea from './ChartArea';
import OrderBook from './OrderBook';
import OrderForm from './OrderForm';
import MobileActions from './MobileActions';
import './TradingSection.css';

function TradingSection() {
  return (
    <>
      <div className="trading-section">
        <ChartArea />
        <OrderBook />
        <OrderForm />
      </div>
      <MobileActions />
    </>
  );
}

export default TradingSection;