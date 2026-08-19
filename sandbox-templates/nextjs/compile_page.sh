#!/bin/bash
set -e

# Change to project directory
cd /home/user

# Start Next.js dev server in the background, redirecting output so Docker doesn't hang
npx next dev --turbopack > /tmp/next.log 2>&1 &
SERVER_PID=$!

echo "Waiting for Next.js server to start and pre-compile..."

# Poll until the root page is compiled and returns 200
while [[ "$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:3000" || true)" -ne 200 ]]; do
  echo "Compiling / page..."
  sleep 0.5
done

echo "Page compiled successfully! Stopping warm-up server..."

# Stop the server so Docker build can finalize and save the .next cache
pkill -9 -f "next|node" || true

echo "Template warm-up complete."