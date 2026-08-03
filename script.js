// ===== PROJECT MODAL LOGIC =====
const projectsData = {
  'french-tech': {
    title: 'France & Technology',
    tag: 'Full Stack',
    category: 'fullstack',
    desc: 'Innovative France is a high-end digital hub designed to celebrate the engineering marvels that define the French spirit of discovery. From the wide-body twin-engine logic of Airbus and the record-breaking speed of the TGV, to the tactical air superiority of the Dassault Rafale and the galactic reach of Arianespace.',
    stack: ['React', 'Node.js', 'Tailwind', 'Vite'],
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop',
    live: 'https://french-tech.vercel.app',
    github: 'https://github.com/OpticRish/French_Tech'
  },
  'chandrayaan3': {
    title: 'Chandrayaan Mission Web',
    tag: 'Space Tech',
    category: 'webdev',
    desc: 'A dedicated website providing comprehensive insights into ISRO\'s Chandrayaan-3 lunar mission. Includes detailed information on launch timeline, objectives, spacecraft design, landing sequence, and scientific achievements. Built to educate and inspire space enthusiasts and curious minds.',
    stack: ['HTML', 'Javascript', 'Tailwind CSS'],
    img: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2000&auto=format&fit=crop',
    live: 'https://chandrayaan3-five.vercel.app',
    github: 'https://github.com/OpticRish/Chandrayaan3'
  },
  'todo-cli': {
    title: 'To-Do List App',
    tag: 'CLI Tool',
    category: 'cli',
    desc: 'A simple, yet powerful command-line To-Do List app built completely with core Python. It requires no external libraries and works directly in your terminal, making it incredibly fast and lightweight for developers who prefer living in the console.',
    stack: ['Python', 'CLI', 'Terminal'],
    img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2000&auto=format&fit=crop',
    live: 'https://github.com/OpticRish/To-Do-List-CLI-',
    github: 'https://github.com/OpticRish/To-Do-List-CLI-'
  },
  'subscription-manager': {
    title: 'Subscription Manager',
    tag: 'Full Stack',
    category: 'fullstack',
    desc: 'An upcoming subscription management tool that aggregates and tracks all your active subscriptions in one place by detecting them via your phone number and email address, allowing you to review, manage, and optimize recurring payments effortlessly.',
    stack: ['React', 'Node.js', 'MongoDB', 'Express'],
    img: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=80&w=2070&auto=format&fit=crop',
    live: '#',
    github: '#',
    upcoming: true
  },
  'tech-event': {
    title: 'Tech Event Web',
    tag: 'Frontend',
    category: 'fullstack',
    desc: 'A clean and responsive promotional website for a technology event. Designed to showcase schedules, speakers, and ticketing information with a modern aesthetic.',
    stack: ['HTML', 'CSS', 'JavaScript'],
    img: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=2000&auto=format&fit=crop',
    live: 'https://tech-event-web.vercel.app',
    github: 'https://github.com/OpticRish/Tech-Event-Web'
  },
  'techfest3d': {
    title: 'TechFest 3D | Hyper-Space Nexus',
    tag: 'Full Stack | Web Dev',
    category: 'fullstack webdev',
    desc: 'An interactive, futuristic 3D website built using Three.js and GSAP (GreenSock). The concept revolves around a "Hyper-Space Nexus"—a digital corridor filled with floating crystalline polyhedrons, neon energy paths, and interactive digital dust.',
    stack: ['Three.js', 'GSAP', 'HTML', 'CSS'],
    img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2020&auto=format&fit=crop',
    live: '#',
    github: 'https://github.com/OpticRish/TechFest3D',
    liveComingSoon: true
  },
  'rishfolio': {
    title: 'RishFolio (AI Portfolio)',
    tag: 'Full Stack | AI',
    category: 'fullstack ai',
    desc: 'A meticulously crafted digital portfolio designed to reflect my personal brand and creative vision. It features a sleek dark mode aesthetic, smooth micro-animations, and a highly interactive UI to present my projects and skills beautifully. The site serves as a complete digital identity, offering visitors a dynamic and premium browsing experience.',
    stack: ['HTML', 'Gemini API', 'TailWindCSS', 'JavaScript', 'Node', 'Pyhton'],
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
    live: 'https://rishfolio15.vercel.app',
    github: 'https://github.com/OpticRish/RishFolio'
  }
};

