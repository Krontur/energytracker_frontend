#!/bin/bash

set -e  # Habilita el modo "exit on error" para salir si algún comando falla

echo "Starting build process for frontend..."

# Ejecutar el comando para construir el frontend usando pnpm
pnpm run build || { echo "Build process failed. Exiting..."; exit 1; }

echo "Build process completed successfully!"

# Levantar los contenedores con Docker Compose
echo "Starting Docker Compose..."
docker-compose up --build || { echo "Docker Compose failed to start. Exiting..."; exit 1; }

echo "Docker Compose started successfully!"
