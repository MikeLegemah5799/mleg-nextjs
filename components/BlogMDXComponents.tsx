import s from '@/styles/blog-post.module.css';

// MDX's JSX-expression attributes (`prop={...}`) don't survive this MDX pipeline's
// compile step — they arrive as empty props. Plain quoted attributes do, so callers
// pass `\n` as a literal two-character escape and this unescapes it back to a newline.
function unescape(str: string) {
  return str.replace(/\\n/g, '\n');
}

const PY_KEYWORDS = new Set([
  'def', 'return', 'if', 'in', 'and', 'or', 'not', 'else', 'elif',
  'import', 'from', 'class', 'for', 'is', 'None', 'True', 'False', 'as',
]);

// Comment | string | word — matched in that priority order so `#`/quotes inside
// strings don't get misparsed, and bare words get checked against the keyword set.
const TOKEN_RE = /(#.*$)|('(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*")|(\b[A-Za-z_][A-Za-z0-9_]*\b)/gm;

function highlightLine(line: string) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  TOKEN_RE.lastIndex = 0;
  while ((m = TOKEN_RE.exec(line))) {
    if (m.index > last) nodes.push(line.slice(last, m.index));
    const [full, comment, str, word] = m;
    if (comment) nodes.push(<span key={key++} className={s.tokComment}>{comment}</span>);
    else if (str) nodes.push(<span key={key++} className={s.tokString}>{str}</span>);
    else if (word && PY_KEYWORDS.has(word)) nodes.push(<span key={key++} className={s.tokKeyword}>{word}</span>);
    else nodes.push(full);
    last = m.index + full.length;
  }
  if (last < line.length) nodes.push(line.slice(last));
  return nodes;
}

function CodeLines({ code }: { code: string }) {
  return (
    <>
      {code.split('\n').map((line, i) => (
        <div key={i} className={s.codeLine}>{line.length ? highlightLine(line) : ' '}</div>
      ))}
    </>
  );
}

function DiffBlock({ before, after }: { before: string; after: string }) {
  return (
    <div className={s.diffBlock}>
      <div className={`${s.diffSection} ${s.diffSectionBefore}`}>
        <div className={`${s.diffTag} ${s.diffTagBefore}`}>Before</div>
        <pre className={s.diffBefore}><CodeLines code={unescape(before)} /></pre>
      </div>
      <div className={`${s.diffSection} ${s.diffSectionAfter}`}>
        <div className={`${s.diffTag} ${s.diffTagAfter}`}>After</div>
        <pre className={s.diffAfter}><CodeLines code={unescape(after)} /></pre>
      </div>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return <div className={s.callout}>{children}</div>;
}

export const mdxComponents = { DiffBlock, Callout };
