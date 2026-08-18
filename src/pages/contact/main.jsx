import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import Background from '../../components/Background';
import Cursor from '../../components/Cursor';
import Nav from '../../components/Nav';
import LoadingScreen from '../../components/LoadingScreen';
import ScrollProgress from '../../components/ScrollProgress';
import RBot from '../../components/RBot';
import { applySwipeAnimation, setupArrowKeyNav } from '../../utils/pageTransition';
import { useNavigation } from '../../hooks/useNavigation';

function ContactPage() {
  const [status,      setStatus]      = useState('');
  const [submitting,  setSubmitting]  = useState(false);

  const arrowCleanup = setupArrowKeyNav('contact.html');
  useNavigation('contact.html', arrowCleanup);

  useEffect(() => {
    applySwipeAnimation(document.getElementById('contact'));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const form    = e.currentTarget;
    const name    = form.querySelector('#contact-name').value.trim();
    const email   = form.querySelector('#contact-email').value.trim();
    const message = form.querySelector('#contact-message').value.trim();

    if (!name || !email || !message) {
      setStatus('Please fill in all fields before sending.');
      return;
    }

    setStatus('Sending message…');
    setSubmitting(true);

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('✓ Message sent successfully! I will get back to you soon.');
        form.reset();
        setTimeout(() => { setStatus(''); setSubmitting(false); }, 3000);
      } else {
        setStatus('Oops! Something went wrong. Please try again.');
        setSubmitting(false);
      }
    } catch {
      setStatus('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  }

  return (
    <>
      <ScrollProgress />
      <LoadingScreen />
      <Cursor />
      <Background />
      <Nav activePage="contact" />

      {/* ===== CONTACT ===== */}
      <div className="section-page active" id="contact">
        <div className="section-header">
          <p className="section-eyebrow">Get in touch</p>
          <h2 className="section-title">Let&apos;s <em>connect</em></h2>
        </div>

        <div className="contact-layout">
          {/* Left — contact links */}
          <div className="contact-left">
            <p className="contact-tagline">
              &ldquo;Open to internships, collaborations, and interesting conversations.&rdquo;
            </p>
            <div className="contact-links">
              <a href="mailto:rajrish0915@gmail.com" className="contact-link">
                <div className="contact-icon email">✉</div>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>Email</div>
                  <div>rajrish0915@gmail.com</div>
                </div>
              </a>
              <a href="https://github.com/RajRishabh15/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon github">⌘</div>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>GitHub</div>
                  <div>github.com/RajRishabh15</div>
                </div>
              </a>
              <a href="https://www.linkedin.com/in/rishabh-raj-1a5438371/" target="_blank" rel="noopener noreferrer" className="contact-link">
                <div className="contact-icon linkedin">in</div>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: 1, textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 2 }}>LinkedIn</div>
                  <div>linkedin.com/in/rishabh-raj</div>
                </div>
              </a>
            </div>
          </div>

          {/* Right — contact form */}
          <form
            id="contactForm"
            className="contact-form"
            action="https://formspree.io/f/xbdevveg"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div className="form-group">
              <label className="form-label">Your name</label>
              <input id="contact-name" name="name" type="text" className="form-input" placeholder="What should I call you?" required />
            </div>
            <div className="form-group">
              <label className="form-label">Email address</label>
              <input id="contact-email" name="email" type="email" className="form-input" placeholder="your@email.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea id="contact-message" name="message" className="form-textarea" placeholder="Tell me about your project, opportunity, or just say hi ✦" required />
            </div>
            <button
              type="submit"
              className="btn-primary"
              id="submit-btn"
              disabled={submitting}
              style={{ width: '100%', justifyContent: 'center', border: 'none' }}
            >
              {submitting ? 'Sending…' : 'Send Message ✦'}
            </button>
            {status && <p style={{ marginTop: '1rem', color: 'var(--lavender)', fontSize: '0.95rem' }}>{status}</p>}
          </form>
        </div>

        <div className="footer-line">✦ &nbsp; Made with care &nbsp; ✦</div>
        <div className="copyright">&copy; 2026 Rishabh Raj.<br />All rights reserved.</div>
      </div>

      <RBot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><ContactPage /></React.StrictMode>
);
