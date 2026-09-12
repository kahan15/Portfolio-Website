// Everything you'll want to edit lives in this file.
//
// Link policy: GitHub repositories only. A project with no public repo gets
// link: "" and the card simply renders without a link affordance.

export const profile = {
  name: "Kahan Jash",
  title: "Software Engineer",
  location: "Boston, MA",
  email: "jash.k@northeastern.edu",
  github: "https://github.com/kahan15",
  linkedin: "https://www.linkedin.com/in/kahan-jash-148477199/",
  scholar: "https://scholar.google.com/citations?user=nTekOVYAAAAJ",
  // Optional. Add a string here to show a line under Contact.
  availability: "",
};

export const bio = {
  hero:
    "I build AI systems and then measure whether they actually work, because the failures are the quiet ones.",
  long: [
    "I'm a software engineer and MS student at Northeastern University in Boston.",
    "Before grad school I spent nine months at Sarjen Systems building AI systems for four enterprise clients in life sciences: retrieval over regulated compliance documents, SOPs, and clinical notes, where every generated answer had to trace back to a record a reviewer could open and check. The work I'm proudest of there wasn't the system; it was the evaluation harness that showed it was running at 71% when everyone, including me, believed it was fine.",
    "I've published two IEEE papers on model compression and reinforcement learning, and I teach applied NLP to 200+ graduate students.",
    "Outside work I build things I'd use myself. Right now that's Territory Run, a GPS running game where closing a loop claims the ground inside it.",
  ],
};

// Set `featured: true` on any project to give it a full-height card with its
// extra `detail` paragraph. Everything else renders as a standard card.
export const selected = [
  {
    title: "Territory Run",
    featured: true,
    status: "In progress",
    summary:
      "A GPS running game. Close a loop, claim the ground inside it, defend it against friends. Thirty-day claim expiry, friends-only leaderboard.",
    detail:
      "Douglas-Peucker simplification over noisy GPS traces, and an AEQD projection so area maths holds at any latitude. Layered FastAPI backend, 49 tests, full rebuild after v0.1.",
    tech: ["SwiftUI", "FastAPI", "PostGIS", "Shapely", "Docker"],
    link: "",
    image: "",
  },
  {
    title: "Limit Order Book Simulator",
    status: "",
    summary:
      "Exchange matching semantics in the browser, running on synthetic order flow or live market data.",
    detail:
      "FIFO price-time priority with limit and market orders, partial fills, cancel-by-ID, and resting-price execution. Live mode streams level-2 depth and trades for BTC, ETH, and SOL with bounded auto-reconnect and no API key. Depth ladder, trade tape, price chart, and local paper trading with realized and unrealized PnL.",
    tech: ["TypeScript", "React", "Canvas", "Kraken WebSocket"],
    link: "https://github.com/kahan15/Limit-Order-Book-Simulator",
    image: "",
  },
  {
    title: "Workflow Lens",
    status: "",
    summary:
      "A CI configuration analyzer. Parses GitHub Actions YAML and flags missing caches, oversized runners, and absent concurrency cancels, with severity, a fix snippet, and estimated time saved.",
    detail:
      "Scaffolded with an agent in about an hour, then audited. Two defects had shipped that ran without erroring: findings matched raw string content instead of parser line positions, and a caching rule fired on jobs that installed nothing.",
    tech: ["TypeScript", "React", "Vite"],
    link: "https://github.com/kahan15/Workflow-Analysis-Dashboard",
    image: "",
  },
];

// The "Measured" strip under the hero.
// Every figure here is lifted verbatim from a bullet below. Nothing new is
// claimed. If you edit the source bullet, edit the matching row.
export const measured = [
  {
    label: "Retrieval benchmark",
    from: "71%",
    to: "89%",
    note: "over four evaluation rounds",
    source: "Sarjen Systems",
  },
  {
    label: "Service latency, p50",
    from: "320ms",
    to: "180ms",
    note: "at 500 concurrent requests",
    source: "Sarjen Systems",
  },
  {
    label: "Inference latency",
    from: null,
    to: "−43%",
    note: "ONNX and INT8 quantization",
    source: "Sarjen Systems",
  },
  {
    label: "CNN accuracy in 50KB",
    from: null,
    to: "93.3%",
    note: "structured pruning and distillation",
    source: "IEEE, TinyML",
  },
];

