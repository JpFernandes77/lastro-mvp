'use client'

import { useEffect, useState } from 'react'
import { LanguageSwitcher } from '@/components/language-switcher'
import {
  Activity,
  ArrowRight,
  Check,
  ChevronDown,
  CircleAlert,
  CircleDot,
  Copy,
  Database,
  FileCheck2,
  FileText,
  Fingerprint,
  GitBranch,
  Layers3,
  Menu,
  Network,
  PanelLeftClose,
  Search,
  ShieldCheck,
  Split,
  Trophy,
  X,
} from 'lucide-react'

const navItems = [
  { label: 'Overview', icon: Layers3 },
  { label: 'Evidence Pipeline', icon: GitBranch },
  { label: 'Attestation Queue', icon: FileCheck2 },
  { label: 'Adjudication Center', icon: Split },
  { label: 'Proof Verification', icon: ShieldCheck },
  { label: 'Audit Logs', icon: Activity },
]

const trails = [
  ['Ana Silva', 'AI-assisted Financial Analysis', 'DEMONSTRATED', '4 / 4 evidence items', 'Today'],
  ['Marcos Costa', 'Evidence-based Decisions', 'DEMONSTRATED', '4 / 4 evidence items', 'Today'],
  ['Beatriz Lima', 'AI-assisted Development', 'IN_DEVELOPMENT', '2 / 4 evidence items', 'Today'],
  ['Rafael Nunes', 'Reproducible Analysis', 'IN_DEVELOPMENT', '2 / 4 evidence items', 'Yesterday'],
  ['Ana Silva', 'AI-assisted Financial Analysis', 'CONFLICT', '4 / 4 evidence items', 'Today'],
]

const evidence = [
  ['briefing.md', 'briefing', '8f4e...a1b2'],
  ['analysis.csv', 'analysis_artifact', '7c3d...f9e2'],
  ['results.ipynb', 'analysis_result', '5a1b...c8d4'],
  ['communication.md', 'communication', '3e8f...a9c1'],
]

/* ------------------------------------------------------------------
   LOGO ORIGINAL — geometria exata do asset original (V + camada Z)
   ------------------------------------------------------------------ */
function LastroLogo({ size = 21 }: { size?: number }) {
  return (
    <svg viewBox="0 0 40 48" width={size} height={size * 1.2} fill="currentColor" aria-hidden="true" focusable="false">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="m7.839 40.783 16.03-28.054L20 6 0 40.783h7.839Zm8.214 0H40L27.99 19.894l-4.02 7.032 3.976 6.914H20.02l-3.967 6.943Z"
      />
    </svg>
  )
}

/* ------------------------------------------------------------------
   SÍMBOLO DA IDENTIDADE — anel + duas camadas em V + losango (a prova)
   ------------------------------------------------------------------ */
function LastroSymbol({ size = 150 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-label="Símbolo LASTRO" role="img">
      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="3" />
      <g transform="translate(0 5)">
        <polygon points="60,26 82,38 60,50 38,38" fill="var(--ac)" />
        <g fill="none" stroke="currentColor" strokeWidth="5" strokeLinejoin="miter">
          <polyline points="34,52 60,66 86,52" />
          <polyline points="34,68 60,82 86,68" />
        </g>
      </g>
    </svg>
  )
}

/* the same symbol, reduced: no ring, for 48/32/16 px */
function LastroSymbolReduced({ size = 32 }: { size?: number }) {
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} aria-hidden="true" focusable="false">
      <polygon points="60,12 94,31 60,50 26,31" fill="var(--ac)" />
      <g fill="none" stroke="currentColor" strokeWidth="10" strokeLinejoin="miter">
        <polyline points="24,56 60,77 96,56" />
        <polyline points="24,82 60,103 96,82" />
      </g>
    </svg>
  )
}

/* Os seis estágios. Cada um veste a gramática daquilo que realmente é. */
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    DEMONSTRATED: 'b-state',
    VERIFIED: 'b-verify',
    PASS: 'b-verify',
    AGREEMENT: 'b-attest',
    IN_DEVELOPMENT: 'b-ai',
    WARNING: 'b-ai',
    INSUFFICIENT_EVIDENCE: 'b-ai',
    CONFLICT: 'b-review',
    HOLD: 'b-review',
    BLOCKED: 'b-review',
  }
  return <span className={`badge ${styles[status] ?? 'b-neutral'}`}><span className="badge-dot" />{status}</span>
}

