import type { ReactNode } from 'react';
import { useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { InteractiveBackground } from '@/components/InteractiveBackground';
import { ContactToast } from '@/components/ContactToast';
import { OpenToWorkBanner } from '@/components/OpenToWorkBanner';
import { SmoothScrollProvider } from '@/components/SmoothScroll';
import { config } from '@/portfolio.config';
import type { Theme } from '@/entries/shared';

interface LayoutProps {
  theme: Theme;
  onToggleTheme: () => void;
  children: ReactNode;
}

export function Layout({ theme, onToggleTheme, children }: LayoutProps) {
  const [banner, setBanner] = useState(true);

  return (
    <MotionConfig reducedMotion="user">
      <SmoothScrollProvider>
        <CustomCursor />
        <InteractiveBackground />
        <ContactToast />
        {config.openToWork && banner && (
          <OpenToWorkBanner onDismiss={() => setBanner(false)} />
        )}
        <Navbar theme={theme} onToggleTheme={onToggleTheme} />
        <div className="text-foreground relative z-10 min-h-screen">
          {children}
        </div>
        <Footer />
      </SmoothScrollProvider>
    </MotionConfig>
  );
}
