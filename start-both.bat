@echo off
echo.
echo ============================================
echo   Hostel Booking System - Full Stack Setup
echo ============================================
echo.

echo Checking if MongoDB is running...
echo.

REM Check MongoDB
tasklist | findstr /I "mongod" >nul 2>&1
if errorlevel 1 (
    echo WARNING: MongoDB might not be running!
    echo Please make sure MongoDB is started before running the servers.
    echo.
    echo To start MongoDB:
    echo   1. Open PowerShell as Administrator
    echo   2. Run: net start MongoDB
    echo   OR
    echo   3. Run mongod.exe directly from installation folder
    echo.
)

echo.
echo Starting Backend Server (Port 5000)...
echo.

REM Start backend in a new window
start "Hostel Booking Backend" cmd /k "cd backend && npm run dev"

REM Wait a bit for backend to start
timeout /t 3 /nobreak

echo.
echo Backend server started in new window
echo Waiting for you to review... (Close this window or press any key)
pause

echo.
echo Starting Frontend Server (Port 3000)...
echo.

REM Start frontend in current window
npm run dev
