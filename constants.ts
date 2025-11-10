
export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const;

export const SKILLS_DATA = [
  {
    title: 'System Design & Architecture',
    icon: 'briefcase',
    description: 'I build resilient, scalable software systems from the ground up, focusing on clean architecture, performance, and long-term maintainability.',
    skills: ['Docker', 'CI/CD', 'Git & GitHub', 'Vercel', 'Agile Methodologies'],
  },
  {
    title: 'AI & ML Engineering',
    icon: 'ai',
    description: 'I develop and deploy machine learning models that solve real-world problems, from training deep neural networks to implementing generative AI systems.',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'LangChain', 'LLMs', 'Hugging Face'],
  },
  {
    title: 'Full-Stack Implementation',
    icon: 'backend',
    description: 'I engineer end-to-end applications with a focus on robust backend logic, efficient data management, and seamless API integration.',
    skills: ['Node.js', 'Express', 'Python', 'Flask', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
  {
    title: 'Interface & Experience Design',
    icon: 'frontend',
    description: 'I craft precise, intuitive user interfaces that prioritize clarity and performance, using modern frameworks to create fluid and responsive experiences.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
] as const;

export const PROJECTS_DATA = [
  {
    title: 'Life Plus Healthcare',
    description: 'An AI-driven healthcare platform architecture for real-time monitoring and predictive diagnostics.',
    longDescription: 'An exploration into a real-time healthcare system using AI to provide early-stage diagnostic predictions from wearable data. The architecture is designed for high data throughput and secure, personalized patient monitoring, with a focus on creating a proactive, preventative care model.',
    techStack: ['TensorFlow', 'Python', 'React Native', 'Node.js', 'PostgreSQL', 'Google Cloud AI'],
    features: ['Real-time Health Monitoring', 'AI-Powered Predictive Diagnostics', 'Telemedicine Integration', 'Personalized Wellness Plans'],
    status: 'Coming Soon',
    liveUrl: null,
    repoUrl: null,
  },
  {
    title: 'AI-Powered Creative Suite',
    description: 'A suite of generative AI tools designed to augment creative workflows for artists and writers.',
    longDescription: 'A suite of generative models designed to augment creative workflows. The system integrates text-to-image and language models through a minimal interface, focusing on providing fine-grained control and repeatable outputs. The technical challenge lies in balancing model performance with an intuitive, non-disruptive user experience.',
    techStack: ['PyTorch', 'Stable Diffusion', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Hugging Face'],
    features: ['Text-to-Image Generation', 'AI-Assisted Writing & Editing', 'Artistic Style Transfer', 'Intuitive User Interface'],
    status: 'In Progress',
    liveUrl: '#',
    repoUrl: 'https://github.com/dronpancholi',
  },
  {
    title: 'Autonomous Systems Research',
    description: 'A research project applying reinforcement learning to autonomous agent navigation in simulated environments.',
    longDescription: 'A research initiative focused on deep reinforcement learning for autonomous navigation. The project involves training agents in simulated environments to handle dynamic obstacles and complex pathfinding. The core of the work is centered on developing a model that balances efficient decision-making with robust safety protocols, exploring sim-to-real transferability.',
    techStack: ['Reinforcement Learning', 'PyTorch', 'OpenAI Gym', 'CARLA Simulator', 'Python'],
    features: ['Pathfinding in Dynamic Environments', 'Collision Avoidance Systems', 'Sim-to-Real Model Transfer', 'Behavioral Cloning'],
    status: 'In Progress',
    liveUrl: null,
    repoUrl: 'https://github.com/dronpancholi',
  },
] as const;

export const SOCIAL_LINKS = {
    email: 'dronpancholi@gmail.com',
    profiles: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/dronpancholi' },
        { name: 'GitHub', url: 'https://github.com/dronpancholi' },
        { name: 'Instagram', url: 'https://www.instagram.com/dronpancholi' },
        { name: 'Discord', url: 'https://discord.com/users/dronpancholi' },
    ]
} as const;
