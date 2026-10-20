"use client";

import { useState } from "react";

const services = {
  Agents: {
    title: "Automate a workflow.",
    detail: "Tell us which task you want to automate, the tools it uses and what a successful result looks like.",
    prompt: "Workflow to automate: \nTools and systems involved: \nWhat success looks like: ",
  },
  Cloud: {
    title: "Plan your cloud setup.",
    detail: "Share your workload, current providers and target regions so we can discuss compute, model access and deployment.",
    prompt: "Workload and current providers: \nTarget regions: \nCompute or model requirements: ",
  },
  Growth: {
    title: "Enter a new market.",
    detail: "Tell us about your product, target customers and the market you want to enter. We can discuss strategy and execution.",
    prompt: "Product and target customers: \nMarket to enter: \nGrowth objectives: ",
  },
} as const;
type Service = keyof typeof services;

export default function ServiceBrief() {
  const [selected, setSelected] = useState<Service>("Agents");
  const service = services[selected];
  const href = `mailto:contact@argoslabs.io?subject=${encodeURIComponent(`Argos Labs — ${selected} project`)}&body=${encodeURIComponent(`Hello Argos Labs,\n\nI'd like to discuss ${selected}.\n\n${service.prompt}\n\nTarget timeline: \n\nBest,\n`)}`;
  return (
    <section id="contact" className="brief-board" aria-labelledby="brief-heading">
      <div>
        <h2 id="brief-heading">Tell us your goal.</h2>
        <p>Select a service to prepare a short project brief.</p>
        <fieldset>
          <legend>Service of interest</legend>
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
        <a className="board-button" href={href}>Email about {selected} <span aria-hidden>↗</span></a>
        <p className="board-note">Opens an email draft you can edit before sending.</p>
      </div>
    </section>
  );
}
