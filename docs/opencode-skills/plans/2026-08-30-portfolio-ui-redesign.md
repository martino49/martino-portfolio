# Portfolio UI Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use subagent-driven-development (recommended) or executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the GitVitae-based portfolio into a unique, professional developer portfolio with proper branding, optimized UI/UX, and ensure visitors can always reach Martin through multiple channels.

**Architecture:** Complete UI overhaul section-by-section, starting with Hero (blob right, text left), then Projects, Contact, and all other sections. Remove all GitVitae references, prepare proper README files, and ensure WhatsApp/email integration for contact.

**Tech Stack:** React, Tailwind CSS, Framer Motion, Vite MPA

---

## Phase 1: Hero Section — Split Layout (Blob Right, Text Left)

### Task 1.1: Restructure Hero Layout

**Files:**
- Modify: `src/components/sections/Hero.tsx`
- Modify: `src/index.css` (morph keyframes already exist)

- [ ] **Step 1: Convert Hero to split layout (60% text / 40% visual)**

```tsx
// Hero.tsx - Replace current centered layout with split layout
<section
  id="hero"
  ref={sectionRef}
  className="relative flex min-h-screen items-center overflow-hidden px-6 pt-16"
>
  {/* Parallax dot-grid */}
  <motion.div
    style={{
      y: gridY,
      backgroundImage:
        'radial-gradient(hsl(var(--primary) / 0.11) 1px, transparent 1px)',
      backgroundSize: '44px 44px',
    }}
    className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-20"
  />

  {/* Parallax glow blob - positioned right */}
  <motion.div
    style={{
      y: blobY,
      background:
        'radial-gradient(ellipse, hsl(var(--primary)), transparent 70%)',
    }}
    className="pointer-events-none absolute top-1/2 right-0 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/4 rounded-full opacity-15 blur-3xl"
  />

  <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-12 md:flex-row md:items-center md:justify-between">
    {/* Left side - Text content (60%) */}
    <motion.div
      style={{ y, opacity }}
      className="relative z-10 flex w-full flex-col gap-6 md:w-[60%]"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3"
      >
        {config.openToWork && (
          <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium tracking-wide text-green-600 uppercase dark:text-green-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
            Open to opportunities
          </span>
        )}

        <h1 className="text-foreground font-serif text-5xl leading-none font-light tracking-tight md:text-7xl">
          {config.name.split(' ').map((word, i) => (
            <span key={i} className={i === 1 ? 'italic' : ''}>
              {i > 0 ? ' ' : ''}
              {word}
            </span>
          ))}
        </h1>

        <p className="text-primary mt-1 text-sm font-medium tracking-[0.22em] uppercase">
          {config.title}
        </p>

        {config.tagline && <TypewriterText text={config.tagline} />}

        {(config.location || config.phone) && (
          <p className="text-muted-foreground mt-1 flex flex-wrap items-center gap-3 text-xs font-medium tracking-wider uppercase">
            {config.location && (
              <span className="flex items-center gap-1.5">
                <MapPin size={12} />
                {config.location}
              </span>
            )}
            {config.location && config.phone && (
              <span className="opacity-30">·</span>
            )}
            {config.phone && (
              <a
                href={`tel:${config.phone.replace(/\s/g, '')}`}
                className="hover:text-foreground flex items-center gap-1.5 transition-colors"
              >
                <Phone size={12} />
                {config.phone}
              </a>
            )}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap items-center gap-3"
      >
        {config.social.github && (
          <a
            href={config.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 rounded-xl border p-2.5 transition-all"
            aria-label="GitHub"
          >
            <FaGithub size={18} />
          </a>
        )}
        {config.social.linkedin && (
          <a
            href={config.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 rounded-xl border p-2.5 transition-all"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={18} />
          </a>
        )}
        {config.social.twitter && (
          <a
            href={config.social.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 rounded-xl border p-2.5 transition-all"
            aria-label="Twitter"
          >
            <FaXTwitter size={18} />
          </a>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex flex-wrap items-center gap-3"
      >
        <a
          href="#projects"
          className="bg-primary text-primary-foreground rounded-xl px-7 py-3 text-sm font-medium tracking-wide transition-opacity hover:opacity-90"
        >
          View My Work
        </a>
        <a
          href="/resume"
          className="border-primary/40 text-primary hover:bg-primary/5 flex items-center gap-2 rounded-xl border px-7 py-3 text-sm font-medium tracking-wide transition-all"
        >
          <Download size={14} />
          View Resume
        </a>
      </motion.div>
    </motion.div>

    {/* Right side - Avatar/Blob (40%) */}
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="relative z-10 flex w-full items-center justify-center md:w-[40%]"
    >
      <Avatar />
    </motion.div>
  </div>

  {/* Arrow fades out as soon as you start scrolling */}
  <motion.button
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    style={{ opacity: arrowOpacity }}
    transition={{ duration: 0.5, delay: 1.2 }}
    onClick={() =>
      document
        .querySelector('#about')
        ?.scrollIntoView({ behavior: 'smooth' })
    }
    className="text-muted-foreground hover:text-foreground absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce rounded-full p-2 transition-colors"
    aria-label="Scroll down"
  >
    <ArrowDown size={18} />
  </motion.button>
</section>
```

