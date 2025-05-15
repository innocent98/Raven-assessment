import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faChevronRight, faGlobe, faSignInAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import './Header.css';

function Header() {
  const location = useLocation();
  
  return (
    <header className="header">
      <div className="header__logo-container">
        <div className="header__logo">
          <FontAwesomeIcon icon={faBolt} className="header__logo-icon" />
          <span className="header__logo-text">Sisyphus</span>
        </div>
      </div>
      
      <nav className="header__nav">
        <ul className="header__nav-list">
          <li className={`header__nav-item ${location.pathname === '/' ? 'header__nav-item--active' : ''}`}>
            <Link to="/" className="header__nav-link">Exchange</Link>
          </li>
          <li className={`header__nav-item ${location.pathname === '/wallets' ? 'header__nav-item--active' : ''}`}>
            <Link to="/wallets" className="header__nav-link">Wallets</Link>
          </li>
          <li className={`header__nav-item ${location.pathname === '/roqqu-hub' ? 'header__nav-item--active' : ''}`}>
            <Link to="/roqqu-hub" className="header__nav-link">Roqqu Hub</Link>
          </li>
        </ul>
      </nav>
      
      <div className="header__user-section">
        <div className="header__user">
          <div className="header__user-avatar">
            <img src="https://via.placeholder.com/32" alt="User avatar" className="header__user-img" />
          </div>
          <span className="header__user-name">Olakunle Te...</span>
          <FontAwesomeIcon icon={faChevronRight} className="header__user-icon" />
        </div>
        <div className="header__language">
          <FontAwesomeIcon icon={faGlobe} className="header__language-icon" />
        </div>
        <div className="header__login">
          <FontAwesomeIcon icon={faSignInAlt} className="header__login-icon" />
        </div>
      </div>
      
      <button className="header__mobile-menu">
        <FontAwesomeIcon icon={faBars} />
      </button>
    </header>
  );
}

export default Header;