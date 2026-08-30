export type SectionId =
  | "glance"
  | "experience"
  | "projects"
  | "strengths"
  | "howIWork"
  | "connect";

export type SearchGroup = "best" | "experience" | "projects" | "skills" | "actions";

export interface Achievement {
  icon: "trend" | "shield" | "layers" | "code";
  text: string;
  highlight?: string;
}

export interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  dates: string;
  current?: boolean;
  summary: string;
  achievements: Achievement[];
  technologies: string[];
  keywords: string[];
}

export interface Project {
  id: string;
  name: string;
  role: string;
  problem: string;
  contribution: string;
  outcome: string;
  technologies: string[];
  featured?: boolean;
  links?: { label: string; href: string }[];
  keywords: string[];
}

export interface Strength {
  id: string;
  label: string;
  description: string;
  apply: string;
  tags: string[];
  keywords: string[];
}

export interface BringItem {
  id: string;
  label: string;
  description: string;
  icon: "shield" | "code" | "trend" | "users";
}

export interface WorkTrait {
  id: string;
  label: string;
  description: string;
}

export interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  group: Exclude<SearchGroup, "best">;
  keywords: string[];
  section?: SectionId;
  href?: string;
}

export interface PortfolioData {
  profile: {
    name: string;
    shortName: string;
    initials: string;
    headline: string;
    headlineLines: [string, string];
    summary: string;
    yearsLabel: string;
    yearsDetail: string;
    focus: string;
    focusDetail: string;
    availability: string;
    availabilityDetail: string;
    location: string;
    timezone: string;
    remote: string;
    city: string;
  };
  links: {
    email: string;
    linkedin: string;
    github: string;
    resume: string;
    site: string;
  };
  education: {
    institution: string;
    degree: string;
    dates: string;
    datesShort: string;
    location: string;
    score: string;
  };
  experience: ExperienceRole[];
  projects: Project[];
  strengths: Strength[];
  traits: WorkTrait[];
  bring: BringItem[];
  rolePreferences: string[];
  toolkit: string[];
  strengthProfile: { label: string; value: string }[];
  bestFit: string[];
  recruiterSummary: string;
  contactBand: {
    heading: string;
    body: string;
  };
  replyNote: string;
  searchItems: SearchItem[];
}

export const SECTION_ORDER: SectionId[] = [
  "glance",
  "experience",
  "projects",
  "strengths",
  "howIWork",
  "connect",
];

export const MODAL_SECTIONS: SectionId[] = SECTION_ORDER.filter((id) => id !== "howIWork");

export const SECTION_TITLES: Record<SectionId, string> = {
  glance: "At a glance",
  experience: "Experience",
  projects: "Selected projects",
  strengths: "Core strengths",
  howIWork: "How I work",
  connect: "Let's connect",
};

export const SECTION_PREVIEWS: Record<SectionId, string> = {
  glance: "View details",
  experience: "Open experience",
  projects: "View details",
  strengths: "View details",
  howIWork: "View details",
  connect: "View details",
};

