import fs from 'fs';
import path from 'path';
import s from '@/styles/blog-post.module.css';

const EMBED_DIR = path.join(process.cwd(), 'content/blog/embeds');

// Inlines an authored SVG/HTML fragment from content/blog/embeds/ so it inherits the
// site's CSS variables (an <img src="x.svg"> can't). Files are repo-authored, but
// <script> tags are stripped anyway. Only a bare file name is accepted (no path traversal).
export function Embed({ file, caption }: { file: string; caption?: string }) {
  const name = path.basename(file);
  const ext = path.extname(name) ? '' : '.svg';
  const full = path.join(EMBED_DIR, name + ext);
  if (!fs.existsSync(full)) {
    if (process.env.NODE_ENV !== 'production') throw new Error(`Embed not found: ${name + ext}`);
    return null;
  }
  const html = fs.readFileSync(full, 'utf8').replace(/<script[\s\S]*?<\/script>/gi, '');
  return (
    <figure className={s.figure}>
      <div className={s.embed} dangerouslySetInnerHTML={{ __html: html }} />
      {caption ? <figcaption className={s.figcaption}>{caption}</figcaption> : null}
    </figure>
  );
}
