import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/CustomCursor';
import s from '@/styles/resume.module.css';

export const metadata = {
  title: 'Résumé',
  description: "Michael Legemah's résumé — 13+ years shipping AI and full-stack systems for AWS, AstraZeneca, US Space Force, and more.",
};

const PILLS = [
  { label: '13+ yrs shipping', cls: s.pillG },
  { label: 'AWS', cls: s.pillC },
  { label: 'AstraZeneca', cls: s.pillPk },
  { label: 'MINI · OMNY · US Space Force', cls: s.pillO },
  { label: 'DoD Secret Clearance', cls: s.pillY },
];

const EXPERIENCE = [
  {
    active: true,
    role: 'Software Development Engineer IV', type: 'Contract', date: '10/25 — present',
    company: 'Amazon Web Services', location: 'New York, NY', color: 'var(--yellow)',
    bullets: [
      'Architect and deliver production-grade AI platforms and applications using Python, TypeScript, React, AWS Bedrock, SageMaker, Lambda, AppSync, DynamoDB, and OpenSearch for enterprise workflows and intelligent customer experiences.',
      'Designed agentic AI architectures that combine deterministic business workflows with LLM-powered agents through confidence scoring, validation pipelines, automated fallback mechanisms, guardrails, and human-in-the-loop controls to improve reliability in production environments.',
      'Built Retrieval-Augmented Generation (RAG) services integrating enterprise knowledge repositories, vector search, REST APIs, and LLM-powered retrieval pipelines to support intelligent document synthesis and decision-support workflows.',
      'Developed AI evaluation and validation frameworks using LLM-as-a-Judge, regression testing, confidence scoring, automated validation, and human feedback loops to systematically evaluate model behavior and improve production reliability.',
      'Designed scalable APIs, event-driven microservices, and distributed cloud architectures integrating AI agents with enterprise applications and AWS services.',
      'Optimized LLM applications through prompt engineering, retrieval tuning, embedding strategies, vector search, caching, and model selection, balancing latency, throughput, scalability, and operational cost.',
      'Implemented CI/CD, observability, monitoring, authentication, production debugging, and incident-response practices to improve operational reliability and deployment confidence for cloud-native AI applications.',
      'Partnered with software engineers, data scientists, applied science stakeholders, solution architects, product managers, and enterprise customers to translate ambiguous requirements into scalable AI capabilities and production-ready systems.',
      'Drove architecture decisions across AI application and platform components while balancing product requirements, security, maintainability, reliability, governance, and long-term scalability.',
      'Leverage AI-native engineering workflows using Claude Code, Amazon Q, and agent-assisted development across prototyping, implementation, testing, debugging, and documentation while maintaining software engineering quality standards.',
    ],
  },
  {
    role: 'Staff Software Engineer', type: 'Contract', date: '1/25 — 10/25',
    company: 'About Objects', location: 'Gaithersburg, MD (Remote)', color: 'var(--purple)',
    bullets: [
      'Architected and deployed production RAG pipelines and LangGraph-based multi-agent systems that automated complex enterprise document workflows through durable AI orchestration and scalable cloud services.',
      'Established AI engineering practices spanning prompt engineering, evaluation datasets, automated validation, guardrails, observability, and evaluation-driven development to improve reliability of customer-facing AI capabilities.',
      'Built scalable Python microservices, FastAPI services, distributed APIs, and AI inference services emphasizing performance, security, observability, and maintainable architecture.',
      'Designed AI-powered capabilities from initial concept through production implementation, establishing reusable patterns for agent orchestration, retrieval, evaluation, validation, and deployment.',
      'Integrated AI capabilities into enterprise applications while maintaining maintainability, reliability, security, and production operational requirements.',
      'Led architecture and technical design across frontend, backend, cloud, and AI components, establishing reusable engineering patterns across product teams.',
      'Mentored engineers on AI architecture, testing strategies, evaluation-driven development, deployment automation, and software design.',
      'Led architecture reviews, code reviews, and engineering discussions while promoting scalable software architecture and high engineering standards.'
    ],
  },
  {
    role: 'Lead Front-End Engineer', type: 'Contract', date: '4/24 — 1/25',
    company: 'Apex Systems', location: 'Pittsburgh, PA (Remote)', color: 'var(--cyan)',
    bullets: [
      'Led development of enterprise-scale React and TypeScript applications for the U.S. Army\'s AIDE platform used by Army officers for mission and operational workflows.',
      'Modernized distributed service communication by transitioning legacy REST integrations to GraphQL and gRPC, improving interoperability, type safety, maintainability, and frontend data access.',
      'Delivered end-to-end capabilities using React, TypeScript, Node.js, and Python while influencing architecture, engineering standards, API governance, and long-term platform evolution.',
      'Served as a technical bridge across frontend, backend, platform, and product engineering teams, aligning API and system-design decisions across squads.',
      'Established reusable engineering patterns and standards to improve maintainability and consistency across distributed development teams.',
      'Participated in architecture discussions, code reviews, technical design, and cross-functional delivery for mission-critical government software'
    ],
  },
  {
    role: 'Software Engineer IV', date: '4/22 — 4/24',
    company: 'Zivaro', location: 'Denver, CO (Remote)', color: 'var(--pink)',
    bullets: [
      'Built mission-focused React and TypeScript dashboards for U.S. Space Force and Air Force officers to analyze constellation and satellite data across COMMAND and Hyperion applications.',
      'Architected distributed backend services using Python, FastAPI, Docker, Kubernetes, RabbitMQ, and cloud infrastructure supporting mission-critical government applications.',
      'Designed event-driven microservice patterns that improved service isolation, deployment independence, fault tolerance, and scalability.',
      'Integrated backend services using Python and Lua with RabbitMQ, Keycloak, Docker, Kubernetes, and Azure Cloud for secure service-to-service communication.',
      'Tested and validated mission applications on-base within SIPRNet air-gapped environments, gaining hands-on experience operating software within constrained security, networking, and deployment environments.',
      'Established reusable frontend standards, shared component patterns, and engineering practices across defense-focused engineering teams.',
      'Collaborated with government stakeholders, engineers, and cross-functional teams to translate mission requirements into scalable software while balancing usability, reliability, security, and operational constraints.',
    ],
  },
  {
    role: 'Senior Front-End Engineer', date: '10/20 — 10/21',
    company: 'Reflexions Data', location: 'New York, NY', color: 'var(--cyan)',
    bullets: [
      'Led a team of six engineers delivering high-availability transaction platforms using React, TypeScript, GraphQL, Node.js, and CircleCI for MBTA, OMNY, and BART.',
      'Drove technical direction, architecture decisions, mentoring, and end-to-end ownership across multiple concurrent product initiatives.',
      'Established engineering practices around performance, reliability, testing, scalability, and maintainable distributed-system design.',
      'Influenced engineering strategy through reusable architecture patterns and technical standards while improving developer productivity and long-term maintainability.',
      'Contributed to an 80% revenue increase through technical leadership and end-to-end product ownership.',
    ],
  },
  {
    role: 'Senior Front-End Engineer', type: 'Contract', date: '2/19 — 10/20',
    company: 'Mondo', location: 'New York, NY', color: 'var(--purple)',
    bullets: [
      'Designed and implemented a Storybook-driven design system and component library using React, TypeScript, and Vue, enabling consistent user experiences and accelerating frontend development across a high-traffic healthcare platform.',
      'Built reusable design-system patterns that improved consistency and maintainability across product teams.',
      'Modernized legacy frontend systems into modular, cloud-native AWS services using EC2, CloudFront, RDS, and Route53.',
      'Improved platform reliability and reduced operational downtime through modernization of legacy architecture and deployment patterns.',
    ],
  },
  {
    role: 'Front-End & Web Engineering Roles', date: '1/13 — 11/18',
    company: 'Various Companies', location: 'New York, NY', color: 'var(--cyan)',
    bullets: [
      'Delivered full-stack e-commerce platforms using React, Node.js, MySQL, and secure payment integrations, contributing to more than $3M in online revenue across high-traffic consumer properties.',
      'Built and optimized customer-facing web applications with a focus on performance, scalability, conversion, responsive design, and user experience.',
      'Revamped AKC.org using modern UX, responsive design, and performance optimization practices, improving customer engagement and conversion.',
      'Developed full-stack applications spanning frontend interfaces, backend services, databases, APIs, and third-party integrations.',
    ],
  },
];

