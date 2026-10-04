import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
const PORTRAIT = "/images/stefan-badev.webp";
import { cv, journey, links, projects, sections, t, type Lang, type Project, type SectionId } from "@/data/content";

const TITLE = "Stefan Badev | Junior AI & Automation Developer";
const DESC =
  "Junior AI & Automation Developer focused on LLM integrations, RAG, AI agents, workflow automation and full-stack development.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESC },
    ],
  }),
  component: Index,
});

/* ---------- language ---------- */
const LangCtx = createContext<{ lang: Lang; setLang: (l: Lang) => void }>({ lang: "en", setLang: () => {} });
const useLang = () => {
  const { lang, setLang } = useContext(LangCtx);
  return { lang, setLang, tr: t[lang] };
};

function LangSwitch({ dark }: { dark?: boolean }) {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="flex items-center font-mono text-xs">
      {(["en", "bg"] as Lang[]).map((l, i) => (
        <span key={l} className="flex items-center">
          {i > 0 && <span aria-hidden="true" className={dark ? "text-ink-border" : "text-border"}>/</span>}
          <button
            type="button"
            onClick={() => setLang(l)}
            aria-pressed={lang === l}
            className={`min-h-11 min-w-11 px-1 tracking-wider transition-colors ${
              lang === l
                ? dark ? "text-ink-foreground underline decoration-gold underline-offset-4" : "text-foreground underline decoration-gold underline-offset-4"
                : dark ? "text-ink-muted hover:text-ink-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {l === "en" ? "EN" : "БГ"}
          </button>
        </span>
      ))}
    </div>
  );
}

/* ---------- small pieces ---------- */
function ExtLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const { tr } = useLang();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {tr.newTab}</span>
    </a>
  );
}

function Socials({ dark }: { dark?: boolean }) {
  const cls = `inline-flex min-h-11 items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors ${
    dark ? "text-ink-muted hover:text-ink-foreground" : "text-muted-foreground hover:text-foreground"
  }`;
  return (
    <div className="flex items-center gap-5">
      <ExtLink href={links.github} className={cls}><span className="link-line">GitHub</span><span aria-hidden="true" className="text-gold">↗</span></ExtLink>
      <ExtLink href={links.linkedin} className={cls}><span className="link-line">LinkedIn</span><span aria-hidden="true" className="text-gold">↗</span></ExtLink>
    </div>
  );
}

const base = "group inline-flex min-h-11 items-center gap-3 rounded-[3px] px-5 text-sm font-medium tracking-wide transition-colors";
const btnInkPrimary = `${base} bg-ink-foreground text-ink hover:bg-gold`;
const btnInkGhost = `${base} border border-ink-border text-ink-foreground hover:border-gold`;
const btnPrimary = `${base} bg-ink text-ink-foreground hover:bg-primary`;
const btnGhost = `${base} border border-foreground/25 text-foreground hover:border-foreground`;
const Arrow = ({ d = "→" }: { d?: string }) => (
  <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">{d}</span>
);

function Workflow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[12px] text-foreground/85">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-2">
          <span>{s}</span>
          {i < steps.length - 1 && <span aria-hidden="true" className="text-gold">→</span>}
        </li>
      ))}
    </ol>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-[12px] text-muted-foreground">
      {items.map((i, n) => (
        <li key={i}>{i}{n < items.length - 1 && <span aria-hidden="true" className="ml-3 text-border">/</span>}</li>
      ))}
    </ul>
  );
}

function Meta({ children }: { children: ReactNode }) {
  return <h4 className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{children}</h4>;
}

function Actions({ p }: { p: Project }) {
  const { tr } = useLang();
  if (!p.liveUrl && !p.githubUrl && !p.colabUrl) return null;
  return (
    <div className="space-y-2 pt-1">
      <div className="flex flex-wrap gap-3">
        {p.colabUrl && <ExtLink href={p.colabUrl} className={btnPrimary}>{tr.openColab}<Arrow d="↗" /></ExtLink>}
        {p.liveUrl && <ExtLink href={p.liveUrl} className={btnPrimary}>{tr.liveDemo}<Arrow d="↗" /></ExtLink>}
        {p.githubUrl && <ExtLink href={p.githubUrl} className={btnGhost}>{tr.viewCode}<Arrow d="↗" /></ExtLink>}
      </div>
      {p.colabUrl && <p className="font-mono text-xs text-muted-foreground">{tr.colabNote}</p>}
    </div>
  );
}

/** Evidence renders only when a real image exists. */
function Evidence({ p }: { p: Project }) {
  const { lang } = useLang();
  if (!p.evidence.image) return null;
  const { image, alt, caption, size } = p.evidence;
  const w = size === "wide" ? "md:max-w-[800px] md:mt-8" : size === "tall" ? "md:max-w-[480px]" : "md:max-w-[460px]";
  return (
    <figure className={`w-full max-w-full ${w}`}>
      <a href={image} target="_blank" rel="noopener noreferrer" className="block">
        <img src={image} alt={(alt ?? caption)[lang]} loading="lazy" decoding="async" className="block h-auto w-full rounded-[3px] border border-border object-contain" />
      </a>
      <figcaption className="mt-2 font-mono text-[12px] leading-relaxed text-muted-foreground">{caption[lang]}</figcaption>
    </figure>
  );
}

function CaseStudy({ p, index, total, compact }: { p: Project; index: number; total?: number; compact?: boolean }) {
  const { lang, tr } = useLang();
  const hl = p.highlights[lang];
  const flip = index % 2 === 1;
  const num = String(index + 1).padStart(2, "0");
  return (
    <article className={`reveal relative border-t border-foreground/15 ${compact ? "py-8 lg:py-10" : "py-12 lg:py-16"} ${flip ? "lg:-mx-14 lg:bg-paper lg:px-14 xl:-mx-20 xl:px-20" : ""}`}>
      <div className={`grid gap-6 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-10 ${flip ? "md:grid-cols-[minmax(0,1fr)_5.5rem]" : ""}`}>
        <p aria-hidden="true" className={`font-mono font-light leading-none text-gold/70 ${compact ? "text-3xl md:text-4xl" : "text-5xl md:text-6xl"} ${flip ? "md:order-2 md:text-right" : ""}`}>
          {num}
          {total && <span className="ml-1 align-top text-xs text-muted-foreground">/{String(total).padStart(2, "0")}</span>}
        </p>
        <div className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">
            {p.subtitle[lang]}
            {p.label && <span className="text-muted-foreground"> · {p.label[lang]}</span>}
          </p>
          <h3 className={`mt-2 font-semibold tracking-tight text-foreground ${compact ? "text-xl sm:text-2xl" : p.featured ? "text-3xl sm:text-4xl" : "text-2xl sm:text-3xl"}`}>{p.title}</h3>
          <p className={`mt-4 max-w-2xl leading-relaxed text-foreground/85 ${compact ? "" : "text-lg"}`}>{p.problem[lang]}</p>

          {hl.length > 0 && (
            <div className={compact ? "mt-6" : "mt-8"}>
              <Meta>{tr.built}</Meta>
              <ul className={`mt-3 grid gap-x-8 md:grid-cols-2 ${compact ? "gap-y-1.5 text-[15px]" : "gap-y-2.5"}`}>
                {hl.map((h) => (
                  <li key={h} className="flex gap-3 leading-relaxed">
                    <span aria-hidden="true" className="mt-[0.7rem] h-px w-4 shrink-0 bg-gold" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 grid gap-6 border-t border-dashed border-foreground/15 pt-6 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
            <div className="min-w-0"><Meta>{tr.how}</Meta><div className="mt-2.5"><Workflow steps={p.workflow} /></div></div>
            <div className="min-w-0"><Meta>{tr.stack}</Meta><div className="mt-2.5"><Chips items={p.technologies} /></div></div>
          </div>

          <div className="mt-8 space-y-5">
            <Actions p={p} />
            <Evidence p={p} />
          </div>
        </div>
      </div>
    </article>
  );
}

function SmallAutomation({ p }: { p: Project }) {
  const { lang } = useLang();
  return (
    <article className="reveal min-w-0 border-t border-foreground/15 pt-6">
      <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary">{p.subtitle[lang]}</p>
      <h3 className="mt-2 text-xl font-semibold tracking-tight">{p.title}</h3>
      {p.label && <p className="mt-1 font-mono text-[11px] text-muted-foreground">{p.label[lang]}</p>}
      <p className="mt-3 leading-relaxed text-foreground/85">{p.problem[lang]}</p>
      <div className="mt-4"><Workflow steps={p.workflow} /></div>
      <div className="mt-4"><Evidence p={p} /></div>
    </article>
  );
}

function Section({ id, n, children, intro }: { id: SectionId; n: number; children: ReactNode; intro?: string }) {
  const { tr } = useLang();
  const num = String(n).padStart(2, "0");
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="relative scroll-mt-16 pt-20 pb-6 lg:scroll-mt-0 lg:pt-28">
      <header className="relative mb-10">
        <span aria-hidden="true" className="pointer-events-none absolute -top-10 right-0 select-none font-mono text-[7rem] font-light leading-none text-foreground/[0.05] sm:text-[10rem]">
          {num}
        </span>
        <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <span className="text-gold">{num}</span>
          <span aria-hidden="true" className="h-px w-8 bg-gold/60" />
          {tr.eyebrow[id]}
        </p>
        <h2 id={`${id}-h`} className="relative mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{tr.nav[id]}</h2>
        {intro && <p className="relative mt-4 max-w-xl text-lg leading-relaxed text-muted-foreground">{intro}</p>}
      </header>
      {children}
    </section>
  );
}

/* ---------- identity ---------- */
function useActiveSection() {
  const [active, setActive] = useState<SectionId>("ai");
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as SectionId)),
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach((s) => { const el = document.getElementById(s); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
}

function Identity() {
  const { lang, tr } = useLang();
  const active = useActiveSection();
  const name = lang === "en" ? "Stefan Badev" : "Стефан Бадев";
  const [first, last] = name.split(" ");
  return (
    <>
      {/* mobile hero */}
      <header className="bg-ink px-5 pb-10 pt-3 text-ink-foreground sm:px-8 lg:hidden">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">{tr.location}</p>
          <LangSwitch dark />
        </div>
        <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4">
          <h1 className="min-w-0 text-[2.75rem] font-semibold leading-[0.95] tracking-tight sm:text-6xl">
            {first}<br />{last}
          </h1>
          <img src={PORTRAIT} alt="Portrait of Stefan Badev" width={96} height={120} className="h-[120px] w-[96px] shrink-0 rounded-[3px] object-cover object-[50%_20%] grayscale-[15%]" />
        </div>
        <div className="mt-5 flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-gold" />
          <p className="text-lg font-medium text-ink-foreground">{tr.role}</p>
        </div>
        <p className="mt-3 font-mono text-[12px] leading-relaxed text-ink-muted">{tr.positioning}</p>
        <div className="mt-7 flex flex-wrap items-center gap-3">
          <a href="#ai" className={btnInkPrimary}>{tr.viewWork}<Arrow d="↓" /></a>
          <a href={cv.en.path} download className={btnInkGhost}>{tr.downloadCv}</a>
        </div>
        <div className="mt-4"><Socials dark /></div>
      </header>

      {/* desktop identity panel */}
      <aside className="hidden bg-ink text-ink-foreground lg:block">
        <div className="sticky top-0 flex h-screen flex-col overflow-y-auto px-12 py-12 xl:px-16">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-muted">{tr.available}</p>
          </div>

          <div className="mt-10 grid grid-cols-[minmax(0,1fr)_auto] items-end gap-6">
            <h1 className="mb-9 min-w-0 text-6xl font-semibold leading-[0.92] tracking-tight xl:text-7xl">
              {first}<br />{last}
            </h1>
            <img src={PORTRAIT} alt="Portrait of Stefan Badev" width={160} height={201} className="h-auto w-[150px] shrink-0 rounded-[3px] object-cover object-[50%_20%] grayscale-[15%] xl:w-[160px]" />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-gold" />
            <p className="text-xl font-medium">{tr.role}</p>
          </div>
          <p className="mt-4 font-mono text-[12px] leading-relaxed text-ink-muted">{tr.positioning}</p>
          <p className="mt-5 max-w-md leading-relaxed text-ink-foreground/80">{tr.statement}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#ai" className={btnInkPrimary}>{tr.viewWork}<Arrow /></a>
            <a href={cv.en.path} download className={btnInkGhost}>{tr.downloadCv}</a>
          </div>

          <nav aria-label="Sections" className="mt-12">
            <ul>
              {sections.map((s, i) => {
                const on = active === s;
                return (
                  <li key={s}>
                    <a href={`#${s}`} aria-current={on ? "true" : undefined} className={`group flex items-center gap-4 py-2 text-sm transition-colors ${on ? "text-ink-foreground" : "text-ink-muted hover:text-ink-foreground"}`}>
                      <span className={`font-mono text-[11px] ${on ? "text-gold" : ""}`}>{String(i + 1).padStart(2, "0")}</span>
                      <span aria-hidden="true" className={`h-px transition-all duration-300 ${on ? "w-14 bg-gold" : "w-6 bg-ink-border group-hover:w-10 group-hover:bg-ink-muted"}`} />
                      <span className={on ? "font-medium" : ""}>{tr.nav[s]}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto flex items-center justify-between border-t border-ink-border pt-6">
            <Socials dark />
            <LangSwitch dark />
          </div>
        </div>
      </aside>
    </>
  );
}

/* ---------- page ---------- */
function Index() {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const saved = localStorage.getItem("lang");
    if (saved === "bg" || saved === "en") setLangState(saved);
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);
  const setLang = (l: Lang) => { setLangState(l); localStorage.setItem("lang", l); };

  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const els = mainRef.current?.querySelectorAll(".reveal") ?? [];
    const obs = new IntersectionObserver(
      (es) => es.forEach((e) => { if (e.isIntersecting) { e.target.setAttribute("data-visible", "true"); obs.unobserve(e.target); } }),
      { rootMargin: "0px 0px -8% 0px" },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [lang]);

  return (
    <LangCtx.Provider value={{ lang, setLang }}>
      <Page mainRef={mainRef} />
    </LangCtx.Provider>
  );
}

function Page({ mainRef }: { mainRef: React.RefObject<HTMLElement | null> }) {
  const { lang, tr } = useLang();
  const by = (c: Project["category"]) => projects.filter((p) => p.category === c);
  const auto = by("automation");
  const cvRows = (["en", "bg"] as const).filter((k) => cv[k].available && cv[k].path);

  return (
    <div className="min-h-screen overflow-x-clip lg:grid lg:grid-cols-[minmax(400px,35%)_minmax(0,1fr)]">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-[3px] focus:bg-ink focus:px-4 focus:py-2 focus:text-ink-foreground">
        {tr.skip}
      </a>
      <Identity />
      <main id="content" ref={mainRef} className="min-w-0 px-5 sm:px-8 lg:px-14 xl:px-20">
        <div className="mx-auto max-w-4xl">
          <Section id="ai" n={1}>
            {by("ai").map((p, i, a) => <CaseStudy key={p.id} p={p} index={i} total={a.length} />)}
          </Section>

          <Section id="web" n={2}>
            {by("web").map((p, i, a) => <CaseStudy key={p.id} p={p} index={i} total={a.length} compact={i >= 2} />)}
          </Section>

          <Section id="automation" n={3} intro={tr.automationIntro}>
            {auto.filter((p) => p.featured).map((p, i) => (
              <div key={p.id}>
                <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.14em] text-gold">{tr.kinds[p.kind]}</p>
                <CaseStudy p={p} index={i} />
              </div>
            ))}
            <div className="mt-4 grid gap-10 md:grid-cols-2">
              {auto.filter((p) => !p.featured).map((p) => <SmallAutomation key={p.id} p={p} />)}
            </div>
          </Section>

          <Section id="how" n={4}>
            <ol className="reveal max-w-3xl border-l-2 border-gold pl-6">
              {tr.howIWork.map((l, i) => (
                <li key={l} className={`text-xl leading-relaxed sm:text-2xl ${i === 0 ? "font-medium text-foreground" : "text-foreground/75"} ${i ? "mt-3" : ""}`}>{l}</li>
              ))}
            </ol>
          </Section>

          <Section id="journey" n={5}>
            <ol className="reveal relative grid gap-8 border-l border-foreground/20 pl-6 md:grid-cols-5 md:gap-5 md:border-l-0 md:border-t md:pl-0 md:pt-8">
              {journey.map((j, i) => {
                const last = i === journey.length - 1;
                return (
                  <li key={j.years} className="relative min-w-0">
                    <span aria-hidden="true" className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rotate-45 md:-top-[37px] md:left-0 ${last ? "bg-gold" : "border border-foreground/40 bg-background"}`} />
                    <p className={`font-mono text-xs ${last ? "text-gold" : "text-muted-foreground"}`}>{j.years}</p>
                    <p className="mt-1.5 font-semibold leading-snug">{j.title[lang]}</p>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{j.note[lang]}</p>
                  </li>
                );
              })}
            </ol>
          </Section>

          <Section id="cv" n={6} intro={tr.cvIntro}>
            <ul className="reveal border-y border-foreground/15">
              {cvRows.map((k) => (
                <li key={k} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xl font-semibold">{cv[k].label}</p>
                    <p className="mt-0.5 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">PDF</p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <ExtLink href={cv[k].path!} className={btnGhost}>{tr.preview}<Arrow d="↗" /></ExtLink>
                    <a href={cv[k].path!} download className={btnPrimary}>{tr.download}<Arrow d="↓" /></a>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="contact" n={7} intro={tr.contactIntro}>
            <div className="reveal">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{tr.email}</p>
              <a href={`mailto:${links.email}`} className="link-line mt-2 inline-block break-all text-3xl font-semibold tracking-tight text-primary sm:text-5xl">
                {links.email}
              </a>
              <div className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-foreground/15 pt-6">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">{tr.phone}</p>
                  <a href={links.phoneHref} className="link-line inline-flex min-h-11 items-center text-lg">{links.phoneDisplay}</a>
                </div>
                <Socials />
              </div>
            </div>
          </Section>

          <footer className="mt-20 border-t border-foreground/15 py-8 font-mono text-xs text-muted-foreground">{tr.footer}</footer>
        </div>
      </main>
    </div>
  );
}
