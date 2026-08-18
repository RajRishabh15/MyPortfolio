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

// ── Credential card sub-component (keeps credentials.jsx easy to scan & update) ──
function CredCard({ title, issuer, date, credId, tags, tagColor = 'sky', verifyUrl }) {
  return (
    <div className="education-card">
      <div className="education-header">
        <div>
          <h3 className="text-2xl text-lavender font-semibold">{title}</h3>
          <p className="text-muted text-sm mt-2">{issuer}</p>
        </div>
        <span className="education-year">{date}</span>
      </div>
      {credId && <p className="text-muted leading-relaxed mb-6">Credential ID: {credId}</p>}
      <div className="flex flex-wrap gap-2 mt-4">
        {tags.map(t => (
          <span key={t} className={`px-3 py-1 bg-${tagColor}/10 border border-${tagColor}/20 rounded-lg text-[11px] text-${tagColor}`}>{t}</span>
        ))}
      </div>
      {verifyUrl && (
        <div className="mt-6 flex justify-end">
          <button
            className="btn-primary"
            style={{ padding: '10px 20px', fontSize: 13 }}
            onClick={() => window.open(verifyUrl, '_blank')}
          >
            View Credential ↗
          </button>
        </div>
      )}
    </div>
  );
}

function CredentialsPage() {
  const arrowCleanup = setupArrowKeyNav('credentials.html');
  useNavigation('credentials.html', arrowCleanup);

  useEffect(() => {
    applySwipeAnimation(document.getElementById('credentials'));
  }, []);

  return (
    <>
      <ScrollProgress />
      <LoadingScreen />
      <Cursor />
      <Background />
      <Nav activePage="credentials" educationMode backHref="projects.html" />

      {/* ===== CREDENTIALS ===== */}
      <div className="section-page active" id="credentials">
        <div className="section-header">
          <p className="section-eyebrow">My achievements</p>
          <h2 className="section-title">Earned <em>Credentials</em></h2>
        </div>

        <div className="education-container max-w-3xl mx-auto">

          <CredCard
            title="Cloud Financial Management Virtual Internship"
            issuer="Amazon Web Services (AWS)"
            date="Jun 2026"
            credId="48da80ce905318472535"
            tags={['Cloud FinOps','Cloud Cost Optimization']}
            tagColor="sky"
            verifyUrl="https://certificate.eduskillsfoundation.org/verify/48da80ce905318472535/48da80ce905318472535"
          />

          <CredCard
            title="AWS Academy Graduate - Machine Learning Foundations"
            issuer="Amazon Web Services (AWS)"
            date="Mar 2026"
            tags={['Machine Learning']}
            tagColor="mint"
            verifyUrl="https://www.credly.com/badges/f6c80e6f-61a8-4b16-87f1-ed085e3fad5d/print"
          />

          <CredCard
            title="AWS Academy Graduate - Generative AI Foundations"
            issuer="Amazon Web Services (AWS)"
            date="Mar 2026"
            tags={['Generative AI']}
            tagColor="sky"
            verifyUrl="https://www.credly.com/badges/2780eb80-0b39-43cc-a218d97545ceb90f"
          />

          <CredCard
            title="AWS Academy Graduate - Machine Learning for NLP"
            issuer="Amazon Web Services (AWS)"
            date="Mar 2026"
            tags={['Natural Language Processing (NLP)','Machine Learning']}
            tagColor="mint"
            verifyUrl="https://www.credly.com/badges/699335cf-31ed-4e88-b7e7-a01e345aa6aa/print"
          />

          <CredCard
            title="Gen AI Virtual Internship"
            issuer="All India Council for Technical Education (AICTE)"
            date="Mar 2026"
            credId="426c98a4fc74e80b6a30"
            tags={['Generative AI','Machine Learning']}
            tagColor="sky"
            verifyUrl="https://certificate.eduskillsfoundation.org/verify/426c98a4fc74e80b6a30/426c98a4fc74e80b6a30"
          />

          <CredCard
            title="Generative AI"
            issuer="Microsoft"
            date="Dec 2025"
            credId="4b1904fe-75e6-4193-ad9f-7cafb9e8208a"
            tags={['Generative AI','Microsoft Copilot Studio']}
            tagColor="mint"
            verifyUrl="https://pwskills.com/learn/certificate/4b1904fe-75e6-4193-ad9f-7cafb9e8208a/"
          />

          <CredCard
            title="Google for Education Certifications"
            issuer="Google"
            date="Dec 2025"
            tags={['Generative AI','Google Gemini']}
            tagColor="sky"
            verifyUrl="https://edu.google.accredible.com/7dffb729-e1d2-4272-bf3b-af8c5da06dd5#acc.4rlf1SZ8"
          />

          <CredCard
            title="Introduction to Programming Using HTML and CSS"
            issuer="Udemy"
            date="Dec 2025"
            credId="UC-c3bc78ab-4daa-46e7-8ba3-6da81de3294b"
            tags={['HTML5','CSS']}
            tagColor="mint"
            verifyUrl="https://www.udemy.com/certificate/UC-c3bc78ab-4daa-46e7-8ba3-6da81de3294b/"
          />

          <CredCard
            title="Generative AI"
            issuer="Oracle"
            date="Oct 2025"
            credId="102963426OCI25GAIOCP"
            tags={['Generative AI']}
            tagColor="sky"
            verifyUrl="https://catalog-education.oracle.com/ords/certview/sharebadge?id=3F031AE5ACB4554C6DC3746FC899131E00E7BB2299502C3CB8DF340A83A80EDF"
          />

          <CredCard
            title="Deloitte Australia - Cyber Job Simulation"
            issuer="Forage"
            date="Jun 2025"
            credId="fd9j9EB2hxtDgBA9R"
            tags={['Web Application Security','Computer Network']}
            tagColor="mint"
            verifyUrl="https://forage-uploads-prod.s3.amazonaws.com/completion-certificates/9PBTqmSxAf6zZTseP/E9pA6qsdbeyEkp3ti_9PBTqmSxAf6zZTseP_vJdHpbWCNtyqFerD4_1750749340779_completion_certificate.pdf"
          />

        </div>
        <div className="footer-line">✦ &nbsp; Keep upgrading, keep learning &nbsp; ✦</div>
        <div className="copyright">&copy; 2026 Rishabh Raj.<br />All rights reserved.</div>
      </div>

      <RBot />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode><CredentialsPage /></React.StrictMode>
);