const SKILLS = [
  {
    label: 'Technical Leadership', color: 'var(--yellow)',
    tags: ['Architecture and system design', 'Platform strategy', 'Technical roadmap development', 'Cross - team architecture alignment', 'Architecture and design reviews', 'Engineering standards', 'API governance', 'Mentorship', 'Code reviews', 'Developer productivity', 'Technical decision making', 'Customer and stakeholder engagement', 'Translating ambiguous requirements into technical solutions', 'Balancing innovation with reliability, security, and operational excellence'
    ],
  },
  {
    label: 'AI & Machine Learning', color: 'var(--cyan)',
    tags: ['Claude Code', 'AWS Bedrock', 'RAG', 'LangGraph', 'SageMaker,', 'LLM-as-a-Judge', 'DeepEval', 'Hugging Face', 'LangChain', 'Agentic AI', 'Vector Search', 'Prompt Engineering', 'Embeddings', 'MCP', 'Human-in-the-loop', 'Evaluation-driven development', 'AI orchestration', 'AI evaluation and validation frameworks', 'LLM evaluation and testing', 'AI reliability and guardrails'],
  },
  {
    label: 'Frontend', color: 'var(--green)',
    tags: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Query', 'Redux', 'Storybook', 'React Native', 'Tailwind', 'Material UI', 'Expo', 'NativeWind', 'ShadCNUI', 'Modular CSS', 'CSS-in-JS', 'Responsive Design', 'Performance Optimization', 'Accessibility', 'Cross-browser Compatibility'],
  },
  {
    label: 'Backend', color: 'var(--orange)',
    tags: ['Python', 'FastAPI', 'Node.js', 'Fastify', 'REST', 'GraphQL', 'gRPC', 'WebSockets', 'Microservices', 'Distributed Systems', 'Event-Driven Architecture',],
  },
  {
    label: 'Data', color: 'var(--pink)',
    tags: ['PostgreSQL', 'DynamoDB', 'MongoDB', 'Redis', 'MySQL', 'OpenSearch', 'Vector Databases', 'Data Modeling', 'Data Pipelines', 'ETL Processes', 'Data Warehousing', 'Data Analysis', 'Data Visualization'],
  },
  {
    label: 'AWS', color: 'var(--purple)',
    tags: ['EC2', 'S3', 'Lambda', 'AppSync', 'DynamoDB', 'RDS', 'CloudFront', 'Route53', 'CloudFormation', 'CloudWatch', 'IAM', 'VPC', 'API Gateway', 'Step Functions', 'SageMaker', 'Bedrock', 'OpenSearch', 'EventBridge', 'Kinesis', 'SNS', 'SQS', 'ECS', 'EKS', 'CodeDeploy', 'CodePipeline', 'CodeBuild', 'CloudTrail', 'Secrets Manager', 'Athena', 'Glue', 'Cognito', 'Aurora', 'Redshift'],
  },
  {
    label: 'DevOps & Cloud', color: 'var(--cyan)',
    tags: ['Docker', 'Kubernetes', 'Terraform', 'CI/CD', 'GitHub Actions', 'CircleCI', 'Jenkins', 'Monitoring and Observability', 'Logging and Tracing', 'Infrastructure as Code (IaC)', 'Cloud Security Best Practices', 'Deployment Automation', 'Scalability and High Availability', 'Load Balancing', 'Auto Scaling', 'Disaster Recovery', 'Backup and Restore', 'Performance Optimization', 'Cost Optimization', 'MLOps'],
  }
];