function openProjectModal(projectId) {
  const data = projectsData[projectId];
  if (!data) return;

  document.getElementById('modal-title').textContent = data.title;
  document.getElementById('modal-tag').textContent = data.upcoming ? data.tag + ' (Upcoming)' : data.tag;
  document.getElementById('modal-desc').textContent = data.desc;
  document.getElementById('modal-img').src = data.img;

  const liveLink = document.getElementById('modal-live-link');
  const githubLink = document.getElementById('modal-github');

  if (data.upcoming) {
    liveLink.href = '#';
    liveLink.innerHTML = '<span>Coming Soon</span> ✦';
    liveLink.className = 'px-6 py-3 bg-white/5 border border-white/10 text-white/40 rounded-full text-sm font-semibold pointer-events-none flex items-center gap-2';

    githubLink.href = '#';
    githubLink.innerHTML = '<span>Coming Soon</span> <span class="text-lg">⌘</span>';
    githubLink.className = 'px-6 py-3 border border-white/10 text-white/40 rounded-full text-sm pointer-events-none flex items-center gap-2';
  } else {
    if (data.liveComingSoon) {
      liveLink.href = '#';
      liveLink.innerHTML = '<span>Coming Soon</span> ✦';
      liveLink.className = 'px-6 py-3 bg-white/5 border border-white/10 text-white/40 rounded-full text-sm font-semibold pointer-events-none flex items-center gap-2';
    } else {
      liveLink.href = data.live;
      liveLink.innerHTML = '<span>Visit Live Site</span> ↗';
      liveLink.className = 'px-6 py-3 bg-lavender text-deep rounded-full text-sm font-semibold hover:bg-rose transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(201,184,240,0.3)] hover:scale-105';
    }

    githubLink.href = data.github;
    githubLink.innerHTML = '<span>GitHub Repo</span> <span class="text-lg">⌘</span>';
    githubLink.className = 'px-6 py-3 border border-lavender/30 rounded-full text-sm text-textPrimary hover:border-lavender hover:bg-lavender/10 transition-all flex items-center gap-2 hover:scale-105';
  }

  const stackContainer = document.getElementById('modal-stack');
  stackContainer.innerHTML = '';
  data.stack.forEach(tech => {
    const span = document.createElement('span');
    span.className = 'px-3 py-1 bg-sky/10 border border-sky/20 rounded-lg text-[11px] text-sky tracking-wider';
    span.textContent = tech;
    stackContainer.appendChild(span);
  });

  const modal = document.getElementById('project-modal');

  modal.classList.remove('hidden');
  document.body.classList.add('modal-active');
  void modal.offsetWidth; // Force layout
  modal.classList.add('open');
}

function closeProjectModal() {
  const modal = document.getElementById('project-modal');

  modal.classList.remove('open');
  document.body.classList.remove('modal-active');

  setTimeout(() => {
    if (!modal.classList.contains('open')) {
      modal.classList.add('hidden');
    }
  }, 320);
}

const categoryNames = {
  all: 'All Projects',
  fullstack: 'Full Stack',
  webdev: 'Web Dev',
  ai: 'AI Projects',
  game: 'Game Projects',
  cli: 'CLI Projects'
};

let isProjectsFolderOpen = false;

function initProjectsMobile() {
  if (window.innerWidth < 768) {
    const folderContainer = document.getElementById('projects-folder-container');
    const grid = document.querySelector('.projects-grid');
    if (folderContainer && grid) {
      isProjectsFolderOpen = true;
      folderContainer.style.display = 'none';
      grid.style.display = 'grid';
      const cards = document.querySelectorAll('.projects-grid .project-card');
      cards.forEach(card => {
        card.style.display = 'block';
        card.style.opacity = '1';
        card.style.transform = 'none';
      });
    }
  }
}
window.addEventListener('DOMContentLoaded', initProjectsMobile);
initProjectsMobile();

window.addEventListener('resize', () => {
  if (window.innerWidth < 768) {
    initProjectsMobile();
  }
});

document.addEventListener('folder-opened', () => {
  isProjectsFolderOpen = true;
  const folderContainer = document.getElementById('projects-folder-container');
  const grid = document.querySelector('.projects-grid');
  
  // Fade out folder
  folderContainer.style.opacity = '0';
  folderContainer.style.pointerEvents = 'none';
  
  setTimeout(() => {
    folderContainer.style.display = 'none';
    
    // Show grid
    grid.style.display = 'grid';
    // Small reflow
    void grid.offsetHeight;
    
    // Animate cards in
    const cards = document.querySelectorAll('.projects-grid .project-card');
    cards.forEach((card, index) => {
      card.style.display = 'block';
      card.classList.remove('fade-out');
      // Stagger animation
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px) scale(0.95)';
      
      setTimeout(() => {
        card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0) scale(1)';
        card.classList.add('fade-in');
        
        // Reset inline styles after transition to let hover classes work
        setTimeout(() => {
          card.style.transform = '';
          card.style.transition = '';
        }, 500);
      }, index * 100);
    });
  }, 500);
});

