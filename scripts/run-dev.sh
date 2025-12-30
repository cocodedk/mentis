#!/bin/bash

# Script to start the development server for Mentis project
# Usage: ./scripts/run-dev.sh

set -e

cd "$(dirname "$0")/.." || exit 1

echo "Starting development server..."
echo "Server will be available at http://localhost:5173"
echo "Press Ctrl+C to stop the server"
echo ""

npm run dev
