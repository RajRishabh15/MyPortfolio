import { useEffect } from 'react';

/**
 * isHome: true  → shows the full loader with progress bar (index.html)
 * isHome: false → shows the simple RR logo loader (other pages)
 *
 * Behaviour mirrors script.js DOMContentLoaded handler:
 *  - First load  : show loader 800 ms, then add 'loaded' to body
 *  - Return load : immediately add 'loaded' to body (inline script in HTML adds
 *                  'skip-loader' to <html> which CSS uses to hide the screen)
 */
export default function LoadingScreen({ isHome = false }) {
  useEffect(() => {
    const isFirst = !sessionStorage.getItem('hasLoadedBefore');
    if (isFirst) {
      sessionStorage.setItem('hasLoadedBefore', '1');
      const t = setTimeout(() => document.body.classList.add('loaded'), 800);
      return () => clearTimeout(t);
    } else {
      document.body.classList.add('loaded');
    }
  }, []);

  return (
    <div id="loading-screen">
      {isHome ? (
        <div className="loading-content">
          <div className="nav-logo-icon loading-logo">RR</div>
          <div className="loading-progress-container">
            <div className="loading-progress-bar" />
          </div>
        </div>
      ) : (
        <div className="nav-logo-icon loading-logo">RR</div>
      )}
    </div>
  );
}
