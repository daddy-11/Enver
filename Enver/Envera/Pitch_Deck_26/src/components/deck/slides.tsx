import { SlideShell, GoldCard } from "./shell";

export const SLIDE_COUNT = 13;

export function SlideView({ index }: { index: number }) {
  const Slide = SLIDES[index] ?? SLIDES[0];
  return <Slide index={index} />;
}

function TitleSlide({ index }: { index: number }) {
  return (
    <div className="slide-stage">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,164,76,0.12),transparent_55%)]" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-24 text-center">
        <p className="slide-kicker mb-8">
          Google For Start-ups  ·  Builders Pitch Fest
        </p>
        <img
          src="/brand/enver-logo.png"
          alt="Enver AI Tech"
          className="mb-7 h-28 w-28 rounded-full object-cover ring-1 ring-gold/50"
        />
        <h1 className="slide-h1 text-6xl">Enver AI Tech</h1>
        <p className="mt-4 font-display text-2xl font-medium text-gold-2">
          Artificer — MVP
        </p>
        <p className="mt-4 max-w-3xl font-sans text-lg font-light leading-relaxed text-muted">
          Agentic underwriting for New-to-Credit MSMEs. A Gemini-native engine
          that returns an auditable credit decision in under 55 seconds.
        </p>
        <div className="gold-rule mx-auto mt-8" />
        <div className="mt-8 grid grid-cols-2 gap-x-16 text-left">
          <div>
            <p className="slide-kicker">CIN</p>
            <p className="mt-2 font-sans text-lg tracking-wide text-cream">
              U47190MH2023PTC402519
            </p>
          </div>
          <div>
            <p className="slide-kicker">GSTIN</p>
            <p className="mt-2 font-sans text-lg tracking-wide text-cream">
              27AAHCE5539J1ZA
            </p>
          </div>
        </div>
        <p className="mt-10 font-sans text-sm tracking-[0.2em] text-gold uppercase">
          ENVER-AITECH INDIA PRIVATE LIMITED  ·  Mumbai  ·  DPIIT DIPP193082
        </p>
      </div>
      <p className="absolute bottom-10 left-0 right-0 z-10 text-center font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
        Confidential  ·  {String(index + 1).padStart(2, "0")} / 13
      </p>
    </div>
  );
}

