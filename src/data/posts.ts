import postsJson from './posts.json';
import taxonomyJson from './taxonomy.json';

export type PostSummary = {
  id: number;
  title: string;
  slug: string;
  date: string;
  modified: string;
  author: string;
  image?: string;
  thumbnail?: string;
  categories: string[];
  tags: string[];
  description: string;
  excerpt: string;
};

export type Category = {
  slug: string;
  name: string;
  path: string;
  parent: string | null;
};

export type Tag = {
  slug: string;
  name: string;
};

export type Author = {
  slug: string;
  name: string;
  url: string;
};

const byDateDescending = (first: PostSummary, second: PostSummary) =>
  second.date.localeCompare(first.date);

export const posts: PostSummary[] = [...(postsJson as PostSummary[])].sort(
  byDateDescending,
);

export const categories: Category[] = taxonomyJson.categories;
export const tags: Tag[] = taxonomyJson.tags;
export const authors: Author[] = taxonomyJson.authors;

export const findPost = (slug: string) =>
  posts.find((post) => post.slug === slug);

export const findCategoryByPath = (path: string) =>
  categories.find((category) => category.path === path);

export const findCategory = (slug: string) =>
  categories.find((category) => category.slug === slug);

export const findTag = (slug: string) => tags.find((tag) => tag.slug === slug);

export const findAuthor = (slug: string) =>
  authors.find((author) => author.slug === slug);
