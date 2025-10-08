import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import "./Search.css";
const API_URL = import.meta.env.VITE_API_URL;

// Memoized ResultsList to prevent re-rendering unless 'results' changes
const ResultsList = React.memo(({ results }) => {
  return (
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
  );
});

export default React.memo(function Search() {
  const [searchCategory, setSearchCategory] = useState("department");
  const [searchQuery, setSearchQuery] = useState("");
  const [inputQuery, setInputQuery] = useState(""); // for controlled input
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch search results
  const fetchSearchResults = useCallback(async () => {
    if (!searchQuery) return;

    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/auth/search`, {
        params: {
          category: searchCategory,
          query: searchQuery,
          page,
          limit: 10,
        },
      });

      setResults(response.data.results);
      setTotalPages(response.data.totalPages);
      setTotalCount(response.data.totalCount);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setLoading(false);
    }
  }, [searchCategory, searchQuery, page]);

  // Trigger fetch when page changes but only if a search was made
  useEffect(() => {
    if (searchQuery) {
      fetchSearchResults();
    }
  }, [page, fetchSearchResults, searchQuery]);

  // Handle "Search" button click
  const handleSearch = () => {
    setSearchQuery(inputQuery);
    setPage(1); // reset page when doing new search
  };

  // Derived state for conditional rendering
  const noResults = useMemo(
    () => !loading && results.length === 0 && searchQuery,
    [loading, results, searchQuery]
  );

  return (
    <div className="container-search">
      <h2 className="header">Are you looking for a user?</h2>

      <div className="search-form">
        <select
          className="selection"
          value={searchCategory}
          onChange={(e) => setSearchCategory(e.target.value)}
        >
          <option value="department">Department</option>
          <option value="campus">Campus</option>
        </select>

        <label className="lbl">In</label>
        <input
          className="inpt"
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder="Search by department or campus"
        />
        <button className="btn-1" onClick={handleSearch} disabled={loading}>
          Search
        </button>
      </div>

      {loading ? (
        <p>Loading results...</p>
      ) : (
        <>
          {results.length > 0 && (
            <div className="results">
              <h3>Search Results: total {totalCount}</h3>
              <ResultsList results={results} />
            </div>
          )}
          {noResults && <p>No results found for "{searchQuery}"</p>}
        </>
      )}

      <div className="pagination">
        {totalCount >= 1 && (
          <>
            <button
              className="serach-btn"
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={loading || page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              className="serach-btn"
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
              disabled={loading || page === totalPages}
            >
              Next
            </button>
          </>
        )}
      </div>
    </div>
  );
});
