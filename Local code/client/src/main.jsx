import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import { AppProvider } from './AppContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
