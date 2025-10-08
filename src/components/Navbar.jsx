import React, { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileBtnRef = useRef(null);
  const navigate = useNavigate();

  const closeMenu = () => setOpen((prev) => !prev);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileBtnRef.current &&
        !profileBtnRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch user data from backend using JWT token
  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setUser(null);
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null);
      localStorage.removeItem("authToken"); // remove invalid token
    }
  };

  // Fetch user on mount for page refresh
  useEffect(() => {
    fetchUser();
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsOpen(false);
    navigate("/login");
  };

  // Handle login — user credentials should come from a login form
  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setUser(response.data.user); // set user immediately
      console.log(user);

      navigate("/"); // redirect after login
    } catch (error) {
      console.error("Login failed:", error);
      alert("Invalid email or password");
    }
  };

  return (
    <nav className="navbar">
      <div className="hamburger" onClick={closeMenu}>
        ☰
      </div>
      <div className={`navbar-lists ${Open ? "active" : ""}`}>
        <Link className="logo" to="/">
          <Logo />
        </Link>

        <ul className="navbar-links">
          <li>
            <Link to="/" onClick={closeMenu}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMenu}>
              Contact
            </Link>
          </li>
          <li className="user-profile">
            {user ? (
              // Logged-in user: show profile dropdown
              <div className="profile-dropdown">
                <button
                  ref={profileBtnRef}
                  onClick={toggleDropdown}
                  className="profile-btn"
                >
                  {user.name.charAt(0).toUpperCase()}
                </button>
                {isOpen && (
                  <div ref={dropdownRef} className="dropdown-content">
                    <Link to="/profile" onClick={closeMenu}>
                      View Profile
                    </Link>
                    <Link to="/search" onClick={closeMenu}>
                      Search
                    </Link>
                    <button
                      onClick={() => {
                        handleLogout();
                        closeMenu();
                      }}
                      className="logout-btn"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // Not logged-in: show login button
              <button className="login-btn" onClick={() => navigate("/login")}>
                Login
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
