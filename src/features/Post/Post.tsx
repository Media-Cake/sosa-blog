import { Suspense } from 'react';
import { Link, useParams } from 'react-router';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Comments } from '@components/Comments';
import { FeaturedImage } from '@components/FeaturedImage';
import { PageMeta } from '@components/PageMeta';
import { PostNav } from '@components/PostNav';
import { Sidebar } from '@components/Sidebar';
import {
  findCategory,
  findPost,
  findTag,
  posts,
  type PostSummary,
} from '@data/posts';
import { NotFound } from '@features/NotFound';
import { adjacentPosts, formatPostDate, relatedPosts } from '@helpers';
import { PostBody } from './PostBody';
import styles from './Post.module.scss';

const byName = (first: { name: string }, second: { name: string }) =>
  first.name.localeCompare(second.name);

type PostDetailsProps = {
  post: PostSummary;
};

function PostDetails({ post }: PostDetailsProps) {
  const { t, i18n } = useTranslation('common', { keyPrefix: 'post' });
  const categories = post.categories
    .map(findCategory)
    .filter((category) => category !== undefined)
    .sort(byName);
  const tags = post.tags
    .map(findTag)
    .filter((tag) => tag !== undefined)
    .sort(byName);

  return (
    <div className={styles.details}>
      {categories.length > 0 && (
        <div className="d-block">
          <span className={styles.icon} />
          {categories.map((category, index) => (
            <span key={category.slug}>
              {index > 0 && ', '}
              <Link
                to={`/category/${category.path}/`}
                title={t('viewAllIn', { name: category.name })}
              >
                {category.name}
              </Link>
            </span>
          ))}
        </div>
      )}
      {tags.length > 0 && (
        <div className="d-block">
          <span className={styles.icon} />
          {tags.map((tag, index) => (
            <span key={tag.slug}>
              {index > 0 && ', '}
              <Link
                to={`/tag/${tag.slug}/`}
                title={t('viewAllIn', { name: tag.name })}
              >
                {tag.name}
              </Link>
            </span>
          ))}
        </div>
      )}
      <div className="d-block mt-1">
        <span className={styles.icon} />
        <span>{formatPostDate(post.date, i18n.language)}</span>
      </div>
    </div>
  );
}

export function Post() {
  const { slug } = useParams();
  const post = findPost(slug ?? '');

  if (!post) return <NotFound />;

  const { previous, next } = adjacentPosts(post, posts);

  return (
    <div className={classNames(styles.container, 'row')}>
      <PageMeta
        title={post.title}
        description={post.description || post.excerpt}
        path={`/${post.slug}/`}
        image={post.image}
        type="article"
      />
      <div className="col-lg-1 d-none d-lg-block" />
      <div className="col-12 col-md-8 col-lg-7">
        <FeaturedImage title={post.title} image={post.image}>
          <PostDetails post={post} />
        </FeaturedImage>
        <div className={styles.content}>
          <div className="col-12 mx-auto p-3 post-content">
            <Suspense fallback={null}>
              <PostBody slug={post.slug} />
            </Suspense>
          </div>
        </div>
        <PostNav previous={previous} next={next} />
        <Comments identifier={String(post.id)} />
      </div>
      <div className="col-12 col-md-4 col-lg-3">
        <Sidebar relatedPosts={relatedPosts(post, posts)} />
      </div>
      <div className="col-lg-1 d-none d-lg-block" />
    </div>
  );
}
