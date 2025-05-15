import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faTelegram, faDiscord, faGithub } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__copyright">
        <p>&copy; 2025 Sisyphus. All rights reserved.</p>
      </div>
      
      <div className="footer__social">
        <a href="#" className="footer__social-link">
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <a href="#" className="footer__social-link">
          <FontAwesomeIcon icon={faTelegram} />
        </a>
        <a href="#" className="footer__social-link">
          <FontAwesomeIcon icon={faDiscord} />
        </a>
        <a href="#" className="footer__social-link">
          <FontAwesomeIcon icon={faGithub} />
        </a>
      </div>
      
      <div className="footer__contact">
        <a href="#" className="footer__contact-link">Contact Us</a>
      </div>
    </footer>
  );
}

export default Footer;