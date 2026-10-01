# Enver AI Tech — Brand Assets & Visual Identity Suite

**Version:** 3.0 (Clean Transparent Alpha Suite)  
**Target Domain:** [enveraitech.com](https://enveraitech.com)  
**Primary Directory:** `Enver/client/public/`

---

## 1. Master Brand Asset Suite

All brand files feature **100% transparent alpha backgrounds** with antialiased borders, ensuring clean presentation against any background (Oat Silk `#F7F3E9`, Deep Plum `#2B121F`, white, or dark-mode browser chrome):

### Wordmark & Navigation
- **Transparent Wordmark Logo:** [`Enver/client/public/alphabet.png`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/alphabet.png)  
  *Preview URL:* `http://localhost:3000/alphabet.png`  
  *Usage:* Navbar, footer, and primary branding. Clean `enver_AI` typography with no background box.

### Circular Medallion & Crest
- **Enterprise Crest Medallion (High-Res 512×512):** [`Enver/client/public/enver-enterprise-crest.png`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/enver-enterprise-crest.png)  
  *Preview URL:* `http://localhost:3000/enver-enterprise-crest.png`  
  *Usage:* Featured in the closing call-to-action lockup on the landing page. Features a platinum outer beveled rim, 3D golden tree canopy, and dual-spectrum jewel facet cubes. Rendered without `mix-blend-multiply`, casting a soft ambient plum drop shadow (`filter drop-shadow-[0_12px_24px_rgba(43,18,31,0.09)]`).

### Favicon & Mobile Touch Icons
- **Browser Favicon (512×512 PNG):** [`Enver/client/public/favicon.png`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/favicon.png)  
  *Usage:* Standard web tab favicon, crisp circular crest floating transparently against light or dark browser chrome.
- **Multi-Resolution Windows/Legacy Icon (ICO):** [`Enver/client/public/favicon.ico`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/favicon.ico)  
  *Usage:* Contains 16×16, 32×32, and 48×48 multi-resolution mipmaps for Windows desktop shortcuts and legacy browsers.
- **Apple Touch Icon (180×180 PNG):** [`Enver/client/public/apple-touch-icon.png`](file:///c:/Users/dbleg/OneDrive/Desktop/website/Enver/client/public/apple-touch-icon.png)  
  *Usage:* iOS home screen bookmarks and Safari quick links.

---

## 2. Color Palette & Aesthetic Tokens

| Swatch | Color Name | Hex Code | Purpose |
| :--- | :--- | :--- | :--- |
| ![#F7F3E9](https://via.placeholder.com/15/F7F3E9/000000?text=+) | **Oat Silk** | `#F7F3E9` | Warm luxury paper background |
| ![#2B121F](https://via.placeholder.com/15/2B121F/FFFFFF?text=+) | **Plum Wine** | `#2B121F` | Deep primary brand typography, buttons & accents |
| ![#FF6F1E](https://via.placeholder.com/15/FF6F1E/FFFFFF?text=+) | **Solar Amber** | `#FF6F1E` | High-energy primary CTA highlight & interactive pulse |
| ![#D4AF37](https://via.placeholder.com/15/D4AF37/000000?text=+) | **Metallic Gold** | `#D4AF37` / `#C59B3F` | Tree of life branches, neural lines, and medallion core |
| ![#E5DFD1](https://via.placeholder.com/15/E5DFD1/000000?text=+) | **Loom Neutral** | `#E5DFD1` | Subtle architectural card borders and dividers |

---

## 3. Implementation Guidelines

1. **Zero CSS Blend Hacks**:
   Always render transparent PNGs with standard `filter drop-shadow` rather than `mix-blend-multiply`. Blend modes multiply against background luminance, causing murky artifacts.

2. **Interactive Polish**:
   Apply smooth hover transitions (`hover:scale-105 transition-all duration-300 ease-out cursor-pointer`) so the brand marks feel alive and responsive.
