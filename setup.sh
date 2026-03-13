#!/bin/bash

echo "========================================"
echo "ArvyaX Journal System - Setup Script"
echo "========================================"
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js is not installed!"
    echo "Please download and install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js found: $(node --version)"
echo ""

# Setup Backend
echo "Setting up Backend..."
cd backend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install backend dependencies"
    exit 1
fi
echo "✓ Backend dependencies installed"
cd ..
echo ""

# Setup Frontend
echo "Setting up Frontend..."
cd frontend
npm install
if [ $? -ne 0 ]; then
    echo "ERROR: Failed to install frontend dependencies"
    exit 1
fi
echo "✓ Frontend dependencies installed"
cd ..
echo ""

echo "========================================"
echo "Setup Complete!"
echo "========================================"
echo ""
echo "To start the application:"
echo ""
echo "1. In terminal 1: cd backend && npm start"
echo "2. In terminal 2: cd frontend && npm start"
echo ""
echo "Backend will run on: http://localhost:5000"
echo "Frontend will run on: http://localhost:3000"
echo ""
