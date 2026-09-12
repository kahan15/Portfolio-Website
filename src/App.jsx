import { useEffect, useRef, useState } from "react";
import SignalTrace from "./SignalTrace";
import { useHorizontal, useHorizontalEnabled } from "./useHorizontal";
import {
  profile,
  bio,
  measured,
  selected,
  experience,
  education,
  publications,
  projects,
  skills,
  achievements,
} from "./data";

const SECTIONS = [
  { id: "top", label: "Start" },
  { id: "measured", label: "Measured" },
  { id: "work", label: "Work" },
  { id: "projects", label: "Projects" },
  { id: "toolkit", label: "Toolkit" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

/* One project list, not two. The three strongest lead and carry an extra
   detail line plus a status chip, so hierarchy comes from the density of real
   content rather than from a large empty image frame. */
const ALL_PROJECTS = [
  ...selected.map((p) => ({ ...p, lead: true })),
  ...projects.map((p) => ({ ...p, lead: false })),
];

const reducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Reveal. In horizontal mode the panels live inside a transformed track, but
   IntersectionObserver reports against the real viewport rect and a transform
   moves the element's box, so the same observer works either way. Once a
   block is revealed we stop watching it. */
function useReveal(enabled) {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll("[data-reveal]"));

    if (reducedMotion()) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    nodes.forEach((n) => {
      n.querySelectorAll("[data-stagger]").forEach((c, i) =>
        c.style.setProperty("--i", i)
      );
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-in");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 8% -8% 8%", threshold: 0.04 }
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [enabled]);
}

function Words({ text, from = 0 }) {
  const parts = String(text).split(" ");
  return parts.map((w, i) => (
    <span key={`${w}-${i}`}>
      <span className="rw" style={{ "--i": from + i }}>
        {w}
      </span>
      {i < parts.length - 1 ? " " : null}
    </span>
  ));
}

/* Cursor-tracked card ring. One delegated listener, writes coalesced into a
   single rAF so a fast sweep can't queue more style writes than we paint. */
function useCursorCards(ref) {
  useEffect(() => {
    const grid = ref.current;
    if (!grid || reducedMotion()) return;

    let raf = 0;
    let pending = null;

    const flush = () => {
      raf = 0;
      if (!pending) return;
      pending.card.style.setProperty("--mx", `${pending.x}px`);
      pending.card.style.setProperty("--my", `${pending.y}px`);
      pending = null;
    };

    const onMove = (e) => {
      const card = e.target.closest(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      pending = { card, x: e.clientX - r.left, y: e.clientY - r.top };
      if (!raf) raf = requestAnimationFrame(flush);
    };

    grid.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      grid.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);
}

function Rail({ active, progress, onJump, horizontal }) {
  return (
    <nav className={`rail${horizontal ? " rail-h" : ""}`} aria-label="Sections">
      <div className="rail-track" aria-hidden="true">
        <div className="rail-fill" style={{ "--p": progress }} />
      </div>
      <ul>
        {SECTIONS.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={active === s.id ? "is-active" : ""}
              aria-current={active === s.id ? "true" : undefined}
              onClick={(e) => {
                if (!horizontal) return;
                e.preventDefault();
                onJump(s.id);
              }}
            >
              <span className="rail-tick" aria-hidden="true" />
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function SectionHead({ index, children }) {
  return (
    <h2 className="section-head">
      <span className="idx" aria-hidden="true">
        {String(index).padStart(2, "0")}
      </span>
      {children}
    </h2>
  );
}

/* A repo link, or nothing. Every card carries the same tech-tag footer, so a
   project without a public repo reads as "described, not linked" rather than
   as a card with a hole in it. */
function Title({ title, link }) {
  if (!link) return <>{title}</>;
  return (
    <a className="lnk" href={link} target="_blank" rel="noreferrer">
      <span className="out">{title}</span>
    </a>
  );
}

function Panel({ id, className = "", children }) {
  return (
    <section className={`panel ${className}`} id={id} data-reveal>
      <div className="panel-inner">{children}</div>
    </section>
  );
}

export default function App() {
  const horizontal = useHorizontalEnabled(1080);

  const stageRef = useRef(null);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const gridRef = useRef(null);
  const offsetRef = useRef(0);

  const [heroIn, setHeroIn] = useState(false);
  const [verticalActive, setVerticalActive] = useState("top");
  const [verticalProgress, setVerticalProgress] = useState(0);

  const {
    active: hActive,
    progress: hProgress,
    scrollToPanel,
  } = useHorizontal({
    stageRef,
    viewportRef,
    trackRef,
    offsetRef,
    enabled: horizontal,
  });

  useReveal(horizontal);
  useCursorCards(gridRef);

  // The hero arrives on load; it is already in view, so scroll can't trigger it.
  useEffect(() => {
    if (reducedMotion()) {
      setHeroIn(true);
      return;
    }
    const t = setTimeout(() => setHeroIn(true), 120);
    return () => clearTimeout(t);
  }, []);

  // Vertical mode keeps observer-driven rail state and scroll progress.
  useEffect(() => {
    if (horizontal) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setVerticalActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });

    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setVerticalProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0);
      // Keep the plot travelling in vertical mode too, so the trace reads as
      // one continuous measurement in both layouts rather than freezing.
      offsetRef.current = window.scrollY;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [horizontal]);

  const active = horizontal ? hActive : verticalActive;
  const railProgress = horizontal ? hProgress : verticalProgress;

  return (
    <>
      <a className="skip" href="#projects">
        Skip to the work
      </a>

      <Rail
        active={active}
        progress={railProgress}
        onJump={scrollToPanel}
        horizontal={horizontal}
      />

      <div
        className={`stage${horizontal ? " is-horizontal" : ""}`}
        ref={stageRef}
      >
        <div className="viewport" ref={viewportRef}>
          <SignalTrace offsetRef={offsetRef} />

          <div className="track" ref={trackRef}>
            {/* ----------------------------------------------------- hero */}
            <section className="panel panel-hero" id="top">
              <div className={`panel-inner${heroIn ? " is-in" : ""}`}>
                <p className="hero-role eyebrow">
                  <Words text={profile.title} />
                </p>
                <h1 className="hero-name">
                  <Words text={profile.name} from={3} />
                </h1>
                <p className="hero-blurb">
                  <Words text={bio.hero} from={6} />
                </p>
                <ul className="hero-links">
                  <li>
                    <a className="lnk" href={`mailto:${profile.email}`}>
                      Email
                    </a>
                  </li>
                  <li>
                    <a
                      className="lnk"
                      href={profile.github}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="out">GitHub</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="lnk"
                      href={profile.linkedin}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="out">LinkedIn</span>
                    </a>
                  </li>
                  <li>
                    <a
                      className="lnk"
                      href={profile.scholar}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <span className="out">Scholar</span>
                    </a>
                  </li>
                </ul>
                <p className="hero-foot mono">
                  <span className="settled">signal settled</span>
                </p>
              </div>
            </section>

            {/* ------------------------------------------------- measured */}
            <Panel id="measured" className="panel-measured">
              <h2 className="vh">Measured outcomes</h2>
              <div className="measured">
                {measured.map((m) => (
                  <div className="m-cell" key={m.label} data-stagger>
                    <p className="m-label eyebrow">{m.label}</p>
                    <p className="m-value">
                      {m.from && (
                        <>
                          <span className="m-from">{m.from}</span>
                          <span className="m-arrow" aria-hidden="true">
                            →
                          </span>
                        </>
                      )}
                      <span className="m-to">{m.to}</span>
                    </p>
                    <p className="m-note">{m.note}</p>
                  </div>
                ))}
              </div>
            </Panel>

            {/* ----------------------------------------------------- work */}
            <Panel id="work" className="panel-work">
              <SectionHead index={1}>Work</SectionHead>
              <ol className="timeline">
                {experience.map((job, i) => (
                  <li key={i} data-stagger>
                    <p className="tl-period mono">{job.period}</p>
                    <h3>{job.role}</h3>
                    <p className="tl-org">
                      {job.org} <span className="tl-place">{job.place}</span>
                    </p>
                    <ul>
                      {job.points.map((p, j) => (
                        <li key={j}>{p}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </Panel>

            {/* ------------------------------------------------- projects */}
            <Panel id="projects" className="panel-projects">
              <SectionHead index={2}>Projects</SectionHead>
              <div className="grid" ref={gridRef}>
                {ALL_PROJECTS.map((p) => (
                  <article
                    className={`card${p.lead ? " card-lead" : ""}`}
                    key={p.title}
                    data-stagger
                  >
                    <div className="card-top">
                      <h3>
                        <Title title={p.title} link={p.link} />
                      </h3>
                      {p.lead ? (
                        <span className="mono status" data-status={p.status}>
                          {p.status}
                        </span>
                      ) : (
                        <span className="mono card-year">{p.year}</span>
                      )}
                    </div>
                    <p>{p.summary}</p>
                    {p.lead && p.detail && (
                      <p className="card-detail">{p.detail}</p>
                    )}
                    <ul className="tags">
                      {p.tech.map((t) => (
                        <li key={t} className="mono">
                          {t}
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}
              </div>
            </Panel>

            {/* -------------------------------------------------- toolkit */}
            <Panel id="toolkit" className="panel-toolkit">
              <SectionHead index={3}>Toolkit</SectionHead>
              <div className="skills">
                {skills.map((s) => (
                  <div key={s.group} data-stagger>
                    <h3>{s.group}</h3>
                    <ul>
                      {s.items.map((i) => (
                        <li key={i}>{i}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Panel>

            {/* ---------------------------------------------------- about */}
            <Panel id="about" className="panel-about">
              <SectionHead index={4}>About</SectionHead>
              <div className="about">
                <div className="about-prose">
                  {bio.long.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
                <div className="about-side">
                  <h3>Education</h3>
                  {education.map((e) => (
                    <div className="edu" key={e.school}>
                      <p className="edu-school">{e.school}</p>
                      <p className="edu-degree">{e.degree}</p>
                      <p className="mono edu-period">{e.period}</p>
                      <p className="edu-note">{e.note}</p>
                    </div>
                  ))}
                </div>
                <div className="about-side">
                  <h3>Publications</h3>
                  <ul className="pub-list">
                    {publications.map((p) => (
                      <li key={p.link}>
                        <a
                          className="lnk"
                          href={p.link}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <span className="out">{p.title}</span>
                        </a>
                        <span className="mono pub-venue">{p.venue}</span>
                      </li>
                    ))}
                  </ul>

                  <h3 className="stacked">Recognition</h3>
                  <ul className="ach-list">
                    {achievements.map((a) => (
                      <li key={a}>{a}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Panel>

            {/* -------------------------------------------------- contact */}
            <Panel id="contact" className="panel-contact">
              <SectionHead index={5}>Contact</SectionHead>
              <p className="contact-line">
                Email is the fastest way to reach me.
              </p>
              <ul className="links">
                <li>
                  <a className="lnk" href={`mailto:${profile.email}`}>
                    {profile.email}
                  </a>
                </li>
                <li>
                  <a
                    className="lnk"
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="out">LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a
                    className="lnk"
                    href={profile.github}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="out">GitHub</span>
                  </a>
                </li>
                <li>
                  <a
                    className="lnk"
                    href={profile.scholar}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <span className="out">Google Scholar</span>
                  </a>
                </li>
              </ul>
              {profile.availability && (
                <p className="availability">{profile.availability}</p>
              )}
              <p className="foot mono">{profile.location}</p>
            </Panel>
          </div>
        </div>
      </div>
    </>
  );
}
