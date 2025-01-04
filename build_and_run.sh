#!/bin/bash

set -e

echo "Installing dependencies for frontend..."
pnpm install || { echo "Failed to install dependencies. Exiting..."; exit 1; }

echo "Starting build process for frontend..."
pnpm run build || { echo "Build process failed. Exiting..."; exit 1; }

echo "Build process completed successfully!"
echo "Starting Docker Compose..."
docker-compose up --build || { echo "Docker Compose failed to start. Exiting..."; exit 1; }

echo "Docker Compose started successfully!"
