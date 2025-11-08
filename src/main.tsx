import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
// Load compiled Tailwind utilities
import './index.css';
import './styles/globals.css';
import { Toaster } from './components/ui/sonner';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster />
  </StrictMode>
);
