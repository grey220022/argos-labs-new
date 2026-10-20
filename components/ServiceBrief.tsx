"use client";

import { useState } from "react";

const services = {
  Agents: { title: "Give your team an agent.", detail: "Connect your tools, define a task and set a budget. Start with the workflow you want to take off your team's hands.", prompt: "The workflow we want to automate is: " },
  Cloud: { title: "Make room for your AI.", detail: "Plan your compute, model access and deployment across clouds. Start with your workload and the regions you need to serve.", prompt: "Our workload, current cloud and target regions are: " },
  Growth: { title: "Reach your next market.", detail: "Bring strategy, acquisition and business development into an execution plan. Start with your product and target market.", prompt: "Our product and target market are: " },
} as const;
type Service = keyof typeof services;

export default function ServiceBrief() {
  const [selected, setSelected] = useState<Service>("Agents");
  const service = services[selected];
  const href = `mailto:contact@argoslabs.io?subject=${encodeURIComponent(`Argos Labs — ${selected} project`)}&body=${encodeURIComponent(`Hello Argos Labs,\n\nI'd like to discuss ${selected}.\n\n${service.prompt}\n\nOur timeline is: \n\nBest,\n`)}`;
  return (
    <section id="contact" className="brief-board" aria-labelledby="brief-heading">
      <div>
        <h2 id="brief-heading">Where do we start?</h2>
        <p>Choose what you need. We’ll take it from there.</p>
        <fieldset>
          <legend>Your starting point</legend>
          <div className="service-options">
            {(Object.keys(services) as Service[]).map((name) => (
              <label key={name}>
                <input type="radio" name="service" value={name} checked={selected === name} onChange={() => setSelected(name)} />
                <span>{name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <div className="brief-answer">
        <div key={selected} aria-live="polite" className="brief-copy">
          <h3>{service.title}</h3>
          <p>{service.detail}</p>
        </div>
        <a className="board-button" href={href}>Discuss {selected} <span aria-hidden>↗</span></a>
        <p className="board-note">Opens your email app with a short project brief.</p>
      </div>
    </section>
  );
}
