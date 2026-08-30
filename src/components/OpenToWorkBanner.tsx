import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { X, Mail } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { config } from '@/portfolio.config';

interface OpenToWorkBannerProps {
  onDismiss: () => void;
}

export function OpenToWorkBanner({ onDismiss }: OpenToWorkBannerProps) {
  const [dismissed, setDismissed] = useState(false);

  if (!config.openToWork) return null;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss();
  };

  const phoneClean = config.phone?.replace(/\s/g, '').replace('+', '') ?? '';
  const whatsappMessage = encodeURIComponent(
    "Hi Martin, I found your portfolio and I'm interested in working together on a project."
  );

  return (
    <AnimatePresence>
      {!dismissed && (
        <>
          {/* Floating "Open to opportunities" pill — right side, below navbar */}
          <motion.div
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 80, opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="bg-primary text-primary-foreground fixed top-20 right-4 z-[60] flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium shadow-lg select-none md:top-20 print:hidden"
          >
            <span className="relative flex shrink-0 items-center">
              <span className="bg-primary-foreground absolute inline-flex h-2 w-2 animate-ping rounded-full opacity-70" />
              <span className="bg-primary-foreground relative inline-flex h-2 w-2 rounded-full" />
            </span>

            <span className="text-[11px] font-semibold tracking-widest uppercase">
              Open to work
            </span>

            <a
              href={`mailto:${config.email}?subject=Opportunity for ${config.name}`}
              className="bg-primary-foreground/15 hover:bg-primary-foreground/25 border-primary-foreground/20 flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[10px] font-semibold tracking-widest whitespace-nowrap uppercase transition-colors"
            >
              <Mail size={10} />
              Contact
            </a>

            <button
              onClick={handleDismiss}
              aria-label="Dismiss banner"
              className="hover:bg-primary-foreground/15 text-primary-foreground/60 hover:text-primary-foreground rounded-full p-0.5 transition-colors"
            >
              <X size={12} />
            </button>
          </motion.div>

          {/* Floating WhatsApp button — bottom right */}
          {phoneClean && (
            <motion.a
              href={`https://wa.me/${phoneClean}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.3,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="fixed right-5 bottom-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 print:hidden"
              aria-label="Chat on WhatsApp"
            >
              <FaWhatsapp size={28} />
            </motion.a>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
