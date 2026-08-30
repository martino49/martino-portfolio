import { createRoot } from 'react-dom/client';
import { useEffect, useState } from 'react';
import { ResumePage } from '@/pages/resume';
import { applyTheme, boot, resolveInitialTheme, type Theme } from './shared';

function Shell() {
  const [theme, setTheme] = useState<Theme>(() => resolveInitialTheme());
  useEffect(() => applyTheme(theme), [theme]);
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  return <ResumePage theme={theme} onToggleTheme={toggle} />;
}

boot();
createRoot(document.getElementById('root')!).render(<Shell />);
