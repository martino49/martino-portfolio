import { useEffect, useState } from 'react';
import { Moon, Sun, Download, Menu, X, Share2 } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { config } from '@/portfolio.config';
import { ShareModal } from '@/components/ShareModal';

interface NavbarProps {
  theme: string;
  onToggleTheme: () => void;
}

const LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'Resume', path: '/resume' },
  { label: 'Contact', path: '/contact' },
];

export function Navbar({ theme, onToggleTheme }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const active = window.location.pathname;

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    setScrolled(window.scrollY > 20);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const links = config.blog?.enabled
    ? [...LINKS, { label: 'Blog', path: '/blog' }]
    : LINKS;

  const linkClass = (path: string) => {
    const isActive = active === path;
    return `relative px-3 py-2 text-xs font-medium tracking-widest uppercase rounded-md transition-colors whitespace-nowrap ${
      isActive
        ? 'text-foreground'
        : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
    }`;
  };

  return (
    <>
      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-background/80 border-border/40 border-b shadow-sm backdrop-blur-xl'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
          <a href="/" className="font-serif text-lg font-bold tracking-tight">
            Martin O.
          </a>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <a key={l.path} href={l.path} className={linkClass(l.path)}>
                {l.label}
                {active === l.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="bg-primary absolute right-0 -bottom-0.5 left-0 h-0.5 rounded-full"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <a
              href="/resume"
              className="group bg-primary text-primary-foreground hover:bg-primary/90 relative hidden items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium tracking-widest uppercase transition-colors md:inline-flex"
              aria-label="Download CV"
            >
              <Download size={14} />
              <span className="bg-foreground text-background pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium whitespace-nowrap opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
                Download CV
              </span>
            </a>
            <button
              onClick={() => setShareOpen(true)}
              className="text-muted-foreground hover:text-foreground relative rounded-full p-2 transition-colors"
              aria-label="Share portfolio"
            >
              <Share2 size={16} />
            </button>
            <button
              onClick={onToggleTheme}
              className="text-muted-foreground hover:text-foreground relative rounded-full p-2 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="text-foreground p-2 md:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          className="bg-primary absolute right-0 -bottom-px left-0 h-[2px] origin-left"
          style={{ scaleX }}
        />
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-background/98 fixed inset-0 z-[60] backdrop-blur-xl md:hidden"
          >
            <div className="flex h-full flex-col items-center justify-center gap-8">
              {links.map((l, i) => (
                <motion.a
                  key={l.path}
                  href={l.path}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.05 }}
                  className={`font-serif text-3xl font-medium tracking-tight ${
                    active === l.path ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}
              <motion.a
                href="/resume"
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: links.length * 0.05 }}
                className="bg-primary text-primary-foreground mt-4 flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium"
              >
                <Download size={16} />
                Download CV
              </motion.a>
            </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-muted-foreground hover:text-foreground absolute top-5 right-6 p-2"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </>
  );
}
