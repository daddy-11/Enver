import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen w-full flex flex-col bg-cream">
      <Navbar />
      <main className="flex-1 w-full pt-16 md:pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
}
