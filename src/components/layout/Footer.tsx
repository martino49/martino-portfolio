import { FaGithub, FaLinkedin, FaXTwitter, FaWhatsapp } from 'react-icons/fa6';
import { ArrowUp } from 'lucide-react';
import { config } from '@/portfolio.config';

export function Footer() {
  const phoneClean = config.phone?.replace(/\s/g, '').replace('+', '') ?? '';

  return (
    <footer className="border-border/60 bg-card/30 relative z-10 border-t px-6 py-12">
      <div className="mx-auto max-w-6xl">
        {/* Bottom row */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Left — copyright */}
          <p className="text-muted-foreground text-xs">
            &copy; {new Date().getFullYear()} Martin O. All rights reserved.
          </p>

          {/* Center — social links */}
          <div className="flex items-center gap-3">
            {config.social.github && (
              <a
                href={config.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
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
                className="text-muted-foreground hover:text-foreground transition-colors"
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
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Twitter"
              >
                <FaXTwitter size={18} />
              </a>
            )}
            {phoneClean && (
              <a
                href={`https://wa.me/${phoneClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp"
              >
                <FaWhatsapp size={18} />
              </a>
            )}
          </div>

          {/* Right — back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-muted-foreground hover:text-foreground flex items-center gap-1.5 text-xs transition-colors"
          >
            Back to top
            <ArrowUp size={12} />
          </button>
        </div>
      </div>
    </footer>
  );
}
