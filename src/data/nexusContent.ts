export type CurrencyCode = 'USD' | 'INR' | 'GBP' | 'AUD' | 'AED' | 'SGD'

export interface CurrencyConfig {
  code: CurrencyCode
  symbol: string
  label: string
  region: string
  flag: string
}

export const supportedCurrencies: Record<CurrencyCode, CurrencyConfig> = {
  USD: { code: 'USD', symbol: '$', label: 'USD ($)', region: 'United States', flag: '🇺🇸' },
  INR: { code: 'INR', symbol: '₹', label: 'INR (₹)', region: 'India', flag: '🇮🇳' },
  GBP: { code: 'GBP', symbol: '£', label: 'GBP (£)', region: 'United Kingdom', flag: '🇬🇧' },
  AUD: { code: 'AUD', symbol: 'A$', label: 'AUD (A$)', region: 'Australia', flag: '🇦🇺' },
  AED: { code: 'AED', symbol: 'AED', label: 'AED (د.إ)', region: 'Middle East', flag: '🇦🇪' },
  SGD: { code: 'SGD', symbol: 'S$', label: 'SGD (S$)', region: 'Singapore', flag: '🇸🇬' },
}

export interface BookingRegion {
  id: string
  country: string
  timezone: string
  currency: CurrencyCode
  symbol: string
  flag: string
  slots: string[]
}

export const bookingRegions: BookingRegion[] = [
  {
    id: 'india',
    country: 'India',
    timezone: 'IST (UTC+5:30)',
    currency: 'INR',
    symbol: '₹',
    flag: '🇮🇳',
    slots: ['11:00 AM IST', '02:30 PM IST', '05:00 PM IST', '08:00 PM IST']
  },
  {
    id: 'us',
    country: 'United States',
    timezone: 'EST (UTC-5)',
    currency: 'USD',
    symbol: '$',
    flag: '🇺🇸',
    slots: ['09:30 AM EST', '12:00 PM EST', '03:00 PM EST', '06:00 PM EST']
  },
  {
    id: 'uk',
    country: 'United Kingdom',
    timezone: 'GMT (UTC+0)',
    currency: 'GBP',
    symbol: '£',
    flag: '🇬🇧',
    slots: ['10:00 AM GMT', '01:00 PM GMT', '03:30 PM GMT', '06:00 PM GMT']
  },
  {
    id: 'australia',
    country: 'Australia',
    timezone: 'AEST (UTC+10)',
    currency: 'AUD',
    symbol: 'A$',
    flag: '🇦🇺',
    slots: ['10:00 AM AEST', '01:30 PM AEST', '04:00 PM AEST', '06:30 PM AEST']
  },
  {
    id: 'middleeast',
    country: 'Middle East',
    timezone: 'GST (UTC+4)',
    currency: 'AED',
    symbol: 'AED',
    flag: '🇦🇪',
    slots: ['11:00 AM GST', '02:00 PM GST', '04:30 PM GST', '07:00 PM GST']
  },
  {
    id: 'singapore',
    country: 'Singapore',
    timezone: 'SGT (UTC+8)',
    currency: 'SGD',
    symbol: 'S$',
    flag: '🇸🇬',
    slots: ['10:00 AM SGT', '02:00 PM SGT', '04:30 PM SGT', '07:30 PM SGT']
  }
]

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
  image?: string
  imagePosition?: string
}

