import React, { useState, useEffect } from 'react';
import Books from './components/Books';
import CreateBook from './components/CreateBook';
import UpdateBook from './components/UpdateBook';
import BackendStatus from './components/BackendStatus';
import MainView from './components/MainView';
import './App.css';

const url = process.env.BACKEND_URL || 'https://backend.bookvault.manish.kr'; // fallback URL

function App() {
  const [view, setView] = useState('list');
  const [books, setBooks] = useState([]);
  const [bookToEdit, setBookToEdit] = useState(null);
  const [backendDeployed, setBackendDeployed] = useState(true); // Track backend availability

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchWithTimeout = (url, options, timeout = 3000) => {
    return Promise.race([
      fetch(url, options),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
      )
    ]);
  };

  const fetchBooks = async () => {
    try {
      const response = await fetchWithTimeout(`${url}/api/books`, { method: 'GET' });
      if (!response.ok) {
        throw new Error('Backend not available');
      }
      const data = await response.json();
      setBooks(data);
      setBackendDeployed(true); // Backend is reachable
    } catch (error) {
      console.error('Error fetching books:', error);
      setBackendDeployed(false); // Backend is not reachable
    }
  };

  const addBook = async (book) => {
    try {
      const response = await fetch(`${url}/api/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book),
      });
      const newBook = await response.json();
      setBooks([...books, newBook]);
      setView('list');
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const updateBook = async (updatedBook) => {
    try {
      const response = await fetch(`${url}/api/books/${updatedBook.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBook),
      });
      const updated = await response.json();
      setBooks(books.map(book => book.id === updated.id ? updated : book));
      setView('list');
      fetchBooks();
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await fetch(`${url}/api/books/${id}`, { method: 'DELETE' });
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div className="App">
      <BackendStatus deployed={backendDeployed} />
      {backendDeployed && (
        <MainView 
          view={view} 
          books={books} 
          setView={setView} 
          setBookToEdit={setBookToEdit} 
          addBook={addBook} 
          updateBook={updateBook} 
          deleteBook={deleteBook}
          bookToEdit={bookToEdit}
        />
      )}
    </div>
  );
}

export default App;
