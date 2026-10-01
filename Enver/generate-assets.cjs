// Script to generate SVG assets and render high-res PNGs for Enver AI Tech
const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

const PUBLIC_DIR = path.resolve(__dirname, 'client/public');

// --- 1. The Core Golden Tree & Prism Facet Emblem SVG ---
// Dimensions: 500 x 500
function getEmblemSvgContent(scale = 1, offsetX = 0, offsetY = 0) {
  return `
    <defs>
      <!-- Gold Gradients -->
      <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FFF3C4" />
        <stop offset="18%" stop-color="#E8C36A" />
        <stop offset="45%" stop-color="#D4AF37" />
        <stop offset="70%" stop-color="#AA8022" />
        <stop offset="90%" stop-color="#E5BE64" />
        <stop offset="100%" stop-color="#8C6314" />
      </linearGradient>

      <linearGradient id="goldLight" x1="20%" y1="0%" x2="80%" y2="100%">
        <stop offset="0%" stop-color="#FFF8DC" />
        <stop offset="40%" stop-color="#E6C875" />
        <stop offset="80%" stop-color="#C59B27" />
        <stop offset="100%" stop-color="#8A6014" />
      </linearGradient>

      <linearGradient id="goldDark" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#D4AF37" />
        <stop offset="50%" stop-color="#A57D22" />
        <stop offset="100%" stop-color="#64480E" />
      </linearGradient>

      <linearGradient id="goldShine" x1="0%" y1="50%" x2="100%" y2="50%">
        <stop offset="0%" stop-color="#C59B27" />
        <stop offset="30%" stop-color="#FFF3C4" />
        <stop offset="60%" stop-color="#E5BE64" />
        <stop offset="100%" stop-color="#8C6314" />
      </linearGradient>

      <!-- Isometric Facet Gradients - Left Side (Amber, Gold, Olive, Forest Green) -->
      <linearGradient id="facetAmberTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#ECA344" />
        <stop offset="100%" stop-color="#C87520" />
      </linearGradient>
      <linearGradient id="facetGoldTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#E2B13C" />
        <stop offset="100%" stop-color="#B8861B" />
      </linearGradient>
      <linearGradient id="facetOliveLeft" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#6C8F43" />
        <stop offset="100%" stop-color="#466624" />
      </linearGradient>
      <linearGradient id="facetGreenMid" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2D7A58" />
        <stop offset="100%" stop-color="#1B5339" />
      </linearGradient>
      <linearGradient id="facetDarkGreen" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#194D36" />
        <stop offset="100%" stop-color="#0E2E1F" />
      </linearGradient>

      <!-- Isometric Facet Gradients - Right Side (Teal, Cyan, Navy, Magenta, Crimson) -->
      <linearGradient id="facetTealTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#34A3A9" />
        <stop offset="100%" stop-color="#1F757C" />
      </linearGradient>
      <linearGradient id="facetCyanTop" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#268B99" />
        <stop offset="100%" stop-color="#155D67" />
      </linearGradient>
      <linearGradient id="facetNavyRight" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#274463" />
        <stop offset="100%" stop-color="#15273C" />
      </linearGradient>
      <linearGradient id="facetMagentaMid" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#A2325E" />
        <stop offset="100%" stop-color="#7B1E43" />
      </linearGradient>
      <linearGradient id="facetCrimsonDark" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#7D1D41" />
        <stop offset="100%" stop-color="#490E23" />
      </linearGradient>

      <!-- Shadow Filters -->
      <filter id="emblemShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0A1128" flood-opacity="0.35" />
      </filter>
      <filter id="innerDepth" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
        <feOffset dx="0" dy="3" />
        <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" result="shadowDiff" />
        <feFlood flood-color="#000" flood-opacity="0.4" />
        <feComposite in2="shadowDiff" operator="in" />
        <feComposite in2="SourceGraphic" operator="over" />
      </filter>
    </defs>

    <g transform="translate(${offsetX}, ${offsetY}) scale(${scale})" filter="url(#emblemShadow)">
      <!-- Hexagonal / Shield Base Container Shadow Backing -->
      <path d="M 250,55 
               C 275,55 375,100 405,145 
               C 435,190 440,240 435,310 
               L 435,370 
               L 250,465 
               L 65,370 
               L 65,310 
               C 60,240 65,190 95,145 
               C 125,100 225,55 250,55 Z" 
            fill="#0D1726" opacity="0.15" />

      <!-- ========================================================= -->
      <!-- LEFT ISOMETRIC FACET CLUSTERS (Amber / Green Spectrum)    -->
      <!-- ========================================================= -->
      <g id="leftPrismCluster">
        <!-- Top row facets -->
        <!-- Diamond 1 (Top Left Amber) -->
        <polygon points="175,225 215,200 175,178 135,202" fill="url(#facetAmberTop)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Diamond 2 (Top Inner Gold/Ochre) -->
        <polygon points="215,200 242,185 210,165 175,178" fill="url(#facetGoldTop)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Diamond 3 (Outer Left Orange) -->
        <polygon points="135,202 175,225 130,250 90,225" fill="#D97724" stroke="#AA8022" stroke-width="1.5" />
        
        <!-- Mid row facets -->
        <!-- Center diamond -->
        <polygon points="175,225 220,250 175,278 130,250" fill="#E68A2E" stroke="#AA8022" stroke-width="1.5" />
        <!-- Inner slope left -->
        <polygon points="220,250 242,238 242,185 215,200" fill="#C87520" stroke="#AA8022" stroke-width="1.5" />

        <!-- Vertical and Lower facets (Olive & Forest Greens) -->
        <!-- Left vertical face -->
        <polygon points="90,225 130,250 130,312 90,285" fill="url(#facetOliveLeft)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Mid-left green face -->
        <polygon points="130,250 175,278 175,340 130,312" fill="url(#facetGreenMid)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Lower inner green facet -->
        <polygon points="175,278 220,250 220,315 175,340" fill="#236B48" stroke="#AA8022" stroke-width="1.5" />
        <!-- Deep lower left facet -->
        <polygon points="90,285 130,312 130,375 90,345" fill="url(#facetDarkGreen)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Bottom left base wedge -->
        <polygon points="130,312 175,340 175,410 130,375" fill="#14432E" stroke="#AA8022" stroke-width="1.5" />
        <!-- Bottom inner left wedge -->
        <polygon points="175,340 220,315 220,385 175,410" fill="#0E2E1F" stroke="#AA8022" stroke-width="1.5" />
        <!-- Bottom spine junction left -->
        <polygon points="175,410 220,385 240,396 240,442 175,410" fill="#0A2216" stroke="#AA8022" stroke-width="1.5" />
      </g>

      <!-- ========================================================= -->
      <!-- RIGHT ISOMETRIC FACET CLUSTERS (Teal / Magenta Spectrum)  -->
      <!-- ========================================================= -->
      <g id="rightPrismCluster">
        <!-- Top row facets -->
        <!-- Diamond 1 (Top Inner Cyan) -->
        <polygon points="285,200 325,225 285,178 258,185" fill="url(#facetCyanTop)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Diamond 2 (Top Right Teal) -->
        <polygon points="325,225 365,202 325,178 285,200" fill="url(#facetTealTop)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Diamond 3 (Outer Right Cyan/Blue) -->
        <polygon points="365,202 410,225 370,250 325,225" fill="#1F757C" stroke="#AA8022" stroke-width="1.5" />

        <!-- Mid row facets -->
        <!-- Center diamond -->
        <polygon points="325,225 370,250 325,278 280,250" fill="#1A6B74" stroke="#AA8022" stroke-width="1.5" />
        <!-- Inner slope right -->
        <polygon points="280,250 258,238 258,185 285,200" fill="#145A63" stroke="#AA8022" stroke-width="1.5" />

        <!-- Vertical and Lower facets (Navy, Magenta, Wine) -->
        <!-- Right outer navy face -->
        <polygon points="370,250 410,225 410,285 370,312" fill="url(#facetNavyRight)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Mid-right magenta face -->
        <polygon points="325,278 370,312 370,250 325,225" fill="url(#facetMagentaMid)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Inner magenta face -->
        <polygon points="280,250 325,278 325,340 280,315" fill="#8E264E" stroke="#AA8022" stroke-width="1.5" />
        <!-- Deep lower right navy face -->
        <polygon points="370,312 410,285 410,345 370,375" fill="#15273C" stroke="#AA8022" stroke-width="1.5" />
        <!-- Bottom right crimson facet -->
        <polygon points="325,340 370,312 370,375 325,410" fill="url(#facetCrimsonDark)" stroke="#AA8022" stroke-width="1.5" />
        <!-- Bottom inner right wine facet -->
        <polygon points="280,315 325,340 325,410 280,385" fill="#5E1430" stroke="#AA8022" stroke-width="1.5" />
        <!-- Bottom spine junction right -->
        <polygon points="325,410 280,385 260,396 260,442 325,410" fill="#440D22" stroke="#AA8022" stroke-width="1.5" />
      </g>

      <!-- ========================================================= -->
      <!-- GOLDEN TREE STRUCTURE & THICK SHIELD ARMATURE (FOREGROUND)-->
      <!-- ========================================================= -->
      <g id="goldenTreeAndArmature">
        <!-- Outer Armature Rim (Framing the shield sides & bottom) -->
        <!-- Left Frame Bar -->
        <path d="M 65,305 
                 L 80,305 
                 L 80,355 
                 L 242,448 
                 L 242,472 
                 L 65,372 Z" 
              fill="url(#goldDark)" />
        <path d="M 75,305 
                 L 88,305 
                 L 88,350 
                 L 242,440 
                 L 242,455 
                 L 75,360 Z" 
              fill="url(#goldMetallic)" />

        <!-- Right Frame Bar -->
        <path d="M 435,305 
                 L 420,305 
                 L 420,355 
                 L 258,448 
                 L 258,472 
                 L 435,372 Z" 
              fill="url(#goldDark)" />
        <path d="M 425,305 
                 L 412,305 
                 L 412,350 
                 L 258,440 
                 L 258,455 
                 L 425,360 Z" 
              fill="url(#goldMetallic)" />

        <!-- Vertical Outer Ribs (Side Bounds) -->
        <path d="M 65,310 L 80,305 L 80,185 C 80,150 110,110 145,85 L 135,70 C 95,95 65,140 65,185 Z" fill="url(#goldMetallic)" />
        <path d="M 435,310 L 420,305 L 420,185 C 420,150 390,110 355,85 L 365,70 C 405,95 435,140 435,185 Z" fill="url(#goldMetallic)" />

        <!-- Central Trunk Column / Spine -->
        <path d="M 242,160 
                 L 258,160 
                 L 258,475 
                 L 250,480 
                 L 242,475 Z" 
              fill="url(#goldShine)" />

        <!-- Tree Branch Arches - Lower Inner Trunk Vaults -->
        <!-- Left Inner Trunk Rib -->
        <path d="M 242,390 
                 C 225,350 215,280 215,220 
                 C 215,180 230,150 242,130 
                 L 242,110 
                 C 220,135 200,175 200,225 
                 C 200,290 215,360 235,410 Z" 
              fill="url(#goldLight)" />
        
        <!-- Right Inner Trunk Rib -->
        <path d="M 258,390 
                 C 275,350 285,280 285,220 
                 C 285,180 270,150 258,130 
                 L 258,110 
                 C 280,135 300,175 300,225 
                 C 300,290 285,360 265,410 Z" 
              fill="url(#goldLight)" />

        <!-- Tree Mid Flank Ribs (Framing the facet blocks) -->
        <path d="M 125,235 
                 C 135,185 160,150 185,120 
                 L 172,108 
                 C 142,142 118,180 108,235 Z" 
              fill="url(#goldMetallic)" />

        <path d="M 375,235 
                 C 365,185 340,150 315,120 
                 L 328,108 
                 C 358,142 382,180 392,235 Z" 
              fill="url(#goldMetallic)" />

        <!-- ========================================================= -->
        <!-- GOLDEN TREE CANOPY (UPPER BRANCHES & RADIATING NETWORK)   -->
        <!-- ========================================================= -->
        <!-- Center Main Spire / Apex Crown -->
        <path d="M 250,38 
                 L 256,65 
                 L 254,120 
                 L 246,120 
                 L 244,65 Z" 
              fill="url(#goldLight)" />

        <!-- Symmetrical Main Upward Branches (Pair 1 - Inner) -->
        <path d="M 248,115 
                 C 240,95 230,75 220,55 
                 L 230,50 
                 C 242,72 250,92 254,115 Z" 
              fill="url(#goldMetallic)" />
        <path d="M 252,115 
                 C 260,95 270,75 280,55 
                 L 270,50 
                 C 258,72 250,92 246,115 Z" 
              fill="url(#goldMetallic)" />

        <!-- Symmetrical Branches (Pair 2 - Mid Reach) -->
        <path d="M 242,125 
                 C 220,105 195,85 180,68 
                 L 190,60 
                 C 205,78 230,98 250,120 Z" 
              fill="url(#goldLight)" />
        <path d="M 258,125 
                 C 280,105 305,85 320,68 
                 L 310,60 
                 C 295,78 270,98 250,120 Z" 
              fill="url(#goldLight)" />

        <!-- Symmetrical Branches (Pair 3 - High Arch Lateral) -->
        <path d="M 235,135 
                 C 195,115 160,100 135,90 
                 L 140,78 
                 C 168,89 202,106 242,128 Z" 
              fill="url(#goldMetallic)" />
        <path d="M 265,135 
                 C 305,115 340,100 365,90 
                 L 360,78 
                 C 332,89 298,106 258,128 Z" 
              fill="url(#goldMetallic)" />

        <!-- Sub-branches / Secondary Neural Splits -->
        <!-- Left Sub-branches -->
        <path d="M 226,82 C 215,70 200,60 195,50 L 204,45 C 210,54 222,64 233,75 Z" fill="url(#goldShine)" />
        <path d="M 198,92 C 180,82 165,75 155,62 L 163,55 C 173,67 188,74 206,84 Z" fill="url(#goldMetallic)" />
        <path d="M 160,110 C 140,105 125,98 115,88 L 122,80 C 132,89 146,95 167,101 Z" fill="url(#goldLight)" />
        <path d="M 148,135 C 130,132 110,125 95,115 L 102,105 C 115,115 133,122 152,125 Z" fill="url(#goldMetallic)" />

        <!-- Right Sub-branches -->
        <path d="M 274,82 C 285,70 300,60 305,50 L 296,45 C 290,54 278,64 267,75 Z" fill="url(#goldShine)" />
        <path d="M 302,92 C 320,82 335,75 345,62 L 337,55 C 327,67 312,74 294,84 Z" fill="url(#goldMetallic)" />
        <path d="M 340,110 C 360,105 375,98 385,88 L 378,80 C 368,89 354,95 333,101 Z" fill="url(#goldLight)" />
        <path d="M 352,135 C 370,132 390,125 405,115 L 398,105 C 385,115 367,122 348,125 Z" fill="url(#goldMetallic)" />

        <!-- Central Heart Node / Diamond Core Jewel -->
        <polygon points="250,145 264,160 250,175 236,160" fill="url(#goldShine)" stroke="#FFF8DC" stroke-width="1.5" />
      </g>
    </g>
  `;
}

