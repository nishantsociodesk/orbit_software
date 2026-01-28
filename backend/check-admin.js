const { prisma } = require('./src/config/database');
const bcrypt = require('bcryptjs');

async function checkAdmin() {
  try {
    // Find admin user
    const admin = await prisma.admin.findUnique({
      where: { email: 'admin@orbit360.com' }
    });

    if (!admin) {
      console.log('❌ Admin user not found!');
      process.exit(1);
    }

    console.log('✅ Admin user found:');
    console.log('   Email:', admin.email);
    console.log('   Full Name:', admin.fullName);
    console.log('   Role:', admin.role);
    console.log('   Active:', admin.isActive);
    
    // Test password
    const testPassword = 'change-this-password';
    const match = await bcrypt.compare(testPassword, admin.password);
    
    if (match) {
      console.log('\n✅ Password is:', testPassword);
    } else {
      console.log('\n❌ Password is NOT the default');
      console.log('   Check your .env file for DEFAULT_ADMIN_PASSWORD');
      
      // Create a new password
      console.log('\n🔧 Resetting password to:', testPassword);
      const hashed = await bcrypt.hash(testPassword, 10);
      await prisma.admin.update({
        where: { email: 'admin@orbit360.com' },
        data: { password: hashed }
      });
      console.log('✅ Password reset successfully!');
    }

  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkAdmin();