function MetricCard({ label, value, note }: { label: string; value: string; note: string }) {
  return <div className="metric-card"><span className="eyebrow">{label}</span><strong>{value}</strong><span className="metric-note">{note}</span></div>
}

function Sidebar({ active, setActive, collapsed, setCollapsed }: { active: string; setActive: (value: string) => void; collapsed: boolean; setCollapsed: (value: boolean) => void }) {
  return <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
    <div className="brand">
      <div className="brand-mark"><LastroLogo size={20} /></div>
      {!collapsed && <div><div className="brand-name">LASTRO</div><div className="brand-caption">VERIFICATION INFRASTRUCTURE</div></div>}
    </div>
    <button className="collapse-button" aria-label="Recolher menu" onClick={() => setCollapsed(!collapsed)}>{collapsed ? <Menu /> : <PanelLeftClose />}</button>
    <nav className="nav-list" aria-label="Navegação principal">
      {navItems.map(({ label, icon: Icon }) => <button key={label} className={`nav-item ${active === label ? 'nav-item-active' : ''}`} onClick={() => setActive(label)} title={collapsed ? label : undefined}><Icon />{!collapsed && <span>{label}</span>}</button>)}
    </nav>
    {!collapsed && <div className="sidebar-bottom"><div className="workspace-indicator"><span className="live-dot" /><div><span>WORKSPACE</span><strong>Synthetic Demo</strong></div></div><div className="sidebar-footnote">All records are illustrative<br />and non-production.</div></div>}
  </aside>
}

function Topbar({ active }: { active: string }) {
  return <header className="topbar">
    <div className="breadcrumb"><span>LASTRO</span><ArrowRight /><strong>{active}</strong></div>
    <div className="topbar-meta">
      <span className="hack-pill"><Trophy />COLOSSEUM · SUPERTEAM</span>
      <LanguageSwitcher />
      <span className="demo-pill"><span className="live-dot" />SYNTHETIC DEMO</span>
      <span className="mono">v0.1 / DEVNET</span>
    </div>
  </header>
}

/* ------------------------------------------------------------------
   HERO — a identidade como peça de abertura
   ------------------------------------------------------------------ */
function Hero({ setActive }: { setActive: (value: string) => void }) {
  return <section className="hero">
    <div className="hero-inner">
      <div>
        <div className="hero-kicker"><span className="k">Identity v0.1 · Solana Devnet</span></div>
        <h1 className="hero-wordmark">LASTRØ</h1>
        <p className="hero-tagline">From learning to proof.</p>
        <p className="hero-sub">Infrastructure to turn learning experiences into evidence of competence — reviewed by people and verifiable. Evidence integrity, deterministic criteria and AI interpretation, kept separate on purpose.</p>
        <div className="hero-flow">
          <span>EVIDENCE</span><i>→</i><span>INTERPRETATION</span><i>→</i><span>REVIEW</span><i>→</i><span>STATE</span><i>→</i><b>PROOF</b>
        </div>
        <div className="hero-actions">
          <button className="button button-primary" onClick={() => setActive('Evaluation Detail')}>Open evaluation <ArrowRight /></button>
          <button className="button button-secondary" onClick={() => setActive('Architecture')}><GitBranch /> Architecture</button>
        </div>
        <div className="hero-badges">
          <span className="chip"><ShieldCheck />SHA-256 HASHES</span>
          <span className="chip"><Fingerprint />3 MECHANISMS</span>
          <span className="chip"><Network />SOLANA DEVNET</span>
          <span className="chip chip-ac"><Check />AI INTERPRETS, NEVER DECIDES</span>
        </div>
      </div>
      <div className="hero-visual">
        <div className="symbol-card">
          <div className="symbol-stage"><LastroSymbol size={158} /></div>
          <div className="symbol-caption">
            <b>Ring:</b> integrity and verification.<br />
            <b>Two V layers:</b> evidence and state — the base that sustains.<br />
            <b>Blue diamond:</b> the proof. The only point of colour, at the top of the stack.
          </div>
          <div className="symbol-rows">
            <div className="symbol-row"><span>COLOR</span><strong>#1683FF</strong></div>
            <div className="symbol-row"><span>RESERVED FOR</span><strong>Attested records</strong></div>
            <div className="symbol-row"><span>MIN SIZE</span><strong>16 px / 32 px</strong></div>
          </div>
        </div>
      </div>
    </div>
    <div className="stat-strip">
      <div><span className="stat-value">3</span><span className="stat-label">INDEPENDENT MECHANISMS</span></div>
      <div><span className="stat-value">6</span><span className="stat-label">DISTINCT STAGES</span></div>
      <div><span className="stat-value">4</span><span className="stat-label">CANONICAL ARTIFACTS</span></div>
      <div><span className="stat-value ac">1</span><span className="stat-label">PUBLIC PROOF ANCHOR</span></div>
    </div>
  </section>
}

