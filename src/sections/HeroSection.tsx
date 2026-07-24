'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ArrowUpRight, Sparkles, Download, Terminal } from 'lucide-react'

const defaultWords = ['Full Stack MERN Developer', 'Next.js Specialist', 'UI/UX Craftist', 'Backend Engineer']

export default function HeroSection() {
  const [index, setIndex] = useState(0)
  const [profile, setProfile] = useState({
    name: 'Rohan Kirdak',
    tagline: 'Full Stack MERN Developer',
    bio: 'Passionate Full Stack MERN Developer focused on building modern, responsive, and scalable web applications with clean UI, smooth animations, and great user experiences.',
    resumeUrl: '/resume.pdf',
  })

  useEffect(() => {
    fetch('/api/profile', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (data && data.name) {
          setProfile((prev) => ({
            ...prev,
            name: data.name || prev.name,
            tagline: data.tagline || prev.tagline,
            bio: data.bio || prev.bio,
            resumeUrl: data.resumeUrl || prev.resumeUrl,
          }))
        }
      })
      .catch(() => {})
  }, [])

  const words = profile.tagline ? [profile.tagline, 'Full Stack MERN Developer', 'Next.js Specialist', 'Backend Engineer'] : defaultWords

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3200)
    return () => clearInterval(interval)
  }, [words.length])

  return (
    <section className="min-h-screen flex items-center justify-center relative py-20 px-6 md:px-12 overflow-hidden bg-[#030014]">
      <div className="glow-orb w-[300px] h-[300px] bg-purple-600/35 top-1/4 left-10 md:left-20" />
      <div className="glow-orb w-[300px] h-[300px] bg-cyan-500/25 bottom-1/4 right-10 md:right-20 animate-float-delayed" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none z-[1]" />

      <div className="max-w-6xl mx-auto w-full grid lg:grid-cols-12 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="lg:col-span-7 flex flex-col items-start text-left space-y-8"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 hover:border-cyan-400/30 transition-all backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase font-outfit">
              Open to Opportunities
            </span>
          </motion.div>

          <div className="space-y-4">
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
          </div>

          <div className="h-10 md:h-12 flex items-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.h3
                key={index}
                initial={{ y: 24, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -24, opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-lg md:text-2xl font-semibold tracking-wide text-slate-300 font-outfit"
              >
                {words[index]}
              </motion.h3>
            </AnimatePresence>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-400 font-light max-w-lg leading-relaxed text-sm md:text-base font-outfit"
          >
            {profile.bio}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex flex-wrap gap-4 pt-2 w-full sm:w-auto"
          >
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className="px-8 py-3.5 rounded-full font-bold font-syne text-sm text-[#030014] bg-gradient-to-r from-cyan-400 to-purple-500 hover:shadow-[0_0_30px_rgba(0,212,255,0.5)] transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-cyan-400/25"
            >
              Hire Me
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05, borderColor: 'rgba(255, 255, 255, 0.25)', backgroundColor: 'rgba(255,255,255,0.05)' }}
              whileTap={{ scale: 0.95 }}
              href="#projects"
              className="px-8 py-3.5 rounded-full font-bold font-syne text-sm text-white bg-white/5 border border-white/10 transition-all cursor-pointer flex items-center gap-1.5"
            >
              View Work
            </motion.a>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={profile.resumeUrl}
              target="_blank"
              download="Rohan_Kirdak_Resume.pdf"
              className="px-6 py-3.5 rounded-full font-medium font-outfit text-xs text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              CV
            </motion.a>
          </motion.div>
        </motion.div>

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
              <div className="opacity-20 text-[9px] font-mono text-cyan-300 w-[80%] text-left select-none space-y-1">
                <p className="text-purple-400">const developer = &#123;</p>
                <p className="pl-4">name: &quot;{profile.name}&quot;,</p>
                <p className="pl-4">role: &quot;Full-Stack MERN&quot;,</p>
                <p className="pl-4 text-pink-400">passion: &quot;Beautiful Animation&quot;,</p>
                <p className="pl-4 text-cyan-400">skills: [&quot;React&quot;, &quot;Next&quot;, &quot;Node&quot;],</p>
                <p className="text-purple-400">&#125;;</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 left-6 p-3 glass-card border-white/10 rounded-2xl flex items-center gap-2 shadow-xl shadow-black/50"
            >
              <div className="w-6 h-6 rounded-full bg-cyan-400/20 flex items-center justify-center text-xs">⚛️</div>
              <span className="text-xs font-bold text-white font-outfit">React</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 4, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -bottom-6 right-8 p-3 glass-card border-white/10 rounded-2xl flex items-center gap-2 shadow-xl shadow-black/50"
            >
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center text-xs">🟢</div>
              <span className="text-xs font-bold text-white font-outfit">Node</span>
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
