import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   SignalTrace — the hero, and now the spine of the whole site.

   One plotted line. It enters at the far left as noise and converges into a
   settled curve: the shape of a system being measured until it behaves.

   In horizontal mode the canvas stays viewport-sized and fixed, but samples
   the signal at ABSOLUTE x (scroll offset + screen x). So the line is
   continuous for the entire length of the site, the way a chart recorder
   draws onto a moving roll — you are travelling along one measurement, not
   restarting it per section.

   Plain 2D canvas, no dependencies, a few KB against the 457KB three.js build
   it replaced.

   Guardrails:
     - devicePixelRatio capped at 2
     - the loop stops when the tab is hidden or the canvas is off-screen
     - prefers-reduced-motion draws one settled frame and never starts a loop
     - purely decorative: aria-hidden, all real text lives in the DOM above it
--------------------------------------------------------------------------- */

// Matches the --ink / --rust / --pine / --rule tokens in styles.css.
const INK = "#241E17";
const RUST = "#9B451B";
const PINE = "#256156";
const RULE = "#D6CCB8";

// How far the signal takes to settle, in CSS pixels of travel.
const SETTLE_DISTANCE = 1400;

// Deterministic value noise — no Math.random, so the curve is identical on
// every load and across resizes. A drifting hero would read as a glitch.
function noise(x, seed) {
  const s = Math.sin(x * 12.9898 + seed * 78.233) * 43758.5453;
  return s - Math.floor(s) - 0.5;
}

function fbm(x, seed) {
  let v = 0;
  let amp = 0.5;
  let freq = 1;
  for (let o = 0; o < 4; o++) {
    const xi = Math.floor(x * freq);
    const xf = x * freq - xi;
    const sm = xf * xf * (3 - 2 * xf);
    const a = noise(xi, seed + o);
    const b = noise(xi + 1, seed + o);
    v += (a + (b - a) * sm) * amp;
    amp *= 0.5;
    freq *= 2.1;
  }
  return v;
}

