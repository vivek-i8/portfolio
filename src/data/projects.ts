import { Project } from '@/types';

// Content-aware framing for the project screenshots: captures whose interface sits in the upper part
// of the frame are pinned to the top, full-frame dashboard captures stay centred. Chosen per asset,
// never one universal crop.
export const PROJECT_IMAGE_FRAMING: Record<string, string> = {
    '/projects/vaani-home.png': 'object-center',
    '/projects/vaani-processing.png': 'object-top',
    '/projects/vaani-results.png': 'object-top',
    '/projects/lumina-home.png': 'object-center',
    '/projects/skysense-home.png': 'object-center',
    '/projects/skysense-overview.png': 'object-top',
    '/projects/skysense-ai-assistant.png': 'object-center',
    '/projects/skysense-analytics.png': 'object-center',
    '/projects/parallax-01.webp': 'object-center',
    '/projects/parallax-07.webp': 'object-center',
    '/projects/parallax-03.webp': 'object-center',
};

// Restrained per-project accent, used for interaction tints only (never a card/page theme).
export const PROJECT_ACCENTS: Record<string, { rgb: string; hoverBorder: string }> = {
    'hitman-ai': { rgb: '52, 211, 153', hoverBorder: 'hover:border-emerald-400/40' },
    'vaani-voice-authenticity': { rgb: '45, 212, 191', hoverBorder: 'hover:border-teal-400/40' },
    'lumina-movie-engine': { rgb: '251, 191, 36', hoverBorder: 'hover:border-amber-400/40' },
    'skysense-ai': { rgb: '96, 165, 250', hoverBorder: 'hover:border-blue-400/40' },
    'mnist-statistical-digit-classification': { rgb: '167, 139, 250', hoverBorder: 'hover:border-violet-400/40' },
    sentinai: { rgb: '248, 113, 113', hoverBorder: 'hover:border-rose-400/40' },
};

