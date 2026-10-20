export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <h2>Discuss a project.</h2>
        <a href="mailto:contact@argoslabs.io">contact@argoslabs.io <span aria-hidden>↗</span></a>
      </div>
      <div className="footer-bottom">
        <address>Station F, 5 Parvis Alan Turing<br />75013 Paris, France</address>
        <div><a href="https://www.linkedin.com/company/argos-labs" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="/press/argos-labs-logo-kit.zip" download>Logo kit (.zip) ↓</a></div>
        <p>© {new Date().getFullYear()} Argos Labs</p>
      </div>
    </footer>
  );
}
