import React, { useState } from 'react';
// Import the centralized API function
import { loginUser } from '../api';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Event handler for form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Call the API function to perform validation
    const { data, error } = await loginUser(email, password);

    if (error) {
      alert(`Login failed: ${error.message}. Please check credentials.`);
    } else if (data.user) {
      // Login successful, pass user data up to App.js
      alert(`Login successful! Welcome, ${data.user.email}.`);
      onLoginSuccess(data.user);
    } else {
      // Should not happen if data.user is null and error is null, but good for safety
      alert("Login failed. No user data returned.");
    }
    
    setIsLoading(false);
  };

  return (
    <div style={styles.container}>
      <h2>User Login </h2>
      <p style={styles.hint}>Use the test user you created in Supabase.</p>
      
      <form onSubmit={handleLogin} style={styles.form}>
        <input 
          type="email" 
          placeholder="Email (e.g., test@user.com)" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={styles.input}
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={styles.input}
        />
        <button 
          type="submit" 
          disabled={isLoading} 
          style={styles.button}
        >
          {isLoading ? 'Validating...' : 'Validate Login'}
        </button>
      </form>
    </div>
  );
};

// Simple inline styles for cleaner display
const styles = {
  container: {
    padding: '25px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  },
  button: {
    padding: '10px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  hint: {
    fontSize: '0.9em',
    color: '#666',
    marginBottom: '20px'
  }
};

export default Login;