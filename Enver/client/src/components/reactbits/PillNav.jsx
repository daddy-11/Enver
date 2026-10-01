'use client';

import React, { useState } from 'react';
import { Link } from 'wouter';
import './PillNav.css';

const PillNav = ({
  logo,
  logoAlt = 'Logo',
  items = [],
  activeHref,
  className = '',
  theme = 'tranquil',
  baseColor = '#0284c7',
  pillColor = '#ffffff',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#0a2533',
  onMobileMenuClick
}) => {
  const isExternalLink = (href) =>
    !href ||
    href.startsWith('http://') ||
    href.startsWith('https://') ||
    href.startsWith('//') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:') ||
    href.startsWith('#');

  const isRouterLink = (href) => href && !isExternalLink(href);

  const cssVars = {
    '--base': baseColor,
    '--pill-bg': pillColor,
    '--hover-text': hoveredPillTextColor,
    '--pill-text': pillTextColor
  };

  return (
    <div className={`pill-nav-container ${className}`}>
      <nav className="pill-nav" aria-label="Primary" style={cssVars}>
        <div className={`pill-nav-items desktop-only ${theme === 'nocturne' ? 'theme-nocturne' : ''}`}>
          <ul className="pill-list" role="menubar">
            {items.map((item, i) => {
              const isActive = activeHref === item.href;
              return (
                <li key={item.label || item.href || i} role="none">
                  {isRouterLink(item.href) ? (
                    <Link
                      href={item.href}
                      className={`pill cursor-target${isActive ? ' is-active' : ''}`}
                      aria-label={item.ariaLabel || item.label}
                      role="menuitem"
                      onClick={item.onClick}
                    >
                      <span className="pill-label">{item.label}</span>
                    </Link>
                  ) : (
                    <button
                      type="button"
                      role="menuitem"
                      className={`pill cursor-target${isActive ? ' is-active' : ''}`}
                      aria-label={item.ariaLabel || item.label}
                      onClick={item.onClick}
                    >
                      <span className="pill-label">{item.label}</span>
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default PillNav;