// --- 2. Circular Badge SVG (as in the left reference image) ---
// 600 x 600
function getCircularBadgeSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600">
  <defs>
    <!-- Badge Disc Gradients & Filters -->
    <linearGradient id="badgeRim" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="40%" stop-color="#F8FAFC" />
      <stop offset="80%" stop-color="#E2E8F0" />
      <stop offset="100%" stop-color="#CBD5E1" />
    </linearGradient>

    <radialGradient id="badgeDisc" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="65%" stop-color="#FAFAFA" />
      <stop offset="90%" stop-color="#F1F5F9" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </radialGradient>

    <filter id="badgeDepthShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="16" stdDeviation="20" flood-color="#0F172A" flood-opacity="0.18" />
      <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#0F172A" flood-opacity="0.12" />
    </filter>

    <filter id="badgeInnerShadow">
      <feOffset dx="0" dy="3" />
      <feGaussianBlur stdDeviation="4" result="offset-blur" />
      <feComposite operator="out" in="SourceGraphic" in2="offset-blur" result="inverse" />
      <feFlood flood-color="#CBD5E1" flood-opacity="0.5" result="color" />
      <feComposite operator="in" in="color" in2="inverse" result="shadow" />
      <feComposite operator="over" in="shadow" in2="SourceGraphic" />
    </filter>
  </defs>

  <!-- Outer Drop Shadow Circle -->
  <circle cx="300" cy="300" r="260" fill="url(#badgeRim)" filter="url(#badgeDepthShadow)" />
  
  <!-- Subtle Outer Rim Line -->
  <circle cx="300" cy="300" r="258" fill="none" stroke="#E2E8F0" stroke-width="2" />
  
  <!-- Main Inner White Disc -->
  <circle cx="300" cy="300" r="248" fill="url(#badgeDisc)" />
  <circle cx="300" cy="300" r="248" fill="none" stroke="#FFFFFF" stroke-width="3" opacity="0.8" />

  <!-- The Emblem Centered Inside -->
  ${getEmblemSvgContent(0.88, 80, 75)}
