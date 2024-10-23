import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import App from './App';
import './App.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Create root
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
