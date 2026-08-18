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

function AboutPage() {
  const arrowCleanup = setupArrowKeyNav('about.html');
  useNavigation('about.html', arrowCleanup);

  useEffect(() => {
    applySwipeAnimation(document.getElementById('about'));
  }, []);

  return (
    <>
      <ScrollProgress />
      <LoadingScreen />
      <Cursor />
      <Background />
      <Nav activePage="about" />

      {/* ===== ABOUT ===== */}
      <div className="section-page active" id="about">
        <div className="section-header">
          <p className="section-eyebrow">Who I am</p>
          <h2 className="section-title">A little bit <em>about me</em></h2>
        </div>
        <div className="about-grid">
          <div className="about-left">
            <div className="about-avatar">
              <div className="avatar-ring" />
              <div className="avatar-initials">RR</div>
            </div>
            <div className="about-info">
              <p>🎓 Computer Science Student</p>
              <p>🌐 Technical Associate(Web Dev) at Coding Ninjas 10X SRM</p>
              <p>💻 Full-Stack Enthusiast</p>
              <p>📍 Chennai</p>
            </div>
          </div>
          <div className="about-right">
            <p className="about-bio">
              &ldquo;I believe great software should feel effortless — the kind that makes you smile the moment you use it.&rdquo;
            </p>
            <p className="about-body">
              I&apos;m a passionate student developer currently pursuing my B.Tech degree in Computer Science
              Engineering (Specialisation in Software Engineering) from SRMIST Kattankulathur, Chennai. I
              love building projects that blend aesthetic design with functional code — whether that&apos;s a sleek web app, an
              interactive dashboard, or a creative experiment.
            </p>
            <p className="about-body">
              When I&apos;m not debugging at 2am, you&apos;ll find me sketching UI concepts, exploring new
              frameworks, or getting lost in a good playlist. I&apos;m always looking for the next interesting problem to solve.
            </p>
            <div className="about-tags">
              <div className="tag">Open Source</div>
              <div className="tag">Web Dev</div>
              <div className="tag">Design Thinking</div>
              <div className="tag">Problem Solving</div>
              <div className="tag">Hackathons</div>
              <div className="tag">Coffee ☕</div>
            </div>
            <button
              className="btn-primary"
              style={{ marginTop: '2rem' }}
              onClick={() => window.location.href = 'education.html'}
            >
              View Education Details →
            </button>
          </div>
        </div>
        <div className="footer-line">✦ &nbsp; Always learning &nbsp; ✦</div>
        <div className="copyright">&copy; 2026 Rishabh Raj.<br />All rights reserved.</div>
      </div>

      <RBot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><AboutPage /></React.StrictMode>
);
