import type { ReactNode } from 'react';
import { Footer } from '@components/Footer';
import { Header } from '@components/Header';

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="container-fluid">
      <Header />
      <div id="content">
        <div className="col-12 mx-auto">{children}</div>
      </div>
      <Footer />
    </div>
  );
}