const LINKS = [
  { icon: '🐙', label: 'GitHub', href: 'https://github.com/MikeLegemah5799' },
  { icon: '💼', label: 'LinkedIn', href: 'https://linkedin.com/in/michaellegemah' },
  { icon: '🌐', label: 'mleg.tech', href: 'https://mleg.tech' },
];

export default function Resume() {
  return (
    <>
      <CustomCursor />
      <Navbar />

      <main className="page-wrap">
        {/* HERO */}
        <div className={s.hero}>
          <div className={s.orb1} />
          <div className={s.orb2} />
          <div className={s.heroTop}>
            <div>
              <div className="section-label">Curriculum Vitae</div>
              <h1 className={s.heroName}>Michael Legemah</h1>
              <p className={s.heroRole}>Principal AI Engineer</p>
              <p className={s.heroMeta}>New York, NY · michaellegemah@gmail.com · 516-273-1611</p>
            </div>
            <a href="/Michael_Legemah_Master_Resume.pdf" download="Michael_Legemah_Master_Resume.pdf" className={`btn-primary ${s.downloadBtn}`}>
              ⬇ Download résumé (PDF)
            </a>
          </div>
          <div className={s.pills}>
            {PILLS.map(({ label, cls }) => (
              <span key={label} className={`${s.pill} ${cls}`}>{label}</span>
            ))}
          </div>
        </div>

        {/* BODY */}
        <div className={s.body}>
          {/* EXPERIENCE */}
          <section>
            <div className={s.sideLabel}>Experience</div>
            <div className={s.timeline}>
              {EXPERIENCE.map(({ active, role, type, date, company, location, color, bullets }) => (
                <div key={role + date} className={s.tlItem}>
                  <div className={`${s.tlDot} ${active ? s.tlDotActive : ''}`} />
                  <div className={s.tlHead}>
                    <div className={s.tlRole}>
                      {role}{type ? <span className={s.tlType}> · {type}</span> : null}
                    </div>
                    <div className={s.tlDate}>{date}</div>
                  </div>
                  <div className={s.tlCompany}>
                    <span style={{ color }}>{company}</span>
                    <span style={{ color: 'var(--muted)' }}> · {location}</span>
                  </div>
                  <ul className={s.tlBullets}>
                    {bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* SIDEBAR */}
          <aside className={s.sidebar}>
            <div>
              <div className={s.sideLabel}>Skills</div>
              {SKILLS.map(({ label, color, tags }) => (
                <div key={label} className={s.skillGroup}>
                  <div className={s.skillCat} style={{ color }}>{label}</div>
                  <div className={s.skillRow}>
                    {tags.map((t) => <span key={t} className={s.stag}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>

            <div className={s.clearance}>
              <div className={s.clearanceIcon}>🛡️</div>
              <div>
                <div className={s.clearanceTitle}>DoD Secret Clearance</div>
                <div className={s.clearanceSub}>US Department of Defense</div>
              </div>
            </div>

            <div>
              <div className={s.sideLabel}>Links</div>
              <div className={s.links}>
                {LINKS.map(({ icon, label, href }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" className={s.linkRow}>
                    <span className={s.linkIcon}>{icon}</span>{label}
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>

        {/* FOOTER CTA */}
        <div className={s.footerCta}>
          <p className={s.footerCtaText}>Prefer the one-pager? Grab the full résumé.</p>
          <a href="/Michael_Legemah_Master_Resume.pdf" download="Michael_Legemah_Master_Resume.pdf" className="btn-outline">⬇ Download résumé</a>
        </div>
      </main>

      <Footer />
    </>
  );
}
