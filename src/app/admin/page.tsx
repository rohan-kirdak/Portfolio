'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  FolderGit2,
  Cpu,
  UserCheck,
  Briefcase,
  Mail,
  LogOut,
  Plus,
  Trash2,
  Edit3,
  Upload,
  CheckCircle,
  ExternalLink,
  Github,
  FileText,
  Star,
  RefreshCw,
  Search,
  Eye,
  Check
} from 'lucide-react'
import toast, { Toaster } from 'react-hot-toast'

export default function AdminDashboard() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'skills' | 'profile' | 'experience' | 'inquiries'>('overview')
  const [loading, setLoading] = useState(true)

  // Data states
  const [projects, setProjects] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [experiences, setExperiences] = useState<any[]>([])
  const [inquiries, setInquiries] = useState<any[]>([])

  // Modal / Form states
  const [projectModal, setProjectModal] = useState(false)
  const [editingProject, setEditingProject] = useState<any>(null)
  const [projectForm, setProjectForm] = useState({
    title: '',
    description: '',
    features: '',
    technologies: '',
    image: '',
    github: '',
    live: '',
    featured: true,
    order: 1,
  })

  const [skillForm, setSkillForm] = useState({
    name: '',
    category: 'Frontend',
    level: 'Advanced',
  })

  const [expModal, setExpModal] = useState(false)
  const [editingExp, setEditingExp] = useState<any>(null)
  const [expForm, setExpForm] = useState({
    company: '',
    position: '',
    duration: '',
    description: '',
    type: 'Internship',
    icon: '💼',
    order: 1,
  })

  const [uploading, setUploading] = useState(false)

  // Check auth & fetch initial data
  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      // Auth check
      const authRes = await fetch('/api/auth/me')
      const authData = await authRes.json()
      if (!authData.authenticated) {
        router.push('/admin/login')
        return
      }

      // Parallel fetch
      const [projRes, skillRes, profRes, expRes, inqRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills'),
        fetch('/api/profile'),
        fetch('/api/experience'),
        fetch('/api/inquiries'),
      ])

      if (projRes.ok) setProjects(await projRes.json())
      if (skillRes.ok) {
        const sData = await skillRes.json()
        setSkills(sData.skills || [])
      }
      if (profRes.ok) setProfile(await profRes.json())
      if (expRes.ok) setExperiences(await expRes.json())
      if (inqRes.ok) setInquiries(await inqRes.json())
    } catch (err) {
      console.error(err)
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    toast.success('Logged out')
    router.push('/admin/login')
  }

  // --- PROJECT ACTIONS ---
  const handleOpenProjectModal = (proj: any = null) => {
    if (proj) {
      setEditingProject(proj)
      setProjectForm({
        title: proj.title || '',
        description: proj.description || '',
        features: Array.isArray(proj.features) ? proj.features.join(', ') : '',
        technologies: Array.isArray(proj.technologies)
          ? proj.technologies.join(', ')
          : Array.isArray(proj.tech)
          ? proj.tech.join(', ')
          : '',
        image: proj.image || '',
        github: proj.github || '',
        live: proj.live || '',
        featured: proj.featured ?? true,
        order: proj.order || 1,
      })
    } else {
      setEditingProject(null)
      setProjectForm({
        title: '',
        description: '',
        features: '',
        technologies: '',
        image: '',
        github: '',
        live: '',
        featured: true,
        order: projects.length + 1,
      })
    }
    setProjectModal(true)
  }

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        ...projectForm,
        features: projectForm.features.split(',').map((s) => s.trim()).filter(Boolean),
        technologies: projectForm.technologies.split(',').map((s) => s.trim()).filter(Boolean),
      }

      const url = editingProject ? `/api/projects/${editingProject.id}` : '/api/projects'
      const method = editingProject ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        toast.success(editingProject ? 'Project updated!' : 'Project created!')
        setProjectModal(false)
        fetchData()
      } else {
        const err = await res.json()
        toast.error(err.error || 'Failed to save project')
      }
    } catch {
      toast.error('Error saving project')
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      const res = await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Project deleted')
        setProjects(projects.filter((p) => p.id !== id))
      }
    } catch {
      toast.error('Failed to delete project')
    }
  }

  // File Upload Helper
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: 'image' | 'resume') => {
    const file = e.target.files?.[0]
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('type', targetField === 'resume' ? 'resume' : 'image')

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()

      if (res.ok && data.url) {
        toast.success('File uploaded successfully!')
        if (targetField === 'image') {
          setProjectForm((prev) => ({ ...prev, image: data.url }))
        } else if (targetField === 'resume' && profile) {
          setProfile((prev: any) => ({ ...prev, resumeUrl: data.url }))
          // Save profile automatically with new resumeUrl
          await fetch('/api/profile', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...profile, resumeUrl: data.url }),
          })
        }
      } else {
        toast.error(data.error || 'Upload failed')
      }
    } catch {
      toast.error('Error uploading file')
    } finally {
      setUploading(false)
    }
  }

  // --- SKILL ACTIONS ---
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!skillForm.name) return
    try {
      const res = await fetch('/api/skills', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skillForm),
      })
      if (res.ok) {
        toast.success('Skill added!')
        setSkillForm({ name: '', category: skillForm.category, level: 'Advanced' })
        fetchData()
      }
    } catch {
      toast.error('Failed to add skill')
    }
  }

  const handleDeleteSkill = async (id: number) => {
    try {
      const res = await fetch(`/api/skills/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Skill removed')
        setSkills(skills.filter((s) => s.id !== id))
      }
    } catch {
      toast.error('Failed to delete skill')
    }
  }

  // --- PROFILE ACTIONS ---
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile),
      })
      if (res.ok) {
        toast.success('Profile updated successfully!')
      }
    } catch {
      toast.error('Failed to update profile')
    }
  }

  // --- EXPERIENCE ACTIONS ---
  const handleOpenExpModal = (exp: any = null) => {
    if (exp) {
      setEditingExp(exp)
      setExpForm({ ...exp })
    } else {
      setEditingExp(null)
      setExpForm({
        company: '',
        position: '',
        duration: '',
        description: '',
        type: 'Internship',
        icon: '💼',
        order: experiences.length + 1,
      })
    }
    setExpModal(true)
  }

  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const url = editingExp ? `/api/experience/${editingExp.id}` : '/api/experience'
      const method = editingExp ? 'PUT' : 'POST'

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expForm),
      })

      if (res.ok) {
        toast.success('Experience saved!')
        setExpModal(false)
        fetchData()
      }
    } catch {
      toast.error('Failed to save experience')
    }
  }

  const handleDeleteExp = async (id: number) => {
    if (!confirm('Delete this experience entry?')) return
    try {
      const res = await fetch(`/api/experience/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Deleted experience entry')
        setExperiences(experiences.filter((e) => e.id !== id))
      }
    } catch {
      toast.error('Failed to delete entry')
    }
  }

  // --- INQUIRY ACTIONS ---
  const handleToggleReadInquiry = async (id: number, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ read: !currentRead }),
      })
      if (res.ok) {
        setInquiries(inquiries.map((i) => (i.id === id ? { ...i, read: !currentRead } : i)))
      }
    } catch {
      toast.error('Failed to update status')
    }
  }

  const handleDeleteInquiry = async (id: number) => {
    if (!confirm('Delete this message?')) return
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success('Message deleted')
        setInquiries(inquiries.filter((i) => i.id !== id))
      }
    } catch {
      toast.error('Failed to delete message')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="w-8 h-8 text-emerald-500 animate-spin" />
          <p className="text-slate-400 text-sm">Loading Admin Dashboard...</p>
        </div>
      </div>
    )
  }

  const unreadInquiriesCount = inquiries.filter((i) => !i.read).length

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col md:flex-row">
      <Toaster position="top-right" />

      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-slate-900/90 border-b md:border-b-0 md:border-r border-slate-800 p-5 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-xl flex items-center justify-center font-bold text-slate-950 text-lg shadow-md shadow-emerald-500/20">
              RK
            </div>
            <div>
              <h2 className="font-bold text-slate-100 text-base leading-none">Admin Panel</h2>
              <span className="text-xs text-emerald-400 font-medium">Portfolio Manager</span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {[
              { id: 'overview', label: 'Overview', icon: LayoutDashboard },
              { id: 'projects', label: 'Projects', icon: FolderGit2, count: projects.length },
              { id: 'skills', label: 'Skills', icon: Cpu, count: skills.length },
              { id: 'profile', label: 'Hero & Profile', icon: UserCheck },
              { id: 'experience', label: 'Experience', icon: Briefcase, count: experiences.length },
              { id: 'inquiries', label: 'Inquiries Inbox', icon: Mail, count: unreadInquiriesCount, highlight: unreadInquiriesCount > 0 },
            ].map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.count !== undefined && (
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        tab.highlight
                          ? 'bg-emerald-500 text-slate-950 animate-pulse'
                          : isActive
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800/80 mt-6 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white bg-slate-800/40 hover:bg-slate-800 transition-all border border-slate-800"
          >
            <span className="flex items-center space-x-2">
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span>View Public Site</span>
            </span>
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 hover:border-rose-500/30 border border-transparent transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-w-7xl mx-auto w-full">

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Dashboard Overview</h1>
              <p className="text-sm text-slate-400">Welcome back, {profile?.name || 'Rohan'}! Here is your portfolio status.</p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: 'Total Projects', value: projects.length, icon: FolderGit2, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
                { label: 'Total Skills', value: skills.length, icon: Cpu, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
                { label: 'Timeline Entries', value: experiences.length, icon: Briefcase, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { label: 'Unread Inquiries', value: unreadInquiriesCount, icon: Mail, color: 'text-amber-400', bg: 'bg-amber-500/10' },
              ].map((m, idx) => {
                const Icon = m.icon
                return (
                  <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-center space-x-4">
                    <div className={`p-3 rounded-xl ${m.bg}`}>
                      <Icon className={`w-6 h-6 ${m.color}`} />
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">{m.label}</p>
                      <h3 className="text-2xl font-bold text-slate-100">{m.value}</h3>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h3 className="text-base font-semibold text-slate-200 mb-4">Quick Management Shortcuts</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button
                  onClick={() => {
                    setActiveTab('projects')
                    handleOpenProjectModal()
                  }}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all text-left group"
                >
                  <div className="p-2.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:scale-105 transition-transform">
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-emerald-400 transition-colors">Add New Project</h4>
                    <p className="text-xs text-slate-400">Upload thumbnail, tech stack & links</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all text-left group"
                >
                  <div className="p-2.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:scale-105 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-blue-400 transition-colors">Upload Resume / CV</h4>
                    <p className="text-xs text-slate-400">Replace resume.pdf instant live</p>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab('inquiries')}
                  className="flex items-center space-x-3 p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/5 transition-all text-left group"
                >
                  <div className="p-2.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-200 group-hover:text-amber-400 transition-colors">View Messages</h4>
                    <p className="text-xs text-slate-400">{unreadInquiriesCount} new unread submissions</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Recent Messages Preview */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-semibold text-slate-200">Recent Contact Messages</h3>
                <button onClick={() => setActiveTab('inquiries')} className="text-xs text-emerald-400 hover:underline font-medium">
                  View All ({inquiries.length})
                </button>
              </div>
              {inquiries.length === 0 ? (
                <p className="text-sm text-slate-500">No contact messages received yet.</p>
              ) : (
                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-start justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-slate-200">{inq.name}</span>
                          <span className="text-xs text-slate-400">({inq.email})</span>
                          {!inq.read && <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-semibold">New</span>}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 line-clamp-1">{inq.message}</p>
                      </div>
                      <span className="text-[10px] text-slate-500 shrink-0">{new Date(inq.createdAt).toLocaleDateString()}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-100">Projects Section</h1>
                <p className="text-sm text-slate-400">Add, edit, feature, and reorder projects dynamically on your site.</p>
              </div>
              <button
                onClick={() => handleOpenProjectModal()}
                className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((proj) => (
                <div key={proj.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col justify-between group hover:border-slate-700 transition-all">
                  <div>
                    <div className="relative h-44 rounded-xl overflow-hidden mb-4 bg-slate-950 border border-slate-800">
                      {proj.image ? (
                        <img src={proj.image} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-600">No Image</div>
                      )}
                      {proj.featured && (
                        <span className="absolute top-3 left-3 bg-emerald-500/90 text-slate-950 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider flex items-center space-x-1 shadow-md">
                          <Star className="w-3 h-3 fill-slate-950" />
                          <span>Featured</span>
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-100 mb-1">{proj.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mb-3">{proj.description}</p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {(proj.technologies || proj.tech || []).map((t: string, idx: number) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs">
                    <div className="flex items-center space-x-3 text-slate-400">
                      {proj.github && (
                        <a href={proj.github} target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center space-x-1">
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                      {proj.live && (
                        <a href={proj.live} target="_blank" rel="noreferrer" className="hover:text-emerald-400 flex items-center space-x-1">
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Demo</span>
                        </a>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleOpenProjectModal(proj)}
                        className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                        title="Edit project"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Delete project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 3. SKILLS TAB */}
        {activeTab === 'skills' && (
          <div className="space-y-8">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Skills & Tech Stack</h1>
              <p className="text-sm text-slate-400">Manage technical categories and proficiency tags.</p>
            </div>

            {/* Add Skill Form */}
            <form onSubmit={handleAddSkill} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row items-end gap-4">
              <div className="flex-1 w-full">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Skill Name</label>
                <input
                  type="text"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  placeholder="e.g. Next.js, PostgreSQL, Docker"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              <div className="w-full md:w-48">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Category</label>
                <select
                  value={skillForm.category}
                  onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  {['Frontend', 'Backend', 'Database', 'Tools', 'Deployment', 'AI Tools'].map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="w-full md:w-44">
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Level</label>
                <select
                  value={skillForm.level}
                  onChange={(e) => setSkillForm({ ...skillForm, level: e.target.value })}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                >
                  <option value="Expert">Expert</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Intermediate">Intermediate</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-sm transition-all flex items-center justify-center space-x-2 shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Add Skill</span>
              </button>
            </form>

            {/* Categorized Skills display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {['Frontend', 'Backend', 'Database', 'Tools', 'Deployment', 'AI Tools'].map((cat) => {
                const catSkills = skills.filter((s) => s.category === cat)
                return (
                  <div key={cat} className="bg-slate-900 border border-slate-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
                      <h3 className="font-bold text-slate-200 text-base">{cat}</h3>
                      <span className="text-xs bg-slate-800 text-slate-400 font-semibold px-2 py-0.5 rounded-full">
                        {catSkills.length}
                      </span>
                    </div>

                    {catSkills.length === 0 ? (
                      <p className="text-xs text-slate-500 italic py-2">No skills in this category yet.</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {catSkills.map((sk) => (
                          <div
                            key={sk.id}
                            className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 group hover:border-slate-700 transition-all"
                          >
                            <span className="font-medium">{sk.name}</span>
                            <button
                              onClick={() => handleDeleteSkill(sk.id)}
                              className="text-slate-600 hover:text-rose-400 transition-colors"
                              title="Delete skill"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* 4. HERO & PROFILE / RESUME TAB */}
        {activeTab === 'profile' && profile && (
          <div className="space-y-8 max-w-4xl">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Hero Section & Bio</h1>
              <p className="text-sm text-slate-400">Update main site headings, stats, bio, and upload Resume/CV PDF.</p>
            </div>

            <form onSubmit={handleSaveProfile} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Full Name</label>
                  <input
                    type="text"
                    value={profile.name || ''}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Title / Tagline</label>
                  <input
                    type="text"
                    value={profile.tagline || ''}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-1.5 uppercase">Bio Description</label>
                <textarea
                  rows={4}
                  value={profile.bio || ''}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Profile Stats */}
              <div>
                <h3 className="text-sm font-bold text-slate-200 mb-3">Key Highlights / Stats</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Years Experience</label>
                    <input
                      type="text"
                      value={profile.yearsExp || ''}
                      onChange={(e) => setProfile({ ...profile, yearsExp: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-emerald-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Projects Count</label>
                    <input
                      type="text"
                      value={profile.projectsCount || ''}
                      onChange={(e) => setProfile({ ...profile, projectsCount: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-emerald-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">GitHub Commits</label>
                    <input
                      type="text"
                      value={profile.contributionsCount || ''}
                      onChange={(e) => setProfile({ ...profile, contributionsCount: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-emerald-400 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Tech Mastered</label>
                    <input
                      type="text"
                      value={profile.techCount || ''}
                      onChange={(e) => setProfile({ ...profile, techCount: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-emerald-400 font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Resume / CV Upload Section */}
              <div className="pt-4 border-t border-slate-800">
                <h3 className="text-sm font-bold text-slate-200 mb-2">Resume / CV File</h3>
                <p className="text-xs text-slate-400 mb-3">Upload a new PDF to replace resume.pdf without rebuilding the project.</p>

                <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <FileText className="w-8 h-8 text-emerald-400 shrink-0" />
                    <div>
                      <p className="text-xs font-semibold text-slate-200">Current Resume Link</p>
                      <a
                        href={profile.resumeUrl || '/resume.pdf'}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-emerald-400 hover:underline flex items-center space-x-1"
                      >
                        <span>{profile.resumeUrl || '/resume.pdf'}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>

                  <div className="sm:ml-auto w-full sm:w-auto">
                    <label className="flex items-center justify-center space-x-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl cursor-pointer transition-all border border-slate-700">
                      <Upload className="w-4 h-4 text-emerald-400" />
                      <span>{uploading ? 'Uploading PDF...' : 'Upload New Resume PDF'}</span>
                      <input
                        type="file"
                        accept=".pdf"
                        onChange={(e) => handleFileUpload(e, 'resume')}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
                >
                  Save Profile Settings
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. EXPERIENCE TAB */}
        {activeTab === 'experience' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-100">Experience & Journey Timeline</h1>
                <p className="text-sm text-slate-400">Add or manage internship, full-time work, and education timeline entries.</p>
              </div>
              <button
                onClick={() => handleOpenExpModal()}
                className="flex items-center space-x-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold rounded-xl text-sm transition-all shadow-lg shadow-emerald-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Entry</span>
              </button>
            </div>

            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-xl shrink-0">
                      {exp.icon || '💼'}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-slate-200 text-base">{exp.position}</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-emerald-400 font-semibold">{exp.company}</span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{exp.duration} • <span className="text-slate-300 font-medium">{exp.type}</span></p>
                      <p className="text-xs text-slate-400 mt-2 max-w-2xl">{exp.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0 ml-4">
                    <button
                      onClick={() => handleOpenExpModal(exp)}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                      title="Edit entry"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteExp(exp.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Delete entry"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 6. INQUIRIES TAB */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-100">Inquiries Inbox</h1>
              <p className="text-sm text-slate-400">View and respond to client and recruiter messages from the contact form.</p>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500">
                <Mail className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                <p className="text-base font-semibold text-slate-400">No contact messages yet</p>
                <p className="text-xs text-slate-500 mt-1">Form submissions from the public website will land here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className={`bg-slate-900 border rounded-2xl p-6 transition-all ${
                      !inq.read ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-slate-800'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center space-x-3">
                          <h3 className="font-bold text-slate-100 text-base">{inq.name}</h3>
                          {!inq.read && (
                            <span className="text-[10px] bg-emerald-500 text-slate-950 font-bold px-2 py-0.5 rounded-full uppercase">
                              Unread
                            </span>
                          )}
                        </div>
                        <a href={`mailto:${inq.email}`} className="text-xs text-emerald-400 hover:underline">
                          {inq.email}
                        </a>
                      </div>

                      <div className="flex items-center space-x-2 text-xs text-slate-400">
                        <span>{new Date(inq.createdAt).toLocaleString()}</span>
                      </div>
                    </div>

                    <p className="text-sm text-slate-300 bg-slate-950/60 p-4 rounded-xl border border-slate-800/80 mb-4 whitespace-pre-wrap">
                      {inq.message}
                    </p>

                    <div className="flex items-center justify-between pt-2">
                      <a
                        href={`mailto:${inq.email}?subject=Reply to your portfolio inquiry`}
                        className="px-4 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl transition-all border border-emerald-500/30 flex items-center space-x-2"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reply via Email</span>
                      </a>

                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleToggleReadInquiry(inq.id, inq.read)}
                          className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded-xl transition-all flex items-center space-x-1.5"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{inq.read ? 'Mark Unread' : 'Mark Read'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteInquiry(inq.id)}
                          className="p-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* PROJECT EDIT/ADD MODAL */}
      <AnimatePresence>
        {projectModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto space-y-5 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-lg font-bold text-slate-100">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={() => setProjectModal(false)} className="text-slate-400 hover:text-white text-xl">
                  &times;
                </button>
              </div>

              <form onSubmit={handleSaveProject} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Title</label>
                  <input
                    type="text"
                    value={projectForm.title}
                    onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                    placeholder="Project name"
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Description</label>
                  <textarea
                    rows={3}
                    value={projectForm.description}
                    onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                    placeholder="Project summary..."
                    className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Technologies (comma separated)</label>
                    <input
                      type="text"
                      value={projectForm.technologies}
                      onChange={(e) => setProjectForm({ ...projectForm, technologies: e.target.value })}
                      placeholder="React, Node.js, MongoDB"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Features List (comma separated)</label>
                    <input
                      type="text"
                      value={projectForm.features}
                      onChange={(e) => setProjectForm({ ...projectForm, features: e.target.value })}
                      placeholder="Auth System, Dashboard, Socket.IO"
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Thumbnail Image Picker / Upload */}
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Thumbnail Image URL / Upload</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={projectForm.image}
                      onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                      placeholder="/projects/example.png or http://..."
                      className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                    <label className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl cursor-pointer transition-all shrink-0 border border-slate-700 flex items-center space-x-1.5">
                      <Upload className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'image')}
                        disabled={uploading}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">GitHub Repository Link</label>
                    <input
                      type="url"
                      value={projectForm.github}
                      onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                      placeholder="https://github.com/..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Live Demo Link</label>
                    <input
                      type="url"
                      value={projectForm.live}
                      onChange={(e) => setProjectForm({ ...projectForm, live: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4 pt-2">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={projectForm.featured}
                      onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-800 text-emerald-500 focus:ring-emerald-500 bg-slate-950"
                    />
                    <span className="text-xs font-semibold text-slate-200">Featured Project</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setProjectModal(false)}
                    className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
                  >
                    Save Project
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* EXPERIENCE EDIT/ADD MODAL */}
      <AnimatePresence>
        {expModal && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 w-full max-w-lg space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h2 className="text-lg font-bold text-slate-100">
                  {editingExp ? 'Edit Experience' : 'Add Experience Entry'}
                </h2>
                <button onClick={() => setExpModal(false)} className="text-slate-400 hover:text-white text-xl">
                  &times;
                </button>
              </div>

              <form onSubmit={handleSaveExp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Company / Institution</label>
                  <input
                    type="text"
                    value={expForm.company}
                    onChange={(e) => setExpForm({ ...expForm, company: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Position / Role / Degree</label>
                  <input
                    type="text"
                    value={expForm.position}
                    onChange={(e) => setExpForm({ ...expForm, position: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Duration</label>
                    <input
                      type="text"
                      value={expForm.duration}
                      onChange={(e) => setExpForm({ ...expForm, duration: e.target.value })}
                      placeholder="e.g. Jan 2026 - Present"
                      className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Type</label>
                    <select
                      value={expForm.type}
                      onChange={(e) => setExpForm({ ...expForm, type: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                    >
                      <option value="Internship">Internship</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Education">Education</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1 uppercase">Description</label>
                  <textarea
                    rows={3}
                    value={expForm.description}
                    onChange={(e) => setExpForm({ ...expForm, description: e.target.value })}
                    className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-xl text-sm text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => setExpModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl text-sm transition-all"
                  >
                    Save Entry
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
