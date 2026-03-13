@echo off
echo ========================================
echo ArvyaX Journal System - Setup Script
echo ========================================
echo.

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js is not installed!
    echo Please download and install Node.js from https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js found
echo.

REM Setup Backend
echo Setting up Backend...
cd backend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install backend dependencies
    pause
    exit /b 1
)
echo ✓ Backend dependencies installed
cd ..
echo.

REM Setup Frontend
echo Setting up Frontend...
cd frontend
call npm install
if %errorlevel% neq 0 (
    echo ERROR: Failed to install frontend dependencies
    pause
    exit /b 1
)
echo ✓ Frontend dependencies installed
cd ..
echo.

echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Open PowerShell or CMD in this folder
echo 2. Start Backend: cd backend && npm start
echo 3. In another terminal, start Frontend: cd frontend && npm start
echo.
echo Backend will run on: http://localhost:5000
echo Frontend will run on: http://localhost:3000
echo.
pause
