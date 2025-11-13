export const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#contact', label: 'Contact' },
] as const;

export const SKILLS_DATA = [
  {
    title: 'AI & Machine Learning',
    icon: 'ai',
    skills: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'LangChain', 'LLMs'],
  },
  {
    title: 'Frontend Development',
    icon: 'frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'JavaScript (ES6+)'],
  },
  {
    title: 'Backend Development',
    icon: 'backend',
    skills: ['Node.js', 'Express', 'Python', 'Flask', 'MongoDB', 'PostgreSQL', 'REST APIs'],
  },
   {
    title: 'Full-Stack Expertise',
    icon: 'fullstack',
    skills: ['CI/CD', 'Git & GitHub', 'Docker', 'Vercel', 'Agile Methodologies'],
  },
  {
    title: 'AI Development Tools',
    icon: 'tools',
    skills: ['Google Colab', 'Jupyter Notebooks', 'Hugging Face', 'Gemini API', 'Vector Databases'],
  },
] as const;

export const PROJECTS_DATA = [
  {
    title: 'Predictive Health AI',
    description: 'An exploration into real-time healthcare AI, designed for predictive diagnostics and personalized patient care.',
    longDescription: 'A concept for a comprehensive healthcare ecosystem designed to bridge patients and medical professionals. By processing real-time data from wearables, its AI models are intended to provide early-stage diagnostic predictions, monitor chronic conditions, and suggest personalized wellness plans. The platform explores how to make proactive and preventative care more accessible through technology.',
    techStack: ['TensorFlow', 'Python', 'React Native', 'Node.js', 'PostgreSQL', 'Google Cloud AI'],
    features: ['Real-time Health Monitoring', 'AI-Powered Predictive Diagnostics', 'Telemedicine Integration', 'Personalized Wellness Plans'],
    status: 'Coming Soon',
    liveUrl: null,
    repoUrl: null,
  },
  {
    title: 'Generative Creative Suite',
    description: 'A suite of generative AI tools designed to augment creative workflows, from text to image.',
    longDescription: 'A collection of generative AI tools designed to augment the creative process. The suite includes models for high-fidelity image generation, artistic style transfer, and an AI co-writer for brainstorming content, all built with a focus on intuitive interfaces and fine-grained control over the output.',
    techStack: ['PyTorch', 'Stable Diffusion', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Hugging Face'],
    features: ['Text-to-Image Generation', 'AI-Assisted Writing & Editing', 'Artistic Style Transfer', 'Intuitive User Interface'],
    status: 'In Progress',
    liveUrl: '#',
    repoUrl: 'https://github.com/dronpancholi',
  },
  {
    title: 'Reinforcement Learning for Navigation',
    description: 'Research into reinforcement learning for autonomous navigation and decision-making in complex environments.',
    longDescription: 'This research explores the application of deep reinforcement learning (DRL) for creating autonomous agents that navigate complex, dynamic environments. The focus is on training models in simulation to perform tasks like drone navigation or autonomous driving, with an emphasis on safety, efficiency, and adaptability.',
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