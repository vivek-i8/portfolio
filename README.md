# Vivek Kumawat — Portfolio

AI Engineer focused on AI-native applications, machine learning, backend systems, and full-stack engineering.

## About

A portfolio application built with Next.js 16 (App Router), React 19, and TypeScript. It pairs long-form project case studies with live data: a grounded chat assistant, GitHub activity dashboards, and an in-browser resume viewer.

## Featured Projects

| Project | Description | Stack |
|---|---|---|
| [HITMAN](https://github.com/vivek-i8/hitman-ai) | AI agent for financial exceptions that investigates payment issues, reasons over evidence, and executes approved resolutions safely. | Python, FastAPI, LangGraph, PostgreSQL, Temporal |
| [VAANI](https://github.com/vivek-i8/vaani-voice-authenticity) | Voice-authenticity system that checks whether speech is human or AI-generated using two independent audio classifiers. | Python, PyTorch, Wav2Vec2, FastAPI |
| [Lumina](https://github.com/vivek-i8/Lumina-Movie-Engine) | Semantic movie discovery engine that understands natural-language descriptions and finds relevant films. | Python, Sentence-BERT, Streamlit, TMDB API |
| [SkySense](https://github.com/vivek-i8/skysense-ai) | Weather intelligence platform combining live forecasts, machine learning, and conversational analysis. | Python, FastAPI, scikit-learn, React, TypeScript |
| [MNIST](https://github.com/vivek-i8/mnist-statistical-digit-classification) | Statistical digit-classification study comparing logistic regression, PCA, and repeated-sampling analysis. | Python, scikit-learn, NumPy, Pandas |
| SENTINAI | Explainable scam-detection system that analyzes suspicious messages and links using language and technical signals. | Python, PyTorch, FastAPI, Docker |

Each project has a full case study on the site at `/projects/<slug>` (slugs match the repository names above; SENTINAI's repository is not public).

## Tech Stack

- **Framework:** Next.js 16 (App Router), React 19, TypeScript
- **Styling:** Tailwind CSS, Radix UI primitives
- **Animation:** GSAP, Framer Motion, Motion, Lenis
- **3D:** Spline
- **Backend:** Next.js route handlers, Nodemailer, next-intl, next-themes

## Experience

**Harzio** — AI/ML Intern · June–July 2026

## Education

**Jain University, Bengaluru** — B.Tech Computer Science & Engineering (AI & ML) · 2024–2028

## Links

- GitHub: https://github.com/vivek-i8
- LinkedIn: https://www.linkedin.com/in/vivekkumawat18/
- X: https://x.com/vivekxspace
- Instagram: https://www.instagram.com/vivekk.codes

## Local Development

```bash
npm install
cp .env.example .env.local   # then fill in the required values
npm run dev
```

### Environment variables

| Variable | Purpose |
|---|---|
| `OPENROUTER_API_KEY` | Primary provider for the chat assistant |
| `GROQ_API_KEY` | Failover provider for the chat assistant |
| `GITHUB_TOKEN` | Optional; raises GitHub API rate limits |
| `EMAIL_USER` | Gmail address that sends and receives contact-form mail |
| `EMAIL_APP_PASSWORD` | Gmail app password for that account |

The chat and contact routes return a friendly error when their keys are absent; every other page works without any environment configuration.

## Production

```bash
npm run build
npm start
```

## License

Released under the [MIT License](LICENSE).
