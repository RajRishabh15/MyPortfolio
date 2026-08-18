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

function SkillsPage() {
  const arrowCleanup = setupArrowKeyNav('skills.html');
  useNavigation('skills.html', arrowCleanup);

  useEffect(() => {
    applySwipeAnimation(document.getElementById('skills'));
  }, []);

  return (
    <>
      <ScrollProgress />
      <LoadingScreen />
      <Cursor />
      <Background />
      <Nav activePage="skills" />

      {/* ===== SKILLS ===== */}
      <div className="section-page active" id="skills">
        <div className="section-header">
          <p className="section-eyebrow">What I know</p>
          <h2 className="section-title">My <em>Skills</em></h2>
        </div>

        <div className="skills-grid">
          {/* Frontend */}
          <div className="skills-card frontend">
            <div className="skills-card-icon">⚡</div>
            <h3 className="skills-card-title">Frontend Development</h3>
            <p className="skills-card-desc">
              Building responsive, pixel-perfect, and modern web interfaces using state-of-the-art libraries and tools.
            </p>
            <div className="tools-cloud">
              {['HTML5','CSS3','JavaScript (ES6+)','Tailwind CSS','React.js','Vite'].map(t => (
                <div key={t} className="tool-pill">{t}</div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="skills-card backend">
            <div className="skills-card-icon">⚙️</div>
            <h3 className="skills-card-title">Backend &amp; Databases</h3>
            <p className="skills-card-desc">
              Developing scalable server architectures, secure endpoints, and managing reliable databases.
            </p>
            <div className="tools-cloud">
              {['Node.js','Express.js','MongoDB','Python','Firebase','REST APIs'].map(t => (
                <div key={t} className="tool-pill">{t}</div>
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="skills-card tools">
            <div className="skills-card-icon">🛠️</div>
            <h3 className="skills-card-title">Tools &amp; Developer Ecosystem</h3>
            <p className="skills-card-desc">
              Working with industry-standard development ecosystems, design systems, and workflow engines.
            </p>
            <div className="tools-cloud">
              {['Git','GitHub','VS Code','Vercel','Figma','Notion','Antigravity (MCP Server)','React Bits'].map(t => (
                <div key={t} className="tool-pill">{t}</div>
              ))}
            </div>
          </div>

          {/* Academics */}
          <div className="skills-card academics">
            <div className="skills-card-icon">🎓</div>
            <h3 className="skills-card-title">Academics &amp; Leadership</h3>
            <p className="skills-card-desc">
              Fostering knowledge sharing and engineering fundamentals through peer mentoring and technical leadership.
            </p>
            <div className="tools-cloud">
              {['Technical Mentoring','Object-Oriented Programming (OOP)','Data Structures (DSA)','Database Management (DBMS)','Problem Solving','Team Collaboration'].map(t => (
                <div key={t} className="tool-pill">{t}</div>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-line" style={{ marginTop: 60 }}>✦ &nbsp; Always adding to the list &nbsp; ✦</div>
        <div className="copyright">&copy; 2026 Rishabh Raj.<br />All rights reserved.</div>
      </div>

      <RBot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><SkillsPage /></React.StrictMode>
);
