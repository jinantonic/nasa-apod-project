import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { GlobalProvider } from './context/GlobalContext';  // 수정

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>   {/* 수정: 최상위 Provider */}
      <App />
    </GlobalProvider>
  </React.StrictMode>
);

reportWebVitals();
