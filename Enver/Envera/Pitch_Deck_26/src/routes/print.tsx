import { createFileRoute } from "@tanstack/react-router";
import { SlideView, SLIDE_COUNT } from "@/components/deck/slides";

export const Route = createFileRoute("/print")({ component: PrintDeck });

function PrintDeck() {
  return (
    <div className="bg-grove">
      {Array.from({ length: SLIDE_COUNT }).map((_, i) => (
        <div key={i} className="print-sheet">
          <SlideView index={i} />
        </div>
      ))}
    </div>
  );
}
