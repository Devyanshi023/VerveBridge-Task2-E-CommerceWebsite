import { useEffect, useState } from "react";
import axios from "axios";

const useFetchBooks = (query) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) return;

    const fetchBooks = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://openlibrary.org/search.json?q=${query}&limit=30`
        );
        setBooks(response.data.docs);
      } catch (error) {
        setError("Error fetching books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [query]);

  return { books, loading, error };
};

export default useFetchBooks;
