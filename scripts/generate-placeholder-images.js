import fs from 'fs';
import { createCanvas } from 'canvas';

// Create directories if they don't exist
const dirs = [
  'public/images/products',
  'public/images/patterns',
  'public/images/app'
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Function to create a placeholder image
function createPlaceholderImage(width, height, text, filename) {
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');

  // Fill background
  ctx.fillStyle = '#1a1a1a';
  ctx.fillRect(0, 0, width, height);

  // Add some design elements
  ctx.strokeStyle = '#57DCDA';
  ctx.lineWidth = 2;
  ctx.strokeRect(10, 10, width - 20, height - 20);

  // Add text
  ctx.font = '30px Arial';
  ctx.fillStyle = '#57DCDA';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, width / 2, height / 2);

  // Save the image
  const buffer = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, buffer);
}

// Create placeholder images
createPlaceholderImage(800, 600, 'LED Sign', 'public/images/products/led-sign.jpg');
createPlaceholderImage(300, 200, 'LED Sign 1', 'public/images/products/led-sign-1.jpg');
createPlaceholderImage(300, 200, 'LED Sign 2', 'public/images/products/led-sign-2.jpg');
createPlaceholderImage(300, 200, 'LED Sign 3', 'public/images/products/led-sign-3.jpg');
createPlaceholderImage(128, 128, 'RASA', 'public/images/logo-light.png');

// Create a simple circuit board pattern SVG
const circuitBoardSVG = `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="circuit" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 0 10 L 20 10 M 10 0 L 10 20" stroke="#57DCDA" stroke-width="0.5" fill="none"/>
      <circle cx="10" cy="10" r="2" fill="#57DCDA"/>
    </pattern>
  </defs>
  <rect width="100" height="100" fill="url(#circuit)"/>
</svg>
`;

fs.writeFileSync('public/images/patterns/circuit-board.svg', circuitBoardSVG);

console.log('Placeholder images generated successfully!'); 