# Martin Omondo — Developer Portfolio

A modern, responsive developer portfolio built with React, Tailwind CSS, and Vite.

## Features

- 🎨 **Unique Design** — Custom morphing blob avatar, split hero layout
- 🌙 **Dark/Light Mode** — System-aware theme switching with 6 color presets
- 📱 **Fully Responsive** — Mobile-first design across all breakpoints
- ⚡ **Performance** — Vite MPA with vendor chunk splitting, critical font preloading
- 🔍 **SEO Optimized** — OpenGraph tags, Twitter cards, Schema.org structured data
- 📝 **Blog** — Markdown-powered blog with RSS feed generation
- 📄 **Resume** — Downloadable resume in PDF, plain text, and JSON Resume formats
- 🌐 **Share Modal** — QR code, social links, email signature snippet, embeddable card
- ✅ **Config Validation** — `pnpm check-config` catches typos before deployment
- 🎭 **Smooth Animations** — Framer Motion section reveals, custom cursor, smooth scroll

## Tech Stack

- **Frontend:** React 19, TypeScript, Tailwind CSS v4
- **UI:** Radix UI primitives, Lucide icons, shadcn/ui components
- **Animation:** Framer Motion, Lenis smooth scroll
- **Build Tool:** Vite 7 (MPA mode)
- **Fonts:** Inter, Cormorant Garamond, JetBrains Mono (self-hosted)
- **Deployment:** Vercel / GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/martino49/portfolio-testting.git
cd portfolio-testting/portfolio

# Install dependencies
pnpm install
```

### Development

```bash
# Start dev server
pnpm dev

# Open http://localhost:3000
```

### Build

```bash
# Build for production (generates resume artifacts first)
pnpm build

# Preview production build
pnpm serve
```

### Other Commands

```bash
pnpm lint             # ESLint
pnpm format           # Prettier auto-format
pnpm format-check     # Prettier validation (CI)
pnpm typecheck        # TypeScript type checking
pnpm check-config     # Validate portfolio.config.yaml
pnpm fix-config       # Auto-fix config issues
pnpm generate:resume  # Regenerate JSON Resume + Markdown only
```

## Configuration

Edit `portfolio.config.yaml` to customize your portfolio. This is the **only file you need to touch** — every field has a comment.

### Identity

```yaml
name: "Your Name"
title: "Your Title"
tagline: "One-line summary"
email: "your@email.com"
phone: "+254 XXX XXX XXX"
location: "City, Country"
avatarUrl: "/avatar.jpg"
openToWork: true
```

### Social Links

```yaml
social:
  github: "https://github.com/yourusername"
  linkedin: "https://linkedin.com/in/yourusername"
  twitter: "https://twitter.com/yourusername"
  website: "https://yourdomain.com"
```

### Projects

```yaml
projects:
  - name: "Project Name"
    description: "Project description"
    tags: [React, Node.js, PostgreSQL]
    liveUrl: "https://yourproject.com"
    repoUrl: "https://github.com/yourusername/project"
    featured: true
    image: "https://placehold.co/600x400"
```

### Skills

```yaml
skills:
  - category: "Frontend"
    items: [React, TypeScript, Tailwind CSS]
  - category: "Backend"
    items: [Node.js, Express, PostgreSQL]
```

### Theme

```yaml
defaultTheme: "system"   # light | dark | system
colorPreset: "indigo"    # indigo | emerald | rose | amber | sky | violet | custom
# primaryColor: "#6366f1"  # Optional hex override for custom colors
```

### Section Visibility

```yaml
sections:
  - { id: about,          show: true }
  - { id: skills,         show: true }
  - { id: experience,     show: true }
  - { id: projects,       show: true }
  - { id: education,      show: true }
  - { id: certifications, show: true }
  - { id: contact,        show: true }
```

Run `pnpm check-config` to validate your configuration before deploying.

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── layout/         # Navbar, Footer, Layout wrapper
│   │   ├── sections/       # Page sections (Hero, About, Projects, etc.)
│   │   └── ui/             # Reusable UI components (shadcn/ui)
│   ├── pages/              # Page components (HomePage, ProjectsPage, etc.)
│   ├── entries/            # Vite MPA entry points (one per page)
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilities, themes, blog helpers
│   ├── index.css           # Global styles and Tailwind config
│   └── portfolio.config.ts # TypeScript types for YAML config
├── public/                 # Static assets (images, fonts, resume files)
├── blog/                   # Markdown blog posts
├── scripts/                # Build scripts (resume generation, config validation)
├── portfolio.config.yaml   # Your portfolio configuration
├── vite.config.ts          # Vite MPA config + custom plugins
├── tsconfig.json           # TypeScript configuration
└── package.json
```

## Deployment

### Vercel (Recommended)

1. Push your repository to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Set the root directory to `portfolio`
4. Deploy automatically — Vercel handles build settings from `package.json`

### GitHub Pages

1. Run `pnpm build` locally
2. Push the `dist/public` contents to the `gh-pages` branch:

```bash
# Using gh-pages package
npx gh-pages -d dist/public

# Or manually
git subtree split --prefix dist/public -b gh-pages
git push origin gh-pages
```

3. In your repo Settings → Pages → Source, select `gh-pages` branch

## Customization

### Colors

Edit the theme presets in `src/lib/themes.ts`, or override with a custom hex in `portfolio.config.yaml`:

```yaml
colorPreset: "custom"
primaryColor: "#6366f1"
```

Or modify CSS variables directly in `src/index.css`:

```css
:root {
  --primary: 225 75% 16%;  /* Navy blue */
}
```

### Fonts

The project uses self-hosted fonts via `@fontsource`. To change fonts:

1. Install the new font package: `pnpm add @fontsource/your-font`
2. Import it in `src/entries/shared.ts`
3. Update the font family in `src/index.css`

### Blog

Add Markdown files to the `blog/` directory with YAML frontmatter:

```markdown
---
title: "My Blog Post Title"
date: "2026-01-15"
tags: [react, web-development]
excerpt: "A brief summary of the post."
---

Your blog post content here...
```

An RSS feed is automatically generated at `/rss.xml` during build.

## License

MIT
