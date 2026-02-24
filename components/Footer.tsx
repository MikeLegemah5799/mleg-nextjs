import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-copy">© 2025 Michael Legemah · Principal AI Engineer</div>
      <div className="footer-links">
        <a href="https://github.com/MikeLegemah5799" target="_blank" rel="noopener noreferrer">GitHub</a>
        <a href="https://linkedin.com/in/michaellegemah" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        <Link href="/about">About</Link>
      </div>
    </footer>
  );
}
