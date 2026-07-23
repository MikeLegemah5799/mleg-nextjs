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

  architecture: {
    intro: string;
    sources: { label: string; sub: string };
    orchestrator: { label: string; sub: string };
    stages: { label: string; sub: string }[];
    storageLabel: string;
    storage: { label: string; sub: string }[];
    tags: string[];
    caption: string;
  };

  decisions: { color: string; label: string; text: string }[];

  summary: { system: string; primaryServices: string; status: string; type: string };
};

export const CASE_STUDIES: Record<string, CaseStudy> = {
  'rag-pipeline': {
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

    architecture: {
      intro: 'Sources trigger a Step Functions orchestrator running four stages — extract, chunk, embed, upsert — writing into a per-tenant isolated storage layer.',
      sources: { label: 'Document sources', sub: 'S3 · crawl · CMS' },
      orchestrator: { label: 'Orchestrator', sub: 'Step Functions' },
      stages: [
        { label: 'Extract', sub: 'OCR / Textract' },
        { label: 'Chunk', sub: 'Semantic split' },
        { label: 'Embed', sub: 'Bedrock Titan' },
        { label: 'Upsert', sub: 'Write vectors' },
      ],
      storageLabel: 'Storage layer · Per-tenant isolated',
      storage: [
        { label: 'Vector store', sub: 'OpenSearch, per-tenant NS' },
        { label: 'Metadata DB', sub: 'DynamoDB doc/chunk records' },
      ],
      tags: ['Content-hash dedup cache', 'DLQ + retries', 'CloudWatch / X-Ray', 'Tenant IAM scoping'],
      caption: 'Fig. 3 — Four-stage pipeline writing into a per-tenant vector store and metadata database.',
    },

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
};
