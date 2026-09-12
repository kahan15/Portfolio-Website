import { useCallback, useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   Horizontal scroll, without hijacking the wheel.

   The page keeps a real vertical scrollbar: the outer <div class="stage"> is
   given a height of (trackWidth - viewportWidth + viewportHeight), and the
   track inside a sticky viewport is translated on X in proportion to scrollY.

   This matters. Listening for `wheel` and calling preventDefault breaks
   trackpad momentum, keyboard paging, scrollbar dragging, browser find, and
   most assistive tech. Mapping real vertical scroll distance onto an X
   transform keeps every one of those working — the browser still thinks it is
   scrolling a tall document, because it is.

   Falls back to ordinary vertical flow when `enabled` is false (narrow
   viewports, or prefers-reduced-motion).
--------------------------------------------------------------------------- */

const clamp = (v, a, b) => Math.min(Math.max(v, a), b);

export function useHorizontal({ stageRef, viewportRef, trackRef, offsetRef, enabled }) {
  const [active, setActive] = useState("top");
  const [progress, setProgress] = useState(0);
  const panelsRef = useRef([]);
  const distanceRef = useRef(0);

  useEffect(() => {
    const stage = stageRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!stage || !viewport || !track) return;

    // Vertical fallback: strip every inline style this hook may have set.
    if (!enabled) {
      stage.style.height = "";
      track.style.transform = "";
      offsetRef.current = 0;
      distanceRef.current = 0;
      setProgress(0);
      return;
    }

    let raf = 0;

    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const trackWidth = track.scrollWidth;
      const distance = Math.max(0, trackWidth - vw);
      distanceRef.current = distance;
      stage.style.height = `${distance + vh}px`;

      // Cache each panel's horizontal span so the rail can map position to a
      // section without reading layout on every frame.
      panelsRef.current = Array.from(track.children)
        .filter((el) => el.id)
        .map((el) => ({
          id: el.id,
          left: el.offsetLeft,
          right: el.offsetLeft + el.offsetWidth,
        }));

      apply();
    };

    const apply = () => {
      raf = 0;
      const distance = distanceRef.current;
      const p = distance > 0 ? clamp(window.scrollY / distance, 0, 1) : 0;
      const x = p * distance;

      track.style.transform = `translate3d(${-x}px, 0, 0)`;
      offsetRef.current = x;
      setProgress(p);

      // The section under the middle of the screen is the active one.
      const probe = x + window.innerWidth / 2;
      const hit = panelsRef.current.find(
        (pn) => probe >= pn.left && probe < pn.right
      );
      if (hit) setActive(hit.id);
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };

    measure();

    // Fonts land after first paint and change panel widths, so re-measure.
    if (document.fonts?.ready) document.fonts.ready.then(measure).catch(() => {});

    const ro = new ResizeObserver(measure);
    ro.observe(track);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", measure);

    /* Keyboard focus. Tabbing to an off-screen link would normally make the
       browser scroll it into view *inside* the overflow-hidden viewport,
       which desyncs the transform and strands the content. Intercept it:
       scroll the window so the focused element is on screen, and undo any
       internal scroll the browser managed to apply. */
    const onFocusIn = (e) => {
      const el = e.target;
      if (!el || !track.contains(el)) return;
      viewport.scrollLeft = 0;
      viewport.scrollTop = 0;

      const rect = el.getBoundingClientRect();
      const vw = window.innerWidth;
      const x = offsetRef.current;
      const elLeft = rect.left + x;
      const elRight = elLeft + rect.width;
      const margin = Math.min(vw * 0.15, 160);

      let targetX = x;
      if (elLeft < x + margin) {
        targetX = elLeft - margin;
      } else if (elRight > x + vw - margin) {
        // Bring the right edge in, but never so far that the left edge is
        // pushed off — an element wider than the screen aligns left instead.
        targetX = Math.min(elRight - vw + margin, elLeft - margin);
      }

      if (targetX !== x) {
        // "instant", not "auto": `auto` defers to html { scroll-behavior:
        // smooth }, so the focused element would still be off-screen for the
        // length of the animation — which is exactly when a keyboard user
        // needs to see it.
        window.scrollTo({
          top: clamp(targetX, 0, distanceRef.current),
          behavior: "instant",
        });
      }
    };
    document.addEventListener("focusin", onFocusIn);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", measure);
      document.removeEventListener("focusin", onFocusIn);
    };
  }, [enabled, stageRef, viewportRef, trackRef, offsetRef]);

  /* Rail links can't be plain anchors in horizontal mode: the target lives
     inside a transformed container, so the browser's native anchor scroll
     lands in the wrong place. Convert the panel's X into a scrollY. */
  const scrollToPanel = useCallback(
    (id) => {
      if (!enabled) {
        document.getElementById(id)?.scrollIntoView({ block: "start" });
        return;
      }
      const pn = panelsRef.current.find((p) => p.id === id);
      if (!pn) return;
      window.scrollTo({
        top: clamp(pn.left, 0, distanceRef.current),
        behavior: "smooth",
      });
    },
    [enabled]
  );

  return { active, setActive, progress, scrollToPanel };
}

/* True only when a horizontal layout is actually appropriate: enough width to
   read a panel, and motion not suppressed. */
export function useHorizontalEnabled(minWidth = 1080) {
  const [on, setOn] = useState(false);

  useEffect(() => {
    const wide = window.matchMedia(`(min-width: ${minWidth}px)`);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const evaluate = () => setOn(wide.matches && !still.matches);
    evaluate();
    wide.addEventListener("change", evaluate);
    still.addEventListener("change", evaluate);
    return () => {
      wide.removeEventListener("change", evaluate);
      still.removeEventListener("change", evaluate);
    };
  }, [minWidth]);

  return on;
}
