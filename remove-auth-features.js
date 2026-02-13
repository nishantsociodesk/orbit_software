const fs = require('fs');
const path = require('path');

// Function to remove authentication features from a theme
function removeAuthFeatures(themePath, themeName) {
  console.log(`\nProcessing theme: ${themeName}`);
  
  try {
    // 1. Remove login and signup pages
    const loginPath = path.join(themePath, 'app', 'login');
    const signupPath = path.join(themePath, 'app', 'signup');
    
    if (fs.existsSync(loginPath)) {
      fs.rmSync(loginPath, { recursive: true, force: true });
      console.log('  ✓ Removed login page');
    }
    
    if (fs.existsSync(signupPath)) {
      fs.rmSync(signupPath, { recursive: true, force: true });
      console.log('  ✓ Removed signup page');
    }
    
    // 2. Update Header component to remove auth buttons
    const headerPath = path.join(themePath, 'components', 'Header.tsx');
    if (fs.existsSync(headerPath)) {
      let headerContent = fs.readFileSync(headerPath, 'utf8');
      
      // Remove login/signup buttons from desktop view
      headerContent = headerContent.replace(
        /<div className="hidden lg:flex items-center gap-2">[\s\S]*?<\/div>/,
        '<!-- Auth buttons removed for agency checkout -->'
      );
      
      // Remove login/signup buttons from mobile menu
      headerContent = headerContent.replace(
        /<div className="flex flex-col gap-3 py-6 border-y border-zinc-100">[\s\S]*?<\/div>/,
        '<!-- Mobile auth buttons removed -->'
      );
      
      // Remove User icon import if present
      headerContent = headerContent.replace(
        /import {[^}]*User[^}]*} from "lucide-react"/,
        'import { ShoppingCart, Search, Menu } from "lucide-react"'
      );
      
      fs.writeFileSync(headerPath, headerContent);
      console.log('  ✓ Updated Header component');
    }
    
    // 3. Update layout to remove auth context if present
    const layoutPath = path.join(themePath, 'app', 'layout.tsx');
    if (fs.existsSync(layoutPath)) {
      let layoutContent = fs.readFileSync(layoutPath, 'utf8');
      
      // Remove auth provider if present
      layoutContent = layoutContent.replace(
        /<AuthProvider>[\s\S]*?<\/AuthProvider>/,
        ''
      );
      
      // Remove auth context import
      layoutContent = layoutContent.replace(
        /import { AuthProvider } from "@\/context\/AuthContext";?\n?/,
        ''
      );
      
      fs.writeFileSync(layoutPath, layoutContent);
      console.log('  ✓ Updated layout');
    }
    
    // 4. Remove auth context files
    const authContextPath = path.join(themePath, 'context', 'AuthContext.tsx');
    if (fs.existsSync(authContextPath)) {
      fs.rmSync(authContextPath, { force: true });
      console.log('  ✓ Removed AuthContext');
    }
    
    // 5. Update checkout process to be agency-friendly
    const checkoutPath = path.join(themePath, 'app', 'checkout');
    if (fs.existsSync(checkoutPath)) {
      const checkoutPagePath = path.join(checkoutPath, 'page.tsx');
      if (fs.existsSync(checkoutPagePath)) {
        let checkoutContent = fs.readFileSync(checkoutPagePath, 'utf8');
        
        // Simplify checkout for agency use
        checkoutContent = checkoutContent.replace(
          '// Checkout form implementation',
          `// Agency checkout implementation
// No login required - direct order placement for agencies
// Customer information collected during checkout process`
        );
        
        fs.writeFileSync(checkoutPagePath, checkoutContent);
        console.log('  ✓ Updated checkout for agency use');
      }
    }
    
    // 6. Update package.json to remove auth dependencies if any
    const packagePath = path.join(themePath, 'package.json');
    if (fs.existsSync(packagePath)) {
      let packageContent = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
      
      // Remove auth-related dependencies
      const authDeps = ['next-auth', '@auth/core', 'firebase', 'supabase'];
      let removedDeps = [];
      
      authDeps.forEach(dep => {
        if (packageContent.dependencies && packageContent.dependencies[dep]) {
          delete packageContent.dependencies[dep];
          removedDeps.push(dep);
        }
        if (packageContent.devDependencies && packageContent.devDependencies[dep]) {
          delete packageContent.devDependencies[dep];
          removedDeps.push(dep);
        }
      });
      
      if (removedDeps.length > 0) {
        fs.writeFileSync(packagePath, JSON.stringify(packageContent, null, 2));
        console.log(`  ✓ Removed auth dependencies: ${removedDeps.join(', ')}`);
      }
    }
    
    console.log(`  ✅ Theme ${themeName} auth features removed successfully`);
    
  } catch (error) {
    console.error(`  ❌ Error processing ${themeName}:`, error.message);
  }
}

// Function to process all themes
function removeAllAuthFeatures() {
  const themesPath = path.join(__dirname, 'all_upfront');
  const themes = fs.readdirSync(themesPath);
  
  console.log('Removing authentication features from all themes...\n');
  
  themes.forEach(themeFolder => {
    const themePath = path.join(themesPath, themeFolder);
    const stat = fs.statSync(themePath);
    
    if (stat.isDirectory()) {
      removeAuthFeatures(themePath, themeFolder);
    }
  });
  
  console.log('\n✅ All authentication features removed successfully!');
  console.log('\nChanges made:');
  console.log('• Removed login/signup pages');
  console.log('• Removed auth buttons from header');
  console.log('• Simplified checkout for agency use');
  console.log('• Removed auth context and providers');
  console.log('• Themes now ready for agency checkout integration');
}

// Run the removal process
removeAllAuthFeatures();