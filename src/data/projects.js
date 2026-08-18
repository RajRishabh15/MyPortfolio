// All project data extracted from script.js — edit here to add/update projects
export const projectsData = {
  'rishfolio': {
    title: 'RishFolio (AI Portfolio)',
    tag: 'Full Stack | AI',
    category: 'fullstack ai',
    desc: 'A meticulously crafted digital portfolio designed to reflect my personal brand and creative vision. It features a sleek dark mode aesthetic, smooth micro-animations, and a highly interactive UI to present my projects and skills beautifully. The site serves as a complete digital identity, offering visitors a dynamic and premium browsing experience.',
    stack: ['HTML', 'Gemini API', 'TailWindCSS', 'JavaScript', 'Node', 'Python'],
    img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2000&auto=format&fit=crop',
    live: 'https://rishfolio15.vercel.app',
    github: 'https://github.com/OpticRish/RishFolio',
  },
  'french-tech': {
    title: 'France & Technology',
    tag: 'Full Stack',
    category: 'fullstack',
    desc: 'Innovative France is a high-end digital hub designed to celebrate the engineering marvels that define the French spirit of discovery. From the wide-body twin-engine logic of Airbus and the record-breaking speed of the TGV, to the tactical air superiority of the Dassault Rafale and the galactic reach of Arianespace.',
    stack: ['React', 'Node.js', 'Tailwind', 'Vite'],
    img: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?q=80&w=2020&auto=format&fit=crop',
    live: 'https://french-tech.vercel.app',
    github: 'https://github.com/OpticRish/French_Tech',
  },
  'chandrayaan3': {
    title: 'Chandrayaan Mission Web',
    tag: 'Space Tech',
    category: 'webdev',
    desc: "A dedicated website providing comprehensive insights into ISRO's Chandrayaan-3 lunar mission. Includes detailed information on launch timeline, objectives, spacecraft design, landing sequence, and scientific achievements. Built to educate and inspire space enthusiasts and curious minds.",
    stack: ['HTML', 'Javascript', 'Tailwind CSS'],
    img: 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2000&auto=format&fit=crop',
    live: 'https://chandrayaan3-five.vercel.app',
    github: 'https://github.com/OpticRish/Chandrayaan3',
  },
  'todo-cli': {
    title: 'To-Do List App',
    tag: 'CLI Tool',
    category: 'cli',
    desc: 'A simple, yet powerful command-line To-Do List app built completely with core Python. It requires no external libraries and works directly in your terminal, making it incredibly fast and lightweight for developers who prefer living in the console.',
    stack: ['Python', 'CLI', 'Terminal'],
    img: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=2000&auto=format&fit=crop',
    live: 'https://github.com/OpticRish/To-Do-List-CLI-',
    github: 'https://github.com/OpticRish/To-Do-List-CLI-',
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
    upcoming: true,
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
    liveComingSoon: true,
  },
};

// Display order for project cards (matches the HTML order)
export const projectOrder = [
  'rishfolio',
  'french-tech',
  'chandrayaan3',
  'todo-cli',
  'subscription-manager',
  'techfest3d',
];

export const categoryNames = {
  all: 'All Projects',
  fullstack: 'Full Stack',
  webdev: 'Web Dev',
  ai: 'AI Projects',
  game: 'Game Projects',
  cli: 'CLI Projects',
};
