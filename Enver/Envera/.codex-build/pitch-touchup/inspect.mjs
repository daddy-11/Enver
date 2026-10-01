import { FileBlob, PresentationFile } from "@oai/artifact-tool";

const sourcePath = "C:/Users/dbleg/OneDrive/Desktop/Envera/Pitch_Deck_26/public/EnverAI-Artificer-Google-Pitch.pptx";
const presentation = await PresentationFile.importPptx(await FileBlob.load(sourcePath));
const snapshot = await presentation.inspect({
  kind: "slide,textbox,shape,image,layout",
  include: "id,slide,name,title,textPreview,bbox,alt",
  maxChars: 50000,
});
console.log(snapshot.ndjson);
