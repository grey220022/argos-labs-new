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
          <nav aria-label="Pillars">
            <a href="#agents">Agents</a><a href="#cloud">Cloud</a><a href="#growth">Growth</a>
          </nav>
          <a className="header-contact" href="#contact">Let’s talk <span aria-hidden>↗</span></a>
        </header>
        <main id="main">
          <section className="hero-board" aria-labelledby="home-title">
            <div className="hero-copy">
              <h1 id="home-title">AI, put<br />to work.</h1>
              <p>Enterprise AI agents, cloud infrastructure and international growth. One team to move your business forward.</p>
              <a className="board-button" href="#pillars">Explore our services <span aria-hidden>↓</span></a>
            </div>
            <HeroFilm />
            <div className="hero-location"><p>Based at Station F.<br />Building beyond borders.</p><a href="#paris">Paris, France <span aria-hidden>↗</span></a></div>
            <div className="hero-statement"><p>From the first workflow<br />to your next market.</p><a href="#contact">Find your starting point <span aria-hidden>↗</span></a></div>
          </section>

          <section id="pillars" className="services-board" aria-labelledby="services-heading">
            <Reveal className="section-intro"><h2 id="services-heading">Three ways forward.</h2><p>Build the intelligence. Run the infrastructure. Reach the people who need it.</p></Reveal>
            <article id="agents" data-pillar="agents" className="agent-board">
              <Reveal className="service-copy"><h3>Agents</h3><p className="service-statement">Your tools.<br />More capable hands.</p><p>Autonomous agents with persistent state, connected tools and observable runs. Give each task a clear goal and an explicit budget.</p><a href="#contact">Plan an agent workflow <span aria-hidden>↗</span></a></Reveal>
              <Reveal className="capability-list">
                <div><h4>Keep the context</h4><p>Persistent state carries work across sessions.</p></div>
                <div><h4>Connect the tools</h4><p>Browser, shell and search work together on a task.</p></div>
                <div><h4>See the work</h4><p>Follow each run with traces, logs and budget controls.</p></div>
              </Reveal>
            </article>
            <article id="cloud" data-pillar="cloud" className="cloud-board">
              <Reveal className="cloud-heading"><h3>Cloud</h3><p className="service-statement">Infrastructure that<br />moves with your AI.</p><Link href="/cloud">Explore Argos Cloud <span aria-hidden>↗</span></Link></Reveal>
              <Reveal className="cloud-details"><div><h4>Scale with the workload</h4><p>Autoscaling compute and multi-region deployment for AI applications.</p></div><div><h4>Pay for the work</h4><p>Billed per token and per second.</p><p>Stops billing when your job stops.</p></div></Reveal>
            </article>
            <article id="growth" data-pillar="growth" className="growth-board">
              <Reveal className="service-copy"><h3>Growth</h3><p className="service-statement">Good technology.<br />A wider world.</p><p>Hands-on support for international growth, from finding your position to building the relationships that open a market.</p><a href="#contact">Discuss your market <span aria-hidden>↗</span></a></Reveal>
              <Reveal className="growth-details"><div><h4>Find your position</h4><p>Go-to-market strategy and positioning.</p></div><div><h4>Build demand</h4><p>Paid acquisition and campaign management.</p></div><div><h4>Put it into motion</h4><p>30–90-day execution sprints.</p></div><div><h4>Open doors</h4><p>Business development and partnerships.</p></div></Reveal>
            </article>
          </section>
          <ServiceBrief />
          <LogoWall />
          <section id="paris" className="paris-board" aria-labelledby="paris-heading">
            <Reveal className="section-intro"><h2 id="paris-heading">Built from Paris.</h2><p>Our headquarters are at Station F, 5 Parvis Alan Turing, Paris. A place where new businesses take shape.</p></Reveal>
            <Reveal className="paris-pictures">
              <figure><Image src="/images/station-f/interieur-de-la-station-f-juin-2022.jpg" alt="Skylights and shared spaces inside Station F" width={1280} height={960} sizes="(max-width: 700px) 100vw, 50vw" /><figcaption>Inside Station F · June 2022</figcaption></figure>
              <figure><Image src="/images/station-f/hec-paris-incubator.jpg" alt="HEC incubator and shared campus workspaces at Station F" width={1280} height={960} sizes="(max-width: 700px) 50vw, 25vw" /><figcaption>The campus · February 2023</figcaption></figure>
              <figure><Image src="/images/station-f/hec-paris-startup-launchpad-demo-day-2024.jpg" alt="HEC Launchpad event setup at Station F in 2024" width={1280} height={1707} sizes="(max-width: 700px) 50vw, 25vw" /><figcaption>HEC Launchpad · April 2024</figcaption></figure>
            </Reveal>
            <details className="photo-credits"><summary>Photography & credits</summary><p>Public campus photographs, not Argos Labs team or event photography. Crops shown; original images retain their licenses.</p><ul>
              <li><a href="https://commons.wikimedia.org/wiki/File:Int%C3%A9rieur_de_la_Station_F_juin_2022_3.jpg">Intérieur de la Station F juin 2022 3</a> — Artvill, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</li>
              <li><a href="https://commons.wikimedia.org/wiki/File:HEC_Paris_Incubator.jpg">HEC Paris Incubator</a> — BobVillars, <a href="https://creativecommons.org/licenses/by-sa/4.0/">CC BY-SA 4.0</a>.</li>
              <li><a href="https://commons.wikimedia.org/wiki/File:HEC_Paris_Startup_Launchpad_Demo_Day_2024_at_Station_F.jpg">HEC Paris Startup Launchpad Demo Day 2024 at Station F</a> — Pasparfait, <a href="https://creativecommons.org/publicdomain/zero/1.0/">CC0</a>.</li>
            </ul><p>Hero film and poster: existing Argos Labs website assets, retained as an architectural study.</p></details>
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}
