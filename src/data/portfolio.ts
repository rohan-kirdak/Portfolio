export const projects = [
  {
    id: 1,
    number: '01',
    title: 'HireWave',
    subtitle: 'Recruitment & Hiring Platform',
    description: 'Full-stack recruitment platform connecting candidates with verified hiring partners, with role-based dashboards for candidates, recruiters, and admins.',
    features: [
      'JWT Auth & Role-Based Dashboards',
      'AI Job Matching & Application Tracking',
      'Stripe Payments & Cloudinary Uploads'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS', 'Stripe', 'Cloudinary', 'Socket.IO'],
    image: '/projects/hirewave.png',
    github: 'https://github.com/rohan-kirdak/HireWave',
    live: 'https://hire-wave-gamma.vercel.app',
    featured: true,
    order: 1
  },
  {
    id: 2,
    number: '02',
    title: 'StartUp Sensei',
    subtitle: 'AI Startup Mentorship Platform',
    description: 'Interactive AI startup mentorship portal engineered to guide aspiring founders through business strategy, ideation validation, and step-by-step execution.',
    features: [
      'Real-time AI Chat (Socket.IO)',
      'Automated Startup Roadmap Generator',
      'Independent Solo Full-Stack Build'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'OpenAI API', 'Tailwind CSS'],
    image: '/projects/startup-sensei.png',
    github: 'https://github.com/rohan-kirdak/Startup-sensei-main',
    live: 'https://startup-sensei-main.vercel.app',
    featured: true,
    order: 2
  },
  {
    id: 3,
    number: '03',
    title: 'ShopKart',
    subtitle: 'MERN E-Commerce Platform',
    description: 'Feature-rich MERN e-commerce application designed for seamless customer shopping, product discovery, and efficient order fulfillment.',
    features: [
      'Razorpay Payment Gateway Integration',
      'Persistent Shopping Cart & Inventory Controls',
      'Protected Admin Dashboard'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'Tailwind CSS'],
    image: '/projects/shopkart.png',
    github: 'https://github.com/rohan-kirdak/Shop-kart',
    live: 'https://shop-kart-eight-flax.vercel.app',
    featured: false,
    order: 3
  },
  {
    id: 4,
    number: '04',
    title: 'ProjectHub',
    subtitle: 'Student Project Marketplace',
    description: 'Academic project marketplace allowing computer science students to browse, purchase, and distribute verified course projects securely.',
    features: [
      'Student Academic Project Marketplace',
      'Razorpay Payments & File Downloads',
      'MySQL-Backed MVC Architecture'
    ],
    tech: ['Node.js', 'Express.js', 'EJS', 'MySQL', 'Razorpay', 'Tailwind CSS'],
    image: '/projects/project-rabbit.png',
    github: 'https://github.com/rohan-kirdak/project-rabbit-1',
    live: 'https://project-hub.vercel.app',
    featured: false,
    order: 4
  },
  {
    id: 5,
    number: '05',
    title: 'MindEase',
    subtitle: 'AI-Powered Full-Stack Application',
    description: 'Comprehensive mental wellness companion providing users with accessible digital tools for emotional tracking, self-care, and daily mindfulness.',
    features: [
      'Personalized AI Conversational Support',
      'Real-time Mood & Wellness Tracking',
      'Interactive Self-Care Toolkits'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Tailwind CSS'],
    image: '/projects/mindease.png',
    github: 'https://github.com/rohan-kirdak/MindEase',
    live: 'https://mindease-ai.vercel.app',
    featured: false,
    order: 5
  }
]

export const skills = {
  Frontend: ['React.js', 'Next.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
  Backend: ['Node.js', 'Express.js', 'REST APIs', 'GraphQL', 'JWT', 'Socket.IO'],
  Database: ['MongoDB', 'MySQL', 'PostgreSQL', 'Mongoose', 'Prisma'],
  'Cloud & DevOps': ['AWS', 'Vercel', 'Docker', 'GitHub Actions'],
  'AI & APIs': ['Gemini API', 'OpenAI API'],
  'Tools & CS': ['Git', 'GitHub', 'Postman', 'DSA', 'OOP', 'Database Design', 'System Design']
}

export const experience = [
  {
    company: 'ScaleFull Technologies',
    position: 'Intern Software Engineer',
    duration: 'Jan 2026 – Present',
    description: 'Collaborating with the core development team to build, optimize, and maintain production-ready web products and scalable backend services.',
    type: 'Internship',
    icon: '💻',
    order: 1
  },
  {
    company: 'Wisdom Sprouts | Java By Kiran | Cyber Success',
    position: 'Trainee',
    duration: '2026 – Present',
    description: 'Advanced technical training in Full Stack Development, Java, Aptitude, and Interview Placement Preparation.',
    type: 'Training',
    icon: '💼',
    order: 2
  },
  {
    company: 'Kanak Digifex NextGen Pvt. Ltd.',
    position: 'Junior Web Developer',
    duration: 'Feb 2025 – Mar 2025',
    description: 'Built server-side rendered applications using Node.js, Express.js, EJS, and MySQL. Developed backend controllers and database queries.',
    type: 'Experience',
    icon: '⚡',
    order: 3
  },
  {
    company: 'Cloud Infotech',
    position: 'Web Development Intern',
    duration: 'Jan 2025 – Feb 2025',
    description: 'Developed responsive React.js interfaces and integrated REST APIs into MERN stack applications.',
    type: 'Internship',
    icon: '🚀',
    order: 4
  }
]

export const education = {
  degree: 'B.E. Computer Engineering',
  college: 'Shri Chhatrapati Shivaji Maharaj College of Engineering',
  university: 'Savitribai Phule Pune University (SPPU)',
  duration: '2022 – 2026',
  cgpa: '7.98/10',
  finalCgpa: '8.93/10',
  hsc: 'HSC — 83% | 2022',
  ssc: 'SSC — 94.80% | 2020'
}

export const leadership = [
  {
    id: 1,
    title: 'Technical Club President',
    organization: 'CSMCOE Technical Student Association',
    description: 'Organized and coordinated technical events and managed student participation in technical activities.',
    icon: '👑'
  },
  {
    id: 2,
    title: 'Google Student Ambassador',
    organization: 'Google Developer Community',
    description: 'Promoted technical initiatives and organized student-focused technology activities and events.',
    icon: '🌐'
  }
]

export const profileInfo = {
  name: 'Rohan Kirdak',
  title: 'Full Stack MERN & Next.js Developer',
  badge: 'Intern Software Engineer @ ScaleFull Technologies',
  bio: 'Building scalable, responsive and AI-powered web applications with modern technologies.',
  aboutIntro: 'I’m a B.E. Computer Engineering graduate focused on building modern full-stack web applications using MERN, Next.js, and cloud technologies. I enjoy developing scalable backend systems, responsive interfaces, real-time applications, and AI-powered products.',
  highlights: [
    { title: 'Full Stack Development', desc: 'MERN & Next.js ecosystem' },
    { title: 'AI-Powered Applications', desc: 'OpenAI & Gemini API integrations' },
    { title: 'Scalable Web Systems', desc: 'Robust backends & clean architecture' }
  ],
  focusAreas: [
    'Full-Stack Development',
    'MERN & Next.js',
    'AI-Powered Applications',
    'Backend & API Development',
    'Cloud & DevOps'
  ],
  footerBio: 'Full Stack Developer building modern web applications with MERN, Next.js, and AI technologies.',
  contactHeading: "Let's build something impactful.",
  contactSubtitle: 'Open to software development opportunities, collaborations, and interesting technical projects.',
  email: 'rohankirdak8756@gmail.com',
  github: 'https://github.com/rohan-kirdak',
  linkedin: 'https://www.linkedin.com/in/rohan-kirdak-240810254',
  resumeUrl: '/resume.pdf'
}
