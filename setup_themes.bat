@echo off
echo Setting up electronics themes...

echo Stopping any running processes...
taskkill /f /im cmd.exe >nul 2>&1

echo Cleaning theme directories...
if exist "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-1" (
  echo Deleting electronics-theme-1...
  rmdir /s /q "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-1"
)
if exist "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-2" (
  echo Deleting electronics-theme-2...
  rmdir /s /q "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-2"
)
if exist "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-3" (
  echo Deleting electronics-theme-3...
  rmdir /s /q "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-3"
)

echo Creating theme directories...
mkdir "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-1"
mkdir "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-2"
mkdir "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-3"

echo Changing to themes directory...
cd /d "d:\orbit\storefront_hub_clean\src\components\themes"

echo Cloning repositories...

echo Cloning first electronics theme...
if exist "electronics-theme-1\*" (
  rmdir /s /q "electronics-theme-1"
)
git clone https://github.com/Piyush0000/orbit_upfront.git electronics-theme-1
if %ERRORLEVEL% NEQ 0 (
  echo Warning: Failed to clone first theme. Make sure git is installed and you have internet access.
)

echo Cloning second electronics theme...
if exist "electronics-theme-2\*" (
  rmdir /s /q "electronics-theme-2"
)
git clone https://github.com/Piyush0000/Electronics_upfront_2.git electronics-theme-2
if %ERRORLEVEL% NEQ 0 (
  echo Warning: Failed to clone second theme. Make sure git is installed and you have internet access.
)

echo Cloning third electronics theme...
if exist "electronics-theme-3\*" (
  rmdir /s /q "electronics-theme-3"
)
git clone https://github.com/Piyush0000/electronics_Upfront_3.git electronics-theme-3
if %ERRORLEVEL% NEQ 0 (
  echo Warning: Failed to clone third theme. Make sure git is installed and you have internet access.
)

echo Setup complete!
echo.
echo To verify the setup:
echo - Check that d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-1 contains the full repository
echo - Check that d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-2 contains the full repository
echo - Check that d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-3 contains the full repository
echo.
echo Note: Make sure Git is installed and available in your PATH before running this script.

pause