import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { PDFDocument } from "pdf-lib";

const fileName = "EnverAI-Artificer-Google-Pitch.pdf";
const publicPath = path.join("/workspace/public", fileName);
const artifactPath = path.join("/workspace/artifacts", fileName);

const browser = await chromium.launch({ args: ["--no-sandbox"] });
const page = await browser.newPage({
  viewport: { width: 1920, height: 1080 },
  deviceScaleFactor: 2,
});
await page.goto("http://127.0.0.1:8080/print", {
  waitUntil: "networkidle",
  timeout: 60_000,
});
await page.addStyleTag({
  content: `
    [data-grok-pwa], #grok-pwa-pill, iframe[src*="grok.com"],
    a[href*="grok.com/grok-app-builder"] { display: none !important; }
  `,
});
await page.waitForTimeout(2000);

const slides = page.locator(".slide-stage");
const count = await slides.count();
const pdf = await PDFDocument.create();
pdf.setTitle("Enver AI Tech — Artificer | Google Pitch");
pdf.setAuthor("ENVER-AITECH INDIA PRIVATE LIMITED");
pdf.setSubject("Google for Startups Cloud credits and incubator seat");

for (let i = 0; i < count; i++) {
  const shot = await slides.nth(i).screenshot({ type: "jpeg", quality: 92 });
  const img = await pdf.embedJpg(shot);
  const p = pdf.addPage([1920, 1080]);
  p.drawImage(img, { x: 0, y: 0, width: 1920, height: 1080 });
}

const bytes = await pdf.save();
await mkdir("/workspace/public", { recursive: true });
await mkdir("/workspace/artifacts", { recursive: true });
await writeFile(publicPath, bytes);
await writeFile(artifactPath, bytes);
await browser.close();
console.log(`wrote ${count} slides → ${publicPath} (${bytes.length} bytes)`);
