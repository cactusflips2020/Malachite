@echo off
setlocal

echo Starting Malachite installation...
echo Checking dependencies...

set "missing="

REM Check Git
where git >nul 2>&1
if %errorlevel% neq 0 set missing=%missing% Git

REM Check Node.js
where node >nul 2>&1
if %errorlevel% neq 0 set missing=%missing% Node.js

REM Check npm
where npm >nul 2>&1
if %errorlevel% neq 0 set missing=%missing% npm

if defined missing (
    echo Missing dependencies:%missing%
    echo Please install the missing dependencies and try again.
    pause
    exit /b 1
) else (
    echo All dependencies found.
    echo Starting Malachite...
    echo.
    npm start
)
endlocal 