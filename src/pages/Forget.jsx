import React, { useState } from "react";
import "./Forget.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
export default function Forget() {
  const [email, setEmail] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "https://backend-addis-1.onrender.com/auth/forgot-password",
        { email },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.Status === "Success") {
          console.log(res);

          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div class="forgot-password-container">
      <h2>Forgot Password</h2>
      <p>Enter your email address to reset your password.</p>

      <form id="forgot-password-form" onSubmit={handleSubmit}>
        <div class="input-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button className="btn-fgt" type="submit">
          Send Reset Link
        </button>
      </form>

      <p class="back-to-login">
        <Link to="/login">Back to Login</Link>
      </p>
    </div>
  );
}
