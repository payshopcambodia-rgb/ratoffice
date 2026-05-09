import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Code2,
  CreditCard,
  ExternalLink,
  Facebook,
  Github,
  GraduationCap,
  HeartHandshake,
  Loader2,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Rocket,
  Send,
  Sparkles,
  X,
  XCircle,
} from 'lucide-react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
const PAYMENT_DURATION_SECONDS = 180;

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Education', href: '#education' },
  { label: 'Activities', href: '#activities' },
  { label: 'Support Me', href: '#support-me' },
  { label: 'Contact', href: '#contact' },
];

const suggestedAmounts = [4000, 8000, 12000, 20000];

const skills = [
  { name: 'HTML', icon: Code2, color: 'text-orange-600' },
  { name: 'CSS', icon: Sparkles, color: 'text-blue-600' },
  { name: 'JavaScript', icon: Code2, color: 'text-yellow-600' },
  { name: 'React', icon: Rocket, color: 'text-cyan-600' },
  { name: 'Tailwind CSS', icon: Sparkles, color: 'text-sky-600' },
  { name: 'Git', icon: Github, color: 'text-slate-700' },
  { name: 'GitHub', icon: Github, color: 'text-zinc-800' },
  { name: 'Firebase', icon: Rocket, color: 'text-amber-600' },
  { name: 'Node.js', icon: Code2, color: 'text-green-700' },
];

const projects = [
  {
    title: 'Campus Event Hub',
    description:
      'A responsive event discovery app for students to browse club events, save favorites, and register quickly.',
    stack: ['React', 'Tailwind', 'Firebase'],
    accent: 'from-cambodia-blue to-cyan-400',
  },
  {
    title: 'Khmer Recipe Finder',
    description:
      'A clean recipe interface with search, filters, and mobile-first cards for local dishes and cooking notes.',
    stack: ['JavaScript', 'CSS', 'API'],
    accent: 'from-cambodia-red to-rose-400',
  },
  {
    title: 'Study Task Board',
    description:
      'A Kanban-style planner that helps students organize coursework, deadlines, and weekly learning goals.',
    stack: ['React', 'LocalStorage', 'UX'],
    accent: 'from-emerald-500 to-teal-400',
  },
  {
    title: 'Portfolio CMS Mockup',
    description:
      'A frontend dashboard concept for editing profile details, project cards, and social links from one place.',
    stack: ['React', 'Tailwind', 'Charts'],
    accent: 'from-violet-500 to-indigo-400',
  },
  {
    title: 'Volunteer Landing Page',
    description:
      'A polished landing page concept for youth volunteer programs with clear calls to action and accessible forms.',
    stack: ['HTML', 'CSS', 'A11y'],
    accent: 'from-amber-500 to-orange-400',
  },
  {
    title: 'Weather Mini App',
    description:
      'A compact weather UI with city search, forecast states, and friendly empty/error handling.',
    stack: ['JavaScript', 'API', 'UI'],
    accent: 'from-sky-500 to-blue-500',
  },
];

const timeline = [
  {
    title: 'Frontend Intern',
    meta: 'Local Startup · 2026',
    text: 'Built reusable React components, improved responsive layouts, and collaborated with designers on UI polish.',
    icon: BriefcaseBusiness,
  },
  {
    title: 'Coding Club Member',
    meta: 'University Developer Club · 2025 - Present',
    text: 'Joined weekly problem-solving sessions, peer code reviews, and small team projects.',
    icon: Code2,
  },
  {
    title: 'Hackathon Participant',
    meta: 'Student Innovation Challenge · 2025',
    text: 'Designed and shipped a prototype that helped students discover learning resources faster.',
    icon: Rocket,
  },
  {
    title: 'Volunteer Web Support',
    meta: 'Community Project · 2024',
    text: 'Helped maintain a simple information website for a youth volunteer group.',
    icon: Sparkles,
  },
];

