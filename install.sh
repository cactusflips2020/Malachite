#!/bin/bash

# Malachite Install Script
# This script clones the repository, installs dependencies, and starts the project

REPO_URL="https://github.com/YOUR_USERNAME/YOUR_REPO.git"
FOLDER_NAME="Malachite"

# Clone repo if folder doesn't exist
echo "Checking for project folder..."
if [ ! -d "$FOLDER_NAME" ]; then
    echo "Cloning repository..."
    git clone "$REPO_URL" "$FOLDER_NAME"
fi

cd "$FOLDER_NAME"

echo "Starting Malachite..."

    # Install dependencies if node_modules does not exist
    if [ ! -d "node_modules" ]; then
        echo "Installing dependencies..."
        npm install
    fi

    npm start
    sleep 5