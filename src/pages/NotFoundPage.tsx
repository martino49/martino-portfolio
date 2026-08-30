export function NotFoundPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-6 py-40 text-center">
        <p className="text-primary mb-4 font-mono text-xs font-medium tracking-widest uppercase">
          Error 404
        </p>
        <h1 className="section-heading text-foreground mb-4 text-5xl md:text-7xl">
          This page doesn't exist
        </h1>
        <p className="text-muted-foreground mb-8 max-w-md leading-relaxed font-light">
          But my projects do. Head back home to see them.
        </p>
        <a
          href="/"
          className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-6 py-3 text-sm font-medium tracking-widest uppercase transition-colors"
        >
          Back to home
        </a>
      </div>
    </main>
  );
}