function filterProjects(category) {
  // Update active class on desktop filter buttons
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('onclick').includes(`'${category}'`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Update active class on mobile filter options
  const mobileOpts = document.querySelectorAll('.mobile-filter-opt');
  mobileOpts.forEach(opt => {
    if (opt.getAttribute('data-category') === category) {
      opt.classList.add('active');
    } else {
      opt.classList.remove('active');
    }
  });

  // Update trigger button label
  const labelEl = document.querySelector('#mobile-filter-trigger .trigger-label');
  if (labelEl) {
    labelEl.textContent = `Filter: ${categoryNames[category] || category}`;
  }

  const folderContainer = document.getElementById('projects-folder-container');
  const grid = document.querySelector('.projects-grid');
  const cards = document.querySelectorAll('.projects-grid .project-card');
  const emptyState = document.getElementById('projects-empty-state');
  const isMobile = window.innerWidth < 768;
  
  if (category === 'all' && !isProjectsFolderOpen && !isMobile) {
    // Show folder, hide grid
    if (folderContainer) {
      folderContainer.style.display = 'flex';
      void folderContainer.offsetHeight; // reflow
      folderContainer.style.opacity = '1';
      folderContainer.style.pointerEvents = 'auto';
      
      // Ensure folder component is in closed state
      const folderEl = document.getElementById('main-projects-folder');
      if (folderEl && folderEl.open) {
        folderEl.querySelector('.folder-group').click();
      }
    }
    if (grid) grid.style.display = 'none';
    if (emptyState) emptyState.style.display = 'none';
    return;
  } else if (category !== 'all') {
    // Reset folder state when navigating away from 'all'
    isProjectsFolderOpen = false;
  }

  // If we reach here, we are showing the grid (either filtered, or 'all' is already opened)
  if (folderContainer) {
    folderContainer.style.display = 'none';
  }
  if (grid) {
    grid.style.display = 'grid';
  }

  let visibleCount = 0;

  // Cancel any ongoing filter timeouts to avoid glitchy transitions
  if (window.filterTimeouts) {
    window.filterTimeouts.forEach(t => clearTimeout(t));
    window.filterTimeouts = [];
  } else {
    window.filterTimeouts = [];
  }

  // Handle projects transition
  cards.forEach(card => {
    const cardCategory = card.getAttribute('data-category');
    const matches = (category === 'all' || (cardCategory && cardCategory.split(' ').includes(category)));

    if (matches) {
      visibleCount++;
      // Show card immediately if it was display: none
      if (card.style.display === 'none') {
        card.style.display = 'block';
        // Force reflow
        void card.offsetHeight;
      }
      card.classList.remove('fade-out');
      card.classList.add('fade-in');
    } else {
      card.classList.remove('fade-in');
      card.classList.add('fade-out');
      card.style.display = 'none';
    }
  });

  // Toggle empty state placeholder without transition lag
  if (visibleCount === 0) {
    emptyState.classList.remove('hidden');
    emptyState.style.display = 'flex';
    void emptyState.offsetHeight;
    emptyState.style.opacity = '1';
  } else {
    emptyState.classList.add('hidden');
    emptyState.style.display = 'none';
    emptyState.style.opacity = '0';
  }
}

// Initialize Project Counts on filters
function updateFilterCounts() {
  const cards = document.querySelectorAll('.projects-grid .project-card');
  const counts = {
    all: cards.length,
    fullstack: 0,
    webdev: 0,
    ai: 0,
    game: 0,
    cli: 0
  };

  cards.forEach(card => {
    const cats = card.getAttribute('data-category');
    if (cats) {
      cats.split(' ').forEach(cat => {
        if (cat in counts) {
          counts[cat]++;
        }
      });
    }
  });

  // Update counts in mobile drawer option elements and desktop buttons
  for (const [cat, count] of Object.entries(counts)) {
    const optCountEl = document.querySelector(`.mobile-filter-opt[data-category="${cat}"] .opt-count`);
    if (optCountEl) {
      optCountEl.textContent = count;
    }
    const btnCountEl = document.querySelector(`.filter-btn[data-category="${cat}"] .count`);
    if (btnCountEl) {
      btnCountEl.textContent = `(${count})`;
    }
  }
}

// Mobile Filter Open/Close Functions
function openMobileFilter() {
  const drawer = document.getElementById('mobile-filter-drawer');
  const content = document.getElementById('mobile-filter-content');

  // Update counts before opening
  updateFilterCounts();

  drawer.classList.remove('hidden');
  document.body.classList.add('modal-active'); // prevents body scroll

  // Rotate chevron in trigger
  const chevron = document.querySelector('#mobile-filter-trigger .chevron');
  if (chevron) chevron.style.transform = 'translateY(-1px) rotate(180deg)';

  // Force reflow
  void drawer.offsetWidth;

  drawer.classList.add('open');
}

// Close Mobile Filter
function closeMobileFilter() {
  const drawer = document.getElementById('mobile-filter-drawer');

  // Rotate chevron back
  const chevron = document.querySelector('#mobile-filter-trigger .chevron');
  if (chevron) chevron.style.transform = 'translateY(0) rotate(0deg)';

  drawer.classList.remove('open');
  document.body.classList.remove('modal-active');

  setTimeout(() => {
    if (!drawer.classList.contains('open')) {
      drawer.classList.add('hidden');
    }
  }, 300);
}

// When a mobile filter option is tapped
function selectMobileFilter(category) {
  filterProjects(category);
  closeMobileFilter();
}



const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
});