</svg>`;
}

// --- 3. Favicon with True UI Background Depth ---
// 512 x 512 squircle with deep dark blue/slate backdrop, subtle edge bevel, inner rim glow
function getFaviconSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <!-- Background Squircle Gradients -->
    <linearGradient id="favBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0F1A2E" />
      <stop offset="35%" stop-color="#09101E" />
      <stop offset="100%" stop-color="#040810" />
    </linearGradient>

    <!-- Bevel Rim Gradient -->
    <linearGradient id="rimGlow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.6" />
      <stop offset="30%" stop-color="#E2E8F0" stop-opacity="0.3" />
      <stop offset="70%" stop-color="#1E293B" stop-opacity="0.8" />
      <stop offset="100%" stop-color="#D4AF37" stop-opacity="0.4" />
    </linearGradient>

    <radialGradient id="centerAura" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.22" />
      <stop offset="50%" stop-color="#1E3A8A" stop-opacity="0.12" />
      <stop offset="100%" stop-color="#09101E" stop-opacity="0" />
    </radialGradient>

    <filter id="favDropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.5" />
    </filter>
  </defs>

  <!-- Base Rounded Squircle with Shadow -->
  <rect x="24" y="24" width="464" height="464" rx="108" ry="108" fill="url(#favBg)" filter="url(#favDropShadow)" />
  
  <!-- Subtle Glowing Rim Bevel -->
  <rect x="25" y="25" width="462" height="462" rx="107" ry="107" fill="none" stroke="url(#rimGlow)" stroke-width="3" />
  
  <!-- Inset Ambient Core Glow behind Emblem -->
  <circle cx="256" cy="256" r="180" fill="url(#centerAura)" />

  <!-- Inner Soft Accent Border -->
  <rect x="36" y="36" width="440" height="440" rx="96" ry="96" fill="none" stroke="#FFFFFF" stroke-width="1" opacity="0.08" />

  <!-- Emblem Centered -->
  ${getEmblemSvgContent(0.82, 50, 48)}
</svg>`;
}

