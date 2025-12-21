import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Hide initial loader once React is ready
const hideInitialLoader = () => {
  const loader = document.getElementById('initial-loader');
  if (loader) {
    loader.classList.add('hidden');
    // Remove from DOM after transition completes
    setTimeout(() => {
      if (loader.parentNode) {
        loader.parentNode.removeChild(loader);
      }
    }, 300);
  }
};

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
      
      // Hide loader after React app is rendered
      hideInitialLoader();
    } catch (error) {
      rootElement.innerHTML = '';
      createRoot(rootElement).render(
        <StrictMode>
          <App />
        </StrictMode>
      );
      // Hide loader even on error
      hideInitialLoader();
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

