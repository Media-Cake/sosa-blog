import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { App } from './App';
import { loadPostContent } from '@content/index';
import { postSlugFromPath } from '@routes';
import 'bootstrap/dist/css/bootstrap-grid.min.css';
import 'bootstrap/dist/css/bootstrap-utilities.min.css';
import '@assets/css/global.scss';
import './i18n';

const slug = postSlugFromPath(window.location.pathname);
const contentReady = slug ? loadPostContent(slug) : Promise.resolve();

contentReady.then(() => {
  const root = document.getElementById('root');
  if (!root) return;

  hydrateRoot(
    root,
    <StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StrictMode>,
  );
});
