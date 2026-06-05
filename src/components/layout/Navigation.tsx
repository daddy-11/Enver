"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav>
      <Link href="/" className="nav-brand">
        <Image src="/logo.png" alt="Enver AI Tech" width={30} height={30} style={{ objectFit: 'contain' }} />
        Enver AI Tech
      </Link>
      <div className="nav-links">
        <Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`}>Home</Link>
        <Link href="/projects" className={`nav-link ${pathname?.startsWith("/projects") ? "active" : ""}`}>Projects</Link>
        <Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`}>About</Link>
        <Link href="/contact" className={`nav-link ${pathname === "/contact" ? "active" : ""}`}>Contact</Link>
      </div>
      <Link href="/contact" className="nav-cta">Get access &rarr;</Link>
    </nav>
  );
}
