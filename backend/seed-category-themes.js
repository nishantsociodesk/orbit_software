const { PrismaClient } = require('@prisma/client');
const themeService = require('./src/services/themeService');

const prisma = new PrismaClient();

async function seedCategoryThemes() {
  try {
    console.log('Seeding category themes...');
    
    // Seed all themes
    const themes = await themeService.seedDefaultThemes();
    
    console.log(`Successfully seeded ${themes.length} themes:`);
    themes.forEach(theme => {
      console.log(`- ${theme.name} (${theme.slug}) - ${theme.category}`);
    });
    
    // Verify themes were created
    const allThemes = await prisma.theme.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`\nTotal themes in database: ${allThemes.length}`);
    console.log('\nThemes by category:');
    
    const categories = {};
    allThemes.forEach(theme => {
      const category = theme.category || 'UNCATEGORIZED';
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push(theme.name);
    });
    
    Object.entries(categories).forEach(([category, themeNames]) => {
      console.log(`\n${category}:`);
      themeNames.forEach(name => console.log(`  - ${name}`));
    });
    
  } catch (error) {
    console.error('Error seeding themes:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedCategoryThemes();