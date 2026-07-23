export type DiagramNode = { icon: string; label: string; sub: string; highlight?: boolean };

export type DiagramRow =
  | { type: 'chain'; nodes: DiagramNode[] }
  | { type: 'grid'; nodes: DiagramNode[] }
  | { type: 'groups'; groups: { label: string; nodes: DiagramNode[] }[] }
  | { type: 'label'; text: string };

export type Diagram = {
  label?: string;
  intro: string;
  rows: DiagramRow[];
  tags?: string[];
  caption: string;
};

export type CaseStudy = {
  projectId: string;
  breadcrumbLabel: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  techPills: { label: string; color: string }[];
  meta: { role: string; domain: string; primaryServices: string };

  problem: {
    functional: string[];
    nonFunctional: { label: string; text: string }[];
  };

  scale: {
    intro: string;
    stats: { value: string; label: string }[];
  };

  api: { signature: string; desc?: string }[];

  dataModel: {
    rows: { entity: string; fields: string }[];
    note: { code: string; text: string };
  };

  architecture: Diagram[];

  decisions: { color: string; label: string; text: string }[];

  summary: { system: string; primaryServices: string; status: string; type: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    projectId: 'rag-pipeline',
    breadcrumbLabel: 'RAG Ingestion Pipeline',
    eyebrow: 'Case Study · Data / AI Infrastructure',
    title: 'Document / RAG Ingestion Pipeline',
    subtitle: 'Extract, chunk, embed, and index documents into a per-tenant vector store — cheap to re-run, safe under partial failure, isolated across tenants.',
    techPills: [
      { label: 'AWS Textract', color: 'var(--soft)' },
      { label: 'Bedrock Titan', color: 'var(--yellow)' },
      { label: 'OpenSearch', color: 'var(--cyan)' },
      { label: 'Step Functions', color: 'var(--purple)' },
      { label: 'DynamoDB', color: 'var(--orange)' },
    ],
    meta: {
      role: 'Systems architecture & design',
      domain: 'Data / AI infrastructure',
      primaryServices: 'Textract · Bedrock · OpenSearch',
    },

    problem: {
      functional: [
        'Ingest documents from multiple sources: upload, S3 drop, web crawl, CMS webhook',
        'Extract text (OCR for scanned PDFs), chunk, embed, index for retrieval',
        'Support incremental re-ingestion — an edited doc shouldn\'t require reprocessing the whole corpus',
        'Multi-tenant isolation — no tenant\'s documents leak into another\'s retrieval results',
      ],
      nonFunctional: [
        { label: 'Freshness', text: 'newly ingested docs searchable within minutes' },
        { label: 'Idempotency', text: 're-ingestion must not duplicate vectors or double-bill embedding calls' },
        { label: 'Cost control', text: 'avoid re-embedding unchanged content' },
        { label: 'Durability', text: 'raw docs retained in S3 for re-embedding if the model changes' },
      ],
    },

    scale: {
      intro: 'Assume 10,000 documents, ~10 pages each, ~2,000 tokens/page → ~20,000 tokens/doc.',
      stats: [
        { value: '400,000', label: 'chunks for the initial bulk load (512-token chunks with overlap, ~40 chunks/doc)' },
        { value: '<15 min', label: 'pure embedding time at ~4,200 batched calls, 5 calls/sec — OCR is the real bottleneck' },
        { value: '20,000/day', label: 'steady-state chunks (500 updates/day) — trivial, but needs a content-hash check first' },
      ],
    },

    api: [
      { signature: 'extract(doc) → {text, metadata, page_count}', desc: 'Textract for scanned PDFs, native parsers for HTML/DOCX.' },
      { signature: 'chunk(text, strategy) → [{chunk_text, position, token_count}]' },
      { signature: 'embed(chunks[]) → [{chunk_id, vector}]', desc: 'Batched calls to Bedrock Titan / Cohere embeddings.' },
      { signature: 'upsert(tenant_id, chunk_id, vector, metadata)', desc: 'Writes vector namespace + metadata store, with rollback on partial failure.' },
      { signature: 'query(tenant_id, query_text, k) → [{chunk, score, source}]', desc: 'Retrieval-side consumer interface.' },
    ],

    dataModel: {
      rows: [
        { entity: 'Document', fields: 'doc_id, tenant_id, source_uri, content_hash, status, version, last_ingested' },
        { entity: 'Chunk', fields: 'chunk_id, doc_id, tenant_id, chunk_text, token_count, content_hash, position' },
        { entity: 'Vector index entry', fields: 'chunk_id, embedding_vector, embedding_model_version' },
        { entity: 'Ingestion job', fields: 'job_id, doc_id, stage, retries, error, started_at' },
      ],
      note: {
        code: 'content_hash',
        text: 'at both doc and chunk granularity is what makes re-ingestion cheap — skip unchanged docs entirely, or re-embed only the chunks that actually changed.',
      },
    },

    architecture: [
      {
        intro: 'Sources trigger a Step Functions orchestrator running four stages — extract, chunk, embed, upsert — writing into a per-tenant isolated storage layer.',
        rows: [
          {
            type: 'chain',
            nodes: [
              { icon: '⇧', label: 'Document sources', sub: 'S3 · crawl · CMS' },
              { icon: '◈', label: 'Orchestrator', sub: 'Step Functions', highlight: true },
            ],
          },
          {
            type: 'grid',
            nodes: [
              { icon: '⇄', label: 'Extract', sub: 'OCR / Textract' },
              { icon: '✂', label: 'Chunk', sub: 'Semantic split' },
              { icon: '⬡', label: 'Embed', sub: 'Bedrock Titan' },
              { icon: '⇩', label: 'Upsert', sub: 'Write vectors' },
            ],
          },
          { type: 'label', text: 'Storage layer · Per-tenant isolated' },
          {
            type: 'grid',
            nodes: [
              { icon: '▲', label: 'Vector store', sub: 'OpenSearch, per-tenant NS' },
              { icon: '▦', label: 'Metadata DB', sub: 'DynamoDB doc/chunk records' },
            ],
          },
        ],
        tags: ['Content-hash dedup cache', 'DLQ + retries', 'CloudWatch / X-Ray', 'Tenant IAM scoping'],
        caption: 'Fig. 3 — Four-stage pipeline writing into a per-tenant vector store and metadata database.',
      },
    ],

    decisions: [
      {
        color: 'var(--yellow)',
        label: 'Bottleneck — OCR is the slow stage, not embedding.',
        text: 'Parallelize across documents with a Step Functions Map state; skip OCR entirely for text-native PDFs via a fast pre-check.',
      },
      {
        color: 'var(--pink)',
        label: 'Cost — re-embedding unchanged content.',
        text: 'Hash at doc and chunk granularity; only re-embed chunks whose hash changed.',
      },
      {
        color: 'var(--purple)',
        label: 'Trade-off — chunking strategy.',
        text: 'Fixed-size is simple and fast but can split mid-thought; semantic/sentence-boundary chunking retrieves better at more compute cost.',
      },
      {
        color: 'var(--cyan)',
        label: 'Consistency — partial-failure visibility.',
        text: 'A doc\'s status only flips to indexed after every chunk write succeeds; failures route to a DLQ and the doc stays invisible to retrieval until resolved.',
      },
      {
        color: 'var(--green)',
        label: 'Multi-tenant isolation',
        text: 'should be structural — separate vector namespaces plus IAM scoping, not just an application-layer filter.',
      },
    ],

    summary: {
      system: 'Document / RAG Ingestion Pipeline',
      primaryServices: 'Textract · Bedrock · OpenSearch',
      status: 'Architecture complete',
      type: 'Multi-tenant pipeline',
    },
  },
  {
    projectId: 'contact-center-agent',
    breadcrumbLabel: 'Contact Center Agent & Eval Pipeline',
    eyebrow: 'Case Study · AI infrastructure at AWS',
    title: 'Contact Center Agent & Test/Eval Pipeline',
    subtitle: 'A production Connect + Lex + Bedrock contact center agent, backed by a git- and upload-driven eval pipeline that gates every prompt, knowledge base, or test-case change before it ships.',
    techPills: [
      { label: 'Amazon Connect', color: 'var(--soft)' },
      { label: 'Lex', color: 'var(--yellow)' },
      { label: 'Bedrock', color: 'var(--cyan)' },
      { label: 'AppSync', color: 'var(--purple)' },
      { label: 'DeepEval', color: 'var(--orange)' },
    ],
    meta: {
      role: 'Systems architecture & implementation',
      domain: 'Contact center + eval CI/CD',
      primaryServices: 'Connect · Lex · Bedrock · AppSync',
    },

    problem: {
      functional: [
        'Handle voice/chat contacts via Amazon Connect, routed through Lex for intent, escalating to a Bedrock agent for complex or RAG-based answers',
        'Engineers add or edit test cases two ways: upload a file (.xlsx/.json/.jsonl/.csv) through the React/AppSync frontend, or edit in the codebase via a git diff on test-case files',
        'Either path triggers an automated eval run — DeepEval metrics, a RAG groundedness checker, and a KB retrieval check — per agent the test case is associated with',
        'Results (scores, turns, ground truth, Bedrock Guardrails info) are queryable in CI logs, S3, DynamoDB, and the frontend dashboard',
      ],
      nonFunctional: [
        {
          label: 'Traceability', text: 'every test run ties to a specific git commit/diff or uploaded file version'
        },
        { label: 'CI/CD gate', text: 'pipeline flags or blocks deployment on score regression' },
        { label: 'CI-vendor agnostic', text: 'works across GitLab-CI, GitHub Actions, and CodeBuild — not locked to one platform' },
        { label: 'Isolation', text: 'CI eval traffic against Bedrock must not compete with production contact center traffic' },
        { label: 'Auditability', text: 'CloudWatch logs and CloudFormation-provisioned infra, reproducible end to end' },
      ],
    },

    scale: {
      intro: 'A typical PR touches ~200 test cases, each running 3 checks against an average of 2 associated agents.',
      stats: [
        { value: '1200', label: 'evaluation calls per pipeline run (200 cases × 3 checks × 2 agents)' },
        { value: '~4 min', label: 'CI gate time at 10 concurrent calls, ~2s avg latency — a reasonable merge-time cost' },
        { value: '5,000', label: 'concurrent production Connect contacts at peak — the number that drives Bedrock traffic isolation' },
      ],
    },

    api: [
      { signature: 'uploadTestFile(file) → presigned S3 URL', desc: 'AppSync mutation; client PUTs the file directly to S3.' },
      { signature: 'git diff → CI artifact → S3', desc: 'CI computes the diff on test-case files (GitHub, GitLab, or CodeCommit) and pushes it to the same S3 bucket.' },
      {
        signature: 'S3 event → Lambda → createTestRun(s3_key)', desc: 'Writes TestRun {test_run_id, status: PENDING} to DynamoDB, publishes to SQS.'
      },
      { signature: 'runTests(test_run_id)', desc: 'Per associated agent: DeepEval, RAG claims checker, KB retrieval check.' },
      { signature: 'writeResults(test_run_id, results[]) → S3 + DynamoDB', desc: 'Flips TestRun.status to COMPLETED.' },
      { signature: 'getTestRun(test_run_id)', desc: 'AppSync query/subscription powering the frontend\'s live status view.' },
    ],

    dataModel: {
      rows: [
        { entity: 'TestRun', fields: 'test_run_id, source (upload/git_diff), source_ref, status, created_at, triggered_by' },
        { entity: 'TestCase', fields: 'test_case_id, test_run_id, agent_id, input, ground_truth, conversation_turns[]' },
        { entity: 'TestResult', fields: 'test_case_id, test_run_id, agent_id, deepeval_scores{}, rag_claims_score, kb_retrieval_score, guardrails_info{}, latency_ms, pass_fail' },
        { entity: 'Agent config', fields: 'agent_id, bedrock_model_id, kb_id, prompt_version, connect_flow_id' },
      ],
      note: {
        code: 'source_ref',
        text: 'on TestRun is what makes a score regression traceable back to the exact commit or upload that caused it — without it, "the eval score dropped" has no owner.',
      },
    },

    architecture: [
      {
        label: 'Eval pipeline',
        intro: 'A test case either gets uploaded through the React/AppSync frontend or added via a git commit; both paths land in S3, trigger a Lambda that creates the test run record, and hand off through SQS to a CI/CD test stage running three checks per associated agent.',
        rows: [
          {
            type: 'grid',
            nodes: [
              { icon: '⇪', label: 'React upload', sub: 'JSON / CSV / upload' },
              { icon: '⎇', label: 'Git commit / diff', sub: 'GitLab · GitHub · CodeCommit' },
            ],
          },
          {
            type: 'chain',
            nodes: [
              { icon: '▤', label: 'S3 — test inputs', sub: 'Raw uploaded/diffed files' },
              { icon: 'ƒ', label: 'Lambda', sub: 'create test run', highlight: true },
            ],
          },
          { type: 'grid', nodes: [{ icon: '☰', label: 'SQS', sub: 'decouples create from run' }] },
          { type: 'label', text: 'CI/CD test stage · GitLab-CI · GitHub Actions · CodeBuild' },
          {
            type: 'grid',
            nodes: [
              { icon: '✓', label: 'DeepEval', sub: 'judge metrics' },
              { icon: '◎', label: 'Claims checker', sub: 'groundedness' },
              { icon: '🔎', label: 'KB retrieval', sub: 'recall / precision' },
            ],
          },
          {
            type: 'grid',
            nodes: [
              { icon: '▤', label: 'S3 — raw results', sub: 'full, pass/fail per case' },
              { icon: '▦', label: 'DynamoDB — scores', sub: 'aggregated, queryable' },
            ],
          },
          {
            type: 'grid',
            nodes: [{ icon: '⇄', label: 'AppSync API + React dashboard', sub: 'IAM + Cognito auth, CloudWatch + CloudFormation' }],
          },
        ],
        caption: 'Fig. 3a — Test entry (upload or git diff) converges on S3, runs through a CI test stage, and surfaces back in the same frontend.',
      },
      {
        label: 'Production runtime',
        intro: 'Connect handles the channel and routing. Lex resolves simple intents directly, and complex or knowledge-dependent queries escalate to the Bedrock agent, which draws on both a knowledge base and Lambda-backed tools.',
        rows: [
          {
            type: 'chain',
            nodes: [
              { icon: '👤', label: 'Customer', sub: 'voice / chat' },
              { icon: '☎', label: 'Amazon Connect', sub: 'contact flow + routing', highlight: true },
              { icon: '🔒', label: 'Cognito / IAM', sub: 'auth' },
            ],
          },
          { type: 'label', text: 'Conversational AI core' },
          {
            type: 'groups',
            groups: [
              {
                label: 'Intent & fulfillment',
                nodes: [
                  { icon: '🗣', label: 'Lex bot', sub: 'intent classification' },
                  { icon: 'ƒ', label: 'Lambda tools', sub: 'business logic' },
                ],
              },
              {
                label: 'Reasoning & knowledge',
                nodes: [
                  { icon: '🧠', label: 'Bedrock agent', sub: 'LLM + guardrails' },
                  { icon: '📚', label: 'Knowledge base', sub: 'RAG retrieval' },
                ],
              },
            ],
          },
        ],
        tags: ['Contact Lens transcripts', 'Glue ETL + Athena analytics', 'CloudWatch dashboards', 'CloudFormation IaC'],
        caption: 'Fig. 3b — Lex resolves intent directly; complex queries escalate to the Bedrock agent for RAG-backed reasoning.',
      },
    ],

    decisions: [
      {
        color: 'var(--yellow)',
        label: 'Bottleneck — per-agent fan-out in the test stage.',
        text: 'A test case associated with multiple agents multiplies the call count (200 cases × 2 agents × 3 checks = 1,200 calls). Agents run in parallel within the CI stage, with a per-PR cap on how many cases need the full 3-check suite vs. a lighter smoke subset.',
      },
      {
        color: 'var(--pink)',
        label: 'Decoupling via SQS.',
        text: 'Lambda publishes a message rather than invoking the CI pipeline directly — a CI outage doesn\'t lose the test run request, and multiple CI backends (GitLab-CI, GitHub Actions, CodeBuild) can all consume from the same queue depending on which repo triggered it.',
      },
      {
        color: 'var(--purple)',
        label: 'Trade-off — blocking vs. non-blocking CI gate.',
        text: 'Blocking the merge on eval regression is safer but costs iteration speed (~4 min); a non-blocking informational run with required manual sign-off is faster but relies on someone reading the report before it talks to real customers — blocking is the right default.',
      },
      {
        color: 'var(--cyan)',
        label: 'Reproducibility.',
        text: '`source_ref` (commit SHA or upload version) plus a pinned `bedrock_model_id` and `prompt_version` on the agent config means a score regression is always attributable to a specific change, not a moving target.',
      },
      {
        color: 'var(--green)',
        label: 'Guardrails as data, not just a gate.',
        text: 'Bedrock Guardrails info is stored per test result — not just pass/fail — so the claims checker can distinguish "failed because ungrounded" from "failed because guardrails blocked it." These need different fixes.',
      },
      {
        color: 'var(--orange)',
        label: 'Production isolation.',
        text: 'CI eval calls against Bedrock hit a separate rate-limit bucket from live contact center traffic, so a large eval run never competes with a customer waiting on a live response.',
      },
    ],

    summary: {
      system: 'Contact Center Agent & Eval Pipeline',
      primaryServices: 'Connect · Bedrock · AppSync',
      status: 'Shipped — in production at AWS',
      type: 'Contact center + eval CI/CD',
    },
  },
];
