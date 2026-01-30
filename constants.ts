
export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#experience', label: 'Experience' },
  { href: '#skills', label: 'Expertise' },
  { href: '#projects', label: 'Services' },
  { href: '#contact', label: 'Contact' },
] as const;

export const EXPERIENCE_DATA = [
  {
    company: "Shree Bajrangdasbapa Arogyadham",
    role: "Hospital Director",
    period: "Current",
    description: "Leading hospital operations, strategic planning, and patient care excellence at a premier healthcare institution in Bhavnagar, Gujarat.",
    achievement: "Successfully managing ICUs and hospital administration ensuring high standards of patient care since 2008.",
    responsibilities: [
      { title: "Strategic Leadership", description: "Directing overall hospital operations, financial planning, and resource allocation." },
      { title: "Clinical Excellence", description: "Overseeing critical care units and ensuring adherence to medical best practices." }
    ],
    tech: ["Hospital Management", "ICU Administration", "Strategic Planning"]
  },
  {
    company: "Aster Healthcare, Kenya",
    role: "Director",
    period: "Aug 2023 - Present",
    description: "Spearheading healthcare initiatives and expanding operations in Nairobi, Kenya, bringing international expertise to the region.",
    achievement: "Established a strong operational framework for healthcare delivery in East Africa.",
    responsibilities: [
      { title: "International Operations", description: "Managing cross-border healthcare strategies and team leadership." },
      { title: "Business Development", description: "Identifying growth opportunities and building partnerships in the African healthcare sector." }
    ],
    tech: ["Global Health", "Business Strategy", "Operations"]
  },
  {
    company: "College of Critical Care",
    role: "Teaching Faculty",
    period: "Aug 2011 - Present",
    description: "Educating and mentoring the next generation of critical care professionals, specializing in Cardiovascular and Trauma Intensive Care.",
    achievement: "Mentored numerous medical professionals in advanced critical care techniques over 14+ years.",
    responsibilities: [
      { title: "Medical Education", description: "Delivering lectures and practical training on Trauma and Cardiovascular ICU care." },
      { title: "Curriculum Development", description: "Contributing to the academic framework for critical care nursing and medicine." }
    ],
    tech: ["Medical Education", "Trauma Care", "Cardiovascular ICU"]
  },
  {
    company: "Sterling Hospitals",
    role: "Consultant Critical Care",
    period: "Oct 2010 - Oct 2014",
    description: "Provided specialized critical care consultancy, managing complex medical cases and ICU protocols.",
    achievement: "Delivered high-quality critical care services improving patient outcomes in high-acuity settings.",
    responsibilities: [
      { title: "Patient Care", description: "Direct management of critically ill patients in a tertiary care setting." },
      { title: "Protocol Implementation", description: "Established robust ICU protocols for patient safety and efficiency." }
    ],
    tech: ["Critical Care", "Anaesthesiology", "Patient Safety"]
  }
] as const;

// Mapped icons to logical categories:
// 'fullstack' (Briefcase) -> Leadership
// 'ai' (BrainCircuit) -> Clinical Expertise
// 'backend' (Database) -> Administration
// 'frontend' (Code) -> Consulting
// 'tools' (Bot) -> Personal Interests
export const SKILLS_DATA = [
  {
    title: 'Leadership & Strategy',
    icon: 'fullstack', 
    skills: ['Hospital Management', 'Strategic Planning', 'Team Building', 'Project Management', 'Directors'],
  },
  {
    title: 'Clinical Expertise',
    icon: 'ai',
    skills: ['Anaesthesiology', 'Critical Care', 'Cardiovascular ICU', 'Trauma Intensive Care'],
  },
  {
    title: 'Consulting Services',
    icon: 'frontend',
    skills: ['Management Consulting', 'Healthcare Consulting', 'Business Consulting', 'Pricing Strategy'],
  },
   {
    title: 'Education & Development',
    icon: 'backend',
    skills: ['Medical Education', 'Leadership Development', 'Career Coaching', 'Mentorship'],
  },
  {
    title: 'Personal Interests',
    icon: 'tools',
    skills: ['Financial Markets', 'Trekking', 'Running & Cycling', 'Cooking', 'Reading'],
  },
] as const;

export const PROJECTS_DATA = [
  {
    title: 'International Healthcare Expansion',
    description: 'Strategic direction and operational leadership for Aster Healthcare in Nairobi, Kenya.',
    longDescription: 'Leading the expansion and operational management of Aster Healthcare in Kenya. This initiative involves adapting healthcare delivery models to the East African context, ensuring regulatory compliance, and building local capacity. The role encompasses strategic oversight, team building, and establishing high standards of clinical care in a new market.',
    techStack: ['Global Strategy', 'Operations Management', 'Cross-Cultural Leadership'],
    features: ['Market Entry Strategy', 'Operational Setup', 'Team Recruitment', 'Regulatory Compliance'],
    status: 'Active',
    liveUrl: null,
    repoUrl: null,
  },
  {
    title: 'Critical Care Education Program',
    description: 'Long-standing faculty role dedicated to training healthcare professionals in advanced critical care.',
    longDescription: 'Serving as Teaching Faculty at the College of Critical Care for over 14 years. The focus is on specialized areas such as Cardiovascular Intensive Care Nursing and Trauma Intensive Care. This contribution helps bridge the gap between theoretical knowledge and practical application for nursing and medical staff, enhancing the overall quality of critical care services.',
    techStack: ['Medical Training', 'Curriculum Delivery', 'Mentorship'],
    features: ['Trauma Care Training', 'Cardiovascular ICU Protocols', 'Student Mentorship', 'Academic Contribution'],
    status: 'Ongoing',
    liveUrl: null,
    repoUrl: null,
  },
  {
    title: 'Strategic Hospital Administration',
    description: 'Comprehensive management and leadership of Shree Bajrangdasbapa Arogyadham.',
    longDescription: 'As Hospital Director, I oversee the entire ecosystem of Shree Bajrangdasbapa Arogyadham. This includes financial planning, pricing strategy formulation, resource allocation, and ensuring optimal patient outcomes. My tenure has been marked by a consistent focus on operational efficiency and the delivery of compassionate, high-quality healthcare.',
    techStack: ['Hospital Administration', 'Financial Planning', 'Resource Management'],
    features: ['Pricing Strategy', 'Infrastructure Management', 'Quality Assurance', 'Staff Leadership'],
    status: 'Ongoing',
    liveUrl: null,
    repoUrl: null,
  },
] as const;

export const SOCIAL_LINKS = {
    email: 'contact@drdarshanshukla.com', // Placeholder
    profiles: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dr-darshan-shukla-a1b53a235/' },
    ]
} as const;