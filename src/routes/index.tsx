import { createFileRoute } from "@tanstack/react-router";
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import portrait from "@/assets/stefan-badev.jpg.asset.json";
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

function LangSwitch() {
  const { lang, setLang } = useLang();
  return (
    <div role="group" aria-label="Language" className="inline-flex rounded-md border bg-background p-0.5 font-mono text-xs">
      {(["en", "bg"] as Lang[]).map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`min-h-9 min-w-11 rounded-sm px-2 transition-colors ${
            lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          {l === "en" ? "EN" : "БГ"}
        </button>
      ))}
    </div>
  );
}

/* ---------- small pieces ---------- */
const GithubIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
    <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.53-1.33-1.29-1.69-1.29-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.71 1.26 3.37.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.39-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
  </svg>
);
const LinkedinIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-current">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
  </svg>
);

function ExtLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const { tr } = useLang();
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span className="sr-only"> {tr.newTab}</span>
    </a>
  );
}

function Socials() {
  const btn =
    "inline-flex h-11 w-11 items-center justify-center rounded-md border bg-background text-foreground transition-colors hover:border-primary hover:text-primary";
  return (
    <div className="flex gap-2">
      <ExtLink href={links.github} className={btn}>
        <GithubIcon />
        <span className="sr-only">GitHub</span>
      </ExtLink>
      <ExtLink href={links.linkedin} className={btn}>
        <LinkedinIcon />
        <span className="sr-only">LinkedIn</span>
      </ExtLink>
    </div>
  );
}

const btnPrimary =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary-hover";
const btnOutline =
  "inline-flex min-h-11 items-center justify-center rounded-md border border-primary/40 bg-background px-4 text-sm font-medium text-primary transition-colors hover:border-primary";

function Workflow({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1.5 font-mono text-xs text-foreground">
      {steps.map((s, i) => (
        <li key={s} className="flex items-center gap-1.5">
          <span className="rounded-sm bg-secondary px-1.5 py-1">{s}</span>
          {i < steps.length - 1 && <span aria-hidden="true" className="text-primary">→</span>}
        </li>
      ))}
    </ol>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((i) => (
        <li key={i} className="rounded-sm border px-2 py-0.5 font-mono text-[11px] text-muted-foreground">
          {i}
        </li>
      ))}
    </ul>
  );
}

function Evidence({ p, compact }: { p: Project; compact?: boolean }) {
  const { lang, tr } = useLang();
  return (
    <figure className="overflow-hidden rounded-md border bg-secondary/60">
      <div className={`grid place-items-center ${compact ? "aspect-[16/7]" : "aspect-[16/10]"}`}>
        {p.evidence.image ? (
          <img src={p.evidence.image} alt={p.evidence.caption[lang]} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.015]" />
        ) : (
          <div className="px-4 text-center">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{tr.evidence}</p>
            <p className="mt-1 text-sm text-muted-foreground">{tr.evidencePending}</p>
          </div>
        )}
      </div>
      <figcaption className="border-t bg-background px-3 py-2 font-mono text-[11px] text-muted-foreground">
        {p.evidence.caption[lang]}
      </figcaption>
    </figure>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <h4 className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{children}</h4>;
}

function Actions({ p }: { p: Project }) {
  const { tr } = useLang();
  if (!p.liveUrl && !p.githubUrl) return null;
  return (
    <div className="flex flex-wrap gap-2">
      {p.liveUrl && <ExtLink href={p.liveUrl} className={btnPrimary}>{tr.liveDemo} ↗</ExtLink>}
      {p.githubUrl && <ExtLink href={p.githubUrl} className={btnOutline}>{tr.viewCode} ↗</ExtLink>}
    </div>
  );
}

function CaseStudy({ p }: { p: Project }) {
  const { lang, tr } = useLang();
  const hl = p.highlights[lang];
  return (
    <article className={`reveal ${p.featured ? "" : ""} border-t pt-8 first:border-t-0 first:pt-0`}>
      <p className="font-mono text-[11px] uppercase tracking-wider text-primary">
        {p.subtitle[lang]}
        {p.label && <span className="text-muted-foreground"> · {p.label[lang]}</span>}
      </p>
      <h3 className={`mt-1 font-semibold tracking-tight ${p.featured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"}`}>
        {p.title}
      </h3>
      <div className="mt-5 grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
        <div className="min-w-0 space-y-5">
          <div>
            <Label>{tr.problem}</Label>
            <p className="mt-1.5 leading-relaxed">{p.problem[lang]}</p>
          </div>
          {hl.length > 0 && (
            <div>
              <Label>{tr.built}</Label>
              <ul className="mt-1.5 space-y-1.5">
                {hl.map((h) => (
                  <li key={h} className="flex gap-2.5 leading-relaxed text-foreground/90">
                    <span aria-hidden="true" className="mt-2.5 h-px w-3 shrink-0 bg-primary" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div>
            <Label>{tr.how}</Label>
            <div className="mt-2"><Workflow steps={p.workflow} /></div>
          </div>
          <div>
            <Label>{tr.stack}</Label>
            <div className="mt-2"><Chips items={p.technologies} /></div>
          </div>
          <Actions p={p} />
        </div>
        <div className="min-w-0">
          <Evidence p={p} />
        </div>
      </div>
    </article>
  );
}

function SmallAutomation({ p }: { p: Project }) {
  const { lang } = useLang();
  return (
    <article className="reveal min-w-0 rounded-md border p-5">
      <p className="font-mono text-[11px] uppercase tracking-wider text-primary">{p.subtitle[lang]}</p>
      <h3 className="mt-1 text-lg font-semibold tracking-tight">{p.title}</h3>
      {p.label && <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{p.label[lang]}</p>}
      <p className="mt-3 text-sm leading-relaxed">{p.problem[lang]}</p>
      <div className="mt-4"><Workflow steps={p.workflow} /></div>
      <div className="mt-4"><Evidence p={p} compact /></div>
    </article>
  );
}

function Section({ id, n, children, intro }: { id: SectionId; n: number; children: ReactNode; intro?: string }) {
  const { tr } = useLang();
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-20 py-14 first:pt-6 lg:scroll-mt-10 lg:py-20 lg:first:pt-20">
      <header className="mb-8">
        <p className="font-mono text-xs text-primary">{String(n).padStart(2, "0")}</p>
        <h2 id={`${id}-h`} className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">{tr.nav[id]}</h2>
        {intro && <p className="mt-3 max-w-xl text-muted-foreground">{intro}</p>}
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
  return (
    <>
      {/* mobile top bar */}
      <div className="sticky top-0 z-20 flex items-center justify-between border-b bg-background/95 px-5 py-2 backdrop-blur lg:hidden">
        <span className="text-sm font-semibold">{name}</span>
        <LangSwitch />
      </div>

      {/* mobile hero */}
      <header className="bg-secondary px-5 pb-7 pt-6 sm:px-8 lg:hidden">
        <div className="flex items-center gap-4">
          <img src={portrait.url} alt={`Portrait of ${name}`} width={88} height={110} className="h-[110px] w-[88px] shrink-0 rounded-md object-cover object-top" />
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold tracking-tight">{name}</h1>
            <p className="mt-0.5 font-medium text-primary">{tr.role}</p>
            <p className="mt-0.5 text-sm text-muted-foreground">{tr.location}</p>
          </div>
        </div>
        <p className="mt-4 font-mono text-xs leading-relaxed text-muted-foreground">{tr.positioning}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <a href={cv.en.path} download className={btnPrimary}>{tr.downloadCv}</a>
          <Socials />
        </div>
      </header>

      {/* desktop sticky column */}
      <aside className="hidden lg:block lg:bg-secondary">
        <div className="sticky top-0 flex h-screen flex-col justify-between overflow-y-auto px-10 py-12 xl:px-14">
          <div>
            <img src={portrait.url} alt={`Portrait of ${name}`} width={160} height={200} className="h-[200px] w-[160px] rounded-md object-cover object-top" />
            <h1 className="mt-6 text-4xl font-semibold tracking-tight">{name}</h1>
            <p className="mt-1 text-lg font-medium text-primary">{tr.role}</p>
            <p className="mt-3 font-mono text-xs leading-relaxed text-muted-foreground">{tr.positioning}</p>
            <p className="mt-4 max-w-sm leading-relaxed text-foreground/85">{tr.statement}</p>
            <div className="mt-6 flex gap-2">
              <a href="#ai" className={btnPrimary}>{tr.viewWork}</a>
              <a href={cv.en.path} download className={btnOutline}>{tr.downloadCv}</a>
            </div>
            <nav aria-label="Sections" className="mt-10">
              <ul className="space-y-0.5">
                {sections.map((s, i) => {
                  const on = active === s;
                  return (
                    <li key={s}>
                      <a href={`#${s}`} aria-current={on ? "true" : undefined} className={`group flex items-center gap-3 py-1.5 text-sm transition-colors ${on ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>
                        <span className="font-mono text-[11px]">{String(i + 1).padStart(2, "0")}</span>
                        <span aria-hidden="true" className={`h-px transition-all ${on ? "w-10 bg-primary" : "w-5 bg-border group-hover:w-8 group-hover:bg-foreground"}`} />
                        <span className={on ? "font-medium" : ""}>{tr.nav[s]}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <Socials />
            <LangSwitch />
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
      (es) => es.forEach((e) => { if (e.isIntersecting) { (e.target as HTMLElement).dataset.visible = "true"; obs.unobserve(e.target); } }),
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
    <div className="min-h-screen overflow-x-clip lg:grid lg:grid-cols-[minmax(360px,40%)_minmax(0,1fr)]">
      <a href="#content" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground">
        {tr.skip}
      </a>
      <Identity />
      <main id="content" ref={mainRef} className="min-w-0 px-5 sm:px-8 lg:px-14 xl:px-20">
        <div className="mx-auto max-w-3xl">
          <Section id="ai" n={1}>
            <div className="space-y-12">{by("ai").map((p) => <CaseStudy key={p.id} p={p} />)}</div>
          </Section>

          <Section id="automation" n={2} intro={tr.automationIntro}>
            <div className="space-y-6">
              {auto.filter((p) => p.featured).map((p) => (
                <div key={p.id}>
                  <p className="mb-3 inline-block rounded-sm bg-secondary px-2 py-0.5 font-mono text-[11px] text-muted-foreground">{tr.kinds[p.kind]}</p>
                  <CaseStudy p={p} />
                </div>
              ))}
              <div className="grid gap-4 md:grid-cols-2">
                {auto.filter((p) => !p.featured).map((p) => <SmallAutomation key={p.id} p={p} />)}
              </div>
            </div>
          </Section>

          <Section id="web" n={3}>
            <div className="space-y-12">{by("web").map((p) => <CaseStudy key={p.id} p={p} />)}</div>
          </Section>

          <Section id="how" n={4}>
            <ul className="reveal max-w-2xl space-y-2 text-lg leading-relaxed">
              {tr.howIWork.map((l) => <li key={l}>{l}</li>)}
            </ul>
          </Section>

          <Section id="journey" n={5}>
            <ol className="reveal relative grid gap-6 border-l pl-6 md:grid-cols-5 md:gap-4 md:border-l-0 md:border-t md:pl-0 md:pt-6">
              {journey.map((j, i) => (
                <li key={j.years} className="relative min-w-0">
                  <span aria-hidden="true" className={`absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 md:-top-[31px] md:left-0 ${i === journey.length - 1 ? "border-primary bg-primary" : "border-primary bg-background"}`} />
                  <p className="font-mono text-xs text-primary">{j.years}</p>
                  <p className="mt-1 font-medium leading-snug">{j.title[lang]}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{j.note[lang]}</p>
                </li>
              ))}
            </ol>
          </Section>

          <Section id="cv" n={6} intro={tr.cvIntro}>
            <ul className="reveal divide-y rounded-md border">
              {cvRows.map((k) => (
                <li key={k} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{cv[k].label}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">PDF</p>
                  </div>
                  <div className="flex gap-2">
                    <ExtLink href={cv[k].path!} className={btnOutline}>{tr.preview}</ExtLink>
                    <a href={cv[k].path!} download className={btnPrimary}>{tr.download}</a>
                  </div>
                </li>
              ))}
            </ul>
          </Section>

          <Section id="contact" n={7} intro={tr.contactIntro}>
            <div className="reveal space-y-5">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{tr.email}</p>
                <a href={`mailto:${links.email}`} className="mt-1 inline-block break-all text-2xl font-semibold tracking-tight text-primary underline-offset-4 hover:underline sm:text-3xl">
                  {links.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">{tr.phone}</p>
                <a href={links.phoneHref} className="mt-1 inline-flex min-h-11 items-center text-foreground hover:text-primary">{links.phoneDisplay}</a>
              </div>
              <Socials />
            </div>
          </Section>

          <footer className="border-t py-8 font-mono text-xs text-muted-foreground">{tr.footer}</footer>
        </div>
      </main>
    </div>
  );
}
