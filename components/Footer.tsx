export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <h2>Let’s get to work.</h2>
        <a href="mailto:contact@argoslabs.io">contact@argoslabs.io <span aria-hidden>↗</span></a>
      </div>
      <div className="footer-bottom">
        <address>Station F, 5 Parv. Alan Turing<br />75013 Paris, France</address>
        <div><a href="https://www.linkedin.com/company/argos-labs" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a><a href="/press/argos-labs-logo-kit.zip" download>Download logo kit ↓</a></div>
        <p>© {new Date().getFullYear()} Argos Labs</p>
      </div>
    </footer>
  );
}
