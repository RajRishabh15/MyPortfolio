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

function EducationPage() {
  const arrowCleanup = setupArrowKeyNav('education.html');
  useNavigation('education.html', arrowCleanup);

  useEffect(() => {
    applySwipeAnimation(document.getElementById('education'));
  }, []);

  return (
    <>
      <ScrollProgress />
      <LoadingScreen />
      <Cursor />
      <Background />
      <Nav activePage="education" educationMode backHref="about.html" />

      {/* ===== EDUCATION ===== */}
      <div className="section-page active" id="education">
        <div className="section-header">
          <p className="section-eyebrow">My Journey</p>
          <h2 className="section-title"><em>Education &amp; Experience</em></h2>
        </div>

        <div className="education-container max-w-3xl mx-auto">

          {/* B.Tech */}
          <div className="education-card">
            <div className="education-header">
              <div>
                <h3 className="text-2xl text-lavender font-semibold">B.Tech in Computer Science Engineering</h3>
                <p className="text-muted text-sm mt-2">Specialisation: Software Engineering</p>
              </div>
              <span className="education-year">2025-2029</span>
            </div>
            <p className="text-textPrimary mb-3"><strong>SRMIST Kattankulathur, Chennai</strong></p>
            <p className="text-muted leading-relaxed mb-6">
              Currently pursuing my degree with focus on software engineering principles, web development, database management, and full-stack technologies.
              Actively involved in coding competitions and technical projects.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Programming for Problem Solving','Web Development','Database Management','Object-Oriented Programming'].map(t => (
                <span key={t} className="px-3 py-1 bg-sky/10 border border-sky/20 rounded-lg text-[11px] text-sky">{t}</span>
              ))}
            </div>
          </div>

          {/* Technical Associate */}
          <div className="education-card">
            <div className="education-header">
              <div>
                <h3 className="text-2xl text-lavender font-semibold">Technical Associate (Web Dev)</h3>
                <p className="text-muted text-sm mt-2">Coding Ninjas 10X SRM</p>
                <p className="text-textPrimary mb-3"><strong>SRMIST Kattankulathur, Chennai</strong></p>
              </div>
              <span className="education-year">2026-Still Going On</span>
            </div>
            <p className="text-muted leading-relaxed mb-6">
              Mentoring students in web development fundamentals, conducting problem-solving sessions, and guiding through real-world projects.
              Helping students understand core concepts and best practices in modern web technologies.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Mentoring','Guiding','Leading','Learning'].map(t => (
                <span key={t} className="px-3 py-1 bg-mint/10 border border-mint/20 rounded-lg text-[11px] text-mint">{t}</span>
              ))}
            </div>
          </div>

          {/* Class 12 */}
          <div className="education-card">
            <div className="education-header">
              <div>
                <h3 className="text-2xl text-lavender font-semibold">Class 12 (PCM+IP)</h3>
                <p className="text-muted text-sm mt-2">CBSE</p>
                <p className="text-textPrimary mb-3"><strong>Army Public School Golconda</strong></p>
                <p><strong>Hyderabad, Telangana</strong></p>
              </div>
              <span className="education-year">2023-2024</span>
            </div>
            <p className="text-muted leading-relaxed mb-6">
              Completed senior secondary education with Physics, Chemistry, Mathematics, and Information Practices.
              This foundational period solidified my understanding of core scientific principles and introduced me to programming fundamentals.
              Actively participated in science exhibitions and coding contests.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Physics','Chemistry','Mathematics','Information Practices'].map(t => (
                <span key={t} className="px-3 py-1 bg-mint/10 border border-mint/20 rounded-lg text-[11px] text-mint">{t}</span>
              ))}
            </div>
          </div>

          {/* Class 10 */}
          <div className="education-card">
            <div className="education-header">
              <div>
                <h3 className="text-2xl text-lavender font-semibold">Class 10</h3>
                <p className="text-muted text-sm mt-2">CBSE</p>
                <p className="text-textPrimary mb-3"><strong>Army Public School Khasa Cantt</strong></p>
                <p><strong>Amritsar, Punjab</strong></p>
              </div>
              <span className="education-year">2021-2022</span>
            </div>
            <p className="text-muted leading-relaxed mb-6">
              Completed secondary education with a strong foundation in science and mathematics.
              This phase ignited my curiosity about technology and problem-solving.
              Participated in various competitions and developed strong analytical and logical thinking skills.
            </p>
            <div className="flex flex-wrap gap-2">
              {['Science & Math','English','Social Studies','Foundation Building'].map(t => (
                <span key={t} className="px-3 py-1 bg-mint/10 border border-mint/20 rounded-lg text-[11px] text-mint">{t}</span>
              ))}
            </div>
          </div>

        </div>
        <div className="footer-line">✦ &nbsp; Always learning &amp; growing &nbsp; ✦</div>
        <div className="copyright">&copy; 2026 Rishabh Raj.<br />All rights reserved.</div>
      </div>

      <RBot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><EducationPage /></React.StrictMode>
);
