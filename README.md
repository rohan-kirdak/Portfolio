# Rohan Kirdak - Full Stack MERN & Next.js Developer Portfolio 🚀

A high-performance, dynamic portfolio website with an integrated **Full-Stack Admin Panel (`/admin`)** built using **Next.js 15, React 19, Tailwind CSS, Framer Motion, Prisma ORM, and SQLite**.

---

## 🌟 Portfolio Overview

Designed and built by **Rohan Kirdak**, *Intern Software Engineer @ ScaleFull Technologies*.

### 📱 Key Sections & Layout
- **Hero Section**: Personal introduction as a **Full Stack MERN & Next.js Developer**, ScaleFull Technologies badge, concise bio, and direct action buttons (*View Projects*, *GitHub*, *Resume*).
- **About Me**: Professional journey overview, educational background at CSMCOE / SPPU, and core focus highlights (*Full Stack Development*, *AI-Powered Applications*, *Scalable Web Systems*).
- **Technical Skills**: Categorized technology stack without self-rated progress bars:
  - **Frontend**: React.js · Next.js · JavaScript · TypeScript · HTML5 · CSS3 · Tailwind CSS · Framer Motion · GSAP
  - **Backend**: Node.js · Express.js · REST APIs · GraphQL · JWT · Socket.IO
  - **Database**: MongoDB · MySQL · PostgreSQL · Mongoose · Prisma
  - **Cloud & DevOps**: AWS · Vercel · Docker · GitHub Actions
  - **AI & APIs**: Gemini API · OpenAI API
  - **Tools & CS**: Git · GitHub · Postman · DSA · OOP · Database Design · System Design
- **Work Experience**:
  - **Intern Software Engineer** | ScaleFull Technologies *(Jan 2026 – Present)*
  - **Trainee** | Wisdom Sprouts | Java By Kiran | Cyber Success *(2026 – Present)*
  - **Junior Web Developer** | Kanak Digifex NextGen Pvt. Ltd. *(Feb 2025 – Mar 2025)*
  - **Web Development Intern** | Cloud Infotech *(Jan 2025 – Feb 2025)*
- **Featured Projects**:
  - **01 — HireWave**: Recruitment & Hiring Platform (JWT Auth, Role Dashboards, AI Matching, Stripe, Cloudinary)
  - **02 — StartUp Sensei**: AI Startup Mentorship Platform (Real-time Socket.IO chat, Roadmap Generator, Solo Build)
- **Other Projects**:
  - **03 — ShopKart**: MERN E-Commerce Platform (Razorpay Payment, Cart & Inventory, Protected Admin)
  - **04 — ProjectHub**: Student Project Marketplace (Academic Project Showcase, Razorpay, MySQL MVC)
  - **05 — MindEase**: AI-Powered Wellness Application (Mood Tracking, Gemini API, AI Guidance)
- **Leadership & Initiatives**: Technical Club President & Google Student Ambassador highlights.
- **Education**: B.E. Computer Engineering at CSMCOE / SPPU (CGPA: 7.98/10, Final Year CGPA: 8.93/10), HSC (83%), SSC (94.80%).
- **Contact & Footer**: Direct connect buttons (*Email Me*, *LinkedIn*, *GitHub*), functional inquiry form, and navigation footer.

---

## 👑 Full-Stack Admin Panel (`/admin`)

Manage your entire portfolio live without touching code or redeploying:

- 🔐 **Authentication**: Built-in JWT & HttpOnly session cookie authentication (`admin` / `admin123`).
- 📁 **Projects Manager**: Add, edit, delete, reorder, feature projects, add tech tags, features, and upload project images.
- ⚡ **Skills Manager**: Add and categorize skills dynamically across 6 domain categories.
- 👤 **Hero Profile & Bio Editor**: Live update full name, tagline, bio, and resume download link.
- 📄 **Resume/CV Upload**: Upload new PDF resume directly from admin to replace `resume.pdf` on the live site.
- 💼 **Experience Timeline Manager**: Manage work experience entries.
- 📥 **Inquiries Inbox**: View contact messages sent by recruiters/clients.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library & Language**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Styling & Animations**: [Tailwind CSS](https://tailwindcss.com/), [Framer Motion](https://www.framer.com/motion/)
- **Database & ORM**: [Prisma ORM](https://www.prisma.io/), [SQLite](https://www.sqlite.org/)
- **Icons & Alerts**: [Lucide React](https://lucide.dev/), [React Hot Toast](https://react-hot-toast.com/)

---

## ⚡ Local Setup Guide

### 1. Clone & Install
```bash
git clone https://github.com/rohan-kirdak/Portfolio.git
cd Portfolio
npm install
```

### 2. Configure Environment (`.env`)
Create `.env` in the project root:
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

# Seed initial projects, skills, profile, and timeline
npx tsx prisma/seed.ts
```

### 4. Start Development Server
```bash
npm run dev
```

- 🌐 **Website**: `http://localhost:3000`
- 🔑 **Admin Portal**: `http://localhost:3000/admin` (User: `admin` | Pass: `admin123`)

---

## 🚀 Available Scripts

```bash
npm run dev       # Starts development server
npm run build     # Builds production distribution
npm run start     # Starts production server
```

---

## 👤 Author & Contact

**Rohan Kirdak** — *Full Stack MERN & Next.js Developer*

- 🌐 **Portfolio**: [https://rohan-portfolio.vercel.app](https://rohan-portfolio.vercel.app)
- 🐙 **GitHub**: [@rohan-kirdak](https://github.com/rohan-kirdak)
- 💼 **LinkedIn**: [Rohan Kirdak](https://www.linkedin.com/in/rohan-kirdak-240810254)
- 📧 **Email**: [rohankirdak8756@gmail.com](mailto:rohankirdak8756@gmail.com)

---

Developed with ❤️ by Rohan Kirdak
