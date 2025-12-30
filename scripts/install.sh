#!/bin/bash

# Script to install dependencies for Mentis project
# Usage: ./scripts/install.sh

set -e

cd "$(dirname "$0")/.." || exit 1

echo "Installing dependencies for Mentis project..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Error: Node.js is not installed. Please install Node.js first."
    echo "Visit https://nodejs.org/ to download and install Node.js"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "Error: npm is not installed. Please install npm first."
    exit 1
fi

# Display Node.js and npm versions
echo "Node.js version: $(node --version)"
echo "npm version: $(npm --version)"
echo ""

# Install dependencies
echo "Running npm install..."
npm install

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "  - Run './scripts/run-dev.sh' to start the development server"
echo "  - Run './scripts/run-test.sh' to run tests"
echo "  - Run 'npm run build' to build for production"
echo ""
