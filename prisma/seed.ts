import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()
const SECRET_KEY = process.env.JWT_SECRET || 'rohan-portfolio-secret-2026'

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, SECRET_KEY, 1000, 64, 'sha512').toString('hex')
}

const initialProjects = [
  {
    title: 'StartUp Sensei',
    description: 'AI-powered startup mentorship platform designed to help aspiring entrepreneurs with roadmap generation, mentor guidance, and real-time AI interaction.',
    features: JSON.stringify(['Real-time Chat (Socket.IO)', 'OpenAI API Integration', 'Startup Roadmap Generator', 'Mentor Matching System', 'Progress Tracking Dashboard', 'Modern Responsive UI']),
    technologies: JSON.stringify(['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'OpenAI API', 'Tailwind CSS', 'Framer Motion']),
    image: '/projects/startup-sensei.png',
    github: 'https://github.com/rohan-kirdak/Startup-sensei-main',
    live: 'https://startup-sensei-main.vercel.app',
    featured: true,
    order: 1
  },
  {
    title: 'HireWave',
    description: 'Modern recruitment and hiring platform built with MERN Stack featuring authentication, recruiter dashboard, candidate management, and premium responsive UI.',
    features: JSON.stringify(['User Authentication', 'Recruiter Dashboard', 'Job Posting System', 'Candidate Management', 'Responsive Modern UI', 'Backend API Integration', 'Docker & GitHub Actions CI/CD']),
    technologies: JSON.stringify(['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth', 'Tailwind CSS', 'Framer Motion', 'Docker', 'GitHub Actions']),
    image: '/projects/hirewave.png',
    github: 'https://github.com/rohan-kirdak/HireWave',
    live: 'https://hire-wave-gamma.vercel.app',
    featured: true,
    order: 2
  },
  {
    title: 'ShopKart',
    description: 'Full-stack e-commerce platform with modern UI, product management, cart functionality, and secure backend architecture.',
    features: JSON.stringify(['Product Listing', 'Shopping Cart', 'Authentication System', 'Order Management', 'Responsive Design', 'Dynamic Backend Integration']),
    technologies: JSON.stringify(['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Context API']),
    image: '/projects/shopkart.png',
    github: 'https://github.com/rohan-kirdak/Shop-kart',
    live: 'https://shop-kart-eight-flax.vercel.app',
    featured: true,
    order: 3
  },
  {
    title: 'Project Rabbit',
    description: 'Dynamic platform for students to upload, showcase, and sell academic projects with portfolio management and backend integration.',
    features: JSON.stringify(['Project Upload System', 'Student Portfolio Management', 'Authentication System', 'Admin Dashboard', 'Database Management']),
    technologies: JSON.stringify(['Node.js', 'Express.js', 'EJS', 'MySQL', 'Tailwind CSS', 'MVC Architecture']),
    image: '/projects/project-rabbit.png',
    github: 'https://github.com/rohan-kirdak/project-rabbit-1',
    live: '',
    featured: false,
    order: 4
  }
]

const initialSkills = [
  // Frontend
  { name: 'HTML', category: 'Frontend', level: 'Expert', order: 1 },
  { name: 'CSS', category: 'Frontend', level: 'Expert', order: 2 },
  { name: 'JavaScript', category: 'Frontend', level: 'Expert', order: 3 },
  { name: 'TypeScript', category: 'Frontend', level: 'Advanced', order: 4 },
  { name: 'React.js', category: 'Frontend', level: 'Expert', order: 5 },
  { name: 'Next.js', category: 'Frontend', level: 'Expert', order: 6 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Expert', order: 7 },
  { name: 'Framer Motion', category: 'Frontend', level: 'Advanced', order: 8 },
  // Backend
  { name: 'Node.js', category: 'Backend', level: 'Expert', order: 1 },
  { name: 'Express.js', category: 'Backend', level: 'Expert', order: 2 },
  { name: 'REST APIs', category: 'Backend', level: 'Expert', order: 3 },
  { name: 'GraphQL', category: 'Backend', level: 'Intermediate', order: 4 },
  { name: 'Authentication', category: 'Backend', level: 'Advanced', order: 5 },
  // Database
  { name: 'MongoDB', category: 'Database', level: 'Expert', order: 1 },
  { name: 'PostgreSQL', category: 'Database', level: 'Advanced', order: 2 },
  { name: 'Prisma ORM', category: 'Database', level: 'Advanced', order: 3 },
  { name: 'Database Design', category: 'Database', level: 'Advanced', order: 4 },
  // Tools
  { name: 'Git', category: 'Tools', level: 'Expert', order: 1 },
  { name: 'GitHub', category: 'Tools', level: 'Expert', order: 2 },
  { name: 'Docker', category: 'Tools', level: 'Advanced', order: 3 },
  { name: 'Postman', category: 'Tools', level: 'Advanced', order: 4 },
  // Deployment
  { name: 'Vercel', category: 'Deployment', level: 'Expert', order: 1 },
  { name: 'Docker', category: 'Deployment', level: 'Advanced', order: 2 },
  { name: 'AWS', category: 'Deployment', level: 'Intermediate', order: 3 },
  // AI Tools
  { name: 'OpenAI', category: 'AI Tools', level: 'Advanced', order: 1 },
  { name: 'Claude API', category: 'AI Tools', level: 'Advanced', order: 2 },
  { name: 'Gemini', category: 'AI Tools', level: 'Advanced', order: 3 }
]

const initialExperience = [
  {
    type: 'Internship',
    company: 'ScaleFull Technologies',
    position: 'Intern Software Engineer',
    duration: 'Jan 2026 - Present',
    description: 'Collaborating with core development team to build, optimize, and maintain production-ready web products and scalable backend services.',
    icon: '💻',
    order: 1
  },
  {
    type: 'Internship',
    company: 'Wisdom Sprouts | Java By Kiran | Cyber Success',
    position: 'Trainee',
    duration: '2026 - Present',
    description: 'Advanced technical training in Full Stack Development, Java, Aptitude, and Interview Placement Preparation.',
    icon: '💼',
    order: 2
  },
  {
    type: 'Internship',
    company: 'Kanak Digifex NextGen Pvt. Ltd.',
    position: 'Junior Web Developer',
    duration: 'Feb 2025 - Mar 2025',
    description: 'Built server-side rendered applications using Node.js, Express.js, EJS, and MySQL. Programmed backend controllers and database queries.',
    icon: '⚡',
    order: 3
  },
  {
    type: 'Internship',
    company: 'Cloud Infotech',
    position: 'Web Development Intern',
    duration: 'Jan 2025 - Feb 2025',
    description: 'Developed responsive user interfaces with React.js and integrated REST APIs into MERN stack web applications.',
    icon: '🚀',
    order: 4
  },
  {
    type: 'Education',
    company: 'SPPU University',
    position: 'B.E. Computer Engineering',
    duration: '2022 - 2026',
    description: 'Specialized in computer science fundamentals, full-stack web engineering, and software architectures.',
    icon: '🎓',
    order: 5
  }
]

async function main() {
  console.log('Seeding Database...')

  // Admin User
  const rawAdminPass = process.env.ADMIN_PASSWORD || 'admin123'
  const hashed = hashPassword(rawAdminPass)

  await prisma.adminUser.upsert({
    where: { id: 1 },
    update: { password: hashed },
    create: { id: 1, username: 'admin', password: hashed }
  })

  // Hero Profile
  await prisma.heroProfile.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: 'Rohan Kirdak',
      tagline: 'Full Stack MERN Developer',
      bio: 'Full Stack MERN & Next.js Developer passionate about crafting modern, scalable, and responsive web applications with rich user experiences.',
      yearsExp: '1.5+',
      projectsCount: '8+',
      contributionsCount: '200+',
      techCount: '20+',
      resumeUrl: '/resume.pdf'
    }
  })

  // Projects
  const projectCount = await prisma.project.count()
  if (projectCount === 0) {
    for (const proj of initialProjects) {
      await prisma.project.create({ data: proj })
    }
  }

  // Skills
  const skillCount = await prisma.skill.count()
  if (skillCount === 0) {
    for (const skill of initialSkills) {
      await prisma.skill.create({ data: skill })
    }
  }

  // Experience
  const expCount = await prisma.experience.count()
  if (expCount === 0) {
    for (const exp of initialExperience) {
      await prisma.experience.create({ data: exp })
    }
  }

  console.log('Database Seeding Complete!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
