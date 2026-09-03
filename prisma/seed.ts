import { PrismaClient } from '@prisma/client'
import crypto from 'crypto'

const prisma = new PrismaClient()
const SECRET_KEY = process.env.JWT_SECRET || 'rohan-portfolio-secret-2026'

function hashPassword(password: string): string {
  return crypto.pbkdf2Sync(password, SECRET_KEY, 1000, 64, 'sha512').toString('hex')
}

const initialProjects = [
  {
    title: 'HireWave',
    description: 'Full-stack recruitment platform connecting candidates with verified hiring partners, with role-based dashboards for candidates, recruiters, and admins.',
    features: JSON.stringify(['JWT Auth & Role-Based Dashboards', 'AI Job Matching & Application Tracking', 'Stripe Payments & Cloudinary Uploads']),
    technologies: JSON.stringify(['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Tailwind CSS', 'Stripe', 'Cloudinary', 'Socket.IO']),
    image: '/projects/hirewave.png',
    github: 'https://github.com/rohan-kirdak/HireWave',
    live: 'https://hire-wave-gamma.vercel.app',
    featured: true,
    order: 1
  },
  {
    title: 'StartUp Sensei',
    description: 'Interactive AI startup mentorship portal engineered to guide aspiring founders through business strategy, ideation validation, and step-by-step execution.',
    features: JSON.stringify(['Real-time AI Chat (Socket.IO)', 'Automated Startup Roadmap Generator', 'Independent Solo Full-Stack Build']),
    technologies: JSON.stringify(['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.IO', 'OpenAI API', 'Tailwind CSS']),
    image: '/projects/startup-sensei.png',
    github: 'https://github.com/rohan-kirdak/Startup-sensei-main',
    live: 'https://startup-sensei-main.vercel.app',
    featured: true,
    order: 2
  },
  {
    title: 'ShopKart',
    description: 'Feature-rich MERN e-commerce application designed for seamless customer shopping, product discovery, and efficient order fulfillment.',
    features: JSON.stringify(['Razorpay Payment Gateway Integration', 'Persistent Shopping Cart & Inventory Controls', 'Protected Admin Dashboard']),
    technologies: JSON.stringify(['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Razorpay', 'Tailwind CSS']),
    image: '/projects/shopkart.png',
    github: 'https://github.com/rohan-kirdak/Shop-kart',
    live: 'https://shop-kart-eight-flax.vercel.app',
    featured: false,
    order: 3
  },
  {
    title: 'ProjectHub',
    description: 'Academic project marketplace allowing computer science students to browse, purchase, and distribute verified course projects securely.',
    features: JSON.stringify(['Student Academic Project Marketplace', 'Razorpay Payments & File Downloads', 'MySQL-Backed MVC Architecture']),
    technologies: JSON.stringify(['Node.js', 'Express.js', 'EJS', 'MySQL', 'Razorpay', 'Tailwind CSS']),
    image: '/projects/project-rabbit.png',
    github: 'https://github.com/rohan-kirdak/project-rabbit-1',
    live: 'https://project-hub.vercel.app',
    featured: false,
    order: 4
  },
  {
    title: 'MindEase',
    description: 'Comprehensive mental wellness companion providing users with accessible digital tools for emotional tracking, self-care, and daily mindfulness.',
    features: JSON.stringify(['Personalized AI Conversational Support', 'Real-time Mood & Wellness Tracking', 'Interactive Self-Care Toolkits']),
    technologies: JSON.stringify(['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Gemini API', 'Tailwind CSS']),
    image: '/projects/mindease.png',
    github: 'https://github.com/rohan-kirdak/MindEase',
    live: 'https://mindease-ai.vercel.app',
    featured: false,
    order: 5
  }
]

