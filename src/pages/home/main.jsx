import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Background from '../../components/Background';
import Cursor from '../../components/Cursor';
import Nav from '../../components/Nav';
import LoadingScreen from '../../components/LoadingScreen';
import ScrollProgress from '../../components/ScrollProgress';
import RBot from '../../components/RBot';
import { applySwipeAnimation, setupArrowKeyNav } from '../../utils/pageTransition';
import { useNavigation } from '../../hooks/useNavigation';

function HomePage() {
  const arrowCleanup = setupArrowKeyNav('index.html');
  useNavigation('index.html', arrowCleanup);

  useEffect(() => {
    applySwipeAnimation(document.getElementById('home'));
  }, []);

  return (
    <>
      <ScrollProgress />
      <LoadingScreen isHome />
      <Cursor />
      <Background />
      <Nav activePage="home" />

      {/* ===== HOME ===== */}
      <div className="page active" id="home">
        <div className="hero-eyebrow">✦ Available for opportunities ✦</div>
        <h1 className="hero-name">Hello, I&apos;m <span>Rishabh Raj</span></h1>
        <p className="hero-title">Student Developer &amp; Digital Dreamer</p>
        <p className="hero-desc">
          I craft thoughtful digital experiences where beautiful design meets clean code. Currently
          exploring the intersection of creativity and technology.
        </p>
        <div className="hero-cta">
          <a className="btn-primary" href="projects.html">View My Work</a>
          <a className="btn-outline" href="contact.html">Say Hello</a>
        </div>
        <div className="scroll-indicator">
          <div className="scroll-line" />
          <span className="btn-abt" onClick={() => window.location.href = 'about.html'}>Explore</span>
        </div>
        <div className="copyright" style={{ position: 'absolute', bottom: 20, width: '100%' }}>
          &copy; 2026 Rishabh Raj.<br />All rights reserved.
        </div>
      </div>

      <RBot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><HomePage /></React.StrictMode>
);
