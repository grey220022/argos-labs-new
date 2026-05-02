export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-fg-7 py-12 sm:py-16">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-10 px-6 sm:flex-row sm:items-end sm:justify-between sm:px-12 lg:px-24">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-fg-4">
            Headquarters
          </p>
          <address className="mt-3 not-italic font-display text-base leading-relaxed text-fg-2 sm:text-lg">
            Station F, 5 Parv. Alan Turing
            <br />
            75013 Paris
          </address>
        </div>

        <div className="flex flex-col gap-3 sm:items-end">
          <a
            href="mailto:contact@argoslabs.io"
            className="font-mono text-xs uppercase tracking-[0.2em] text-fg-2 transition-colors duration-100 hover:text-brand"
          >
            contact@argoslabs.io
          </a>
          <p className="font-mono text-[10px] tracking-[0.2em] text-fg-5">
            © {year} Argos Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
