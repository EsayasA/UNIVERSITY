import React, { useState } from "react";
import "./Signup.css";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/auth/register", {
        name,
        email,
        password,
      });

      setName(""); // Clear form fields
      setEmail("");
      setPassword("");
      toast.success(response.data.message);
      navigate("/login");
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
    <div className="signup-container">
      <h2>Sign Up</h2>
      <p>Create your account</p>

      <form id="signup-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            placeholder="Enter your name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="signup-btn" type="submit">
          Sign Up
        </button>
      </form>

      <p className="login-link">
        Already have an account? <Link to={"/login"}>Log in</Link>
      </p>
    </div>
  );
}