const initialSkills = [
  // Frontend
  { name: 'React.js', category: 'Frontend', level: 'Core', order: 1 },
  { name: 'Next.js', category: 'Frontend', level: 'Core', order: 2 },
  { name: 'JavaScript', category: 'Frontend', level: 'Core', order: 3 },
  { name: 'TypeScript', category: 'Frontend', level: 'Core', order: 4 },
  { name: 'HTML5', category: 'Frontend', level: 'Core', order: 5 },
  { name: 'CSS3', category: 'Frontend', level: 'Core', order: 6 },
  { name: 'Tailwind CSS', category: 'Frontend', level: 'Core', order: 7 },
  { name: 'Framer Motion', category: 'Frontend', level: 'Core', order: 8 },
  { name: 'GSAP', category: 'Frontend', level: 'Core', order: 9 },
  // Backend
  { name: 'Node.js', category: 'Backend', level: 'Core', order: 1 },
  { name: 'Express.js', category: 'Backend', level: 'Core', order: 2 },
  { name: 'REST APIs', category: 'Backend', level: 'Core', order: 3 },
  { name: 'GraphQL', category: 'Backend', level: 'Core', order: 4 },
  { name: 'JWT', category: 'Backend', level: 'Core', order: 5 },
  { name: 'Socket.IO', category: 'Backend', level: 'Core', order: 6 },
  // Database
  { name: 'MongoDB', category: 'Database', level: 'Core', order: 1 },
  { name: 'MySQL', category: 'Database', level: 'Core', order: 2 },
  { name: 'PostgreSQL', category: 'Database', level: 'Core', order: 3 },
  { name: 'Mongoose', category: 'Database', level: 'Core', order: 4 },
  { name: 'Prisma', category: 'Database', level: 'Core', order: 5 },
  // Cloud & DevOps
  { name: 'AWS', category: 'Cloud & DevOps', level: 'Core', order: 1 },
  { name: 'Vercel', category: 'Cloud & DevOps', level: 'Core', order: 2 },
  { name: 'Docker', category: 'Cloud & DevOps', level: 'Core', order: 3 },
  { name: 'GitHub Actions', category: 'Cloud & DevOps', level: 'Core', order: 4 },
  // AI & APIs
  { name: 'Gemini API', category: 'AI & APIs', level: 'Core', order: 1 },
  { name: 'OpenAI API', category: 'AI & APIs', level: 'Core', order: 2 },
  // Tools & CS
  { name: 'Git', category: 'Tools & CS', level: 'Core', order: 1 },
  { name: 'GitHub', category: 'Tools & CS', level: 'Core', order: 2 },
  { name: 'Postman', category: 'Tools & CS', level: 'Core', order: 3 },
  { name: 'DSA', category: 'Tools & CS', level: 'Core', order: 4 },
  { name: 'OOP', category: 'Tools & CS', level: 'Core', order: 5 },
  { name: 'Database Design', category: 'Tools & CS', level: 'Core', order: 6 },
  { name: 'System Design', category: 'Tools & CS', level: 'Core', order: 7 }
]

const initialExperience = [
  {
    type: 'Internship',
    company: 'ScaleFull Technologies',
    position: 'Intern Software Engineer',
    duration: 'Jan 2026 – Present',
    description: 'Collaborating with the core development team to build, optimize, and maintain production-ready web products and scalable backend services.',
    icon: '💻',
    order: 1
  },
  {
    type: 'Training',
    company: 'Wisdom Sprouts | Java By Kiran | Cyber Success',
    position: 'Trainee',
    duration: '2026 – Present',
    description: 'Advanced technical training in Full Stack Development, Java, Aptitude, and Interview Placement Preparation.',
    icon: '💼',
    order: 2
  },
  {
    type: 'Experience',
    company: 'Kanak Digifex NextGen Pvt. Ltd.',
    position: 'Junior Web Developer',
    duration: 'Feb 2025 – Mar 2025',
    description: 'Built server-side rendered applications using Node.js, Express.js, EJS, and MySQL. Developed backend controllers and database queries.',
    icon: '⚡',
    order: 3
  },
  {
    type: 'Internship',
    company: 'Cloud Infotech',
    position: 'Web Development Intern',
    duration: 'Jan 2025 – Feb 2025',
    description: 'Developed responsive React.js interfaces and integrated REST APIs into MERN stack applications.',
    icon: '🚀',
    order: 4
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
    update: {
      tagline: 'Full Stack MERN & Next.js Developer',
      bio: 'Building scalable, responsive and AI-powered web applications with modern technologies.'
    },
    create: {
      id: 1,
      name: 'Rohan Kirdak',
      tagline: 'Full Stack MERN & Next.js Developer',
      bio: 'Building scalable, responsive and AI-powered web applications with modern technologies.',
      yearsExp: '1.5+',
      projectsCount: '8+',
      contributionsCount: '200+',
      techCount: '20+',
      resumeUrl: '/resume.pdf'
    }
  })

  // Clear & Re-seed Projects, Skills, Experience
  await prisma.project.deleteMany({})
  for (const proj of initialProjects) {
    await prisma.project.create({ data: proj })
  }

  await prisma.skill.deleteMany({})
  for (const skill of initialSkills) {
    await prisma.skill.create({ data: skill })
  }

  await prisma.experience.deleteMany({})
  for (const exp of initialExperience) {
    await prisma.experience.create({ data: exp })
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
