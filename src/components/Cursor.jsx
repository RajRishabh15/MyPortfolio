import { useEffect, useRef } from 'react';

// Custom cursor + trailing ring (ported from script.js)
export default function Cursor() {
  const cursorRef = useRef(null);
  const ringRef   = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring   = ringRef.current;
    if (!cursor || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0, animId;

    const onMouseMove = (e) => {
      mx = e.clientX; my = e.clientY;
      cursor.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;

      // Hover detection via elementFromPoint for dynamic React content
      const el = document.elementFromPoint(mx, my);
      const isHover = !!el?.closest('a, button, [onclick], .project-card, .tool-pill, .tag, .nav-brand, .btn-primary, .btn-outline, .btn-abt, .contact-link');
      const isText  = !!el?.closest('.form-input, .form-textarea');
      cursor.classList.toggle('cursor--hover', isHover);
      ring.classList.toggle('cursor--hover', isHover);
      cursor.classList.toggle('cursor--text', isText);
      ring.classList.toggle('cursor--text', isText);
    };

    function animRing() {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
      animId = requestAnimationFrame(animRing);
    }
    animRing();

    const onLeave  = () => { cursor.style.opacity = '0'; ring.style.opacity = '0'; };
    const onEnter  = () => { cursor.style.opacity = '1'; ring.style.opacity = '1'; };
    const onDown   = () => { const r = cursor.querySelector('.cursor-r'); if (r) r.style.transform = 'scale(0.75)'; };
    const onUp     = () => { const r = cursor.querySelector('.cursor-r'); if (r) r.style.transform = ''; };

    document.addEventListener('mousemove',  onMouseMove);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    return () => {
      cancelAnimationFrame(animId);
      document.removeEventListener('mousemove',  onMouseMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" ref={cursorRef}>
        <div className="cursor-r">R</div>
      </div>
      <div className="cursor-ring" id="cursorRing" ref={ringRef}>
        <div className="cursor-ring-inner" />
      </div>
    </>
  );
}
