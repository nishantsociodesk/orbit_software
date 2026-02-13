@echo off
echo Cloning Electronics Themes into storefront_hub_clean...

echo Cloning Theme 1 from https://github.com/Piyush0000/orbit_upfront.git...
if exist "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-1" rmdir /S /Q "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-1"
git clone https://github.com/Piyush0000/orbit_upfront.git "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-1"

echo Cloning Theme 2 from https://github.com/Piyush0000/Electronics_upfront_2.git...
if exist "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-2" rmdir /S /Q "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-2"
git clone https://github.com/Piyush0000/Electronics_upfront_2.git "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-2"

echo Cloning Theme 3 from https://github.com/Piyush0000/electronics_Upfront_3.git...
if exist "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-3" rmdir /S /Q "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-3"
git clone https://github.com/Piyush0000/electronics_Upfront_3.git "d:\orbit\storefront_hub_clean\src\components\themes\electronics-theme-3"

echo Theme cloning completed!
pause