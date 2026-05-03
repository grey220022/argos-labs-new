// Split every text node under `root` into per-character spans for staggered
// reveal animation. Words are wrapped in `inline-block` containers so the
// browser only breaks lines between words — never mid-word.
//
// Inline DOM structure (e.g. <span class="text-accent">tinted phrase</span>)
// is preserved; chars inside such spans inherit their parent's color.
//
// Sets `[data-char]` on each character span so animation can target them via
// `:scope [data-char]` or `${rootSelector} [data-char]`.

export function splitWordsAndChars(root: HTMLElement) {
  if (root.dataset.split) return;
  root.setAttribute("aria-label", root.textContent ?? "");
  root.dataset.split = "1";

  // Walk all text nodes, but skip subtrees flagged `data-no-split` so that
  // dynamic widgets (RotatingPhrase, AgentsCodeBlock-like content) keep their
  // own DOM untouched and can mutate textContent imperatively.
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(n) {
      let parent: HTMLElement | null = (n as Text).parentElement;
      while (parent && parent !== root) {
        if (parent.dataset?.noSplit !== undefined) {
          return NodeFilter.FILTER_REJECT;
        }
        parent = parent.parentElement;
      }
      return NodeFilter.FILTER_ACCEPT;
    },
  });
  const textNodes: Text[] = [];
  let node: Node | null;
  while ((node = walker.nextNode())) {
    textNodes.push(node as Text);
  }

  for (const tn of textNodes) {
    const text = tn.textContent ?? "";
    if (!text) continue;
    const parent = tn.parentNode;
    if (!parent) continue;

    const fragment = document.createDocumentFragment();
    // Tokenize: alternating words and runs of whitespace.
    const tokens = text.split(/(\s+)/);
    for (const token of tokens) {
      if (!token) continue;
      if (/^\s+$/.test(token)) {
        // Plain text node so the browser can break the line at this space.
        fragment.appendChild(document.createTextNode(token));
        continue;
      }
      // Word container — inline-block + nowrap so the chars inside stay
      // together as one wrap unit. Without white-space:nowrap, the browser
      // still breaks between the inline-block char children. aria-hidden
      // because the heading already has aria-label set.
      const wordSpan = document.createElement("span");
      wordSpan.setAttribute("aria-hidden", "true");
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";
      for (const ch of token) {
        const charSpan = document.createElement("span");
        charSpan.dataset.char = "1";
        charSpan.style.display = "inline-block";
        charSpan.style.opacity = "0";
        charSpan.style.willChange = "transform, opacity";
        charSpan.textContent = ch;
        wordSpan.appendChild(charSpan);
      }
      fragment.appendChild(wordSpan);
    }
    parent.replaceChild(fragment, tn);
  }
}
