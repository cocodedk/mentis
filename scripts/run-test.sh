#!/bin/bash

# Script to run tests for Mentis project
# Usage: ./scripts/run-test.sh [watch|coverage|ui]

set -e

cd "$(dirname "$0")/.." || exit 1

case "${1:-run}" in
  watch)
    echo "Running tests in watch mode..."
    npm run test:watch
    ;;
  coverage)
    echo "Running tests with coverage..."
    npm run test:coverage
    ;;
  ui)
    echo "Opening test UI..."
    npm run test:ui
    ;;
  run|*)
    echo "Running tests..."
    npm test
    ;;
esac
