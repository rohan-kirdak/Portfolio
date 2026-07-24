'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import NextImage from 'next/image'
import { fadeInUp, staggerContainer } from '@/animations/variants'
import { projects as staticProjects, skills as staticSkills } from '@/data/portfolio'
import { Github, ExternalLink, Code, Database, Server, Smartphone, Cpu, Shield } from 'lucide-react'

// Map categories to modern Lucide icons
const categoryIcons: Record<string, React.ReactNode> = {
  Frontend: <Smartphone className="w-5 h-5 text-cyan-400" />,
  Backend: <Server className="w-5 h-5 text-purple-400" />,
  Database: <Database className="w-5 h-5 text-pink-400" />,
  Tools: <Code className="w-5 h-5 text-indigo-400" />,
  Deployment: <Shield className="w-5 h-5 text-emerald-400" />,
  'AI Tools': <Cpu className="w-5 h-5 text-violet-400" />,
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
            Skills & <span className="text-gradient-neon">Expertise</span>
          </h2>
          <p className="text-slate-400 font-light max-w-md mx-auto mt-4 text-xs md:text-sm font-outfit">
            A showcase of my technical arsenal across different layers of modern full-stack web engineering.
          </p>
          <div className="w-16 h-[2px] bg-cyan-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Categories Tab Selector bar */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 p-2 bg-slate-950/45 border border-white/5 rounded-3xl max-w-4xl mx-auto backdrop-blur-md">
          {categories.map((category) => {
            const active = activeCategory === category
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-3 rounded-2xl text-xs md:text-sm font-bold font-syne uppercase tracking-wider transition-all duration-300 flex items-center gap-2.5 cursor-pointer relative ${
                  active 
                    ? 'text-cyan-400 shadow-inner' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* Active animated bubble background */}
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

        {/* Grid of Skill Cards (stagger animated) */}
        <motion.div
          key={activeCategory}
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
        >
          {(skillsData[activeCategory] || []).map((skill, idx) => {
            const levels = ['Expert', 'Production-Ready', 'Advanced', 'Specialist']
            const level = levels[idx % levels.length]
            
            const glows: Record<string, string> = {
              'React.js': 'rgba(0, 212, 255, 0.15)',
              'Next.js': 'rgba(255, 255, 255, 0.1)',
              'Tailwind CSS': 'rgba(56, 189, 248, 0.15)',
              'TypeScript': 'rgba(49, 120, 198, 0.15)',
              'JavaScript': 'rgba(247, 223, 30, 0.1)',
              'Node.js': 'rgba(16, 185, 129, 0.15)',
              'MongoDB': 'rgba(16, 185, 129, 0.15)',
              'PostgreSQL': 'rgba(51, 102, 153, 0.15)',
              'Prisma ORM': 'rgba(99, 102, 241, 0.15)',
              'OpenAI': 'rgba(16, 163, 127, 0.15)',
              'Docker': 'rgba(36, 150, 237, 0.15)',
            }
            
            const glowColor = glows[skill] || 'rgba(124, 58, 237, 0.15)'

            return (
              <motion.div
                key={skill}
                variants={fadeInUp}
                whileHover={{ y: -5, borderColor: 'rgba(0, 212, 255, 0.25)' }}
                style={{ 
                  boxShadow: `0 8px 32px 0 rgba(0, 0, 0, 0.37), 0 0 20px ${glowColor}`
                }}
                className="glass-card border-white/10 rounded-2xl p-6 flex flex-col justify-between items-start text-left relative overflow-hidden group shadow-lg"
              >
                <div 
                  className="absolute -right-10 -top-10 w-24 h-24 rounded-full blur-2xl opacity-40 transition-all duration-500 group-hover:scale-150"
                  style={{ backgroundColor: glowColor }}
                />

                <div className="space-y-4 w-full relative z-10">
                  <div className="flex justify-between items-start w-full">
                    <div className="text-2xl select-none filter drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                      {skill === 'React.js' ? '⚛️' : 
                       skill === 'Next.js' ? '🚀' : 
                       skill === 'TypeScript' ? '📘' : 
                       skill === 'Node.js' ? '🟢' : 
                       skill === 'MongoDB' ? '🍃' : 
                       skill === 'Docker' ? '🐳' : 
                       skill === 'PostgreSQL' ? '🐘' : '⚡'}
                    </div>
                    <span className="px-2.5 py-0.5 text-[9px] font-bold font-outfit tracking-wider uppercase bg-white/5 border border-white/10 rounded-full text-slate-400">
                      {level}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold font-syne text-white tracking-wide group-hover:text-cyan-300 transition-colors">
                      {skill}
                    </h4>
                  </div>
                </div>

                <div className="w-full h-[2px] bg-white/5 rounded-full overflow-hidden mt-6 relative z-10">
                  <motion.div
                    initial={{ x: '-100%' }}
                    whileInView={{ x: '0%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: idx * 0.05 }}
                    className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_8px_rgba(0,212,255,0.4)]"
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function DefaultAbstractVisual({ id }: { id: number }) {
  return (
    <div className="w-full h-full flex items-center justify-center p-4 bg-slate-950">
      {id === 1 && (
        <div className="w-[85%] h-[80%] glass-card border-white/10 rounded-xl p-4 flex flex-col justify-between shadow-lg relative z-10 gap-2 text-left">
          <div className="flex justify-between items-center text-[10px] text-slate-500 font-mono">
            <span className="text-cyan-400 font-semibold">🤖 StartUp Sensei AI</span>
            <span className="text-green-400 animate-pulse">● LIVE</span>
          </div>
          <div className="space-y-2 flex-1">
            <div className="flex gap-2 items-end">
              <div className="w-5 h-5 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex-shrink-0" />
              <div className="bg-slate-800/80 rounded-lg rounded-bl-none px-3 py-1.5 text-[9px] text-slate-300 max-w-[75%]">How do I validate my startup idea?</div>
            </div>
            <div className="flex gap-2 items-end justify-end">
              <div className="bg-gradient-to-r from-cyan-600/30 to-purple-600/30 border border-cyan-400/20 rounded-lg rounded-br-none px-3 py-1.5 text-[9px] text-slate-200 max-w-[80%]">Start with problem discovery & build an MVP...</div>
              <div className="w-5 h-5 rounded-full bg-purple-400/20 border border-purple-400/30 flex-shrink-0" />
            </div>
          </div>
          <div className="flex gap-2 items-center border-t border-white/5 pt-2">
            <div className="flex-1 h-5 bg-slate-800/60 rounded-full border border-white/5" />
            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center text-[8px]">↑</div>
          </div>
        </div>
      )}

      {id === 2 && (
        <div className="w-[85%] h-[80%] glass-card border-white/10 rounded-xl p-4 flex flex-col gap-3 shadow-lg relative z-10 text-left">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-white font-syne">🌊 HireWave Dashboard</span>
            <span className="text-[8px] text-cyan-400 bg-cyan-400/10 px-2 py-0.5 rounded-full">Recruiter</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[['Applications', '128', 'text-cyan-400'], ['Shortlisted', '24', 'text-green-400'], ['Positions Open', '6', 'text-purple-400'], ['Hired', '11', 'text-pink-400']].map(([label, val, color]) => (
              <div key={label} className="bg-slate-900/60 rounded-lg p-2 border border-white/5">
                <p className={`text-sm font-extrabold font-syne ${color}`}>{val}</p>
                <p className="text-[8px] text-slate-500 font-outfit">{label}</p>
              </div>
            ))}
          </div>
          <div className="space-y-1 flex-1">
            {['Senior React Dev', 'Backend Engineer'].map((role) => (
              <div key={role} className="flex justify-between items-center text-[9px] px-2 py-1 bg-slate-900/40 rounded-md border border-white/5">
                <span className="text-slate-300 font-outfit">{role}</span>
                <span className="text-cyan-400 font-semibold">Active</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {id === 3 && (
        <div className="w-[85%] h-[80%] flex flex-col gap-2 relative z-10 text-left">
          <div className="text-[10px] font-bold text-white font-syne flex items-center gap-1.5 mb-1">
            <span>🛒</span> ShopKart
          </div>
          {[['Premium Wireless Headset', '₹2,499', 'In Stock'], ['Mechanical Keyboard RGB', '₹4,299', 'Limited']].map(([name, price, stock]) => (
            <div key={name} className="p-2.5 glass-card border-white/10 rounded-xl flex justify-between items-center shadow-md">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-400/20 border border-white/10 flex items-center justify-center text-sm">🎧</div>
                <div>
                  <p className="text-[9px] font-bold text-white font-syne leading-tight">{name}</p>
                  <p className="text-[8px] text-green-400 font-outfit">{stock}</p>
                </div>
              </div>
              <span className="text-[10px] font-extrabold text-cyan-400 font-syne">{price}</span>
            </div>
          ))}
        </div>
      )}

      {id === 4 && (
        <div className="w-[85%] h-[80%] glass-card border-white/10 rounded-xl p-4 flex flex-col gap-3 shadow-lg relative z-10 text-left">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-bold text-white font-syne">🐇 Project Rabbit</span>
            <span className="text-[8px] text-purple-400 bg-purple-400/10 px-2 py-0.5 rounded-full">Student Platform</span>
          </div>
          <div className="space-y-2 flex-1">
            {[['Physics Lab Simulator', 'CSE • 4th Year', '⭐ 4.9'], ['DSA Visualizer Pro', 'IT • 3rd Year', '⭐ 4.7']].map(([title, dept, rating]) => (
              <div key={title} className="flex items-center gap-2 p-2 bg-slate-900/50 rounded-lg border border-white/5">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-purple-500/20 to-pink-400/10 border border-white/10 flex items-center justify-center text-sm flex-shrink-0">📁</div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold text-white font-syne truncate">{title}</p>
                  <p className="text-[8px] text-slate-500 font-outfit">{dept}</p>
                </div>
                <span className="text-[8px] text-yellow-400 font-semibold flex-shrink-0">{rating}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between border-t border-white/5 pt-2">
            <span className="text-[8px] text-slate-500 font-outfit">120+ projects uploaded</span>
            <span className="text-[8px] text-cyan-400 font-bold">Browse →</span>
          </div>
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project }: { project: any }) {
  const [imgError, setImgError] = useState(false)
  const techList = project.technologies || project.tech || []

  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -6, borderColor: 'rgba(0,212,255,0.2)' }}
      className="glass-card border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group text-left"
    >
      <div className="w-full h-56 bg-slate-950 relative overflow-hidden flex items-center justify-center border-b border-white/5">
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/10 via-purple-900/10 to-transparent opacity-40 group-hover:scale-110 transition-transform duration-700 z-0" />

        <div className="w-full h-full relative z-10">
          {!imgError && project.image ? (
            <NextImage
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <DefaultAbstractVisual id={project.id} />
          )}
        </div>
      </div>

      <div className="p-6 md:p-8 space-y-4">
        <h3 className="text-xl font-bold font-syne text-white group-hover:text-cyan-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-slate-400 font-light leading-relaxed font-outfit">
          {project.description}
        </p>

        <div className="flex gap-2 flex-wrap pt-2">
          {techList.map((tech: string) => (
            <span
              key={tech}
              className="px-3 py-1 bg-white/5 border border-white/10 hover:border-cyan-400/30 text-xs font-semibold text-slate-300 rounded-full font-outfit transition-colors cursor-pointer"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex gap-4 pt-4">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs font-bold font-syne uppercase text-slate-300 hover:text-white rounded-xl text-center flex items-center justify-center gap-2 transition-all cursor-pointer decoration-none"
            >
              <Github className="w-4 h-4" />
              Source Code
            </a>
          ) : null}

          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              className="flex-1 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-xs font-bold font-syne uppercase text-[#030014] rounded-xl text-center flex items-center justify-center gap-2 hover:shadow-[0_0_15px_rgba(0,212,255,0.4)] transition-all cursor-pointer font-bold decoration-none"
            >
              Live Link ↗
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

  return (
    <section id="projects" className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#030014]">
      <div className="glow-orb w-[300px] h-[300px] bg-purple-600/10 bottom-1/4 right-0" />

      <div className="max-w-6xl mx-auto relative z-10">
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

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8"
        >
          {projectsList.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}
