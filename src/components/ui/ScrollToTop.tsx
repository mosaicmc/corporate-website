import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Ensure consistent scroll-to-top on route change across the app
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}