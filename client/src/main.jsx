import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Intercept fetch calls to prefix the Vercel API URL if available
const originalFetch = window.fetch;
window.fetch = (input, init) => {
  if (typeof input === 'string' && input.startsWith('/api/')) {
    const apiBase = import.meta.env.VITE_API_URL || '';
    const targetUrl = apiBase.endsWith('/') && input.startsWith('/')
      ? `${apiBase}${input.slice(1)}`
      : `${apiBase}${input}`;
    
    // Auto-inject credentials: 'include' to pass cookies in cross-origin requests
    const newInit = { ...init };
    newInit.credentials = 'include';
    
    return originalFetch(targetUrl, newInit);
  }
  return originalFetch(input, init);
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
