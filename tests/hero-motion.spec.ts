import { expect, test } from "@playwright/test";

test("hero plays, pauses on its frame and resumes without restarting", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const video = page.locator(".hero-film video");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(0.5);
  await page.getByRole("button", { name: "Pause video", exact: true }).click();
  const pausedAt = await video.evaluate((v: HTMLVideoElement) => v.currentTime);
  await expect(video).toHaveJSProperty("paused", true);
  await page.waitForTimeout(300);
  expect(await video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBe(pausedAt);
  await expect(video).toHaveClass("film-ready");
  await page.getByRole("button", { name: "Play video", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect.poll(() => video.evaluate((v: HTMLVideoElement) => v.currentTime)).toBeGreaterThan(pausedAt + 0.2);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(video).toHaveJSProperty("paused", true);
  await expect(video).not.toBeVisible();
  await expect(page.locator(".hero-film img")).toBeVisible();
});
