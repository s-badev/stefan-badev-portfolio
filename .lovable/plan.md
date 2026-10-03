# Stefan Badev — Bilingual Portfolio (EN / БГ)

## 1. Page architecture
A single page at `/`, with no backend. The whole site is light-theme only. All copy lives in central data files. The portrait is hosted on the asset CDN, and the CV PDF is a static file at `public/cv/stefan-badev-cv-en.pdf`.

## 2. Section order
01 AI Projects · 02 Automation Work · 03 Web Projects · 04 How I Work · 05 Journey · 06 CV · 07 Contact

## 3. Desktop layout (lg, 1024px and up)
- Two-column editorial grid: about 40% sticky identity column on the left, 60% scrolling content on the right. The left column sits on `#E9EEF2`.
- Left column, top to bottom: portrait (rectangular, small radius), name, role, monospace positioning line, short statement, two buttons (View Work = solid navy, Download CV = outline), section navigation with numbers, GitHub and LinkedIn links, and the EN / БГ switch.
- The active section is highlighted with a navy line and text, driven by an IntersectionObserver.
- On the right, projects take the most space. Journey and How I Work are deliberately lighter.

## 4. Mobile layout (below 1024px)
- Normal vertical flow with no sticky column.
- Compact hero: an 88px portrait sits beside the name and role. Below it come the positioning line, Download CV, and GitHub/LinkedIn icon buttons. Everything fits in the first viewport at 360px.
- A slim top bar holds the name and the EN / БГ switch. There is no hamburger menu; the sections simply follow.

## 5. Component tree
```text
routes/index.tsx
  LanguageProvider (context + localStorage)
  SkipLink
  MobileTopBar
  IdentityPanel (desktop sticky / mobile hero variant)
    SectionNav, LangSwitch, SocialLinks
  main#content
    Section(id, number, title)
      ProjectCaseStudy  (AI + Web; featured / standard size)
        WorkflowLine, TechChips, EvidenceSlot, ProjectActions
      AutomationCase    (featured Make, smaller Zapier items, "low-code" label)
    HowIWork
    Journey (horizontal on desktop, vertical on mobile)
    CvSection (renders only languages marked available)
    Contact
  Footer (one line)
```

## 6. Project data (`src/data/projects.ts`)
```ts
type Localized = { en: string; bg: string };
type Project = {
  id: string;
  category: "ai" | "automation" | "web";
  kind?: "coded" | "low-code" | "no-code";
  featured: boolean;
  title: string;            // product names stay in English
  subtitle: Localized;      // type
  label?: Localized;        // e.g. "SoftUni AI Adoption coursework · 2025"
  problem: Localized;
  highlights: { en: string[]; bg: string[] };
  workflow: string[];       // rendered as A → B → C
  technologies: string[];
  evidence: { image: string | null; alt: Localized; caption: Localized };
  githubUrl: string | null;
  liveUrl: string | null;
};
```
Every fact and URL comes only from your brief. A button is rendered only when its URL is not null, so there are no Live Demo buttons for the AI or automation projects.

## 7. Translations (`src/i18n/translations.ts`)
- One `{ en, bg }` object with identical keys for navigation, section titles, button labels, How I Work, Journey, CV, Contact and SEO.
- Technology names (RAG, API, LangGraph, OpenAI, Make, Zapier and so on) stay in English.
- English is the default. The chosen language is remembered and also updates `<html lang>`.
- I will write the full Bulgarian version in the first build.

## 8. CV data
```ts
cv = {
  en: { available: true,  path: "/cv/stefan-badev-cv-en.pdf" },
  bg: { available: false, path: null },
}
```
- Preview opens the PDF in a new tab. Download uses the `download` attribute.
- The Bulgarian row stays hidden until its `available` flag is true.

## 9. Design tokens (oklch in styles.css)
- Accent navy `#1D4E7A`, with a slightly darker shade for hover.
- Sidebar and soft surfaces `#E9EEF2`; main surface `#FFFFFF`.
- Text: foreground slate-900 and muted slate-600, both checked for AA contrast.
- Borders: cool grey.
- Radius: 6px. Shadows: none, or a hairline only.
- No gradients and no dark mode.

## 10. Typography
- **Geist** for headings and body text; **Geist Mono** only for section numbers, technology chips and workflow labels.
- Geist has no Cyrillic, so Bulgarian text falls back to **Inter**, which has matching metrics.
- Alternative: use IBM Plex Sans + Plex Mono everywhere (full Cyrillic). Tell me if you prefer that.

## 11. Responsive strategy
- Designed mobile-first and tested at 360, 390, 430, 768, 1024 and 1440px.
- Long text and grid items are allowed to shrink so nothing overflows sideways. Workflow lines wrap at the arrows. Touch targets are at least 44px.
- Evidence slots use a fixed aspect ratio (16:10) and load lazily.
- Motion is limited to a gentle section reveal and a subtle image shift on hover, both turned off for users who prefer reduced motion. Scrolling is smooth.

## 12. Implementation sequence
1. Design tokens, fonts and the root head (SEO, Open Graph, Twitter, robots, canonical).
2. Upload the portrait; copy the CV into `public/cv/`.
3. Data files for projects, translations and CV.
4. Language context and the identity panel (desktop and mobile versions) with active-section navigation.
5. Project and automation case studies.
6. How I Work, Journey, CV and Contact.
7. Accessibility pass: skip link, keyboard focus, heading order, labels on external links.
8. Playwright screenshots at all six widths, then fixes.
9. A 1200×630 Open Graph image built from the real portrait in navy and light grey.

## 13. Still needed from you
- **Evidence screenshots** for all 7 items: PDF AI Assistant, Career Strategist, Make, the two Zapier workflows, Chefo's and FreshBox. Until you send them, each slot shows a quiet, labeled placeholder (for example "Architecture diagram — coming soon"), never a fake image.
- **Public site URL** for the canonical link and the absolute Open Graph image. I will use the lovable.app URL until you have a custom domain.
- Optional: a Bulgarian CV PDF.
- Optional: confirm the wording for the "Independent Contractor" timeline step (what kind of contracting, if you want it stated).
