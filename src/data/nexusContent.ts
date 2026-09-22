export interface ServiceItem {
  id: number
  number: string
  icon: string
  title: string
  desc: string
  tags: string[]
  span: string
}

export interface CaseStudyItem {
  id: number
  company: string
  industry: string
  result: string
  desc: string
  services: string[]
  accentColor: string
}

export interface TeamMember {
  name: string
  role: string
  quote: string
  colors: [string, string]
  bio: string
}

export interface PricingPlan {
  name: string
  price: string
  desc: string
  features: string[]
  timeline: string
  btnText: string
  popular?: boolean
}

export interface FaqItem {
  q: string
  a: string
}

export const services: ServiceItem[] = [
  {
    id: 1,
    number: '01',
    icon: 'Compass',
    title: 'Strategy & Digital Advisory',
    desc: 'We map commercial objectives to engineering roadmaps with ruthless architectural clarity.',
    tags: ['Market Audit', 'Architecture', 'OKRs', 'Unit Economics'],
    span: 'col-span-1 md:col-span-2'
  },
  {
    id: 2,
    number: '02',
    icon: 'Paintbrush',
    title: 'Editorial UI/UX Design',
    desc: 'Interfaces that feel inevitable — high-contrast monochrome typography, precision grids, and zero visual noise.',
    tags: ['Design Systems', 'Figma Prototyping', 'Micro-interactions'],
    span: 'col-span-1'
  },
  {
    id: 3,
    number: '03',
    icon: 'Code2',
    title: 'Full-Stack Web Engineering',
    desc: 'High-throughput, type-safe web applications engineered for sub-second load times and global scalability.',
    tags: ['React 18', 'TypeScript', 'Next.js', 'Vercel Edge'],
    span: 'col-span-1'
  },
  {
    id: 4,
    number: '04',
    icon: 'Smartphone',
    title: 'Mobile Application Suite',
    desc: 'Native iOS and Android digital products with native haptics, offline resilience, and fluid 120fps motion.',
    tags: ['React Native', 'Swift Interop', 'Design Systems'],
    span: 'col-span-1 md:col-span-2'
  },
  {
    id: 5,
    number: '05',
    icon: 'Layers',
    title: 'Minimalist Brand Systems',
    desc: 'Comprehensive visual identity blueprints built around timeless editorial restraint and distinct monochrome posture.',
    tags: ['Visual Identity', 'Typography', 'Brand Guidelines'],
    span: 'col-span-1'
  },
  {
    id: 6,
    number: '06',
    icon: 'TrendingUp',
    title: 'Conversion Architecture',
    desc: 'Systematic conversion rate optimization and technical SEO that compound measurable customer acquisition.',
    tags: ['CRO Testing', 'Technical SEO', 'Performance Audits'],
    span: 'col-span-1'
  },
  {
    id: 7,
    number: '07',
    icon: 'Cpu',
    title: 'Autonomous AI Integration',
    desc: 'We embed contextual machine intelligence into products — not as marketing novelties, but as foundational utility.',
    tags: ['Gemini / Claude API', 'Vector Embeddings', 'Workflow Agents', 'Serverless Pipelines'],
    span: 'col-span-1 md:col-span-3'
  },
  {
    id: 8,
    number: '08',
    icon: 'ShieldCheck',
    title: 'Mission-Critical SLA',
    desc: 'Continuous infrastructure monitoring, sub-hour incident response, and scheduled architectural upgrades.',
    tags: ['24/7 Monitoring', 'Security Patches', 'Dedicated Retainer'],
    span: 'col-span-1'
  }
]

export const caseStudies: CaseStudyItem[] = [
  {
    id: 1,
    company: 'Vanta Capital',
    industry: 'Quantitative FinTech',
    result: '3.4× Inbound Flow',
    desc: 'Re-engineered their investor portal from a 12-step friction loop into an instant 3-step high-conviction workflow.',
    services: ['Strategic Advisory', 'UI/UX Architecture', 'React'],
    accentColor: 'border-olive-600/40 bg-olive-950/20'
  },
  {
    id: 2,
    company: 'Bloom Diagnostics',
    industry: 'HealthTech Platform',
    result: '$4.2M Series A',
    desc: 'Built the institutional narrative, web platform, and interactive clinical model that closed their institutional round.',
    services: ['Brand Direction', 'Web Platform', 'Data Vis'],
    accentColor: 'border-silver-500/30 bg-silver-800/20'
  },
  {
    id: 3,
    company: 'Orbit Enterprise',
    industry: 'B2B Analytics',
    result: 'NPS 34 → 78',
    desc: 'Redesigned core telemetry dashboards with tactical olive density and real-time streaming pipeline visualization.',
    services: ['Autonomous AI', 'UI Architecture', 'TypeScript'],
    accentColor: 'border-olive-600/40 bg-olive-950/20'
  },
  {
    id: 4,
    company: 'Crest Studio',
    industry: 'Luxury E-Commerce',
    result: '₹2.8Cr in 90 Days',
    desc: 'Headless architectural overhaul with zero-layout-shift performance, elevating checkout velocity by 210%.',
    services: ['Headless Commerce', 'Performance SEO', 'Vercel'],
    accentColor: 'border-silver-500/30 bg-silver-800/20'
  }
]

