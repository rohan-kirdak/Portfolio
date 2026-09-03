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

        {/* RIGHT COLUMN - CIRCULAR GLOWING PORTRAIT WITH FLOATING BADGES */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="lg:col-span-5 relative flex justify-center items-center"
        >
          <div className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[440px] md:h-[440px] flex items-center justify-center">
            
            {/* Outer Circular Neon Ring with Dotted Ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-cyan-400/20 animate-spin-slow" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-2 rounded-full p-[2px] bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 shadow-[0_0_60px_rgba(0,212,255,0.35)]"
            >
              <div className="w-full h-full bg-[#030014] rounded-full" />
            </motion.div>

            {/* Circular Inner Glow Portal */}
            <div className="relative w-[92%] h-[92%] rounded-full overflow-hidden bg-gradient-to-b from-purple-900/40 via-purple-950/80 to-[#030014] border border-white/10 flex items-end justify-center shadow-inner">
              
              {/* Radial Cyan/Purple Backlight */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-gradient-to-tr from-cyan-500/30 to-purple-600/40 blur-2xl pointer-events-none" />

              {/* Dotted Pattern Overlay */}
              <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

              {/* Rohan Character Avatar Image */}
              <div className="relative w-full h-full flex items-end justify-center">
                <NextImage
                  src="/rohan-hero.png"
                  alt="Rohan Kirdak"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 450px"
                  className="object-cover object-top filter drop-shadow-[0_10px_25px_rgba(0,0,0,0.8)] scale-105"
                />
              </div>

              {/* Bottom Gradient Fade */}
              <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#030014] via-[#030014]/70 to-transparent z-10" />
            </div>

            {/* FLOATING BADGE 1: React & Next.js (Top Left) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-4 -left-4 sm:left-0 z-30 px-3.5 py-2 rounded-full bg-slate-900/90 border border-cyan-400/40 shadow-xl shadow-cyan-500/10 flex items-center gap-2 backdrop-blur-md"
            >
              <div className="w-5 h-5 rounded-full bg-cyan-400/20 flex items-center justify-center text-xs">⚛️</div>
              <span className="text-xs font-bold text-white font-outfit">React & Next.js</span>
            </motion.div>

            {/* FLOATING BADGE 2: Next.js (Top Right) */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-12 -right-4 sm:right-2 z-30 px-3.5 py-2 rounded-full bg-slate-900/90 border border-purple-400/40 shadow-xl shadow-purple-500/10 flex items-center gap-2 backdrop-blur-md"
            >
              <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-extrabold text-white">N</span>
              <span className="text-xs font-bold text-white font-outfit">Next.js</span>
            </motion.div>

            {/* FLOATING BADGE 3: Node.js (Mid Left) */}
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 4, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-28 -left-6 sm:-left-2 z-30 px-3.5 py-2 rounded-full bg-slate-900/90 border border-emerald-400/40 shadow-xl shadow-emerald-500/10 flex items-center gap-2 backdrop-blur-md"
            >
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">JS</span>
              <span className="text-xs font-bold text-white font-outfit">Node.js</span>
            </motion.div>

            {/* FLOATING BADGE 4: AI & Gemini (Mid Right) */}
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, delay: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute bottom-32 -right-6 sm:-right-2 z-30 px-3.5 py-2 rounded-full bg-slate-900/90 border border-pink-400/40 shadow-xl shadow-pink-500/10 flex items-center gap-2 backdrop-blur-md"
            >
              <Sparkles className="w-4 h-4 text-pink-400" />
              <span className="text-xs font-bold text-white font-outfit">AI & Gemini</span>
            </motion.div>

            {/* FLOATING BADGE 5: ScaleFull Tech Card (Bottom Right Overlay) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-2 right-4 sm:right-8 z-30 px-4 py-2.5 rounded-2xl bg-slate-900/95 border border-cyan-400/40 shadow-2xl shadow-black/80 flex items-center gap-3 backdrop-blur-md"
            >
              <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center text-sm">
                💻
              </div>
              <div className="text-left">
                <p className="text-[9px] text-slate-400 font-outfit uppercase font-semibold">INTERNSHIP</p>
                <p className="text-xs font-bold text-white font-syne">ScaleFull Technologies</p>
              </div>
            </motion.div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
