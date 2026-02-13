@echo off
echo ========================================
echo   FIXING STOREFRONT - Starting NEW Hub
echo ========================================
echo.

echo Step 1: Killing all Node processes...
taskkill /F /IM node.exe 2>nul
timeout /t 2 >nul

echo.
echo Step 2: Starting Backend API...
start "Backend API" cmd /k "cd /d d:\orbit\backend && npm run dev"
timeout /t 3 >nul

echo.
echo Step 3: Starting NEW Storefront Hub (storefront_hub_clean)...
start "NEW Storefront Hub" cmd /k "cd /d d:\orbit\storefront_hub_clean && npm run dev"
timeout /t 5 >nul

echo.
echo ========================================
echo   Services Started!
echo ========================================
echo.
echo Backend:  http://localhost:5000
echo Storefront: http://localhost:3000
echo.
echo Wait 10 seconds for compilation, then visit:
echo http://localhost:3000/storefront/toyss
echo.
pause
