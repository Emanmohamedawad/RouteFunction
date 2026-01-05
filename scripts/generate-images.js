const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const input = path.join(__dirname, '../public/hero-poster.jpg'); // ضبط المسار
const outDir = path.join(__dirname, '../public/images/optimized');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const widths = [360, 640, 768, 1024, 1621, 2048];

(async () => {
  for (const w of widths) {
    await sharp(input)
      .resize({ width: w })
      .avif({ quality: 60 })
      .toFile(path.join(outDir, `hero-${w}.avif`));

    await sharp(input)
      .resize({ width: w })
      .webp({ quality: 75 })
      .toFile(path.join(outDir, `hero-${w}.webp`));

    console.log('generated', w);
  }
})();
