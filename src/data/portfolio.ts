export const projects = [
  {
    id: 1,
    title: 'StartUp Sensei',
    description: 'AI-powered startup mentorship platform designed to help aspiring entrepreneurs with roadmap generation, mentor guidance, and real-time AI interaction.',
    features: ['Real-time Chat (Socket.IO)', 'OpenAI API Integration', 'Startup Roadmap Generator', 'Mentor Matching System', 'Progress Tracking Dashboard', 'Modern Responsive UI'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'OpenAI API', 'Tailwind CSS', 'Framer Motion'],
    image: '/projects/startup-sensei.png',
    github: 'https://github.com/rohan-kirdak/Startup-sensei-main',
    live: 'https://startup-sensei-main.vercel.app',
    featured: true
  },
  {
    id: 2,
    title: 'HireWave',
    description: 'Modern recruitment and hiring platform built with MERN Stack featuring authentication, recruiter dashboard, candidate management, and premium responsive UI.',
    features: ['User Authentication', 'Recruiter Dashboard', 'Job Posting System', 'Candidate Management', 'Responsive Modern UI', 'Backend API Integration', 'Docker & GitHub Actions CI/CD'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Tailwind CSS', 'Framer Motion', 'Docker', 'GitHub Actions'],
    image: '/projects/hirewave.png',
    github: 'https://github.com/rohan-kirdak/HireWave',
    live: 'https://hire-wave-gamma.vercel.app',
    featured: true
  },
  {
    id: 3,
    title: 'ShopKart',
    description: 'Full-stack e-commerce platform with modern UI, product management, cart functionality, and secure backend architecture.',
    features: ['Product Listing', 'Shopping Cart', 'Authentication System', 'Order Management', 'Responsive Design', 'Dynamic Backend Integration'],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Context API'],
    image: '/projects/shopkart.png',
    github: 'https://github.com/rohan-kirdak/Shop-kart',
    live: 'https://shop-kart-eight-flax.vercel.app',
    featured: true
  },
  {
    id: 4,
    title: 'Project Rabbit',
    description: 'Dynamic platform for students to upload, showcase, and sell academic projects with portfolio management and backend integration.',
    features: ['Project Upload System', 'Student Portfolio Management', 'Authentication System', 'Admin Dashboard', 'Database Management'],
    tech: ['Node.js', 'Express.js', 'EJS', 'MySQL', 'Tailwind CSS', 'MVC Architecture'],
    image: '/projects/project-rabbit.png',
    github: 'https://github.com/rohan-kirdak/project-rabbit-1',
    live: undefined,
    featured: false
  }
]

export const skills = {
  Frontend: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'Authentication', 'Middleware'],
  Database: ['MongoDB', 'PostgreSQL', 'Prisma ORM', 'Database Design', 'Optimization'],
  Tools: ['Git', 'GitHub', 'Docker', 'VS Code', 'Postman', 'Figma'],
  Deployment: ['Vercel', 'Netlify', 'AWS', 'GitHub Pages', 'Docker'],
  'AI Tools': ['OpenAI', 'Claude API', 'Gemini', 'LangChain', 'Prompt Engineering']
}

export const experience = [
  {
    type: 'Internship',
    company: 'ScaleFull Technologies',
    position: 'Intern Software Engineer',
    duration: 'Jan 2026 - Present',
    description: 'Collaborating with core development team to build, optimize, and maintain production-ready web products and scalable backend services.',
    icon: '💻'
  },
  {
    type: 'Internship',
    company: 'Wisdom Sprouts | Java By Kiran | Cyber Success',
    position: 'Trainee',
    duration: '2026 - Present',
    description: 'Advanced technical training in Full Stack Development, Java, Aptitude, and Interview Placement Preparation.',
    icon: '💼'
  },
  {
    type: 'Internship',
    company: 'Kanak Digifex NextGen Pvt. Ltd.',
    position: 'Junior Web Developer',
    duration: 'Feb 2025 - Mar 2025',
    description: 'Built server-side rendered applications using Node.js, Express.js, EJS, and MySQL. Programmed backend controllers and database queries.',
    icon: '⚡'
  },
  {
    type: 'Internship',
    company: 'Cloud Infotech',
    position: 'Web Development Intern',
    duration: 'Jan 2025 - Feb 2025',
    description: 'Developed responsive user interfaces with React.js and integrated REST APIs into MERN stack web applications.',
    icon: '🚀'
  },
  {
    type: 'Education',
    company: 'SPPU University',
    position: 'B.E. Computer Engineering',
    duration: '2022 - 2026',
    description: 'Specialized in computer science fundamentals, full-stack web engineering, and software architectures.',
    icon: '🎓'
  }
]

export const testimonials = [
  {
    name: 'Startup Founder',
    company: 'Tech Startup',
    text: 'Rohan is an exceptional developer who delivered our product on time with premium quality.',
    avatar: '👨‍💼',
    rating: 5
  },
  {
    name: 'Product Manager',
    company: 'AI Company',
    text: 'Great attention to detail and amazing animation skills. Highly recommended!',
    avatar: '👩‍💼',
    rating: 5
  },
  {
    name: 'CTO',
    company: 'SaaS Company',
    text: 'Professional, reliable, and always delivers quality code. Perfect team member.',
    avatar: '👨‍💻',
    rating: 5
  }
]

export const stats = [
  { label: 'Projects Completed', value: '8+' },
  { label: 'Technologies Mastered', value: '20+' },
  { label: 'GitHub Contributions', value: '200+' },
  { label: 'Years Experience', value: '1.5+' }
]

export const services = [
  {
    icon: '⚛️',
    title: 'Frontend Development',
    description: 'React, Next.js, Tailwind CSS with modern UI/UX practices'
  },
  {
    icon: '🔗',
    title: 'Full Stack Development',
    description: 'Complete MERN stack applications with database design'
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Beautiful, responsive, and animated user interfaces'
  },
  {
    icon: '🚀',
    title: 'SaaS Development',
    description: 'Scalable and performant SaaS applications'
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    description: 'OpenAI, Claude, Gemini API integration in web apps'
  },
  {
    icon: '⚡',
    title: 'Performance Optimization',
    description: 'Fast loading, SEO optimized, accessible websites'
  }
]
