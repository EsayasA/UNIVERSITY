import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://backend-addis-1.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      const { token, user } = response.data;

      // Save token to localStorage

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user)); // Save user info in local storage

      toast.success("Login successful!");
      navigate("/profile");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      if (err.response && err.response.data.error) {
        toast.error(err.response.data.error); // Specific backend error
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div className="input-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn">
            Login
          </button>

          <div className="forgot-password">
            <Link to={"/forgot-password"}>Forgot your password?</Link>
          </div>
          <div>
            <p>
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-red-300">
                Register
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