function PeopleSlide({ index }: { index: number }) {
  const domains = [
    ["01", "Multi-agent systems", "Fetcha / JEV / Geek / Orc graph, prompt isolation, SSE telemetry"],
    ["02", "Document intelligence", "Indian bank PDFs, GST challans, 50+ statement layouts"],
    ["03", "Quantitative telemetry", "Deterministic 5-pillar ratios — math in code, not in the model"],
    ["04", "MSME credit domain", "NTC cash-flow underwriting, PSL, RBI XAI language"],
    ["05", "Vertex AI / GCP", "Gemini 2.5 Flash & Pro, Cloud Run, org enveraitech.com"],
    ["06", "Product cockpit", "React 19 bento workbench, Google SSO, officer UX"],
    ["07", "Guardrails & XAI", "Schema rails, citation ledger, temperature-0 scoring"],
    ["08", "India Stack", "GSTN, Account Aggregator / Sahamati, MCA21, e-Courts"],
    ["09", "SecOps & evaluation", "AI monitoring, inactivity sentinel, Slack SecOps"],
  ];
  return (
    <SlideShell kicker="01  —  The people" index={index} total={SLIDE_COUNT}>
      <div className="flex items-end justify-between">
        <h2 className="slide-h2 text-4xl">Eleven engineers. Different AI domains. One firm.</h2>
        <p className="slide-kicker">Mumbai  ·  11</p>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <GoldCard>
          <p className="slide-kicker">Founder, CEO & Applied AI Architect</p>
          <p className="mt-2 font-display text-3xl text-gold-2">Amaan Shaikh</p>
          <p className="mt-3 font-sans text-[15px] font-light leading-relaxed text-cream/90">
            Builds the Artificer agent fleet on Vertex / Gemini — ingestion,
            grounded scoring, XAI drawer, and the GCP organisation it already runs on.
          </p>
        </GoldCard>
        <GoldCard>
          <p className="slide-kicker">Co-founder & Director  ·  DIN 10154247</p>
          <p className="mt-2 font-display text-3xl text-gold-2">Needa Kaiser Shaikh</p>
          <p className="mt-3 font-sans text-[15px] font-light leading-relaxed text-cream/90">
            Governance, security posture, and the AI monitoring / evaluation
            layer. Woman co-founded, DPIIT-recognised entity.
          </p>
        </GoldCard>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {domains.map(([n, t, b]) => (
          <div key={n} className="border border-line bg-grove-2/60 px-4 py-3">
            <p className="font-sans text-[10px] tracking-[0.2em] text-gold">{n}</p>
            <p className="mt-1 font-display text-lg text-gold-2">{t}</p>
            <p className="mt-1 font-sans text-[13px] font-light leading-snug text-muted">{b}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

function OriginSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="02  —  How we got here" index={index} total={SLIDE_COUNT}>
      <h2 className="slide-h2 text-5xl">We did not start in credit. Credit found the work.</h2>
      <div className="gold-rule mt-5" />
      <div className="mt-8 grid grid-cols-12 gap-8">
        <div className="col-span-7 space-y-5 font-sans text-[18px] font-light leading-relaxed text-cream/90">
          <p>
            Enver AI Tech was incorporated in May 2023 as a Mumbai applied-AI
            studio — multi-agent systems, document intelligence, and enterprise
            copilots for Indian operators who could not wait on a 40-person data team.
          </p>
          <p>
            Custom B2B work kept landing in the same place: a stack of PDFs, a
            GST login, and a human being asked to make a high-stakes decision
            by Friday. Nowhere was that more broken than MSME lending.
          </p>
          <p>
            India Stack had already made the data liquid — GSTN, Account Aggregator,
            MCA21. Banks still took two weeks, and still said no to New-to-Credit
            firms with real cash flow, because CIBIL was blank. That is the
            problem Artificer was built to close. It is our MVP. It is live.
          </p>
        </div>
        <div className="col-span-5 flex flex-col gap-4">
          {[
            ["2023", "Incorporate. Ship agentic systems for Indian enterprises."],
            ["2024–25", "DPIIT. Repeat pattern: unstructured Indian documents, no audit trail."],
            ["2026", "Artificer MVP — underwriting citadel on Gemini 2.5. Incubators. This room."],
          ].map(([y, t]) => (
            <GoldCard key={y}>
              <p className="slide-kicker">{y}</p>
              <p className="mt-2 font-sans text-[16px] font-light leading-relaxed text-cream/90">{t}</p>
            </GoldCard>
          ))}
        </div>
      </div>
    </SlideShell>
  );
}

function ProblemSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="03  —  The problem" index={index} total={SLIDE_COUNT}>
      <div className="grid grid-cols-12 gap-10 h-full">
        <div className="col-span-7">
          <h2 className="slide-h2 text-5xl">
            70% of New-to-Credit MSMEs
            <br />
            are rejected on an empty bureau.
          </h2>
          <div className="gold-rule mt-6" />
          <ul className="mt-8 space-y-3 font-sans text-[17px] font-light text-cream/90">
            <li className="border-l border-gold pl-4">63M MSMEs · ~30% of GDP · $300B+ credit gap (RBI / IFC)</li>
            <li className="border-l border-gold pl-4">CIBIL needs a repayment history these firms do not have — even when cash flow is real</li>
            <li className="border-l border-gold pl-4">Officers still line-read 100+ page statements. 3–5 days. $80–$150 a file.</li>
            <li className="border-l border-gold pl-4">Fraud the eye misses: circular trading, spoofed PDFs, GSTR-1 vs 3B gaps</li>
            <li className="border-l border-gold pl-4">RBI Digital Lending Guidelines forbid black-box scores. Every decline needs a reason.</li>
          </ul>
        </div>
        <div className="col-span-5 flex flex-col gap-4">
          <GoldCard className="flex-1">
            <p className="metric-num text-6xl">$300B+</p>
            <p className="mt-3 font-sans text-sm tracking-wide text-muted uppercase">MSME credit deficit</p>
          </GoldCard>
          <GoldCard className="flex-1">
            <p className="metric-num text-6xl">70%</p>
            <p className="mt-3 font-sans text-sm tracking-wide text-muted uppercase">NTC files rejected by bureau scoring</p>
          </GoldCard>
          <GoldCard className="flex-1">
            <p className="metric-num text-6xl">3–5 days</p>
            <p className="mt-3 font-sans text-sm tracking-wide text-muted uppercase">Manual TAT  ·  vs 55 seconds</p>
          </GoldCard>
        </div>
      </div>
    </SlideShell>
  );
}

function ProductSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="04  —  Artificer MVP" index={index} total={SLIDE_COUNT}>
      <h2 className="slide-h2 text-5xl">A credit file in 55 seconds. With the working shown.</h2>
      <p className="mt-4 max-w-3xl font-sans text-lg font-light text-muted">
        Artificer is Enver’s production MVP: an autonomous underwriting citadel
        for New-to-Credit MSMEs. Multi-modal ingest. Deterministic math.
        Line-item forensic citations.
      </p>
      <div className="mt-7 grid grid-cols-4 gap-4">
        {[
          ["Bank statements", "PDF / CSV · 50+ Indian layouts"],
          ["GST returns", "GSTR-1 vs GSTR-3B tax-gap check"],
          ["Account Aggregator", "Sahamati JSON · Setu / Finvu / Anumati"],
          ["Public registries", "GSTIN · MCA21 · e-Courts / NCLT"],
        ].map(([t, b]) => (
          <GoldCard key={t}>
            <p className="font-display text-xl text-gold-2">{t}</p>
            <p className="mt-2 font-sans text-sm font-light leading-relaxed text-muted">{b}</p>
          </GoldCard>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-4 gap-4">
        {[
          ["< 55s", "SSE-streamed TAT vs 3–5 days"],
          ["300–900", "Health score + LOW / MED / HIGH"],
          ["5 pillars", "Liquidity, revenue, stability, leverage, behaviour"],
          ["$0.02", "AI cost per file vs $80–$150 manual"],
        ].map(([n, l]) => (
          <div key={n} className="border-t border-gold pt-4">
            <p className="metric-num text-4xl">{n}</p>
            <p className="mt-2 font-sans text-sm text-muted">{l}</p>
          </div>
        ))}
      </div>
    </SlideShell>
  );
}

function AgentsSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="05  —  Agent fleet" index={index} total={SLIDE_COUNT}>
      <h2 className="slide-h2 text-4xl">Four agents. System 1 then System 2. Math is not left to the model.</h2>
      <p className="mt-3 max-w-4xl font-sans text-[16px] font-light text-muted">
        Kahneman split: JEV is the fast heuristic gate. Geek computes ratios in
        code. Gemini only reasons on top of ground truth.
      </p>
      <div className="mt-6 grid grid-cols-4 gap-4">
        {[
          ["01  Fetcha", "Gemini 2.5 Flash", "~5.8s", "Tabular parse, GSTIN / MCA21 / court scrape, canonical JSON. 50+ bank layouts without brittle regex."],
          ["01.5  JEV", "System 1 gate", "~0.4s", "Sanity + anti-tamper. GSTIN checksum, cash-flow plausibility, jailbreak intercept. APPROPRIATE / FLAG / REJECT."],
          ["02  Geek", "Gemini 2.5 Pro", "~34s", "5-pillar telemetry in financialTelemetry.js — CBR, ARR, GST recon, DSCP, bounce friction. Citations attached."],
          ["03  Orc", "Gemini 2.5 Pro", "~12s", "CCO synthesis: 300–900 score, risk tier, executive narrative, forensic ledger, XAI chat drawer."],
        ].map(([role, model, t, copy]) => (
          <GoldCard key={role} className="min-h-72">
            <p className="slide-kicker">{role}</p>
            <p className="mt-3 font-display text-2xl text-gold-2">{model}</p>
            <p className="mt-1 font-sans text-sm text-gold">{t}</p>
            <p className="mt-4 font-sans text-[15px] font-light leading-relaxed text-cream/90">{copy}</p>
          </GoldCard>
        ))}
      </div>
      <p className="mt-5 font-sans text-sm tracking-[0.14em] uppercase text-muted">
        Stack  ·  React 19  ·  Node / Express  ·  Vertex AI  ·  SSE  ·  Google SSO  ·  total TAT under 55s
      </p>
    </SlideShell>
  );
}

function PillarsSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="06  —  Five-pillar telemetry" index={index} total={SLIDE_COUNT}>
      <h2 className="slide-h2 text-4xl">Alternate data, scored like a credit committee.</h2>
      <div className="mt-6 grid grid-cols-5 gap-3">
        {[
          ["01  Liquidity", "Cash Buffer Ratio > 0.15x", "Min runway > 7–10 days", "OD utilisation < 60%"],
          ["02  Revenue", "Annualised run-rate", "3M growth trajectory", "GSTR-1 vs bank credits 0.9–1.1x"],
          ["03  Stability", "Inflow CV < 0.25", "Low-credit months", "Inward NACH bounce = 0% prime"],
          ["04  Leverage", "DSCP > 1.50x", "EMI burden < 15%", "New-borrowing velocity"],
          ["05  Behaviour", "Payroll regularity", "Cash withdrawals < 15%", "Circular trading / odd-hour flags"],
        ].map(([t, a, b, c]) => (
          <GoldCard key={t}>
            <p className="slide-kicker mb-3">{t}</p>
            <ul className="space-y-2 font-sans text-[14px] font-light leading-snug text-cream/90">
              <li>{a}</li>
              <li>{b}</li>
              <li>{c}</li>
            </ul>
          </GoldCard>
        ))}
      </div>
      <div className="mt-6 grid grid-cols-2 gap-4">
        <GoldCard>
          <p className="slide-kicker">GST tax gap</p>
          <p className="mt-2 font-sans text-[16px] font-light text-cream/90">
            (GSTR-1 declared tax − GSTR-3B tax paid) / GSTR-1. Benchmark {"< 5%"}. Above that, delinquency alert — not a vibes call.
          </p>
        </GoldCard>
        <GoldCard>
          <p className="slide-kicker">Why this is not a chatbot</p>
          <p className="mt-2 font-sans text-[16px] font-light text-cream/90">
            Ratios are computed in code, injected as ground truth, then the model narrates. Arithmetic accuracy is 100% by construction.
          </p>
        </GoldCard>
      </div>
    </SlideShell>
  );
}

function XaiSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="07  —  XAI & citadel" index={index} total={SLIDE_COUNT}>
      <h2 className="slide-h2 text-4xl">Every number cites a line. Then the cockpit locks.</h2>
      <div className="mt-6 grid grid-cols-2 gap-5">
        <GoldCard>
          <p className="slide-kicker mb-3">Forensic ledger</p>
          <ul className="space-y-3 font-sans text-[16px] font-light leading-relaxed text-cream/90">
            <li className="border-l border-gold pl-4">Score deductions map to page, row, timestamp</li>
            <li className="border-l border-gold pl-4">Conversational drawer — “why the penalty?”, “show Q2 bounces”</li>
            <li className="border-l border-gold pl-4">Temperature 0.0 · schema validation · output rails vs raw extract</li>
            <li className="border-l border-gold pl-4">Built for RBI Digital Lending audit, not a demo GIF</li>
          </ul>
        </GoldCard>
        <GoldCard>
          <p className="slide-kicker mb-3">Security citadel</p>
          <ul className="space-y-3 font-sans text-[16px] font-light leading-relaxed text-cream/90">
            <li className="border-l border-gold pl-4">Google SSO domain gate · @enveraitech.com</li>
            <li className="border-l border-gold pl-4">5-minute inactivity sentinel on PII</li>
            <li className="border-l border-gold pl-4">Zero-trace: in-memory ingest, unlink after inference</li>
            <li className="border-l border-gold pl-4">JEV jailbreak intercept + Slack SecOps on login / risk events</li>
          </ul>
        </GoldCard>
      </div>
      <p className="mt-6 font-sans text-[16px] font-light text-muted">
        Live cockpit: artificer.enveraitech.in — bento grid, 5-pillar radar, SSE agent visualiser, Orc XAI drawer.
      </p>
    </SlideShell>
  );
}

function TractionSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="08  —  Traction" index={index} total={SLIDE_COUNT}>
      <h2 className="slide-h2 text-5xl">Bootstrapped. Recognised. Shipping the MVP.</h2>
      <div className="mt-8 grid grid-cols-3 gap-4">
        {[
          ["May 2023", "Incorporated", "ENVER-AITECH INDIA PVT LTD · CIN U47190MH2023PTC402519 · GSTIN 27AAHCE5539J1ZA"],
          ["Feb 2025", "DPIIT recognised", "DIPP193082 — Startup India, valid through 2033. Domain: Artificial Intelligence."],
          ["2025–26", "Institutional incubators", "FITT IIT Delhi · Jubilant Bhartia Foundation · Hub71 validation workshop."],
          ["Live", "Artificer MVP", "artificer.enveraitech.in — four-agent cockpit, XAI drawer, Google-auth workbench."],
          ["1,000+", "Records benchmarked", "Indian bank statements and GST returns. 99.8% tabular extract · 100% arithmetic (code-grounded)."],
          ["Now", "Scaling the firm", "Team of 11. Woman co-founded. MeitY GENESIS and women-led grant pipeline in process. Mumbai HQ expansion."],
        ].map(([k, t, b]) => (
          <GoldCard key={t}>
            <p className="slide-kicker">{k}</p>
            <p className="mt-3 font-display text-2xl text-gold-2">{t}</p>
            <p className="mt-3 font-sans text-[15px] font-light leading-relaxed text-muted">{b}</p>
          </GoldCard>
        ))}
      </div>
    </SlideShell>
  );
}

function MarketSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="09  —  Market & model" index={index} total={SLIDE_COUNT}>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-7">
          <h2 className="slide-h2 text-5xl">A $1.2B software market on a $530B credit book.</h2>
          <div className="gold-rule mt-6" />
          <div className="mt-8 grid grid-cols-3 gap-4">
            {[
              ["TAM", "$530B", "Indian MSME commercial credit"],
              ["SAM", "$1.2B", "Underwriting software & data ingest"],
              ["SOM", "$45M ARR", "4-year target · 3–5% digital origination"],
            ].map(([k, n, l]) => (
              <div key={k} className="border-t border-gold pt-4">
                <p className="slide-kicker">{k}</p>
                <p className="metric-num mt-3 text-4xl">{n}</p>
                <p className="mt-2 font-sans text-sm text-muted">{l}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 font-sans text-[17px] font-light leading-relaxed text-cream/90">
            Buyers: CRO / CCO, Head of MSME. Users: credit officers. API evaluations
            plus enterprise licences — not a consumer app.
          </p>
        </div>
        <div className="col-span-5">
          <GoldCard className="h-full">
            <p className="slide-kicker mb-4">Unit economics</p>
            <p className="metric-num text-5xl">₹50</p>
            <p className="mt-2 font-sans text-sm text-muted">list price per evaluation</p>
            <div className="gold-rule my-6" />
            <p className="metric-num text-5xl">$0.02</p>
            <p className="mt-2 font-sans text-sm text-muted">Gemini cost · ~8.5k tokens / file</p>
            <div className="gold-rule my-6" />
            <p className="metric-num text-5xl">{">99%"}</p>
            <p className="mt-2 font-sans text-sm text-muted">cost reduction vs $80–$150 manual review</p>
          </GoldCard>
        </div>
      </div>
    </SlideShell>
  );
}

function WhyGoogleSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="10  —  Why Google" index={index} total={SLIDE_COUNT}>
      <h2 className="slide-h2 text-5xl">The MVP already runs on Vertex.</h2>
      <div className="gold-rule mt-5" />
      <div className="mt-8 grid grid-cols-2 gap-5">
        <GoldCard>
          <p className="slide-kicker mb-4">Running today</p>
          <ul className="space-y-3 font-sans text-[17px] font-light leading-relaxed text-cream/90">
            <li>GCP organisation <span className="text-gold-2">enveraitech.com</span></li>
            <li>Gemini 2.5 Flash (Fetcha) and Pro (Geek, Orc)</li>
            <li>Live SSE cockpit — not slideware</li>
            <li>Google SSO on the underwriting workbench</li>
          </ul>
        </GoldCard>
        <GoldCard>
          <p className="slide-kicker mb-4">What this room unlocks</p>
          <ul className="space-y-3 font-sans text-[17px] font-light leading-relaxed text-cream/90">
            <li>Production Gemini volume for live lender files</li>
            <li>Document AI for the long tail of Indian layouts</li>
            <li>BigQuery for GST / AA panels and default correlation</li>
            <li>A Google seat as the trust signal bank CROs take</li>
          </ul>
        </GoldCard>
      </div>
      <p className="mt-8 max-w-4xl font-sans text-lg font-light leading-relaxed text-muted">
        A foundation model will not learn GSTR-1 vs 3B, Sahamati consent, or RBI
        citation rules by accident. We put Gemini behind JEV, code-grounded Geek,
        and an evidence ledger — on Google’s stack, not beside it.
      </p>
    </SlideShell>
  );
}

