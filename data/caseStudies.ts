export type DiagramNode = { icon: string; label: string; sub?: string; highlight?: boolean | 'purple' | 'green' | 'cyan' | 'yellow' | 'pink' };

export type DiagramRow =
  | { type: 'chain'; nodes: DiagramNode[]; arrowBefore?: boolean }
  | { type: 'grid'; nodes: DiagramNode[]; arrowBefore?: boolean }
  | { type: 'alt'; nodes: DiagramNode[]; arrowBefore?: boolean }
  | { type: 'groups'; groups: { label: string; nodes: DiagramNode[] }[]; arrowBefore?: boolean }
  | { type: 'label'; text: string; arrowBefore?: boolean };

export type Diagram = {
  label?: string;
  intro: string;
  rows: DiagramRow[];
  tags?: string[];
  note?: string;
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
    stats: { value: string; label: string; color?: string; accentBorder?: boolean }[];
  };

  apiSectionTitle?: string;
  api: { signature: string; desc?: string }[];

  dataModel: {
    rows: { entity: string; fields: string }[];
    note: string;
  };

  architecture: Diagram[];

  decisions: { color: string; label: string; text: string }[];

  lessonsLearned?: {
    heldUp: { label: string; text: string }[];
    differently: { label: string; text: string }[];
    ifStartedOver: string;
  };

  summary: { system: string; primaryServices: string; status: string; type: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    projectId: 'rag-pipeline',
    breadcrumbLabel: 'RAG Ingestion Pipeline',
    eyebrow: 'Case Study · Data / AI Infrastructure',
    title: 'Document / RAG Ingestion Pipeline',
    subtitle: 'Extract, chunk, embed, and index documents into a per-tenant vector store. Cheap to re-run, safe under partial failure, isolated across tenants.',
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
        'Support incremental re-ingestion. An edited doc shouldn\'t require reprocessing the whole corpus',
        'Multi-tenant isolation. No tenant\'s documents leak into another\'s retrieval results',
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
        { value: '<15 min', label: 'pure embedding time at ~4,200 batched calls, 5 calls/sec. OCR is the real bottleneck' },
        { value: '20,000/day', label: 'steady-state chunks (500 updates/day). Trivial, but needs a content-hash check first' },
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
      note: '`content_hash` at both doc and chunk granularity is what makes re-ingestion cheap, skip unchanged docs entirely, or re-embed only the chunks that actually changed.',
    },

    architecture: [
      {
        intro: 'Sources trigger a Step Functions orchestrator running four stages: extract, chunk, embed, upsert. Writing into a per-tenant isolated storage layer.',
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
        caption: 'Fig. 3: Four-stage pipeline writing into a per-tenant vector store and metadata database.',
      },
    ],

    decisions: [
      {
        color: 'var(--yellow)',
        label: 'Bottleneck. OCR is the slow stage, not embedding.',
        text: 'Parallelize across documents with a Step Functions Map state; skip OCR entirely for text-native PDFs via a fast pre-check.',
      },
      {
        color: 'var(--pink)',
        label: 'Cost. Re-embedding unchanged content.',
        text: 'Hash at doc and chunk granularity; only re-embed chunks whose hash changed.',
      },
      {
        color: 'var(--purple)',
        label: 'Trade-off. Chunking strategy.',
        text: 'Fixed-size is simple and fast but can split mid-thought; semantic/sentence-boundary chunking retrieves better at more compute cost.',
      },
      {
        color: 'var(--cyan)',
        label: 'Consistency. Partial-failure visibility.',
        text: 'A doc\'s status only flips to indexed after every chunk write succeeds; failures route to a DLQ and the doc stays invisible to retrieval until resolved.',
      },
      {
        color: 'var(--green)',
        label: 'Multi-tenant isolation',
        text: 'should be structural, separate vector namespaces plus IAM scoping, not just an application-layer filter.',
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
      { label: 'React', color: 'var(--pink)' },
      { label: 'S3', color: 'var(--green)' },
      { label: 'DynamoDB', color: 'var(--cyan)' },
      { label: 'SQS', color: 'var(--purple)' },
      { label: 'CloudWatch', color: 'var(--yellow)' },
      { label: 'CloudFormation', color: 'var(--orange)' },
      { label: 'GitLab-CI / GitHub Actions / CodeBuild', color: 'var(--soft)' },
      { label: 'Bedrock Guardrails', color: 'var(--pink)' },
      { label: 'Lambda', color: 'var(--cyan)' },
      { label: 'Cognito / IAM', color: 'var(--green)' },
      { label: 'Glue ETL + Athena', color: 'var(--purple)' },
      { label: 'Contact Lens transcripts', color: 'var(--yellow)' },
      { label: 'Python', color: 'var(--orange)' },
      { label: 'TypeScript', color: 'var(--pink)' },

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
        'Either path triggers an automated eval run. DeepEval metrics, a RAG groundedness checker, and a KB retrieval check, per agent the test case is associated with',
        'Results (scores, turns, ground truth, Bedrock Guardrails info) are queryable in CI logs, S3, DynamoDB, and the frontend dashboard',
      ],
      nonFunctional: [
        {
          label: 'Traceability', text: 'every test run ties to a specific git commit/diff or uploaded file version'
        },
        { label: 'CI/CD gate', text: 'pipeline flags or blocks deployment on score regression' },
        { label: 'CI-vendor agnostic', text: 'works across GitLab-CI, GitHub Actions, and CodeBuild, not locked to one platform' },
        { label: 'Isolation', text: 'CI eval traffic against Bedrock must not compete with production contact center traffic' },
        { label: 'Auditability', text: 'CloudWatch logs and CloudFormation-provisioned infra, reproducible end to end' },
      ],
    },

    scale: {
      intro: 'A typical PR touches ~200 test cases, each running 3 checks against an average of 2 associated agents.',
      stats: [
        { value: '1200', label: 'evaluation calls per pipeline run (200 cases × 3 checks × 2 agents)' },
        { value: '~4 min', label: 'CI gate time at 10 concurrent calls, ~2s avg latency, a reasonable merge-time cost' },
        { value: '5,000', label: 'concurrent production Connect contacts at peak. The number that drives Bedrock traffic isolation' },
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
      note: '`source_ref` on TestRun is what makes a score regression traceable back to the exact commit or upload that caused it. Without it, "the eval score dropped" has no owner.',
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
              { icon: '▤', label: 'S3 test inputs', sub: 'Raw uploaded/diffed files' },
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
              { icon: '▤', label: 'S3 raw results', sub: 'full, pass/fail per case' },
              { icon: '▦', label: 'DynamoDB scores', sub: 'aggregated, queryable' },
            ],
          },
          {
            type: 'grid',
            nodes: [{ icon: '⇄', label: 'AppSync API + React dashboard', sub: 'IAM + Cognito auth, CloudWatch + CloudFormation' }],
          },
        ],
        caption: 'Fig. 3a: Test entry (upload or git diff) converges on S3, runs through a CI test stage, and surfaces back in the same frontend.',
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
        caption: 'Fig. 3b: Lex resolves intent directly; complex queries escalate to the Bedrock agent for RAG-backed reasoning.',
      },
    ],

    decisions: [
      {
        color: 'var(--yellow)',
        label: 'Bottleneck. Per-agent fan-out in the test stage.',
        text: 'A test case associated with multiple agents multiplies the call count (200 cases × 2 agents × 3 checks = 1,200 calls). Agents run in parallel within the CI stage, with a per-PR cap on how many cases need the full 3-check suite vs. a lighter smoke subset.',
      },
      {
        color: 'var(--pink)',
        label: 'Decoupling via SQS.',
        text: 'Lambda publishes a message rather than invoking the CI pipeline directly, a CI outage doesn\'t lose the test run request, and multiple CI backends (GitLab-CI, GitHub Actions, CodeBuild) can all consume from the same queue depending on which repo triggered it.',
      },
      {
        color: 'var(--purple)',
        label: 'Trade-off. Blocking vs. non-blocking CI gate.',
        text: 'Blocking the merge on eval regression is safer but costs iteration speed (~4 min); a non-blocking informational run with required manual sign-off is faster but relies on someone reading the report before it talks to real customers, blocking is the right default.',
      },
      {
        color: 'var(--cyan)',
        label: 'Reproducibility.',
        text: '`source_ref` (commit SHA or upload version) plus a pinned `bedrock_model_id` and `prompt_version` on the agent config means a score regression is always attributable to a specific change, not a moving target.',
      },
      {
        color: 'var(--green)',
        label: 'Guardrails as data, not just a gate.',
        text: 'Bedrock Guardrails info is stored per test result, not just pass/fail, so the claims checker can distinguish "failed because ungrounded" from "failed because guardrails blocked it." These need different fixes.',
      },
      {
        color: 'var(--orange)',
        label: 'Production isolation.',
        text: 'CI eval calls against Bedrock hit a separate rate-limit bucket from live contact center traffic, so a large eval run never competes with a customer waiting on a live response.',
      },
    ],

    lessonsLearned: {
      heldUp: [
        {
          label: 'Making blocking the default CI gate, not an option,',
          text: 'held up under real pressure to ship faster. Every time someone pushed for a non-blocking "just this once," the ~4 minute cost looked small next to what a bad prompt change could do to a live customer conversation.',
        },
        {
          label: 'Storing Guardrails info as structured data, not just a pass/fail flag,',
          text: 'turned out to be the single most useful debugging decision. Separating "failed because ungrounded" from "failed because guardrails blocked it" meant fixes went to the right place instead of a shared bucket of "eval failures."',
        },
        {
          label: 'Decoupling test-run creation from execution via SQS',
          text: 'paid off during a real CI outage. The queue just held the backlog instead of silently dropping requests, and everything caught up once the runners came back.',
        },
      ],
      differently: [
        {
          label: "I didn't plan for per-agent fan-out until it was already a problem.",
          text: 'As more agents got added to the platform, the 1,200-call PR cost crept up without anyone deciding it should. A smoke-subset vs. full-suite split should\'ve been part of the design from the first agent, not a cap added after CI got slow.',
        },
        {
          label: 'Bedrock traffic isolation came after a scare, not before it.',
          text: "A large eval run competing with live contact volume during a peak window was the thing that forced separate rate-limit buckets. I'd provision that isolation on day one for anything touching a model shared with production.",
        },
        {
          label: 'Agent config (model ID, KB, prompt version) started as loose parameters,',
          text: 'not a versioned entity. Retrofitting `prompt_version` onto existing test results after the fact was more painful than just treating agent config as a first-class, versioned object from the start.',
        },
      ],
      ifStartedOver: 'provision Bedrock rate-limit isolation and a versioned agent-config entity before the first agent ships, and design the smoke-vs-full test split into the CI stage from day one rather than adding it once fan-out cost becomes visible.',
    },

    summary: {
      system: 'Contact Center Agent & Eval Pipeline',
      primaryServices: 'Connect · Bedrock · AppSync',
      status: 'Shipped in production at AWS',
      type: 'Contact center + eval CI/CD',
    },
  },
  {
    projectId: 'multi-agent-support',
    breadcrumbLabel: 'Multi-Agent Customer Support Platform',
    eyebrow: 'Case Study · Agentic AI',
    title: 'Multi-Agent Customer Support Platform',
    subtitle: 'A Bedrock supervisor agent routes to specialist agents, calls tools, and retrieves from a knowledge base, with guardrails and human escalation built in from the start.',
    techPills: [
      { label: 'Bedrock Agents', color: 'var(--soft)' },
      { label: 'OpenSearch', color: 'var(--cyan)' },
      { label: 'SQS', color: 'var(--purple)' },
      { label: 'Lambda', color: 'var(--yellow)' },
      { label: 'DynamoDB', color: 'var(--orange)' },
    ],
    meta: {
      role: 'Systems architecture & design',
      domain: 'Agentic AI / customer support',
      primaryServices: 'Bedrock Agents · OpenSearch · SQS',
    },

    problem: {
      functional: [
        'User submits a query via chat → system routes to the right specialist agent (order status, refunds, FAQ) and returns a coherent answer',
        'Agents call tools/APIs and retrieve from a knowledge base (RAG) for policy/FAQ questions',
        'Low-confidence or sensitive requests escalate to a human agent',
      ],
      nonFunctional: [
        { label: 'Latency', text: 'p95 under ~3s for a single-agent turn, up to ~8s for multi-hop tool use' },
        { label: 'Reliability', text: "tool calls must be idempotent, retried refund shouldn't double-refund" },
        { label: 'Safety', text: 'guardrails against prompt injection, PII leakage, off-policy responses' },
        { label: 'Observability', text: 'full trace of which agent handled a request and why' },
        { label: 'Cost control', text: 'token spend needs a model-tiering strategy, not one large model for everything' },
      ],
    },

    scale: {
      intro: 'Assume 500 concurrent conversations, each turn averaging 1,500 input tokens and 300 output tokens.',
      stats: [
        { value: '~90,000/sec', label: 'sustained token throughput at peak. 1,800 tokens/turn × 500 sessions turning over every ~10s' },
        { value: '2 calls', label: 'LLM invocations per turn. One small/fast routing call, one larger specialist call' },
        { value: 'RAG on path', label: 'retrieval latency sits before the specialist model responds, often the bigger lever than model choice' },
      ],
    },

    api: [
      { signature: 'POST /chat {session_id, message}', desc: 'WebSocket for streaming responses.' },
      { signature: 'Orchestrator → Bedrock Agent (routing)', desc: 'Returns {agent: order_status | refund | faq, confidence}.' },
      { signature: 'Agent → Action Group (Lambda)', desc: 'Structured tool-call interface. Bedrock Agents define action groups via OpenAPI schema, e.g. `getOrderStatus(order_id)`' },
      { signature: 'Agent → Knowledge Base . retrieve(query) → [{chunk, score, source}]', desc: 'Against a Bedrock Knowledge Base backed by OpenSearch Serverless.' },
    ],

    dataModel: {
      rows: [
        { entity: 'Session (DynamoDB)', fields: 'session_id, user_id, conversation_history, active_agent, last_updated' },
        { entity: 'Agent trace', fields: 'trace_id, session_id, agent_invoked, tools_called[], latency_ms, confidence_score' },
        { entity: 'Knowledge base doc', fields: 'doc_id, source_url, chunk_text, embedding_vector, last_indexed' },
        { entity: 'Tool call log', fields: 'call_id, tool_name, params, idempotency_key, result, status' },
      ],
      note: '`idempotency_key` on tool calls is what separates a working design from a naive one, without it, a retried Lambda invocation could double-process a refund.',
    },

    architecture: [
      {
        intro: 'Client hits API Gateway, which authenticates and routes to a Bedrock orchestrator agent. The orchestrator hands off to specialist agents, order status and knowledge/FAQ, which call action-group Lambdas and the knowledge base directly.',
        rows: [
          {
            type: 'chain',
            nodes: [
              { icon: '👤', label: 'Client', sub: 'Chat / voice' },
              { icon: '◈', label: 'API Gateway', sub: 'Auth + routing' },
              { icon: '🧠', label: 'Orchestrator', sub: 'Bedrock supervisor agent', highlight: true },
            ],
          },
          { type: 'label', text: 'Specialist agents · Bedrock Agents runtime' },
          {
            type: 'grid',
            nodes: [
              { icon: '📦', label: 'Order status agent', sub: 'Calls backend APIs' },
              { icon: '📚', label: 'Knowledge / FAQ agent', sub: 'RAG retrieval' },
            ],
          },
          { type: 'label', text: 'Tools & data' },
          {
            type: 'grid',
            nodes: [
              { icon: 'ƒ', label: 'Action groups', sub: 'Lambda tool calls' },
              { icon: '▲', label: 'Knowledge base', sub: 'OpenSearch vectors' },
            ],
          },
        ],
        tags: ['DynamoDB session state', 'CloudWatch / X-Ray tracing', 'Bedrock Guardrails', 'SQS escalation'],
        caption: 'Fig. 2: Orchestrator routes to specialist agents, which call tools and the knowledge base in parallel.',
      },
    ],

    decisions: [
      {
        color: 'var(--yellow)',
        label: 'Bottleneck. Sequential agent hops.',
        text: 'Orchestrator → specialist → tool call → synthesis can be 3–4 round trips. Use a fast/cheap routing model and let independent tool calls run in parallel, synthesizing once both return.',
      },
      {
        color: 'var(--pink)',
        label: 'Bottleneck. RAG retrieval on the critical path.',
        text: 'Cache frequent queries, pre-fetch likely-relevant docs from the routing classification, keep chunk size small.',
      },
      {
        color: 'var(--purple)',
        label: 'Trade-off. Single agent vs. multi-agent orchestration.',
        text: 'Multi-agent buys modularity and per-task accuracy at the cost of coordination complexity and added latency per hop.',
      },
      {
        color: 'var(--cyan)',
        label: 'Reliability.',
        text: 'A refund Lambda must dedupe on `idempotency_key` since agent retries could otherwise trigger the same side effect twice.',
      },
      {
        color: 'var(--green)',
        label: 'Safety.',
        text: 'Bedrock Guardrails filter input and output; low-confidence routing or guardrail trips push the session to SQS for human pickup rather than letting the agent guess.',
      },
    ],

    summary: {
      system: 'Multi-Agent Customer Support Platform',
      primaryServices: 'Bedrock Agents · OpenSearch · SQS',
      status: 'Architecture complete',
      type: 'Multi-agent orchestration',
    },
  },
  {
    projectId: 'attest',
    breadcrumbLabel: 'Attest — Lease Intelligence',
    eyebrow: 'Case Study · Document AI & Trust Infrastructure',
    title: 'Attest — Lease Intelligence with a Verifiable Trust Layer',
    subtitle: 'A commercial lease abstraction tool where every extracted field is grounded, verified, and cited back to its source page before it\'s shown as fact — built to close the gap between AI adoption and AI trust in commercial real estate.',
    techPills: [
      { label: 'Next.js 16', color: 'var(--cyan)' },
      { label: 'TypeScript', color: 'var(--green)' },
      { label: 'Claude', color: 'var(--purple)' },
      { label: 'SQLite · Drizzle', color: 'var(--orange)' },
      { label: 'pdf.js', color: 'var(--pink)' },
    ],
    meta: {
      role: 'Full-stack build, pipeline & eval design',
      domain: 'Commercial real estate · document intelligence',
      primaryServices: 'Claude API · pdf.js · Drizzle · SQLite',
    },

    problem: {
      functional: [
        'Extract ~18 lease-economics fields across six groups: parties & premises, term, rent & escalation, options & notice, expenses, risk clauses',
        'Derive critical dates (notice windows, expiration) and risk flags from verified extraction data — never from a raw model guess',
        'Every field click-to-source: one click from any value to its exact page and cited passage in the source PDF',
      ],
      nonFunctional: [
        { label: 'Groundedness', text: 'no extracted value shown as fact without a citation verified against the source page' },
        { label: "Refuse, don't guess", text: 'a derived date on an unverified input field blocks with a stated reason rather than computing anyway' },
        { label: 'Reproducibility', text: 'every extraction versioned by `run_id` and `prompt_version`, so any two eval runs are diffable field by field' },
      ],
    },

    scale: {
      intro: 'Built and scored against real, publicly filed commercial leases — not synthetic data.',
      stats: [
        { value: '10', label: 'real commercial office leases seeded from SEC EDGAR EX-10 exhibits, processed end to end', color: 'var(--cyan)' },
        { value: '126', label: 'hand-labeled gold fields across 7 documents — the ground truth the eval harness scores against', color: 'var(--green)' },
        { value: '57', label: 'passing tests, including pure-function unit coverage on the date-derivation engine', color: 'var(--purple)' },
      ],
    },

    apiSectionTitle: 'Pipeline design',
    api: [
      { signature: '// six stages, each independently callable and testable' },
      { signature: 'ingest(pdf) → pages[]  // pdf.js text + coordinates, no OCR needed' },
      { signature: 'extract(pages, fieldGroup) → candidate[]  // two-pass: route pages, then extract per group' },
      { signature: 'verify(candidate) → {value, confidence, evidence}  // grounding + verifier pass' },
      { signature: 'persist(verified, runId, promptVersion) → extraction  // immutable, versioned rows' },
      { signature: 'derive(extractions) → {dates[], flags[]}  // pure functions, no LLM call, blocks on low confidence' },
      { signature: 'surface(document) → reviewUI  // PDF + extraction side by side, click-to-source' },
    ],

    dataModel: {
      rows: [
        { entity: 'documents', fields: 'id, slug, type, status, source_path' },
        { entity: 'pages', fields: 'document_id, page_number, text, item_index' },
        { entity: 'extractions', fields: 'field, value, evidence_text, page, confidence, run_id, prompt_version' },
        { entity: 'derived_dates', fields: 'document_id, kind, date, status (ok / blocked), reason' },
        { entity: 'risk_flags', fields: 'document_id, flag, present, source_extraction_id' },
        { entity: 'gold_labels / eval_runs', fields: 'field, expected_value, run_id, field_score, date_score' },
      ],
      note: '`run_id` + `prompt_version` on every extraction is what makes a score regression traceable to the exact prompt change that caused it — without it, "accuracy dropped" has no owner.',
    },

    architecture: [
      {
        intro: 'A document either seeds from fixtures or is uploaded; both paths run the same six-stage pipeline. The eval harness reads through the same persistence layer as the app — never a parallel scoring path.',
        rows: [
          {
            type: 'chain',
            nodes: [
              { icon: '⇧', label: 'Ingest', sub: 'pdf.js → text + coords' },
              { icon: '⇄', label: 'Extract', sub: 'Claude, two-pass' },
              { icon: '✓', label: 'Verify', sub: 'grounding + verifier pass', highlight: 'green' },
            ],
          },
          {
            type: 'chain',
            nodes: [
              { icon: '▤', label: 'Persist', sub: 'SQLite, versioned', highlight: 'cyan' },
              { icon: 'ƒ', label: 'Derive', sub: 'dates + risk flags' },
              { icon: '⧉', label: 'Surface', sub: 'review UI' },
            ],
          },
        ],
        note: '↳ eval harness reads Persist directly — 20-doc gold set, field + derived-date accuracy, diffed by run',
        caption: 'Fig. 5a — six-stage pipeline; the trust layer (green) is where grounding and verification gate every field before it reaches the UI.',
      },
    ],

    decisions: [
      {
        color: 'var(--pink)',
        label: 'Risk flags, not a composite score.',
        text: 'A weighted risk score implies validated weights nobody — this build included — can actually justify. Individually-cited presence/absence flags let the reviewer judge risk instead of trusting an unverifiable number.',
      },
      {
        color: 'var(--yellow)',
        label: 'Owner/asset-manager point of view, stated explicitly.',
        text: "Clauses like co-tenancy read as risk to one party and protection to the other. A perspective-agnostic tool isn't a neutral default — it's roughly double the scope. Named the lens in the UI rather than silently picking one while claiming objectivity.",
      },
      {
        color: 'var(--purple)',
        label: "Block, don't guess, on derived dates.",
        text: 'If an input field feeding a critical-date calculation falls below confidence threshold, the date is `blocked` with a stated reason — not computed. Date errors compound silently across multiple fields; refusing is safer than guessing.',
      },
      {
        color: 'var(--green)',
        label: 'Direct Anthropic API, not Bedrock.',
        text: 'Production would run on Bedrock for VPC posture and data residency. This build optimizes for a reviewer running it without provisioning AWS — a deliberate trade made for the audience, not a technical limitation.',
      },
      {
        color: 'var(--orange)',
        label: 'SQLite, not Postgres.',
        text: 'Zero setup — the seeded database ships in the repo so the app runs with no external dependency and no API key required to browse existing documents.',
      },
      {
        color: 'var(--cyan)',
        label: 'Single document type: office leases only.',
        text: 'No retail, no industrial, no amendment-chain resolution. Narrowed scope to put the majority of build time into the verification layer rather than extraction breadth.',
      },
    ],

    lessonsLearned: {
      heldUp: [
        {
          label: 'Grounding catches fabrication cheaply.',
          text: 'String-matching evidence text against the source page is deterministic and free — it rejects a real class of hallucination before a value is ever persisted.',
        },
        {
          label: 'The honest-gap split proved the thesis.',
          text: 'Parties & premises scored 94% grounded; risk clauses scored 0% — not random error, but the system correctly refusing to assert an absent clause as a confirmed fact.',
        },
        {
          label: 'Two-pass extraction paid for itself.',
          text: 'Routing pages to field groups before extracting sharpened accuracy and cut cost versus one long-context prompt over the full document.',
        },
      ],
      differently: [
        {
          label: 'Ship self-consistency scoring, not defer it.',
          text: 'One of three planned trust signals was cut once grounding and the verifier pass caught most failures — a real gap that should close before this handles higher-stakes fields.',
        },
        {
          label: 'Give extraction a way to say "confirmed absent."',
          text: 'The current schema can\'t distinguish "not found in routed pages" from "clause confirmed absent" — the direct mechanism behind the 0% risk-clause number.',
        },
        {
          label: 'Sequence backend before UI more strictly.',
          text: "Building review-workspace screens ahead of the wired backend was a deliberate, logged deviation — it worked, but it's a sequencing risk I'd tighten next time.",
        },
      ],
      ifStartedOver: "I'd design the negative-claim extraction path and lock the confidence threshold before writing a single prompt — both were discovered mid-build instead of decided up front.",
    },

    summary: {
      system: 'Attest — Lease Intelligence',
      primaryServices: 'Claude · pdf.js · Drizzle',
      status: 'Built — portfolio demo',
      type: 'Document intelligence pipeline',
    },
  },
  {
    projectId: 'sentinel',
    breadcrumbLabel: 'Sentinel — Eval-as-MCP-Server',
    eyebrow: 'Case Study · AI Eval Infrastructure · Portfolio Project',
    title: 'Sentinel — Eval-as-MCP-Server',
    subtitle: "An MCP server that scores AI agent responses before they reach a user, not after. Deterministic checks resolve the obvious cases for free; only genuinely ambiguous responses escalate to a judge model.",
    techPills: [
      { label: 'Model Context Protocol', color: 'var(--orange)' },
      { label: 'TypeScript', color: 'var(--cyan)' },
      { label: 'Next.js', color: 'var(--green)' },
      { label: 'Vercel', color: 'var(--purple)' },
      { label: 'mcp-handler', color: 'var(--pink)' },
      { label: 'Zod v4', color: 'var(--orange)' },
      { label: 'Anthropic API', color: 'var(--yellow)' },
      { label: 'node:test', color: 'var(--cyan)' },
    ],
    meta: {
      role: 'Solo design & implementation',
      domain: 'AI eval & agent reliability',
      primaryServices: 'MCP · Next.js · Vercel · Zod',
    },

    problem: {
      functional: [
        "Score an agent's response against configurable checks — groundedness, prompt injection — callable as an MCP tool from any agent runtime",
        'Deterministic pattern matching resolves clear-cut cases with no model call; ambiguous cases escalate to a judge, bounded by a per-metric latency budget',
        "Every tenant explicitly configures fail-open vs. fail-closed behavior on judge timeout — no system-wide default",
        'The same business logic runs behind two transports: stdio for local agents, stateless HTTP for remote deploy',
      ],
      nonFunctional: [
        { label: 'Zero-config local dev', text: 'full test suite and both tools run offline against stub judges, no API key required' },
        { label: 'Fixed cost at idle', text: 'every layer of the stack scales to zero — Vercel functions, planned Neon/R2 persistence' },
        { label: 'Reproducibility', text: 'every verdict pins its metric version and judge model, re-derivable later' },
        { label: 'No unauthenticated tool calls', text: 'tenant ID comes only from a validated bearer token, never a request argument' },
      ],
    },

    scale: {
      intro: 'A bootstrap build: single developer, low fixed cost, nothing requiring a company cloud account. The numbers below are the budget the architecture had to hold under from day one, not traffic figures yet.',
      stats: [
        { value: '250ms', label: 'Per-metric judge timeout, enforced server-side — a slow eval is a broken eval in the hot path', color: 'var(--yellow)', accentBorder: true },
        { value: '22', label: 'Automated tests across both metrics and both tool handlers, all passing with zero network calls', color: 'var(--green)', accentBorder: true },
        { value: '$0', label: 'Fixed infra cost at idle — every layer of the stack scales to zero, no standing bill', color: 'var(--cyan)', accentBorder: true },
      ],
    },

    api: [
      { signature: 'flag_injection(response, context?) → EvaluationResult', desc: 'MCP tool call. Validated by the same zod schema on both the stdio and HTTP transports.' },
      { signature: 'evaluateInjection(request, {judge, policy}) → Verdict', desc: 'Deterministic tier resolves override + compliance pattern matches directly; only the ambiguous middle escalates.' },
      { signature: 'check_groundedness(response, context) → EvaluationResult', desc: 'Requires at least one context item. Nothing to ground against is a caller error, rejected before the metric runs.' },
      { signature: 'resolveCitations(citations, context) → per-citation status', desc: 'Negation-window check: a citation only appearing inside a denial ("no section 9.2 exists") counts as unresolved.' },
      { signature: 'buildEvaluationResult(verdicts, policy) → EvaluationResult', desc: 'Rolls up N verdicts into one action (strictest wins) and a 0–100 trust score.' },
      { signature: 'withMcpAuth(handler, verifyToken) → authed HTTP route', desc: 'Bearer-token verification on the Vercel deploy target. Tenant ID comes only from the validated token.' },
    ],

    dataModel: {
      rows: [
        { entity: 'ScoringRequest', fields: 'response, context[] (source, content, id), taskDescription?, correlationId?, policyOverride?' },
        { entity: 'Verdict', fields: 'metric, outcome (pass/warn/block/timeout), score, threshold, reason, citedContextIds[], decidedBy (heuristic/judge/cache), judge?, metricVersion, latencyMs' },
        { entity: 'EvaluationResult', fields: 'requestId, verdicts[], action, trustScore, totalLatencyMs' },
        { entity: 'MetricPolicy', fields: 'metric, enabled, threshold, onTimeout (fail_open/fail_closed), maxJudgeLatencyMs' },
        { entity: 'TenantPolicy', fields: 'tenantId, metrics[], aggregation (strictest/weighted), archivePayloads (opt-in, default false)' },
      ],
      note: '`decidedBy` on every Verdict is what makes the cost story auditable — it\'s the field that proves a judge model wasn\'t called when it didn\'t need to be, not just a claim in a case study.',
    },

    architecture: [
      {
        label: 'Scoring flow',
        intro: "Both tools converge on the same escalation ladder: deterministic checks first, a judge model only for what they can't resolve.",
        rows: [
          {
            type: 'alt',
            nodes: [
              { icon: '📤', label: 'flag_injection', sub: 'tool call' },
              { icon: '📤', label: 'check_groundedness', sub: 'tool call' },
            ],
          },
          { type: 'chain', nodes: [{ icon: '⊘', label: 'Handler layer', sub: 'validate · resolve tenant policy', highlight: 'yellow' }] },
          { type: 'chain', nodes: [{ icon: '📐', label: 'Policy resolution', sub: 'threshold · fail-open/closed', highlight: 'purple' }] },
          { type: 'label', text: 'Deterministic tier · regex / citation matching' },
          {
            type: 'grid',
            nodes: [
              { icon: 'abc', label: 'Pattern matcher', sub: 'injection metric' },
              { icon: '🔍', label: 'Citation resolver', sub: 'groundedness metric' },
            ],
          },
          { type: 'label', text: 'Escalates only if ambiguous', arrowBefore: false },
          {
            type: 'alt',
            arrowBefore: true,
            nodes: [
              { icon: '✓', label: 'Confident verdict', sub: 'no judge call', highlight: 'green' },
              { icon: '⚖', label: 'Judge model call', sub: 'Anthropic API', highlight: 'pink' },
            ],
          },
          { type: 'chain', nodes: [{ icon: '📤', label: 'EvaluationResult returned', highlight: 'cyan' }] },
        ],
        caption: 'Fig. 2a — Most calls resolve at the deterministic tier. The judge is an escalation path, not the default route.',
      },
      {
        label: 'Deploy topology',
        intro: 'Two transports, one shared handler core. Neither entrypoint imports anything the other depends on.',
        rows: [
          {
            type: 'alt',
            nodes: [
              { icon: '💻', label: 'Claude Desktop / Cursor', sub: 'stdio transport', highlight: 'yellow' },
              { icon: '🌐', label: 'Vercel HTTP route', sub: 'mcp-handler, bearer token', highlight: 'yellow' },
            ],
          },
          { type: 'label', text: 'Shared handler core' },
          {
            type: 'groups',
            groups: [
              {
                label: 'Tool handlers',
                nodes: [
                  { icon: '🛡', label: 'flagInjection' },
                  { icon: '📎', label: 'checkGroundedness' },
                ],
              },
              {
                label: 'Supporting layers',
                nodes: [
                  { icon: '📋', label: 'Policy registry' },
                  { icon: '🧪', label: 'Judge stubs' },
                ],
              },
            ],
          },
        ],
        tags: ['node:test suite', 'tsx runtime', 'Vercel Functions', 'Claude Desktop config'],
        caption: 'Fig. 2b — Adding the HTTP deploy target was one new route file plus a thin auth module, not a parallel implementation.',
      },
    ],

    decisions: [
      {
        color: 'var(--yellow)',
        label: 'Trap. The obvious groundedness heuristic is dangerous.',
        text: 'Checking whether a cited string merely appears in the source context looks right and is wrong — a document denying a claim ("no section 9.2 exists") contains the fabricated citation as a literal substring. A negation-window check around every match closes the gap a naive presence check would rubber-stamp.',
      },
      {
        color: 'var(--pink)',
        label: 'Trade-off. Heuristic-first, judge as escalation, not default.',
        text: "Every metric runs deterministic pattern or citation matching first and only calls a judge model for the genuinely ambiguous middle, bounded by a per-metric timeout independent of the whole request's budget. Most traffic never reaches the judge.",
      },
      {
        color: 'var(--cyan)',
        label: 'Invariant. No default for fail-open vs. fail-closed.',
        text: 'A tenant sets this explicitly per metric; there\'s no system-wide fallback. A finance tenant and a marketing tenant disagree about what "the judge timed out" should mean, and guessing wrong for either is worse than forcing the choice.',
      },
      {
        color: 'var(--green)',
        label: 'Constraint. Two MCP server packages, one shared handler layer.',
        text: 'The stdio transport and the HTTP transport have different `registerTool` signatures and different zod version requirements. Keeping handlers as plain functions with zero transport imports meant the HTTP deploy target was additive, not a rewrite.',
      },
      {
        color: 'var(--purple)',
        label: 'Bootstrap-first. Vendor names quarantined to two folders.',
        text: 'Cloudflare Workers, Neon, R2, and Anthropic-direct over Bedrock/AgentCore, chosen because every piece scales to zero at idle. No vendor name appears outside `judges/` and `persistence/`.',
      },
      {
        color: 'var(--orange)',
        label: 'Verification. Proved the HTTP route in-process, not just by type-check.',
        text: "A background dev server can't survive between tool calls in every environment. Pointing a real MCP client's `fetch` option directly at the exported route handler proved the auth and scoring path end to end without depending on a live socket.",
      },
    ],

    lessonsLearned: {
      heldUp: [
        {
          label: "Writing the demo's exact fabricated-clause scenario as a named regression test,",
          text: 'before it ever caught anything for real, is what proved the negation-window fix worked — not the fact that it compiled.',
        },
        {
          label: 'Re-validating input independently in the handler layer',
          text: "caught nothing in testing, but it's the reason a second transport couldn't silently skip a check the first one enforced.",
        },
        {
          label: 'Keeping handlers completely transport-agnostic',
          text: 'meant the Vercel deploy target was one new file plus a thin auth module, not a parallel implementation.',
        },
      ],
      differently: [
        {
          label: 'I upgraded zod from v3 to v4 reactively,',
          text: "once the HTTP package's type requirements forced it, rather than checking both packages' peer dependencies before writing schema code.",
        },
        {
          label: "A background dev server can't survive between tool calls in every environment.",
          text: "I'd default to testing route handlers as plain functions in-process from the start, not assume a live server would be easy to stand up.",
        },
        {
          label: 'The trust-score rollup shipped as an honest placeholder,',
          text: "but I didn't flag it as loudly in the code as the fail-open/fail-closed choice — a formula that looks precise gets trusted more than it should.",
        },
      ],
      ifStartedOver: 'write the negation-trap test before the heuristic that needs it to pass, not after — and settle the zod version across both MCP packages on day one instead of discovering the conflict at build time.',
    },

    summary: {
      system: 'Sentinel — Eval-as-MCP-Server',
      primaryServices: 'MCP · Vercel · Anthropic API',
      status: 'Live demo, deployed on Vercel',
      type: 'AI eval infrastructure',
    },
  },
];