// --- 4. Standalone Emblem SVG ---
function getStandaloneEmblemSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="500" height="500">
  ${getEmblemSvgContent(1, 0, 0)}
</svg>`;
}

// --- 5. Full Horizontal Navbar / Header Logo SVG ---
// Dimensions: 800 x 200
function getHorizontalLogoSvg() {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" width="800" height="200">
  <defs>
    <!-- Brand Font Family Styles -->
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&amp;family=DM+Mono:wght@500&amp;display=swap');
      .brand-title {
        font-family: 'Syne', sans-serif;
        font-weight: 800;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }
      .brand-subtitle {
        font-family: 'DM Mono', monospace;
        font-weight: 500;
        letter-spacing: 0.32em;
        text-transform: uppercase;
      }
    </style>

    <linearGradient id="logoTextGold" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0A1128" />
      <stop offset="60%" stop-color="#111827" />
      <stop offset="100%" stop-color="#1F2937" />
    </linearGradient>
    
    <linearGradient id="accentGoldText" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#D4AF37" />
      <stop offset="100%" stop-color="#AA8022" />
    </linearGradient>

    <!-- Circular Badge Shading -->
    <radialGradient id="miniBadgeDisc" cx="45%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="85%" stop-color="#F8FAFC" />
      <stop offset="100%" stop-color="#E2E8F0" />
    </radialGradient>
    <filter id="miniBadgeShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.15" />
    </filter>
  </defs>

  <!-- Left: Circular Emblem Badge -->
  <g transform="translate(10, 0)">
    <circle cx="100" cy="100" r="82" fill="url(#miniBadgeDisc)" filter="url(#miniBadgeShadow)" stroke="#E2E8F0" stroke-width="2" />
    <circle cx="100" cy="100" r="77" fill="none" stroke="#FFFFFF" stroke-width="2" opacity="0.9" />
    <!-- Embedded Scaled Emblem -->
    <g transform="translate(100, 100) scale(0.30) translate(-250, -250)">
      ${getEmblemSvgContent(1, 0, 0)}
    </g>
  </g>

  <!-- Right: Refined Typography -->
  <g transform="translate(210, 0)">
    <!-- Primary Heading: ENVER AI -->
    <text x="0" y="112" class="brand-title" font-size="64" fill="url(#logoTextGold)">ENVER <tspan fill="url(#accentGoldText)">AI</tspan></text>
    
    <!-- Secondary Subtitle: ENTERPRISE OPERATIONS & TECH -->
    <text x="4" y="148" class="brand-subtitle" font-size="14.5" fill="#4B5563">TECHNOLOGIES • INC</text>
  </g>
</svg>`;
}

