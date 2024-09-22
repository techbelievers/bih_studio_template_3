import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './globals.css';

// import App from './App';
import AppTemplate from './AppTemplate';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
// Add viewport meta tag dynamically
const metaViewport = document.createElement('meta');
metaViewport.name = "viewport";
metaViewport.content = "width=device-width, initial-scale=1.0";
document.head.appendChild(metaViewport);

root.render(
  <React.StrictMode>
    {/* <App /> */}
    <AppTemplate />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
