import { createPage } from './shared';
import { BlogPostPage } from '@/pages/blog/post';

function getSlug(): string {
  const seg = window.location.pathname.split('/').filter(Boolean);
  return seg[seg.length - 1] ?? '';
}

createPage(() => <BlogPostPage slug={getSlug()} />);
