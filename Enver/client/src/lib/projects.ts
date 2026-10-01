export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  client: string;
  tags: string[];
  description: string;
  challenge: string;
  solution: string;
  results: string[];
  techStack: string[];
  image: string;
  externalLink?: string;
  dossier: {
    domain: string;
    coreModel: string;
    primaryFunction: string;
    status: string;
    classification: string;
  };
}

export const projects: Project[] = [
  {
    slug: "artificer",
    title: "Artificer (Flagship MVP)",
    subtitle: "Enterprise Agentic AI underwriting engine for NTC MSMEs & institutional credit scoring.",
    client: "Enterprise Financial Infrastructure",
    tags: ["FLAGSHIP MVP", "FINTECH", "XAI UNDERWRITING", "VERTEX AI"],
    description:
      "Artificer is Enver's flagship production MVP: an enterprise-grade agentic AI underwriting engine engineered to evaluate New-to-Credit (NTC) MSMEs and commercial borrowers. Artificer parses alternative operational data streams — including banking transactions, GST tax returns, and digital ledgers — to generate dynamic risk matrices with transparent, tamper-evident forensic audit trails.",
    challenge:
      "The traditional credit decisioning 'black box' and outdated credit bureau scorecards systematically reject viable small businesses without formal credit history. Financial institutions require a sovereign, explainable system to ingest unstructured ledgers and generate verifiable underwriting memos in sub-2 seconds.",
    solution:
      "A multi-agent decisioning pipeline combining specialized reasoning models with deterministic cash-flow reconciliation. Artificer cross-verifies reported revenue against actual banking clearing cycles, outputting a verifiable forensic audit trail with direct citations to original ledger entries.",
    results: [
      "Dynamic credit scoring from alternative data streams (GST, invoices, bank feeds)",
      "Fully transparent XAI Audit Trail with direct citations and SHAP factor attribution",
      "Sub-2-second underwriting evaluation latency per commercial application",
      "Selected and accelerated under the BITSoM Vertex AI Incubatorship",
    ],
    techStack: ["Google Cloud Vertex AI", "AWS Activate", "Azure Container Apps", "FastAPI", "PostgreSQL", "Docker"],
    image: "/idbi_fintech.png",
    externalLink: "https://idbi.enveraitech.in",
    dossier: {
      domain: "Financial Technology & Underwriting",
      coreModel: "Artificer XAI Reasoning Core",
      primaryFunction: "Autonomous Underwriting & XAI Risk Matrix",
      status: "ACTIVE — Production MVP",
      classification: "FLAGSHIP ENTERPRISE MVP",
    },
  },
  {
    slug: "arbiter",
    title: "Arbiter",
    subtitle: "Cloud provisioning bot and operational sentinel with automated cost estimation and destructive-command firewall.",
    client: "Internal Tool & Enterprise Cloud Teams",
    tags: ["CLOUD OPS", "AZURE", "AWS", "GCP"],
    description:
      "A cloud infrastructure provisioning and governance sentinel. Engineers request resources directly through conversational ChatOps, and Arbiter estimates costs, routes for approval, and enforces cloud guardrails across AWS, GCP, and Azure.",
    challenge:
      "Engineering teams provisioning cloud resources manually face cost overruns, orphaned compute instances, and catastrophic accidental deletions of production databases.",
    solution:
      "Arbiter intercepts provisioning requests, calculates budget impact, and evaluates commands against strict policy guardrails. A deterministic firewall hard-blocks destructive commands (DROP, DELETE, destroy) on production cloud environments.",
    results: [
      "Zero accidental production deletions across multi-cloud environments",
      "Automated budget threshold approvals and cost telemetry",
      "Blocked 35+ destructive commands in first quarter",
      "Multi-cloud deployment ready for AWS, GCP, and Azure",
    ],
    techStack: ["Python", "Azure SDK", "GCP SDK", "AWS SDK", "Docker"],
    image: "/arbiter_cloud.png",
    externalLink: "https://enveraitech.in",
    dossier: {
      domain: "Cloud Operations",
      coreModel: "Custom Agentic Routing",
      primaryFunction: "Infrastructure Provisioning & Cost Guard",
      status: "ACTIVE — Enterprise Tool",
      classification: "ENTERPRISE CLOUD OPS",
    },
  },
  {
    slug: "cerberus",
    title: "Cerberus",
    subtitle: "Automated system health and security auditor for detecting hardcoded secrets and validating dependencies.",
    client: "Enterprise DevSecOps Teams",
    tags: ["DEVSECOPS", "AUDIT", "ZERO-TRUST"],
    description:
      "An automated security and health auditor that continuously scans codebases and configuration files. Cerberus identifies hardcoded secrets, audits Git tracking integrity, verifies critical dependencies, and checks local endpoint availability.",
    challenge:
      "Security anti-patterns like leaked API credentials or sensitive configurations tracked by Git create critical vulnerabilities. Manual code reviews catch issues too late in the deployment cycle.",
    solution:
      "Cerberus runs lightweight local audit scripts that traverse repositories, use regex and AST entropy analysis to flag leaked keys, verify input validation layers, and generate comprehensive Markdown and SARIF reports.",
    results: [
      "Immediate detection of leaked API keys and bearer tokens",
      "Prevents sensitive configuration tracking in Git",
      "Verifies essential validation and security dependencies",
      "Automated endpoint health diagnostics and compliance reports",
    ],
    techStack: ["Python", "Regex", "AST Entropy Analysis", "Markdown", "SARIF"],
    image: "/cerberus_security.png",
    externalLink: "https://enveraitech.in",
    dossier: {
      domain: "DevSecOps",
      coreModel: "Regex + Entropy Analysis",
      primaryFunction: "Secret Detection & Dependency Audit",
      status: "ACTIVE — Internal & Enterprise",
      classification: "SECURITY SENTINEL",
    },
  },
];
