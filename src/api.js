import { supabase } from './supabaseClient';

// --- API 1: Login Validation (Triggered by CTA 1 in Login.js) ---
/**
 * Attempts to log a user in using Supabase's built-in Auth service.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {object} An object containing 'data' (user info) or 'error'.
 */
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    
    // Log the result for review purposes (good practice)
    if (error) {
      console.error("API Login Error:", error.message);
    } else {
      console.log("API Login Success:", data.user.email);
    }
    
    return { data, error };
    
  } catch (err) {
    return { data: null, error: { message: "Network or unexpected error during login." } };
  }
};


// --- API 2: Book Reservation Action (Triggered by CTA 2 in BookList.js) ---
/**
 * Updates a book's status in the 'books' table to 'isAvailable: false'.
 * This demonstrates a successful data modification API call.
 * @param {number} bookId - The ID of the book to reserve.
 * @returns {object} An object containing 'data' (updated row) or 'error'.
 */
export const reserveBook = async (bookId) => {
  try {
    const { data, error } = await supabase
      .from('books') // The table you created in Supabase
      .update({ isavailable: false }) // The action: set status to reserved
      .eq('id', bookId) // The WHERE clause: find the book by its ID
      .select(); // Ask for the updated data back

    // Log the result for review purposes (good practice)
    if (error) {
      console.error("API Reserve Error:", error.message);
    } else {
      console.log("API Reserve Success:", data);
    }

    return { data, error };
    
  } catch (err) {
    return { data: null, error: { message: "Network or unexpected error during reservation." } };
  }
};


// --- Optional: Fetching Data (Read Operation) ---
/**
 * Fetches all books from the database to populate the BookList component.
 * @returns {object} An object containing 'data' (list of books) or 'error'.
 */
export const fetchBooks = async () => {
  try {
    const { data, error } = await supabase
      .from('books')
      .select('*'); // Select all columns

    return { data, error };

  } catch (err) {
    return { data: null, error: { message: "Error fetching book list." } };
  }
};