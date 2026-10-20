import { expect, test } from "@playwright/test";

const retiredContent =
  /\b(?:crypto(?:currency)?|blockchain|web3|on[- ]?chain|solana|ethereum|evm|sollpay|soll protocol|walletconnect|defi|nft|stablecoin)\b/i;

test("homepage keeps working service links and all remaining partner assets", async ({
  page,
  request,
  isMobile,
}, testInfo) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  const response = await page.goto("/", { waitUntil: "domcontentloaded" });
  expect(response?.status()).toBe(200);

  const nav = page.getByRole("navigation", { name: "Services" });
  await expect(nav.getByRole("link")).toHaveText(["Agents", "Cloud", "Growth"]);
  await expect(page.locator("#pillars article")).toHaveCount(3);

  for (const link of await page.locator('a[href^="#"]').all()) {
    const href = await link.getAttribute("href");
    expect(href).toBeTruthy();
    await expect(page.locator(href!)).toHaveCount(1);
  }
  for (const name of ["Agents", "Cloud", "Growth"]) {
    await nav.getByRole("link", { name, exact: true }).click();
    await expect(page).toHaveURL(new RegExp(`#${name.toLowerCase()}$`));
  }

  const partners = page.locator('section[aria-labelledby="trusted-by"]');
  const images = partners.locator("img");
  await expect(images).toHaveCount(14);
  if (isMobile) {
    await expect(partners.locator("img:visible")).toHaveCount(7);
    const toggle = partners.getByRole("button", { name: "Show 7 more" });
    await toggle.focus();
    await page.keyboard.press("Enter");
    await expect(partners.getByRole("button")).toHaveAttribute("aria-expanded", "true");
    await expect(partners.locator("img:visible")).toHaveCount(14);
  }
  for (const image of await images.all()) {
    const source = await image.getAttribute("src");
    expect(source).toBeTruthy();
    expect((await request.get(source!)).ok()).toBeTruthy();
  }
  expect(await page.locator("body").textContent()).not.toMatch(retiredContent);
  await expect(page.getByText("Track model tokens and compute time.")).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("home.png"), fullPage: true, scale: "css" });
  await page.locator("#pillars").screenshot({ path: testInfo.outputPath("services.png"), scale: "css" });

  if (isMobile) {
    await partners.getByRole("button", { name: "Show less" }).click();
    await expect(partners.locator("img:visible")).toHaveCount(7);
  }
  await page.locator('#pillars article[data-pillar="cloud"]').getByRole("link").click();
  await expect(page).toHaveURL(/\/cloud$/);
  await page.getByRole("link", { name: "Argos Labs", exact: true }).click();
  await expect(page).toHaveURL(/\/$/);
  expect(pageErrors).toEqual([]);
});

test("Cloud keeps model billing and bank payments without relabeling customer totals", async ({
  page,
}, testInfo) => {
  const pageErrors: string[] = [];
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  expect((await page.goto("/cloud", { waitUntil: "domcontentloaded" }))?.status()).toBe(200);
  await expect(page).toHaveTitle("Argos Cloud — Cloud Engineering for AI and Fintech");
  await expect(page.getByRole("heading", { name: "AI operations" })).toBeVisible();
  expect(await page.locator("body").textContent()).not.toMatch(retiredContent);
  await expect(page.getByText(/Credit card, wire, SEPA, SWIFT/)).toBeVisible();
  await expect(page.getByText(/Use routing, semantic caching and request batching/)).toBeVisible();
  const proof = page.locator('section[aria-labelledby="cloud-proof"]');
  await expect(proof).not.toContainText("100+");
  await expect(page.locator("body")).not.toContainText("99.99%");
  await expect(page.getByRole("link", { name: "Talk to an architect", exact: true })).toHaveAttribute("href", /^mailto:/);
  await expect(proof).toContainText("GPU infrastructure");
  await expect(proof).toContainText("LLM gateways");
  const contactLinks = page.locator('a[href^="mailto:contact@argoslabs.io"]');
  expect(await contactLinks.count()).toBeGreaterThan(0);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("cloud.png"), fullPage: true, scale: "css" });
  expect(pageErrors).toEqual([]);
});

test("metadata, social artwork and retired public URLs are clean", async ({ page, request }) => {
  for (const route of ["/", "/cloud"]) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    expect(await response!.text()).not.toMatch(retiredContent);
    for (const selector of [
      'meta[name="description"]',
      'meta[property="og:description"]',
      'meta[name="twitter:description"]',
    ]) {
      const content = await page.locator(selector).getAttribute("content");
      expect(content).toBeTruthy();
      expect(content).not.toMatch(retiredContent);
    }
  }
  const og = await request.get("/opengraph-image");
  expect(og.ok()).toBeTruthy();
  expect(og.headers()["content-type"]).toContain("image/png");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).not.toMatch(retiredContent);
  for (const path of [
    "/onchain", "/chain",
    ...["circle.avif", "ledger.png", "quantstamp.png", "solana.svg", "iexec.svg",
      "meria.svg", "morningstar-ventures.svg", "cypher-capital.svg", "binance.svg",
      "stellar.svg", "standx.png", "debot.png"].map((file) => `/images/${file}`),
  ]) {
    expect((await request.get(path)).status(), path).toBe(404);
  }
});

test("service brief supports keyboard choices and honest email handoff", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const agents = page.getByRole("radio", { name: "Agents", exact: true });
  await expect(agents).toBeChecked();
  await agents.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Cloud", exact: true })).toBeChecked();
  const cloud = page.getByRole("link", { name: "Email about Cloud" });
  const href = await cloud.getAttribute("href");
  expect(decodeURIComponent(href!)).toContain("Argos Labs — Cloud project");
  expect(decodeURIComponent(href!)).toContain("Workload and current providers:");
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("radio", { name: "Growth", exact: true })).toBeChecked();
  await expect(page.getByRole("link", { name: "Email about Growth" })).toBeVisible();
  await page.getByText("Photo credits", { exact: true }).click();
  await expect(page.getByText("Station F campus and event photos", { exact: false })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});
