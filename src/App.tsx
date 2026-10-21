import { Route, Routes } from 'react-router';
import { Layout } from '@components/Layout';
import { CategoryArchive } from '@features/CategoryArchive';
import { Contact } from '@features/Contact';
import { DateArchive } from '@features/DateArchive';
import { Home } from '@features/Home';
import { NotFound } from '@features/NotFound';
import { SlugRoute } from '@features/SlugRoute';
import { TagArchive } from '@features/TagArchive';
import { routes } from '@routes';

export function App() {
  return (
    <Layout>
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.homePage} element={<Home />} />
        <Route path={routes.category} element={<CategoryArchive />} />
        <Route path={routes.tag} element={<TagArchive />} />
        <Route path={routes.tagPage} element={<TagArchive />} />
        <Route path={routes.contact} element={<Contact />} />
        <Route path={routes.post} element={<SlugRoute />} />
        <Route path={routes.yearPage} element={<DateArchive />} />
        <Route path={routes.month} element={<DateArchive />} />
        <Route path={routes.monthPage} element={<DateArchive />} />
        <Route path={routes.notFound} element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