// --- Write out SVG files ---
console.log('Generating vector SVG assets in:', PUBLIC_DIR);

fs.writeFileSync(path.join(PUBLIC_DIR, 'enver-mark.svg'), getStandaloneEmblemSvg().trim());
fs.writeFileSync(path.join(PUBLIC_DIR, 'enver-badge.svg'), getCircularBadgeSvg().trim());
fs.writeFileSync(path.join(PUBLIC_DIR, 'favicon.svg'), getFaviconSvg().trim());
fs.writeFileSync(path.join(PUBLIC_DIR, 'enver-logo.svg'), getHorizontalLogoSvg().trim());
fs.writeFileSync(path.join(PUBLIC_DIR, 'logo.svg'), getHorizontalLogoSvg().trim());

// Also update lanyard-logo.svg with the new refined emblem
fs.writeFileSync(path.join(PUBLIC_DIR, 'lanyard-logo.svg'), `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="500" height="755" viewBox="0 0 500 755">
  <defs>
    <linearGradient id="cardBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0D1B2A" />
      <stop offset="100%" stop-color="#050C16" />
    </linearGradient>
    <radialGradient id="cardGlow" cx="50%" cy="40%" r="50%">
      <stop offset="0%" stop-color="#D4AF37" stop-opacity="0.18" />
      <stop offset="100%" stop-color="#0D1B2A" stop-opacity="0" />
    </radialGradient>
  </defs>
  <rect width="500" height="755" fill="url(#cardBg)"/>
  <circle cx="250" cy="320" r="220" fill="url(#cardGlow)" />
  <rect x="30" y="30" width="440" height="695" rx="20" fill="none" stroke="#D4AF37" stroke-width="2" opacity="0.4"/>
  
  <!-- Embedded Badge -->
  <g transform="translate(250, 310) scale(0.68) translate(-300, -300)">
    <circle cx="300" cy="300" r="260" fill="#FFFFFF" />
    <circle cx="300" cy="300" r="258" fill="none" stroke="#E2E8F0" stroke-width="3" />
    ${getEmblemSvgContent(0.88, 80, 75)}
  </g>

  <text x="250" y="580" font-family="'Syne', sans-serif" font-size="34" font-weight="800" fill="#FFFFFF" letter-spacing="0.12em" text-anchor="middle">ENVER AI TECH</text>
  <text x="250" y="620" font-family="'DM Mono', monospace" font-size="14" font-weight="500" fill="#D4AF37" letter-spacing="0.25em" text-anchor="middle">ASSIMILATING INTELLIGENCE</text>
</svg>
`.trim());