export const experience = [
  {
    role: "Teaching Assistant, Applied NLP (IE7500)",
    org: "Northeastern University",
    place: "Boston, MA",
    period: "Jun 2026 - present",
    points: [
      "Support 200+ graduate students, grading LSTM, BERT fine-tuning, and topic-modeling labs against rubric bands with written per-question feedback.",
      "QA Canvas course modules before release, catching wrong-course PDF links, rubric label mismatches, and contradictory video lengths.",
      "Debug Linux, GPU, and CUDA failures on shared HPC infrastructure, including a cluster-wide driver mismatch that halted a lab section mid-class.",
      "Repaired a corrupted 1M+ row dataset with truncated rows, 50 embedded header rows, a duplicated block, and 27% missing values.",
    ],
  },
  {
    role: "Software Engineer",
    org: "Sarjen Systems",
    place: "Ahmedabad, India",
    period: "Nov 2024 - Aug 2025",
    points: [
      "Built an evaluation framework across 500+ scenarios including adversarial cases, measuring retrieval precision, hallucination rate, and end-to-end task success, moving internal benchmarks from 71% to 89% over four rounds.",
      "Shipped a RAG system on LangChain and ChromaDB over 5,000+ regulated documents with hybrid retrieval, re-ranking, and source traceability, cutting query resolution time by 58%.",
      "Built agentic workflows with structured tool use across SQL, APIs, and document retrieval, taking manual review from hours to minutes.",
      "Took the FastAPI service layer from 320ms to 180ms p50 at 500 concurrent requests through async endpoints, request batching, and connection pooling.",
      "Cut inference latency 43% with ONNX and INT8 quantization using per-layer calibration, plus Numba JIT.",
      "Ran Kubernetes across four client environments with custom auto-scaling and GitHub Actions CI/CD at 99.99% availability, and reduced infrastructure cost 23%.",
    ],
  },
  {
    role: "Research Assistant, CSE Department",
    org: "Nirma University",
    place: "Ahmedabad, India",
    period: "Jul 2024 - Jul 2025",
    points: [
      "Two IEEE-published papers, sole implementer on both.",
      "Compressed a CNN to 93.3% accuracy inside 50KB using structured pruning and knowledge distillation, for 5G UAV hardware that couldn't offload inference. Per-layer sensitivity analysis showed the layers assumed to carry the model were largely redundant.",
      "Trained DQN agents over 10,000+ episodes in OpenAI Gym with reward shaping and hyperparameter sweeps, improving 21% over rule-based baselines.",
      "Wrote 5+ Solidity contracts on Ethereum testnet with access control, on-chain event logging, and anomaly-triggered cancellation, removing 60% of manual verification steps.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "Cygnet One",
    place: "Ahmedabad, India",
    period: "Jan 2024 - Jun 2024",
    points: [
      "Built a full-stack analytics platform in Python, Flask, and MongoDB for a 12-person leadership team.",
      "Forecast behavioral data with Random Forest, beating baseline by 19% on held-out sets.",
      "Built NLP sentiment pipelines over 1,000+ records and Power BI dashboards, cutting decision turnaround 37%.",
    ],
  },
];

export const education = [
  {
    school: "Northeastern University",
    degree: "MS, Computer Software Engineering",
    period: "Sep 2025 - May 2027",
    note: "GPA 4.0. Object-Oriented Design, Algorithms, Data Science Engineering Methods, Cloud Computing, Prompt Engineering.",
  },
  {
    school: "Nirma University",
    degree: "BTech, Computer Science and Engineering",
    period: "Oct 2020 - May 2024",
    note: "Class Representative for CSE, elected liaison for 1,000+ classmates across four years.",
  },
];

export const publications = [
  {
    title: "Model compression for TinyML under hard memory constraints",
    venue: "IEEE",
    link: "https://ieeexplore.ieee.org/document/11306897",
  },
  {
    title: "Reinforcement learning architectures for adaptive control",
    venue: "IEEE",
    link: "https://ieeexplore.ieee.org/document/10739324",
  },
];

export const projects = [
  {
    title: "Multi-Source RAG Platform",
    year: "2025",
    summary:
      "Six source types across PDF, Word, web, Wikipedia, SQL, and images. 20,000+ chunks indexed, 52% lower query latency than a keyword baseline, 18 endpoints, three-tier RBAC.",
    tech: ["FastAPI", "ChromaDB", "Docker", "AWS"],
    link: "https://github.com/kahan15/Ollama-AI-Chat-Application",
  },
  {
    title: "BrandSync",
    year: "2025",
    summary:
      "A 0-to-1 marketplace for brands, creators, and admins. 22 endpoints, sub-200ms p95 at 100 concurrent, JWT and RBAC enforced at both endpoint and render level. Two simultaneous approvals could push a campaign past budget without erroring. The root cause was transaction boundaries, not a missing check.",
    tech: ["Java", "Spring Boot", "Next.js", "PostgreSQL"],
    link: "",
  },
  {
    title: "Cloud Infrastructure Automation",
    year: "2026",
    summary:
      "Multi-environment AWS infrastructure in Terraform. Immutable Packer AMIs took provisioning from 15 minutes to under 90 seconds per node, behind a pipeline that lints, tests, scans, builds, and rolls out with zero downtime.",
    tech: ["Terraform", "Packer", "AWS", "GitHub Actions"],
    link: "https://github.com/kahan15/tf-infra",
  },
  {
    title: "CrossPrep",
    year: "2026",
    summary:
      "A cross-domain AI interview coach spanning seven domains, with an observability module and deployment artifacts.",
    tech: ["LangGraph", "Groq", "ChromaDB", "FastAPI"],
    link: "",
  },
  {
    title: "Multi-Agent Orchestration Platform",
    year: "2026",
    summary:
      "A supervisor agent routing by data ownership, with database operations behind a versioned MCP tool contract using typed schemas and scoped permissions, replanning on failure with bounded retry.",
    tech: ["Python", "LangGraph", "MCP", "Bedrock"],
    link: "",
  },
  {
    title: "DeepSight",
    year: "2025",
    summary:
      "A ResNet50 and VGG16 ensemble over 15,000+ NIH chest X-rays at 94.5% validation accuracy, with thresholds tuned against false-negative cost and sub-100ms serving.",
    tech: ["PyTorch", "TensorFlow", "Flask", "Docker"],
    link: "",
  },
  {
    title: "DeBERTa-v3 on Adversarial NLI",
    year: "2025",
    summary:
      "Fine-tuning on ANLI Round 2 with sweeps over learning rate, batch size, and warmup, ablations across three model sizes, and per-label error-mode analysis behind a Dockerized endpoint.",
    tech: ["Hugging Face", "PyTorch", "Docker"],
    link: "",
  },
  {
    title: "Containerized Service Platform",
    year: "2025",
    summary:
      "Liveness and readiness probes, graceful connection draining, idempotent Kafka consumers, and deliberate failure injection, tested over 15+ endpoints at 85%+ coverage.",
    tech: ["Kubernetes", "Kafka", "Pytest"],
    link: "",
  },
  {
    title: "MoodLens",
    year: "2025",
    summary:
      "Real-time emotion-aware scene captioning, built by four people in under 36 hours. First place at the NEU MGEN Hackathon against 20+ teams.",
    tech: ["Python", "OpenFilter", "Computer vision"],
    link: "https://github.com/kahan15/MoodLens",
  },
  {
    title: "Hand-Gesture Translator",
    year: "2023",
    summary:
      "Translating hand gestures to English words. Abandoned mid-build after I worked out the problem is hardware-bound rather than solvable with a webcam. Kept here because a project killed for a stated reason says more than another success.",
    tech: ["Python", "OpenCV"],
    link: "https://github.com/kahan15/Air-Cursor",
  },
];

export const skills = [
  {
    group: "Languages",
    items: ["Python", "Java", "TypeScript", "C++", "SQL", "Solidity", "Bash"],
  },
  {
    group: "AI & ML",
    items: [
      "PyTorch",
      "TensorFlow",
      "Hugging Face",
      "ONNX",
      "Transformers",
      "Reinforcement learning",
      "Quantization",
    ],
  },
  {
    group: "LLM & agentic",
    items: [
      "RAG",
      "LangChain",
      "LangGraph",
      "Model Context Protocol",
      "Evaluation harnesses",
      "ChromaDB",
      "FAISS",
    ],
  },
  {
    group: "Backend",
    items: ["FastAPI", "Spring Boot", "Flask", "Node.js", "GraphQL", "WebSockets"],
  },
  {
    group: "Data",
    items: ["PostgreSQL", "MongoDB", "Redis", "Snowflake", "Databricks", "dbt"],
  },
  {
    group: "Cloud & infrastructure",
    items: ["AWS", "Docker", "Kubernetes", "Terraform", "Packer", "Kafka"],
  },
  {
    group: "Observability",
    items: ["Prometheus", "Grafana", "CloudWatch", "GitHub Actions", "p50/p95 tracking"],
  },
];

export const achievements = [
  "First place, NEU MGEN Hackathon 2025, against 20+ teams",
  "Two IEEE publications, sole implementer on both",
  "4.0 GPA at Northeastern",
  "Class Representative for 1,000+ classmates, 2021–2024",
];
