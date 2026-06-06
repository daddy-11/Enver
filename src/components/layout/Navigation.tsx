"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wordmark } from "@/components/ui/Logo";

const LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/about",    label: "About"    },
  { href: "/contact",  label: "Contact"  },
];

export function Navigation() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky", top: 0, zIndex: 200,
        background: scrolled ? "rgba(250,250,248,0.93)" : "rgba(250,250,248,0.6)",
        backdropFilter: "blur(18px)",
        borderBottom: `0.5px solid ${scrolled ? "rgba(0,0,0,0.09)" : "transparent"}`,
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <nav
        className="container"
        style={{
          height: 58, display: "flex",
          alignItems: "center", justifyContent: "space-between",
        }}
        aria-label="Main navigation"
      >
        <Link href="/" aria-label="Enver AI Tech home">
          <Wordmark size={28} />
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              style={{
                padding: "6px 14px",
                borderRadius: "var(--r-sm)",
                fontSize: 13, fontWeight: 500,
                color: pathname === href ? "var(--text)" : "var(--muted)",
                background: pathname === href ? "rgba(0,0,0,0.05)" : "transparent",
                transition: "background 0.15s, color 0.15s",
              }}
            >
              {label}
            </Link>
          ))}
        </div>

        <Link href="/contact" className="btn btn-primary btn-sm">
          Get access
        </Link>
      </nav>
    </header>
  );
}
