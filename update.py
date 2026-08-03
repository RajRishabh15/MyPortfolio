import os

target_content = """  <!-- ===== RBOT Chatbot Widget ===== -->
  <div class="rbot-widget-container" id="rbotWidgetContainer">
    <button class="rbot-fab" id="rbotFab" aria-label="Open Chat">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
    </button>
    <div class="rbot-window hidden" id="rbotWindow">
      <div class="rbot-header">
        <div class="rbot-header-info">
          <div class="rbot-avatar">R</div>
          <div>
            <h3 class="rbot-title">RBOT</h3>
            <span class="rbot-status">Online</span>
          </div>
        </div>
        <button class="rbot-close" id="rbotClose" aria-label="Close Chat">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="rbot-messages" id="rbotMessages">
        <div class="rbot-message bot">
          <div class="rbot-bubble">Hi! I'm RBOT, Rishabh's AI assistant. Ask me anything about his skills, projects, or background!</div>
        </div>
      </div>
      <div class="rbot-input-area">
        <input type="text" id="rbotInput" placeholder="Ask me anything..." autocomplete="off" />
        <button id="rbotSend" aria-label="Send Message">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
  </div>"""

replacement = """  <!-- ===== RBOT Chatbot Widget ===== -->
  <div class="rbot-widget-container" id="rbotWidgetContainer">
    <div class="rbot-window hidden" id="rbotWindow">
      <div class="rbot-header">
        <div class="rbot-header-info">
          <div class="rbot-avatar">R</div>
          <div>
            <h3 class="rbot-title">RBOT</h3>
            <span class="rbot-status">Online</span>
          </div>
        </div>
        <div class="rbot-header-actions">
          <button class="rbot-clear" id="rbotClearChat" title="New Chat" aria-label="New Chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"></path><path d="M16 21v-5h5"></path></svg>
          </button>
          <button class="rbot-close" id="rbotClose" aria-label="Close Chat">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
      </div>
      <div class="rbot-messages" id="rbotMessages">
        <div class="rbot-message bot">
          <div class="rbot-bubble">Hi! I'm RBOT, Rishabh's AI assistant. Ask me anything about his skills, projects, or background!</div>
        </div>
      </div>
      <div class="rbot-input-area">
        <textarea id="rbotInput" placeholder="Ask me anything..." rows="1"></textarea>
        <button id="rbotSend" aria-label="Send Message">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
      </div>
    </div>
    <button class="rbot-fab" id="rbotFab" aria-label="Toggle Chat">
      <svg class="rbot-icon-chat" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
      <svg class="rbot-icon-cross hidden" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
    </button>
  </div>"""

for filename in os.listdir('.'):
    if filename.endswith('.html'):
        with open(filename, 'r', encoding='utf-8') as f:
            content = f.read()
        if target_content in content:
            new_content = content.replace(target_content, replacement)
            with open(filename, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f'Updated {filename}')
        else:
            print(f'Target content not found in {filename}')
