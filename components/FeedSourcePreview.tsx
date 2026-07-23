import s from '@/styles/rss.module.css';

// Comment | tag name | quoted attr value | closing bracket — matched in that
// priority order so `<!--...-->` isn't misread as a tag.
const XML_TOKEN_RE = /(<!--.*?-->)|(<\/?[a-zA-Z][\w:-]*)|("[^"]*")|(\/?>)/g;

function highlightXmlLine(line: string) {
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  XML_TOKEN_RE.lastIndex = 0;
  while ((m = XML_TOKEN_RE.exec(line))) {
    if (m.index > last) nodes.push(line.slice(last, m.index));
    const [full, comment, tag, attr, bracket] = m;
    if (comment) nodes.push(<span key={key++} className={s.tokComment}>{comment}</span>);
    else if (tag) nodes.push(<span key={key++} className={s.tokTag}>{tag}</span>);
    else if (attr) nodes.push(<span key={key++} className={s.tokAttr}>{attr}</span>);
    else if (bracket) nodes.push(<span key={key++} className={s.tokTag}>{bracket}</span>);
    else nodes.push(full);
    last = m.index + full.length;
  }
  if (last < line.length) nodes.push(line.slice(last));
  return nodes;
}

export default function FeedSourcePreview({ xml }: { xml: string }) {
  return (
    <pre className={s.sourceBlock}>
      {xml.split('\n').map((line, i) => (
        <div key={i} className={s.sourceLine}>{line.length ? highlightXmlLine(line) : ' '}</div>
      ))}
    </pre>
  );
}
