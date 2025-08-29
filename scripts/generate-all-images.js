import fs from 'fs';
import { createCanvas } from 'canvas';

// Create all necessary directories
const dirs = [
  'public/images/products',
  'public/images/patterns',
  'public/images/app',
  'public/images/hero',
  'public/images/about',
  'public/images/features',
  'public/images/gallery',
  'public/images/blog',
  'public/images/tech'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to create a placeholder image
function createPlaceholderImage(width, height, text, filename, gradient = false) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  if (gradient) {
    const grd = ctx.createLinearGradient(0, 0, width, height);
    grd.addColorStop(0, '#1a1a1a');
    grd.addColorStop(1, '#333333');
    ctx.fillStyle = grd;
  } else {
    ctx.fillStyle = '#1a1a1a';
  }
  ctx.fillRect(0, 0, width, height);

  // Add text
  ctx.fillStyle = '#ffffff';
  ctx.font = `${Math.min(width, height) * 0.1}px Arial`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
  console.log(`Created ${filename}`);
}

// Create circuit board pattern SVG
const circuitBoardSvg = `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
      <path d="M10 10h80v80h-80z" fill="none" stroke="#ffffff" stroke-width="0.5"/>
      <circle cx="10" cy="10" r="2" fill="#ffffff"/>
      <circle cx="90" cy="90" r="2" fill="#ffffff"/>
      <path d="M10 10h40v40" fill="none" stroke="#ffffff" stroke-width="0.5"/>
      <path d="M90 90h-40v-40" fill="none" stroke="#ffffff" stroke-width="0.5"/>
    </pattern>
  </defs>
  <rect x="0" y="0" width="100" height="100" fill="url(#circuit)"/>
</svg>
`;

fs.writeFileSync('public/images/patterns/circuit-board.svg', circuitBoardSvg);
console.log('Created circuit board pattern SVG');

// Generate logo
createPlaceholderImage(128, 48, 'RASA', 'public/images/logo.png');

// Generate hero images
createPlaceholderImage(1920, 1080, 'Hero Background', 'public/images/hero/hero-bg.jpg', true);
createPlaceholderImage(800, 600, 'Hero Product', 'public/images/hero/hero-product.png');

// Generate about section images
createPlaceholderImage(600, 400, 'Team', 'public/images/about/team.jpg', true);

// Generate feature images
for (let i = 1; i <= 6; i++) {
  createPlaceholderImage(400, 300, `Feature ${i}`, `public/images/features/feature-${i}.jpg`, true);
}

// Generate app screenshots
for (let i = 1; i <= 3; i++) {
  createPlaceholderImage(400, 800, `App Screen ${i}`, `public/images/app/app-screen-${i}.png`);
}

// Generate tech logos
for (let i = 1; i <= 3; i++) {
  createPlaceholderImage(100, 100, `Tech ${i}`, `public/images/tech/tech-${i}.png`);
}

// Generate gallery images
createPlaceholderImage(400, 300, 'Hotel Lighting', 'public/images/gallery/hotel-lighting.jpg', true);
createPlaceholderImage(400, 300, 'Mall LED', 'public/images/gallery/mall-led.jpg', true);
createPlaceholderImage(400, 300, 'Office Automation', 'public/images/gallery/office-automation.jpg', true);
createPlaceholderImage(400, 300, 'Smart Case', 'public/images/gallery/smart-case.jpg', true);

// Generate blog images
createPlaceholderImage(400, 300, 'Smart Lighting', 'public/images/blog/smart-lighting-future.jpg', true);
createPlaceholderImage(400, 300, 'Digital Security', 'public/images/blog/digital-security.jpg', true);
createPlaceholderImage(400, 300, 'Digital Advertising', 'public/images/blog/digital-advertising.jpg', true);

// Generate store icons
const appStoreSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path fill="#ffffff" d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
</svg>
`;

const playStoreSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
  <path fill="#ffffff" d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
</svg>
`;

fs.writeFileSync('public/images/app-store.svg', appStoreSvg);
fs.writeFileSync('public/images/play-store.svg', playStoreSvg);

console.log('All images generated successfully!'); 