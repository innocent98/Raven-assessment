import TradingPairInfo from './TradingPairInfo';
import MobileTabs from './MobileTabs';
import ChartControls from './ChartControls';
import TradingSection from './TradingSection';

function TradingView() {
  return (
    <div className="trading-view">
      <TradingPairInfo />
      <MobileTabs />
      <ChartControls />
      <TradingSection />
    </div>
  );
}

export default TradingView;