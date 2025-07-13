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

REM Install dependencies if node_modules does not exist
if not exist node_modules (
    echo Installing dependencies...
    npm install
)

echo Starting Malachite...
npm start
timeout /t 5 /nobreak >nul
endlocal 