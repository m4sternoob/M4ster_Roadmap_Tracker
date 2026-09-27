import React from 'react';
import ReactDOM from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <Toaster
      position="bottom-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: 'var(--toast-bg, #1e293b)',
          color: 'var(--toast-color, #f1f5f9)',
          border: '1px solid var(--toast-border, #334155)',
        },
        success: {
          iconTheme: {
            primary: '#22c55e',
            secondary: '#f1f5f9',
          },
        },
        error: {
          iconTheme: {
            primary: '#ef4444',
            secondary: '#f1f5f9',
          },
        },
      }}
    />
  </React.StrictMode>
);