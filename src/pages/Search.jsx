import React, { useState } from "react";
import axios from "axios";
import "./Search.css";

export default function Search() {
  const [searchCategory, setSearchCategory] = useState("department");
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle category change (department or campus)
  const handleCategoryChange = (e) => {
    setSearchCategory(e.target.value);
  };

  // Handle input change for search query
  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search button click
  const handleSearch = async () => {
    if (!searchQuery) return;

    setLoading(true);

    try {
      // Make API request to search for users by department or campus
      const response = await axios.get("http://localhost:5000/auth/search", {
        params: {
          category: searchCategory,
          query: searchQuery,
        },
      });

      setResults(response.data); // Set search results
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-search">
      <h2 className="header">Are you looking for a user?</h2>

      <div className="search-form">
        <select
          className="selection"
          value={searchCategory}
          onChange={handleCategoryChange}
        >
          <option value="department">Department</option>
          <option value="campus">Campus</option>
        </select>

        <label className="lbl">In</label>
        <input
          className="inpt"
          type="text"
          value={searchQuery}
          onChange={handleQueryChange}
          placeholder="Search by department or campus"
        />
        <button className="btn-1" onClick={handleSearch}>
          Search
        </button>
      </div>

      {loading && <p>Loading results...</p>}

      {results.length > 0 && (
        <div className="results">
          <h3>Search Results:</h3>
          <ul className="search-results">
            {results.map((user, index) => (
              <li key={index} className="result-item">
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Department: {user.department}</p>
                <p>Campus: {user.campus}</p>
                <p>Phone: {user.phone}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {results.length === 0 && !loading && searchQuery && (
        <p>No results found for "{searchQuery}"</p>
      )}
    </div>
  );
}
