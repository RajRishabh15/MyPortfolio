import { useEffect, useRef } from 'react';

// Entire canvas star/sparkle/dust/shooting-star animation from script.js
export default function Background() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;
    let mx = 0, my = 0;

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors = [
      'rgba(201,184,240,', 'rgba(244,167,185,', 'rgba(168,216,240,',
      'rgba(255,211,182,', 'rgba(255,255,255,', 'rgba(168,230,207,',
      'rgba(255,224,163,',
    ];

    // ── Stars ──────────────────────────────────────────────────────────────
    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      r: Math.random() * 1.4 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.08 + 0.01,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinkleOffset: Math.random() * Math.PI * 2,
      opacity: Math.random() * 0.6 + 0.1,
    }));

    // ── Glitters / sparkles ────────────────────────────────────────────────
    const glitters = Array.from({ length: 120 }, () => {
      const vx = (Math.random() - 0.5) * 0.3;
      const vy = (Math.random() - 0.5) * 0.3;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 3 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: Math.random(),
        lifeSpeed: Math.random() * 0.008 + 0.003,
        vx, vy, baseVx: vx, baseVy: vy,
      };
    });

    // ── Shooting stars ─────────────────────────────────────────────────────
    const shooters = [];
    function spawnShooter() {
      shooters.push({
        x: Math.random() * window.innerWidth * 0.7,
        y: Math.random() * window.innerHeight * 0.4,
        len: Math.random() * 120 + 60,
        speed: Math.random() * 6 + 5,
        angle: Math.PI / 6 + (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * 3)],
        life: 1,
      });
    }
    spawnShooter();
    const shooterInterval = setInterval(spawnShooter, 2800);

    // ── Dust particles ──────────────────────────────────────────────────────
    const dustParticles = Array.from({ length: 25 }, () => {
      const vx = (Math.random() - 0.5) * 0.15;
      const vy = (Math.random() - 0.5) * 0.15;
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 80 + 30,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: Math.random() * 0.04 + 0.01,
        vx, vy, baseVx: vx, baseVy: vy,
      };
    });

    const onMouseMove = (e) => { mx = e.clientX; my = e.clientY; };
    document.addEventListener('mousemove', onMouseMove);

    let t = 0;

    function drawSparkle(x, y, size, color, opacity) {
      ctx.save();
      ctx.translate(x, y);
      ctx.globalAlpha = opacity;
      for (let a = 0; a < 4; a++) {
        ctx.save();
        ctx.rotate((a / 4) * Math.PI * 2);
        const grad = ctx.createLinearGradient(0, 0, 0, -size * 2.5);
        grad.addColorStop(0, color + '1)');
        grad.addColorStop(0.3, color + opacity + ')');
        grad.addColorStop(1, color + '0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-size * 0.15, 0);
        ctx.lineTo(0, -size * 2.5);
        ctx.lineTo(size * 0.15, 0);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }
      ctx.beginPath();
      ctx.arc(0, 0, size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = color + (opacity * 1.5) + ')';
      ctx.fill();
      ctx.restore();
    }

    function loop() {
      t += 0.016;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dust
      for (const d of dustParticles) {
        const dx = d.x - mx, dy = d.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 200 && dist > 0) {
          const force = (200 - dist) / 200;
          d.vx += (dx / dist) * force * 0.05;
          d.vy += (dy / dist) * force * 0.05;
        }
        d.vx += (d.baseVx - d.vx) * 0.02;
        d.vy += (d.baseVy - d.vy) * 0.02;
        d.x += d.vx; d.y += d.vy;
        if (d.x < -200) d.x = canvas.width + 200;
        if (d.x > canvas.width + 200) d.x = -200;
        if (d.y < -200) d.y = canvas.height + 200;
        if (d.y > canvas.height + 200) d.y = -200;
        const g = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.r);
        g.addColorStop(0, d.color + (d.opacity * 3) + ')');
        g.addColorStop(1, d.color + '0)');
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stars
      for (const s of stars) {
        s.y += s.speed; s.x += s.speed * 0.2;
        if (s.y > canvas.height + 5) { s.y = -5; s.x = Math.random() * canvas.width; }
        if (s.x > canvas.width  + 5) { s.x = -5; }
        const twinkle = 0.5 + 0.5 * Math.sin(t * s.twinkleSpeed * 60 + s.twinkleOffset);
        ctx.globalAlpha = s.opacity * twinkle;
        ctx.fillStyle = s.color + '1)';
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Glitters
      for (const g of glitters) {
        const dx = g.x - mx, dy = g.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 150 && dist > 0) {
          const force = (150 - dist) / 150;
          g.vx += (dx / dist) * force * 0.2;
          g.vy += (dy / dist) * force * 0.2;
        }
        g.vx += (g.baseVx - g.vx) * 0.05;
        g.vy += (g.baseVy - g.vy) * 0.05;
        g.x += g.vx; g.y += g.vy;
        g.life += g.lifeSpeed;
        if (g.life > 1) {
          g.life = 0;
          g.x = Math.random() * canvas.width;
          g.y = Math.random() * canvas.height;
          g.color = colors[Math.floor(Math.random() * colors.length)];
          g.size = Math.random() * 3 + 1.5;
        }
        drawSparkle(g.x, g.y, g.size, g.color, Math.sin(g.life * Math.PI) * 0.85);
      }

      // Shooting stars
      for (let i = shooters.length - 1; i >= 0; i--) {
        const s = shooters[i];
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;
        s.life -= 0.018;
        if (s.life <= 0 || s.x > canvas.width + 200 || s.y > canvas.height + 200) {
          shooters.splice(i, 1); continue;
        }
        const tailX = s.x - Math.cos(s.angle) * s.len;
        const tailY = s.y - Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(tailX, tailY, s.x, s.y);
        grad.addColorStop(0, s.color + '0)');
        grad.addColorStop(0.7, s.color + (s.life * 0.5) + ')');
        grad.addColorStop(1, s.color + (s.life * 0.9) + ')');
        ctx.globalAlpha = s.life;
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.shadowBlur = 8;
        ctx.shadowColor = s.color + '0.8)';
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = s.life * 0.9;
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      animId = requestAnimationFrame(loop);
    }
    loop();

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(shooterInterval);
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <>
      <div className="bg-orbs">
        <div className="orb orb1" />
        <div className="orb orb2" />
        <div className="orb orb3" />
        <div className="orb orb4" />
      </div>
      <canvas ref={canvasRef} id="starCanvas" />
    </>
  );
}
