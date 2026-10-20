import Image from "next/image";
import Link from "next/link";
import LogoWall from "@/components/LogoWall";
import Reveal from "@/components/Reveal";
import HeroFilm from "@/components/HeroFilm";
import ServiceBrief from "@/components/ServiceBrief";
import Footer from "@/components/Footer";
import "./home.css";

export default function Home() {
  return (
    <>
      <div className="home-board">
        <a className="skip-link" href="#main">Skip to content</a>
        <header className="board-header">
          <Link href="/" className="wordmark" aria-label="Argos Labs home">Argos Labs</Link>
          <nav aria-label="Services">
            <a href="#agents">Agents</a><a href="#cloud">Cloud</a><a href="#growth">Growth</a>
          </nav>
          <a className="header-contact" href="#contact">Discuss a project <span aria-hidden>↗</span></a>
        </header>
        <main id="main">
          <section className="hero-board" aria-labelledby="home-title">
            <div className="hero-copy">
              <h1 id="home-title">AI, put<br />to work.</h1>
              <p>We build AI agents, run cloud infrastructure and help businesses enter new markets.</p>
              <a className="board-button" href="#pillars">Explore services <span aria-hidden>↓</span></a>
            </div>
            <HeroFilm />
            <div className="hero-location"><p>Based at Station F.<br />Working internationally.</p><a href="#paris">Paris, France <span aria-hidden>↗</span></a></div>
            <div className="hero-statement"><p>From the first workflow<br />to your next market.</p><a href="#contact">Discuss a project <span aria-hidden>↗</span></a></div>
          </section>

          <section id="pillars" className="services-board" aria-labelledby="services-heading">
            <Reveal className="section-intro"><h2 id="services-heading">Three services. One team.</h2><p>Get support for a specific workflow, your cloud operations or your next market launch.</p></Reveal>
            <article id="agents" data-pillar="agents" className="agent-board">
              <Reveal className="service-copy"><h3>Agents</h3><p className="service-statement">Turn workflows<br />into AI agents.</p><p>We build agents that use your tools, retain context between sessions and work within the budgets you set.</p><a href="#contact">Discuss a project <span aria-hidden>↗</span></a></Reveal>
              <Reveal className="capability-list">
                <div><h4>Retain context</h4><p>Carry task context across sessions so work can continue where it left off.</p></div>
                <div><h4>Use your tools</h4><p>Connect browser, shell and search tools to the tasks your team needs done.</p></div>
                <div><h4>Review each run</h4><p>Inspect traces and logs to understand each run, with controls for time and usage.</p></div>
              </Reveal>
            </article>
            <article id="cloud" data-pillar="cloud" className="cloud-board">
              <Reveal className="cloud-heading"><h3>Cloud</h3><p className="service-statement">Cloud for AI.<br />Managed by engineers.</p><Link href="/cloud">Explore Argos Cloud <span aria-hidden>↗</span></Link></Reveal>
              <Reveal className="cloud-details"><div><h4>Scale with demand</h4><p>Deploy AI workloads across regions, with compute that scales as demand changes.</p></div><div><h4>Understand your usage</h4><p>Track model tokens and compute time.</p><p>Choose billing terms that fit your workload.</p></div></Reveal>
            </article>
            <article id="growth" data-pillar="growth" className="growth-board">
              <Reveal className="service-copy"><h3>Growth</h3><p className="service-statement">Take your product<br />to new markets.</p><p>We help you define your position, run acquisition campaigns and develop partnerships in new markets.</p><a href="#contact">Discuss a project <span aria-hidden>↗</span></a></Reveal>
              <Reveal className="growth-details"><div><h4>Define your position</h4><p>Clarify your audience, positioning and route to market.</p></div><div><h4>Build demand</h4><p>Plan, run and refine paid acquisition campaigns.</p></div><div><h4>Run focused sprints</h4><p>Turn the plan into a focused 30–90-day execution sprint.</p></div><div><h4>Build partnerships</h4><p>Develop commercial relationships in your target market.</p></div></Reveal>
            </article>
          </section>
          <ServiceBrief />
          <LogoWall />
          <section id="paris" className="paris-board" aria-labelledby="paris-heading">
            <Reveal className="section-intro"><h2 id="paris-heading">Based in Paris.</h2><p>Our headquarters are at Station F, 5 Parvis Alan Turing, 75013 Paris. We support businesses expanding internationally.</p></Reveal>
            <Reveal className="paris-pictures">
              <figure><Image src="/images/station-f/interieur-de-la-station-f-juin-2022.jpg" alt="Skylights and shared spaces inside Station F" width={1280} height={960} sizes="(max-width: 700px) 100vw, 50vw" /><figcaption>Inside Station F · June 2022</figcaption></figure>
              <figure><Image src="/images/station-f/hec-paris-incubator.jpg" alt="HEC incubator and shared campus workspaces at Station F" width={1280} height={960} sizes="(max-width: 700px) 50vw, 25vw" /><figcaption>HEC incubator · February 2023</figcaption></figure>
              <figure><Image src="/images/station-f/hec-paris-startup-launchpad-demo-day-2024.jpg" alt="HEC Launchpad event setup at Station F in 2024" width={1280} height={1707} sizes="(max-width: 700px) 50vw, 25vw" /><figcaption>HEC Launchpad · April 2024</figcaption></figure>
            </Reveal>
            <details className="photo-credits"><summary>Photo credits</summary><p>Station F campus and event photos, not Argos Labs staff or events.</p><p>Images are cropped for display. Source licenses apply.</p><ul>
              <li><a href="https://commons.wikimedia.org/wiki/File:Int%C3%A9rieur_de_la_Station_F_juin_2022_3.jpg">Intérieur de la Station F juin 2022 3 — photographed by Artvill</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</li>
              <li><a href="https://commons.wikimedia.org/wiki/File:HEC_Paris_Incubator.jpg">HEC Paris Incubator — photographed by BobVillars</a> · <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</li>
              <li><a href="https://commons.wikimedia.org/wiki/File:HEC_Paris_Startup_Launchpad_Demo_Day_2024_at_Station_F.jpg">HEC Paris Startup Launchpad Demo Day 2024 at Station F — photographed by Pasparfait</a> · <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>.</li>
            </ul><p>The hero film is an architectural illustration, not a view of our offices.</p></details>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
