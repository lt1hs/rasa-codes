#!/bin/bash

# Create necessary directories
mkdir -p public/images/products
mkdir -p public/images/patterns
mkdir -p public/images/app

# Download sample images
# LED Sign images
curl -o public/images/products/led-sign.jpg https://images.unsplash.com/photo-1563089145-599997674d42?w=800&h=600&fit=crop
curl -o public/images/products/led-sign-1.jpg https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=300&h=200&fit=crop
curl -o public/images/products/led-sign-2.jpg https://images.unsplash.com/photo-1533749047139-189de3cf06d3?w=300&h=200&fit=crop
curl -o public/images/products/led-sign-3.jpg https://images.unsplash.com/photo-1580983230786-f03769ae1325?w=300&h=200&fit=crop

# Pattern and logo
curl -o public/images/patterns/circuit-board.svg https://raw.githubusercontent.com/pattern-lab/patternlab-node/master/packages/uikit-workshop/src/scripts/components/pattern-grid.svg
curl -o public/images/logo-light.png https://via.placeholder.com/128/57DCDA/FFFFFF?text=RASA

echo "Sample images have been downloaded successfully!" 