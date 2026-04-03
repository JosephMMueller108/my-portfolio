import React, { useState, useEffect, useRef } from "react";
import "./App.css";

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  year: string;
  featured?: boolean;
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const PROJECTS: Project[] = [
  {
    title: "Cornhusker Billiards",
    description:
      "Designed and developed a full-stack product customization platform for a Nebraska billiards retailer built on WordPress, enhanced with custom HTML5, CSS, JavaScript, and PHP. Customers can interactively configure pool tables and shuffleboards — selecting custom felt colors, wood finishes, leg styles, and sizing options — before submitting a quote request. The project involved custom WordPress block injection, dynamic form handling via PHP, and JavaScript-driven UI state to deliver a seamless showroom-to-screen experience.",
    tags: ["WordPress", "HTML5", "CSS", "JavaScript", "PHP"],
    link: "#",
    year: "2026",
    featured: true,
  },
  {
    title: "Barstool & Patio Gallery",
    description:
      "Built a full-stack e-commerce and customization website for a Lincoln, Nebraska outdoor furniture and bar seating retailer on WordPress, extended with custom HTML5, CSS, JavaScript, and PHP. The site features a structured product catalog with category filtering, a custom inquiry flow for special orders, and dynamic page sections built with injected HTML and JavaScript to go beyond WordPress's native capabilities. Python scripting was used for product data processing and inventory management automation.",
    tags: ["WordPress", "HTML5", "CSS", "JavaScript", "PHP", "Python"],
    link: "#",
    year: "2026",
    featured: true,
  },
  {
    title: "Mueller Recreational Products",
    description:
      "Developed a full-stack product customization website for an Iowa recreational products company, built on WordPress with deep custom development using HTML5, CSS, JavaScript, PHP, and Python. The centerpiece is a fully interactive pool table and shuffleboard configurator that lets customers personalize size, finish, felt color, and accessories in real time. PHP handles backend form submissions and quote routing, while Python powers product data pipelines and configuration logic behind the scenes.",
    tags: ["WordPress", "HTML5", "CSS", "JavaScript", "PHP", "Python"],
    link: "#",
    year: "2026",
  },
];

// ─── HOOKS ────────────────────────────────────────────────────────────────────