export const team: TeamMember[] = [
  {
    name: 'Nikhil',
    role: 'Founder & Strategy Lead',
    quote: 'Strategic clarity precedes velocity. We build what endures.',
    colors: ['#708238', '#08080a'],
    bio: 'Leads agency growth architecture, client engagement structuring, and commercial strategy.'
  },
  {
    name: 'Mokshith',
    role: 'Co-Founder & Technical Architect',
    quote: 'Code is infrastructure. Build with uncompromising technical rigor.',
    colors: ['#c5c8d0', '#08080a'],
    bio: 'Oversees full-stack engineering, serverless infrastructure, and high-concurrency systems.'
  },
  {
    name: 'Amaresh',
    role: 'Co-Founder & Creative Director',
    quote: 'Design without functional discipline is noise; we engineer clarity.',
    colors: ['#809446', '#08080a'],
    bio: 'Directs brand identity systems, high-end editorial aesthetics, and interactive art direction.'
  }
]

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Starter Sprint',
    price: '$2,500',
    desc: 'Ideal for early-stage ventures and high-conviction product launches.',
    features: [
      'Strategic Scope & Roadmap',
      'Editorial Web Experience (up to 5 pages)',
      'Sub-second Performance Optimization',
      'Custom Form & Email Pipeline',
      '30 Days Dedicated Launch Support'
    ],
    timeline: '2–3 Weeks',
    btnText: 'Start Sprint'
  },
  {
    name: 'Scale Retainer',
    price: '$5,500',
    desc: 'Comprehensive full-stack design and engineering for scaling companies.',
    features: [
      'End-to-End Design System in Figma',
      'Custom React / Next.js Web Application',
      'Interactive 3D / Shaders & Motion',
      'Analytics & Conversion Architecture',
      'Client Portal & Admin Integration',
      '60 Days Priority Support & SLA'
    ],
    timeline: '4–6 Weeks',
    btnText: 'Schedule Consultation',
    popular: true
  },
  {
    name: 'Enterprise Custom',
    price: 'Custom',
    desc: 'Dedicated technical team for complex multi-platform digital transformations.',
    features: [
      'Dedicated Full-Stack Pod',
      'Custom Autonomous AI & LLM Pipelines',
      'Native iOS & Android Application Builds',
      'SOC2 / Enterprise Compliance Readiness',
      'Direct WhatsApp / Slack Leadership Bridge',
      'Continuous 24/7 SLA Guarantee'
    ],
    timeline: 'Dedicated Roadmap',
    btnText: 'Inquire Directly'
  }
]

export const faqs: FaqItem[] = [
  {
    q: 'How quickly can Nysa Agency begin execution?',
    a: 'Following our initial 20-minute strategic consultation and mutual scope agreement, discovery sprints commence within 48 to 72 hours.'
  },
  {
    q: 'Do you work with international partners and timezones?',
    a: 'Yes. Over 60% of our client base is distributed across North America, Europe, and Asia. We operate an asynchronous-first methodology with weekly milestone briefings.'
  },
  {
    q: 'Who will actually build our digital product?',
    a: 'Every engagement is architected directly by our founding partners: Nikhil (Strategy), Mokshith (Engineering), and Amaresh (Design). We do not outsource to junior contractors.'
  },
  {
    q: 'What is your revision and deliverable policy?',
    a: 'We work in weekly milestone sprints with continuous transparent feedback. Sprints are not marked completed until specifications and quality benchmarks are fully satisfied.'
  },
  {
    q: 'Do we own the intellectual property and code repository?',
    a: '100%. All custom code, design tokens, Figma files, and infrastructure scripts transfer directly to your organization upon final milestone release.'
  },
  {
    q: 'Do you sign Non-Disclosure Agreements (NDAs)?',
    a: 'Yes. Every partnership begins with our standard mutual NDA before reviewing proprietary briefs or codebases.'
  }
]

export const techStack = [
  { name: 'React 18', category: 'Frontend', desc: 'Component architecture with concurrent rendering' },
  { name: 'TypeScript', category: 'Language', desc: 'Strict end-to-end type safety' },
  { name: 'Next.js / Vite', category: 'Framework', desc: 'Edge-ready performance bundling' },
  { name: 'Tailwind CSS', category: 'Styling', desc: 'Atomic design system orchestration' },
  { name: 'Framer Motion', category: 'Animation', desc: 'Hardware-accelerated layout transitions' },
  { name: 'Three.js / WebGL', category: '3D Graphics', desc: 'Procedural GPU shader backgrounds' },
  { name: 'Node.js / Vercel', category: 'Backend', desc: 'Global edge serverless functions' },
  { name: 'PostgreSQL', category: 'Database', desc: 'ACID-compliant relational persistence' },
]
