import React from "react";
import "./About.css";
import { Link } from "react-router-dom";
export default function About() {
  return (
    <div className="home-container">
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Our Website</h1>
          <p>
            Experience the best services with a seamless user experience. we
            help students with department changes and dormitory exchanges in a
            simple and efficient way
          </p>
          <button className="cta-button">
            <Link to="/login">Get Started</Link>
          </button>
        </div>
      </section>

      <section className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="card">
            <h3>Fast & Secure</h3>
            <p>Enjoy lightning-fast performance with top security standards.</p>
          </div>
          <div className="card">
            <h3>Easy to Use</h3>
            <p>Our platform is user-friendly and accessible to everyone.</p>
          </div>
          <div className="card">
            <h3>24/7 Support</h3>
            <p>Our team is here to help you anytime, anywhere.</p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta">
        <h2>Join Us Today!</h2>
        <p>Sign up now and take advantage of our amazing features.</p>
        <button className="cta-button">
          <Link to="/signup">Sign Up</Link>
        </button>
      </section>
    </div>
  );
}
