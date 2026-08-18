import { useEffect } from 'react';

export default function ScrollProgress() {
  useEffect(() => {
    function onScroll() {
      const el = document.getElementById('scroll-progress');
      if (!el) return;
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height    = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      el.style.width  = (height > 0 ? (winScroll / height) * 100 : 0) + '%';
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return <div id="scroll-progress" />;
}
