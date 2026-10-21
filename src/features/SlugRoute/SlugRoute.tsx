import { useParams } from 'react-router';
import { DateArchive } from '@features/DateArchive';
import { Post } from '@features/Post';
import { isYear } from '@routes';

export function SlugRoute() {
  const { slug } = useParams();

  if (isYear(slug)) return <DateArchive />;

  return <Post />;
}