function AskSlide({ index }: { index: number }) {
  return (
    <SlideShell kicker="11  —  The ask" index={index} total={SLIDE_COUNT}>
      <h2 className="slide-h2 text-5xl">Credits. A seat. No equity.</h2>
      <p className="mt-4 max-w-3xl font-sans text-lg font-light text-muted">
        Artificer is the MVP. Google already has the compute and the door.
        We are asking for both so eleven engineers can take a thousand records
        to the first lender books.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="border border-gold bg-grove-3 p-8">
          <p className="slide-kicker">01</p>
          <p className="mt-3 font-display text-3xl text-gold-2">Cloud credits</p>
          <p className="mt-4 font-sans text-[17px] font-light leading-relaxed text-cream/90">
            Google for Startups Cloud Program — AI-first track. Vertex Gemini,
            Cloud Run, BigQuery, Document AI. We are already on the organisation.
          </p>
        </div>
        <div className="border border-gold bg-grove-3 p-8">
          <p className="slide-kicker">02</p>
          <p className="mt-3 font-display text-3xl text-gold-2">Incubator seat</p>
          <p className="mt-4 font-sans text-[17px] font-light leading-relaxed text-cream/90">
            Google for Startups / Builders Pitch Fest pathway. Mentorship,
            Scale-tier credit path, and introductions into 6–9 month bank procurement.
          </p>
        </div>
      </div>
      <p className="mt-8 font-sans text-sm tracking-[0.16em] uppercase text-muted">
        Equity-free  ·  Gemini-native  ·  DPIIT  ·  Woman co-founded  ·  Team of 11  ·  Mumbai
      </p>
    </SlideShell>
  );
}

function CloseSlide({ index }: { index: number }) {
  return (
    <div className="slide-stage">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,164,76,0.12),transparent_55%)]" />
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-24 text-center">
        <img
          src="/brand/enver-logo.png"
          alt="Enver AI Tech"
          className="mb-8 h-24 w-24 rounded-full object-cover ring-1 ring-gold/50"
        />
        <p className="slide-kicker mb-6">Google For Start-ups  ·  Builders Pitch Fest</p>
        <h2 className="slide-h2 max-w-4xl text-5xl">
          Enver AI Tech. Artificer is the MVP.
        </h2>
        <div className="gold-rule mx-auto mt-8" />
        <p className="mt-8 max-w-2xl font-sans text-xl font-light leading-relaxed text-muted">
          Gemini that can show its working — for the MSMEs bureaus cannot see.
        </p>
        <div className="mt-12 grid grid-cols-3 gap-10 text-left">
          {[
            ["Product", "artificer.enveraitech.in"],
            ["Firm", "enveraitech.com"],
            ["Contact", "hanabi@enveraitech.com"],
          ].map(([k, v]) => (
            <div key={k}>
              <p className="slide-kicker">{k}</p>
              <p className="mt-2 font-display text-xl text-gold-2">{v}</p>
            </div>
          ))}
        </div>
        <p className="mt-14 font-sans text-sm tracking-[0.18em] text-gold uppercase">
          CIN U47190MH2023PTC402519  ·  GSTIN 27AAHCE5539J1ZA  ·  DIPP193082
        </p>
      </div>
      <p className="absolute bottom-10 left-0 right-0 z-10 text-center font-sans text-[11px] tracking-[0.2em] text-muted uppercase">
        Confidential  ·  {String(index + 1).padStart(2, "0")} / 13
      </p>
    </div>
  );
}

const SLIDES = [
  TitleSlide,
  PeopleSlide,
  OriginSlide,
  ProblemSlide,
  ProductSlide,
  AgentsSlide,
  PillarsSlide,
  XaiSlide,
  TractionSlide,
  MarketSlide,
  WhyGoogleSlide,
  AskSlide,
  CloseSlide,
];