function useInView(
  ref: React.RefObject<HTMLElement | null>,
  threshold = 0.12
): boolean {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return inView;
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    inView ? 1 : 0,
        transform:  inView ? "translateY(0)" : "translateY(24px)",
        transition: `opacity var(--transition-reveal) ${delay}s,
                     transform var(--transition-reveal) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Tag({ label }: { label: string }) {
  return <span className="tag-pill">{label}</span>;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="section-label mb-2">{children}</p>;
}

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <FadeUp delay={index * 0.08}>
      <a href={project.link} className="block h-full no-underline">
        <div className="project-card">

          {project.featured && (
            <span className="badge-featured">Featured</span>
          )}

          <div className="project-card__thumbnail">
            <span className="project-card__thumbnail-label">[ screenshot ]</span>
          </div>

          <div className="flex-1 flex flex-col gap-3">
            <div className="flex items-baseline justify-between gap-2">
              <h3 className="project-card__title">{project.title}</h3>
              <span className="project-card__year">{project.year}</span>
            </div>
            <p className="project-card__desc">{project.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {project.tags.map((t) => <Tag key={t} label={t} />)}
          </div>

          <div className="project-card__cta">
            View project
            <span className="project-card__arrow">→</span>
          </div>

        </div>
      </a>
    </FadeUp>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("joseph.mueller48@gmail.com").then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    });
  };

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-800 font-sans">
      <main className="max-w-5xl mx-auto px-5 sm:px-8">

        {/* ── ABOUT ───────────────────────────────────────────────────────── */}
        <section className="py-24">
          <div className="about-card grid sm:grid-cols-5 gap-10">

            <FadeUp className="sm:col-span-2 flex flex-col gap-4">
              <img
                src="/35571397.jpg"
                alt="Joseph Mueller"
                className="about-avatar-placeholder"
              />
              <div>
                <p className="font-semibold text-zinc-800">Joseph Mueller</p>
                <p className="font-mono text-sm text-zinc-400">Software Engineering Junior · Lincoln, NE</p>
              </div>
            </FadeUp>

            <FadeUp delay={0.15} className="sm:col-span-3 flex flex-col gap-5 justify-center">
              <SectionLabel>01 / About</SectionLabel>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-zinc-900">
                A bit about me
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-zinc-500 leading-relaxed">
                <p>
                  I'm a junior Software Engineering student based in Lincoln, Nebraska,
                  focused on building full-stack web applications that solve
                  real problems for real businesses.
                </p>
                <p>
                  My work spans e-commerce and product customization platforms built
                  on WordPress, extended with custom HTML5, CSS, JavaScript, PHP,
                  and Python to go well beyond what any template can offer out of the box.
                </p>
                <p>
                  Outside of coding I'm drawn to the intersection of design and
                  functionality — how a well-built interface can make something
                  complex feel effortless for the end user.
                </p>
              </div>
              <div className="flex gap-4 pt-2 flex-wrap">
                <a href="https://github.com/JosephMMueller108" className="about-social-link">GitHub ↗</a>
                <a href="https://linkedin.com/in/joseph-mueller-025408271/" className="about-social-link">LinkedIn ↗</a>
              </div>
            </FadeUp>

          </div>
        </section>

        {/* ── WORK ────────────────────────────────────────────────────────── */}
        <section id="work" className="py-24">
          <FadeUp>
            <div className="flex items-end justify-between mb-12 gap-4">
              <div>
                <SectionLabel>02 / Work</SectionLabel>
                <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-zinc-900">
                  Selected projects
                </h2>
              </div>
              <a
                href="https://github.com/JosephMMueller108"
                className="hidden sm:inline-flex items-center gap-1 font-mono text-sm
                           text-zinc-400 hover:text-indigo-600 transition-colors shrink-0 no-underline"
              >
                GitHub ↗
              </a>
            </div>
          </FadeUp>

          <div className="grid sm:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.title} project={project} index={i} />
            ))}
          </div>
        </section>

        {/* ── CONTACT ─────────────────────────────────────────────────────── */}
        <section id="contact" className="py-24 pb-32">
          <FadeUp>
            <div className="contact-card">
              <SectionLabel>04 / Contact</SectionLabel>

              <h2 className="font-serif text-3xl sm:text-5xl font-semibold leading-tight">
                Let's build something
                <br />
                <span className="text-indigo-400">together.</span>
              </h2>

              <p className="text-zinc-400 max-w-md text-sm sm:text-base leading-relaxed">
                Whether it's a new project, a job opportunity, or just a
                conversation about an idea — my inbox is open.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
                <a href="mailto:joseph.mueller48@gmail.com" className="btn-contact-primary">
                  Send an email
                </a>
                <button className="btn-contact-outline" onClick={handleCopyEmail}>
                  {copySuccess ? "✓ Copied!" : "Copy address"}
                </button>
              </div>

              <p className="font-mono text-xs text-zinc-500">
                joseph.mueller48@gmail.com
              </p>
            </div>
          </FadeUp>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-200 bg-zinc-50">
        <div className="max-w-5xl mx-auto px-5 sm:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-mono text-xs text-zinc-400">
            © {new Date().getFullYear()} Joseph Mueller · Built with React + Tailwind
          </p>
          <div className="flex gap-5">
            <a href="https://github.com/JosephMMueller108" className="footer-link">GitHub</a>
            <a href="https://linkedin.com/in/joseph-mueller-025408271/" className="footer-link">LinkedIn</a>
          </div>
        </div>
      </footer>

    </div>
  );
}