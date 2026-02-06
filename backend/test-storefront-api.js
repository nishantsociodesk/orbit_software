/**
 * Test Script for Storefront Public API
 * 
 * This script tests all the public API endpoints to ensure they work correctly.
 * Run this after starting the backend server.
 * 
 * Usage: node test-storefront-api.js
 */

const axios = require('axios');

const BASE_URL = 'http://localhost:5000';
const TEST_SUBDOMAIN = 'demo'; // Change this to your test store subdomain

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function testEndpoint(name, url) {
  try {
    log(`\n📡 Testing: ${name}`, 'blue');
    log(`   URL: ${url}`, 'yellow');
    
    const response = await axios.get(url);
    
    if (response.data.success) {
      log(`   ✅ Success!`, 'green');
      log(`   Response:`, 'reset');
      console.log(JSON.stringify(response.data.data, null, 2).substring(0, 500) + '...');
      return true;
    } else {
      log(`   ❌ Failed: ${response.data.message}`, 'red');
      return false;
    }
  } catch (error) {
    log(`   ❌ Error: ${error.message}`, 'red');
    if (error.response) {
      log(`   Status: ${error.response.status}`, 'red');
      log(`   Message: ${error.response.data?.message || 'Unknown error'}`, 'red');
    }
    return false;
  }
}

async function runTests() {
  log('='.repeat(60), 'blue');
  log('🧪 Storefront Public API Test Suite', 'blue');
  log('='.repeat(60), 'blue');
  log(`\nTesting subdomain: ${TEST_SUBDOMAIN}`, 'yellow');
  log(`Backend URL: ${BASE_URL}\n`, 'yellow');

  const tests = [
    {
      name: 'Store Info',
      url: `${BASE_URL}/api/storefront/public/${TEST_SUBDOMAIN}/info`
    },
    {
      name: 'Store Customization',
      url: `${BASE_URL}/api/storefront/public/${TEST_SUBDOMAIN}/customization`
    },
    {
      name: 'Products List',
      url: `${BASE_URL}/api/storefront/public/${TEST_SUBDOMAIN}/products`
    },
    {
      name: 'Products with Limit',
      url: `${BASE_URL}/api/storefront/public/${TEST_SUBDOMAIN}/products?limit=5`
    },
    {
      name: 'Categories',
      url: `${BASE_URL}/api/storefront/public/${TEST_SUBDOMAIN}/categories`
    },
    {
      name: 'Theme',
      url: `${BASE_URL}/api/storefront/public/${TEST_SUBDOMAIN}/theme`
    }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    const result = await testEndpoint(test.name, test.url);
    if (result) {
      passed++;
    } else {
      failed++;
    }
    await new Promise(resolve => setTimeout(resolve, 500)); // Small delay between tests
  }

  log('\n' + '='.repeat(60), 'blue');
  log('📊 Test Results', 'blue');
  log('='.repeat(60), 'blue');
  log(`✅ Passed: ${passed}`, 'green');
  log(`❌ Failed: ${failed}`, failed > 0 ? 'red' : 'reset');
  log(`📈 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%\n`, 'yellow');

  if (failed > 0) {
    log('⚠️  Some tests failed. Check the following:', 'yellow');
    log('   1. Is the backend server running? (npm run dev in backend folder)', 'yellow');
    log(`   2. Does a store with subdomain "${TEST_SUBDOMAIN}" exist in the database?`, 'yellow');
    log('   3. Is the store active (isActive: true)?', 'yellow');
    log('   4. Are there products in the database for this store?', 'yellow');
  } else {
    log('🎉 All tests passed! Your API is working correctly.', 'green');
  }
}

// Run the tests
runTests().catch(error => {
  log(`\n💥 Fatal error: ${error.message}`, 'red');
  process.exit(1);
});
