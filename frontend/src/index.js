import React from 'react';
import ReactDOM from 'react-dom/client';
import AppContent from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GlobalProvider } from './contexts/GlobalContext';

// Wrap entire app with GlobalProvider for shared state management
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <AppContent />
    </GlobalProvider>
  </React.StrictMode>
);

reportWebVitals();
