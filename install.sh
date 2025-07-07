#!/bin/bash

# Malachite Install Script
# This script clones the repository, installs dependencies, and starts the project

echo "Starting Malachite installation..."
echo "Checking dependencies..."

missing=""

# Check Git
if ! command -v git &> /dev/null; then
    missing="$missing Git"
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    missing="$missing Node.js"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    missing="$missing npm"
fi

if [ -n "$missing" ]; then
    echo "Missing dependencies:$missing"
    echo "Please install the missing dependencies and try again."
    exit 1
else
    echo "All dependencies found."
    echo "Starting Malachite..."
    npm start
    sleep 5
fi 