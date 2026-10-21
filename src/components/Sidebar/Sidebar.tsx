import { useTranslation } from 'react-i18next';
import { PatreonButton } from '@components/PatreonButton';
import { RelatedPosts } from '@components/RelatedPosts';
import { SignupForm } from '@components/SignupForm';
import { SocialIcons } from '@components/SocialIcons';
import type { PostSummary } from '@data/posts';

type SidebarProps = {
  relatedPosts: PostSummary[];
};

export function Sidebar({ relatedPosts }: SidebarProps) {
  const { t } = useTranslation('common', { keyPrefix: 'sidebar' });

  return (
    <div>
      <SignupForm />
      <PatreonButton />
      {relatedPosts.length > 0 && (
        <>
          <RelatedPosts posts={relatedPosts} />
          <br />
          <SocialIcons variant="sidebar" heading={t('followUs')} />
        </>
      )}
    </div>
  );
}
