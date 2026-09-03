import Layout from '@/components/Layout'
import HeroSection from '@/sections/HeroSection'
import { ProjectsSection, SkillsSection } from '@/sections/ProjectsSkills'
import {
  AboutSection,
  ExperienceSection,
  EducationSection,
  LeadershipSection,
  ContactSection,
} from '@/sections/ContactAbout'

export const metadata = {
  title: 'Rohan Kirdak - Full Stack MERN & Next.js Developer',
  description: 'Portfolio of Rohan Kirdak, a Full Stack MERN & Next.js Developer building scalable, responsive, and AI-powered web applications.',
  keywords: 'Full Stack Developer, MERN, Next.js, React, Node.js, AI Applications, Portfolio, Rohan Kirdak',
  openGraph: {
    title: 'Rohan Kirdak - Full Stack MERN & Next.js Developer',
    description: 'Building scalable, responsive and AI-powered web applications with modern technologies.',
    type: 'website',
    url: 'https://rohan-portfolio.vercel.app',
  },
}

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ExperienceSection />
      <ProjectsSection />
      <LeadershipSection />
      <EducationSection />
      <ContactSection />
    </Layout>
  )
}
