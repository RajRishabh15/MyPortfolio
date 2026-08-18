import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import Background from '../../components/Background';
import Cursor from '../../components/Cursor';
import Nav from '../../components/Nav';
import LoadingScreen from '../../components/LoadingScreen';
import ScrollProgress from '../../components/ScrollProgress';
import RBot from '../../components/RBot';
import { projectsData, projectOrder, categoryNames } from '../../data/projects';
import { applySwipeAnimation, setupArrowKeyNav } from '../../utils/pageTransition';
import { useNavigation } from '../../hooks/useNavigation';

// ── Project Modal ──────────────────────────────────────────────────────────────
function ProjectModal({ projectId, onClose }) {
  const [visible, setVisible] = useState(false);
  const [open, setOpen]       = useState(false);

  useEffect(() => {
    if (!projectId) return;
    setVisible(true);
    document.body.classList.add('modal-active');
    // Two rAF to trigger CSS transition after display change
    requestAnimationFrame(() => requestAnimationFrame(() => setOpen(true)));
  }, [projectId]);

  function close() {
    setOpen(false);
    document.body.classList.remove('modal-active');
    setTimeout(() => { setVisible(false); onClose(); }, 320);
  }

  if (!visible || !projectId) return null;
  const data = projectsData[projectId];
  if (!data) return null;

  const liveBtnClass = (data.upcoming || data.liveComingSoon)
    ? 'px-6 py-3 bg-white/5 border border-white/10 text-white/40 rounded-full text-sm font-semibold pointer-events-none flex items-center gap-2'
    : 'px-6 py-3 bg-lavender text-deep rounded-full text-sm font-semibold hover:bg-rose transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(201,184,240,0.3)] hover:scale-105';

  const githubBtnClass = (data.upcoming)
    ? 'px-6 py-3 border border-white/10 text-white/40 rounded-full text-sm pointer-events-none flex items-center gap-2'
    : 'px-6 py-3 border border-lavender/30 rounded-full text-sm text-textPrimary hover:border-lavender hover:bg-lavender/10 transition-all flex items-center gap-2 hover:scale-105';

  return (
    <div id="project-modal" className={`fixed inset-0 z-[999999] items-center justify-center p-4 sm:p-6 flex${open ? ' open' : ''}`}>
      <div className="absolute inset-0 project-modal-backdrop" onClick={close} />
      <div
        className="relative w-full max-w-4xl bg-mid/30 backdrop-blur-[16px] border border-white/20 border-t-white/30 border-l-white/30 rounded-3xl shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_0_32px_rgba(255,255,255,0.05)] overflow-hidden flex flex-col md:flex-row h-auto max-h-[90vh]"
        id="project-modal-content"
      >
        <button
          onClick={close}
          className="absolute top-4 right-4 text-white/70 hover:text-white bg-deep/40 hover:bg-deep/60 rounded-full w-10 h-10 flex items-center justify-center transition-all z-10 text-2xl border border-white/20 backdrop-blur-md"
        >
          &times;
        </button>

        {/* Image */}
        <div className="w-full md:w-1/2 bg-deep/20 min-h-[250px] shrink-0 relative flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-white/10">
          <div className="w-full h-full rounded-xl overflow-hidden border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative group">
            <img
              src={data.img}
              alt={data.title}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          </div>
        </div>

        {/* Content */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 flex flex-col md:justify-center overflow-y-auto flex-1 min-h-0">
          <div className="inline-block px-3 py-1 bg-lavender/10 text-lavender text-xs uppercase tracking-widest rounded-lg w-max mb-4">
            {data.upcoming ? `${data.tag} (Upcoming)` : data.tag}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl text-textPrimary mb-4 leading-tight italic">
            {data.title}
          </h2>
          <p className="text-muted text-sm sm:text-base leading-relaxed mb-8">{data.desc}</p>

          <div className="mb-8">
            <h4 className="text-[10px] uppercase tracking-widest text-rose mb-3">Tech Stack</h4>
            <div className="flex flex-wrap gap-2">
              {data.stack.map(tech => (
                <span key={tech} className="px-3 py-1 bg-sky/10 border border-sky/20 rounded-lg text-[11px] text-sky tracking-wider">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-auto pt-4 border-t border-lavender/10">
            <a href={data.upcoming || data.liveComingSoon ? '#' : data.live} target="_blank" rel="noopener noreferrer" className={liveBtnClass}>
              <span>{data.upcoming || data.liveComingSoon ? 'Coming Soon' : 'Visit Live Site'}</span>
              {!data.upcoming && !data.liveComingSoon && '↗'}
              {(data.upcoming || data.liveComingSoon) && '✦'}
            </a>
            <a href={data.upcoming ? '#' : data.github} target="_blank" rel="noopener noreferrer" className={githubBtnClass}>
              <span>{data.upcoming ? 'Coming Soon' : 'GitHub Repo'}</span>
              <span className="text-lg">⌘</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Projects Page ──────────────────────────────────────────────────────────────
function ProjectsPage() {
  const [category,         setCategory]         = useState('all');
  const [folderOpened,     setFolderOpened]     = useState(() => window.innerWidth < 768);
  const [showGrid,         setShowGrid]         = useState(() => window.innerWidth < 768);
  const [modalId,          setModalId]          = useState(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [mfVisible,        setMfVisible]        = useState(false);
  const [mfOpen,           setMfOpen]           = useState(false);
  const gridRef = useRef(null);

  const arrowCleanup = setupArrowKeyNav('projects.html');
  useNavigation('projects.html', arrowCleanup);

  useEffect(() => {
    applySwipeAnimation(document.getElementById('projects'));

    // Listen for folder-opened from folder.js custom element
    const onFolderOpened = () => {
      setFolderOpened(true);
      setShowGrid(true);
    };
    document.addEventListener('folder-opened', onFolderOpened);

    const onResize = () => { if (window.innerWidth < 768) { setFolderOpened(true); setShowGrid(true); } };
    window.addEventListener('resize', onResize);

    return () => {
      document.removeEventListener('folder-opened', onFolderOpened);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Stagger animation when grid first appears
  useEffect(() => {
    if (!showGrid || !gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card');
    const timeouts = [];
    cards.forEach((card, i) => {
      card.style.opacity   = '0';
      card.style.transform = 'translateY(20px) scale(0.95)';
      const t1 = setTimeout(() => {
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity    = '1';
        card.style.transform  = 'translateY(0) scale(1)';
        const t2 = setTimeout(() => { card.style.transform = ''; card.style.transition = ''; }, 500);
        timeouts.push(t2);
      }, i * 100);
      timeouts.push(t1);
    });
    return () => timeouts.forEach(clearTimeout);
  }, [showGrid]);

  function handleFilter(cat) {
    setCategory(cat);
    if (cat === 'all' && !folderOpened && window.innerWidth >= 768) {
      setShowGrid(false);
    } else {
      setFolderOpened(true);
      setShowGrid(true);
    }
    closeMobileFilter();
  }

  function openMobileFilter() {
    setMfVisible(true);
    document.body.classList.add('modal-active');
    requestAnimationFrame(() => requestAnimationFrame(() => setMfOpen(true)));
  }
  function closeMobileFilter() {
    setMfOpen(false);
    document.body.classList.remove('modal-active');
    setTimeout(() => setMfVisible(false), 300);
  }

  // Filtered projects
  const filteredIds = projectOrder.filter(id => {
    const p = projectsData[id];
    return category === 'all' || p.category.split(' ').includes(category);
  });

  // Category counts
  const counts = {};
  projectOrder.forEach(id => {
    const cats = projectsData[id].category.split(' ');
    cats.forEach(c => { counts[c] = (counts[c] || 0) + 1; });
  });
  counts.all = projectOrder.length;

  const showFolder = !folderOpened && category === 'all' && window.innerWidth >= 768;

  // Card number by display position
  const cardNumber = (id) => (projectOrder.indexOf(id) + 1).toString().padStart(2, '0');

  return (
    <>
      <ScrollProgress />
      <LoadingScreen />
      <Cursor />
      <Background />
      <Nav activePage="projects" />

      {/* ===== PROJECTS ===== */}
      <div className="section-page active" id="projects">
        <div className="section-header">
          <p className="section-eyebrow">What I&apos;ve built</p>
          <h2 className="section-title">Selected <em>Projects</em></h2>
        </div>

        {/* Desktop filter buttons */}
        <div className="project-filters">
          {Object.keys(categoryNames).map(cat => (
            <button
              key={cat}
              className={`filter-btn${category === cat ? ' active' : ''}`}
              data-category={cat}
              onClick={() => handleFilter(cat)}
            >
              {categoryNames[cat]} <span className="count">({counts[cat] || 0})</span>
            </button>
          ))}
        </div>

        {/* Mobile filter trigger */}
        <div className="mobile-filter-container">
          <button id="mobile-filter-trigger" className="mobile-filter-trigger-btn" onClick={openMobileFilter}>
            <span className="flex items-center gap-2">
              <span className="filter-icon">✦</span>
              <span className="trigger-label">Filter: {categoryNames[category] || category}</span>
            </span>
            <span className="chevron">▼</span>
          </button>
        </div>

        {/* Animated Folder (only on desktop before opening) */}
        {showFolder && (
          <div
            id="projects-folder-container"
            className="w-full flex justify-center items-center my-16 md:my-24 transition-all duration-700 ease-in-out"
            style={{ height: 350 }}
          >
            {/* animated-folder is a custom element defined by /folder.js (loaded in HTML) */}
            <animated-folder id="main-projects-folder" size="3.5" color="#c9b8f0" />
          </div>
        )}

        {/* Projects Grid */}
        {showGrid && (
          <div className="projects-grid" ref={gridRef}>
            {filteredIds.map(id => {
              const p = projectsData[id];
              const isUpcoming = !!p.upcoming;
              return (
                <div
                  key={id}
                  className="project-card transition-all hover:scale-[1.02]"
                  data-category={p.category}
                  onClick={() => setModalId(id)}
                >
                  <div className={`project-image-wrapper${isUpcoming ? ' relative' : ''}`}>
                    <img
                      src={p.img}
                      alt={p.title}
                      className={`project-card-image${isUpcoming ? ' filter blur-[2px] brightness-50' : ''}`}
                    />
                    {isUpcoming && (
                      <div className="absolute inset-0 flex items-center justify-center bg-deep/40">
                        <span className="text-rose text-xs font-semibold tracking-widest uppercase px-3 py-1.5 bg-rose/10 border border-rose/30 rounded-full backdrop-blur-md">
                          Upcoming
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="project-arrow">{isUpcoming ? '✦' : '↗'}</div>
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2">
                      {p.tag.split(' | ').map(t => (
                        <span key={t} className="project-tag" style={{ marginBottom: 0 }}>{t}</span>
                      ))}
                    </div>
                    <span className="text-xs font-serif italic text-lavender/30">{cardNumber(id)}</span>
                  </div>
                  <h3 className="project-title">{p.title}</h3>
                  {isUpcoming ? (
                    <div className="mt-4 py-8 w-full flex flex-col items-center justify-center bg-rose/5 border border-rose/20 rounded-2xl transition-all duration-300 hover:bg-rose/10 hover:border-rose/30">
                      <span className="text-rose text-sm font-semibold tracking-widest uppercase mb-1">Coming Soon</span>
                      <span className="text-[10px] text-rose/60 tracking-wider">Stay tuned for details ✦</span>
                    </div>
                  ) : (
                    <p className="project-desc">{p.desc.slice(0, 120)}…</p>
                  )}
                  <div className="project-stack">
                    {p.stack.map(t => <span key={t} className="stack-chip">{t}</span>)}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty state */}
        {showGrid && filteredIds.length === 0 && (
          <div className="projects-empty-state">
            <div className="empty-state-icon">✦</div>
            <h3 className="empty-state-title">No projects here yet</h3>
            <p className="empty-state-desc">This category is currently empty. More projects coming soon! ✦</p>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 40 }}>
          <button className="btn-primary" onClick={() => window.location.href = 'credentials.html'}>
            View Earned Credentials →
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '30px 0 30px' }}>
          <span className="btn-abt" onClick={() => window.open('https://github.com/RajRishabh15', '_blank')}>
            More projects on GitHub ↗
          </span>
        </div>
        <div className="copyright">&copy; 2026 Rishabh Raj.<br />All rights reserved.</div>
      </div>

      {/* Project Modal */}
      <ProjectModal projectId={modalId} onClose={() => setModalId(null)} />

      {/* Mobile Filter Drawer */}
      {mfVisible && (
        <div className={`fixed inset-0 z-[999999] flex items-end justify-center${mfOpen ? ' open' : ''}`} id="mobile-filter-drawer">
          <div className="absolute inset-0 mobile-filter-backdrop" onClick={closeMobileFilter} />
          <div
            id="mobile-filter-content"
            className="relative w-full bg-mid/95 backdrop-blur-[16px] border-t border-white/10 rounded-t-[32px] shadow-[0_-8px_32px_rgba(0,0,0,0.5)] flex flex-col max-h-[75vh] p-6 pb-10 z-10"
          >
            <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-6" />
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl text-textPrimary italic">Filter Projects</h3>
              <button className="mobile-filter-close-btn" onClick={closeMobileFilter}>&times;</button>
            </div>
            <div className="overflow-y-auto flex flex-col gap-3">
              {Object.entries(categoryNames).map(([cat, label]) => (
                <button
                  key={cat}
                  className={`mobile-filter-opt${category === cat ? ' active' : ''}`}
                  data-category={cat}
                  onClick={() => handleFilter(cat)}
                >
                  <span className="opt-text">{label}</span>
                  <span className="opt-count">{counts[cat] || 0}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <RBot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><ProjectsPage /></React.StrictMode>
);
