import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const rootElement = document.getElementById('root')

if (rootElement) {
  const isPrerendered = rootElement.hasChildNodes()
  
  const renderApp = () => {
    try {
      if (isPrerendered) {
        hydrateRoot(
          rootElement,
          <StrictMode>
            <App />
          </StrictMode>
        );
      } else {
        createRoot(rootElement).render(
          <StrictMode>
            <App />
          </StrictMode>
        );
      }
      
      if (window.snapSaveState) {
        window.snapSaveState();
      }
    } catch (error) {
      rootElement.innerHTML = '';
      createRoot(rootElement).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
    }
  };
  
  // Defer hydration/rendering to reduce main-thread work and improve LCP
  if (window.requestIdleCallback) {
    requestIdleCallback(renderApp, { timeout: 2000 });
  } else if (window.requestAnimationFrame) {
    requestAnimationFrame(() => {
      setTimeout(renderApp, 100);
    });
  } else {
    setTimeout(renderApp, 100);
  }
}

