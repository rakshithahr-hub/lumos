import React, { useState } from 'react';
import Login from './components/Login';
import BookList from './components/BookList';
import './App.css'; // You can keep this empty or add basic styles

function App() {
  // State to track the logged-in user
  const [user, setUser] = useState(null);

  // Logic to handle logout
  const handleLogout = () => {
    setUser(null);
    alert("Logged out successfully");
  };

  return (
    <div className="App" style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <header style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1>📚 Lumos Library Project</h1>
        <hr />
      </header>

      <main>
        {/* Conditional Rendering: 
          If user is NOT logged in, show CTA 1 (Login).
          If user IS logged in, show CTA 2 (Book Reservation).
        */}
        {!user ? (
          <div style={{ maxWidth: '400px', margin: '0 auto' }}>
            <p style={{ textAlign: 'center', color: '#666' }}>
              Please validate your credentials to access the library.
            </p>
            <Login onLoginSuccess={(userData) => setUser(userData)} />
          </div>
        ) : (
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3>Welcome, {user.email}!</h3>
              <button onClick={handleLogout} style={{ padding: '5px 10px' }}>Logout</button>
            </div>
            
            <BookList />
          </div>
        )}
      </main>

      <footer style={{ marginTop: '50px', textAlign: 'center', fontSize: '12px', color: '#888' }}>
        <p>Functional Completeness Evaluation Project - Individual Submission</p>
      </footer>
    </div>
  );
}

export default App;