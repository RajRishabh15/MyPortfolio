import { useEffect } from 'react';
import { navigateTo } from '../utils/pageTransition';

/**
 * Intercepts all internal .html link clicks to apply swipe direction tracking,
 * and sets up arrow-key navigation.
 */
export function useNavigation(currentPage, cleanupArrowKeys) {
  useEffect(() => {
    // Global interception of all local .html link clicks
    function handleClick(e) {
      const anchor = e.target.closest('a[href]');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('//')) {
        e.preventDefault();
        navigateTo(href);
      }
    }
    document.addEventListener('click', handleClick, true);

    // Arrow key nav is set up in each page via setupArrowKeyNav, cleanupArrowKeys is passed in
    return () => {
      document.removeEventListener('click', handleClick, true);
      if (cleanupArrowKeys) cleanupArrowKeys();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
