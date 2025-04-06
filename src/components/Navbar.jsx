import React, { useEffect, useState, useRef } from "react";
import Logo from "./Logo";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [Open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  const profileBtnRef = useRef(null);
  const navigate = useNavigate();

  const closeMenu = () => setOpen((prev) => !prev);
  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

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

  // Fetch user data from the backend using the token in localStorage
  const fetchUser = async () => {
    const token = localStorage.getItem("authToken");

    if (!token) {
      setUser(null); // No token means user is logged out
      return;
    }

    try {
      const response = await axios.get(
        "https://backend-addis-1.onrender.com/auth/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(response.data.user); // Set user if token is valid
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null); // In case of error, set user to null
    }
  };

  // Run fetchUser on mount and whenever the token changes
  useEffect(() => {
    fetchUser();
  }, [localStorage.getItem("authToken")]); // Dependency on authToken change

  // Handle logout functionality
  const handleLogout = () => {
    localStorage.removeItem("authToken"); // Clear auth token from localStorage
    setUser(null); // Reset user state
    setIsOpen(false); // Close dropdown if open
    navigate("/login"); // Redirect to login page
  };

  // Handle login functionality (simulate login)
  const handleLogin = () => {
    // Example: simulate login by setting a fake token
    localStorage.setItem("authToken", "fake-token"); // Save token
    fetchUser(); // Fetch user data after setting the token
    navigate("/"); // Redirect to home page after login
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
              // If user is logged in, show profile button and dropdown
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
                      onClick={(handleLogout, closeMenu)}
                      className="logout-btn"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // If user is not logged in, show login button

              <Link
                to="/login"
                onClick={(handleLogin, closeMenu)}
                className="login-btn"
              >
                Login
              </Link>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}
