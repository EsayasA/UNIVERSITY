import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      const { token, user } = response.data;

      // Save token to localStorage

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user)); // Save user info in local storage
      console.log("Login successful:", user);
      if (response.status === 200) {
        toast.success("Login successful!");
      }
      navigate("/profile");
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      toast.error("login failed");
    }
  };

  return (
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form action="#" method="POST" onSubmit={handleSubmit}>
          <div class="input-group">
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

          <div class="input-group">
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

          <button type="submit" class="btn">
            Login
          </button>

          <div class="forgot-password">
            <a href="/forgot-password">Forgot your password?</a>
          </div>
          <div>
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-red-300">
                Register
              </a>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
