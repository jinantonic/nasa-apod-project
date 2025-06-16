import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { FavouritesProvider } from './contexts/FavouritesContext';  // 추가

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <FavouritesProvider>   {/* 추가: 최상위 Provider */}
      <App />
    </FavouritesProvider>
  </React.StrictMode>
);

reportWebVitals();
