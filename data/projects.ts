export type Project = {
  id: string;
  title: string;
  tag: string;
  tagColor: string;
  desc: string;
  stack: string;
  siteUrl?: string;
  codeUrl?: string;
  emoji?: string;
  featured?: boolean;
  wide?: boolean;
  accent: string;
  category: string[];
};

export const ACCENTS = {
  yellow: 'accY',
  cyan: 'accC',
  pink: 'accPk',
  green: 'accG',
  purple: 'accP',
  orange: 'accO',
} as const;

export const PROJECTS: Project[] = [
  {
    id: 'rag-pipeline', featured: true, accent: 'accY',
    title: 'RAG/Document Ingestion Pipeline',
    tag: 'AI · RAG · Real-time', tagColor: 'var(--yellow)',
    desc: 'Built a real-time document ingestion and retrieval pipeline for AI applications. Implemented a system that ingests documents, processes them into embeddings, and enables efficient retrieval for RAG (Retrieval-Augmented Generation) tasks.',
    stack: 'AWS Textract · Bedrock Titan · OpenSearch · Step Functions · DynamoDB · S3 · Lambda',
    category: ['AI / ML', 'RAG', 'Infrastructure', 'Cloud'],
  },
  {
    id: 'spacewatch', accent: 'accC',
    title: 'SpaceWatch',
    tag: 'Full-Stack · Time Series · Data Visualization', tagColor: 'var(--cyan)',
    desc: 'Built Space Watch a rocket launch tracker: a live countdown to the next upcoming launch, a full schedule (list or calendar), a searchable archive of past missions, and per-agency pages — all aggregated from Launch Library 2 into one normalized dataset and served through a dark, neon-blue "mission control" UI.',
    stack: 'Next.js · React · TypeScript · Neon Postgres · Tailwind · Vercel Cron',
    siteUrl: 'https://spacewatch-84e42r46f-mike-legemahs-projects.vercel.app/',
    codeUrl: 'https://github.com/MikeLegemah5799/spacewatch',
    emoji: '👩🏿‍🚀',
    category: ['Full-Stack', 'Time Series', 'Data Visualization'],
  },
  {
    id: 'hyperion', accent: 'accP',
    title: 'US Space Force Hyperion Project',
    tag: 'Design System · Material UI · Ag-Grid · Defense', tagColor: 'var(--purple)',
    desc: 'Built design system and data visualization platform for the US Space Force Hyperion project. Developed reusable React components, integrated Ag-Grid for complex data tables, and implemented Material UI for consistent styling.',
    stack: 'React · TypeScript · Python · Material UI · Ag-Grid · CSS Modules',
    siteUrl: 'https://www.ssc.spaceforce.mil/',
    emoji: '🚀',
    category: ['Full-Stack', 'Enterprise', 'Time Series', 'Data Visualization', 'Department of Defense '],
  },
  {
    id: 'omny', accent: 'accC',
    title: 'OMNY',
    tag: 'Full-Stack · SSR · GraphQL · CMS', tagColor: 'var(--cyan)',
    desc: 'Led SSR component architecture and CMS integration for a high-traffic editorial platform. Built scalable content infrastructure handling complex editorial workflows at production scale. Worked on the CMS in the Laravel framework.',
    stack: 'React · Laravel · PHP · GraphQL · MySQL · JavaScript · SASS',
    siteUrl: 'https://omny.info/',
    emoji: '🚇',
    category: ['Full-Stack', 'Enterprise', 'E-Commerce'],
  },
  {
    id: 'northrop', accent: 'accG',
    title: 'Northrop Grumman',
    tag: 'Enterprise · Defense · Component Lib', tagColor: 'var(--green)',
    desc: 'Led a team building customizable Gutenberg component library for a Fortune 500 defense contractor\'s global web presence.',
    stack: 'WordPress · PHP · React · Bootstrap · MySQL',
    siteUrl: 'https://www.northropgrumman.com/',
    emoji: '🛰️',
    category: ['Enterprise', 'Full-Stack'],
  },
  {
    id: 'bronzeville', accent: 'accO',
    title: 'Bronzeville Lakefront',
    tag: 'Civic · Full-Stack · WordPress', tagColor: 'var(--orange)',
    desc: 'Full-stack development partnership on a community-forward urban development site. Leveraged WordPress as CMS with performance-first engineering.',
    stack: 'WordPress · PHP · Foundation · MySQL · JavaScript',
    siteUrl: 'https://bronzevillelakefront.com/',
    emoji: '🏙️',
    category: ['Full-Stack'],
  },
  {
    id: 'mayo', accent: 'accPk',
    title: 'Mayo Clinic',
    tag: 'Healthcare · Design System · Storybook', tagColor: 'var(--pink)',
    desc: 'Built UI components using Angular and Vue for one of the world\'s top medical institutions. Created a full pattern library in Storybook.',
    stack: 'Angular · Vue · JavaScript · SASS · Storybook',
    siteUrl: 'https://www.mayoclinic.org/',
    emoji: '🏥',
    category: ['Enterprise', 'Full-Stack', 'Healthcare'],
  },
  {
    id: 'jpmc', accent: 'accY',
    title: 'JP Morgan Chase & Co.',
    tag: 'Finance · Enterprise · AEM', tagColor: 'var(--yellow)',
    desc: 'Built and updated UI components using ES6 JavaScript and SASS for one of the world\'s largest financial institutions. Leveraged Adobe Experience Manager as CMS.',
    stack: 'AEM · JavaScript · SASS',
    siteUrl: 'https://www.jpmorganchase.com/',
    emoji: '🏦',
    category: ['Enterprise'],
  },
  {
    id: 'mini', accent: 'accC',
    title: 'MINI USA',
    tag: 'Automotive · AEM · Angular', tagColor: 'var(--cyan)',
    desc: 'Built and updated UI components using Angular for MINI\'s US digital experience. Leveraged Adobe Experience Manager as CMS.',
    stack: 'AEM · Angular · JavaScript · CSS · Oracle',
    siteUrl: 'https://www.miniusa.com/',
    emoji: '🚗',
    category: ['Enterprise', 'Full-Stack'],
  },
  {
    id: 'akc', accent: 'accG',
    title: 'American Kennel Club',
    tag: 'Non-profit · WordPress · Redesign', tagColor: 'var(--green)',
    desc: 'Worked with a team to build and redesign the AKC website, leveraging WordPress as CMS and Pantheon for managed hosting.',
    stack: 'WordPress · Pantheon · JavaScript · SASS · MySQL',
    siteUrl: 'https://www.akc.org/',
    emoji: '🐾',
    category: ['Full-Stack'],
  },
  {
    id: 'firstpen', accent: 'accO',
    title: 'First And Pen',
    tag: 'Media · WordPress · Full-Stack', tagColor: 'var(--orange)',
    desc: 'Partnered with the CEO on site build, design, and ad campaigns. Full-stack development using WordPress as CMS.',
    stack: 'WordPress · PHP · HTML · MySQL · JavaScript · SASS',
    siteUrl: 'https://firstandpen.com/',
    emoji: '✍️',
    category: ['Full-Stack'],
  },
  {
    id: 'shadow', accent: 'accPk',
    title: 'The Shadow League',
    tag: 'Sports Media · AWS · WordPress', tagColor: 'var(--pink)',
    desc: 'Built and redesigned the site, handled ad campaigns, and managed AWS deployments for a leading sports culture publication.',
    stack: 'WordPress · PHP · MySQL · JavaScript · AWS',
    siteUrl: 'https://theshadowleague.com/',
    emoji: '🏆',
    category: ['Full-Stack'],
  },
  {
    id: 'jdrf', accent: 'accY',
    title: 'Breakthrough T1D',
    tag: 'Healthcare · Non-profit · WordPress', tagColor: 'var(--yellow)',
    desc: 'Worked with a team to create the Juvenile Diabetes Research Foundation website in WordPress CMS, building fundraising and awareness features.',
    stack: 'WordPress · PHP · jQuery · Bootstrap · MySQL',
    siteUrl: 'https://www.breakthrought1d.org/',
    emoji: '🎗️',
    category: ['Full-Stack'],
  },
  {
    id: 'charlie', accent: 'accC',
    title: 'MBTA Charlie Card',
    tag: 'Full-Stack · SSR · GraphQL · CMS', tagColor: 'var(--cyan)',
    desc: 'Led SSR component architecture and CMS integration for a high-traffic editorial platform. Built scalable content infrastructure handling complex editorial workflows at production scale. Worked on the CMS in the Laravel framework.',
    stack: 'React · Laravel · PHP · GraphQL · MySQL · JavaScript · SASS',
    siteUrl: 'https://charlie.mbta.com/',
    emoji: '🚇',
    category: ['Full-Stack', 'Enterprise', 'E-Commerce'],
  },
  {
    id: 'aldtrucking', accent: 'accP',
    title: 'ALD Trucking',
    tag: 'Logistics · WordPress · Full-Stack', tagColor: 'var(--purple)',
    desc: 'Built the site on WordPress using custom Gutenberg blocks.',
    stack: 'WordPress · PHP · MySQL',
    siteUrl: 'https://aldtrucking.com/',
    emoji: '🚛',
    category: ['Full-Stack', 'WordPress', 'Logistics'],
  },
  {
    id: 'ai2c', accent: 'accG',
    title: 'US Army AI2C IDE',
    tag: 'AI · Defense · IDE', tagColor: 'var(--green)',
    desc: 'Built a dedicated AI IDE for the US Army.',
    stack: 'TypeScript · React · Go · gRPC · Streamlit · Python',
    siteUrl: 'https://ai2c.army.mil/',
    emoji: '🪖',
    category: ['Full-Stack', 'AI / ML', 'Defense', 'IDE'],
  },
];
