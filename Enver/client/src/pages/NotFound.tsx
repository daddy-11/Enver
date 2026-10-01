import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center py-20 bg-[#F7F3E9] text-[#2B121F]">
      <div className="text-center px-4">
        <div className="text-8xl font-heading font-extrabold text-[#2B121F]/15 mb-4">404</div>
        <h1 className="text-3xl font-heading font-extrabold text-[#2B121F] mb-3">
          Page not found.
        </h1>
        <p className="text-sm font-sans text-[#7A6F68] mb-8 max-w-md mx-auto leading-relaxed">
          The requested operational resource doesn't exist or has been relocated within the intelligence registry.
        </p>
        <Link href="/" className="almetra-btn-primary !min-h-[44px] !px-6 text-xs font-mono no-underline inline-flex items-center gap-2">
          <ArrowLeft size={16} /> Back to Overview
        </Link>
      </div>
    </div>
  );
}
