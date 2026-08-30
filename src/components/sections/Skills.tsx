import { motion } from 'framer-motion';
import { config } from '@/portfolio.config';
import { fadeUpVariants } from '@/lib/animation';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiEjs,
  SiTailwindcss,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiSocketdotio,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiKotlin,
  SiVercel,
  SiPaypal,
  SiStripe,
} from 'react-icons/si';
import { FaCashRegister, FaMobileScreen, FaServer, FaDatabase, FaCloud } from 'react-icons/fa6';
import type { IconType } from 'react-icons';

const fadeUp = fadeUpVariants(40, 0.7, 0.1);

const SKILL_MAP: Record<string, { icon: IconType; color: string }> = {
  // Frontend
  'React': { icon: SiReact, color: '#61DAFB' },
  'JavaScript': { icon: SiJavascript, color: '#F7DF1E' },
  'TypeScript': { icon: SiTypescript, color: '#3178C6' },
  'EJS': { icon: SiEjs, color: '#A91E50' },
  'Tailwind CSS': { icon: SiTailwindcss, color: '#06B6D4' },
  'HTML': { icon: SiHtml5, color: '#E34F26' },
  'CSS': { icon: SiCss, color: '#1572B6' },
  // Backend
  'Node.js': { icon: SiNodedotjs, color: '#339933' },
  'Express': { icon: SiExpress, color: '#FFFFFF' },
  'REST APIs': { icon: FaServer, color: '#60A5FA' },
  'Socket.io': { icon: SiSocketdotio, color: '#010101' },
  // Databases
  'MySQL': { icon: SiMysql, color: '#4479A1' },
  'PostgreSQL': { icon: SiPostgresql, color: '#4169E1' },
  'Supabase': { icon: SiSupabase, color: '#3FCF8E' },
  // Mobile
  'Kotlin': { icon: SiKotlin, color: '#7F52FF' },
  'MVVM': { icon: FaMobileScreen, color: '#A855F7' },
  'Room': { icon: FaDatabase, color: '#FB923C' },
  // Payments
  'M-Pesa (Daraja)': { icon: FaCashRegister, color: '#4CAF50' },
  'Paystack': { icon: SiStripe, color: '#00A3FF' },
  'PayPal': { icon: SiPaypal, color: '#003087' },
  'Stripe': { icon: SiStripe, color: '#635BFF' },
  // Deployment
  'Vercel': { icon: SiVercel, color: '#000000' },
  'Render': { icon: FaCloud, color: '#46E3B7' },
  'AlwaysData': { icon: FaCloud, color: '#6366F1' },
};

const CATEGORY_ICONS: Record<string, { icon: IconType; color: string }> = {
  'Frontend': { icon: SiReact, color: '#61DAFB' },
  'Backend': { icon: FaServer, color: '#60A5FA' },
  'Databases': { icon: FaDatabase, color: '#4169E1' },
  'Mobile': { icon: FaMobileScreen, color: '#7F52FF' },
  'Payments': { icon: FaCashRegister, color: '#4CAF50' },
  'Deployment': { icon: FaCloud, color: '#46E3B7' },
};

export function Skills() {
  return (
    <section id="skills" className="bg-secondary/20 px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.p
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="text-primary mb-4 font-mono text-xs font-medium tracking-widest uppercase"
        >
          Toolbox
        </motion.p>
        <motion.h2
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="section-heading text-foreground mb-14 text-4xl md:text-5xl"
        >
          Skills &amp; Technologies
        </motion.h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {config.skills.map((group, i) => {
            const cat = CATEGORY_ICONS[group.category];
            const CatIcon = cat?.icon;
            return (
              <motion.div
                key={group.category}
                variants={fadeUp}
                custom={i + 2}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-60px' }}
                className="border-border bg-card rounded-2xl border p-6"
                data-testid={`skills-group-${group.category.toLowerCase()}`}
              >
                <div className="mb-5 flex items-center gap-2.5">
                  {CatIcon && (
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-lg"
                      style={{ backgroundColor: `${cat.color}20` }}
                    >
                      <CatIcon size={18} style={{ color: cat.color }} />
                    </div>
                  )}
                  <p className="text-primary font-mono text-xs font-medium tracking-widest uppercase">
                    {group.category}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {group.items.map((skill, j) => {
                    const skillData = SKILL_MAP[skill];
                    const Icon = skillData?.icon;
                    const color = skillData?.color;
                    return (
                      <motion.div
                        key={skill}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.35,
                          delay: i * 0.06 + j * 0.04,
                          ease: 'easeOut',
                        }}
                        className="border-border bg-secondary/50 hover:bg-secondary hover:border-primary/30 flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-all"
                        data-testid={`skill-${skill.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        {Icon && (
                          <Icon
                            size={20}
                            style={{ color: color || 'currentColor' }}
                            className="shrink-0"
                          />
                        )}
                        <span className="text-foreground text-xs font-medium">
                          {skill}
                        </span>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
