import React, { useEffect, useState } from 'react';
import { fetchBooks, reserveBook } from '../api';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadBooks = async () => {
    setLoading(true);
    setError(null);
    const { data, error } = await fetchBooks();
    
    if (error) {
      console.error("Error fetching books:", error);
      setError("Could not load book list. Check the console for details.");
    } else {
      setBooks(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleReserve = async (bookId, title) => {
    alert(`Attempting to reserve: ${title}`);
    const { error } = await reserveBook(bookId);
    
    if (error) {
      alert(`Reservation failed for ${title}: ${error.message}`);
    } else {
      alert(`Successfully Reserved: ${title}`);
      loadBooks(); 
    }
  };

  if (loading) return <p>Loading book catalog...</p>;
  if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
  if (books.length === 0) return <p>No books found in the catalog.</p>;

  return (
    <div style={{ marginTop: '30px' }}>
      <h3>Available Library Books </h3>
      <div style={{ border: '1px solid #ddd', padding: '15px' }}>
        {books.map(book => (
          <div 
            key={book.id} 
            style={{ 
              marginBottom: '15px', 
              padding: '10px', 
              borderBottom: '1px solid #eee',
              // CHANGED TO LOWERCASE isavailable
              backgroundColor: book.isavailable ? '#e6ffe6' : '#fff0f0'
            }}
          >
            <strong>{book.title}</strong> by {book.author}
            <br />
            {/* CHANGED TO LOWERCASE isavailable */}
            Status: {book.isavailable ? " AVAILABLE" : " RESERVED"}
            
            {/* CHANGED TO LOWERCASE isavailable */}
            {book.isavailable && (
              <button 
                onClick={() => handleReserve(book.id, book.title)} 
                style={{ marginLeft: '20px', padding: '5px 10px', cursor: 'pointer' }}
              >
                Reserve Now
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;