export interface PricingPlan {
  name: string
  prices: Record<CurrencyCode, string>
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
    icon: 'TrendingUp',
    title: 'Performance Marketing & Ads',
    desc: 'High-ROAS customer acquisition across Meta, Google Search, and TikTok. We turn paid ad spend into predictable commercial revenue.',
    tags: ['Meta Ads', 'Google PPC', 'Audience Retargeting', 'ROAS Scaling'],
    span: 'col-span-1 md:col-span-2'
  },
  {
    id: 2,
    number: '02',
    icon: 'Paintbrush',
    title: 'Conversion Web Architecture',
    desc: 'Landing pages and store funnels engineered with ruthless CRO discipline. Stark editorial aesthetics that maximize click-to-lead ratios.',
    tags: ['CRO Sprints', 'High-Speed Web', 'Figma Prototyping'],
    span: 'col-span-1'
  },
  {
    id: 3,
    number: '03',
    icon: 'Compass',
    title: 'Search Engine Dominance (SEO)',
    desc: 'Technical SEO audits and content cluster strategies that capture high-intent organic buyer traffic without continuous ad reliance.',
    tags: ['Technical SEO', 'Keyword Architecture', 'Backlink Signals'],
    span: 'col-span-1'
  },
  {
    id: 4,
    number: '04',
    icon: 'Layers',
    title: 'Brand Storytelling & Identity',
    desc: 'High-fashion editorial branding (Zara / Prada archetype) that creates instant perceived value, premium pricing power, and cult loyalty.',
    tags: ['Visual Identity', 'Typography Systems', 'Ad Creatives'],
    span: 'col-span-1 md:col-span-2'
  },
  {
    id: 5,
    number: '05',
    icon: 'Mail',
    title: 'Lifecycle & Email Marketing',
    desc: 'Automated retention workflows (welcome nurture, cart recovery, VIP re-engagement) that compound lifetime customer value (LTV).',
    tags: ['Klaviyo / Resend', 'Retention Flows', 'SMS Automation'],
    span: 'col-span-1'
  },
  {
    id: 6,
    number: '06',
    icon: 'Smartphone',
    title: 'Organic Viral & Social Growth',
    desc: 'Short-form hooks, algorithmic storytelling, and creator campaigns designed to ignite natural social proof and brand awareness.',
    tags: ['Reels & TikTok', 'Creator Seeding', 'Viral Hooks'],
    span: 'col-span-1'
  },
  {
    id: 7,
    number: '07',
    icon: 'Cpu',
    title: 'Autonomous AI Marketing Suite',
    desc: 'Custom generative AI pipelines, automated lead scoring, programmatic content engines, and intelligent conversational sales bots.',
    tags: ['AI Agents', 'CRM Workflows', 'Smart Funnels', 'Data Telemetry'],
    span: 'col-span-1 md:col-span-3'
  },
  {
    id: 8,
    number: '08',
    icon: 'ShieldCheck',
    title: 'Full Growth Retainer & SLA',
    desc: 'Dedicated technical pod and senior marketing strategist managing weekly ad sprints, creative refreshes, and conversion audits.',
    tags: ['Weekly Sprints', '24/7 SLA', 'Direct Founder Line'],
    span: 'col-span-1'
  }
]

export const caseStudies: CaseStudyItem[] = [
  {
    id: 1,
    company: 'Vanta Capital',
    industry: 'FinTech & Capital Flow',
    result: '4.8× ROAS Scaling',
    desc: 'Revamped their paid acquisition funnel and editorial landing pages, turning $18k/month ad spend into 4.8x qualified investor inquiries.',
    services: ['Performance Marketing', 'CRO Landing Page', 'Meta Ads'],
    accentColor: 'border-olive-600/40 bg-olive-950/20'
  },
  {
    id: 2,
    company: 'Bloom Health & Wellness',
    industry: 'D2C Consumer Brand',
    result: '₹2.8Cr in 90 Days',
    desc: 'Scaled organic social hooks and retention email sequences, unlocking over ₹2.8 Crores in profitable first-quarter customer revenue.',
    services: ['Brand Storytelling', 'Email Marketing', 'SEO Growth'],
    accentColor: 'border-silver-500/30 bg-silver-800/20'
  },
  {
    id: 3,
    company: 'Orbit B2B SaaS',
    industry: 'Enterprise Software',
    result: '+340% Pipeline Leads',
    desc: 'Architected high-intent Google Search campaigns and technical SEO clusters that quadrupled inbound enterprise demos in 60 days.',
    services: ['Search Engine Dominance', 'AI Lead Scoring', 'Ad Creatives'],
    accentColor: 'border-olive-600/40 bg-olive-950/20'
  },
  {
    id: 4,
    company: 'Crest Luxury Apparel',
    industry: 'High-End Fashion E-Com',
    result: '68% Repeat Customer Rate',
    desc: 'Deployed automated Klaviyo lifecycle flows and VIP exclusivity drops, lifting 90-day repurchase rate from 18% to 68%.',
    services: ['Lifecycle Marketing', 'Creative Direction', 'CRO Funnel'],
    accentColor: 'border-silver-500/30 bg-silver-800/20'
  }
]

export const team: TeamMember[] = [
  {
    name: 'Nikhil',
    role: 'Founder & Head of Marketing Strategy',
    quote: 'Marketing without creative leverage is expensive noise. We engineer campaigns that convert at scale.',
    colors: ['#708238', '#08080a'],
    bio: 'Directs paid acquisition, commercial funnel architecture, and global growth positioning.',
    image: '/assets/team/nikhil.jpg',
    imagePosition: 'center 45%'
  },
  {
    name: 'Mokshith',
    role: 'Co-Founder & Technical Architect',
    quote: 'High-speed code directly drives conversion rates. Sub-second performance equals profit.',
    colors: ['#c5c8d0', '#08080a'],
    bio: 'Oversees tracking infrastructure, serverless pipelines, and high-concurrency web apps.',
    image: '/assets/team/mokshith.jpg',
    imagePosition: 'center 70%'
  },
  {
    name: 'Amaresh',
    role: 'Co-Founder & Creative Director',
    quote: 'Minimalist editorial aesthetics signal undisputed authority before a word is read.',
    colors: ['#809446', '#08080a'],
    bio: 'Steers high-fashion visual assets, ad creatives, and high-converting typography systems.'
  }
]