const socials = [
  { label: 'GitHub', icon: Github, href: 'https://github.com/' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/' },
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com/' },
  { label: 'Telegram', icon: MessageCircle, href: 'https://t.me/' },
];

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function SectionHeader({ eyebrow, title, copy }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
    >
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-title">{title}</h2>
      <p className="section-copy">{copy}</p>
    </motion.div>
  );
}

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/70 bg-white/85 backdrop-blur-xl">
      <nav className="section-shell flex h-16 items-center justify-between">
        <a href="#home" className="focus-ring flex items-center gap-3 rounded-full">
          <span className="grid size-10 place-items-center rounded-full bg-ink text-sm font-extrabold text-white">
            KD
          </span>
          <span className="font-bold text-ink">Kosal Dev</span>
        </a>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="focus-ring rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        <a
          href="#support-me"
          className="focus-ring hidden rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-cambodia-red hover:shadow-glow lg:inline-flex"
        >
          Support
        </a>

        <button
          type="button"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="focus-ring grid size-10 place-items-center rounded-full border border-slate-200 bg-white text-ink lg:hidden"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-slate-100 bg-white lg:hidden"
        >
          <div className="section-shell grid gap-2 py-4">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                {item.label}
              </a>
            ))}
          </div>
        </motion.div>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="home" className="relative isolate overflow-hidden pt-28 sm:pt-32">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_top_left,rgba(215,32,39,0.16),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(3,46,161,0.15),transparent_30%),linear-gradient(135deg,#ffffff,#f8fafc_48%,#eef4ff)]" />
      <div className="absolute inset-0 -z-10 bg-khmer-grid bg-[length:44px_44px]" />

      <motion.div
        className="absolute right-[8%] top-28 -z-10 h-28 w-28 rounded-[28px] bg-cambodia-red/15 blur-sm"
        animate={{ y: [0, 20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-24 left-[6%] -z-10 h-24 w-24 rounded-full bg-cambodia-blue/15 blur-sm"
        animate={{ y: [0, -18, 0], x: [0, 12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="section-shell grid min-h-[calc(100vh-7rem)] items-center gap-10 pb-16 lg:grid-cols-[1.05fr_0.95fr] lg:pb-24">
        <motion.div variants={stagger} initial="hidden" animate="show">
          <motion.span
            variants={fadeUp}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-cambodia-red/15 bg-white/85 px-4 py-2 text-sm font-bold text-cambodia-red shadow-sm"
          >
            <Sparkles size={16} />
            សួស្តី, I build thoughtful web experiences
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-5xl font-extrabold tracking-normal text-ink sm:text-6xl lg:text-7xl"
          >
            Kosal Chan
            <span className="animated-gradient mt-2 block bg-gradient-to-r from-cambodia-red via-cambodia-blue to-cambodia-gold bg-clip-text text-transparent">
              Student Developer from Cambodia
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            I am a student developer passionate about web development, problem solving, and
            learning modern technologies. I enjoy turning ideas into useful, accessible, and
            polished digital products.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#projects"
              className="focus-ring group inline-flex items-center justify-center gap-2 rounded-full bg-cambodia-red px-6 py-3 font-bold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-red-700"
            >
              View Projects
              <ArrowRight size={18} className="transition group-hover:translate-x-1" />
            </a>
            <a
              href="#support-me"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-6 py-3 font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-cambodia-blue hover:text-cambodia-blue"
            >
              Support Me
              <HeartHandshake size={18} />
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="mt-9 grid max-w-xl grid-cols-3 gap-3">
            {[
              ['12+', 'Projects'],
              ['2+', 'Years Learning'],
              ['5+', 'Team Builds'],
            ].map(([value, label]) => (
              <div key={label} className="glass-panel rounded-2xl p-4">
                <div className="text-2xl font-extrabold text-ink">{value}</div>
                <div className="mt-1 text-sm font-medium text-muted">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.25 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-cambodia-red/20 via-white to-cambodia-blue/20 blur-2xl" />
          <div className="glass-panel overflow-hidden rounded-[2rem]">
            <div className="flex items-center gap-2 border-b border-slate-100 px-5 py-4">
              <span className="size-3 rounded-full bg-cambodia-red" />
              <span className="size-3 rounded-full bg-cambodia-gold" />
              <span className="size-3 rounded-full bg-emerald-500" />
              <span className="ml-auto text-xs font-semibold text-muted">portfolio.jsx</span>
            </div>
            <div className="p-5 sm:p-7">
              <div className="mb-6 flex items-center gap-4">
                <div className="grid size-20 place-items-center rounded-3xl bg-gradient-to-br from-cambodia-blue to-cambodia-red text-3xl font-extrabold text-white shadow-soft">
                  K
                </div>
                <div>
                  <div className="text-xl font-extrabold text-ink">Profile Image Space</div>
                  <div className="mt-1 flex items-center gap-2 text-sm font-medium text-muted">
                    <MapPin size={15} />
                    Phnom Penh, Cambodia
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-slate-950 p-5 font-mono text-sm leading-7 text-slate-200">
                <p>
                  <span className="text-sky-300">const</span>{' '}
                  <span className="text-emerald-300">studentDeveloper</span> = {'{'}
                </p>
                <p className="pl-5">
                  focus: <span className="text-amber-200">&apos;frontend&apos;</span>,
                </p>
                <p className="pl-5">
                  values: <span className="text-amber-200">&apos;clean UX, reliable code&apos;</span>,
                </p>
                <p className="pl-5">
                  location: <span className="text-amber-200">&apos;Cambodia&apos;</span>
                </p>
                <p>{'};'}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-br from-cambodia-blue/12 to-cambodia-red/12" />
          <div className="glass-panel overflow-hidden rounded-[2rem] p-4">
            <div className="aspect-[4/5] rounded-[1.5rem] bg-[linear-gradient(145deg,rgba(3,46,161,0.88),rgba(215,25,32,0.82)),url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80')] bg-cover bg-center">
              <div className="flex h-full items-end p-6">
                <div className="rounded-2xl bg-white/90 p-4 shadow-soft backdrop-blur">
                  <p className="text-sm font-bold text-cambodia-red">Open to internships</p>
                  <p className="mt-1 text-sm text-muted">Frontend, React, and UI-focused projects</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <SectionHeader
            eyebrow="About Me"
            title="Curious learner, practical builder, and detail-focused teammate."
            copy="I am currently studying software development and sharpening my skills through coursework, personal projects, coding clubs, and real-world practice."
          />

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="mt-8 grid gap-4 sm:grid-cols-2"
          >
            {[
              {
                title: 'What I Enjoy',
                text: 'Building responsive interfaces, improving user flows, and solving problems with simple code.',
              },
              {
                title: 'How I Learn',
                text: 'Reading docs, joining coding challenges, asking for feedback, and shipping small projects often.',
              },
              {
                title: 'Current Focus',
                text: 'React, Tailwind CSS, Firebase, accessibility, component patterns, and frontend performance.',
              },
              {
                title: 'Goal',
                text: 'Join a team where I can contribute, learn from experienced developers, and build useful products.',
              },
            ].map((item) => (
              <motion.article
                key={item.title}
                variants={fadeUp}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
              >
                <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-3 leading-7 text-muted">{item.text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Skills"
          title="Tools I use to turn ideas into reliable interfaces."
          copy="These are the technologies I practice most often across personal projects, school assignments, and team builds."
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map(({ name, icon: Icon, color }) => (
            <motion.article
              key={name}
              variants={fadeUp}
              whileHover={{ y: -6, scale: 1.02 }}
              className="group flex items-center gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5 transition hover:border-cambodia-red/30 hover:bg-white hover:shadow-soft"
            >
              <div className="grid size-12 place-items-center rounded-2xl bg-white shadow-sm transition group-hover:scale-110">
                <Icon className={color} size={24} />
              </div>
              <div>
                <h3 className="font-extrabold text-ink">{name}</h3>
                <p className="mt-1 text-sm font-medium text-muted">Practical project experience</p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="py-20 sm:py-24">
      <div className="section-shell">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Projects"
            title="Student projects with a product-minded approach."
            copy="Each card is structured for a screenshot, short context, stack tags, and links to source code or a live demo."
          />
          <a
            href="https://github.com/"
            className="focus-ring inline-flex w-fit items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 font-bold text-ink shadow-sm transition hover:-translate-y-0.5 hover:border-cambodia-blue hover:text-cambodia-blue"
          >
            More on GitHub
            <ExternalLink size={17} />
          </a>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((project) => (
            <motion.article
              key={project.title}
              variants={fadeUp}
              whileHover={{ y: -9 }}
              className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:shadow-soft"
            >
              <div className={`relative h-48 bg-gradient-to-br ${project.accent}`}>
                <div className="absolute inset-0 bg-khmer-grid bg-[length:32px_32px] opacity-25" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-white/88 p-4 shadow-soft backdrop-blur">
                  <div className="mb-3 h-2 w-24 rounded-full bg-slate-200" />
                  <div className="grid gap-2">
                    <div className="h-3 rounded-full bg-slate-800/80" />
                    <div className="h-3 w-4/5 rounded-full bg-slate-400" />
                    <div className="h-3 w-2/3 rounded-full bg-slate-300" />
                  </div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold text-ink">{project.title}</h3>
                <p className="mt-3 leading-7 text-muted">{project.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex gap-3">
                  <a
                    href="https://github.com/"
                    className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-950 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-cambodia-red"
                  >
                    <Github size={16} />
                    GitHub
                  </a>
                  <a
                    href="#home"
                    className="focus-ring inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-slate-200 px-4 py-2.5 text-sm font-bold text-ink transition hover:border-cambodia-blue hover:text-cambodia-blue"
                  >
                    <ExternalLink size={16} />
                    Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="bg-white py-20 sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <SectionHeader
          eyebrow="Education"
          title="Learning through university, practice, and project work."
          copy="Replace this placeholder with the student's real school, major, degree, and current study year."
        />

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="rounded-[2rem] border border-slate-200 bg-slate-50 p-6 shadow-sm sm:p-8"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-cambodia-blue text-white shadow-soft">
              <GraduationCap size={28} />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-ink">Royal University of Phnom Penh</h3>
              <p className="mt-2 text-lg font-semibold text-cambodia-red">
                Bachelor of Computer Science · Year 3
              </p>
              <p className="mt-4 leading-8 text-muted">
                My learning journey combines core computer science subjects with hands-on frontend
                projects. I focus on building strong fundamentals in programming, databases, web
                development, teamwork, and communication.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  ['Major', 'Computer Science'],
                  ['Focus', 'Web Development'],
                  ['Journey', '2023 - Present'],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-2xl bg-white p-4 shadow-sm">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">{label}</p>
                    <p className="mt-1 font-extrabold text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Activities() {
  return (
    <section id="activities" className="py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Activities"
          title="Experience built through internships, clubs, and community work."
          copy="Use this timeline to show practical experience, volunteer work, hackathons, freelance jobs, or meaningful school projects."
        />

        <div className="relative mt-12">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-slate-200 sm:block" />
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="grid gap-5"
          >
            {timeline.map(({ title, meta, text, icon: Icon }) => (
              <motion.article
                key={title}
                variants={{
                  hidden: { opacity: 0, x: -28 },
                  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: 'easeOut' } },
                }}
                className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-soft sm:ml-14"
              >
                <div className="absolute -left-[4.6rem] top-6 hidden size-10 place-items-center rounded-full bg-cambodia-red text-white shadow-soft sm:grid">
                  <Icon size={19} />
                </div>
                <div className="mb-4 flex items-center gap-3 sm:hidden">
                  <div className="grid size-10 place-items-center rounded-full bg-cambodia-red text-white">
                    <Icon size={19} />
                  </div>
                  <span className="text-sm font-bold text-muted">{meta}</span>
                </div>
                <div className="hidden items-center gap-2 text-sm font-bold text-muted sm:flex">
                  <CalendarDays size={16} />
                  {meta}
                </div>
                <h3 className="mt-2 text-xl font-extrabold text-ink">{title}</h3>
                <p className="mt-3 leading-7 text-muted">{text}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function formatRiel(amount) {
  return new Intl.NumberFormat('en-US').format(Number(amount || 0));
}

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function StatusBadge({ status }) {
  const statusStyles = {
    IDLE: 'bg-slate-100 text-slate-700 border-slate-200',
    PENDING: 'bg-amber-50 text-amber-700 border-amber-200',
    PAID: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    EXPIRED: 'bg-slate-100 text-slate-600 border-slate-200',
    FAILED: 'bg-red-50 text-red-700 border-red-200',
  };
  const icons = {
    IDLE: CreditCard,
    PENDING: Clock3,
    PAID: CheckCircle2,
    EXPIRED: XCircle,
    FAILED: XCircle,
  };
  const Icon = icons[status] || CreditCard;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-extrabold ${
        statusStyles[status] || statusStyles.IDLE
      }`}
    >
      <Icon size={16} />
      {status}
    </span>
  );
}

function SupportMe() {
  const [amount, setAmount] = useState('8000');
  const [payment, setPayment] = useState(null);
  const [status, setStatus] = useState('IDLE');
  const [message, setMessage] = useState('Choose an amount and generate a Bakong KHQR.');
  const [secondsLeft, setSecondsLeft] = useState(PAYMENT_DURATION_SECONDS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isChecking, setIsChecking] = useState(false);
  const paymentRef = useRef(null);

  const progress = useMemo(
    () => Math.max(0, Math.min(100, (secondsLeft / PAYMENT_DURATION_SECONDS) * 100)),
    [secondsLeft],
  );

  useEffect(() => {
    paymentRef.current = payment;
  }, [payment]);

  useEffect(() => {
    if (!payment || status !== 'PENDING') {
      return undefined;
    }

    const expiresAt = new Date(payment.expires_at).getTime();
    const tick = () => {
      const remaining = Math.max(0, Math.ceil((expiresAt - Date.now()) / 1000));
      setSecondsLeft(remaining);

      if (remaining <= 0) {
        setStatus('EXPIRED');
        setMessage('This KHQR expired. Generate a new QR to support again.');
      }
    };

    tick();
    const timerId = window.setInterval(tick, 1000);
    return () => window.clearInterval(timerId);
  }, [payment, status]);

  useEffect(() => {
    if (!payment || status !== 'PENDING') {
      return undefined;
    }

    let cancelled = false;

    const checkPayment = async () => {
      if (!paymentRef.current || cancelled) {
        return;
      }

      setIsChecking(true);

      try {
        const response = await fetch(`${API_BASE_URL}/api/khqr/status/${paymentRef.current.payment_id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || 'Unable to check payment status.');
        }

        if (cancelled) {
          return;
        }

        setStatus(data.status);
        setMessage(data.message || 'Waiting for Bakong payment confirmation.');

        if (data.expires_at) {
          setPayment((current) => (current ? { ...current, expires_at: data.expires_at } : current));
        }
      } catch (error) {
        if (!cancelled) {
          setStatus('FAILED');
          setMessage(error.message || 'Payment check failed. Please try again.');
        }
      } finally {
        if (!cancelled) {
          setIsChecking(false);
        }
      }
    };

    checkPayment();
    const intervalId = window.setInterval(checkPayment, 5000);

    return () => {
      cancelled = true;
      window.clearInterval(intervalId);
    };
  }, [payment, status]);

  const generateKhqr = async () => {
    const parsedAmount = Number(amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount < 100) {
      setStatus('FAILED');
      setMessage('Please enter a valid amount of at least 100 KHR.');
      return;
    }

    setIsGenerating(true);
    setStatus('PENDING');
    setMessage('Generating secure Bakong KHQR...');
    setPayment(null);
    setSecondsLeft(PAYMENT_DURATION_SECONDS);

    try {
      const response = await fetch(`${API_BASE_URL}/api/khqr/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parsedAmount, currency: 'KHR' }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Unable to create KHQR.');
      }

      setPayment(data);
      setStatus(data.status || 'PENDING');
      setMessage('Scan with Bakong or a KHQR-supported banking app within 3 minutes.');
    } catch (error) {
      setStatus('FAILED');
      setMessage(error.message || 'KHQR generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section id="support-me" className="relative overflow-hidden bg-white py-20 sm:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(215,25,32,0.08),transparent_26%),radial-gradient(circle_at_88%_30%,rgba(3,46,161,0.09),transparent_28%)]" />
      <div className="section-shell relative">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <SectionHeader
              eyebrow="Support Me"
              title="Support my learning journey with Bakong KHQR."
              copy="Your support helps me pay for courses, hosting, learning tools, and time to build more useful student projects."
            />

            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.25 }}
              className="mt-8 grid gap-4 sm:grid-cols-3"
            >
              {[
                ['Secure', 'Token stays on the backend'],
                ['Fast', 'Auto-checks every 5 seconds'],
                ['Local', 'Bakong account in Cambodia'],
              ].map(([title, text]) => (
                <motion.div
                  key={title}
                  variants={fadeUp}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-5"
                >
                  <p className="font-extrabold text-ink">{title}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-[2rem] border border-slate-200 bg-slate-50 p-4 shadow-soft sm:p-6"
          >
            <div className="rounded-[1.5rem] bg-white p-5 sm:p-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="grid size-12 place-items-center rounded-2xl bg-cambodia-red text-white shadow-glow">
                    <HeartHandshake size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-extrabold text-ink">Bakong KHQR</h3>
                    <p className="text-sm font-semibold text-muted">NARAT CHHEAK</p>
                  </div>
                </div>
                <StatusBadge status={status} />
              </div>

              <div className="mt-6">
                <label className="grid gap-2 text-sm font-bold text-slate-700">
                  Amount in KHR
                  <div className="relative">
                    <input
                      type="number"
                      min="100"
                      step="100"
                      value={amount}
                      onChange={(event) => setAmount(event.target.value)}
                      className="focus-ring w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 pr-16 text-lg font-extrabold text-ink"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-extrabold text-muted">
                      KHR
                    </span>
                  </div>
                </label>

                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {suggestedAmounts.map((value) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setAmount(String(value))}
                      className={`focus-ring rounded-2xl border px-3 py-3 text-sm font-extrabold transition hover:-translate-y-0.5 ${
                        Number(amount) === value
                          ? 'border-cambodia-red bg-cambodia-red text-white shadow-glow'
                          : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-cambodia-blue hover:bg-white'
                      }`}
                    >
                      {formatRiel(value)}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={generateKhqr}
                  disabled={isGenerating}
                  className="focus-ring mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3.5 font-extrabold text-white transition hover:-translate-y-0.5 hover:bg-cambodia-red hover:shadow-glow disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isGenerating ? <Loader2 size={18} className="animate-spin" /> : <CreditCard size={18} />}
                  Generate KHQR
                </button>
              </div>

              <motion.div
                key={payment?.payment_id || 'empty'}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-4"
              >
                {payment ? (
                  <div className="grid gap-5 md:grid-cols-[220px_1fr] md:items-center">
                    <div className="mx-auto grid size-56 place-items-center rounded-3xl bg-white p-4 shadow-sm">
                      <img
                        src={payment.qr_image}
                        alt="Bakong KHQR payment code"
                        className="size-full rounded-2xl object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-3">
                        <p className="text-sm font-bold text-muted">Expires in</p>
                        <p className="font-mono text-2xl font-extrabold text-ink">
                          {formatTime(secondsLeft)}
                        </p>
                      </div>
                      <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-200">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-cambodia-red to-cambodia-blue"
                          animate={{ width: `${progress}%` }}
                          transition={{ duration: 0.35 }}
                        />
                      </div>
                      <div className="mt-5 grid gap-3 rounded-2xl bg-white p-4 text-sm">
                        <div className="flex justify-between gap-3">
                          <span className="font-semibold text-muted">Amount</span>
                          <span className="font-extrabold text-ink">
                            {formatRiel(payment.amount)} {payment.currency}
                          </span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="font-semibold text-muted">Merchant</span>
                          <span className="font-extrabold text-ink">{payment.merchant_name}</span>
                        </div>
                        <div className="flex justify-between gap-3">
                          <span className="font-semibold text-muted">Auto check</span>
                          <span className="inline-flex items-center gap-2 font-extrabold text-ink">
                            {isChecking && <Loader2 size={14} className="animate-spin" />}
                            Every 5s
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="grid min-h-56 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white text-center">
                    <div>
                      <CreditCard className="mx-auto text-cambodia-blue" size={36} />
                      <p className="mt-3 font-extrabold text-ink">Your KHQR will appear here</p>
                      <p className="mt-1 text-sm text-muted">Generate a secure 3-minute payment QR.</p>
                    </div>
                  </div>
                )}
              </motion.div>

              <p className="mt-4 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold leading-6 text-slate-600">
                {message}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="bg-slate-950 py-20 text-white sm:py-24">
      <div className="section-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm font-semibold text-cambodia-gold">
            Contact
          </span>
          <h2 className="text-3xl font-extrabold tracking-normal sm:text-4xl lg:text-5xl">
            Let&apos;s build something useful together.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg">
            I am open to internships, student projects, freelance landing pages, and collaborative
            learning opportunities. Send a message and I will reply as soon as I can.
          </p>

          <div className="mt-8 grid gap-3">
            <a
              href="mailto:student@example.com"
              className="focus-ring inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 font-semibold text-white transition hover:border-cambodia-gold/50 hover:bg-white/10"
            >
              <Mail className="text-cambodia-gold" size={20} />
              student@example.com
            </a>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {socials.map(({ label, icon: Icon, href }) => (
                <a
                  key={label}
                  href={href}
                  className="focus-ring flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-4 text-sm font-bold transition hover:-translate-y-0.5 hover:border-cambodia-red/50 hover:bg-white/10"
                >
                  <Icon size={18} />
                  {label}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="rounded-[2rem] border border-white/10 bg-white p-5 text-ink shadow-soft sm:p-7"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Name
              <input
                type="text"
                placeholder="Your name"
                className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-medium text-ink"
              />
            </label>
            <label className="grid gap-2 text-sm font-bold text-slate-700">
              Email
              <input
                type="email"
                placeholder="you@example.com"
                className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-medium text-ink"
              />
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-bold text-slate-700">
            Subject
            <input
              type="text"
              placeholder="Project, internship, or question"
              className="focus-ring rounded-2xl border border-slate-200 px-4 py-3 font-medium text-ink"
            />
          </label>
          <label className="mt-5 grid gap-2 text-sm font-bold text-slate-700">
            Message
            <textarea
              rows="5"
              placeholder="Tell me a little about what you are building..."
              className="focus-ring resize-none rounded-2xl border border-slate-200 px-4 py-3 font-medium text-ink"
            />
          </label>
          <button
            type="button"
            className="focus-ring mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-cambodia-red px-6 py-3.5 font-extrabold text-white shadow-glow transition hover:-translate-y-0.5 hover:bg-red-700"
          >
            Send Message
            <Send size={18} />
          </button>
          <p className="mt-4 text-center text-sm font-medium text-muted">
            Form UI only. Connect it to your preferred service when ready.
          </p>
        </motion.form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8">
      <div className="section-shell flex flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="text-sm font-medium text-muted">
          Copyright © 2026 Kosal Chan. Built with React and Tailwind CSS.
        </p>
        <div className="flex items-center gap-2">
          {socials.map(({ label, icon: Icon, href }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="focus-ring grid size-10 place-items-center rounded-full border border-slate-200 text-slate-600 transition hover:border-cambodia-red hover:text-cambodia-red"
            >
              <Icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Education />
        <Activities />
        <SupportMe />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
