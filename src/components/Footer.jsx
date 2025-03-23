import React from "react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div class="footer-section about">
          <h2>About Us</h2>

          <p>&copy; 2025 Your Website. All Rights Reserved.</p>
        </div>
        <div class="footer-section links">
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
        <div class="footer-section contact">
          <h2>Contact Us</h2>
          <p>
            Email: <a href="mailto:support@example.com">support@example.com</a>
          </p>
          <p>
            Phone: <a href="tel:+1234567890">+251-914-792-331</a>
          </p>
          <p>Address: addis ababa, Ethiopia</p>
        </div>
        <div class="footer-section social">
          <h2>Follow Us</h2>
          <div class="social-icons">
            <li>
              <a href="https://facebook.com/example" class="text-white">
                Facebook
              </a>
            </li>
            <li>
              <a href="https://twitter.com/example" class="text-white">
                Twitter
              </a>
            </li>
            <li>
              <a href="https://linkedin.com/company/example" class="text-white">
                LinkedIn
              </a>
            </li>
          </div>
        </div>
      </div>
    </footer>
  );
}
