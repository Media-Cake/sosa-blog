import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { App } from './App';
import { loadPostContent } from '@content/index';
import { postSlugFromPath, prerenderPaths } from '@routes';
import './i18n';

export async function render(url: string) {
  const hoistedHead = /^(?:<(?:title|meta|link)\b[^>]*>(?:[^<]*<\/title>)?)*/;
  const slug = postSlugFromPath(url);
  if (slug) await loadPostContent(slug);

  const markup = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  const head = markup.match(hoistedHead)?.[0] ?? '';

  return { head, html: markup.slice(head.length) };
}

export { prerenderPaths };
