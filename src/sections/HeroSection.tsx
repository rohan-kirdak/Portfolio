'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Sparkles, Download, Github, Code2, Rocket, MapPin, Linkedin, Mail } from 'lucide-react'
import NextImage from 'next/image'
import { profileInfo } from '@/data/portfolio'

export default function HeroSection() {
  const [profile, setProfile] = useState({
    name: profileInfo.name,
    title: profileInfo.title,
    badge: profileInfo.badge,
    bio: profileInfo.bio,
    github: profileInfo.github,
    linkedin: profileInfo.linkedin,
    email: profileInfo.email,
    resumeUrl: profileInfo.resumeUrl,
  })

  // 3D Parallax Mouse Tracking state
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    // Calculate tilt angles (max angle +/- 15 deg)
    const rotX = (y / (rect.height / 2)) * -14
    const rotY = (x / (rect.width / 2)) * 14
    
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100

    setRotateX(rotX)
    setRotateY(rotY)
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  useEffect(() => {
    fetch('/api/profile', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          setProfile((prev) => ({
            ...prev,
            name: data.name || prev.name,
            title: profileInfo.title,
            bio: data.bio || prev.bio,
            resumeUrl: data.resumeUrl || prev.resumeUrl,
          }))
        }
      })
      .catch(() => {})
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 px-6 md:px-12 overflow-hidden bg-[#030014]">
      {/* Background Ambient Orbs */}
      <div className="glow-orb w-[450px] h-[450px] bg-purple-600/30 top-1/4 left-5 pointer-events-none" />
      <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/25 bottom-1/4 right-5 pointer-events-none animate-float-delayed" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none z-[1]" />

      <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* LEFT COLUMN */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          {/* Top Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/80 border border-cyan-400/30 hover:border-cyan-400/60 transition-all backdrop-blur-md shadow-lg shadow-cyan-500/10"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide text-slate-200 font-outfit">
              {profile.badge}
            </span>
          </motion.div>

          {/* Main Title & Headline */}
          <div className="space-y-2">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-syne tracking-tight text-white leading-[1.1]"
            >
              Hi, I&apos;m <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent filter drop-shadow-[0_0_25px_rgba(0,212,255,0.4)]">
                {profile.name}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-3xl font-bold font-syne text-slate-200 tracking-wide pt-1"
            >
              {profile.title}
            </motion.h2>
          </div>

          {/* Bio Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-400 font-light max-w-xl leading-relaxed text-sm md:text-base font-outfit"
          >
            {profile.bio}
          </motion.p>

          {/* 3 Highlight Pills Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="flex flex-wrap gap-3 pt-1"
          >
            <div className="px-4 py-2 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-cyan-400/40 transition-all flex items-center gap-2.5 backdrop-blur-md">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-semibold text-slate-300 font-outfit">Full Stack Development</span>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-purple-400/40 transition-all flex items-center gap-2.5 backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-slate-300 font-outfit">AI-Powered Applications</span>
            </div>

            <div className="px-4 py-2 rounded-2xl bg-slate-900/70 border border-white/10 hover:border-pink-400/40 transition-all flex items-center gap-2.5 backdrop-blur-md">
              <Rocket className="w-4 h-4 text-purple-400" />
              <span className="text-xs font-semibold text-slate-300 font-outfit">Scalable Systems</span>
            </div>
          </motion.div>

          {/* Action Buttons Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-3 w-full sm:w-auto items-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-3.5 rounded-full font-bold font-syne text-sm text-white bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-400/25"
            >
              View Projects
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, borderColor: 'rgba(0, 212, 255, 0.4)', backgroundColor: 'rgba(255,255,255,0.08)' }}
              whileTap={{ scale: 0.95 }}
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="px-7 py-3.5 rounded-full font-bold font-syne text-sm text-white bg-slate-900/90 border border-white/15 transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md"
            >
              <Github className="w-4 h-4 text-cyan-400" />
              GitHub
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.3)', backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download="Rohan_Kirdak_Resume.pdf"
              className="px-6 py-3.5 rounded-full font-semibold font-outfit text-xs text-slate-300 hover:text-white bg-slate-900/80 border border-white/10 transition-all cursor-pointer flex items-center gap-2 backdrop-blur-md"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Resume
            </motion.a>
          </motion.div>

          {/* Location & Social Icons Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.6 }}
            className="flex items-center gap-4 pt-4 border-t border-white/5 w-full"
          >
            <div className="flex items-center gap-2 text-xs font-medium text-slate-400 font-outfit">
              <MapPin className="w-4 h-4 text-purple-400" />
              <span>Pune, Maharashtra, India</span>
            </div>

            <span className="text-slate-700">|</span>

            <div className="flex items-center gap-3">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 flex items-center justify-center text-cyan-400 hover:bg-cyan-400/10 transition-all"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 flex items-center justify-center text-cyan-400 hover:bg-cyan-400/10 transition-all"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="w-8 h-8 rounded-full bg-slate-900 border border-white/10 hover:border-cyan-400 flex items-center justify-center text-cyan-400 hover:bg-cyan-400/10 transition-all"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </motion.div>

        {/* RIGHT COLUMN - 3D INTERACTIVE PARALLAX POSTER */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-5 relative flex justify-center items-center py-6"
          style={{ perspective: 1200 }}
        >
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ rotateX, rotateY }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            style={{ transformStyle: 'preserve-3d' }}
            className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] flex items-center justify-center cursor-pointer select-none group"
          >
            {/* 3D Dynamic Lighting Glare Overlay */}
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none z-40"
              style={{
                background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 60%)`,
              }}
            />

            {/* Layer 0: Deepest Background Glow Orb */}
            <div
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 via-purple-600/30 to-pink-500/30 blur-3xl opacity-80 pointer-events-none"
              style={{ transform: 'translateZ(-20px)' }}
            />

            {/* Layer 1: Outer Circular Neon Ring with Dotted Orbit */}
            <div
              className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/30 animate-spin-slow"
              style={{ transform: 'translateZ(10px)' }}
            />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              style={{ transform: 'translateZ(15px)' }}
              className="absolute inset-2 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_65px_rgba(0,212,255,0.45)]"
            >
              <div className="w-full h-full bg-[#030014] rounded-full" />
            </motion.div>

            {/* Layer 2: Circular 3D Main Avatar Portal Card */}
            <div
              style={{ transform: 'translateZ(30px)' }}
              className="relative w-[92%] h-[92%] rounded-full overflow-hidden bg-gradient-to-b from-purple-900/50 via-purple-950/90 to-[#030014] border border-white/20 flex items-end justify-center shadow-2xl shadow-cyan-500/20 group-hover:shadow-[0_0_60px_rgba(0,212,255,0.4)] transition-shadow duration-500"
            >
              {/* Radial Backlight */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/40 to-purple-600/50 blur-2xl pointer-events-none" />

              {/* Dotted Pattern */}
              <div className="absolute inset-0 grid-bg opacity-35 pointer-events-none" />

              {/* Rohan Character Avatar Image */}
              <div className="relative w-full h-full flex items-end justify-center">
                <NextImage
                  src="/rohan-hero.png"
                  alt="Rohan Kirdak"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.85)] scale-105 group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Bottom Gradient Fade */}
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030014] via-[#030014]/70 to-transparent z-10" />
            </div>

            {/* Layer 3: Floating 3D Depth Badges */}

            {/* 3D BADGE 1: React & Next.js (Top Left - Depth +55px) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(55px)' }}
              className="absolute top-4 -left-4 sm:left-0 z-30 px-4 py-2 rounded-full bg-slate-900/95 border border-cyan-400/50 shadow-2xl shadow-cyan-500/25 flex items-center gap-2 backdrop-blur-md group-hover:border-cyan-300 transition-colors"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center text-xs">⚛️</div>
              <span className="text-xs font-bold text-white font-outfit tracking-wide">React & Next.js</span>
            </motion.div>

            {/* 3D BADGE 2: Next.js (Top Right - Depth +65px) */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(65px)' }}
              className="absolute top-12 -right-4 sm:right-2 z-30 px-4 py-2 rounded-full bg-slate-900/95 border border-purple-400/50 shadow-2xl shadow-purple-500/25 flex items-center gap-2 backdrop-blur-md group-hover:border-purple-300 transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-extrabold text-white">N</span>
              <span className="text-xs font-bold text-white font-outfit tracking-wide">Next.js</span>
            </motion.div>

            {/* 3D BADGE 3: Node.js (Mid Left - Depth +60px) */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(60px)' }}
              className="absolute bottom-28 -left-6 sm:-left-2 z-30 px-4 py-2 rounded-full bg-slate-900/95 border border-emerald-400/50 shadow-2xl shadow-emerald-500/25 flex items-center gap-2 backdrop-blur-md group-hover:border-emerald-300 transition-colors"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">JS</span>
              <span className="text-xs font-bold text-white font-outfit tracking-wide">Node.js</span>
            </motion.div>

            {/* 3D BADGE 4: AI & Gemini (Mid Right - Depth +70px) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(70px)' }}
              className="absolute bottom-32 -right-6 sm:-right-2 z-30 px-4 py-2 rounded-full bg-slate-900/95 border border-pink-400/50 shadow-2xl shadow-pink-500/25 flex items-center gap-2 backdrop-blur-md group-hover:border-pink-300 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-bold text-white font-outfit tracking-wide">AI & Gemini</span>
            </motion.div>

            {/* 3D BADGE 5: ScaleFull Tech Card (Bottom Right Overlay - Depth +80px) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transform: 'translateZ(80px)' }}
              className="absolute -bottom-2 right-4 sm:right-8 z-30 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-cyan-400/50 shadow-2xl shadow-black/90 flex items-center gap-3 backdrop-blur-md group-hover:border-cyan-300 transition-colors"
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-cyan-400/25 to-purple-500/25 border border-cyan-400/40 flex items-center justify-center text-sm">
                💻
              </div>
              <div className="text-left">
                <p className="text-[9px] text-slate-400 font-outfit uppercase font-semibold tracking-wider">INTERNSHIP</p>
                <p className="text-xs font-bold text-white font-syne">ScaleFull Technologies</p>
              </div>
            </motion.div>

          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}
