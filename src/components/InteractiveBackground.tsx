import { useEffect, useRef } from 'react';

export function InteractiveBackground() {
  const glowRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, 0.08);
      pos.current.y = lerp(pos.current.y, target.current.y, 0.08);

      if (glowRef.current) {
        glowRef.current.style.setProperty('--glow-x', `${pos.current.x}px`);
        glowRef.current.style.setProperty('--glow-y', `${pos.current.y}px`);
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        '--glow-x': '0px',
        '--glow-y': '0px',
      } as React.CSSProperties}
    >
      {/* Spotlight glow that follows cursor */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(650px circle at var(--glow-x) var(--glow-y), hsl(var(--primary) / 0.15), transparent 55%)',
        }}
      />
      {/* Subtle noise texture overlay */}
      <div className="noise-bg absolute inset-0 opacity-[0.03] dark:opacity-[0.04]" />
    </div>
  );
}
