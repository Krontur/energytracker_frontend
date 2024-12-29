@echo off
setlocal enabledelayedexpansion


echo Starting build process for frontend...

call pnpm run build

echo Build process completed successfully!

:: Levantar los contenedores con Docker Compose
echo Starting Docker Compose...
docker-compose up --build

:: Verificar si Docker Compose se ejecutó correctamente
if errorlevel 1 (
    echo Docker Compose failed to start. Exiting...
    exit /b 1
)

echo Docker Compose started successfully!
pause