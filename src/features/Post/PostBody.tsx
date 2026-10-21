import { createElement } from 'react';
import { readPostContent } from '@content/index';

type PostBodyProps = {
  slug: string;
};

export function PostBody({ slug }: PostBodyProps) {
  return createElement(readPostContent(slug));
}
