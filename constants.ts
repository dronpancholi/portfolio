
export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const;

export const EXPERIENCE_DATA = [
  {
    company: "Company Name",
    role: "Senior Position",
    period: "2023 - Present",
    description: "A brief description of the company and your high-level role. Describe the scale of the systems you worked on and the impact of your contributions.",
    achievement: "Driven significant improvements in system performance or revenue growth during tenure.",
    responsibilities: [
      { title: "Core Focus", description: "Description of your primary responsibility and the technologies used." },
      { title: "Leadership", description: "Description of your leadership, mentorship, or strategic contributions." }
    ],
    tech: ["Tech A", "Tech B", "Tech C"]
  },
  {
    company: "Previous Company",
    role: "Mid-Level Position",
    period: "2021 - 2023",
    description: "Description of your role at this previous company. Highlight specific projects or products you helped launch.",
    achievement: "Successfully launched a key product feature that increased user engagement by X%.",
    responsibilities: [
      { title: "Development", description: "Built and maintained critical features using modern frameworks." },
      { title: "Collaboration", description: "Worked closely with cross-functional teams to deliver product goals." }
    ],
    tech: ["Tech D", "Tech E", "Tech F"]
  },
  {
    company: "Start-Up Name",
    role: "Junior Position",
    period: "2019 - 2021",
    description: "Description of your early career role. Focus on the foundational skills you developed and the fast-paced environment.",
    achievement: "Optimized legacy codebases to improve load times and maintainability.",
    responsibilities: [
      { title: "Implementation", description: "Translated design mockups into responsive, interactive user interfaces." },
      { title: "Testing", description: "Implemented automated testing suites to ensure code quality." }
    ],
    tech: ["Tech G", "Tech H", "Tech I"]
  }
] as const;

export const SKILLS_DATA = [
  {
    title: 'Category One',
    icon: 'ai', // Options: 'ai', 'frontend', 'backend', 'fullstack', 'tools'
    skills: ['Skill A', 'Skill B', 'Skill C', 'Skill D'],
  },
  {
    title: 'Category Two',
    icon: 'frontend',
    skills: ['Skill E', 'Skill F', 'Skill G', 'Skill H'],
  },
  {
    title: 'Category Three',
    icon: 'backend',
    skills: ['Skill I', 'Skill J', 'Skill K', 'Skill L'],
  },
   {
    title: 'Category Four',
    icon: 'fullstack',
    skills: ['Skill M', 'Skill N', 'Skill O', 'Skill P'],
  },
  {
    title: 'Category Five',
    icon: 'tools',
    skills: ['Skill Q', 'Skill R', 'Skill S', 'Skill T'],
  },
] as const;

export const PROJECTS_DATA = [
  {
    title: 'Project Title One',
    description: 'A concise tagline describing the project.',
    longDescription: 'A detailed description of the project. Explain the problem it solves, the user base it serves, and the technical challenges you overcame during development. This section can be a few paragraphs long.',
    techStack: ['Tech 1', 'Tech 2', 'Tech 3', 'Tech 4'],
    features: ['Key Feature 1', 'Key Feature 2', 'Key Feature 3', 'Key Feature 4'],
    status: 'Live',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Project Title Two',
    description: 'A concise tagline describing the project.',
    longDescription: 'A detailed description of the project. Focus on the unique value proposition and the architectural decisions made.',
    techStack: ['Tech A', 'Tech B', 'Tech C'],
    features: ['Feature A', 'Feature B', 'Feature C'],
    status: 'In Progress',
    liveUrl: '#',
    repoUrl: '#',
  },
  {
    title: 'Project Title Three',
    description: 'A concise tagline describing the project.',
    longDescription: 'A detailed description of the project. Highlight any research or experimental technologies used.',
    techStack: ['Tech X', 'Tech Y', 'Tech Z'],
    features: ['Feature X', 'Feature Y', 'Feature Z'],
    status: 'Concept',
    liveUrl: null,
    repoUrl: '#',
  },
] as const;

export const SOCIAL_LINKS = {
    email: 'your.email@example.com',
    profiles: [
        { name: 'LinkedIn', url: 'https://linkedin.com' },
        { name: 'GitHub', url: 'https://github.com' },
        { name: 'Instagram', url: 'https://instagram.com' },
        { name: 'Discord', url: 'https://discord.com' },
    ]
} as const;
