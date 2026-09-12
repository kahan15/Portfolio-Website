# Portfolio

Personal site for Kahan Jash. React + Vite, with a WebGL particle field in the hero.

## Run it

```bash
npm install
npm run dev
```

Open the URL Vite prints, usually http://localhost:5173.

## Editing content

Everything you'll want to change is in `src/data.js` — name, blurb, roles,
projects, skills, contact links. Nothing else needs touching to keep the site
current.

To change the word the particles spell in the hero, edit the call to
`textShape("KAHAN", COUNT)` near the top of the shape list in
`src/ParticleField.jsx`. Keep it short; long words get small.

## How the hero works

24,000 points live in a single `THREE.Points` object. Each point carries two
positions as vertex attributes — where it is coming from and where it is going —
and the vertex shader interpolates between them, staggered per particle so the
cloud arrives as a wave. Four shapes cycle: the name, an order book depth
profile, a Fibonacci sphere, and a sine surface. Click the hero to advance.

The name is produced by rasterising text to an offscreen canvas and keeping the
pixels that landed on a glyph, so there is no font geometry or model to load.

Performance notes: device pixel ratio is capped at 2, the render loop pauses
when the hero scrolls off screen or the tab is hidden, and
`prefers-reduced-motion` renders one static frame instead of animating.

## Deploy on Render

Deploy as a **Static Site**, not a Web Service. Static sites on Render are free
and always warm — a Web Service on the free tier sleeps and can leave a visitor
staring at a blank page for 30–50 seconds on the first request.

- New → Static Site → connect this repo
- Build command: `npm install && npm run build`
- Publish directory: `dist`

`render.yaml` is included if you'd rather set it up as a blueprint.
