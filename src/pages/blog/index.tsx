import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, Tag, ArrowLeft, Rss, ArrowRight } from 'lucide-react';
import { allPosts, allTags } from '@/lib/blog';
import { config } from '@/portfolio.config';

function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BlogListPage() {
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? allPosts.filter((p) => p.tags.includes(activeTag))
    : allPosts;

  const featured = filtered[0];
  const rest = filtered.slice(1);

  const blogTitle = config.blog?.title ?? 'Blog';
  const blogDescription =
    config.blog?.description ?? 'Thoughts, stories and ideas.';

  return (
    <div className="bg-background text-foreground min-h-screen">
      {/* Top bar */}
      <div className="bg-background/80 border-border/40 fixed top-0 right-0 left-0 z-50 border-b backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-6">
          <a
            href="/"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft size={15} />
            Back to portfolio
          </a>
          <a
            href="/blog"
            className="text-primary flex items-center gap-1.5 text-xs font-medium tracking-widest uppercase"
          >
            <Rss size={13} />
            {blogTitle}
          </a>
        </div>
      </div>

      <main className="mx-auto max-w-3xl px-6 pt-28 pb-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-foreground mb-3 font-serif text-4xl font-medium sm:text-5xl">
            {blogTitle}
          </h1>
          <p className="text-muted-foreground text-base">{blogDescription}</p>
        </motion.div>

        {/* Tag filter */}
        {allTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="mb-10 flex flex-wrap gap-2"
          >
            <button
              onClick={() => setActiveTag(null)}
              className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                activeTag === null
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  activeTag === tag
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>
        )}

        {/* Featured post */}
        {featured && (
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-10"
          >
            <motion.a
              href={`/blog/${featured.slug}`}
              className="group border-border hover:border-primary/30 block overflow-hidden rounded-2xl border transition-colors"
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              {featured.cover && (
                <div className="aspect-[2/1] overflow-hidden">
                  <img
                    src={featured.cover}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              )}
              <div className="p-6">
                {featured.tags.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {featured.tags.map((t) => (
                      <span
                        key={t}
                        className="bg-accent text-accent-foreground inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium"
                      >
                        <Tag size={9} />
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <h2 className="text-foreground group-hover:text-primary mb-2 font-serif text-2xl leading-snug font-medium transition-colors">
                  {featured.title}
                </h2>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm leading-relaxed">
                  {featured.excerpt}
                </p>
                <div className="text-muted-foreground flex items-center gap-4 text-xs">
                  {featured.date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar size={11} />
                      {formatDate(featured.date)}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock size={11} />
                    {featured.readingTime} min read
                  </span>
                  <span className="text-primary ml-auto flex items-center gap-1 text-xs font-medium group-hover:underline">
                    Read <ArrowRight size={12} />
                  </span>
                </div>
              </div>
            </motion.a>
          </motion.article>
        )}

        {/* Rest of posts */}
        {rest.length > 0 && (
          <div className="space-y-4">
            {rest.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + i * 0.07, duration: 0.45 }}
              >
                <motion.a
                  href={`/blog/${post.slug}`}
                  className="group border-border hover:border-primary/30 hover:bg-secondary/30 flex flex-col gap-4 rounded-2xl border p-5 transition-colors sm:flex-row sm:items-center"
                  whileHover={{ scale: 1.02, y: -4 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {post.cover && (
                    <div className="aspect-video w-full overflow-hidden rounded-xl sm:w-48">
                      <img
                        src={post.cover}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {post.tags.length > 0 && (
                      <div className="mb-2 flex flex-wrap gap-1.5">
                        {post.tags.slice(0, 3).map((t) => (
                          <span
                            key={t}
                            className="bg-accent text-accent-foreground inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                    <h2 className="text-foreground group-hover:text-primary mb-1 font-serif text-lg leading-snug font-medium transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground mb-3 line-clamp-2 text-sm">
                      {post.excerpt}
                    </p>
                    <div className="text-muted-foreground flex items-center gap-3 text-xs">
                      {post.date && (
                        <span className="flex items-center gap-1.5">
                          <Calendar size={11} />
                          {formatDate(post.date)}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <Clock size={11} />
                        {post.readingTime} min
                      </span>
                    </div>
                  </div>
                  <ArrowRight size={16} className="text-muted-foreground group-hover:text-primary hidden shrink-0 transition-colors sm:block" />
                </motion.a>
              </motion.article>
            ))}
          </div>
        )}

        {/* Empty blog hint */}
        {allPosts.length === 0 && (
          <div className="mt-16 text-center">
            <p className="mb-4 text-5xl">✍️</p>
            <p className="text-muted-foreground mb-2 text-lg">
              No posts yet.
            </p>
            <p className="text-muted-foreground text-sm">
              Add a{' '}
              <span className="bg-secondary text-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                .md
              </span>{' '}
              file to your{' '}
              <span className="bg-secondary text-foreground rounded px-1.5 py-0.5 font-mono text-xs">
                blog/
              </span>{' '}
              folder to get started.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
