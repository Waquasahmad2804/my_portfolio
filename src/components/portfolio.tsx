import { useEffect, useMemo, useState, type FormEvent } from "react";
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "motion/react";
import {
  ArrowDown, ArrowRight, ArrowUp, Blocks, Box, BriefcaseBusiness, CheckCircle2,
  ChevronRight, CircleUserRound, Code2, Container, Database, Download, ExternalLink,
  Gauge, Github, Globe2, GraduationCap, Layers3, Linkedin, Mail, MapPin, Menu,
  Moon, Network, PanelTop, ServerCog, ShieldCheck, ShoppingCart, Sparkles, Sun,
  TerminalSquare, Workflow, X, Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import vmAcademy from "@/assets/vm-academy.jpg";
import villageMyCity from "@/assets/village-my-city.jpg";
import saPro from "@/assets/sa-pro.jpg";
import gratLo from "@/assets/grat-lo.jpg";
import resumePdf from "@/assets/waquas-ahmad-resume.pdf.asset.json";

const navItems = ["About", "Stack", "Work", "Experience", "Services", "Contact"];
const stackGroups = [
  { title: "Frontend", icon: PanelTop, items: ["React.js", "Next.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Material UI"] },
  { title: "Backend", icon: ServerCog, items: ["PHP", "Laravel", "Node.js", "Express.js"] },
  { title: "Database", icon: Database, items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"] },
  { title: "Tools & systems", icon: Container, items: ["Git", "GitHub", "Docker", "REST APIs", "JWT", "WordPress", "WooCommerce"] },
];
const projects = [
  { title: "VM Academy", category: "Education", image: vmAcademy, number: "01", description: "A comprehensive education and college management platform connecting admissions, courses, enquiries, recruiters, scholarships, and institutional content.", tech: ["Laravel", "React", "MySQL", "REST API"] },
  { title: "Village My City", category: "Enterprise", image: villageMyCity, number: "02", description: "A multi-module business and community platform engineered around enterprise dashboards, connected APIs, and scalable operational workflows.", tech: ["Node.js", "React", "PostgreSQL", "API"] },
  { title: "SA Pro", category: "Business", image: saPro, number: "03", description: "Oil and lubrication operations software covering inventory, procurement, sales, invoicing, vendors, customers, reporting, and role-based access.", tech: ["Laravel", "JavaScript", "MySQL", "RBAC"] },
  { title: "Grat-Lo", category: "SaaS", image: gratLo, number: "04", description: "A membership and digital card SaaS with offers, events, ticketing, QR generation, vendor management, and role-specific dashboards.", tech: ["Next.js", "Node.js", "PostgreSQL", "JWT"] },
];
const capabilities = [
  ["SaaS Platforms", Layers3], ["Enterprise Applications", BriefcaseBusiness], ["CRM / ERP Systems", Workflow], ["Admin Dashboards", PanelTop],
  ["REST APIs", Network], ["E-commerce Platforms", ShoppingCart], ["Education Platforms", GraduationCap], ["Business Systems", Blocks],
] as const;
const services = [
  ["Full-Stack Development", "End-to-end web products from data model to polished interface.", Code2],
  ["Laravel Development", "Reliable business logic, secure architecture, and maintainable PHP systems.", Box],
  ["React Development", "Fast, accessible interfaces built around real user workflows.", PanelTop],
  ["API Development", "Secure REST APIs designed for clean integrations and long-term scale.", Network],
  ["SaaS Development", "Multi-role platforms, subscriptions, workflows, and operational dashboards.", Layers3],
  ["Database Architecture", "Practical schemas, query optimization, and dependable data models.", Database],
  ["Existing App Development", "Feature delivery and modernization inside established codebases.", Workflow],
  ["Performance Optimization", "Measured improvements across loading, queries, and runtime behavior.", Gauge],
] as const;

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div className={className} initial={reduced ? false : { opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: .65, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}
function SectionTitle({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return <Reveal className="section-heading"><span className="eyebrow"><span />{eyebrow}</span><div className="section-title-row"><h2>{title}</h2>{copy && <p>{copy}</p>}</div></Reveal>;
}
function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0); const ref = useMemo(() => ({ current: null as HTMLSpanElement | null }), []); const inView = useInView(ref, { once: true });
  useEffect(() => { if (!inView) return; let frame = 0; const start = performance.now(); const run = (now: number) => { const p = Math.min((now - start) / 900, 1); setCount(Math.round(value * (1 - Math.pow(1 - p, 3)))); if (p < 1) frame = requestAnimationFrame(run); }; frame = requestAnimationFrame(run); return () => cancelAnimationFrame(frame); }, [inView, value]);
  return <span ref={ref}>{count}{suffix}</span>;
}

export function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false); const [light, setLight] = useState(false); const [filter, setFilter] = useState("All"); const [active, setActive] = useState("Home"); const [sent, setSent] = useState(false); const [errors, setErrors] = useState<Record<string,string>>({});
  const { scrollYProgress } = useScroll(); const progress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  useEffect(() => { document.documentElement.classList.toggle("light", light); }, [light]);
  useEffect(() => { const ids = ["Home", ...navItems]; const observer = new IntersectionObserver((entries) => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { rootMargin: "-35% 0px -55%" }); ids.forEach(id => { const el = document.getElementById(id); if (el) observer.observe(el); }); return () => observer.disconnect(); }, []);
  const filtered = filter === "All" ? projects : projects.filter(p => p.category === filter);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); const data = new FormData(e.currentTarget); const next: Record<string,string> = {}; if (!String(data.get("name") || "").trim()) next["name"] = "Please enter your name."; if (!/^[^@]+@[^@]+\.[^@]+$/.test(String(data.get("email") || ""))) next["email"] = "Enter a valid email address."; if (String(data.get("message") || "").trim().length < 10) next["message"] = "Please add a little more detail."; setErrors(next); if (!Object.keys(next).length) { window.location.href = `mailto:waquashayat215@gmail.com?subject=${encodeURIComponent(`Portfolio enquiry from ${data.get("name")}`)}&body=${encodeURIComponent(String(data.get("message")))}`; setSent(true); } }
  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  return <div className="site-shell">
    <motion.div className="scroll-progress" style={{ scaleX: progress }} />
    <header className="site-header"><nav className="nav-wrap" aria-label="Main navigation"><a href="#Home" className="monogram" onClick={(e) => { e.preventDefault(); scrollTo("Home"); }} aria-label="Waquas Ahmad, home"><span>W</span>A</a><div className="desktop-nav">{navItems.map(item => <a key={item} href={`#${item}`} className={active === item ? "active" : ""} onClick={(e) => { e.preventDefault(); scrollTo(item); }}>{item}</a>)}</div><div className="nav-actions"><Button variant="ghost" size="icon" aria-label={light ? "Use dark theme" : "Use light theme"} onClick={() => setLight(v => !v)}>{light ? <Moon /> : <Sun />}</Button><Button className="nav-cta" onClick={() => scrollTo("Contact")}>Let’s talk <ArrowUp className="rotate-45" /></Button><Button variant="ghost" size="icon" className="menu-button" aria-label="Open navigation menu" onClick={() => setMenuOpen(v => !v)}>{menuOpen ? <X /> : <Menu />}</Button></div></nav>{menuOpen && <motion.div className="mobile-nav" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>{navItems.map(item => <a key={item} href={`#${item}`} onClick={(e) => { e.preventDefault(); scrollTo(item); }}>{item}</a>)}</motion.div>}</header>

    <main>
      <section id="Home" className="hero section-grid"><div className="hero-grid-pattern" /><motion.div className="hero-copy" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}><div className="availability"><span /> Available for select projects</div><h1>I build scalable <em>digital products</em> & web applications.</h1><p className="hero-lede">Full-Stack Developer with 1.3 years of hands-on experience turning complex business requirements into reliable, high-performance software.</p><div className="hero-actions"><Button size="lg" onClick={() => scrollTo("Work")}>View selected work <ArrowDown /></Button><Button size="lg" variant="outline" onClick={() => scrollTo("Contact")}>Contact me</Button></div><div className="social-row"><a href="https://github.com/Waquasahmad2804" target="_blank" rel="noreferrer"><Github /> GitHub</a><a href="https://www.linkedin.com/in/waquas-ahmad-659b5b32a" target="_blank" rel="noreferrer"><Linkedin /> LinkedIn</a><a href={resumePdf.url} download className="resume-link"><Download /> Download resume</a></div></motion.div>
        <motion.div className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .8, delay: .15 }}><div className="code-window"><div className="window-bar"><span/><span/><span/><p>waquas.engineer / architecture.ts</p></div><div className="code-body"><p><i>01</i><b>const</b> engineer = {'{'}</p><p><i>02</i>&nbsp; role: <strong>“Full-Stack Developer”</strong>,</p><p><i>03</i>&nbsp; focus: [</p><p><i>04</i>&nbsp;&nbsp; <strong>“architecture”</strong>,</p><p><i>05</i>&nbsp;&nbsp; <strong>“scalable APIs”</strong>,</p><p><i>06</i>&nbsp;&nbsp; <strong>“product systems”</strong></p><p><i>07</i>&nbsp; ],</p><p><i>08</i>&nbsp; ships: <b>true</b></p><p><i>09</i>{'}'};</p></div><div className="system-status"><span><CheckCircle2 /> System ready</span><span>PHP · JS · SQL</span></div></div><div className="orbit orbit-one"><Database /></div><div className="orbit orbit-two"><Code2 /></div></motion.div>
        <div className="hero-metrics"><div><strong><Counter value={1} suffix=".3" /></strong><span>Years building</span></div><div><strong><Counter value={4} suffix="+" /></strong><span>Business products</span></div><div><strong><Counter value={12} suffix="+" /></strong><span>Core technologies</span></div><div><strong>Full-cycle</strong><span>Product delivery</span></div></div>
      </section>

      <section id="About" className="page-section"><SectionTitle eyebrow="About" title="Engineering beyond the interface." copy="I build complete products with equal attention to the data model, business logic, API contract, and user experience."/><div className="about-layout"><Reveal className="about-statement"><p>My work sits at the intersection of <strong>software architecture</strong> and <strong>real business operations.</strong></p><p>From admission workflows and inventory systems to SaaS dashboards, I translate complex requirements into maintainable applications people can depend on.</p></Reveal><Reveal className="principles" delay={.1}>{[["01","Think in systems","Design around the whole workflow—not isolated screens."],["02","Build for change","Keep architecture clear enough to evolve with the business."],["03","Own the outcome","Work across backend, frontend, data, deployment, and maintenance."]].map(([n,t,c]) => <div key={n}><span>{n}</span><h3>{t}</h3><p>{c}</p></div>)}</Reveal></div></section>

      <section id="Stack" className="page-section muted-band"><SectionTitle eyebrow="Technology" title="A practical stack for complete products." copy="Selected for reliability, speed of delivery, and long-term maintainability."/><div className="stack-grid">{stackGroups.map((group, i) => <Reveal key={group.title} delay={i*.06} className="stack-card"><div className="stack-icon"><group.icon /></div><h3>{group.title}</h3><div>{group.items.map(item => <span key={item}>{item}</span>)}</div></Reveal>)}</div></section>

      <section id="Work" className="page-section"><SectionTitle eyebrow="Selected work" title="Products built around real operations." copy="Four systems spanning education, community, inventory, membership, and enterprise workflows."/><div className="filter-row" role="group" aria-label="Filter projects">{["All","Education","Enterprise","Business","SaaS"].map(item => <Button key={item} variant={filter === item ? "default" : "ghost"} size="sm" onClick={() => setFilter(item)}>{item}</Button>)}</div><motion.div layout className="project-list">{filtered.map((project, i) => <motion.article layout key={project.title} className="project-card" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i*.05 }}><div className="project-image"><img src={project.image} alt={`${project.title} product dashboard preview`} loading="lazy" width={1408} height={912}/><span>{project.category}</span></div><div className="project-content"><div className="project-number">PROJECT / {project.number}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tech-badges">{project.tech.map(t => <span key={t}>{t}</span>)}</div><div className="project-links"><span><Github /> Repository private</span><span><ExternalLink /> Case study soon</span></div></div></motion.article>)}</motion.div></section>

      <section id="Experience" className="page-section muted-band"><SectionTitle eyebrow="Experience" title="Full-stack ownership, from idea to operations." copy="Hands-on delivery across the entire application lifecycle."/><div className="experience-layout"><Reveal className="experience-summary"><span>2025 — Present</span><h3>Full-Stack Developer</h3><p>Building and evolving business-critical web applications with PHP, Laravel, Node.js, React, and relational databases.</p><div className="role-chip"><BriefcaseBusiness /> 1.3 years of professional practice</div></Reveal><Reveal className="timeline" delay={.1}>{["Full-stack application development","Backend architecture & REST APIs","Database design & optimization","Admin dashboards & role-based systems","Third-party & payment integrations","Performance, deployment & maintenance","Team collaboration & code reviews"].map((item,i) => <div key={item}><span>{String(i+1).padStart(2,"0")}</span><p>{item}</p><ChevronRight /></div>)}</Reveal></div></section>

      <section className="page-section"><SectionTitle eyebrow="Capabilities" title="What I build."/><div className="capability-grid">{capabilities.map(([name, Icon],i) => <Reveal className="capability-card" key={name} delay={i*.035}><Icon /><span>{name}</span><ArrowUp /></Reveal>)}</div></section>

      <section className="page-section github-section"><SectionTitle eyebrow="Open source" title="Coding activity, made transparent." copy="A structured overview ready to connect to live GitHub data."/><div className="github-layout"><Reveal className="github-profile"><div className="github-head"><div className="github-avatar"><Github /></div><div><strong>Waquasahmad2804</strong><span>Full-Stack Developer</span></div><a href="https://github.com/Waquasahmad2804" target="_blank" rel="noreferrer" aria-label="Open GitHub profile"><ExternalLink /></a></div><p>Building business applications, APIs, dashboards, and scalable digital products.</p><div className="github-stats"><div><strong>12+</strong><span>Technologies</span></div><div><strong>4</strong><span>Featured builds</span></div><div><strong>100%</strong><span>Product focus</span></div></div></Reveal><Reveal className="contribution-card" delay={.1}><div className="contribution-head"><span>Contribution activity</span><span>Last 12 months</span></div><div className="heatmap">{Array.from({length: 84}).map((_,i) => <i key={i} data-level={(i*7+i%5)%5}/>)}</div><div className="language-bars"><span><i style={{width:"36%"}}/>PHP</span><span><i style={{width:"29%"}}/>JavaScript</span><span><i style={{width:"21%"}}/>TypeScript</span><span><i style={{width:"14%"}}/>CSS</span></div><small>Representative data · live API connection ready</small></Reveal></div></section>

      <section id="Services" className="page-section muted-band"><SectionTitle eyebrow="Services" title="From architecture to shipped product." copy="Focused engineering support for teams that need dependable software, not just code."/><div className="services-grid">{services.map(([title,desc,Icon],i) => <Reveal className="service-card" key={title} delay={i*.04}><span>{String(i+1).padStart(2,"0")}</span><Icon/><h3>{title}</h3><p>{desc}</p></Reveal>)}</div></section>

      <section id="Contact" className="contact-section"><div className="contact-inner"><Reveal className="contact-copy"><span className="eyebrow"><span/>Start a conversation</span><h2>Have a product to build or a system to improve?</h2><p>Tell me what you’re working on. I’m always open to thoughtful products, serious engineering challenges, and strong teams.</p><div className="contact-details"><a href="mailto:waquashayat215@gmail.com"><Mail/>waquashayat215@gmail.com</a><span><MapPin/>Jamshedpur, Jharkhand, India</span><a href="https://www.linkedin.com/in/waquas-ahmad-659b5b32a" target="_blank" rel="noreferrer"><Linkedin/>LinkedIn</a><a href="https://github.com/Waquasahmad2804" target="_blank" rel="noreferrer"><Github/>GitHub</a></div></Reveal><Reveal className="contact-form-wrap" delay={.1}><form onSubmit={submit} noValidate><div><label htmlFor="name">Name</label><Input id="name" name="name" placeholder="Your name" aria-invalid={!!errors["name"]}/>{errors["name"] && <small>{errors["name"]}</small>}</div><div><label htmlFor="email">Email</label><Input id="email" name="email" type="email" placeholder="you@company.com" aria-invalid={!!errors["email"]}/>{errors["email"] && <small>{errors["email"]}</small>}</div><div><label htmlFor="message">Message</label><Textarea id="message" name="message" placeholder="Tell me about the product, timeline, and challenge…" rows={6} aria-invalid={!!errors["message"]}/>{errors["message"] && <small>{errors["message"]}</small>}</div><Button type="submit" size="lg">Send message <ArrowRight /></Button>{sent && <p className="form-success"><CheckCircle2/>Your email app is ready with the message.</p>}</form></Reveal></div></section>
    </main>
    <footer><a href="#Home" className="monogram" onClick={(e) => {e.preventDefault();scrollTo("Home")}}><span>W</span>A</a><p>Designed & engineered by Waquas Ahmad.</p><span>© 2026</span></footer>
    <Button className="back-top" size="icon" aria-label="Back to top" onClick={() => scrollTo("Home")}><ArrowUp /></Button>
  </div>;
}
