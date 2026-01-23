import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo-utils';

export const metadata: Metadata = buildPageMetadata(
  'Our Portfolio - Successful Projects & Case Studies',
  'Explore our portfolio of successful web development projects, cloud migrations, and digital transformation initiatives. See how we help businesses grow with technology.',
  '/portfolio'
);

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
