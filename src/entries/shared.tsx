import { config } from '@/portfolio.config';
import { applyThemePalette, hexToPresetPalette } from '@/lib/themes';

// Fonts are self-hosted via @fontsource (same-origin, no Google Fonts round trip).
// Imported once here so every page entry gets them. Per-weight + latin/latin-ext subset.
import '@fontsource/inter/latin-300.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-ext-400.css';
import '@fontsource/inter/latin-500.css';
import '@fontsource/inter/latin-ext-500.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/inter/latin-700.css';
import '@fontsource/cormorant-garamond/latin-300.css';
import '@fontsource/cormorant-garamond/latin-300-italic.css';
import '@fontsource/cormorant-garamond/latin-ext-300.css';
import '@fontsource/cormorant-garamond/latin-ext-300-italic.css';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/cormorant-garamond/latin-500.css';
import '@fontsource/cormorant-garamond/latin-500-italic.css';
import '@fontsource/cormorant-garamond/latin-600.css';
import '@fontsource/cormorant-garamond/latin-700.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';

import './../index.css';

export type Theme = 'light' | 'dark';

export function resolveInitialTheme(): Theme {
  const stored = localStorage.getItem('portfolio-theme');
  if (stored === 'light' || stored === 'dark') return stored;
  if (config.defaultTheme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return config.defaultTheme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme: Theme) {
  const isDark = theme === 'dark';
  const root = document.documentElement;
  if (isDark) root.classList.add('dark');
  else root.classList.remove('dark');
  localStorage.setItem('portfolio-theme', theme);
  const palette = config.primaryColor
    ? hexToPresetPalette(config.primaryColor)
    : config.customColors;
  applyThemePalette(
    config.primaryColor ? 'custom' : config.colorPreset,
    isDark,
    palette
  );
}

export function boot() {
  applyTheme(resolveInitialTheme());

  const words = config.name.trim().split(/\s+/).filter(Boolean);
  const initials =
    words.length >= 2
      ? `${words[0][0]}${words[words.length - 1][0]}`.toUpperCase()
      : (words[0] ?? '?').slice(0, 2).toUpperCase();
  const fontSize = initials.length === 1 ? 18 : 14;
  const color =
    (config.primaryColor && config.primaryColor.trim()) ||
    config.customColors?.[
      config.colorPreset as keyof typeof config.customColors
    ]?.primary ||
    '#374151';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
    <rect width="32" height="32" rx="8" fill="${color}"/>
    <text x="16" y="16" text-anchor="middle" dominant-baseline="central"
      font-family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif"
      font-size="${fontSize}" font-weight="700" fill="white">${initials}</text>
  </svg>`;
  let link = document.querySelector(
    "link[rel~='icon']"
  ) as HTMLLinkElement | null;
  link = link ?? document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`;
  if (!link.parentNode) document.head.appendChild(link);

  if (config.analytics.goatcounterCode) {
    const script = document.createElement('script');
    script.dataset['goatcounter'] =
      `https://${config.analytics.goatcounterCode}.goatcounter.com/count`;
    script.async = true;
    script.src = '//gc.zgo.at/count.js';
    document.head.appendChild(script);
  }
}

// ── Shared page shell ──────────────────────────────────────────────────────
// Every entry calls createPage() with its page component. This gives every
// page the same theme state + Layout (navbar/footer/smooth-scroll) without
// duplicating boilerplate, and keeps theme side-effects inside a useEffect.
import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { Layout } from '@/components/layout/Layout';

export function createPage(Page: React.ComponentType) {
  function Shell() {
    const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme());
    useEffect(() => applyTheme(theme), [theme]);
    const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
    return (
      <Layout theme={theme} onToggleTheme={toggle}>
        <Page />
      </Layout>
    );
  }
  boot();
  createRoot(document.getElementById('root')!).render(<Shell />);
}
