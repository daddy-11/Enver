"use client";

import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer style={{ borderTop: '0.5px solid var(--border)', padding: '2.5rem 2rem', background: 'var(--surface)' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 15 }}>
          <Image src="/logo.png" alt="Enver AI Tech Logo" width={24} height={24} style={{ objectFit: 'contain' }} />
          Enver AI Tech
        </div>
        <div style={{ display: 'flex', gap: '2rem', fontSize: 13 }}>
          <Link href="/projects" style={{ color: 'var(--muted)', cursor: 'pointer', textDecoration: 'none' }}>Projects</Link>
          <Link href="/about" style={{ color: 'var(--muted)', cursor: 'pointer', textDecoration: 'none' }}>About</Link>
          <Link href="/contact" style={{ color: 'var(--muted)', cursor: 'pointer', textDecoration: 'none' }}>Contact</Link>
        </div>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)' }}>&copy; 2024 Enver AI Tech &middot; enver-ai.tech</div>
      </div>
    </footer>
  );
}