export default function SignalTrace({ offsetRef }) {
  const wrapRef = useRef(null);
  const canvasRef = useRef(null);
  const pointerRef = useRef({ x: -9999, y: -9999, active: false });

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    let visible = true;
    let t0 = 0;
    let disposed = false;

    const resize = () => {
      const r = wrap.getBoundingClientRect();
      w = Math.max(1, Math.floor(r.width));
      h = Math.max(1, Math.floor(r.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    /* The calibration grid the trace is plotted against. It scrolls with the
       signal, so the ruling reads as graph paper passing under the pen. */
    const drawGrid = (ox) => {
      const step = w < 640 ? 48 : 72;
      ctx.save();
      ctx.strokeStyle = RULE;
      ctx.lineWidth = 1;

      const first = Math.floor(ox / step) * step;
      for (let ax = first; ax < ox + w + step; ax += step) {
        const x = ax - ox;
        const major = Math.round(ax / step) % 4 === 0;
        ctx.globalAlpha = major ? 0.85 : 0.5;
        ctx.beginPath();
        if (major) {
          ctx.moveTo(Math.round(x) + 0.5, 0);
          ctx.lineTo(Math.round(x) + 0.5, h);
        } else {
          ctx.moveTo(Math.round(x) + 0.5, h * 0.5 - 5);
          ctx.lineTo(Math.round(x) + 0.5, h * 0.5 + 5);
        }
        ctx.stroke();
      }

      // the baseline the signal is measured against
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.moveTo(0, Math.round(h * 0.5) + 0.5);
      ctx.lineTo(w, Math.round(h * 0.5) + 0.5);
      ctx.stroke();
      ctx.restore();
    };

    /* Sample at ABSOLUTE x. ax is measured from the very start of the site,
       which is what makes the line continuous across panels. */
    const sample = (ax, screenX, time, settle) => {
      const mid = h * 0.5;
      const u = ax / 900;

      const carrier =
        Math.sin(u * 2.1 + time * 0.22) * (h * 0.085) +
        Math.sin(u * 4.7 - time * 0.14) * (h * 0.028);

      // Noise decays with distance travelled, and again as `settle` -> 1.
      const convergence = Math.pow(
        Math.max(0, 1 - ax / SETTLE_DISTANCE),
        1.7
      );
      const chaos =
        fbm(u * 9 + time * 0.35, 3) * (h * 0.3) * convergence * (1 - settle * 0.82);

      let y = mid + carrier + chaos;

      // cursor bends the trace locally, like a field line
      const p = pointerRef.current;
      if (p.active) {
        const dx = screenX - p.x;
        const dy = y - p.y;
        const d2 = dx * dx + dy * dy;
        const radius = Math.min(w, h) * 0.32;
        if (d2 < radius * radius) {
          const d = Math.sqrt(d2) || 1;
          const falloff = 1 - d / radius;
          y += (dy / d) * falloff * falloff * (h * 0.16);
        }
      }
      return y;
    };

    const draw = (time, settle) => {
      const ox = offsetRef?.current || 0;
      ctx.clearRect(0, 0, w, h);
      drawGrid(ox);

      const steps = Math.max(120, Math.min(420, Math.floor(w / 3)));
      const pts = new Array(steps + 1);
      for (let i = 0; i <= steps; i++) {
        const sx = (i / steps) * w;
        pts[i] = [sx, sample(ox + sx, sx, time, settle)];
      }

      const stroke = (style, width, alpha) => {
        ctx.save();
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.globalAlpha = alpha;
        ctx.strokeStyle = style;
        ctx.lineWidth = width;
        ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y)));
        ctx.stroke();
        ctx.restore();
      };

      // soft under-glow so the line reads as emitted, not drawn
      stroke(RUST, 7, 0.1);

      // the trace: rust while it is still noisy, pine once settled. The
      // gradient is positioned in absolute space so the colour transition
      // stays pinned to the signal, not to the screen.
      const gx0 = -ox;
      const grad = ctx.createLinearGradient(gx0, 0, gx0 + SETTLE_DISTANCE * 1.5, 0);
      grad.addColorStop(0, RUST);
      grad.addColorStop(0.55, RUST);
      grad.addColorStop(0.85, PINE);
      grad.addColorStop(1, PINE);
      stroke(grad, 1.6, 1);

      // faint ink dusting once the signal has settled, like plotter residue
      ctx.save();
      ctx.fillStyle = INK;
      ctx.globalAlpha = 0.1;
      for (let i = 0; i <= steps; i += 6) {
        const [x, y] = pts[i];
        if (ox + x < SETTLE_DISTANCE * 0.6) continue;
        ctx.fillRect(Math.round(x), Math.round(y), 1, 1);
      }
      ctx.restore();
    };

    resize();

    if (reduced) {
      // One settled frame. No loop, no pointer reaction.
      draw(0, 1);
      const onResizeStatic = () => {
        resize();
        draw(0, 1);
      };
      window.addEventListener("resize", onResizeStatic);
      const roStatic = new ResizeObserver(onResizeStatic);
      roStatic.observe(wrap);
      return () => {
        disposed = true;
        roStatic.disconnect();
        window.removeEventListener("resize", onResizeStatic);
      };
    }

    const tick = (now) => {
      if (disposed) return;
      raf = requestAnimationFrame(tick);
      if (!visible || document.hidden) return;
      if (!t0) t0 = now;
      const elapsed = (now - t0) / 1000;
      const s = Math.min(elapsed / 2.6, 1);
      draw(elapsed, 1 - Math.pow(1 - s, 3));
    };
    raf = requestAnimationFrame(tick);

    const onMove = (e) => {
      const r = wrap.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - r.left,
        y: e.clientY - r.top,
        active: true,
      };
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };
    // The canvas sits behind the content, so listen on the window: the cursor
    // is almost always over a panel, not over the canvas itself.
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    io.observe(wrap);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    // The layout mode (vertical -> horizontal) resolves in an effect after
    // first paint and changes this element's height without a window resize.
    // Without this the canvas keeps its first measurement and the plot is
    // drawn thousands of pixels below the visible area.
    const ro = new ResizeObserver(resize);
    ro.observe(wrap);

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [offsetRef]);

  return (
    <div className="trace" ref={wrapRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}
