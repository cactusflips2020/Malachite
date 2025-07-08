@echo off
setlocal

set "REPO_URL=https://github.com/cactusflips2020/Malachite.git"
set "FOLDER_NAME=Malachite"

REM Check if folder exists
if not exist "%FOLDER_NAME%" (
    echo Cloning repository...
    git clone %REPO_URL% %FOLDER_NAME%
)

cd %FOLDER_NAME%

REM Check for dependencies
set "missing="
where git >nul 2>&1
if %errorlevel% neq 0 set missing=%missing% Git
where node >nul 2>&1
if %errorlevel% neq 0 set missing=%missing% Node.js
where npm >nul 2>&1
if %errorlevel% neq 0 set missing=%missing% npm

if defined missing (
    echo Missing dependencies:%missing%
    echo Please install the missing dependencies and try again.
    pause
    exit /b 1
)

REM Install dependencies if node_modules does not exist
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

echo Starting Malachite...
npm start
timeout /t 5 /nobreak >nul
endlocal 