/* ------------------------------------------------------------------
   GRAMÁTICA DO PRODUTO — cada estágio parece diferente do anterior
   ------------------------------------------------------------------ */
function Grammar() {
  const stages = [
    ['EVIDENCE', 'Solid gray. Source data.', 'g-evidence'],
    ['AI INTERPRETATION', 'Dashed. Inference, not fact.', 'g-ai'],
    ['HUMAN REVIEW', 'White outline. Human decision.', 'g-review'],
    ['COMPETENCY STATE', 'Solid white. Not a certificate.', 'g-state'],
    ['ATTESTATION', 'Blue. Proof recorded.', 'g-attest'],
    ['VERIFICATION ✓', 'Blue on black. Checked.', 'g-verify'],
  ]
  return <section className="section-block">
    <div className="section-header">
      <div>
        <span className="eyebrow">PRODUCT GRAMMAR</span>
        <h2>Every stage looks different from the one before</h2>
      </div>
      <span className="count-label">6 STAGES · 1 COLOUR</span>
    </div>
    <p className="muted" style={{ margin: '0 0 4px', maxWidth: '64ch' }}>Original evidence ≠ AI interpretation ≠ human decision ≠ state ≠ attestation ≠ verification. The difference is visual, not only a label.</p>
    <div className="grammar">
      {stages.map(([title, note, cls]) => <div className={`grammar-card ${cls}`} key={title}><span>{title}</span><i>{note}</i></div>)}
    </div>
  </section>
}