function animRing() {
  rx += (mx - rx) * 0.15;
  ry += (my - ry) * 0.15;
  ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
  requestAnimationFrame(animRing);
}
animRing();

const hoverTargets = 'a, button, [onclick], .project-card, .tool-pill, .tag, .nav-brand, .btn-primary, .btn-outline, .btn-abt, .contact-link';
document.querySelectorAll(hoverTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor--hover');
    ring.classList.add('cursor--hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--hover');
    ring.classList.remove('cursor--hover');
  });
});

const textTargets = '.form-input, .form-textarea';
document.querySelectorAll(textTargets).forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.classList.add('cursor--text');
    ring.classList.add('cursor--text');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('cursor--text');
    ring.classList.remove('cursor--text');
  });
});

document.addEventListener('mouseleave', () => {
  cursor.style.opacity = '0';
  ring.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
  cursor.style.opacity = '1';
  ring.style.opacity = '1';
});

document.addEventListener('mousedown', () => {
  const cursorR = cursor.querySelector('.cursor-r');
  if (cursorR) cursorR.style.transform = 'scale(0.75)';
});
document.addEventListener('mouseup', () => {
  const cursorR = cursor.querySelector('.cursor-r');
  if (cursorR) cursorR.style.transform = '';
});

const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

const colors = [
  'rgba(201,184,240,',
  'rgba(244,167,185,',
  'rgba(168,216,240,',
  'rgba(255,211,182,',
  'rgba(255,255,255,',
  'rgba(168,230,207,',
  'rgba(255,224,163,',
];

const stars = [];
for (let i = 0; i < 200; i++) {
  stars.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.4 + 0.2,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: Math.random() * 0.08 + 0.01,
    twinkleSpeed: Math.random() * 0.02 + 0.005,
    twinkleOffset: Math.random() * Math.PI * 2,
    opacity: Math.random() * 0.6 + 0.1,
  });
}

const glitters = [];
for (let i = 0; i < 120; i++) {
  let vx = (Math.random() - 0.5) * 0.3;
  let vy = (Math.random() - 0.5) * 0.3;
  glitters.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: Math.random() * 3 + 1.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    life: Math.random(),
    lifeSpeed: Math.random() * 0.008 + 0.003,
    vx: vx,
    vy: vy,
    baseVx: vx,
    baseVy: vy,
  });
}

const shooters = [];
function spawnShooter() {
  shooters.push({
    x: Math.random() * window.innerWidth * 0.7,
    y: Math.random() * window.innerHeight * 0.4,
    len: Math.random() * 120 + 60,
    speed: Math.random() * 6 + 5,
    angle: Math.PI / 6 + (Math.random() - 0.5) * 0.3,
    opacity: 1,
    color: colors[Math.floor(Math.random() * 3)],
    life: 1,
  });
}
spawnShooter();
setInterval(spawnShooter, 2800);

const dustParticles = [];
for (let i = 0; i < 25; i++) {
  let vx = (Math.random() - 0.5) * 0.15;
  let vy = (Math.random() - 0.5) * 0.15;
  dustParticles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 80 + 30,
    color: colors[Math.floor(Math.random() * colors.length)],
    opacity: Math.random() * 0.04 + 0.01,
    vx: vx,
    vy: vy,
    baseVx: vx,
    baseVy: vy,
  });
}

