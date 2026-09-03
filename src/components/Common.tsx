'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Menu, X, Download } from 'lucide-react'
import { profileInfo } from '@/data/portfolio'

// Floating Capsule Navbar with Glassmorphism
export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[999] px-4 md:px-8 py-4 transition-all duration-300">
        <div
          className={`max-w-6xl mx-auto flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500 ${
            scrolled
              ? 'glass-card border-white/10 shadow-lg shadow-black/40 backdrop-blur-md bg-slate-950/60 py-2'
              : 'border border-transparent bg-transparent'
          }`}
        >
          {/* Logo Brand */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer">
            <span className="w-9 h-9 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-all font-syne">
              R
            </span>
            <span className="font-syne font-bold text-lg tracking-wider text-white relative">
              KIRDAK
              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-cyan-400 group-hover:w-full transition-all duration-300" />
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-semibold text-slate-300 hover:text-white transition-colors relative py-1 cursor-pointer group tracking-wide font-outfit"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </nav>

          {/* CTA / Resume Button */}
          <div className="hidden lg:block">
            <a
              href={profileInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              download="Rohan_Kirdak_Resume.pdf"
              className="px-5 py-2 text-xs font-bold font-syne text-white bg-white/5 border border-white/15 hover:border-cyan-400 hover:bg-cyan-400/10 rounded-full transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-inner"
            >
              Resume ↓
            </a>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Glass Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 bg-slate-950/80 z-[1000] flex lg:hidden items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-full max-w-sm glass-card border-white/10 rounded-3xl p-8 relative overflow-hidden"
            >
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-white rounded-full bg-white/5 border border-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center gap-5 mt-2">
                {navLinks.map((link, i) => (
                  <motion.a
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-bold font-syne text-slate-100 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    {link.name}
                  </motion.a>
                ))}

                <motion.a
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  href={profileInfo.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  download="Rohan_Kirdak_Resume.pdf"
                  className="mt-2 w-full py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-xs font-bold font-syne text-[#030014] rounded-full text-center flex items-center justify-center gap-2 shadow-lg"
                >
                  <Download className="w-4 h-4" />
                  Download Resume
                </motion.a>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                  className="w-full border-t border-white/10 pt-4 flex justify-center gap-4"
                >
                  <a
                    href={profileInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 rounded-full transition-all"
                  >
                    <Github className="w-5 h-5 text-cyan-400" />
                  </a>
                  <a
                    href={profileInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="p-3 bg-white/5 border border-white/10 hover:border-cyan-400 hover:text-cyan-400 rounded-full transition-all"
                  >
                    <Linkedin className="w-5 h-5 text-cyan-400" />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

// Obsidian/Glass Footer Redesign
export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative border-t border-white/5 bg-[#030014] py-12 px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-2 text-left">
            <h3 className="text-xl font-bold font-syne tracking-wider text-white mb-3">
              ROHAN KIRDAK
            </h3>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed mb-6 font-outfit font-light">
              {profileInfo.footerBio}
            </p>
            <div className="flex gap-4 items-center">
              <a
                href={profileInfo.github}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-400 rounded-xl transition-all font-outfit text-xs font-semibold flex items-center gap-2"
              >
                <Github className="w-4 h-4 text-cyan-400" />
                GitHub
              </a>
              <a
                href={profileInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-400 rounded-xl transition-all font-outfit text-xs font-semibold flex items-center gap-2"
              >
                <Linkedin className="w-4 h-4 text-cyan-400" />
                LinkedIn
              </a>
              <a
                href={`mailto:${profileInfo.email}`}
                className="px-4 py-2 bg-white/5 hover:bg-cyan-400/10 border border-white/10 hover:border-cyan-400/50 text-slate-300 hover:text-cyan-400 rounded-xl transition-all font-outfit text-xs font-semibold flex items-center gap-2"
              >
                <Mail className="w-4 h-4 text-cyan-400" />
                Email
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="text-left">
            <h4 className="text-sm font-semibold tracking-wider text-slate-200 uppercase mb-4 font-syne">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-outfit text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  About Me
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-white transition-colors">
                  Skills
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-white transition-colors">
                  Experience
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-white transition-colors">
                  Projects
                </a>
              </li>
              <li>
                <a href="#leadership" className="hover:text-white transition-colors">
                  Leadership
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Focus Column */}
          <div className="text-left">
            <h4 className="text-sm font-semibold tracking-wider text-slate-200 uppercase mb-4 font-syne">
              Focus
            </h4>
            <ul className="space-y-2 text-xs font-outfit text-slate-400">
              {profileInfo.focusAreas.map((area) => (
                <li key={area} className="font-light flex items-center gap-2">
                  <span className="text-cyan-400">•</span> {area}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer Bottom copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500 font-outfit">
          <p className="font-light">
            &copy; {new Date().getFullYear()} Rohan Kirdak. All rights reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="px-4 py-2 bg-white/5 border border-white/10 hover:border-cyan-400/50 hover:bg-cyan-400/5 text-slate-400 hover:text-white rounded-full transition-all flex items-center gap-1 cursor-pointer font-syne"
          >
            Back to Top
            <span className="text-xs">&uarr;</span>
          </button>
        </div>
      </div>
    </footer>
  )
}

// Glowing Scroll Progress Bar
export function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
      setProgress(scrolled)
    }

    window.addEventListener('scroll', updateProgress)
    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <motion.div
      className="fixed top-0 left-0 h-[3px] bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 z-[9999] shadow-[0_0_10px_rgba(0,212,255,0.7)]"
      style={{ width: `${progress}%` }}
    />
  )
}

export default Navbar
