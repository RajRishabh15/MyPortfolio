import { useState, useRef, useEffect } from 'react';

const INITIAL_GREETING = `<div class="rbot-message bot"><div class="rbot-bubble">Hi! I'm RBOT, Rishabh's AI assistant. Ask me anything about his skills, projects, or background!</div></div>`;

// ── Icons ──────────────────────────────────────────────────────────────────────
const SendIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
  </svg>
);
const TrashIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);
const StopIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
  </svg>
);
const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" />
    <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" /><path d="M16 21v-5h5" />
  </svg>
);

export default function RBot() {
  const [isOpen,    setIsOpen]    = useState(false);
  const [isEnded,   setIsEnded]   = useState(() => sessionStorage.getItem('rbotChatEnded') === 'true');
  const [isTyping,  setIsTyping]  = useState(false);
  const [inputVal,  setInputVal]  = useState('');
  const [msgHtml,   setMsgHtml]   = useState(() => sessionStorage.getItem('rbotHistory') || INITIAL_GREETING);
  const messagesRef = useRef(null);
  const inputRef    = useRef(null);

  // Auto-scroll on new messages
  useEffect(() => {
    if (messagesRef.current) messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }, [msgHtml, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isEnded && inputRef.current) inputRef.current.focus();
  }, [isOpen, isEnded]);

  function saveHistory(html) { sessionStorage.setItem('rbotHistory', html); }

  function appendMessage(text, sender) {
    const formatted = text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\n/g, '<br>');
    setMsgHtml(prev => {
      const next = prev + `<div class="rbot-message ${sender}"><div class="rbot-bubble">${formatted}</div></div>`;
      saveHistory(next);
      return next;
    });
  }

  function handleStartNew() {
    sessionStorage.removeItem('rbotChatEnded');
    sessionStorage.setItem('rbotHistory', INITIAL_GREETING);
    setIsEnded(false);
    setMsgHtml(INITIAL_GREETING);
    setInputVal('');
    if (inputRef.current) { inputRef.current.style.height = 'auto'; }
  }

  function handleEndChat() {
    sessionStorage.setItem('rbotChatEnded', 'true');
    setIsEnded(true);
    appendMessage("Chat ended. Click 'Start New Chat' to begin a new conversation.", 'bot');
  }

  async function sendMessage() {
    const text = inputVal.trim();
    if (!text || isEnded) return;
    setInputVal('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
    appendMessage(text, 'user');
    setIsTyping(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error('Bad response');
      const data = await res.json();
      setIsTyping(false);
      appendMessage(data.reply || 'Sorry, I am having trouble answering right now.', 'bot');
    } catch {
      setIsTyping(false);
      appendMessage('Oops! I encountered an error connecting to my brain. Please try again later.', 'bot');
    }
  }

  const typingHtml = isTyping
    ? `<div class="rbot-message bot rbot-typing-indicator"><div class="rbot-bubble rbot-typing"><div class="dot"></div><div class="dot"></div><div class="dot"></div></div></div>`
    : '';

  return (
    <div className="rbot-widget-container" id="rbotWidgetContainer">
      {/* ── Chat window ─────────────────────────────────────────────────── */}
      <div className={`rbot-window${isOpen ? '' : ' hidden'}`} id="rbotWindow">
        <div className="rbot-header">
          <div className="rbot-header-info">
            <div className="rbot-avatar">R</div>
            <div>
              <h3 className="rbot-title">RBOT</h3>
              <span className="rbot-status">Online</span>
            </div>
          </div>
          <div className="rbot-header-actions">
            {/* Clear / Start New */}
            <button
              className="rbot-clear"
              onClick={handleStartNew}
              title="Clear Chat"
              aria-label="Clear Chat"
              style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
            >
              <TrashIcon /> Clear
            </button>
            {/* End Chat (hide when already ended) */}
            {!isEnded && (
              <button
                className="rbot-end"
                onClick={handleEndChat}
                title="End Chat"
                aria-label="End Chat"
                style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}
              >
                <StopIcon /> End
              </button>
            )}
            <button className="rbot-close" aria-label="Close Chat" onClick={() => setIsOpen(false)}>
              <CloseIcon />
            </button>
          </div>
        </div>

        {/* Messages — dangerouslySetInnerHTML mirrors original approach exactly */}
        <div
          className="rbot-messages"
          id="rbotMessages"
          ref={messagesRef}
          dangerouslySetInnerHTML={{ __html: msgHtml + typingHtml }}
        />

        {/* Input area vs Ended area */}
        {!isEnded ? (
          <div className="rbot-input-area">
            <textarea
              ref={inputRef}
              id="rbotInput"
              placeholder="Ask me anything..."
              rows="1"
              value={inputVal}
              onChange={e => {
                setInputVal(e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            />
            <button aria-label="Send Message" onClick={sendMessage}><SendIcon /></button>
          </div>
        ) : (
          <div
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 15, borderTop: '1px solid var(--border)', background: 'rgba(45,31,69,0.4)' }}
          >
            <button
              className="btn-primary"
              onClick={handleStartNew}
              style={{ padding: '10px 20px', fontSize: 13, borderRadius: 20, width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center', gap: 8, fontFamily: "'DM Sans', sans-serif" }}
            >
              <RefreshIcon /> Start New Chat
            </button>
          </div>
        )}
      </div>

      {/* ── FAB ─────────────────────────────────────────────────────────── */}
      <button className="rbot-fab" id="rbotFab" aria-label="Toggle Chat" onClick={() => setIsOpen(o => !o)}>
        <span className={isOpen ? 'hidden' : ''}><ChatIcon /></span>
        <span className={isOpen ? '' : 'hidden'}><CloseIcon /></span>
      </button>
    </div>
  );
}