let t = 0;

function drawSparkle(x, y, size, color, opacity) {
  ctx.save();
  ctx.translate(x, y);
  ctx.globalAlpha = opacity;
  const arms = 4;
  for (let a = 0; a < arms; a++) {
    ctx.save();
    ctx.rotate((a / arms) * Math.PI * 2);
    const grad = ctx.createLinearGradient(0, 0, 0, -size * 2.5);
    grad.addColorStop(0, color + '1)');
    grad.addColorStop(0.3, color + opacity + ')');
    grad.addColorStop(1, color + '0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(-size * 0.15, 0);
    ctx.lineTo(0, -size * 2.5);
    ctx.lineTo(size * 0.15, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
  ctx.beginPath();
  ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
  ctx.fillStyle = color + (opacity * 1.5) + ')';
  ctx.fill();
  ctx.restore();
}

function loop() {
  t += 0.016;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const d of dustParticles) {
    let dx = d.x - mx;
    let dy = d.y - my;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 200) {
      let force = (200 - dist) / 200;
      d.vx += (dx / dist) * force * 0.05;
      d.vy += (dy / dist) * force * 0.05;
    }
    d.vx += (d.baseVx - d.vx) * 0.02;
    d.vy += (d.baseVy - d.vy) * 0.02;

    d.x += d.vx;
    d.y += d.vy;
    if (d.x < -200) d.x = canvas.width + 200;
    if (d.x > canvas.width + 200) d.x = -200;
    if (d.y < -200) d.y = canvas.height + 200;
    if (d.y > canvas.height + 200) d.y = -200;
    const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
    g.addColorStop(0, d.color + (d.opacity * 3) + ')');
    g.addColorStop(1, d.color + '0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const s of stars) {
    s.y += s.speed;
    s.x += s.speed * 0.2;
    if (s.y > canvas.height + 5) { s.y = -5; s.x = Math.random() * canvas.width; }
    if (s.x > canvas.width + 5) { s.x = -5; }
    const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset);
    const op = s.opacity * twinkle;
    ctx.globalAlpha = op;
    ctx.fillStyle = s.color + '1)';
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fill();
  }

  for (const g of glitters) {
    let dx = g.x - mx;
    let dy = g.y - my;
    let dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150) {
      let force = (150 - dist) / 150;
      g.vx += (dx / dist) * force * 0.2;
      g.vy += (dy / dist) * force * 0.2;
    }
    g.vx += (g.baseVx - g.vx) * 0.05;
    g.vy += (g.baseVy - g.vy) * 0.05;

    g.x += g.vx;
    g.y += g.vy;
    g.life += g.lifeSpeed;
    if (g.life > 1) {
      g.life = 0;
      g.x = Math.random() * canvas.width;
      g.y = Math.random() * canvas.height;
      g.color = colors[Math.floor(Math.random() * colors.length)];
      g.size = Math.random() * 3 + 1.5;
    }
    const phase = Math.sin(g.life * Math.PI);
    drawSparkle(g.x, g.y, g.size, g.color, phase * 0.85);
  }

  for (let i = shooters.length - 1; i >= 0; i--) {
    const s = shooters[i];
    s.x += Math.cos(s.angle) * s.speed;
    s.y += Math.sin(s.angle) * s.speed;
    s.life -= 0.018;

    if (s.life <= 0 || s.x > canvas.width + 200 || s.y > canvas.height + 200) {
      shooters.splice(i, 1);
      continue;
    }

    const tailX = s.x - Math.cos(s.angle) * s.len;
    const tailY = s.y - Math.sin(s.angle) * s.len;
    const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
    grad.addColorStop(0, s.color + '0)');
    grad.addColorStop(0.7, s.color + (s.life * 0.5) + ')');
    grad.addColorStop(1, s.color + (s.life * 0.9) + ')');
    ctx.globalAlpha = s.life;
    ctx.strokeStyle = grad;
    ctx.lineWidth = 1.5;
    ctx.shadowBlur = 8;
    ctx.shadowColor = s.color + '0.8)';
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(s.x, s.y);
    ctx.stroke();
    ctx.shadowBlur = 0;

    ctx.globalAlpha = s.life * 0.9;
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(loop);
}
loop();

function toggleMobileNav() {
  const ham = document.getElementById('hamburger');
  const drawer = document.getElementById('mobileNav');
  ham.classList.toggle('open');
  drawer.classList.toggle('open');
}

function closeMobileNav() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileNav').classList.remove('open');
}

