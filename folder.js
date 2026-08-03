class AnimatedFolder extends HTMLElement {
  constructor() {
    super();
    this.open = false;
    this.maxItems = 3;
    this.paperOffsets = Array.from({ length: this.maxItems }, () => ({ x: 0, y: 0 }));
  }

  darkenColor(hex, percent) {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) {
      color = color.split('').map(c => c + c).join('');
    }
    const num = parseInt(color, 16);
    let r = (num >> 16) & 0xff;
    let g = (num >> 8) & 0xff;
    let b = num & 0xff;
    r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
    g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
    b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
    return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).padStart(6, '0').toUpperCase();
  }

  hexToRgba(hex, alpha) {
    let color = hex.startsWith('#') ? hex.slice(1) : hex;
    if (color.length === 3) color = color.split('').map(c => c + c).join('');
    const num = parseInt(color, 16);
    return `rgba(${(num >> 16) & 0xff}, ${(num >> 8) & 0xff}, ${num & 0xff}, ${alpha})`;
  }

  connectedCallback() {
    this.color = this.getAttribute('color') || '#c9b8f0'; // lavender
    this.size = parseFloat(this.getAttribute('size')) || 1;
    
    this.folderBackColor = this.darkenColor(this.color, 0.08);
    // Dark theme paper colors - slightly off-white/light gray
    this.paper1 = this.darkenColor('#ffffff', 0.1);
    this.paper2 = this.darkenColor('#ffffff', 0.05);
    this.paper3 = '#ffffff';

    this.render();
    this.attachEvents();
  }

  getOpenTransform(index) {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)';
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)';
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)';
    return '';
  }

  render() {
    const scaleStyle = `transform: scale(${this.size}); transform-origin: center;`;
    
    // Glassmorphism setup
    const backRgba = this.hexToRgba(this.folderBackColor, 0.3);
    const frontRgba = this.hexToRgba(this.color, 0.4);
    
    this.innerHTML = `
      <div style="${scaleStyle}" class="folder-wrapper inline-block">
        <!-- Using a specific group class 'folder-group' so we can handle hover manually if needed -->
        <div class="folder-group relative transition-all duration-200 ease-in cursor-pointer focus:outline-none hover:-translate-y-2"
             style="--folder-color: ${this.color}; --folder-back-color: ${this.folderBackColor};"
             tabindex="0" role="button" aria-expanded="false" aria-label="Open folder">
             
          <div class="relative w-[100px] h-[80px] rounded-tl-0 rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px] shadow-[0_8px_32px_rgba(0,0,0,0.3)] backdrop-blur-md border border-white/20"
               style="background-color: ${backRgba};">
            <span class="absolute z-0 bottom-[98%] left-[-1px] w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-0 rounded-br-0 border-t border-l border-r border-white/20 backdrop-blur-md"
                  style="background-color: ${backRgba};"></span>
            
            <!-- Paper 0 -->
            <div class="paper absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out transform -translate-x-1/2 translate-y-[10%] w-[70%] h-[80%] shadow-lg border border-white/40"
                 data-index="0"
                 style="background-color: ${this.paper1}; border-radius: 10px;">
                 <div class="w-full h-full flex items-center justify-center text-deep">
                   <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-50"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                 </div>
            </div>
                 
            <!-- Paper 1 -->
            <div class="paper absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out transform -translate-x-1/2 translate-y-[10%] w-[80%] h-[70%] shadow-lg border border-white/50"
                 data-index="1"
                 style="background-color: ${this.paper2}; border-radius: 10px;">
                 <div class="w-full h-full flex items-center justify-center text-deep">
                   <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-50"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                 </div>
            </div>
                 
            <!-- Paper 2 -->
            <div class="paper absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out transform -translate-x-1/2 translate-y-[10%] w-[90%] h-[60%] shadow-lg border border-white/60"
                 data-index="2"
                 style="background-color: ${this.paper3}; border-radius: 10px;">
                 <div class="w-full h-full flex items-center justify-center text-deep">
                   <svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" class="opacity-50"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                 </div>
            </div>
                 
            <!-- Folder Front Cover (Right side) -->
            <div class="folder-front folder-front-right absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out backdrop-blur-md border border-white/20"
                 style="background-color: ${frontRgba}; border-radius: 5px 10px 10px 10px;"></div>
                 
            <!-- Folder Front Cover (Left side) -->
            <div class="folder-front folder-front-left absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out backdrop-blur-md border border-white/20"
                 style="background-color: ${frontRgba}; border-radius: 5px 10px 10px 10px;"></div>

            <!-- Folder Label (Front) -->
            <div class="folder-label absolute z-40 inset-0 flex items-center justify-center pointer-events-none transition-opacity duration-300">
              <div class="flex items-center gap-1 bg-white/10 backdrop-blur-xl px-[6px] py-[2px] rounded-full border border-white/30 shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                <span class="text-white font-serif italic text-[7px] tracking-widest uppercase">Discover ✦</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEvents() {
    const group = this.querySelector('.folder-group');
    const papers = this.querySelectorAll('.paper');
    const frontRight = this.querySelector('.folder-front-right');
    const frontLeft = this.querySelector('.folder-front-left');
    const label = this.querySelector('.folder-label');

    // Handle manual hover effect for front covers to avoid relying on complex Tailwind arbitrary variants in JS injected HTML
    group.addEventListener('mouseenter', () => {
      if (!this.open) {
        frontRight.style.transform = 'skew(15deg) scaleY(0.6)';
        frontLeft.style.transform = 'skew(-15deg) scaleY(0.6)';
        papers.forEach(paper => {
          paper.classList.remove('translate-y-[10%]');
          paper.classList.add('translate-y-0');
        });
      }
    });

    group.addEventListener('mouseleave', () => {
      if (!this.open) {
        frontRight.style.transform = '';
        frontLeft.style.transform = '';
        papers.forEach(paper => {
          paper.classList.add('translate-y-[10%]');
          paper.classList.remove('translate-y-0');
        });
      }
    });

    const toggleOpen = (e) => {
      if (e) e.preventDefault();
      this.open = !this.open;
      
      if (this.open) {
        group.classList.remove('hover:-translate-y-2');
        group.style.transform = 'translateY(-8px)';
        group.setAttribute('aria-expanded', 'true');
        group.setAttribute('aria-label', 'Close folder');
        
        // Front covers stay open
        frontRight.style.transform = 'skew(15deg) scaleY(0.6)';
        frontLeft.style.transform = 'skew(-15deg) scaleY(0.6)';
        
        // Hide label
        if (label) label.style.opacity = '0';
        
        // Papers pop out
        papers.forEach((paper, i) => {
          paper.classList.remove('transform', '-translate-x-1/2', 'translate-y-[10%]', 'translate-y-0');
          paper.classList.add('hover:scale-110');
          if (i === 0) { paper.classList.replace('h-[80%]', 'h-[80%]'); }
          if (i === 1) { paper.classList.replace('h-[70%]', 'h-[80%]'); }
          if (i === 2) { paper.classList.replace('h-[60%]', 'h-[80%]'); }
          
          paper.style.transform = this.getOpenTransform(i);
        });

        // Dispatch custom event when opened
        this.dispatchEvent(new CustomEvent('folder-opened', { bubbles: true, composed: true }));
      } else {
        group.classList.add('hover:-translate-y-2');
        group.style.transform = '';
        group.setAttribute('aria-expanded', 'false');
        group.setAttribute('aria-label', 'Open folder');
        
        // Reset covers (they will naturally go back or trigger mouseleave)
        frontRight.style.transform = '';
        frontLeft.style.transform = '';

        // Show label
        if (label) label.style.opacity = '1';
        
        // Papers go back
        papers.forEach((paper, i) => {
          paper.classList.add('transform', '-translate-x-1/2', 'translate-y-[10%]');
          paper.classList.remove('hover:scale-110', 'translate-y-0');
          if (i === 0) { paper.classList.replace('h-[80%]', 'h-[80%]'); }
          if (i === 1) { paper.classList.replace('h-[80%]', 'h-[70%]'); }
          if (i === 2) { paper.classList.replace('h-[80%]', 'h-[60%]'); }
          
          paper.style.transform = '';
          this.paperOffsets[i] = { x: 0, y: 0 };
        });

        // Dispatch closed event if needed
        this.dispatchEvent(new CustomEvent('folder-closed', { bubbles: true, composed: true }));
      }
    };

    group.addEventListener('click', toggleOpen);
    group.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        toggleOpen(e);
      }
    });

    papers.forEach((paper, i) => {
      paper.addEventListener('mousemove', (e) => {
        if (!this.open) return;
        const rect = paper.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const offsetX = (e.clientX - centerX) * 0.15;
        const offsetY = (e.clientY - centerY) * 0.15;
        this.paperOffsets[i] = { x: offsetX, y: offsetY };
        paper.style.transform = `${this.getOpenTransform(i)} translate(${offsetX}px, ${offsetY}px)`;
      });

      paper.addEventListener('mouseleave', () => {
        if (!this.open) return;
        this.paperOffsets[i] = { x: 0, y: 0 };
        paper.style.transform = this.getOpenTransform(i);
      });
    });
  }
}

customElements.define('animated-folder', AnimatedFolder);
