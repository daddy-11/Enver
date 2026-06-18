const fs = require('fs');
const path = require('path');

// Try importing playwright from the local project, and fall back to the absolute Ability directory path if not present
let playwright;
try {
  playwright = require('playwright');
} catch (e) {
  try {
    const abilityPlaywrightPath = 'C:/Users/dbleg/OneDrive/Desktop/Kariman/Abilities/playwright-1.60.0/playwright-1.60.0/node_modules/playwright';
    playwright = require(abilityPlaywrightPath);
  } catch (err) {
    console.error("Playwright module not found. Installing playwright in project dependency...");
  }
}

const mdPath = path.join(__dirname, '../../enver_atrea_pitchdeck.md');
const pdfPath = path.join(__dirname, '../../enver_atrea_pitchdeck.pdf');

if (!fs.existsSync(mdPath)) {
  console.error("Markdown pitch deck not found at:", mdPath);
  process.exit(1);
}

const mdContent = fs.readFileSync(mdPath, 'utf-8');

// Basic Markdown to HTML converter to avoid external dependencies
function convertMdToHtml(md) {
  let html = '';
  const sections = md.split(/\n---\n/);

  sections.forEach((section, i) => {
    let sectionHtml = '<div class="slide">';
    const lines = section.split('\n');

    lines.forEach(line => {
      line = line.trim();
      if (!line) return;

      if (line.startsWith('# ')) {
        sectionHtml += `<h1>${line.substring(2)}</h1>`;
      } else if (line.startsWith('## ')) {
        sectionHtml += `<h2>${line.substring(3)}</h2>`;
      } else if (line.startsWith('### ')) {
        sectionHtml += `<h3>${line.substring(4)}</h3>`;
      } else if (line.startsWith('* ') || line.startsWith('- ')) {
        sectionHtml += `<li>${line.substring(2)}</li>`;
      } else if (line.startsWith('> ')) {
        sectionHtml += `<blockquote>${line.substring(2)}</blockquote>`;
      } else {
        // Strong bold parsing
        let parsed = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        parsed = parsed.replace(/\*(.*?)\*/g, '<em>$1</em>');
        sectionHtml += `<p>${parsed}</p>`;
      }
    });

    sectionHtml += '</div>';
    html += sectionHtml;
  });

  return html;
}

const slidesHtml = convertMdToHtml(mdContent);

const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Enver Atrea Pitch Deck</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Outfit:wght@400;500;600&display=swap');
    
    body {
      margin: 0;
      padding: 0;
      font-family: 'Outfit', system-ui, sans-serif;
      background: #fafaf8;
      color: #0d0d0d;
      -webkit-print-color-adjust: exact;
    }
    
    .slide {
      width: 297mm;
      height: 210mm;
      padding: 25mm;
      box-sizing: border-box;
      page-break-after: always;
      position: relative;
      background: #ffffff;
      border-bottom: 8px solid #1B2B4B;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    
    .slide:nth-child(even) {
      border-bottom-color: #E8660A;
    }
    
    h1 {
      font-family: 'Syne', sans-serif;
      font-size: 44px;
      font-weight: 800;
      color: #1B2B4B;
      margin-top: 0;
      margin-bottom: 20px;
      letter-spacing: -1.5px;
      line-height: 1.1;
    }
    
    h2 {
      font-family: 'Syne', sans-serif;
      font-size: 28px;
      font-weight: 700;
      color: #E8660A;
      margin-top: 0;
      margin-bottom: 25px;
      letter-spacing: -0.5px;
    }
    
    h3 {
      font-size: 20px;
      font-weight: 600;
      color: #1B2B4B;
      margin-top: 20px;
      margin-bottom: 10px;
    }
    
    p {
      font-size: 18px;
      line-height: 1.6;
      color: #4b5563;
      margin-bottom: 15px;
    }
    
    li {
      font-size: 18px;
      line-height: 1.8;
      color: #4b5563;
      margin-bottom: 10px;
      list-style-type: square;
      margin-left: 20px;
    }
    
    blockquote {
      font-style: italic;
      border-left: 4px solid #E8660A;
      padding-left: 20px;
      margin: 20px 0;
      color: #1f2937;
      background: #fafaf8;
      padding-top: 10px;
      padding-bottom: 10px;
      font-size: 16px;
      line-height: 1.6;
    }
    
    strong {
      color: #0d0d0d;
    }
    
    .footer {
      position: absolute;
      bottom: 15mm;
      left: 25mm;
      right: 25mm;
      display: flex;
      justify-content: space-between;
      font-size: 12px;
      color: #9ca3af;
      border-top: 0.5px solid rgba(0,0,0,0.08);
      padding-top: 10px;
    }

    @page {
      size: A4 landscape;
      margin: 0;
    }
  </style>
</head>
<body>
  ${slidesHtml}
</body>
</html>
`;

async function generatePdf() {
  if (!playwright) {
    console.log("Installing local Playwright to generate PDF...");
    const { execSync } = require('child_process');
    execSync('npm install -D playwright --legacy-peer-deps', { stdio: 'inherit' });
    playwright = require('playwright');
  }

  console.log("Launching headless browser...");
  const browser = await playwright.chromium.launch();
  const page = await browser.newPage();
  
  console.log("Setting content and styling...");
  await page.setContent(fullHtml);
  
  console.log("Printing to PDF...");
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    landscape: true,
    printBackground: true
  });
  
  await browser.close();
  console.log("Successfully generated PDF at:", pdfPath);
}

generatePdf().catch(err => {
  console.error("Failed to generate PDF:", err);
  process.exit(1);
});
