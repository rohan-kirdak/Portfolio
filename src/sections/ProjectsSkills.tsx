'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import { fadeInUp } from '@/animations/variants'
import { projects as staticProjects, skills as staticSkills } from '@/data/portfolio'
import { Github, ExternalLink, Code, Database, Server, Smartphone, Cpu, Shield, CheckCircle2 } from 'lucide-react'

// Category icon map
const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Smartphone className="w-5 h-5 text-cyan-400" />,
  Backend: <Server className="w-5 h-5 text-purple-400" />,
  Database: <Database className="w-5 h-5 text-pink-400" />,
  'Cloud & DevOps': <Shield className="w-5 h-5 text-emerald-400" />,
  'AI & APIs': <Cpu className="w-5 h-5 text-violet-400" />,
  'Tools & CS': <Code className="w-5 h-5 text-indigo-400" />,
}

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('Frontend')
  const [skillsData, setSkillsData] = useState<Record<string, string[]>>(staticSkills)

  useEffect(() => {
    fetch('/api/skills', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.grouped && Object.keys(data.grouped).length > 0) {
          setSkillsData(data.grouped)
        }
      })
      .catch(() => {})
  }, [])

  const categories = Object.keys(skillsData)

  return (
    <section id="skills" className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#030014]">
      {/* Background glow orbs */}
      <div className="glow-orb w-[300px] h-[300px] bg-cyan-500/10 top-1/3 left-0 animate-float" />
      <div className="glow-orb w-[300px] h-[300px] bg-purple-600/10 bottom-1/3 right-0 animate-float-delayed" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-syne text-white tracking-wide">
            Technical <span className="text-gradient-neon">Skills</span>
          </h2>
          <p className="text-slate-400 font-light max-w-md mx-auto mt-4 text-xs md:text-sm font-outfit">
            Technologies and core CS domains I work with to build modern full-stack products.
          </p>
          <div className="w-16 h-[2px] bg-cyan-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Categories Tab Selector bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-slate-950/45 border border-white/5 rounded-3xl max-w-5xl mx-auto backdrop-blur-md">
          {categories.map((category) => {
            const active = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-3 rounded-2xl text-xs md:text-sm font-bold font-syne uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer relative ${
                  active 
                    ? 'text-cyan-400 shadow-inner' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="activeSkillTab"
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-400/30 rounded-2xl z-0"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">
                  {categoryIcons[category] || <Code className="w-4 h-4" />}
                </span>
                <span className="relative z-10">{category}</span>
              </button>
            )
          })}
        </div>

        {/* Grid of Clean Skill Cards */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {(skillsData[activeCategory] || []).map((skill) => {
            const glows: Record<string, string> = {
              'React.js': 'rgba(0, 212, 255, 0.15)',
              'Next.js': 'rgba(255, 255, 255, 0.1)',
              'Tailwind CSS': 'rgba(56, 189, 248, 0.15)',
              'TypeScript': 'rgba(49, 120, 198, 0.15)',
              'JavaScript': 'rgba(247, 223, 30, 0.1)',
              'Node.js': 'rgba(16, 185, 129, 0.15)',
              'MongoDB': 'rgba(16, 185, 129, 0.15)',
              'PostgreSQL': 'rgba(51, 102, 153, 0.15)',
              'Prisma': 'rgba(99, 102, 241, 0.15)',
              'OpenAI API': 'rgba(16, 163, 127, 0.15)',
              'Gemini API': 'rgba(168, 85, 247, 0.15)',
              'Docker': 'rgba(36, 150, 237, 0.15)',
              'AWS': 'rgba(249, 115, 22, 0.15)'
            }
            
            const glowColor = glows[skill] || 'rgba(124, 58, 237, 0.15)'

            return (
              <motion.div
                key={skill}
                whileHover={{ y: -4, borderColor: 'rgba(0, 212, 255, 0.3)' }}
                style={{ 
                  boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 15px ${glowColor}`
                }}
                className="glass-card border-white/10 rounded-2xl p-5 flex items-center gap-4 text-left relative overflow-hidden group shadow-lg"
              >
                <div 
                  className="absolute -right-8 -top-8 w-20 h-20 rounded-full blur-2xl opacity-30 transition-all duration-500 group-hover:scale-150"
                  style={{ backgroundColor: glowColor }}
                />

                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-lg flex-shrink-0 group-hover:border-cyan-400/40 transition-colors">
                  {skill.includes('React') ? '⚛️' : 
                   skill.includes('Next') ? '🚀' : 
                   skill.includes('TypeScript') ? '📘' : 
                   skill.includes('Node') ? '🟢' : 
                   skill.includes('Mongo') ? '🍃' : 
                   skill.includes('Docker') ? '🐳' : 
                   skill.includes('Postgre') ? '🐘' : 
                   skill.includes('AWS') ? '☁️' : 
                   skill.includes('Git') ? '🐙' : 
                   skill.includes('AI') || skill.includes('OpenAI') || skill.includes('Gemini') ? '🤖' : '⚡'}
                </div>

                <div className="relative z-10 min-w-0">
                  <h4 className="text-sm font-bold font-syne text-white tracking-wide group-hover:text-cyan-300 transition-colors truncate">
                    {skill}
                  </h4>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function DefaultAbstractVisual({ title, number }: { title: string; number?: string }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-slate-950 relative">
      <div className="absolute top-3 left-4 text-3xl font-extrabold font-syne text-white/10 select-none">
        {number || 'PROJ'}
      </div>
      <div className="w-[85%] h-[80%] glass-card border-white/10 rounded-xl p-4 flex flex-col justify-between shadow-lg relative z-10 text-left">
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
          <span className="text-cyan-400 font-semibold">{title}</span>
          <span className="text-green-400 animate-pulse">● LIVE APP</span>
        </div>
        <div className="space-y-2 my-auto">
          <div className="h-2 w-3/4 bg-cyan-400/20 rounded-full" />
          <div className="h-2 w-1/2 bg-purple-400/20 rounded-full" />
          <div className="h-2 w-2/3 bg-pink-400/20 rounded-full" />
        </div>
        <div className="flex justify-between items-center text-[9px] text-slate-500 font-outfit border-t border-white/5 pt-2">
          <span>Full Stack Application</span>
          <span className="text-cyan-400">View Demo →</span>
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [imgError, setImgError] = useState(false)

  // Safe parsing helper for tech & features
  const parseList = (data: any): string[] => {
    if (Array.isArray(data)) return data
    if (typeof data === 'string') {
      try {
        const parsed = JSON.parse(data)
        if (Array.isArray(parsed)) return parsed
      } catch {
        return data.split(',').map((s) => s.trim()).filter(Boolean)
      }
    }
    return []
  }

  const techList = parseList(project.technologies || project.tech)
  const featuresList = parseList(project.features)

  const numVal = project.number || (index + 1 < 10 ? `0${index + 1}` : `${index + 1}`)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileHover={{ y: -6, borderColor: 'rgba(0,212,255,0.25)' }}
      className="glass-card border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group text-left h-full"
    >
      <div>
        <div className="w-full h-56 bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 via-purple-900/10 to-transparent opacity-40 group-hover:scale-110 transition-transform duration-700 z-0" />

          <div className="w-full h-full relative z-10">
            {!imgError && project.image && project.image !== '/projects/default.png' ? (
              <NextImage
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                onError={() => setImgError(true)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <DefaultAbstractVisual title={project.title} number={numVal} />
            )}
          </div>
        </div>

        <div className="p-6 md:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold font-syne text-cyan-400 tracking-wider">
              PROJECT {numVal}
            </span>
            {project.subtitle && (
              <span className="px-2.5 py-0.5 text-[10px] font-bold font-outfit text-purple-300 bg-purple-500/10 border border-purple-500/30 rounded-full">
                {project.subtitle}
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold font-syne text-white group-hover:text-cyan-300 transition-colors">
            {project.title}
          </h3>

          <p className="text-sm text-slate-300 font-light leading-relaxed font-outfit">
            {project.description}
          </p>

          {/* Key Features */}
          {featuresList.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/5">
              {featuresList.slice(0, 3).map((feature: string, idx: number) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 font-outfit">
                  <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}

          {/* Tech Stack Pills */}
          <div className="flex gap-2 flex-wrap pt-2">
            {techList.map((tech: string) => (
              <span
                key={tech}
                className="px-3 py-1 bg-white/5 border border-white/10 hover:border-cyan-400/30 text-xs font-semibold text-slate-300 rounded-full font-outfit transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Buttons Footer */}
      <div className="p-6 md:p-8 pt-0 flex gap-4">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-cyan-400/40 text-xs font-bold font-syne uppercase text-slate-200 hover:text-white rounded-xl text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Github className="w-4 h-4 text-cyan-400" />
            GitHub
          </a>
        ) : null}

        {project.live ? (
          <a
            href={project.live}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-xs font-bold font-syne uppercase text-[#030014] rounded-xl text-center flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(0,212,255,0.4)] transition-all cursor-pointer shadow-md"
          >
            Live Demo ↗
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        ) : (
          <button
            disabled
            className="flex-1 py-3 bg-slate-900 border border-white/5 text-xs font-bold font-syne uppercase text-slate-600 rounded-xl text-center flex items-center justify-center gap-2 cursor-not-allowed"
          >
            Offline
          </button>
        )}
      </div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const [projectsList, setProjectsList] = useState<any[]>(staticProjects)

  useEffect(() => {
    fetch('/api/projects', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjectsList(data)
        }
      })
      .catch(() => {})
  }, [])

  const featuredProjects = projectsList.filter((p) => p.featured)
  const otherProjects = projectsList.filter((p) => !p.featured)

  // Fallback if none are marked featured or all marked featured
  const displayFeatured = featuredProjects.length > 0 ? featuredProjects : projectsList.slice(0, 2)
  const displayOther = featuredProjects.length > 0 ? otherProjects : projectsList.slice(2)

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#030014]">
      <div className="glow-orb w-[300px] h-[300px] bg-purple-600/10 bottom-1/4 right-0" />

      <div className="max-w-6xl mx-auto relative z-10 space-y-20">
        {/* Featured Projects Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-extrabold font-syne text-white tracking-wide">
              Featured <span className="text-gradient-neon">Projects</span>
            </h2>
            <div className="w-16 h-[2px] bg-purple-500 mx-auto mt-4 rounded-full" />
          </motion.div>

          <div key={`featured-${projectsList.length}`} className="grid md:grid-cols-2 gap-8">
            {displayFeatured.map((project, idx) => (
              <ProjectCard key={project.id || idx} project={project} index={idx} />
            ))}
          </div>
        </div>

        {/* Other Projects Section */}
        {displayOther.length > 0 && (
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-extrabold font-syne text-white tracking-wide">
                Other <span className="text-gradient-neon">Projects</span>
              </h2>
              <div className="w-12 h-[2px] bg-cyan-400 mx-auto mt-3 rounded-full" />
            </motion.div>

            <div key={`other-${projectsList.length}`} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayOther.map((project, idx) => (
                <ProjectCard key={project.id || idx} project={project} index={displayFeatured.length + idx} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
