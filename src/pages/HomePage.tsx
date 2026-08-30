import { Hero } from '@/components/sections/Hero';
import { GitHubStats } from '@/components/sections/GitHubStats';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import { Languages } from '@/components/sections/Languages';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Certifications } from '@/components/sections/Certifications';

export function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Hero />
      <GitHubStats />
      <About />
      <Skills />
      <Languages />
      <Experience />
      <Education />
      <Certifications />
    </main>
  );
}
