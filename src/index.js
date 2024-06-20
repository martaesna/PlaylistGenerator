import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter  as Router } from 'react-router-dom';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
  <Router basename="/PlaylistGenerator">
    <App />
  </Router>
);