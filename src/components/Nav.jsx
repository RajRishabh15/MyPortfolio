import { useState, useEffect } from 'react';

const LINKS = [
  { id: 'home',     href: 'index.html',    label: 'Home'     },
  { id: 'about',    href: 'about.html',    label: 'About'    },
  { id: 'projects', href: 'projects.html', label: 'Projects' },
  { id: 'skills',   href: 'skills.html',   label: 'Skills'   },
  { id: 'contact',  href: 'contact.html',  label: 'Contact'  },
];

/**
 * activePage: 'home' | 'about' | 'projects' | 'skills' | 'contact' | 'education' | 'credentials'
 * educationMode: boolean — shows the back button and education-mode class (used by education + credentials pages)
 * backHref: href to use for the back button when educationMode is true
 */
export default function Nav({ activePage, educationMode = false, backHref = '' }) {
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Close drawer when clicking outside
  useEffect(() => {
    if (!drawerOpen) return;
    function onDocClick(e) {
      if (!e.target.closest('.mobile-nav-drawer') && !e.target.closest('.nav-hamburger')) {
        setDrawerOpen(false);
      }
    }
    document.addEventListener('click', onDocClick, true);
    return () => document.removeEventListener('click', onDocClick, true);
  }, [drawerOpen]);

  function handleBackClick(e) {
    e.preventDefault();
    setDrawerOpen(false);
    if (backHref) window.location.href = backHref;
    else window.history.back();
  }

  return (
    <>
      <nav className={educationMode ? 'education-mode' : ''}>
        <div className="nav-brand" onClick={() => { window.location.href = 'index.html'; setDrawerOpen(false); }}>
          <div className="nav-logo-icon">RR</div>
        </div>

        <ul className="nav-links">
          {LINKS.map(l => (
            <li key={l.id}>
              <a
                href={l.href}
                id={`nav-${l.id}`}
                className={activePage === l.id ? 'active' : ''}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className={`nav-hamburger${drawerOpen ? ' open' : ''}`}
          id="hamburger"
          aria-label="Toggle menu"
          onClick={() => setDrawerOpen(o => !o)}
        >
          <span /><span /><span />
        </button>

        <button
          className="nav-back-btn"
          id="backBtn"
          aria-label="Go back"
          style={educationMode ? { display: 'inline-block' } : undefined}
          onClick={handleBackClick}
        >
          ← Back
        </button>
      </nav>

      {/* Mobile drawer */}
      <div className={`mobile-nav-drawer${drawerOpen ? ' open' : ''}`} id="mobileNav">
        {LINKS.map(l => (
          <a
            key={l.id}
            href={l.href}
            id={`mnav-${l.id}`}
            className={activePage === l.id ? 'active' : ''}
            onClick={() => setDrawerOpen(false)}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