export const portfolio: PortfolioData = {
  profile: {
    name: "Tanmay Thanvi",
    shortName: "Tanmay",
    initials: "TT",
    headline: "Software engineer focused on reliable backend systems.",
    headlineLines: ["Software engineer focused", "on reliable backend systems."],
    summary: "I turn complex infrastructure problems into fast, resilient products.",
    yearsLabel: "2+ years",
    yearsDetail: "Professional experience",
    focus: "Backend / Platform",
    focusDetail: "Primary focus area",
    availability: "Open to conversations",
    availabilityDetail: "Happy to talk with teams that value reliability",
    location: "India",
    timezone: "UTC +05:30",
    remote: "Open to global remote teams",
    city: "Pune",
  },
  links: {
    email: "tanmaythanvi15@gmail.com",
    linkedin: "https://www.linkedin.com/in/tanmay-thanvi",
    github: "https://github.com/Tanmay-Thanvi",
    resume: "/resume.pdf",
    site: "https://www.tnt-portfolio.com",
  },
  education: {
    institution: "Pune Institute of Computer Technology (PICT)",
    degree: "B.E. — Computer Engineering",
    dates: "2020 – 2024",
    datesShort: "2020–24",
    location: "Pune, India",
    score: "CGPA 9.1",
  },
  experience: [
    {
      id: "deepintent",
      role: "Software Engineer",
      company: "DeepIntent",
      companyUrl: "https://www.deepintent.com",
      dates: "Aug 2024 – Present",
      current: true,
      summary:
        "Building distributed backend systems for healthcare advertising — APIs, platform services, and infrastructure that have to stay fast under load.",
      achievements: [
        {
          icon: "layers",
          text: "Owned the rate limiter end-to-end — a core backend and system-design piece of the AdTech/DSP platform.",
        },
        {
          icon: "code",
          text: "Built and maintained distributed, scalable backend services across the advertising stack.",
        },
        {
          icon: "shield",
          text: "Worked day-to-day with Java, Spring Boot, GraphQL, Kafka, Redis, and Kubernetes.",
        },
      ],
      technologies: [
        "Java",
        "Spring Boot",
        "GraphQL",
        "Kafka",
        "Redis",
        "Kubernetes",
        "MySQL",
      ],
      keywords: [
        "deepintent",
        "software engineer",
        "backend",
        "platform",
        "adtech",
        "dsp",
        "rate limiter",
        "java",
        "spring boot",
        "graphql",
        "kafka",
        "redis",
        "kubernetes",
        "current",
      ],
    },
    {
      id: "pubmatic",
      role: "Software Engineer",
      company: "PubMatic",
      companyUrl: "https://pubmatic.com",
      dates: "2024",
      summary:
        "Backend engineering on programmatic advertising systems — distributed services and platform infrastructure in AdTech/DSP.",
      achievements: [
        {
          icon: "code",
          text: "Contributed to distributed, scalable backend systems and platform infrastructure.",
        },
        {
          icon: "layers",
          text: "Worked inside high-throughput AdTech and DSP systems.",
        },
      ],
      technologies: ["Java", "Backend APIs", "Distributed systems"],
      keywords: [
        "pubmatic",
        "software engineer",
        "adtech",
        "dsp",
        "backend",
        "programmatic",
      ],
    },
  ],
  projects: [
    {
      id: "rate-limiter",
      name: "Distributed Rate Limiter",
      role: "Backend Engineer",
      featured: true,
      problem:
        "Protect core AdTech/DSP services from traffic spikes without blocking legitimate demand.",
      contribution:
        "Owned the limiter end-to-end — design, implementation, and operation as a platform primitive.",
      outcome:
        "Became a core reliability control for backend traffic on the advertising platform.",
      technologies: ["Java", "Redis", "Kubernetes", "Distributed systems"],
      keywords: [
        "rate limiter",
        "distributed systems",
        "redis",
        "java",
        "backend",
        "reliability",
        "deepintent",
      ],
    },
    {
      id: "terminal-portfolio",
      name: "Terminal Portfolio",
      role: "Full-stack Engineer",
      problem:
        "Needed a personal site that could present work clearly and also answer questions about it.",
      contribution:
        "Designed and built a terminal-styled portfolio with a Go backend and a self-contained RAG assistant.",
      outcome:
        "A working product that combines a distinctive UI with a real backend service.",
      technologies: ["Go", "Next.js", "SQLite", "RAG"],
      links: [{ label: "GitHub", href: "https://github.com/Tanmay-Thanvi" }],
      keywords: [
        "portfolio",
        "terminal",
        "go",
        "rag",
        "next.js",
        "full-stack",
        "ai",
      ],
    },
  ],
  strengths: [
    {
      id: "api-design",
      label: "API design",
      description: "Clear contracts and predictable interfaces. REST and GraphQL services other teams can depend on.",
      apply: "Used on platform and product APIs at DeepIntent.",
      tags: ["REST", "GraphQL", "Java", "Spring Boot"],
      keywords: ["api", "graphql", "rest", "contracts"],
    },
    {
      id: "distributed-systems",
      label: "Distributed systems",
      description: "Rate limiting, messaging, and service design for systems that have to stay correct under load.",
      apply: "Applied on the rate limiter and other backend services that run under traffic.",
      tags: ["Kafka", "Redis", "Kubernetes", "Rate limiting"],
      keywords: ["distributed systems", "kafka", "redis", "scalability"],
    },
    {
      id: "cloud-infrastructure",
      label: "Cloud infrastructure",
      description: "Containers and orchestration in day-to-day backend work. Docker, Kubernetes, and the paths between services.",
      apply: "Used Docker and Kubernetes while running backend services.",
      tags: ["Docker", "Kubernetes", "MySQL", "Java"],
      keywords: ["cloud", "kubernetes", "docker", "infrastructure"],
    },
    {
      id: "collaboration",
      label: "Cross-team collaboration",
      description: "I work with product, platform, and nearby engineering teams to ship backend changes safely.",
      apply: "Used when agreeing on APIs, trade-offs, and delivery with other teams.",
      tags: ["Communication", "Docs", "Ownership", "Delivery"],
      keywords: ["collaboration", "communication", "ownership"],
    },
  ],
  bring: [
    {
      id: "reliable",
      label: "Reliable systems",
      description: "I care about load, limits, recovery, and services that stay up.",
      icon: "shield",
    },
    {
      id: "api",
      label: "API and platform thinking",
      description: "I prefer clear contracts and services other teams can reuse.",
      icon: "code",
    },
    {
      id: "ownership",
      label: "End-to-end ownership",
      description: "I take work from design through production, not just the first pull request.",
      icon: "trend",
    },
    {
      id: "collab",
      label: "Cross-team work",
      description: "I work with product and platform teams to ship backend changes safely.",
      icon: "users",
    },
  ],
  rolePreferences: ["Backend Engineer", "Platform Engineer", "Remote / Hybrid", "Product teams"],
  toolkit: ["Java", "Spring Boot", "GraphQL", "Kafka", "Redis", "Kubernetes", "MySQL", "Go"],
  strengthProfile: [
    { label: "Primary", value: "Backend / Platform" },
    { label: "Approach", value: "Reliability first" },
    { label: "Collaboration", value: "Cross-team" },
    { label: "Learning", value: "Continuous" },
  ],
  bestFit: [
    "Scale backend APIs",
    "Improve reliability",
    "Build platform services",
    "Keep complex systems simple",
  ],
  traits: [
    {
      id: "ownership",
      label: "Ownership",
      description: "I take end-to-end ownership and follow through.",
    },
    {
      id: "clarity",
      label: "Clarity",
      description: "I communicate clearly and align early and often.",
    },
    {
      id: "reliability",
      label: "Reliability",
      description: "I build systems you can count on and teams can trust.",
    },
    {
      id: "learning",
      label: "Continuous learning",
      description: "I stay curious and keep improving my craft.",
    },
  ],
  recruiterSummary:
    "Backend-focused software engineer with 2+ years in AdTech/DSP at DeepIntent and PubMatic. Strongest in Java, Spring Boot, GraphQL, Kafka, Redis, and Kubernetes. Based in Pune, India (UTC +05:30) and open to global remote teams.",
  contactBand: {
    heading: "Have a role where reliability matters? Let's talk.",
    body: "I am excited to contribute to teams building dependable products, especially backend and platform work.",
  },
  replyNote: "I typically reply within 24 hours.",
  searchItems: [],
};

