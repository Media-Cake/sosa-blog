import { useTranslation } from 'react-i18next';

type PageMetaProps = {
  title?: string;
  description?: string;
  path: string;
  image?: string;
  type?: 'website' | 'article';
};

export function PageMeta({
  title,
  description,
  path,
  image,
  type = 'website',
}: PageMetaProps) {
  const { t } = useTranslation('common', { keyPrefix: 'site' });

  const siteUrl = 'https://blog.sosa.net';
  const defaultImage = '/wp-content/uploads/2017/12/SoSaFullBannerFullFace.jpg';
  const fullTitle = title ? t('titleTemplate', { title }) : t('title');
  const metaDescription = description || t('description');
  const canonical = `${siteUrl}${path}`;
  const ogImage = `${siteUrl}${image ?? defaultImage}`;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={t('name')} />
      <meta property="og:image" content={ogImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ChatPlayShare" />
    </>
  );
}
