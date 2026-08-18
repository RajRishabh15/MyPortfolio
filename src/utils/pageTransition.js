// Page order for swipe direction calculation (mirrors script.js)
export const PAGE_ORDER = [
  'index.html',
  'about.html',
  'projects.html',
  'credentials.html',
  'education.html',
  'skills.html',
  'contact.html',
];

export function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

export function navigateTo(targetFile) {
  const currentFile = getCurrentPage();
  const fromIdx = PAGE_ORDER.indexOf(currentFile);
  const toIdx   = PAGE_ORDER.indexOf(targetFile);
  if (fromIdx !== -1 && toIdx !== -1) {
    sessionStorage.setItem('swipeDirection', toIdx > fromIdx ? 'left' : 'right');
  } else {
    sessionStorage.setItem('swipeDirection', 'left');
  }
  window.location.href = targetFile;
}

export function applySwipeAnimation(pageEl) {
  if (!pageEl) return;
  const dir = sessionStorage.getItem('swipeDirection');
  if (dir === 'left')  pageEl.classList.add('swipe-left-anim');
  if (dir === 'right') pageEl.classList.add('swipe-right-anim');
  sessionStorage.removeItem('swipeDirection');
}

export function setupArrowKeyNav(currentPage) {
  const idx = PAGE_ORDER.indexOf(currentPage);
  function handleKeyDown(e) {
    if (e.key === 'ArrowRight' && idx !== -1 && idx < PAGE_ORDER.length - 1) {
      navigateTo(PAGE_ORDER[idx + 1]);
    }
    if (e.key === 'ArrowLeft' && idx !== -1 && idx > 0) {
      navigateTo(PAGE_ORDER[idx - 1]);
    }
  }
  document.addEventListener('keydown', handleKeyDown);
  return () => document.removeEventListener('keydown', handleKeyDown);
}
