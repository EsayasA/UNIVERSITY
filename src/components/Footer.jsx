import React from "react";
import "./Footer.css";

const Footer = React.memo(() => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2>About Us</h2>
          <p>&copy; 2025 Your Website. All Rights Reserved.</p>
        </div>
        <div className="footer-section links">
          <h2>Quick Links</h2>
          <ul>
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About Us</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>
            Email: <a href="mailto:support@example.com">support@example.com</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+251-914-792-331</a>
          </p>
          <p>Address: Addis Ababa, Ethiopia</p>
        </div>
        <div className="footer-section social">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <ul>
              <li>
                <a href="https://facebook.com/example" className="text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://twitter.com/example" className="text-white">
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/example"
                  className="text-white"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
});

export default Footer;
