/// <reference types="vite/client" />

declare module '*.mdx' {
  import type { MDXContent } from 'mdx/types';
  import type { PostSummary } from '@data/posts';

  export const frontmatter: Omit<PostSummary, 'id'>;
  const Content: MDXContent;
  export default Content;
}