console.log('SVGs generated successfully. Now rendering PNGs with Playwright...');

async function renderPngs() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 800, deviceScaleFactor: 2 } });

  // 1. Render Favicon PNG (512x512)
  const faviconSvgPath = path.join(PUBLIC_DIR, 'favicon.svg');
  const faviconSvgData = fs.readFileSync(faviconSvgPath, 'utf-8');
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; width: 512px; height: 512px;">
        ${faviconSvgData}
      </body>
    </html>
  `);
  await page.locator('svg').screenshot({
    path: path.join(PUBLIC_DIR, 'favicon.png'),
    omitBackground: true
  });
  console.log('Rendered favicon.png (512x512)');

  // 2. Render Logo PNG (800x200)
  const logoSvgPath = path.join(PUBLIC_DIR, 'enver-logo.svg');
  const logoSvgData = fs.readFileSync(logoSvgPath, 'utf-8');
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono:wght@500&display=swap" rel="stylesheet">
      </head>
      <body style="margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: flex-start; width: 800px; height: 200px;">
        ${logoSvgData}
      </body>
    </html>
  `);
  await page.waitForTimeout(1000); // Allow Google Fonts to render
  await page.locator('svg').screenshot({
    path: path.join(PUBLIC_DIR, 'logo.png'),
    omitBackground: true
  });
  console.log('Rendered logo.png (800x200)');

  // 3. Render Circular Badge PNG (600x600)
  const badgeSvgPath = path.join(PUBLIC_DIR, 'enver-badge.svg');
  const badgeSvgData = fs.readFileSync(badgeSvgPath, 'utf-8');
  await page.setContent(`
    <!DOCTYPE html>
    <html>
      <body style="margin: 0; padding: 0; background: transparent; display: flex; align-items: center; justify-content: center; width: 600px; height: 600px;">
        ${badgeSvgData}
      </body>
    </html>
  `);
  await page.locator('svg').screenshot({
    path: path.join(PUBLIC_DIR, 'enver-badge.png'),
    omitBackground: true
  });
  console.log('Rendered enver-badge.png (600x600)');

  await browser.close();
  console.log('All PNG renderings complete!');
}

renderPngs().catch(console.error);
