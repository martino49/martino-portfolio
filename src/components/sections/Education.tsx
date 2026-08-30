import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Award } from 'lucide-react';
import { config } from '@/portfolio.config';
import { fadeUpVariants } from '@/lib/animation';

const fadeUp = fadeUpVariants(36, 0.7, 0.12);

const EDUCATION_DETAILS: Record<string, { description: string; highlights: string[] }> = {
  'Karatina University': {
    description: 'Pursuing a Bachelor of Science in Information Technology with focus on software development, database systems, and web technologies.',
    highlights: ['Software Development', 'Database Systems', 'Web Technologies', 'Network Administration'],
  },
  'Eldohub': {
    description: 'Intensive full-stack web development training covering modern frameworks, API design, and deployment practices.',
    highlights: ['React & Node.js', 'REST APIs', 'Database Design', 'Cloud Deployment'],
  },
};

export function Education() {
  if (!config.education || config.education.length === 0) return null;

  return (
    <section id="education" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-primary mb-4 font-mono text-xs font-medium tracking-widest uppercase"
        >
          Education
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="section-heading text-foreground mb-10 text-4xl md:text-5xl"
        >
          Academic Background
        </motion.h2>

        <div className="grid gap-4 md:grid-cols-2">
          {config.education.map((edu, i) => {
            const details = EDUCATION_DETAILS[edu.institution];
            return (
              <motion.div
                key={`${edu.institution}-${i}`}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="border-border bg-card rounded-2xl border p-6 transition-all hover:border-primary/30 hover:shadow-lg"
                data-testid={`education-${i}`}
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="bg-primary/10 text-primary flex h-12 w-12 shrink-0 items-center justify-center rounded-xl">
                    <GraduationCap size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-foreground font-serif text-xl font-light">
                      {edu.degree}
                    </h3>
                    <p className="text-primary mt-0.5 text-sm font-medium">
                      {edu.institution}
                    </p>
                  </div>
                  <span className="text-muted-foreground bg-secondary border-border shrink-0 rounded-full border px-3 py-1 font-mono text-xs whitespace-nowrap">
                    {edu.period}
                  </span>
                </div>

                {details && (
                  <>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                      {details.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {details.highlights.map((h) => (
                        <span
                          key={h}
                          className="bg-secondary text-secondary-foreground flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-medium"
                        >
                          <BookOpen size={10} />
                          {h}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
