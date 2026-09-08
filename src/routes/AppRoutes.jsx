import { lazy, Suspense } from 'react';
import Home from '../pages/Home/Home';
import ListingSkeleton from '../pages/ProductListing/components/ListingSkeleton';

const ProductListing = lazy(() => import('../pages/ProductListing/ProductListing'));
const ProductDetail = lazy(() => import('../pages/ProductDetail/ProductDetail'));

export default function AppRoutes() {
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/products') return <Suspense fallback={<ListingSkeleton />}><ProductListing /></Suspense>;
  if (path.startsWith('/products/')) return <Suspense fallback={<ListingSkeleton />}><ProductDetail id={path.split('/')[2]} /></Suspense>;
  return <Home />;
}
