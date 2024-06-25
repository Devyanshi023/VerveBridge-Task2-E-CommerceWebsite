// src/hooks/useFetchBooks.js

import { useEffect, useState } from "react";
import axios from "axios";

// Custom hook to fetch books based on the search query
const useFetchBooks = (query) => {
  const [books, setBooks] = useState([]); // State to store the fetched books
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(null); // State to manage error status

  useEffect(() => {
    if (!query) return; // If no query is provided, return early

    const fetchBooks = async () => {
      setLoading(true); // Set loading status to true
      setError(null); // Reset error state
      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${query}&limit=30`
        );
        setBooks(response.data.docs); // Update books state with fetched data
      } catch (error) {
        setError("Error fetching books"); // Set error message if there is an error
      } finally {
        setLoading(false); // Set loading status to false
      }
    };

    fetchBooks();
  }, [query]); // Re-run effect when the query changes

  return { books, loading, error }; // Return the books, loading status, and error
};

export default useFetchBooks;
