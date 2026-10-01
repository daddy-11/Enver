import fs from "node:fs/promises";
import path from "node:path";
import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const input = "C:/Users/dbleg/OneDrive/Desktop/Envera/Pitch_Deck_26/public/pitch-ready/EnverAI-Artificer-Google-Pitch-crowd-ready.pptx";
const outDir = "C:/Users/dbleg/OneDrive/Desktop/Envera/tmp/pdfs/pitch-ready-render";
await fs.mkdir(outDir, { recursive: true });
const deck = await PresentationFile.importPptx(await FileBlob.load(input));
for (let index = 0; index < deck.slides.items.length; index += 1) {
  const png = await deck.slides.getItem(index).export({ format: "png", scale: 2 });
  await fs.writeFile(path.join(outDir, `slide-${String(index + 1).padStart(2, "0")}.png`), new Uint8Array(await png.arrayBuffer()));
}
console.log(outDir);
