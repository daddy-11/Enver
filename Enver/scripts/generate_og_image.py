import os
from PIL import Image, ImageDraw, ImageFont

def generate_og_image():
    width = 1200
    height = 630
    
    # 1. Create Base Image with radial gradient / deep obsidian background
    img = Image.new("RGBA", (width, height), (12, 17, 12, 255))
    draw = ImageDraw.Draw(img)
    
    # Subtle gradient glow from top-left and center
    for r in range(450, 0, -5):
        alpha = int(35 * (1 - r / 450))
        draw.ellipse([80 - r, 120 - r, 80 + r, 120 + r], fill=(255, 111, 30, alpha))
        draw.ellipse([1000 - r, 480 - r, 1000 + r, 480 + r], fill=(200, 151, 62, alpha))

    # Subtle grid lines
    grid_color = (255, 255, 255, 8)
    for x in range(0, width, 60):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 60):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)

    # 2. Paste Crest
    crest_path = os.path.join(os.path.dirname(__file__), "..", "client", "public", "enver-crest-transparent.png")
    if os.path.exists(crest_path):
        crest = Image.open(crest_path).convert("RGBA")
        crest = crest.resize((140, 140), Image.Resampling.LANCZOS)
        img.paste(crest, (90, 80), crest)

    # 3. Typography & Text using system sans-serif font
    font_title = None
    font_sub = None
    font_mono = None
    font_tag = None

    try:
        font_title = ImageFont.truetype("arialbd.ttf", 46)
        font_sub = ImageFont.truetype("arial.ttf", 23)
        font_mono = ImageFont.truetype("consola.ttf", 16)
        font_tag = ImageFont.truetype("arialbd.ttf", 15)
    except Exception:
        font_title = ImageFont.load_default()
        font_sub = ImageFont.load_default()
        font_mono = ImageFont.load_default()
        font_tag = ImageFont.load_default()

    # Badge Pill (Top next to crest)
    badge_x = 260
    badge_y = 90
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 480, badge_y + 34], radius=8, fill=(28, 38, 26, 255), outline=(46, 65, 42, 255), width=1)
    draw.text((badge_x + 18, badge_y + 8), "DPIIT RECOGNIZED STARTUP #DIPP193082", fill=(255, 146, 78, 255), font=font_mono)

    # Secondary Badge
    badge2_x = badge_x + 495
    draw.rounded_rectangle([badge2_x, badge_y, badge2_x + 320, badge_y + 34], radius=8, fill=(28, 38, 26, 255), outline=(46, 65, 42, 255), width=1)
    draw.text((badge2_x + 16, badge_y + 8), "MICROSOFT FOUNDERS HUB", fill=(200, 151, 62, 255), font=font_mono)

    # Main Brand Name
    draw.text((260, 140), "ENVER AI TECH", fill=(255, 255, 255, 255), font=font_title)

    # Main Headline
    draw.text((90, 260), "Enterprise AI Operations &\nSovereign Agent Infrastructure", fill=(255, 255, 255, 255), font=font_title)

    # Description
    draw.text((90, 400), "Deterministic multi-agent workflows, forensic financial underwriting citadel,\nand zero-trust AST cloud governance firewalls for regulated enterprise.", fill=(168, 179, 164, 255), font=font_sub)

    # Bottom Separator Line
    draw.line([(90, 500), (1110, 500)], fill=(40, 55, 38, 255), width=1)

    # Bottom Institutional Credential Badges
    institutions = [
        ("BITSoM Vertex AI Incubator", (255, 111, 30, 255)),
        ("•", (80, 95, 78, 255)),
        ("FITT IIT Delhi DeepTech", (200, 151, 62, 255)),
        ("•", (80, 95, 78, 255)),
        ("RBI Digital Lending Compliance", (52, 211, 153, 255)),
        ("•", (80, 95, 78, 255)),
        ("enveraitech.com", (255, 255, 255, 255)),
    ]
    cur_x = 90
    for text, color in institutions:
        draw.text((cur_x, 535), text, fill=color, font=font_tag)
        bbox = draw.textbbox((cur_x, 535), text, font=font_tag)
        cur_x = bbox[2] + 16

    # Convert to RGB and save
    out_img = img.convert("RGB")
    out_path = os.path.join(os.path.dirname(__file__), "..", "client", "public", "og-image.png")
    out_img.save(out_path, "PNG", optimize=True)
    print(f"Generated OG Image successfully at {out_path} ({os.path.getsize(out_path)} bytes)")

if __name__ == "__main__":
    generate_og_image()
