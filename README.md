# Rohan Kirdak - Premium Dynamic Portfolio & Admin Panel 🚀

A world-class, premium, highly animated personal portfolio website with a **Full-Stack Admin Panel (`/admin`)** built using **Next.js 15, React 19, Tailwind CSS, Framer Motion, Prisma ORM, and SQLite**.

---

## ✨ Features Overview

### 👑 Admin Panel (`/admin`)
Manage your entire portfolio live from a secure, sleek glassmorphism admin dashboard without touching code or redeploying:
- 🔐 **Secure Authentication**: Built-in JWT & HttpOnly session cookie authentication with hashed credentials.
- 📁 **Projects Manager**: Add, edit, delete, reorder, and feature projects with tech tags, GitHub repos, live links, and image upload.
- ⚡ **Skills Manager**: Categorize and update technical skills (Frontend, Backend, Database, Tools, Deployment, AI Tools) and proficiency levels.
- 👤 **Hero & Bio Profile Editor**: Update full name, tagline, bio text, and highlight metrics (Years of experience, Projects count, GitHub commits).
- 📄 **Resume/CV File Upload**: Upload new PDF resume directly from the admin panel to replace `resume.pdf` live on the site.
- 💼 **Experience Timeline**: Add and edit work internships, full-time roles, and education timeline milestones.
- 📥 **Inquiries Inbox**: Real contact form messages stored in SQLite database. Mark read/unread, delete, and reply via email.

---

### 🎨 Frontend & Design System
- **Modern Obsidian & Glassmorphism Aesthetic**: Vibrant dark mode gradients, blur cards, and ambient glowing accent orbs.
- **Micro-Animations**: Powered by Framer Motion for smooth tab transitions and hover effects.
- **Dynamic API Sync**: Public components pull live data from the database with graceful static fallbacks.
- **Responsive Layout**: Optimized across desktop, tablet, and mobile displays.

---

## 🛠️ Tech Stack

- **Core Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend Library**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/), [SQLite](https://www.sqlite.org/) (`file:./dev.db` — Zero setup required!)
- **Authentication**: Native Node.js `crypto` (PBKDF2 password hashing & HMAC signed tokens)
- **Icons & UI**: [Lucide React](https://lucide.dev/), [React Hot Toast](https://react-hot-toast.com/)

---

## ⚡ Zero-Setup Local Quickstart

No Docker or external database servers required! Everything runs out-of-the-box using SQLite.

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/rohan-kirdak/rohan-portfolio.git
cd rohan-portfolio
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
ADMIN_USERNAME="admin"
ADMIN_PASSWORD="admin123"
JWT_SECRET="rohan-portfolio-secret-2026"
```

### 3. Initialize & Seed Database
```bash
# Push Prisma schema to SQLite database
npx prisma db push

# Seed initial projects, skills, profile, and timeline data
npx tsx prisma/seed.ts
```

### 4. Run Development Server
```bash
npm run dev
```

- 🌐 **Public Website**: [http://localhost:3000](http://localhost:3000)
- 🔑 **Admin Panel**: [http://localhost:3000/admin](http://localhost:3000/admin)
  - **Username**: `admin`
  - **Password**: `admin123`

---

## 📁 Project Structure

```
rohan-portfolio/
├── prisma/
│   ├── schema.prisma       # Database models for Projects, Skills, HeroProfile, Experience, Inquiry, AdminUser
│   ├── seed.ts             # Initial database seed script
│   └── dev.db              # Local SQLite database file
├── public/                 # Static assets, uploaded project thumbnails, and resume.pdf
├── src/
│   ├── app/
│   │   ├── admin/          # Admin Dashboard & Login pages
│   │   ├── api/            # API Endpoints (auth, projects, skills, profile, experience, inquiries, upload)
│   │   ├── globals.css     # Global styles & design system tokens
│   │   ├── layout.tsx      # Root layout wrapper
│   │   └── page.tsx        # Public homepage
│   ├── components/         # Common navigation, footer, scroll progress
│   ├── data/               # Default static portfolio data fallback
│   ├── lib/                # Prisma singleton & Auth utilities
│   └── sections/           # Hero, Projects & Skills, About & Contact sections
├── .env                    # Environment configuration
├── package.json
└── tsconfig.json
```

---

## 📝 Available Scripts

```bash
npm run dev          # Starts local dev server
npm run build        # Compiles production build
npm run start        # Launches production build server
npm run type-check   # Runs TypeScript type check
```

---

## 👤 Author & Contact

**Rohan Kirdak** - *Full Stack MERN & Next.js Developer*

- 🌐 **Portfolio**: [https://rohan-portfolio.vercel.app](https://rohan-portfolio.vercel.app)
- 🐙 **GitHub**: [@rohan-kirdak](https://github.com/rohan-kirdak)
- 💼 **LinkedIn**: [Rohan Kirdak](https://www.linkedin.com/in/rohan-kirdak-240810254)
- 📧 **Email**: [rohankirdak8756@gmail.com](mailto:rohankirdak8756@gmail.com)

---

Developed with ❤️ by Rohan Kirdak | 2026