// Updated pricing ranging strictly from $499 to $4,999 with regional currency equivalents
export const pricingPlans: PricingPlan[] = [
  {
    name: 'Growth Starter',
    prices: {
      USD: '$499',
      INR: '₹39,999',
      GBP: '£399',
      AUD: 'A$750',
      AED: 'AED 1,850',
      SGD: 'S$670'
    },
    desc: 'Targeted launch sprint for early-stage brands and high-conviction product debuts.',
    features: [
      'High-Converting Editorial Landing Page',
      'Technical SEO & Core Web Vitals Audit',
      'Meta or Google Search Ad Campaign Setup',
      'Social Media Style Guide & Ad Templates',
      '14-Day Rapid Launch & Tracking Telemetry'
    ],
    timeline: '1–2 WEEKS',
    btnText: 'Start for $499'
  },
  {
    name: 'Performance Scaling',
    prices: {
      USD: '$1,999',
      INR: '₹1,59,999',
      GBP: '£1,599',
      AUD: 'A$2,999',
      AED: 'AED 7,350',
      SGD: 'S$2,690'
    },
    desc: 'Comprehensive omnichannel marketing & full-funnel customer acquisition engine.',
    features: [
      'Full-Funnel Paid Ads (Meta + Google + TikTok)',
      'Custom Fast Web App & High-Converting Funnel',
      'Lifecycle Email Marketing (5 Automated Flows)',
      'Continuous Conversion Rate (CRO) A/B Tests',
      'Organic Search Engine Content Clusters',
      'Weekly Ad Creative Refreshes & ROAS Reporting',
      'Dedicated Slack / WhatsApp Founder Bridge'
    ],
    timeline: 'MONTHLY SPRINT',
    btnText: 'Scale for $1,999',
    popular: true
  },
  {
    name: 'Enterprise Domination',
    prices: {
      USD: '$4,999',
      INR: '₹3,99,999',
      GBP: '£3,999',
      AUD: 'A$7,499',
      AED: 'AED 18,350',
      SGD: 'S$6,690'
    },
    desc: 'Complete digital marketing command for established brands targeting category leadership.',
    features: [
      'Full Growth Stack (Web, Ads, Viral Creative, SEO)',
      'High-End Video & Editorial Art Direction',
      'Custom Autonomous AI Lead Scoring & Chatbots',
      'Creator & Influencer Partnership Architecture',
      'Multi-Market Global Localization (US, UK, India, MENA)',
      'Daily Campaign Monitoring & Rapid Optimization',
      '24/7 Priority SLA & Weekly Strategic Sessions'
    ],
    timeline: 'MONTHLY PARTNERSHIP',
    btnText: 'Reserve at $4,999'
  }
]

export const faqs: FaqItem[] = [
  {
    q: 'How do your marketing campaigns generate positive ROAS so fast?',
    a: 'We combine high-fashion visual assets (which command high CTRs and cheap CPMs) with mathematically optimized conversion funnels. We do not burn budget on generic testing; we deploy proven ad angles tailored to your industry.'
  },
  {
    q: 'Can you handle clients across different international timezones?',
    a: 'Yes. We serve partners across India (IST), the US (EST/PST), UK (GMT), Australia (AEST), the Middle East (GST), and Singapore (SGT). We provide scheduled briefing calls in your local time window and report in your preferred currency.'
  },
  {
    q: 'What budget do I need for paid ad spend?',
    a: 'Our $499 Starter Sprint is designed for ad budgets starting around $500–$1,500. For our $1,999 Scaling Retainer, brands typically invest $3,000–$20,000+ monthly in media spend for optimal conversion compounding.'
  },
  {
    q: 'Who creates our ad creative, copy, and video assets?',
    a: 'Our internal creative director Amaresh and marketing strategist Nikhil craft every headline, graphic, and video hook. Everything is built to reflect high-fashion editorial restraint.'
  },
  {
    q: 'Do I get full ownership of ad accounts and creative assets?',
    a: 'Always. You maintain 100% administrative control of all Meta Business Managers, Google Ad accounts, Figma files, and email platforms.'
  }
]

export const techStack = [
  { name: 'Meta Ads Manager', category: 'Paid Acquisition', desc: 'Precision audience clustering and Lookalike scaling' },
  { name: 'Google Ads & Search', category: 'High-Intent Inbound', desc: 'Keyword conquesting and Performance Max campaigns' },
  { name: 'Klaviyo / Resend', category: 'Retention & Email', desc: 'Automated revenue sequences with 40%+ open rates' },
  { name: 'React 18 / Next.js', category: 'Fast Web Engine', desc: 'Sub-second page speeds that maximize ad conversion' },
  { name: 'Tailwind CSS', category: 'Atomic Design', desc: 'Pixel-perfect typography and responsive consistency' },
  { name: 'Google Analytics 4', category: 'Telemetry', desc: 'Server-side conversion tracking and attribution' },
  { name: 'Figma & After Effects', category: 'Creative Production', desc: 'High-fashion editorial ads and motion hooks' },
  { name: 'Autonomous AI Agents', category: 'Smart Automation', desc: 'Automated CRM lead nurturing and dynamic sales chat' }
]
