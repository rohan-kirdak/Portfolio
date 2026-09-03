'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Sparkles, Download, Github, Terminal } from 'lucide-react'
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
      <div className="glow-orb w-[300px] h-[300px] bg-purple-600/35 top-1/4 left-10 md:left-20" />
      <div className="glow-orb w-[300px] h-[300px] bg-cyan-500/25 bottom-1/4 right-10 md:right-20 animate-float-delayed" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-[1]" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
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

        {/* Right Interactive Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="lg:col-span-5 relative flex justify-center items-center"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96 flex items-center justify-center">
            <motion.div
              animate={{ 
                rotate: 360,
                borderRadius: ["42% 58% 70% 30% / 45% 45% 55% 55%", "70% 30% 52% 48% / 60% 40% 60% 40%", "42% 58% 70% 30% / 45% 45% 55% 55%"]
              }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-600/10 to-pink-500/20 border border-white/15 backdrop-blur-lg shadow-[0_0_80px_rgba(124,58,237,0.25)] flex items-center justify-center overflow-hidden"
            >
              <div className="opacity-25 text-[10px] font-mono text-cyan-300 w-[80%] text-left select-none space-y-1">
                <p className="text-purple-400">const developer = &#123;</p>
                <p className="pl-4">name: &quot;{profile.name}&quot;,</p>
                <p className="pl-4">role: &quot;Full Stack MERN & Next.js&quot;,</p>
                <p className="pl-4 text-pink-400">company: &quot;ScaleFull Tech&quot;,</p>
                <p className="pl-4 text-cyan-400">skills: [&quot;React&quot;, &quot;Next.js&quot;, &quot;Node&quot;],</p>
                <p className="text-purple-400">&#125;;</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 left-6 p-3 glass-card border-white/10 rounded-2xl flex items-center gap-2 shadow-xl shadow-black/50"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center text-xs">⚛️</div>
              <span className="text-xs font-bold text-white font-outfit">React.js</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 right-8 p-3 glass-card border-white/10 rounded-2xl flex items-center gap-2 shadow-xl shadow-black/50"
            >
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs">🟢</div>
              <span className="text-xs font-bold text-white font-outfit">Node.js</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 4, delay: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-20 -right-8 p-3 glass-card border-white/10 rounded-2xl flex items-center gap-2 shadow-xl shadow-black/50"
            >
              <span className="text-xs font-bold text-white font-outfit">Next.js 🚀</span>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="w-14 h-14 rounded-2xl bg-slate-900 border border-white/15 shadow-2xl flex items-center justify-center z-10"
            >
              <Terminal className="w-6 h-6 text-cyan-400" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