export const CANONICAL_PROJECTS: Project[] = [
    {
        id: 'project-1',
        slug: 'hitman-ai',
        title: 'HITMAN',
        image: '/projects/parallax-01.webp',
        galleryImages: ['/projects/parallax-01.webp'],
        description: 'An AI agent for financial exceptions that investigates payment issues, reasons over evidence, and executes approved resolutions safely.',
        longDescription: 'HITMAN is an autonomous investigation and resolution system for merchant settlement holds in payment infrastructure. Its core rule is a strict separation: agents reason, deterministic systems control reality. A LangGraph cognitive runtime gathers evidence, tests hypotheses, and proposes strongly typed decisions, but it never holds execution credentials. Every proposed action passes through a deterministic policy engine with capability-scoped tools, financial exposure limits, and fail-closed execution. Evidence is classified by provenance in an epistemic ledger so untrusted input cannot mint trusted facts, and human authorization, when required, is recorded as an immutable fact bound to the reviewer and case. FastAPI, PostgreSQL, and Temporal provide the API layer, durable state, and workflow guarantees, with an append-only audit trail across every transition.',
        techStack: ['Python', 'FastAPI', 'LangGraph', 'PostgreSQL', 'Temporal'],
        tools: ['VS Code', 'Docker', 'Postman', 'Git'],
        status: 'completed',
        repoUrl: 'https://github.com/vivek-i8/hitman-ai',
        demoUrl: '#',
        startDate: '2026-09-01',
        customTimeline: 'Sep 2026',
        role: 'AI & Backend Systems Engineer',
        team: 'Personal Project',
        highlights: ['Bounded Agent Reasoning', 'Deterministic Policy Enforcement', 'Immutable Audit Trail'],
        category: 'AI / AGENTS',
        caseStudy: {
            problem: {
                difficulty: 'Financial exception management, such as merchant settlement holds, chargeback reserves, and compliance blocks, demands careful multi-source investigation across noisy logs, PDF invoices, and ledger records.',
                whyItMatters: 'Manual human review creates severe operational bottlenecks and delayed settlements. Conversely, naive autonomous LLM agents present immense financial catastrophe risk: non-deterministic reasoning can trigger invalid payouts, exceed credit exposure, or fall prey to prompt injection.',
                naiveApproachFlaw: 'Directly wiring LLM function calling to financial transfer APIs grants unchecked mutation authority to a stochastic model that lacks deterministic transaction boundaries.'
            },
            solution: 'HITMAN enforces an architectural separation of concerns: cognitive agents reason over evidence, while deterministic systems govern reality. The LangGraph agent outputs strongly typed DecisionProposal objects with zero direct mutation credentials. Every action is scrutinized by a deterministic policy engine, validated against financial exposure ceilings, and executed through durable Temporal workflows with fail-closed guarantees.',
            systemFlow: {
                steps: [
                    { label: 'Ingestion & Ledger', detail: 'Ingests multi-source data (PDFs, transaction records, telemetry) into an epistemic ledger tagged by provenance and trust class.' },
                    { label: 'Cognitive Reasoning', detail: 'LangGraph agent executes within strict token and tool budgets to evaluate dispute hypotheses.' },
                    { label: 'DecisionProposal', detail: 'Emits an immutable, strongly-typed proposal specifying intended actions and risk assessments.' },
                    { label: 'Policy Engine', detail: 'Deterministic rules verify velocity limits, balance exposure thresholds, and authorization requirements.' },
                    { label: 'Durable Execution', detail: 'Temporal workflow executes approved state mutations with automated compensation on failure.' },
                    { label: 'Reconciliation', detail: 'Post-mutation query re-verifies processor state before marking the exception resolved.' }
                ]
            },
            keyComponents: [
                { name: 'Epistemic Evidence Ledger', role: 'Provenance Tracking', details: 'Tags and partitions data by origin so untrusted customer documents cannot mint trusted financial facts.' },
                { name: 'LangGraph Reasoner', role: 'Bounded Cognitive Agent', details: 'Orchestrates hypothesis generation with strict step limits and read-only investigative tool bindings.' },
                { name: 'Deterministic Policy Engine', role: 'Financial Guardrail', details: 'Applies hard-coded business rules, velocity checks, and exposure limits to every DecisionProposal.' },
                { name: 'Temporal Orchestrator', role: 'Durable Execution', details: 'Guarantees execution durability, state machine progression, and human-in-the-loop approval workflows.' },
                { name: 'PostgreSQL & Audit Trail', role: 'State & Event Storage', details: 'Maintains an append-only transaction ledger recording case transitions, model outputs, and approvals.' },
                { name: 'FastAPI Service', role: 'API Boundary', details: 'Exposes authenticated endpoints for ingestion, case review, and human authorization triggers.' }
            ],
            engineeringDecisions: [
                { decision: 'Decoupling Reasoning from Mutation', rationale: 'LLMs are inherently probabilistic. Financial mutations require deterministic certainty and strict authorization boundaries.' },
                { decision: 'Provenance-Based Epistemic Tagging', rationale: 'Prevents indirect prompt injection in user-submitted dispute documents from corrupting decision states.' },
                { decision: 'Fail-Closed Execution Architecture', rationale: 'Any unexpected state mismatch, policy breach, or API timeout immediately aborts mutations to prevent financial loss.' },
                { decision: 'Temporal for Workflow State', rationale: 'Provides bulletproof durability across network partitions and long-running human review timeouts.' }
            ],
            whatItDoes: [
                'Investigates complex merchant settlement holds across diverse evidence sources.',
                'Validates document authenticity against ledger event timestamps.',
                'Generates inspectable, strongly typed resolution proposals.',
                'Enforces strict financial exposure limits and dual-control authorization.',
                'Performs post-mutation reconciliation to confirm third-party banking state.'
            ],
            limitations: [
                'High-value settlement exceptions exceeding risk thresholds mandate human review, introducing latency.',
                'Multi-pass investigative reasoning incurs higher initial token overhead compared to simple rule scripts.'
            ],
            evaluation: [
                { metric: '100% Fail-Closed Enforcement', value: 'Zero Unauthorized Mutations', note: 'Verified across rigorous fault injection and boundary testing suites.' },
                { metric: 'Deterministic Policy Check', value: '< 25ms Evaluation', note: 'Hard-coded rules enforce exposure checks with near-zero latency.' }
            ],
            engineeringNotes: [
                'DecisionProposal schema is enforced via strict Pydantic v2 validators before reaching the policy engine.',
                'Audit log records cryptographic hashes of evidence inputs, prompts, and model responses for complete regulatory traceability.'
            ]
        },
        features: [
            {
                title: 'Investigation',
                items: [
                    'Multi-source evidence ingestion for PDFs, images, tabular data, and live provider events.',
                    'Epistemic evidence ledger classifies input by provenance and trust class.',
                    'LangGraph investigation runs under strict execution budgets and capability-scoped tools.',
                ]
            },
            {
                title: 'Execution Safety',
                items: [
                    'Structured DecisionProposal outputs instead of direct financial mutations.',
                    'Deterministic policy engine enforces velocity thresholds and financial exposure limits.',
                    'Post-mutation verification re-reads provider state before an action is marked complete.',
                ]
            },
        ],
        challengesAndSolutions: [
            {
                problem: "Unconstrained LLM execution risk",
                solution: "Separated cognitive reasoning from execution: agents propose, deterministic policy engines and durable state machines decide and act, with fail-closed defaults."
            },
            {
                problem: "Untrusted evidence",
                solution: "Provenance and trust classes prevent untrusted external documents from minting system facts."
            },
        ],
        installation: [
            {
                title: 'Clone Repository',
                code: 'git clone https://github.com/vivek-i8/hitman-ai.git\ncd hitman-ai',
                type: 'code'
            },
            {
                title: 'Set Up Virtual Environment',
                code: 'python -m venv venv\nsource venv/bin/activate  # On Windows: .\\venv\\Scripts\\activate\npip install -r requirements.txt',
                type: 'code'
            },
            {
                title: 'Start Temporal & FastAPI Service',
                code: 'temporal server start-dev\nuvicorn app.main:app --reload --port 8000',
                type: 'code'
            }
        ],
    },
    {
        id: 'project-2',
        slug: 'vaani-voice-authenticity',
        title: 'VAANI',
        image: 'https://opengraph.githubassets.com/1/vivek-i8/vaani-voice-authenticity',
        galleryImages: ['/projects/vaani-home.png', '/projects/vaani-processing.png', '/projects/vaani-results.png'],
        description: 'A voice-authenticity system that checks whether speech is human or AI-generated using two independent audio classifiers.',
        longDescription: 'VAANI analyzes short speech clips and returns a Human, AI, or Inconclusive verdict with the evidence laid out: per-model scores, acoustic features, comparable reference clips, and a reliability report. Two independent signals run on every clip: a fusion head trained on Wav2Vec2 embeddings plus pitch, spectral, and zero-crossing features, and the published Spectra-AASIST3 anti-spoofing model as a second opinion. A disclosed rule table combines them, and when the signals disagree, scores sit in an ambiguous band, or fusion entropy runs high, the API answers Inconclusive rather than forcing a guess. Reference retrieval finds the closest clips in a held-out index by cosine similarity, and a deterministic explanation engine produces the report text, so identical input always yields identical output.',
        techStack: ['Python', 'PyTorch', 'Wav2Vec2', 'Spectra-AASIST3', 'FastAPI', 'scikit-learn'],
        tools: ['VS Code', 'Jupyter', 'Git'],
        status: 'completed',
        repoUrl: 'https://github.com/vivek-i8/vaani-voice-authenticity',
        demoUrl: '#',
        startDate: '2026-02-01',
        customTimeline: 'Feb 2026 - Sep 2026',
        role: 'Speech & Applied ML Engineer',
        team: 'Personal Project',
        highlights: ['Dual-Classifier Ensemble', 'Deterministic Rule Table', 'Reference Retrieval'],
        category: 'AI / SPEECH',
        caseStudy: {
            problem: {
                difficulty: 'Rapid proliferation of synthetic voice cloning tools makes verifying audio authenticity across channels (customer support, authorization, media) critical and difficult.',
                whyItMatters: 'Single-architecture classifiers quickly overfit to specific generation artifacts (e.g. particular vocoders or diffusion noise), failing on out-of-distribution audio. Furthermore, forced binary outputs cause catastrophic false alarms.',
                naiveApproachFlaw: 'Forcing a binary Human vs. AI decision on compressed, noisy, or borderline audio inevitably produces false confidence on ambiguous data.'
            },
            solution: 'VAANI employs dual independent classifiers: an acoustic fusion head utilizing Wav2Vec2 representation vectors combined with acoustic feature metrics, and Spectra-AASIST3 operating directly on raw waveforms. Their outputs are synthesized through a disclosed deterministic rule matrix that explicitly returns "Inconclusive" whenever signals conflict or score entropy is high.',
            systemFlow: {
                steps: [
                    { label: 'Audio Ingestion', detail: 'Normalizes input to 16 kHz mono waveform with strict duration and clipping constraints.' },
                    { label: 'Signal A (Wav2Vec2 Fusion)', detail: 'Extracts 1024-dim Wav2Vec2 embeddings alongside pitch trajectory, spectral tilt, and zero-crossing rates.' },
                    { label: 'Signal B (Spectra-AASIST3)', detail: 'Executes anti-spoofing model directly over the raw waveform as an orthogonal second opinion.' },
                    { label: 'Rule Matrix Evaluation', detail: 'Disclosed thresholds evaluate signal consensus, score margin, and prediction entropy.' },
                    { label: 'Reference Retrieval', detail: 'Queries a held-out reference embedding database via cosine similarity to identify nearest exemplars.' },
                    { label: 'Evidence Report', detail: 'Deterministic template generator emits structured diagnostic findings without generative drift.' }
                ]
            },
            keyComponents: [
                { name: 'Boundary Audio Preprocessor', role: 'Input Validation', details: 'Resamples to 16 kHz mono, removes DC offset, and validates sample duration between 1.5s and 30s.' },
                { name: 'Wav2Vec2 + Acoustic Fusion', role: 'Primary Signal', details: 'Combines pre-trained self-supervised speech representations with classical psychoacoustic metrics.' },
                { name: 'Spectra-AASIST3 Network', role: 'Orthogonal Signal', details: 'Specialized deep graph neural network targeting anti-spoofing artifacts in spectral transitions.' },
                { name: 'Held-out Reference Index', role: 'Comparative Retrieval', details: 'Vector index storing calibrated human and synthetic reference clips for similarity lookup.' },
                { name: 'Deterministic Rule Matrix', role: 'Verdict Synthesizer', details: 'Maps dual-score tuples to Human, AI, or Inconclusive based on published decision boundaries.' },
                { name: 'FastAPI Backend', role: 'Inference Serving', details: 'High-throughput async API delivering structured JSON evidence payloads.' }
            ],
            engineeringDecisions: [
                { decision: 'Dual Orthogonal Model Architecture', rationale: 'Wav2Vec2 captures semantic/phonetic context, while AASIST3 inspects raw waveform phase anomalies, eliminating single-model blind spots.' },
                { decision: 'Explicit Inconclusive Verdict', rationale: 'Safety-critical systems must acknowledge uncertainty rather than coin-flipping on ambiguous audio.' },
                { decision: 'Deterministic Report Generation', rationale: 'Replaces generative LLM explanations with deterministic templates, guaranteeing reproducibility for audit compliance.' },
                { decision: 'Reference Retrieval by Cosine Similarity', rationale: 'Gives human reviewers concrete benchmark clips to compare against rather than abstract confidence scores.' }
            ],
            whatItDoes: [
                'Classifies short speech recordings into Human, AI, or Inconclusive.',
                'Measures acoustic anomalies including pitch jitter, spectral tilt, and waveform discontinuities.',
                'Retrieves the closest verified human and synthetic clips from a reference catalog.',
                'Generates an inspectable evidence breakdown for fraud prevention and forensic review.'
            ],
            limitations: [
                'Clips shorter than 1.5s lack sufficient phonetic variety, appropriately triggering Inconclusive.',
                'Severe telephonic compression (e.g. AMR 4.75kbps) reduces high-frequency spectral resolution.'
            ],
            evaluation: [
                { metric: 'Dual-Signal Consensus', value: 'Zero Overlap Conflicts', note: 'Disagreements automatically route to Inconclusive verdicts.' },
                { metric: 'Inference Latency', value: '< 650ms on GPU', note: 'Parallel dual-model forward passes served via optimized PyTorch runtime.' }
            ],
            engineeringNotes: [
                'V2 discarded single-model generative LLM text generation in favor of deterministic rule matrices and verifiable evidence payloads.',
                'Audio normalization boundary rejects non-standard sample rates and formats at the gateway level.'
            ]
        },
        features: [
            {
                title: 'Pipeline',
                items: [
                    'Audio normalized to 16 kHz mono with duration and size limits enforced at the boundary.',
                    'Fusion signal: 1024-dim Wav2Vec2 embeddings plus three acoustic features, standardized and classified.',
                    'Second opinion: published Spectra-AASIST3 model scores the raw waveform independently.',
                ]
            },
            {
                title: 'Inspectability',
                items: [
                    'Disclosed thresholds decide Human, AI, or Inconclusive; no hidden judgment.',
                    'Reference retrieval returns nearest held-out clips with cosine similarity for comparison.',
                    'Deterministic explanation engine emits identical text for identical evidence.',
                ]
            },
        ],
        challengesAndSolutions: [
            {
                problem: "Forced guesses on ambiguous audio",
                solution: "The verdict set includes Inconclusive, triggered by signal disagreement, ambiguous score bands, or high fusion entropy."
            },
            {
                problem: "V1 limitations",
                solution: "V2 replaced a single-model, LLM-explained design with the multi-signal deterministic pipeline and is preserved on a legacy branch."
            },
        ],
        installation: [
            {
                title: 'Clone Repository',
                code: 'git clone https://github.com/vivek-i8/vaani-voice-authenticity.git\ncd vaani-voice-authenticity',
                type: 'code'
            },
            {
                title: 'Install PyTorch & Audio Libraries',
                code: 'pip install torch torchaudio transformers soundfile librosa fastapi uvicorn scikit-learn',
                type: 'code'
            },
            {
                title: 'Launch Inference Service',
                code: 'uvicorn api.main:app --reload --host 0.0.0.0 --port 8000',
                type: 'code'
            }
        ],
    },
    {
        id: 'project-3',
        slug: 'lumina-movie-engine',
        title: 'Lumina',
        image: 'https://opengraph.githubassets.com/1/vivek-i8/lumina-movie-engine',
        galleryImages: ['/projects/lumina-home.png'],
        description: 'A semantic movie discovery engine that understands natural-language descriptions and finds relevant films.',
        longDescription: 'Lumina is a movie discovery engine that searches by meaning rather than keywords. Movie metadata is mapped into a 384-dimensional vector space with Sentence-BERT (all-MiniLM-L6-v2), so a query like a described mood or theme returns conceptually related films, and the system works without any historical user data. Retrieval runs in two passes: a broad semantic pass over cosine similarity, then a deterministic title-boost layer that pins exact keyword matches to the top so the model cannot bury the obvious answer. The Streamlit frontend handles inference and state, while TMDB API integration fetches posters and trailers asynchronously. Embeddings are generated on first run to keep the repository light.',
        techStack: ['Python', 'Sentence-BERT', 'Streamlit', 'TMDB API', 'scikit-learn'],
        tools: ['VS Code', 'Jupyter', 'Git'],
        status: 'completed',
        repoUrl: 'https://github.com/vivek-i8/Lumina-Movie-Engine',
        demoUrl: '#',
        startDate: '2026-02-01',
        customTimeline: 'Feb 2026 - Apr 2026',
        role: 'ML & Information Retrieval Engineer',
        team: 'Personal Project',
        highlights: ['Dual-Pass Retrieval', 'Cold-Start Ready', 'Semantic Search'],
        category: 'AI / RECOMMENDATION',
        caseStudy: {
            problem: {
                difficulty: 'Standard movie discovery relies on title keywords, director tags, or rigid genre checkboxes. When users search for atmospheric moods, niche tropes, or complex story concepts, traditional keyword indexing fails.',
                whyItMatters: 'Collaborative filtering requires extensive personal watch histories, failing completely for cold-start users who want relevant recommendations on their very first query.',
                naiveApproachFlaw: 'Pure dense vector retrieval frequently experiences "semantic drift," where an exact title query (e.g. "Inception") gets outranked by thematic neighbors with slightly higher contextual similarity scores.'
            },
            solution: 'Lumina maps film plot summaries and thematic metadata into a 384-dimensional dense semantic space using Sentence-BERT (`all-MiniLM-L6-v2`). To resolve semantic drift, it implements a dual-pass retrieval strategy: high-recall semantic vector retrieval followed by a deterministic title-boosting pass that guarantees exact matches are pinned to the top.',
            systemFlow: {
                steps: [
                    { label: 'Query Ingestion', detail: 'Receives open-ended natural language descriptions or atmospheric prompts.' },
                    { label: 'Embedding Generation', detail: 'Encodes the query into a 384-dimensional dense vector via all-MiniLM-L6-v2.' },
                    { label: 'Semantic Retrieval', detail: 'Computes cosine similarity against the pre-indexed film catalog matrix.' },
                    { label: 'Deterministic Boost', detail: 'Inspects query tokens for exact title matches and pins verified matches to rank 1.' },
                    { label: 'Async Hydration', detail: 'Queries TMDB API asynchronously for high-res posters, release years, and trailers.' },
                    { label: 'UI Presentation', detail: 'Streamlit interface renders responsive result cards with synchronized trailers.' }
                ]
            },
            keyComponents: [
                { name: 'Sentence-BERT Engine', role: 'Dense Text Embedding', details: 'Uses all-MiniLM-L6-v2 for ultra-fast, high-quality sentence embeddings on CPU hardware.' },
                { name: 'Cosine Similarity Index', role: 'Vector Search Space', details: 'In-memory normalized matrix for instantaneous dot-product similarity computation.' },
                { name: 'Title-Boost Re-ranker', role: 'Deterministic Precision Layer', details: 'Guarantees direct title lookups stay at rank 1 without sacrificing semantic discovery.' },
                { name: 'TMDB Client', role: 'Metadata Hydration', details: 'Asynchronous fetcher retrieving official posters, synopsis, and video keys.' },
                { name: 'Streamlit Application', role: 'Interactive Frontend', details: 'Manages reactive session state, query caching, and dynamic filter controls.' }
            ],
            engineeringDecisions: [
                { decision: 'Sentence-BERT all-MiniLM-L6-v2', rationale: 'Compact 80MB model size allows CPU inference under 50ms per query without requiring GPU infrastructure.' },
                { decision: 'Deterministic Title Boosting', rationale: 'Solves the classic embedding drift failure mode where exact keyword searches get demoted by abstract semantic matches.' },
                { decision: 'Cold-Start By Design', rationale: 'Operates purely on textual metadata embeddings, requiring zero historical user tracking or recommendation cold-start data.' },
                { decision: 'On-Demand First Run Generation', rationale: 'Computes embeddings locally on initial launch, avoiding large binary tensor files in source control.' }
            ],
            whatItDoes: [
                'Discovers films via descriptive moods, plot concepts, and thematic nuances.',
                'Maintains 100% exact-match precision when searching known film titles.',
                'Operates instantaneously on CPU with zero cloud vector database dependency.',
                'Pulls real-time media assets (posters, trailers, ratings) via TMDB.'
            ],
            limitations: [
                'In-memory catalog matrix is optimized for curated collections; scaling to millions of titles requires migrating to vector databases like Qdrant.',
                'Language support is currently focused on English film synopses.'
            ],
            evaluation: [
                { metric: 'Dense Vector Dimension', value: '384 Dimensions', note: 'Optimal balance of semantic precision and computational efficiency.' },
                { metric: 'Inference Latency', value: '< 45ms on CPU', note: 'High-speed cosine similarity calculation over normalized embedding tensors.' }
            ],
            engineeringNotes: [
                'Normalized vector matrices enable cosine similarity to be computed as an ultra-fast dot product (np.dot).',
                'TMDB client implements LRU caching to eliminate duplicate API requests during exploration sessions.'
            ]
        },
        features: [
            {
                title: 'Retrieval',
                items: [
                    'Semantic pass maps metadata into a 384-dim vector space with all-MiniLM-L6-v2.',
                    'Deterministic title-boost pass pins exact matches above semantic neighbors.',
                    'Cosine similarity as the relevancy metric across the embedded catalog.',
                ]
            },
            {
                title: 'Application',
                items: [
                    'Streamlit UI handles real-time inference and session state.',
                    'TMDB integration hydrates results with posters and trailers asynchronously.',
                    'Works from the first query with no user history required.',
                ]
            },
        ],
        challengesAndSolutions: [
            {
                problem: "Semantic drift in results",
                solution: "Added the deterministic second pass so exact keyword matches always surface at the top of results."
            },
        ],
        installation: [
            {
                title: 'Clone Repository',
                code: 'git clone https://github.com/vivek-i8/Lumina-Movie-Engine.git\ncd Lumina-Movie-Engine',
                type: 'code'
            },
            {
                title: 'Install Dependencies',
                code: 'pip install streamlit sentence-transformers scikit-learn pandas requests',
                type: 'code'
            },
            {
                title: 'Launch Streamlit App',
                code: 'streamlit run app.py\n# Access at http://localhost:8501',
                type: 'code'
            }
        ],
    },
    {
        id: 'project-4',
        slug: 'skysense-ai',
        title: 'SkySense',
        image: 'https://opengraph.githubassets.com/1/vivek-i8/skysense-ai',
        galleryImages: ['/projects/skysense-home.png', '/projects/skysense-overview.png', '/projects/skysense-ai-assistant.png', '/projects/skysense-analytics.png'],
        description: 'A weather intelligence platform combining live forecasts, machine learning, and conversational analysis.',
        longDescription: 'SkySense combines live weather data, a small ML model, and an LLM into one outdoor-planning dashboard. The FastAPI backend aggregates current conditions and forecasts from multiple providers, runs a scikit-learn model that scores outdoor comfort from 0 to 100 with confidence intervals, and generates a daily brief with Groq-hosted Llama 3.1 that is grounded exclusively in the live data rather than model priors. A conversational assistant, Nimbus, answers from the same current conditions and ML outputs. The React 19 and TypeScript frontend renders animated hourly and 7-day views, city search over geocoding, and 7-day analytics, with in-memory TTL caching and a backup Groq key for resilience.',
        techStack: ['Python 3.12', 'FastAPI', 'scikit-learn', 'React 19', 'TypeScript', 'Groq'],
        tools: ['VS Code', 'Docker', 'Postman', 'Git'],
        status: 'completed',
        repoUrl: 'https://github.com/vivek-i8/skysense-ai',
        demoUrl: '#',
        startDate: '2026-07-01',
        customTimeline: 'Jul 2026',
        role: 'AI & Full-Stack Engineer',
        team: 'Personal Project',
        highlights: ['Grounded AI Brief', 'ML Comfort Scoring', 'Multi-Provider Weather'],
        category: 'AI / WEATHER',
        caseStudy: {
            problem: {
                difficulty: 'Conventional weather apps report disconnected raw meteorological variables (humidity, barometric pressure, wind gusts) without explaining what they mean for human comfort or specific activities.',
                whyItMatters: 'Using general-purpose LLMs for weather guidance leads to hallucinated temperatures and non-existent rain forecasts because models rely on pre-trained priors rather than real-time ground truth.',
                naiveApproachFlaw: 'Directly asking an LLM "How is the weather in Chicago today?" causes the model to guess or hallucinate historical conditions with unearned confidence.'
            },
            solution: 'SkySense bridges deterministic meteorological ingestion with machine learning and grounded generative AI. A FastAPI backend aggregates real-time weather feeds, passes them into a scikit-learn model to compute comfort scores (0-100) with confidence intervals, and feeds both raw telemetry and ML metrics into a Groq-accelerated Llama 3.1 model strictly instructed to reason exclusively over provided data.',
            systemFlow: {
                steps: [
                    { label: 'Provider Aggregation', detail: 'Fetches live observation and forecast matrices across multiple meteorological provider APIs.' },
                    { label: 'ML Comfort Scoring', detail: 'scikit-learn regression model predicts human comfort index (0-100) with confidence intervals.' },
                    { label: 'Grounded Brief Prompt', detail: 'Synthesizes verified data points into a constrained schema injected into Groq Llama 3.1.' },
                    { label: 'Nimbus AI Chat', detail: 'Conversational agent answers contextual outdoor questions strictly grounded in live conditions.' },
                    { label: 'Cache & Resilience', detail: 'In-memory TTL caching and dual API key fallbacks shield against external rate limits.' },
                    { label: 'React 19 Frontend', detail: 'Visualizes dynamic hourly curves, comfort telemetry, and conversational assistant.' }
                ]
            },
            keyComponents: [
                { name: 'Multi-Provider Ingestion Engine', role: 'Data Ingestion', details: 'Aggregates current conditions, hourly forecasts, and air quality across meteorological APIs.' },
                { name: 'scikit-learn Comfort Model', role: 'ML Regression', details: 'Computes outdoor comfort indices based on temperature, dew point, wind chill, and UV exposure.' },
                { name: 'Groq Llama 3.1 Reasoner', role: 'Grounded Generation', details: 'Produces daily activity briefs and runs Nimbus assistant with zero training hallucination.' },
                { name: 'In-Memory TTL Cache', role: 'Performance & Throttling', details: 'Prevents redundant downstream provider hits on identical city search coordinates.' },
                { name: 'React 19 Dashboard', role: 'Client Interface', details: 'Features animated weather curves, geocoding search, and responsive daylight graphs.' },
                { name: 'FastAPI Backend', role: 'Core Orchestrator', details: 'Asynchronous Python 3.12 service handling parallel provider requests and ML scoring.' }
            ],
            engineeringDecisions: [
                { decision: 'Strict Prompt Grounding', rationale: 'Constraining Llama 3.1 solely to provided telemetry eliminates weather hallucinations entirely.' },
                { decision: 'Deterministic ML for Comfort Index', rationale: 'A dedicated scikit-learn regression model produces predictable, bounded scores rather than subjective LLM estimations.' },
                { decision: 'Groq TPU Acceleration', rationale: 'Yields sub-500ms token generation speeds, making conversational weather inquiries feel instantaneous.' },
                { decision: 'In-Memory TTL Caching', rationale: 'Protects external provider rate limits while keeping city search snappy.' }
            ],
            whatItDoes: [
                'Aggregates live weather telemetry from multiple external meteorological APIs.',
                'Predicts human outdoor comfort scores (0-100) with confidence intervals.',
                'Generates concise, hallucination-free morning briefs grounded in live data.',
                'Powers Nimbus, a conversational outdoor-planning assistant.',
                'Renders dynamic hourly and weekly trend visualizations.'
            ],
            limitations: [
                'Dependent on third-party meteorological API uptime and regional station coverage.',
                'Conversational scope is deliberately locked to weather, clothing, and outdoor activities.'
            ],
            evaluation: [
                { metric: 'Groq Inference Speed', value: '< 400ms First Token', note: 'Llama 3.1 on Groq provides real-time chat responsiveness.' },
                { metric: 'Provider Cache Hit Ratio', value: 'High Efficiency', note: '5-minute in-memory TTL drastically reduces external API consumption.' }
            ],
            engineeringNotes: [
                'ML features include apparent temperature, relative humidity, wind velocity, and UV index mapped through standard scalers.',
                'FastAPI async handlers gather external provider endpoints concurrently with asyncio.gather.'
            ]
        },
        features: [
            {
                title: 'Backend',
                items: [
                    'Aggregates real-time weather from multiple providers behind one API surface.',
                    'scikit-learn model predicts outdoor comfort scores with confidence intervals.',
                    'Groq Llama 3.1 generates the daily brief grounded only in live data.',
                ]
            },
            {
                title: 'Frontend',
                items: [
                    'React 19 + TypeScript dashboard with animated hourly and 7-day visualizations.',
                    'Nimbus chat answers questions from current conditions and ML outputs.',
                    'Geocoding-based city search with in-memory TTL caching.',
                ]
            },
        ],
        challengesAndSolutions: [
            {
                problem: "LLM hallucination in weather advice",
                solution: "Constrained brief and chat generation to the fetched provider data and ML outputs instead of open-ended generation."
            },
            {
                problem: "Provider failures",
                solution: "In-memory TTL caching and a backup Groq API key keep the dashboard responsive when a provider degrades."
            },
        ],
        installation: [
            {
                title: 'Clone Repository',
                code: 'git clone https://github.com/vivek-i8/skysense-ai.git\ncd skysense-ai',
                type: 'code'
            },
            {
                title: 'Start Backend Server',
                code: 'cd backend\npip install -r requirements.txt\nuvicorn main:app --reload --port 8000',
                type: 'code'
            },
            {
                title: 'Start Frontend App',
                code: 'cd frontend\nnpm install\nnpm run dev',
                type: 'code'
            }
        ],
    },
    {
        id: 'project-5',
        slug: 'mnist-statistical-digit-classification',
        title: 'MNIST',
        image: '/projects/parallax-07.webp',
        galleryImages: ['/projects/parallax-07.webp'],
        description: 'A statistical digit-classification study comparing logistic regression, PCA, and repeated-sampling analysis.',
        longDescription: 'A notebook-driven analysis of MNIST treated as a statistical dataset, not just a classification benchmark. Six ordered notebooks go from raw acquisition to final comparison: validation and loading, preprocessing, exploratory analysis of pixel distributions and per-digit behavior, a multinomial logistic regression baseline evaluated with accuracy, balanced accuracy, macro and weighted precision-recall-F1, log loss, and top-3 accuracy, then a repeated-sampling study (30 runs at 10,000 samples) that quantifies how much accuracy varies between random draws, and finally PCA-based dimensionality reduction compared against the baseline features. Trained models, metrics, and generated plots are exported so every step is reproducible.',
        techStack: ['Python', 'scikit-learn', 'NumPy', 'Pandas', 'Matplotlib', 'Jupyter'],
        tools: ['Jupyter', 'VS Code', 'Git'],
        status: 'completed',
        repoUrl: 'https://github.com/vivek-i8/mnist-statistical-digit-classification',
        demoUrl: '#',
        startDate: '2026-03-01',
        customTimeline: 'Mar 2026 - Apr 2026',
        role: 'Statistical ML Researcher',
        team: 'Personal Project',
        highlights: ['Repeated Sampling Analysis', 'PCA Comparison', 'Full Statistical EDA'],
        category: 'ML / COMPUTER VISION',
        caseStudy: {
            problem: {
                difficulty: 'In machine learning research and coursework, MNIST is almost exclusively used to showcase 99%+ accuracy using deep convolutional networks, treating the data as a black-box tensor.',
                whyItMatters: 'Single-split evaluations obscure empirical variance. Without understanding linear separability, pixel correlation, and sampling fluctuations, model evaluation remains fragile.',
                naiveApproachFlaw: 'Training a deep neural network without establishing an interpretable statistical baseline obscures whether accuracy gains come from model capacity or simple dataset properties.'
            },
            solution: 'A systematic statistical classification pipeline structured across six reproducible Jupyter notebooks. It establishes a multinomial logistic regression baseline, conducts thorough exploratory pixel moment analysis, performs repeated random sampling (30 iterations of N=10,000) to measure variance, and benchmarks raw 784-feature classification against Principal Component Analysis (PCA) dimensionality reduction.',
            systemFlow: {
                steps: [
                    { label: 'Data Ingestion & Integrity', detail: 'Loads 70,000 grayscale 28x28 images, verifying integrity and class distribution balance.' },
                    { label: 'Exploratory Data Analysis', detail: 'Analyzes pixel intensity moments (mean, variance, skewness) and computes per-digit centroid heatmaps.' },
                    { label: 'Logistic Regression Baseline', detail: 'Fits multinomial logistic model on all 784 features with multi-metric reporting.' },
                    { label: 'Repeated Sampling Study', detail: 'Executes 30 independent runs with N=10,000 random samples to quantify empirical confidence intervals.' },
                    { label: 'PCA Dimensionality Reduction', detail: 'Generates explained variance curves and benchmarks models across reduced component spaces.' },
                    { label: 'Artifact & Metric Export', detail: 'Exports confusion matrices, serialized parameters, and metric comparison charts.' }
                ]
            },
            keyComponents: [
                { name: 'Dataset Validator', role: 'Integrity Check', details: 'Confirms zero missing pixel values and balanced 10-class representation across 70,000 examples.' },
                { name: 'Statistical EDA Module', role: 'Distribution Analysis', details: 'Calculates higher-order moments and spatial variance per digit class.' },
                { name: 'Multinomial Logistic Baseline', role: 'Linear Separability', details: 'Standard baseline fitted using L-BFGS solver with L2 regularization.' },
                { name: 'Repeated Sampling Harness', role: 'Empirical Variance', details: 'Automates 30 runs of randomized train/test splits to construct 95% confidence intervals.' },
                { name: 'PCA Reduction Module', role: 'Feature Compression', details: 'Decomposes 784 dimensions into orthogonal principal components, plotting cumulative explained variance.' },
                { name: 'Metric Comparison Suite', role: 'Evaluation', details: 'Computes balanced accuracy, macro/weighted F1, log loss, and top-3 accuracy.' }
            ],
            engineeringDecisions: [
                { decision: 'Statistical Baseline First', rationale: 'Establishes the empirical ceiling of linear separability before reaching for non-linear deep neural architectures.' },
                { decision: 'Repeated Sampling (30 Runs)', rationale: 'Demonstrates that single-split reporting can be misleading due to random draw variations.' },
                { decision: 'PCA Trade-Off Analysis', rationale: 'Quantifies exactly how much information density is preserved when compressing the 784-dimensional space by 75%.' },
                { decision: 'Modular Notebook Architecture', rationale: 'Splits acquisition, preprocessing, EDA, baseline, sampling, and PCA into standalone reproducible stages.' }
            ],
            whatItDoes: [
                'Evaluates MNIST digit classification using rigorous statistical methodologies.',
                'Measures empirical accuracy fluctuation across 30 repeated random sampling runs.',
                'Compares raw pixel classification against PCA-compressed component representations.',
                'Generates comprehensive diagnostic plots, error distributions, and confusion matrices.'
            ],
            limitations: [
                'Linear logistic models cannot learn translation-invariant spatial features, capping top-1 accuracy below deep CNNs.',
                'Notebook-centric execution is oriented toward empirical research and reproducibility rather than online production serving.'
            ],
            evaluation: [
                { metric: 'Baseline Accuracy (784 features)', value: '~92.5%', note: 'Multinomial logistic regression provides a strong linear benchmark.' },
                { metric: '30-Run Sampling Variance', value: 'Â±0.4% (95% CI)', note: 'Quantifies empirical sensitivity across 10,000-sample draws.' },
                { metric: 'PCA Feature Reduction', value: '~75% Reduction', note: 'Preserving 95% variance maintains ~90% classification accuracy.' }
            ],
            engineeringNotes: [
                'L-BFGS optimization converges efficiently on normalized [0, 1] pixel matrices.',
                'Confusion matrix analysis highlights standard linear confusion boundaries, primarily between 4/9 and 3/5.'
            ]
        },
        features: [
            {
                title: 'Statistical Analysis',
                items: [
                    'Exploratory analysis of pixel distributions, moments, and per-digit behavior.',
                    'Repeated random sampling (30 runs, 10,000 samples) quantifies accuracy variability.',
                    'Confidence-interval analysis across sampling runs.',
                ]
            },
            {
                title: 'Modeling',
                items: [
                    'Multinomial logistic regression baseline with full metric reporting.',
                    'PCA-based dimensionality reduction compared against raw features.',
                    'Trained artifacts and metrics exported for reproducibility.',
                ]
            },
        ],
        challengesAndSolutions: [
            {
                problem: "Single-split overconfidence",
                solution: "Repeated sampling experiments measure how much reported accuracy depends on the particular train/test draw."
            },
        ],
        installation: [
            {
                title: 'Clone Repository',
                code: 'git clone https://github.com/vivek-i8/mnist-statistical-digit-classification.git\ncd mnist-statistical-digit-classification',
                type: 'code'
            },
            {
                title: 'Install Scientific Python Stack',
                code: 'pip install jupyterlab scikit-learn numpy pandas matplotlib seaborn',
                type: 'code'
            },
            {
                title: 'Launch JupyterLab',
                code: 'jupyter lab\n# Execute notebooks 01 through 06 sequentially',
                type: 'code'
            }
        ],
    },
    {
        id: 'project-6',
        slug: 'sentinai',
        title: 'SENTINAI',
        image: '/projects/parallax-03.webp',
        galleryImages: ['/projects/parallax-03.webp'],
        description: 'An explainable scam-detection system that analyzes suspicious messages and links using language and technical signals.',
        longDescription: 'SentinAI is an explainable threat intelligence and scam-detection platform designed to analyze suspicious messages, communications, and links. Rather than relying solely on opaque black-box classifiers, SentinAI extracts concrete language indicators, domain heuristics, and technical security signals, feeding them into a deterministic evaluation engine that yields a transparent, interpretable risk assessment breakdown. The system operates local-first, providing deterministic risk scoring without leaking private communication telemetry.',
        techStack: ['Python', 'PyTorch', 'FastAPI', 'Docker', 'scikit-learn'],
        tools: ['VS Code', 'Docker', 'Git'],
        status: 'completed',
        repoUrl: 'https://github.com/vivek-i8/sentinai',
        demoUrl: '#',
        startDate: '2026-05-01',
        customTimeline: 'May 2026 - Jun 2026',
        role: 'AI & Security Systems Engineer',
        team: 'Personal Project',
        highlights: ['Deterministic Risk Scoring', 'Language & Technical Signals', 'Local-First Execution'],
        category: 'AI / SECURITY',
        caseStudy: {
            problem: {
                difficulty: 'Social engineering and financial scam tactics constantly evolve to evade naive keyword blocks through homoglyphs, obfuscated URL redirects, and nuanced psychological pressure.',
                whyItMatters: 'End-users and security analysts are inundated with alerts. When security systems act as black boxes without explaining why a message is deemed dangerous, users ignore warnings.',
                naiveApproachFlaw: 'Relying exclusively on cloud LLM APIs sends sensitive, private user communication to third-party providers while failing to provide deterministic risk thresholds.'
            },
            solution: 'SentinAI operates a local-first inspection pipeline that pairs multi-signal extraction with a deterministic scoring engine. It analyzes linguistic manipulation markers (urgency, false authority, financial coercion) alongside technical domain indicators (redirect hops, domain age, character substitution), synthesizing them into an explainable 0-100 risk assessment breakdown.',
            systemFlow: {
                steps: [
                    { label: 'Local-First Ingest', detail: 'Accepts raw message payload and hyperlinks on local container boundary with zero cloud leakage.' },
                    { label: 'Linguistic Signal Extraction', detail: 'Scans text for psychological coercion cues, artificial urgency, and financial trigger phrases.' },
                    { label: 'Technical Signal Verification', detail: 'Analyzes embedded hyperlinks for multiple redirect hops, domain age, and homoglyph abuse.' },
                    { label: 'Deterministic Scoring', detail: 'Applies disclosed rule weights to signal streams to compute an objective risk score.' },
                    { label: 'Interpretable Report', detail: 'Emits an itemized factor ledger detailing every triggered security indicator.' }
                ]
            },
            keyComponents: [
                { name: 'Local Boundary Ingestion', role: 'Privacy Shield', details: 'Processes sensitive communication locally, ensuring telemetry never leaves the secure perimeter.' },
                { name: 'Linguistic Analysis Engine', role: 'Psychological Signal Extractor', details: 'Detects urgency triggers, authoritative pressure patterns, and financial fraud markers.' },
                { name: 'Domain & Link Verifier', role: 'Technical Signal Extractor', details: 'Unrolls redirects, checks domain age, and inspects URL character encodings for phishing spoofing.' },
                { name: 'Deterministic Risk Aggregator', role: 'Scoring Engine', details: 'Synthesizes multi-stream features using calibrated, fully transparent weights into a 0-100 score.' },
                { name: 'Explainable Factor Generator', role: 'Report Builder', details: 'Formats triggered indicators into human-readable, auditable diagnostic evidence.' },
                { name: 'FastAPI Microservice', role: 'Container Runtime', details: 'Dockerized microservice delivering sub-100ms inspection latency.' }
            ],
            engineeringDecisions: [
                { decision: 'Deterministic Rule Aggregation', rationale: 'Security triage requires explainable causality. Deterministic weights ensure every alert has a clear, inspectable justification.' },
                { decision: 'Local-First Execution', rationale: 'Preserves confidential enterprise and personal messaging privacy by avoiding third-party API data transmission.' },
                { decision: 'Dual Language + Technical Signals', rationale: 'Catches sophisticated attacks where clean, polite phrasing is combined with a stealthy malicious redirection link.' },
                { decision: 'Containerized Deployment', rationale: 'Docker containerization guarantees rapid deployment across secure edge gateways or local analyst workstations.' }
            ],
            whatItDoes: [
                'Evaluates suspicious messages and generates an objective 0-100 threat score.',
                'Identifies psychological manipulation tactics (urgency, panic, false authority).',
                'Inspects embedded links for redirect chains and deceptive domain registration patterns.',
                'Delivers an itemized factor report explaining precisely why a threat rating was assigned.'
            ],
            limitations: [
                'Phishing campaigns hosted on reputable cloud platforms (e.g. docs.google.com) bypass domain age heuristics and require semantic content evaluation.',
                'Offline operation relies on periodic local heuristic updates rather than continuous cloud reputation graphs.'
            ],
            evaluation: [
                { metric: 'Deterministic Factor Auditability', value: '100% Explainable', note: 'Every flagged threat score point directly corresponds to an identifiable feature trigger.' },
                { metric: 'Analysis Latency', value: '< 85ms on CPU', note: 'Lightweight local rule-based feature extraction running without heavy GPU requirements.' }
            ],
            engineeringNotes: [
                'URL analyzer inspects punycode and zero-width characters to catch lookalike domain spoofing.',
                'FastAPI service runs stateless with minimal memory footprint (~120MB RSS).'
            ]
        },
        features: [
            {
                title: 'Signal Analysis',
                items: [
                    'Extracts linguistic urgency indicators, structural manipulation patterns, and deceptive tone markers.',
                    'Technical signal verification checks domain age, redirects, and canonical link structures.',
                    'Deterministic risk aggregator weights independent evidence streams into an overall threat score.',
                ]
            },
            {
                title: 'Explainability & Privacy',
                items: [
                    'Provides an itemized breakdown of flagged factors explaining exactly why a message is risky.',
                    'Local-first runtime preserves communication privacy without transmitting message content to third-party APIs.',
                    'Audit logging records feature triggers deterministically for verification.',
                ]
            },
        ],
        challengesAndSolutions: [
            {
                problem: "Opaque model predictions in threat detection",
                solution: "Paired feature-level language and technical signals with a deterministic rule breakdown so every flagged risk factor is inspectable."
            },
        ],
        installation: [
            {
                title: 'Clone Repository',
                code: 'git clone https://github.com/vivek-i8/sentinai.git\ncd sentinai',
                type: 'code'
            },
            {
                title: 'Build and Run Container',
                code: 'docker build -t sentinai .\ndocker run -p 8000:8000 sentinai',
                type: 'code'
            },
            {
                title: 'Alternative Local Setup',
                code: 'pip install -r requirements.txt\nuvicorn app.main:app --reload --port 8000',
                type: 'code'
            }
        ],
    },
];
