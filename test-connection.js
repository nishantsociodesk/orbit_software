// Test script to verify theme API connection
const fs = require('fs');
const path = require('path');

async function testApiConnection() {
  try {
    console.log('Testing API connection...');
    
    // Test one theme
    const testTheme = 'food_1';
    const envPath = path.join(__dirname, `all_upfront/${testTheme}/.env.local`);
    
    if (fs.existsSync(envPath)) {
      console.log(`✓ Environment file found for ${testTheme}`);
      
      // Read the environment file
      const envContent = fs.readFileSync(envPath, 'utf8');
      console.log('Environment configuration:');
      console.log(envContent);
      
      // Test if required files exist
      const apiPath = path.join(__dirname, `all_upfront/${testTheme}/lib/api.ts`);
      const contextPath = path.join(__dirname, `all_upfront/${testTheme}/context/store-context.tsx`);
      
      if (fs.existsSync(apiPath)) {
        console.log('✓ API file exists');
      } else {
        console.log('✗ API file missing');
      }
      
      if (fs.existsSync(contextPath)) {
        console.log('✓ Context file exists');
      } else {
        console.log('✗ Context file missing');
      }
      
    } else {
      console.log(`✗ Environment file not found for ${testTheme}`);
    }
    
    // Test database connection by checking if themes exist
    const { PrismaClient } = require('./backend/node_modules/@prisma/client');
    const prisma = new PrismaClient();
    
    try {
      const themes = await prisma.theme.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' }
      });
      
      console.log(`\nDatabase connection successful!`);
      console.log(`Total active themes: ${themes.length}`);
      
      // Group by category
      const categories = {};
      themes.forEach(theme => {
        const category = theme.category || 'UNCATEGORIZED';
        if (!categories[category]) {
          categories[category] = [];
        }
        categories[category].push(theme.name);
      });
      
      console.log('\nThemes by category:');
      Object.entries(categories).forEach(([category, themeNames]) => {
        console.log(`\n${category} (${themeNames.length}):`);
        themeNames.forEach(name => console.log(`  - ${name}`));
      });
      
      await prisma.$disconnect();
      
    } catch (dbError) {
      console.log('✗ Database connection failed:', dbError.message);
    }
    
    console.log('\n✅ Connection test completed!');
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testApiConnection();