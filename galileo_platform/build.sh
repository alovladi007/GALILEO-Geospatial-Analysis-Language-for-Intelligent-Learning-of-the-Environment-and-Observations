#!/bin/bash

echo "🚀 Building GALILEO Frontend for Render..."

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build the Next.js app
echo "🔨 Building Next.js application..."
npm run build

echo "✅ Build complete!"