function Overview({ setActive }: { setActive: (value: string) => void }) {
  return <div className="page-content">
    <Hero setActive={setActive} />
    <div className="page-heading">
      <div><span className="eyebrow ac">SYNTHETIC COMPETENCY VERIFICATION</span><h1>Overview</h1><p>Current states and the evidence supporting each decision.</p></div>
      <button className="button button-primary" onClick={() => setActive('Evaluation Detail')}>Open evaluation <ArrowRight /></button>
    </div>
    <div className="data-notice"><CircleAlert /><span><strong>Illustrative demo data.</strong> This workspace contains synthetic evidence and organizational records.</span></div>
    <div className="metrics-grid">
      <MetricCard label="PEOPLE IN EVALUATION" value="5" note="defined capability records" />
      <MetricCard label="DEMONSTRATED" value="2" note="under current evidence contract" />
      <MetricCard label="IN DEVELOPMENT" value="2" note="additional evidence needed" />
      <MetricCard label="AWAITING ADJUDICATION" value="1" note="material verification conflict" />
    </div>
    <section className="section-block">
      <div className="section-header">
        <div><span className="eyebrow">BOUNDED STATE RECORDS</span><h2>Competency Trails</h2></div>
        <button className="text-button" onClick={() => setActive('Attestation Queue')}>View queue <ArrowRight /></button>
      </div>
      <div className="table-wrap panel">
        <table>
          <thead><tr><th>Person</th><th>Defined capability</th><th>Current state</th><th>Evidence</th><th>Updated</th></tr></thead>
          <tbody>
            {trails.map((row, i) => <tr key={`${row[0]}-${i}`} onClick={() => setActive('Evaluation Detail')}>
              <td><div className="person-cell"><span className="avatar">{row[0].split(' ').map((x) => x[0]).join('')}</span><strong>{row[0]}</strong></div></td>
              <td>{row[1]}</td>
              <td><StatusBadge status={row[2]} /></td>
              <td className="mono">{row[3]}</td>
              <td className="muted">{row[4]}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
    </section>
    <Grammar />
  </div>
}

/* ------------------------------------------------------------------
   EVIDENCE PIPELINE — diagrama de linha fina
   ------------------------------------------------------------------ */
function Pipeline() {
  const steps = ['SUBMITTED WORK', 'INGESTED', 'CANONICALIZED', 'INTEGRITY VERIFIED', 'READY FOR VERIFICATION']
  return <div className="page-content">
    <div className="page-heading">
      <div><span className="eyebrow ac">EVIDENCE OPERATIONS</span><h1>Evidence Pipeline</h1><p>Trace how submitted work becomes verifiable evidence.</p></div>
      <button className="button button-secondary"><Search /> Search evidence</button>
    </div>
    <div className="pipeline">
      {steps.map((step, i) => <div className="pipeline-step" key={step} style={{ display: 'contents' }}>
        <div className={`pipeline-node ${i < 4 ? 'pipeline-node-done' : 'pipeline-node-current'}`}>{i < 4 ? <Check /> : <CircleDot />}</div>
        <span>{step}</span>
        {i < steps.length - 1 && <span className={`pipeline-link ${i < 3 ? 'pipeline-link-done' : ''}`} />}
      </div>)}
    </div>
    <section className="panel">
      <div className="panel-heading">
        <div><span className="eyebrow">SELECTED EVIDENCE CASE</span><h2>Ana Silva <span className="heading-slash">/</span> AI-assisted Financial Analysis</h2></div>
        <StatusBadge status="VERIFIED" />
      </div>
      <div>{evidence.map(([name, type, hash]) => <EvidenceRow key={name} name={name} type={type} hash={hash} />)}</div>
      <div className="provenance"><ChevronDown /><span>Provenance</span><span className="muted">Source · activity · evidence type · content hash · ingestion timestamp</span></div>
    </section>
  </div>
}

function EvidenceRow({ name, type, hash }: { name: string; type: string; hash: string }) {
  return <div className="evidence-row">
    <div className="file-icon"><FileText /></div>
    <div className="evidence-name"><strong>{name}</strong><span>{type}</span></div>
    <div className="hash"><span className="eyebrow">SHA-256</span><code>{hash}</code></div>
    <StatusBadge status="VERIFIED" />
    <button className="icon-button" aria-label={`Copy hash of ${name}`}><Copy /></button>
  </div>
}

/* ------------------------------------------------------------------
   CONSENSUS CORE — cada mecanismo veste o que ele é
   ------------------------------------------------------------------ */
function VerificationCard({ title, status, description, mechanism, variant }: { title: string; status: string; description: string; mechanism: string; variant: 'evidence' | 'ai' | 'verified' }) {
  return <div className={`verification-card verification-${variant}`}>
    <div className="verification-top">
      <div className="verification-icon">{variant === 'ai' ? <Fingerprint /> : <ShieldCheck />}</div>
      <StatusBadge status={status} />
    </div>
    <h3>{title}</h3>
    <p>{description}</p>
    <div className="card-meta"><span>MECHANISM <b>{mechanism}</b></span><span>VERSION <b>v1</b></span></div>
  </div>
}

function Evaluation({ conflict = false, setActive }: { conflict?: boolean; setActive: (value: string) => void }) {
  return <div className="page-content evaluation-page">
    <div className="page-heading compact">
      <div>
        <div className="evaluation-subject">
          <span className="avatar avatar-large">AS</span>
          <div><span className="eyebrow ac">SYNTHETIC DEMONSTRATION · DEFINED CAPABILITY</span><h1>Ana Silva <span className="heading-slash">/</span> AI-assisted Financial Analysis</h1></div>
        </div>
        <div className="meta-line"><span>Evaluation ID: <code>eval_01</code></span><span>Rule version: <code>v1</code></span><span>Updated: <code>2026-10-05 10:32</code></span></div>
      </div>
      <button className="button button-secondary"><FileText /> Verification rationale</button>
    </div>
    <div className="evaluation-layout">
      <section className="panel evidence-panel">
        <div className="panel-heading">
          <div><span className="eyebrow">EVIDENCE & PROVENANCE</span><h2>Submitted Evidence</h2></div>
          <span className="count-label">{evidence.length} ARTIFACTS</span>
        </div>
        <div>{evidence.map(([name, type, hash]) => <EvidenceRow key={name} name={name} type={type} hash={hash} />)}</div>
        <div className="provenance-table">
          <div className="provenance"><ChevronDown /><span>Provenance</span></div>
          <div className="prov-grid">
            <span>Source</span><strong>nexus://workspace/eval_01</strong>
            <span>Activity</span><strong>Financial analysis sprint 04</strong>
            <span>Ingestion</span><strong className="mono">2026-10-05 10:30 UTC</strong>
          </div>
        </div>
        <div className="integrity-note"><ShieldCheck /><span>Integrity verification confirms that each artifact matches its recorded content hash. It does not establish semantic truth.</span></div>
      </section>
      <section className="consensus-panel">
        <div className="panel-heading">
          <div><span className="eyebrow">CONSENSUS CORE</span><h2>Independent verification</h2></div>
          <span className="core-indicator"><span className="live-dot" />3 MECHANISMS</span>
        </div>
        <div className="verification-stack">
          <VerificationCard variant="evidence" title="Evidence Integrity Check" status="VERIFIED" description="Recorded content hash matches the submitted artifact. Evidence is associated with the expected subject and activity." mechanism="integrity" />
          <VerificationCard variant="verified" title="Deterministic Criteria Check" status="PASS" description="Defined structural criteria are satisfied independently of AI interpretation." mechanism="deterministic" />
          <VerificationCard variant="ai" title="AI Interpretation" status={conflict ? 'WARNING' : 'PASS'} description={conflict ? 'Semantic interpretation identifies insufficient support for criterion C4 and recommends additional evidence.' : 'Semantic interpretation supports the defined capability based on the submitted evidence.'} mechanism="interpretive" />
        </div>
        <div className="consensus-result">
          <span className="eyebrow">CONSENSUS OUTCOME</span>
          <div className="result-row">
            <div>
              <h2 className="ac">{conflict ? 'CONFLICT' : 'AGREEMENT'}</h2>
              <p>{conflict ? 'Verification mechanisms diverge. Competency state must not be updated automatically.' : 'Independent verification mechanisms are compatible and the evidence satisfies the defined criteria.'}</p>
            </div>
            <StatusBadge status={conflict ? 'CONFLICT' : 'AGREEMENT'} />
          </div>
          <div className="state-divider" />
          <span className="eyebrow">{conflict ? 'CURRENT COMPETENCY STATE' : 'COMPETENCY STATE'}</span>
          <div className="result-row">
            <div>
              <h2 className="state-ink">{conflict ? 'HOLD' : 'DEMONSTRATED'}</h2>
              <p>{conflict ? 'Awaiting human adjudication.' : 'Defined capability demonstrated under the current evidence contract and context.'}</p>
            </div>
          </div>
          {conflict && <>
            <button className="button button-primary" onClick={() => setActive('Adjudication Center')}>Open Human Adjudication <ArrowRight /></button>
            <div className="conflict-summary">
              <strong>WHY THIS IS A CONFLICT</strong>
              <span>Deterministic criteria <b className="b-review">PASS</b></span>
              <span>AI interpretation <b>WARNING</b></span>
              <span>Evidence integrity <b className="b-ac">VERIFIED</b></span>
              <span>State update <b className="b-review">BLOCKED</b></span>
            </div>
          </>}
        </div>
      </section>
    </div>
  </div>
}

function Queue() {
  return <div className="page-content">
    <div className="page-heading">
      <div><span className="eyebrow ac">STATE PRODUCTION</span><h1>Attestation Queue</h1><p>Review bounded competency states and their supporting verification record.</p></div>
      <span className="demo-pill"><span className="live-dot" />Synthetic workspace</span>
    </div>
    <div className="toolbar">
      <div className="filter-tabs"><button className="filter-active">All <span>3</span></button><button>Agreement</button><button>Insufficient Evidence</button><button>Conflict</button><button>Ready for Attestation</button></div>
      <div className="search-box"><Search /><input placeholder="Search person or defined capability..." /></div>
    </div>
    <section className="panel table-wrap">
      <table>
        <thead><tr><th>Person</th><th>Defined capability</th><th>Current state</th><th>Evidence</th><th>Consensus</th><th>Record</th></tr></thead>
        <tbody>
          <tr><td><strong>Ana Silva</strong></td><td>AI-assisted Financial Analysis</td><td><StatusBadge status="DEMONSTRATED" /></td><td className="mono">4 / 4</td><td><StatusBadge status="AGREEMENT" /></td><td className="mono">8f4e...a1b2</td></tr>
          <tr><td><strong>Beatriz Lima</strong></td><td>AI-assisted Development</td><td><StatusBadge status="IN_DEVELOPMENT" /></td><td className="mono">2 / 4</td><td><StatusBadge status="INSUFFICIENT_EVIDENCE" /></td><td className="mono">c902...e18a</td></tr>
          <tr><td><strong>Ana Silva</strong></td><td>AI-assisted Financial Analysis</td><td><span className="badge b-neutral">—</span></td><td className="mono">4 / 4</td><td><StatusBadge status="CONFLICT" /></td><td className="mono">04bd...77ef</td></tr>
        </tbody>
      </table>
    </section>
  </div>
}

/* ------------------------------------------------------------------
   ARCHITECTURE — fluxo de linha fina + escala de confiança N1–N4
   ------------------------------------------------------------------ */
function Architecture() {
  const stages = ['OBSERVABLE WORK', 'EVIDENCE', 'INDEPENDENT VERIFICATION', 'CONSENSUS CORE', 'COMPETENCY STATE', 'ATTESTATION', 'PUBLIC VERIFICATION']
  const levels: [string, string, string][] = [
    ['N1', 'Self-declared', 'No supporting artifact'],
    ['N2', 'Evidence presented', 'Artifacts submitted as-is'],
    ['N3', 'Analyzed', 'Criteria and interpretation applied'],
    ['N4', 'Source verified', 'Integrity anchored and publicly checkable'],
  ]
  return <div className="page-content">
    <div className="page-heading">
      <div><span className="eyebrow ac">TECHNICAL ARCHITECTURE</span><h1>How LASTRO Verifies Capability</h1><p>From observable work to a bounded, auditable competency state.</p></div>
    </div>
    <div className="architecture-layout">
      <div className="architecture-flow">
        {stages.map((stage, i) => <div className="flow-stage" key={stage}>
          <div className={`flow-node ${stage === 'INDEPENDENT VERIFICATION' ? 'flow-node-accent' : ''}`}>{i + 1 < 10 ? `0${i + 1}` : i + 1}</div>
          <div>
            <span className="eyebrow">{stage}</span>
            {stage === 'INDEPENDENT VERIFICATION' && <div className="mechanism-list"><span>Evidence Integrity</span><span>Deterministic Criteria</span><span className="ac">AI Interpretation</span></div>}
            {stage === 'CONSENSUS CORE' && <div className="outcome-list"><StatusBadge status="AGREEMENT" /><StatusBadge status="INSUFFICIENT_EVIDENCE" /><StatusBadge status="CONFLICT" /></div>}
          </div>
          {i < stages.length - 1 && <div className="flow-line" />}
        </div>)}
      </div>
      <aside>
        <div className="claims-panel">
          <span className="eyebrow">EPISTEMIC BOUNDARIES</span>
          <h2>What LASTRO does not claim</h2>
          {['Universal competence', 'Autonomous hiring or firing', 'AI as final authority', 'Blockchain as decision-maker', 'A score for human worth'].map(item => <div className="claim-row" key={item}><X />{item}</div>)}
          <div className="claims-note">AI interprets. Rules verify. Consensus determines the state. Humans resolve material conflicts.</div>
        </div>
        <div className="panel confidence-block">
          <span className="eyebrow">CONFIDENCE SCALE</span>
          <div className="confidence" style={{ marginTop: 12 }}>
            {levels.map(([n, title, note]) => <div className={`confidence-row ${n === 'N4' ? 'n4' : ''}`} key={n}>
              <span className="confidence-level">{n}</span>
              <div><strong>{title}</strong><p>{note}</p></div>
            </div>)}
          </div>
          <p className="muted" style={{ margin: '12px 0 0', fontSize: 11.5 }}>N1–N3 stay in grays. Blue is reserved for N4.</p>
        </div>
      </aside>
    </div>
  </div>
}

function Proof() {
  return <div className="page-content">
    <div className="page-heading">
      <div><span className="eyebrow ac">INDEPENDENT VERIFICATION</span><h1>Proof Verification</h1><p>Verify the integrity relationship between the attested state and its public Devnet record.</p></div>
      <span className="proof-pending"><span className="status-dot" />DEVNET PROOF PENDING</span>
    </div>
    <div className="proof-card">
      <div className="proof-card-top">
        <div className="proof-symbol"><Network /></div>
        <div><span className="eyebrow">ATTESTATION RECORD</span><h2>Competency State <StatusBadge status="DEMONSTRATED" /></h2></div>
      </div>
      <div className="proof-grid">
        <span>Defined capability</span><strong>AI-assisted Financial Analysis</strong>
        <span>Subject</span><strong>Ana Silva</strong>
        <span>Record hash</span><code>8f4e2a...b1c9d3</code>
        <span>Network</span><strong>Solana Devnet</strong>
        <span>Transaction</span><strong className="muted">Not available — proof pending</strong>
        <span>Attestation status</span><strong className="muted">NOT YET VERIFIED</strong>
        <span>Verification method</span><code>m3:verify</code>
      </div>
      <button className="button button-accent button-wide">Verify independently <ArrowRight /></button>
      <div className="proof-explanation"><ShieldCheck /><p>Solana does not determine the competency state. It provides the public integrity/attestation anchor for a state already produced by the LASTRO verification process.</p></div>
    </div>
    <p className="footer-note">Sensitive evidence remains off-chain. The public record is an integrity reference, not the underlying learning evidence.</p>
  </div>
}

function Audit() {
  const events: [string, string, string, string, string][] = [
    ['10:30', 'SYSTEM', 'Evidence ingested', '4 artifacts registered', 'INGESTION'],
    ['10:31', 'SYSTEM', 'Evidence integrity verified', 'SHA-256 content hashes matched', 'INTEGRITY'],
    ['10:31', 'SYSTEM', 'Deterministic criteria evaluated', 'PASS', 'DETERMINISTIC'],
    ['10:32', 'AI', 'Semantic interpretation completed', 'WARNING', 'INTERPRETATION'],
    ['10:32', 'SYSTEM', 'Consensus evaluated', 'CONFLICT', 'CONSENSUS'],
    ['10:34', 'HUMAN ADJUDICATOR', 'Adjudication recorded', 'IN_DEVELOPMENT', 'ADJUDICATION'],
    ['10:35', 'SYSTEM', 'State record generated', 'Record hash: 8f4e...a1b2', 'STATE'],
  ]
  return <div className="page-content">
    <div className="page-heading">
      <div><span className="eyebrow ac">PROVENANCE RECORD</span><h1>Audit Logs</h1><p>Trace the evidence, verification results, consensus outcome and adjudication history.</p></div>
      <button className="button button-secondary"><Database /> Export log</button>
    </div>
    <div className="audit-filters"><button>Date <ChevronDown /></button><button>Subject <ChevronDown /></button><button>Capability <ChevronDown /></button><button>Mechanism <ChevronDown /></button><button>Event type <ChevronDown /></button></div>
    <section className="audit-panel">
      {events.map(([time, actor, title, result, type]) => <div className="audit-event" key={`${time}-${title}`}>
        <div className="audit-time">{time}</div>
        <div className="audit-track"><div className={`audit-dot ${type === 'INTEGRITY' || type === 'STATE' ? 'audit-dot-ac' : ''}`} /><div className="audit-line" /></div>
        <div className="audit-body">
          <div className="audit-label"><span>{actor}</span><span>{type}</span></div>
          <strong>{title}</strong>
          <p>{result}</p>
          <span className="audit-ref">eval_01 · rule/v1 · reference →</span>
        </div>
      </div>)}
    </section>
  </div>
}

function Adjudication() {
  return <div className="page-content">
    <div className="page-heading">
      <div><span className="eyebrow ac">EXCEPTION PATH</span><h1>Human Adjudication</h1><p>Resolve a verification conflict while preserving the complete previous history.</p></div>
      <span className="badge b-review"><span className="badge-dot" />CONFLICT ACTIVE</span>
    </div>
    <div className="adjudication-layout">
      <section className="panel">
        <div className="panel-heading"><div><span className="eyebrow">SELECTED EVALUATION</span><h2>Ana Silva <span className="heading-slash">/</span> AI-assisted Financial Analysis</h2></div></div>
        <div className="divergence-grid">
          <div><span>Evidence Integrity Check</span><StatusBadge status="VERIFIED" /></div>
          <div><span>Deterministic Criteria Check</span><StatusBadge status="PASS" /></div>
          <div><span>AI Interpretation</span><StatusBadge status="WARNING" /></div>
        </div>
        <div className="adjudication-section">
          <span className="eyebrow">EVIDENCE CONSIDERED</span>
          {evidence.map(([name, , hash]) => <div className="mini-evidence" key={name}><FileText /><span>{name}</span><code>{hash}</code><Check /></div>)}
        </div>
      </section>
      <section className="panel decision-panel">
        <span className="eyebrow">ADJUDICATOR RATIONALE</span>
        <h2>Contextual decision</h2>
        <textarea placeholder="Explain the decision using the submitted evidence, defined criteria and relevant context." />
        <span className="eyebrow">DECISION</span>
        <div className="decision-options">
          <button className="decision-option"><span><CircleDot /></span><div><strong>DEMONSTRATED</strong><p>Defined capability is considered demonstrated after contextual adjudication.</p></div></button>
          <button className="decision-option decision-selected"><span><CircleDot /></span><div><strong>IN_DEVELOPMENT</strong><p>Evidence remains insufficient to support the defined capability.</p></div></button>
        </div>
        <button className="button button-primary button-wide">Record Adjudication <ArrowRight /></button>
        <p className="adjudication-note"><Fingerprint />Previous verification results, evidence references, rationale, timestamp and rule version are preserved.</p>
      </section>
    </div>
  </div>
}

function Footer() {
  return <footer className="app-footer">
    <div className="footer-row">
      <div className="footer-brand">
        <div className="brand-mark"><LastroLogo size={18} /></div>
        <div><strong>LASTRO</strong><span>DO APRENDIZADO À PROVA</span></div>
      </div>
      <div className="footer-tags">
        <span className="chip"><Network />SOLANA DEVNET</span>
        <span className="chip"><ShieldCheck />OFF-CHAIN EVIDENCE</span>
        <span className="chip"><Layers3 />BOUNDED STATES</span>
        <span className="chip"><LastroSymbolReduced size={11} />IDENTITY v0.1</span>
      </div>
      <p className="footer-meta">BUILT FOR COLOSSEUM / SUPERTEAM · SYNTHETIC DEMO DATA</p>
    </div>
  </footer>
}

const VIEWS = ['Overview', 'Evidence Pipeline', 'Attestation Queue', 'Adjudication Center', 'Proof Verification', 'Audit Logs', 'Evaluation Detail', 'Architecture']

export default function Page() {
  const [active, setActive] = useState('Overview')
  const [collapsed, setCollapsed] = useState(false)

  // Deep-linkable views: /#Evaluation%20Detail keeps the current screen shareable.
  useEffect(() => {
    const sync = () => {
      const view = decodeURIComponent(window.location.hash.replace(/^#/, ''))
      if (view && VIEWS.includes(view)) setActive(view)
    }
    sync()
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  const go = (view: string) => {
    setActive(view)
    if (typeof window !== 'undefined') window.history.replaceState(null, '', `#${encodeURIComponent(view)}`)
  }

  const renderContent = () => {
    if (active === 'Overview') return <Overview setActive={go} />
    if (active === 'Evidence Pipeline') return <Pipeline />
    if (active === 'Attestation Queue') return <Queue />
    if (active === 'Adjudication Center') return <Adjudication />
    if (active === 'Proof Verification') return <Proof />
    if (active === 'Audit Logs') return <Audit />
    if (active === 'Evaluation Detail') return <Evaluation setActive={go} />
    return <Architecture />
  }

  return <main className="app-shell">
    <Sidebar active={active} setActive={go} collapsed={collapsed} setCollapsed={setCollapsed} />
    <div className="main-area">
      <Topbar active={active} />
      <div className="main-scroll">{renderContent()}</div>
      <Footer />
    </div>
  </main>
}

export { Architecture }

export function Landing() { return <Architecture /> }