- [ ] **Step 2: Update Avatar component for larger display**

```tsx
// Update Avatar component in Hero.tsx for larger, more prominent display
function Avatar() {
  if (config.avatarUrl) {
    return (
      <div className="relative">
        {/* Glow effect behind avatar */}
        <div
          className="absolute inset-0 rounded-full opacity-30 blur-3xl"
          style={{
            background: 'linear-gradient(135deg, #0A174E 0%, #1e3a8a 100%)',
          }}
        />
        <img
          src={config.avatarUrl}
          alt={config.name}
          className="relative h-64 w-64 rounded-2xl object-cover md:h-80 md:w-80"
          style={{
            animation: 'morph 8s ease-in-out infinite',
            boxShadow: '0 24px 64px rgba(10, 23, 78, 0.30)',
            border: '4px solid rgba(255, 255, 255, 0.2)',
          }}
          fetchPriority="high"
          loading="eager"
        />
      </div>
    );
  }
  // ... initials fallback
}
```

- [ ] **Step 3: Run typecheck and verify**

Run: `pnpm typecheck`
Expected: No errors

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: restructure hero to split layout with blob on right"
```

---

## Phase 2: Remove All GitVitae References

### Task 2.1: Clean Footer and Contact References

**Files:**
- Modify: `src/components/sections/Contact.tsx:325-337`
- Modify: `src/components/layout/Footer.tsx`
- Modify: `src/components/OpenToWorkBanner.tsx` (remove GitVitae branding)

- [ ] **Step 1: Remove GitVitae branding from Contact section**

Edit `src/components/sections/Contact.tsx` — replace the footer credit section (lines 325-337):

```tsx
{/* Footer credit */}
<motion.div
  variants={fadeUp}
  custom={5}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-40px' }}
  className="border-border/60 w-full border-t pt-8 text-center"
>
  <p className="text-muted-foreground font-mono text-xs tracking-wide">
    &copy; {new Date().getFullYear()} {config.name}. All rights reserved.
  </p>
</motion.div>
```

- [ ] **Step 2: Update Footer component**

```tsx
// src/components/layout/Footer.tsx
import { config } from '@/portfolio.config';

export function Footer() {
  return (
    <footer className="border-border border-t px-6 py-5 text-center">
      <p className="text-muted-foreground text-[11px]">
        &copy; {new Date().getFullYear()} {config.name}. Built with React & Vite.
      </p>
    </footer>
  );
}
```

- [ ] **Step 3: Remove "Built with GitVitae" from CLAUDE.md**

Edit `CLAUDE.md` — remove GitVitae references and update to reflect custom portfolio.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/layout/Footer.tsx CLAUDE.md
git commit -m "chore: remove all GitVitae branding references"
```

---

## Phase 3: Contact Page — Ensure Visitors Can Reach Martin

### Task 3.1: Enhance WhatsApp Integration

**Files:**
- Modify: `src/components/OpenToWorkBanner.tsx`
- Modify: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Add pre-filled WhatsApp message**

