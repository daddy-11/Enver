"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, Sparkles, Menu, X } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-[#FAF6EF]/95 border-b border-[#121212] py-2" 
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4"
        aria-label="Main navigation"
      >
        {/* Left: Logo */}
        <Link href="/" aria-label="Enver AI Tech home" className="shrink-0 flex items-center gap-2">
          <span className="font-sans font-extrabold text-2xl tracking-tighter text-[#121212]">
            enver
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#E8660A] animate-pulse" />
        </Link>

        {/* Center/Right navigation container for Desktop */}
        <div className="hidden md:flex items-center gap-6 bg-transparent">
          {/* Light-blue Enver Method pill link */}
          <Link
            href="/about"
            className="flex items-center gap-2 bg-[#CBEFFF] border border-[#121212] rounded-full px-4 py-2 text-xs font-bold text-[#121212] hover:bg-[#b2e5ff] transition-all shadow-sm hover:scale-[1.02]"
          >
            <span>The Enver Method</span>
            <span className="w-4 h-4 rounded-full bg-white border border-[#121212] flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-[#E8660A]" strokeWidth={2.5} />
            </span>
          </Link>

          {/* Links */}
          <div className="flex items-center gap-5">
            {[
              { href: "/projects", label: "Projects" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
            ].map(({ href, label }) => {
              const active = isActive(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`text-sm font-semibold tracking-tight transition-colors hover:text-[#E8660A] ${
                    active ? "text-[#E8660A]" : "text-[#121212]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right buttons container */}
        <div className="flex items-center gap-2">
          {/* CTA Link (hidden on tiny screens to save space) */}
          <Link
            href="/contact"
            className="hidden sm:inline-flex bg-[#121212] text-white text-xs md:text-sm font-extrabold rounded-full px-5 py-2.5 border border-[#121212] items-center gap-2 hover:bg-[#232323] transition-colors shadow-sm"
          >
            <span>Get access</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
          </Link>

          {/* Hamburger toggle button (visible on mobile only) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex md:hidden w-10 h-10 border border-[#121212] rounded-full items-center justify-center bg-white hover:bg-neutral-50 active:scale-95 transition-all text-[#121212]"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Slide-Down Mobile Drawer Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#FAF6EF] border-b border-[#121212] p-6 flex flex-col gap-6 md:hidden z-40 shadow-lg animate-in slide-in-from-top duration-300">
          <Link 
            href="/about" 
            className="flex items-center justify-between bg-[#CBEFFF] border border-[#121212] rounded-2xl p-4 text-sm font-bold text-[#121212]"
          >
            <span>The Enver Method</span>
            <Sparkles className="w-4 h-4 text-[#E8660A]" />
          </Link>

          <div className="flex flex-col gap-4 border-t border-[#121212]/10 pt-4">
            {[
              { href: "/projects", label: "Projects" },
              { href: "/services", label: "Services" },
              { href: "/about", label: "About" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className={`text-lg font-bold tracking-tight py-2 border-b border-[#121212]/5 ${
                  isActive(href) ? "text-[#E8660A]" : "text-[#121212]"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          <Link
            href="/contact"
            className="bg-[#121212] text-white text-center font-extrabold rounded-full py-4 border border-[#121212] flex items-center justify-center gap-2 hover:bg-[#232323]"
          >
            <span>Get access</span>
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </Link>
        </div>
      )}
    </header>
  );
}
