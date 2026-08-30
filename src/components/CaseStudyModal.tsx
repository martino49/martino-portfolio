import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface CaseStudyModalProps {
  open: boolean;
  onClose: () => void;
  project: {
    name: string;
    description: string;
    tags: string[];
    liveUrl?: string;
    repoUrl?: string;
    screenshots?: string[];
    caseStudy?: string;
  };
}

export function CaseStudyModal({
  open,
  onClose,
  project,
}: CaseStudyModalProps) {
  const [current, setCurrent] = useState(0);
  const screenshots = project.screenshots ?? [];

  if (!open) return null;

  const prev = () =>
    setCurrent((c) => (c === 0 ? screenshots.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === screenshots.length - 1 ? 0 : c + 1));

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-background border-border relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground bg-background/80 absolute top-4 right-4 z-10 rounded-full p-2 backdrop-blur-sm transition-colors"
              aria-label="Close"
            >
              <X size={18} />
            </button>

            {/* Image carousel */}
            {screenshots.length > 0 && (
              <div className="bg-secondary relative aspect-video overflow-hidden rounded-t-2xl">
                <img
                  src={screenshots[current]}
                  alt={`${project.name} screenshot ${current + 1}`}
                  className="h-full w-full object-cover"
                />
                {screenshots.length > 1 && (
                  <>
                    <button
                      onClick={prev}
                      className="bg-background/80 hover:bg-background absolute top-1/2 left-3 -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-colors"
                      aria-label="Previous screenshot"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={next}
                      className="bg-background/80 hover:bg-background absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-2 backdrop-blur-sm transition-colors"
                      aria-label="Next screenshot"
                    >
                      <ChevronRight size={18} />
                    </button>
                    <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
                      {screenshots.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrent(i)}
                          className={`h-2 w-2 rounded-full transition-colors ${
                            i === current ? 'bg-primary' : 'bg-foreground/30'
                          }`}
                          aria-label={`Go to screenshot ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              <h3 className="text-foreground font-serif text-2xl font-light">
                {project.name}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-secondary text-secondary-foreground border-border rounded-md border px-2.5 py-1 font-mono text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {project.caseStudy && (
                <p className="text-muted-foreground mt-4 text-sm leading-relaxed">
                  {project.caseStudy}
                </p>
              )}
              <div className="mt-5 flex gap-3">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 text-xs font-medium transition-colors"
                  >
                    View Code
                  </a>
                )}
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="border-border hover:border-primary/40 text-foreground rounded-lg border px-4 py-2 text-xs font-medium transition-colors"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