portfolio.searchItems = [
  {
    id: "role-se",
    title: "Software Engineer",
    subtitle: "DeepIntent · Aug 2024 – Present",
    group: "experience",
    section: "experience",
    keywords: ["software engineer", "role", "backend", "current", "deepintent"],
  },
  {
    id: "exp-deepintent",
    title: "DeepIntent",
    subtitle: "Software Engineer · healthcare advertising / DSP",
    group: "experience",
    section: "experience",
    keywords: ["deepintent", "employer", "adtech", "dsp", "healthcare"],
  },
  {
    id: "exp-pubmatic",
    title: "PubMatic",
    subtitle: "Software Engineer · programmatic advertising",
    group: "experience",
    section: "experience",
    keywords: ["pubmatic", "employer", "adtech", "programmatic"],
  },
  {
    id: "proj-rate",
    title: "Distributed Rate Limiter",
    subtitle: "Backend Engineer · owned end-to-end",
    group: "projects",
    section: "projects",
    keywords: ["rate limiter", "project", "redis", "reliability"],
  },
  {
    id: "proj-terminal",
    title: "Terminal Portfolio",
    subtitle: "Full-stack · Go, Next.js, RAG",
    group: "projects",
    section: "projects",
    keywords: ["portfolio", "project", "go", "rag", "ai"],
  },
  ...portfolio.strengths.map((strength) => ({
    id: `skill-${strength.id}`,
    title: strength.label,
    subtitle: strength.description,
    group: "skills" as const,
    section: "strengths" as const,
    keywords: strength.keywords,
  })),
  {
    id: "skill-java",
    title: "Java / Spring Boot",
    subtitle: "Primary backend stack",
    group: "skills",
    section: "strengths",
    keywords: ["java", "spring boot", "backend", "technology"],
  },
  {
    id: "skill-kafka",
    title: "Kafka & Redis",
    subtitle: "Messaging, caching, and control-plane primitives",
    group: "skills",
    section: "strengths",
    keywords: ["kafka", "redis", "streaming", "technology"],
  },
  {
    id: "action-resume",
    title: "Download resume",
    subtitle: "PDF resume",
    group: "actions",
    href: portfolio.links.resume,
    keywords: ["resume", "cv", "download"],
  },
  {
    id: "action-contact",
    title: "Contact Tanmay",
    subtitle: portfolio.links.email,
    group: "actions",
    href: `mailto:${portfolio.links.email}`,
    keywords: ["contact", "email", "hire", "conversation"],
  },
  {
    id: "action-linkedin",
    title: "LinkedIn profile",
    subtitle: "linkedin.com/in/tanmay-thanvi",
    group: "actions",
    href: portfolio.links.linkedin,
    keywords: ["linkedin", "profile", "contact"],
  },
  {
    id: "action-github",
    title: "GitHub profile",
    subtitle: "github.com/Tanmay-Thanvi",
    group: "actions",
    href: portfolio.links.github,
    keywords: ["github", "code", "projects"],
  },
];