document.addEventListener('click', (e) => {
  const drawer = document.getElementById('mobileNav');
  const ham = document.getElementById('hamburger');

  if (drawer.classList.contains('open') && !drawer.contains(e.target) && !ham.contains(e.target)) {
    closeMobileNav();
    e.stopPropagation();
  }
}, true);

// Ordered page sequence for direction calculation
const PAGE_ORDER = ['index.html', 'about.html', 'projects.html', 'credentials.html', 'education.html', 'skills.html', 'contact.html'];

function getCurrentPage() {
  return window.location.pathname.split('/').pop() || 'index.html';
}

function navigateTo(targetFile) {
  const currentFile = getCurrentPage();
  const fromIdx = PAGE_ORDER.indexOf(currentFile);
  const toIdx = PAGE_ORDER.indexOf(targetFile);
  if (fromIdx !== -1 && toIdx !== -1) {
    sessionStorage.setItem('swipeDirection', toIdx > fromIdx ? 'left' : 'right');
  } else {
    sessionStorage.setItem('swipeDirection', 'left');
  }
  window.location.href = targetFile;
}

function showPage(id) {
  const pageMap = {
    'home': 'index.html',
    'about': 'about.html',
    'education': 'education.html',
    'projects': 'projects.html',
    'credentials': 'credentials.html',
    'skills': 'skills.html',
    'contact': 'contact.html'
  };
  const targetPage = pageMap[id];
  if (targetPage) {
    navigateTo(targetPage);
  }
}

// On page load: apply swipe animation and init active nav link
function initActiveNavLink() {
  const activePage = document.querySelector('.page.active, .section-page.active');
  if (activePage) {
    const id = activePage.id;
    // Highlight desktop nav
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    const navLink = document.getElementById('nav-' + id);
    if (navLink) navLink.classList.add('active');

    // Highlight mobile nav
    document.querySelectorAll('.mobile-nav-drawer a').forEach(a => a.classList.remove('active'));
    const mNavLink = document.getElementById('mnav-' + id);
    if (mNavLink) mNavLink.classList.add('active');

    // Apply swipe animation from sessionStorage direction
    const direction = sessionStorage.getItem('swipeDirection');
    if (direction === 'left') {
      activePage.classList.add('swipe-left-anim');
    } else if (direction === 'right') {
      activePage.classList.add('swipe-right-anim');
    }
    // Clear direction after use
    sessionStorage.removeItem('swipeDirection');

    // Run skills animation if on skills page
    if (id === 'skills') {
      setTimeout(animSkills, 400);
    }
  }
}

// Intercept internal link clicks to apply direction tracking
document.addEventListener('click', e => {
  const anchor = e.target.closest('a[href]');
  if (!anchor) return;
  const href = anchor.getAttribute('href');
  // Only intercept local .html links
  if (href && href.endsWith('.html') && !href.startsWith('http') && !href.startsWith('//')) {
    e.preventDefault();
    navigateTo(href);
  }
}, true);

function animSkills() {
  document.querySelectorAll('.skill-fill').forEach(bar => {
    bar.style.width = bar.dataset.w + '%';
  });
}

document.addEventListener('keydown', e => {
  const currentPath = getCurrentPage();
  const idx = PAGE_ORDER.indexOf(currentPath);
  if (e.key === 'ArrowRight' && idx < PAGE_ORDER.length - 1 && idx !== -1) {
    navigateTo(PAGE_ORDER[idx + 1]);
  }
  if (e.key === 'ArrowLeft' && idx > 0 && idx !== -1) {
    navigateTo(PAGE_ORDER[idx - 1]);
  }
});

function handleFormSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submit-btn');
  const status = document.getElementById('contact-status');

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !email || !message) {
    status.textContent = 'Please fill in all fields before sending.';
    return false;
  }

  status.textContent = 'Sending message...';
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  // Submit form via fetch
  fetch(form.action, {
    method: 'POST',
    body: new FormData(form),
    headers: {
      'Accept': 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        status.textContent = '✓ Message sent successfully! I will get back to you soon.';
        form.reset();
        submitBtn.textContent = 'Send Message ✦';
        setTimeout(() => {
          status.textContent = '';
          submitBtn.disabled = false;
        }, 3000);
      } else {
        status.textContent = 'Oops! Something went wrong. Please try again.';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message ✦';
      }
    })
    .catch(error => {
      console.error('Form submission error:', error);
      status.textContent = 'Network error. Please check your connection and try again.';
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message ✦';
    });

  return false;
}

