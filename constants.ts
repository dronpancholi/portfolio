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
    title: 'Life Plus Healthcare',
    description: 'A visionary real-time healthcare platform leveraging AI for predictive diagnostics and personalized patient care.',
    longDescription: 'Life Plus is a comprehensive healthcare ecosystem designed to bridge the gap between patients and medical professionals. By integrating real-time data from wearables and medical devices, our AI models provide early-stage diagnostic predictions, monitor chronic conditions, and suggest personalized wellness plans. The platform aims to democratize healthcare, making proactive and preventative care accessible to everyone.',
    techStack: ['TensorFlow', 'Python', 'React Native', 'Node.js', 'PostgreSQL', 'Google Cloud AI'],
    features: ['Real-time Health Monitoring', 'AI-Powered Predictive Diagnostics', 'Telemedicine Integration', 'Personalized Wellness Plans'],
    status: 'Coming Soon',
    liveUrl: null,
    repoUrl: null,
  },
  {
    title: 'AI-Powered Creative Suite',
    description: 'Developing a suite of tools that use generative AI to assist in creative workflows, from text to image generation.',
    longDescription: 'This project is a collection of generative AI tools aimed at augmenting the creative process for artists, designers, and writers. It includes models for high-fidelity image generation from text prompts, style transfer, and an AI co-writer that assists with brainstorming and drafting content. The suite is built with a focus on intuitive user interfaces and fine-grained control over the creative output.',
    techStack: ['PyTorch', 'Stable Diffusion', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Hugging Face'],
    features: ['Text-to-Image Generation', 'AI-Assisted Writing & Editing', 'Artistic Style Transfer', 'Intuitive User Interface'],
    status: 'In Progress',
    liveUrl: '#',
    repoUrl: 'https://github.com/dronpancholi',
  },
  {
    title: 'Autonomous Systems Research',
    description: 'Exploratory project focused on reinforcement learning for autonomous navigation and decision-making.',
    longDescription: 'This research delves into the application of deep reinforcement learning (DRL) for creating autonomous agents capable of navigating complex, dynamic environments. The primary focus is on developing and training models in simulated environments (like CARLA or AirSim) that can perform tasks such as drone navigation or autonomous driving, with an emphasis on safety, efficiency, and adaptability to unforeseen circumstances.',
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