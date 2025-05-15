import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import TradingView from './components/TradingView/TradingView';
import OrderHistory from './components/OrderHistory/OrderHistory';
import Footer from './components/Footer/Footer';
import Wallets from './pages/Wallets';
import RoqquHub from './pages/RoqquHub';
import { TradingPairsProvider } from './contexts/TradingPairsContext';
import './App.css';

function App() {
  return (
    <Router>
      <TradingPairsProvider>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={
              <>
                <TradingView />
                <OrderHistory />
              </>
            } />
            <Route path="/wallets" element={<Wallets />} />
            <Route path="/roqqu-hub" element={<RoqquHub />} />
          </Routes>
          <Footer />
        </div>
      </TradingPairsProvider>
    </Router>
  );
}

export default App;