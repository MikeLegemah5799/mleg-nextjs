// Source of truth for the résumé text fed to the job-match analysis.
// Keep this in sync with /public/resume.pdf whenever the résumé changes.

export const RESUME_TEXT = `Michael Legemah
516-273-1611 | michaellegemah@gmail.com | New York, NY

WORK EXPERIENCE

Software Development Engineer IV (Contract) | Amazon Web Services | New York, NY | 10/25 – Present
- Reduced manual operational effort and accelerated customer time-to-value by architecting and deploying agentic AI workflows using AWS Bedrock, SageMaker, Lambda, AppSync, DynamoDB, OpenSearch, S3, and event-driven architectures, enabling automation of complex, multi-step enterprise processes at scale.
- Improved production reliability and release confidence for AI-driven systems by designing and integrating LLM-as-a-tester and LLM-as-a-judge evaluation pipelines (Anthropic, OpenAI, NovaPro) into CI/CD pipelines, systematically detecting regressions, validating model behavior, and enforcing quality gates prior to deployment.
- Increased system scalability and frontend delivery velocity by building GraphQL APIs with AWS AppSync to decouple frontend and backend concerns, improving data consistency, reducing integration friction, and enabling parallel development across teams.
- Enhanced customer experience and accessibility across AI-powered touchpoints by delivering a production-grade contact center web application using React, TypeScript, Tailwind, Jest, and Python, ensuring UI consistency, performance, and WCAG-aligned accessibility at enterprise scale.
- Strengthened platform security and system reliability by implementing secure authentication and event-driven integrations using Amazon Cognito, API Gateway, webhooks, and IAM, supporting compliant, observable, and resilient distributed systems.

Senior Software Engineer (Contract) | About Objects | Gaithersburg, MD (Remote) | 1/25 – 10/25
- Led architecture and delivery of a modular React and Next.js web platform using TypeScript, Redux Toolkit, Tailwind, and Webpack, applying atomic CSS principles and component-driven design to improve scalability and UI consistency across a regulated clinical-trial product.
- Built LLM-driven RAG pipelines and LangGraph agents on AWS Bedrock to automate document extraction workflows, introducing GenAI-powered user-facing features that measurably reduced manual effort and improved turnaround time.
- Engineered high-performance REST APIs with Node.js, Fastify, and DynamoDB, with deep attention to performance, security, and HIPAA compliance, validating AI-generated code for correctness, regressions, and security vulnerabilities before deployment.
- Mentored engineers in TDD and accessibility best practices using Jest, Cypress, and Playwright, raising WCAG/ARIA awareness, test coverage, and overall engineering maturity across the team.

Senior Front-End Engineer (Contract) | Apex Systems | Pittsburgh, PA (Remote) | 4/24 – 1/25
- Delivered end-to-end web features using React, TypeScript, Redux, Tailwind, Material UI, and Node.js performing thorough code reviews and collaborating closely with UX designers and product managers to ship polished, production-grade UI at scale.
- Modernized service communication by transitioning legacy REST APIs to gRPC and GraphQL, improving cross-service performance, front-end data efficiency, and deployment reliability across platform teams.
- Served as technical bridge across back-end, platform, and front-end engineering pillars driving API design decisions, architectural correctness, and shared coding standards across squads.

Software Engineer IV | Zivaro | Denver, CO (Remote) | 4/22 – 4/24
- Engineered scalable React and Next.js web applications using TypeScript, Redux, Tailwind, Storybook, Jest, Playwright, and Cypress for mission-critical aerospace and defense platforms, maintaining high test coverage, performance, and stability in distributed systems at hyperscale.
- Defined microservice boundaries and API gateway strategy using FastAPI and Python, improving fault isolation, release independence, and system-level maintainability across multiple engineering teams.
- Led developer efficiency initiatives using AgGrid, Material UI, and Storybook, establishing reusable component patterns, reducing UI defects, and accelerating feature delivery across a large multi-squad engineering org.

Senior Front-End Engineer | Reflexions Data | New York, NY | 10/20 – 10/21
- Led a team of six engineers building high-availability web platforms using React, TypeScript, GraphQL, CircleCI, and Node.js for MBTA, OMNY, and BART, driving an 80% revenue increase through end-to-end ownership, strong code review culture, and full-stack delivery.
- Set technical direction and mentored engineers across a fast-moving product organization, scaling best practices in responsive design, performance, and browser-side engineering across the squad.

Senior Front-End Engineer (Contract) | Mondo | New York, NY | 2/19 – 10/20
- Built a Storybook-driven React, TypeScript, and Vue component library for Mayo Clinic, standardizing design patterns across a high-traffic healthcare platform and measurably reducing user bounce rates.
- Modernized legacy front-end systems into modular, cloud-native services on AWS (EC2, CloudFront, RDS, Route53), improving platform reliability and reducing downtime at scale.

Senior / Mid-Level Front-End & Web Engineering Roles | Various Companies | New York, NY | 1/13 – 11/18
- Delivered full-stack web e-commerce platforms using React, Node.js, MySQL, and secure payment integrations, driving $3M+ in online revenue across high-traffic consumer properties.
- Revamped AKC.org with modern UX principles, responsive design, and performance optimization — increasing conversion rates and user engagement across a nationally recognized consumer web product.

SKILLS
Languages: JavaScript, TypeScript, Python, HTML5, CSS3, SQL, GraphQL, Go, YAML
AI-First Tooling: Cursor, Claude Code, CoPilot, Kiro, LLM-as-a-Judge, Eval-driven Development, RAG, LangChain, LangGraph, AWS Bedrock, DeepEval, Prompt Engineering, GPT, Claude
Frontend: React, Next.js, Redux Toolkit, Tailwind (Atomic CSS), Material UI, Zustand, Storybook, Webpack, SCSS, Expo, React Native, WCAG, ARIA, i18n
Testing: Jest, Playwright, Cypress, React Testing Library, CircleCI, GitHub Actions, TDD
Backend & Infra: Node.js, Fastify, FastAPI, REST, GraphQL, gRPC, Websockets, AWS (S3, RDS, Lambda, Bedrock, AppSync, ECS, EC2, CloudFront, Route53), Docker, Kubernetes, Terraform, PostgreSQL, MongoDB, DynamoDB, Redis, Kafka, RabbitMQ
Tooling & Process: Figma, JIRA, git, yarn, npm, Bun, Stripe, Scrum/Agile
Certifications: US Department of Defense Secret Security Clearance`;
