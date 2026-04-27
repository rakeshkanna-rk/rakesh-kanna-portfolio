import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ReactLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ReactLenis root options={{ lerp: 0.05, duration: 2.0, smoothWheel: true }}>
        <App />
      </ReactLenis>
    </BrowserRouter>
  </StrictMode>,
);
