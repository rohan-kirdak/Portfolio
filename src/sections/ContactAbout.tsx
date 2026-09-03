'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { Mail, Github, Linkedin, Send, Award, GraduationCap, Briefcase, Crown } from 'lucide-react'
import { experience as fallbackTimeline, education as educationData, leadership as leadershipData, profileInfo } from '@/data/portfolio'

export function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#030014]">
      {/* Glow Blob */}
      <div className="glow-orb w-[250px] h-[250px] bg-purple-600/20 top-1/4 right-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-syne text-white tracking-wide">
            About <span className="text-gradient-neon">Me</span>
          </h2>
          <div className="w-16 h-[2px] bg-cyan-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        {/* Premium Intro Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8 text-left"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-400 font-outfit">
            <span className="text-base">📍</span>
            <span>Pune, Maharashtra, India</span>
          </div>

          <p className="text-slate-200 font-light leading-relaxed text-base md:text-lg font-outfit">
            {profileInfo.aboutIntro}
          </p>

          {/* 3 Small Highlights */}
          <div className="grid sm:grid-cols-3 gap-4 pt-4">
            {profileInfo.highlights.map((highlight) => (
              <div
                key={highlight.title}
                className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 hover:bg-cyan-400/5 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400 mb-3 group-hover:scale-110 transition-transform">
                  ✦
                </div>
                <h4 className="text-sm font-bold font-syne text-white mb-1">{highlight.title}</h4>
                <p className="text-xs text-slate-400 font-outfit">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function ExperienceSection() {
  return (
    <section id="experience" className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#030014]">
      <div className="glow-orb w-[250px] h-[250px] bg-cyan-500/15 bottom-1/4 left-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-syne text-white tracking-wide">
            Work <span className="text-gradient-neon">Experience</span>
          </h2>
          <div className="w-16 h-[2px] bg-purple-500 mx-auto mt-4 rounded-full" />
        </motion.div>

        <div className="space-y-6 text-left">
          {fallbackTimeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card border-white/10 rounded-2xl p-6 md:p-8 hover:border-cyan-400/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 group"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <h3 className="text-xl font-bold font-syne text-white group-hover:text-cyan-300 transition-colors">
                    {item.position}
                  </h3>
                  <span className="px-3 py-0.5 text-[10px] font-bold rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-outfit uppercase">
                    {item.type}
                  </span>
                </div>
                <p className="text-base font-semibold text-cyan-400 font-outfit">
                  {item.company}
                </p>
                <p className="text-sm text-slate-300 font-light leading-relaxed font-outfit">
                  {item.description}
                </p>
              </div>

              <div className="md:text-right flex-shrink-0">
                <span className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-400 font-outfit inline-block">
                  {item.duration}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EducationSection() {
  return (
    <section id="education" className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#030014]">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-syne text-white tracking-wide">
            Education <span className="text-gradient-neon">Background</span>
          </h2>
          <div className="w-16 h-[2px] bg-cyan-400 mx-auto mt-4 rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border-white/10 rounded-3xl p-8 md:p-10 text-left space-y-6 shadow-2xl relative overflow-hidden"
        >
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-500/20 border border-cyan-400/30 flex items-center justify-center text-cyan-400 flex-shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="text-2xl font-bold font-syne text-white">
                  {educationData.degree}
                </h3>
                <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-slate-300 font-outfit w-fit">
                  {educationData.duration}
                </span>
              </div>

              <p className="text-lg font-semibold text-cyan-300 font-outfit">
                {educationData.college}
              </p>

              <p className="text-sm text-slate-400 font-outfit">
                {educationData.university}
              </p>

              <div className="pt-3 flex flex-wrap gap-3">
                <span className="px-4 py-2 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-xs font-bold text-cyan-300 font-outfit">
                  CGPA: {educationData.cgpa}
                </span>
                <span className="px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-xs font-bold text-purple-300 font-outfit">
                  Final Year CGPA: {educationData.finalCgpa}
                </span>
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 grid sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold font-syne text-white">{educationData.hsc}</span>
              <span className="text-xs font-semibold text-slate-400 font-outfit">Higher Secondary</span>
            </div>
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <span className="text-xs font-bold font-syne text-white">{educationData.ssc}</span>
              <span className="text-xs font-semibold text-slate-400 font-outfit">Secondary School</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export function LeadershipSection() {
  return (
    <section id="leadership" className="py-20 px-6 md:px-12 relative overflow-hidden bg-[#030014]">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-extrabold font-syne text-white tracking-wide">
            Leadership & <span className="text-gradient-neon">Initiatives</span>
          </h2>
          <div className="w-12 h-[2px] bg-purple-500 mx-auto mt-3 rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          {leadershipData.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="glass-card border-white/10 rounded-2xl p-6 hover:border-purple-400/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{item.icon}</span>
                  <h3 className="text-lg font-bold font-syne text-white">{item.title}</h3>
                </div>
                <p className="text-xs font-semibold text-cyan-400 font-outfit">{item.organization}</p>
                <p className="text-xs text-slate-300 font-light leading-relaxed font-outfit">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [activeInput, setActiveInput] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) return

    setSubmitting(true)
    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (res.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', message: '' })
        setTimeout(() => setSubmitted(false), 4000)
      }
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-6 md:px-12 relative overflow-hidden bg-[#030014]">
      <div className="glow-orb w-[300px] h-[300px] bg-cyan-500/15 bottom-0 left-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold font-syne text-white tracking-wide">
            {profileInfo.contactHeading}
          </h2>
          <p className="text-slate-400 font-light max-w-lg mx-auto mt-4 text-sm font-outfit">
            {profileInfo.contactSubtitle}
          </p>
          <div className="w-16 h-[2px] bg-purple-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-card border-white/10 rounded-3xl p-8 md:p-10 flex flex-col justify-between"
          >
            <div className="space-y-8 text-left">
              <div>
                <h3 className="text-2xl font-bold font-syne text-white mb-2">Connect Directly</h3>
                <p className="text-slate-400 font-light text-xs font-outfit">
                  Feel free to reach out via email or connect on professional networks.
                </p>
              </div>

              <div className="space-y-4">
                <a
                  href={`mailto:${profileInfo.email}`}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group"
                >
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-cyan-400/50 text-cyan-400 transition-all">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-500 font-medium font-outfit uppercase">Email Me</p>
                    <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {profileInfo.email}
                    </p>
                  </div>
                </a>

                <a
                  href={profileInfo.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group"
                >
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-cyan-400/50 text-cyan-400 transition-all">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-500 font-medium font-outfit uppercase">LinkedIn</p>
                    <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      Rohan Kirdak
                    </p>
                  </div>
                </a>

                <a
                  href={profileInfo.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400 hover:bg-cyan-400/5 transition-all group"
                >
                  <div className="p-3 bg-white/5 border border-white/10 rounded-xl group-hover:border-cyan-400/50 text-cyan-400 transition-all">
                    <Github className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-slate-500 font-medium font-outfit uppercase">GitHub</p>
                    <p className="text-sm font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      rohan-kirdak
                    </p>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6 text-left">
              <span className="text-xs font-semibold text-slate-400 font-outfit">
                Open for Software Developer Roles & Collaborations
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 glass-card border-white/10 rounded-3xl p-8 md:p-10 relative overflow-hidden"
          >
            <form onSubmit={handleSubmit} className="space-y-6 text-left">
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  onFocus={() => setActiveInput('name')}
                  onBlur={() => setActiveInput(null)}
                  placeholder="Your Name"
                  className={`w-full px-5 py-4 bg-slate-950/50 border rounded-2xl focus:outline-none transition-all duration-300 font-outfit text-white placeholder-slate-500 ${
                    activeInput === 'name' 
                      ? 'border-cyan-400/80 shadow-[0_0_15px_rgba(0,212,255,0.15)] bg-slate-950/80' 
                      : 'border-white/10'
                  }`}
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  onFocus={() => setActiveInput('email')}
                  onBlur={() => setActiveInput(null)}
                  placeholder="Your Email Address"
                  className={`w-full px-5 py-4 bg-slate-950/50 border rounded-2xl focus:outline-none transition-all duration-300 font-outfit text-white placeholder-slate-500 ${
                    activeInput === 'email' 
                      ? 'border-cyan-400/80 shadow-[0_0_15px_rgba(0,212,255,0.15)] bg-slate-950/80' 
                      : 'border-white/10'
                  }`}
                />
              </div>

              <div className="relative">
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  onFocus={() => setActiveInput('message')}
                  onBlur={() => setActiveInput(null)}
                  placeholder="Tell me about your opportunity or project..."
                  className={`w-full px-5 py-4 bg-slate-950/50 border rounded-2xl focus:outline-none transition-all duration-300 font-outfit text-white placeholder-slate-500 ${
                    activeInput === 'message' 
                      ? 'border-cyan-400/80 shadow-[0_0_15px_rgba(0,212,255,0.15)] bg-slate-950/80' 
                      : 'border-white/10'
                  }`}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={submitted || submitting}
                className={`w-full py-4 rounded-2xl font-bold font-syne text-sm text-[#030014] tracking-wider transition-all duration-500 cursor-pointer flex items-center justify-center gap-2 shadow-lg ${
                  submitted
                    ? 'bg-emerald-400 text-[#030014] shadow-emerald-400/20'
                    : 'bg-gradient-to-r from-cyan-400 to-purple-500 hover:shadow-[0_0_25px_rgba(0,212,255,0.4)] shadow-cyan-400/10'
                }`}
              >
                {submitted ? (
                  <>
                    <span>✓ MESSAGE SENT</span>
                  </>
                ) : (
                  <>
                    <span>{submitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
