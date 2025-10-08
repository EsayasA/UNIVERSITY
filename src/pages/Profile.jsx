/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Profile.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function Profile() {
  const [user, setUser] = useState(null); // Initially, no user data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  // Fetch user profile from the backend when the component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []); // Runs only once when the component mounts

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("User is not authenticated. Please log in.");
        setLoading(false);
        return;
      }

      const response = await axios.get(`${API_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUser(response.data.user); // Store user data in state
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Save user data in localStorage
      setLoading(false);
    } catch (err) {
      setError("Failed to load user profile.");
      setLoading(false);
    }
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle form submission to update profile
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("authToken");

    try {
      const response = await axios.put(
        `${API_URL}/auth/updateProfile`,
        {
          name: user.name,
          phone: user.phone,
          department: user.department,
          campus: user.campus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data.user); // Update state with new user data
      localStorage.setItem("user", JSON.stringify(response.data.user)); // Save updated user data
      toast.success("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile.");
      toast.error("Error updating profile.");
    }
  };

  if (loading) return <p>Loading profile...</p>; // Show loading while fetching data
  if (error) return <p style={{ color: "red" }}>{error}</p>; // Show error message

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2 className="text-center">User Profile Setting</h2>
      <div className="label-input">
        <label className="label">Name</label>
        <input
          className="input"
          type="text"
          name="name"
          value={user?.name || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="label-input">
        <label className="label">Email</label>
        <input
          className="input"
          type="email"
          name="email"
          value={user?.email || ""}
          disabled
        />
      </div>

      <div className="label-input">
        <label className="label">Phone Number</label>
        <input
          className="input"
          type="text"
          name="phone"
          placeholder="Enter your phone number"
          value={user?.phone || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="label-input">
        <label className="label">Department</label>
        <input
          className="input"
          type="text"
          name="department"
          placeholder="Enter your department"
          value={user?.department || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="label-input">
        <label className="label">Campus</label>
        <input
          className="input"
          type="text"
          name="campus"
          placeholder="Enter your campus"
          value={user?.campus || ""}
          onChange={handleInputChange}
        />
      </div>

      <button type="submit" className="btn">
        Update
      </button>
    </form>
  );
}
