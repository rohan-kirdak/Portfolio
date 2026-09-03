'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Sparkles, Download, Github } from 'lucide-react'
import NextImage from 'next/image'
import { profileInfo } from '@/data/portfolio'

export default function HeroSection() {
  const [profile, setProfile] = useState({
    name: profileInfo.name,
    title: profileInfo.title,
    badge: profileInfo.badge,
    bio: profileInfo.bio,
    github: profileInfo.github,
    resumeUrl: profileInfo.resumeUrl,
  })

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
    <section className="min-h-screen flex items-center justify-center relative py-24 px-6 md:px-12 overflow-hidden bg-[#030014]">
      {/* Background Orbs */}
      <div className="glow-orb w-[350px] h-[350px] bg-purple-600/35 top-1/4 left-10 md:left-20" />
      <div className="glow-orb w-[350px] h-[350px] bg-cyan-500/25 bottom-1/4 right-10 md:right-20 animate-float-delayed" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-[1]" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Hero Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-6"
        >
          {/* Company Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all backdrop-blur-md shadow-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-bold tracking-wide text-cyan-300 font-outfit">
              {profile.badge}
            </span>
          </motion.div>

          {/* Name & Main Title */}
          <div className="space-y-3">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-syne tracking-tight text-white leading-tight"
            >
              Hi, I&apos;m <br />
              <span className="text-gradient-neon filter drop-shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                {profile.name}
              </span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-3xl font-bold font-syne text-slate-200 tracking-wide"
            >
              {profile.title}
            </motion.h2>
          </div>

          {/* Bio / Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-slate-300 font-light max-w-lg leading-relaxed text-sm md:text-base font-outfit"
          >
            {profile.bio}
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-4 w-full sm:w-auto items-center"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-3.5 rounded-full font-bold font-syne text-sm text-[#030014] bg-gradient-to-r from-cyan-400 to-purple-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all cursor-pointer flex items-center gap-2 shadow-lg shadow-cyan-400/25"
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
              className="px-7 py-3.5 rounded-full font-bold font-syne text-sm text-white bg-white/5 border border-white/15 transition-all cursor-pointer flex items-center gap-2"
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
              className="px-6 py-3.5 rounded-full font-semibold font-outfit text-xs text-slate-300 hover:text-white border border-white/10 transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              Resume
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Right Hero Section - Prominent Avatar Portrait Showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-5 relative flex justify-center items-center"
        >
          <div className="relative w-80 h-96 md:w-[380px] md:h-[480px] flex items-center justify-center">
            {/* Animated Rotating Gradient Background Aura */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-500/30 via-purple-500/20 to-pink-500/30 blur-3xl opacity-70 pointer-events-none"
            />

            {/* Glowing Glass Frame Container */}
            <div className="relative w-full h-full rounded-3xl p-2 bg-gradient-to-b from-cyan-400/20 via-purple-500/20 to-slate-900/60 border border-white/20 backdrop-blur-xl shadow-[0_0_50px_rgba(0,212,255,0.25)] flex items-end justify-center overflow-hidden group">
              
              {/* Subtle inner grid pattern */}
              <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

              {/* Avatar Portrait Image */}
              <div className="relative w-full h-full flex items-end justify-center">
                <NextImage
                  src="/rohan-hero.png"
                  alt="Rohan Kirdak"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.7)]"
                />
              </div>

              {/* Bottom Gradient Overlay for seamless blending */}
              <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#030014] via-[#030014]/60 to-transparent z-10" />

              {/* Developer Tag Pill inside frame */}
              <div className="absolute bottom-4 z-20 px-4 py-1.5 rounded-full bg-slate-950/80 border border-cyan-400/40 text-xs font-bold font-syne text-cyan-300 shadow-xl flex items-center gap-2 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span>Rohan Kirdak • Full Stack Developer</span>
              </div>
            </div>

            {/* Floating Badge 1: React.js */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-3 -left-4 p-3 glass-card border-white/15 rounded-2xl flex items-center gap-2 shadow-2xl shadow-black/80 z-30"
            >
              <div className="w-7 h-7 rounded-xl bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-sm">⚛️</div>
              <span className="text-xs font-bold text-white font-outfit">React & Next.js</span>
            </motion.div>

            {/* Floating Badge 2: ScaleFull Tech */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-4 -right-4 p-3 glass-card border-white/15 rounded-2xl flex items-center gap-2.5 shadow-2xl shadow-black/80 z-30"
            >
              <div className="w-7 h-7 rounded-xl bg-purple-500/20 border border-purple-400/40 flex items-center justify-center text-sm">💻</div>
              <div className="text-left">
                <p className="text-[10px] text-slate-400 font-outfit uppercase">Internship</p>
                <p className="text-xs font-bold text-white font-syne">ScaleFull Technologies</p>
              </div>
            </motion.div>

            {/* Floating Badge 3: Node.js */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-28 -right-6 p-2.5 glass-card border-white/15 rounded-2xl flex items-center gap-2 shadow-2xl shadow-black/80 z-30"
            >
              <span className="text-xs font-bold text-emerald-400 font-outfit">Node.js 🟢</span>
            </motion.div>

            {/* Floating Badge 4: AI & Gemini */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-28 -left-6 p-2.5 glass-card border-white/15 rounded-2xl flex items-center gap-2 shadow-2xl shadow-black/80 z-30"
            >
              <span className="text-xs font-bold text-purple-300 font-outfit">AI & Gemini 🤖</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
