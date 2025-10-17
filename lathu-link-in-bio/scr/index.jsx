import React from 'react';
import { createRoot } from 'react-dom/client';
import LinkInBioApp from './LinkInBioApp.jsx';

// Get the root element from public/index.html
const container = document.getElementById('root');

// Create a root instance for React 18+
const root = createRoot(container);

// Render the main application component inside the root
root.render(
  <React.StrictMode>
    <LinkInBioApp />
  </React.StrictMode>
);