document.addEventListener('DOMContentLoaded', () => {
  // Mark session as started so subsequent page loads skip the loader
  const isFirstLoad = !sessionStorage.getItem('hasLoadedBefore');
  if (isFirstLoad) {
    sessionStorage.setItem('hasLoadedBefore', '1');
    // Show loader on first load and fade out after delay
    setTimeout(() => {
      document.body.classList.add('loaded');
    }, 800);
  } else {
    // Skip loader instantly on subsequent navigation
    document.body.classList.add('loaded');
  }
  initActiveNavLink();
  updateFilterCounts();
});

// Top Scroll Progress Bar Logic
window.addEventListener('scroll', () => {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    progressBar.style.width = scrolled + '%';
  }
});

// ===== RBOT CHATBOT LOGIC =====
document.addEventListener('DOMContentLoaded', () => {
  const rbotFab = document.getElementById('rbotFab');
  const rbotWindow = document.getElementById('rbotWindow');
  const rbotClose = document.getElementById('rbotClose');
  const rbotClearChat = document.getElementById('rbotClearChat');
  const rbotSend = document.getElementById('rbotSend');
  const rbotInput = document.getElementById('rbotInput');
  const rbotMessages = document.getElementById('rbotMessages');

  // Find container elements in clean HTML
  const headerActions = document.querySelector('.rbot-header-actions');
  const rbotInputArea = document.querySelector('.rbot-input-area');

  const iconChat = document.querySelector('.rbot-icon-chat');
  const iconCross = document.querySelector('.rbot-icon-cross');

  if (!rbotFab || !rbotWindow) return;

  // 1. Create and insert End Chat button dynamically
  const rbotEndChat = document.createElement('button');
  rbotEndChat.id = 'rbotEndChat';
  rbotEndChat.className = 'rbot-end';
  rbotEndChat.title = 'End Chat';
  rbotEndChat.setAttribute('aria-label', 'End Chat');
  rbotEndChat.style.cssText = 'display: flex; align-items: center; gap: 4px; font-size: 11px; font-family: "DM Sans", sans-serif;';
  rbotEndChat.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect></svg>
    End
  `;
  if (headerActions && rbotClose) {
    headerActions.insertBefore(rbotEndChat, rbotClose);
  }

  // 2. Create and insert Ended Area dynamically
  const rbotEndedArea = document.createElement('div');
  rbotEndedArea.id = 'rbotEndedArea';
  rbotEndedArea.className = 'rbot-ended-area hidden';
  rbotEndedArea.style.cssText = 'display: flex; align-items: center; justify-content: center; padding: 15px; border-top: 1px solid var(--border); background: rgba(45, 31, 69, 0.4);';
  rbotEndedArea.innerHTML = `
    <button class="btn-primary" id="rbotNewChat" style="padding: 10px 20px; font-size: 13px; border-radius: 20px; width: 100%; justify-content: center; display: flex; align-items: center; gap: 8px; font-family: 'DM Sans', sans-serif;">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21v-5h5"></path></svg>
      Start New Chat
    </button>
  `;
  rbotWindow.appendChild(rbotEndedArea);

  const rbotNewChat = document.getElementById('rbotNewChat');

  // Initial greeting HTML to restore when clearing chat
  const initialGreeting = `<div class="rbot-message bot"><div class="rbot-bubble">Hi! I'm RBOT, Rishabh's AI assistant. Ask me anything about his skills, projects, or background!</div></div>`;

  // Load chat history from sessionStorage
  function loadHistory() {
    const history = sessionStorage.getItem('rbotHistory');
    if (history) {
      rbotMessages.innerHTML = history;
      rbotMessages.scrollTop = rbotMessages.scrollHeight;
    }
    
    // Apply ended/active UI state
    const isEnded = sessionStorage.getItem('rbotChatEnded') === 'true';
    if (isEnded) {
      if (rbotInputArea) rbotInputArea.classList.add('hidden');
      if (rbotEndedArea) rbotEndedArea.classList.remove('hidden');
      if (rbotEndChat) rbotEndChat.classList.add('hidden');
      if (rbotClearChat) rbotClearChat.classList.remove('hidden');
    } else {
      if (rbotInputArea) rbotInputArea.classList.remove('hidden');
      if (rbotEndedArea) rbotEndedArea.classList.add('hidden');
      if (rbotEndChat) rbotEndChat.classList.remove('hidden');
      if (rbotClearChat) rbotClearChat.classList.remove('hidden');
    }
  }

  // Save chat history to sessionStorage
  function saveHistory() {
    // Don't save the typing indicator
    const typingIndicator = rbotMessages.querySelector('.rbot-typing-indicator');
    if (typingIndicator) {
      const clone = rbotMessages.cloneNode(true);
      const typingInClone = clone.querySelector('.rbot-typing-indicator');
      if (typingInClone) typingInClone.remove();
      sessionStorage.setItem('rbotHistory', clone.innerHTML);
    } else {
      sessionStorage.setItem('rbotHistory', rbotMessages.innerHTML);
    }
  }

  loadHistory();

  function toggleChat() {
    rbotWindow.classList.toggle('hidden');
    if (!rbotWindow.classList.contains('hidden')) {
      const isEnded = sessionStorage.getItem('rbotChatEnded') === 'true';
      if (!isEnded && rbotInput) {
        rbotInput.focus();
      }
      if (iconChat) iconChat.classList.add('hidden');
      if (iconCross) iconCross.classList.remove('hidden');
    } else {
      if (iconChat) iconChat.classList.remove('hidden');
      if (iconCross) iconCross.classList.add('hidden');
    }
  }

  rbotFab.addEventListener('click', toggleChat);
  if (rbotClose) rbotClose.addEventListener('click', toggleChat);

  function endChat() {
    sessionStorage.setItem('rbotChatEnded', 'true');
    appendMessage("Chat ended. Click 'Start New Chat' to begin a new conversation.", 'bot');
    if (rbotInputArea) rbotInputArea.classList.add('hidden');
    if (rbotEndedArea) rbotEndedArea.classList.remove('hidden');
    if (rbotEndChat) rbotEndChat.classList.add('hidden');
    if (rbotClearChat) rbotClearChat.classList.remove('hidden');
  }

  function startNewChat() {
    sessionStorage.removeItem('rbotChatEnded');
    rbotMessages.innerHTML = initialGreeting;
    if (rbotInputArea) rbotInputArea.classList.remove('hidden');
    if (rbotEndedArea) rbotEndedArea.classList.add('hidden');
    if (rbotEndChat) rbotEndChat.classList.remove('hidden');
    if (rbotClearChat) rbotClearChat.classList.remove('hidden');
    saveHistory();
    if (rbotInput) {
      rbotInput.value = '';
      rbotInput.style.height = 'auto';
      rbotInput.focus();
    }
  }

  if (rbotEndChat) {
    rbotEndChat.addEventListener('click', endChat);
  }

  if (rbotNewChat) {
    rbotNewChat.addEventListener('click', startNewChat);
  }

  if (rbotClearChat) {
    rbotClearChat.addEventListener('click', startNewChat);
  }

  // Auto-resize textarea
  if (rbotInput) {
    rbotInput.addEventListener('input', function () {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight) + 'px';
    });
  }

  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `rbot-message ${sender}`;
    // Basic formatting for bold text and line breaks in markdown
    const formattedText = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    msgDiv.innerHTML = `<div class="rbot-bubble">${formattedText}</div>`;
    rbotMessages.appendChild(msgDiv);
    rbotMessages.scrollTop = rbotMessages.scrollHeight;
    saveHistory();
  }

  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = `rbot-message bot rbot-typing-indicator`;
    typingDiv.innerHTML = `<div class="rbot-bubble rbot-typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div>`;
    rbotMessages.appendChild(typingDiv);
    rbotMessages.scrollTop = rbotMessages.scrollHeight;
  }

  function removeTyping() {
    const typingIndicator = rbotMessages.querySelector('.rbot-typing-indicator');
    if (typingIndicator) {
      typingIndicator.remove();
    }
  }

  async function sendMessage() {
    const isEnded = sessionStorage.getItem('rbotChatEnded') === 'true';
    if (isEnded) return;

    const text = rbotInput.value.trim();
    if (!text) return;

    appendMessage(text, 'user');
    rbotInput.value = '';
    rbotInput.style.height = 'auto'; // Reset height

    showTyping();

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      removeTyping();
      appendMessage(data.reply || 'Sorry, I am having trouble answering right now.', 'bot');
    } catch (error) {
      console.error('Error in RBOT:', error);
      removeTyping();
      appendMessage('Oops! I encountered an error connecting to my brain. Please try again later.', 'bot');
    }
  }

  if (rbotSend) rbotSend.addEventListener('click', sendMessage);
  if (rbotInput) {
    rbotInput.addEventListener('keydown', (e) => {
      // Submit on Enter (without Shift)
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
  }
});

