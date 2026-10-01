import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const workspaceDir = "C:/Users/dbleg/OneDrive/Desktop/Envera";
const skillDir = "C:/Users/dbleg/.codex/plugins/cache/openai-primary-runtime/presentations/26.909.12148/skills/presentations";
const runtimePython = "C:/Users/dbleg/.cache/codex-runtimes/codex-primary-runtime/dependencies/python/python.exe";
const sourcePath = path.join(workspaceDir, "Pitch_Deck_26/public/EnverAI-Artificer-Google-Pitch.pptx");
const logoPath = "C:/Users/dbleg/OneDrive/Pictures/Screenshots 1/Screenshot 2026-09-22 194927.png";
const buildDir = path.join(workspaceDir, ".codex-build/pitch-touchup");
const finalDir = path.join(workspaceDir, "Pitch_Deck_26/public/pitch-ready");
const finalPath = path.join(finalDir, "EnverAI-Artificer-Google-Pitch-crowd-ready.pptx");
const stagingDir = path.join(workspaceDir, ".codex-finalizer");

const DARK = "#071A11";
const GOLD = "#C6A448";
const IVORY = "#F3EEE2";
const MUTED = "#A3B2A8";
const headerLogoCrop = { left: 0.17, top: 0.03, right: 0.17, bottom: 0.32 };
const logoBytes = new Uint8Array(await fs.readFile(logoPath));

const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePath));

function addText(slide, text, position, style) {
  const box = slide.shapes.add({
    geometry: "textbox",
    position,
    fill: "none",
    line: { fill: "none", width: 0 },
  });
  box.text = text;
  box.text.style = { typeface: "Arial", autoFit: "shrinkText", ...style };
  return box;
}

function cover(slide, position, fill = DARK) {
  return slide.shapes.add({
    geometry: "rect",
    position,
    fill,
    line: { fill: "none", width: 0 },
  });
}

function addBrandHeader(slide) {
  cover(slide, { left: 43, top: 37, width: 260, height: 51 });
  slide.images.add({
    blob: logoBytes,
    contentType: "image/png",
    alt: "Enver AI Tech logo",
    fit: "cover",
    crop: headerLogoCrop,
    geometry: "ellipse",
    position: { left: 57, top: 45, width: 38, height: 38 },
  });
  addText(slide, "ENVER AI TECH", { left: 108, top: 49, width: 164, height: 18 }, {
    fontSize: 12,
    bold: true,
    color: GOLD,
    characterSpacing: 2,
  });
  addText(slide, "ARTIFICER MVP", { left: 109, top: 68, width: 155, height: 14 }, {
    fontSize: 8.5,
    color: MUTED,
    characterSpacing: 1,
  });
}

for (let index = 1; index <= 11; index += 1) {
  addBrandHeader(presentation.slides.getItem(index));
}

// Opening and close: replace the old emblem with the supplied mark while retaining the deck's minimal title treatment.
for (const index of [0, 12]) {
  const slide = presentation.slides.getItem(index);
  cover(slide, { left: 955, top: 320, width: 200, height: 195 });
  slide.images.add({
    blob: logoBytes,
    contentType: "image/png",
    alt: "Enver AI Tech logo",
    fit: "cover",
    crop: headerLogoCrop,
    geometry: "ellipse",
    position: { left: 970, top: 333, width: 168, height: 168 },
  });
}

// Slide 11 is the strategic reason for the Google room: retain its infrastructure proof, then make the framing explicit.
const googleSlide = presentation.slides.getItem(10);
cover(googleSlide, { left: 42, top: 98, width: 2015, height: 118 });
addText(googleSlide, "The MVP already runs on Google Cloud", { left: 60, top: 112, width: 1420, height: 70 }, {
  fontSize: 54,
  bold: true,
  color: IVORY,
  typeface: "Cambria",
});
cover(googleSlide, { left: 60, top: 198, width: 55, height: 2 }, GOLD);
cover(googleSlide, { left: 58, top: 515, width: 1940, height: 96 });
addText(
  googleSlide,
  "Enver already runs in its own Google Cloud organisation. This room helps move an existing Google-native MVP into live lender pilots.",
  { left: 60, top: 529, width: 1800, height: 52 },
  { fontSize: 23, color: MUTED, typeface: "Arial" },
);

await fs.mkdir(buildDir, { recursive: true });
await fs.mkdir(finalDir, { recursive: true });
await fs.mkdir(stagingDir, { recursive: true });
const candidatePath = path.join(stagingDir, "EnverAI-Artificer-Google-Pitch-crowd-ready-candidate.pptx");
await (await PresentationFile.exportPptx(presentation)).save(candidatePath);

const { finalizePresentation } = await import(pathToFileURL(
  path.join(skillDir, "container_tools/artifact_tool_utils.mjs"),
).href);
const result = await finalizePresentation({
  explicitTotalSlideCount: 13,
  workspaceDir,
  candidatePath,
  finalPath,
  pythonExecutable: runtimePython,
  integrityValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_package_integrity.py"),
  layoutValidatorPath: path.join(skillDir, "container_tools/inspect_presentation_layout_geometry.py"),
  layoutArgs: ["--expected-slide-size-emu", "20104100,11309350", "--validate-heading-fit"],
  fontPolicy: {
    basis: "reference",
    families: ["Arial", "Arial MT", "Cambria", "Consolas", "Courier New", "Times New Roman"],
    referencePath: sourcePath,
    referenceSha256: "7addabcf3174251a61b37d9f0102b2892d93fd6d80edbfe9d2b516d93f8d34f5",
  },
  verifyArtifactToolImport: true,
  receiptPath: path.join(stagingDir, "EnverAI-Artificer-Google-Pitch-crowd-ready.validation.json"),
});
console.log(JSON.stringify({ finalPath, candidatePath, result }, null, 2));