```tsx
// OpenToWorkBanner.tsx - Update WhatsApp link with pre-filled message
const phoneClean = config.phone?.replace(/\s/g, '').replace('+', '') ?? '';
const whatsappMessage = encodeURIComponent(
  `Hi Martin, I found your portfolio and I'm interested in working together on a project.`
);

// In the component:
{phoneClean && (
  <motion.a
    href={`https://wa.me/${phoneClean}?text=${whatsappMessage}`}
    target="_blank"
    rel="noopener noreferrer"
    // ... rest of props
  >
    <FaWhatsapp size={28} />
  </motion.a>
)}
```

- [ ] **Step 2: Add WhatsApp button to Contact section**

```tsx
// Contact.tsx - Add WhatsApp as primary contact option
{/* WhatsApp quick contact */}
{config.phone && (
  <motion.a
    variants={fadeUp}
    custom={2.5}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-60px' }}
    href={`https://wa.me/${config.phone.replace(/\s/g, '').replace('+', '')}?text=${encodeURIComponent('Hi Martin, I found your portfolio and want to connect.')}`}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-[#25D366] text-white hover:bg-[#20BD5A] flex items-center gap-2.5 rounded-2xl px-6 py-3 text-sm font-medium tracking-wide transition-colors"
  >
    <FaWhatsapp size={18} />
    Chat on WhatsApp
  </motion.a>
)}
```

- [ ] **Step 3: Add social links section to Contact**

```tsx
// Contact.tsx - Add prominent social links
{/* Social icons */}
<motion.div
  variants={fadeUp}
  custom={3}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
  className="flex items-center gap-4"
>
  {config.social.github && (
    <a
      href={config.social.github}
      target="_blank"
      rel="noopener noreferrer"
      className="border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 rounded-xl border p-3 transition-all"
      aria-label="GitHub"
    >
      <FaGithub size={20} />
    </a>
  )}
  {config.social.linkedin && (
    <a
      href={config.social.linkedin}
      target="_blank"
      rel="noopener noreferrer"
      className="border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 rounded-xl border p-3 transition-all"
      aria-label="LinkedIn"
    >
      <FaLinkedin size={20} />
    </a>
  )}
  {config.social.twitter && (
    <a
      href={config.social.twitter}
      target="_blank"
      rel="noopener noreferrer"
      className="border-border text-muted-foreground hover:text-foreground hover:border-primary/40 hover:bg-primary/5 rounded-xl border p-3 transition-all"
      aria-label="Twitter"
    >
      <FaXTwitter size={20} />
    </a>
  )}
</motion.div>
```

- [ ] **Step 4: Commit**

```bash
git add src/components/OpenToWorkBanner.tsx src/components/sections/Contact.tsx
git commit -m "feat: enhance contact options with WhatsApp integration"
```

---

## Phase 4: Projects Section — Better Visual Showcase

### Task 4.1: Improve Project Cards

**Files:**
- Modify: `src/components/sections/Projects.tsx`
- Modify: `portfolio.config.yaml` (add placeholder images)

- [ ] **Step 1: Add gradient overlays to project images**

```tsx
// Projects.tsx - Add gradient overlay for better text readability
{project.image && (
  <div className="relative aspect-video overflow-hidden bg-secondary">
    <img
      src={project.image}
      alt={project.name}
      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    {/* Gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
    {project.screenshots && project.screenshots.length > 0 && (
      <button
        onClick={() => setModalProject(project)}
        className="absolute right-3 bottom-3 flex items-center gap-1.5 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-medium text-gray-900 backdrop-blur-sm transition-colors hover:bg-white"
      >
        <Eye size={14} />
        Case Study
      </button>
    )}
  </div>
)}
```

- [ ] **Step 2: Add hover state improvements**

```tsx
// Projects.tsx - Update card hover states
<motion.div
  key={project.name}
  variants={fadeUp}
  custom={i + 2}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-60px' }}
  className="group border-border bg-card overflow-hidden rounded-2xl border transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/Projects.tsx
git commit -m "feat: improve project card visuals with gradient overlays"
```

---

## Phase 5: Typography & Color System

### Task 5.1: Update Typography Hierarchy

**Files:**
- Modify: `src/index.css`

- [ ] **Step 1: Add Inter Display for headings**

```css
/* Add to index.css after existing font imports */
@import url('https://fonts.googleapis.com/css2?family=Inter+Display:wght@400;500;600;700&display=swap');

/* Update font variables */
:root {
  --app-font-sans: 'Inter', sans-serif;
  --app-font-serif: 'Cormorant Garamond', Georgia, serif;
  --app-font-mono: 'JetBrains Mono', monospace;
  --app-font-display: 'Inter Display', 'Inter', sans-serif;
}

/* Add utility for display font */
@layer utilities {
  .font-display {
    font-family: var(--app-font-display);
  }
}
```

- [ ] **Step 2: Update heading styles**

```css
/* Add to index.css */
h1, h2, h3 {
  font-family: var(--app-font-display);
}
```

- [ ] **Step 3: Commit**

```bash
git add src/index.css
git commit -m "feat: add Inter Display font for headings"
```

---

## Phase 6: Prepare README Files

### Task 6.1: Create Project README

**Files:**
- Create: `README.md` (replace existing)

- [ ] **Step 1: Create comprehensive README**

```markdown
# Martin Omondo — Developer Portfolio

A modern, responsive developer portfolio built with React, Tailwind CSS, and Vite.

## Features

- 🎨 **Unique Design** — Custom morphing blob avatar, split hero layout
- 🌙 **Dark/Light Mode** — System-aware theme switching
- 📱 **Fully Responsive** — Mobile-first design
- ⚡ **Performance** — Vite MPA, optimized builds
- 🔍 **SEO Optimized** — OpenGraph tags, semantic HTML
- 📝 **Blog** — Markdown-powered blog with RSS feed
- 📄 **Resume** — Downloadable PDF resume

## Tech Stack

- **Frontend:** React 18, TypeScript, Tailwind CSS
- **Animation:** Framer Motion
- **Build Tool:** Vite (MPA)
- **Deployment:** Vercel / GitHub Pages

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm serve
```

## Configuration

Edit `portfolio.config.yaml` to customize:

- Personal info (name, title, contact)
- Projects and case studies
- Skills and experience
- Theme colors
- Blog posts

## Project Structure

```
portfolio/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Page components
│   ├── entries/       # MPA entry points
│   └── lib/           # Utilities
├── public/            # Static assets
├── blog/              # Markdown blog posts
└── portfolio.config.yaml  # Configuration
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Deploy automatically

### GitHub Pages

1. Run `pnpm build`
2. Push `dist/` to `gh-pages` branch

## Customization

### Colors

Edit `src/index.css` to change the color palette:

```css
:root {
  --primary: 225 75% 16%;  /* Navy blue */
}
```

### Fonts

Update font imports in `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Your+Font&display=swap');
```

## License

MIT
```

- [ ] **Step 2: Commit**

```bash
git add README.md
git commit -m "docs: create comprehensive project README"
```

---

## Phase 7: Final Verification

### Task 7.1: Run Full Verification

- [ ] **Step 1: Run typecheck**

```bash
pnpm typecheck
```

- [ ] **Step 2: Run build**

```bash
pnpm build
```

- [ ] **Step 3: Run lint**

```bash
pnpm lint
```

- [ ] **Step 4: Start dev server and verify**

```bash
pnpm dev
```

Open http://localhost:3000 and verify:
- Hero section has blob on right, text on left
- Contact page has WhatsApp button
- No GitVitae references visible
- All pages work correctly

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: complete portfolio UI redesign"
```

---

## Summary

This plan transforms the portfolio from a template-based design to a unique, professional developer portfolio with:

1. **Hero Section:** Split layout with morphing blob on right, text on left
2. **Contact:** Multiple contact channels (WhatsApp, email, social)
3. **Branding:** All GitVitae references removed
4. **Typography:** Inter Display for headings, proper hierarchy
5. **Projects:** Enhanced visuals with gradient overlays
6. **Documentation:** Comprehensive README

**Estimated Time:** 2-3 hours
**Risk Level:** Low (incremental changes, type-safe)
