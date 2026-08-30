import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa6';
import { config } from '@/portfolio.config';

export function ContactToast() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (dismissed) return;
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;
      const clientHeight = window.innerHeight;
      const scrolledToBottom = scrollTop + clientHeight >= scrollHeight - 200;
      setShow(scrolledToBottom);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  const phoneClean = config.phone?.replace(/\s/g, '').replace('+', '') ?? '';

  return (
    <AnimatePresence>
      {show && !dismissed && (
        <motion.div
          initial={{ x: -400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -400, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-6 left-6 z-50 hidden max-w-sm md:block"
        >
          <div className="border-border bg-card/95 rounded-2xl border p-4 shadow-2xl backdrop-blur-md">
            <div className="flex items-start gap-3">
              <div className="bg-primary/10 text-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
                <MessageCircle size={20} />
              </div>
              <div className="flex-1">
                <p className="text-foreground text-sm font-medium">
                  Let&apos;s work together
                </p>
                <p className="text-muted-foreground mt-0.5 text-xs leading-relaxed">
                  Have a project in mind? I&apos;m open to opportunities and freelance work.
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <a
                    href={`mailto:${config.email}`}
                    className="bg-primary text-primary-foreground rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
                  >
                    Email me
                  </a>
                  {phoneClean && (
                    <a
                      href={`https://wa.me/${phoneClean}?text=${encodeURIComponent('Hi Martin, I found your portfolio and want to connect.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#25D366] text-white flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-opacity hover:opacity-90"
                    >
                      <FaWhatsapp size={12} />
                      WhatsApp
                    </a>
                  )}
                </div>
              </div>
              <button
                onClick={() => setDismissed(true)}
                className="text-muted-foreground hover:text-foreground shrink-0 rounded-lg p-1 transition-colors"
                aria-label="Dismiss"
              >
                <X size={14} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
