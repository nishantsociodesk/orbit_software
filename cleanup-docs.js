const fs = require('fs');
const path = require('path');

// Essential files to keep (core documentation)
const essentialFiles = [
  'README.md',
  'PROJECT_SUMMARY.md',
  'SYSTEM_OVERVIEW.md',
  'THEME_BACKEND_CONNECTION_COMPLETE.md',
  'ORBIT_THEME_CONFIGURATION_COMPLETE.md',
  'AGENCY_CHECKOUT_READY.md'
];

// Files to remove (redundant/old documentation)
const filesToRemove = [
  'ACCESS_MERCHANT_DASHBOARD.md',
  'ADMIN_ONBOARDING_GUIDE.md',
  'ADMIN_PROVISIONING_IMPLEMENTATION.md',
  'ADMIN_PROVISIONING_QUICK_START.md',
  'ADMIN_PROVISIONING_VISUAL_GUIDE.md',
  'ALL_TEMPLATES_CONVERTED.md',
  'ALL_THEMES_COMPLETE_GUIDE.md',
  'API_INTEGRATION_STATUS.md',
  'AUTH_FIXES_COMPLETE.md',
  'CATEGORY_THEME_FILTERING.md',
  'CHANGE_BUSINESS_NAME_GUIDE.md',
  'CLEANUP_PACKAGES_HUB.md',
  'CLONE_APPROACH.md',
  'COMPLETE_CMS_GUIDE.md',
  'COMPLETE_DEMO_GUIDE.md',
  'COMPLETE_IMPLEMENTATION_PLAN.md',
  'COMPLETE_MERCHANT_JOURNEY_GUIDE.md',
  'CONFIGURE_THEMES.md',
  'CONVERSION_STATUS_FINAL.md',
  'CORRECTED_IMPLEMENTATION_PLAN.md',
  'CREATE_MULTI_THEMES.md',
  'DATA_TROUBLESHOOTING.md',
  'DEMO_CHECKLIST.md',
  'DEPLOYMENT_CHECKLIST.md',
  'DIAGNOSIS.md',
  'DOCUMENTATION_INDEX.md',
  'DYNAMIC_STOREFRONT_COMPLETE.md',
  'EXECUTE_OPTION_A.md',
  'FINAL_FIX_STEPS.md',
  'FINAL_TEMPLATE_CONVERSION_REPORT.md',
  'FINISH_CONVERSION_GUIDE.md',
  'FIX_401_ERROR.md',
  'FIX_AND_START.bat',
  'FIX_AND_START_V2.bat',
  'FIX_NOW.md',
  'FIX_SAVE_BUTTON.md',
  'FShip API 1.2.3.2 (2) (8) (1) (1).md',
  'fship.md',
  'FULL_CONTROL_GUIDE.md',
  'FULL_ECOMMERCE_COMPLETE.md',
  'GIT_READY_TO_PUSH.md',
  'GIT_WORKFLOW.md',
  'IMPLEMENTATION_COMPLETE.md',
  'IMPLEMENTATION_PLAN.md',
  'IMPLEMENTATION_SUMMARY.md',
  'INTEGRATION_SUMMARY.md',
  'ISSUES_FIXED.md',
  'MANUAL_TESTING_GUIDE.md',
  'MARKETING_SECTION_UPDATE.md',
  'MERCHANT_CONTROL_SUMMARY.md',
  'MERCHANT_CREDENTIALS.md',
  'META_GATE_REMOVED.md',
  'META_INTEGRATION_SETUP.md',
  'MULTI_TENANT_PROVISIONING_PLAN.md',
  'MULTI_THEME_COMPLETE.md',
  'MULTI_THEME_SYSTEM.md',
  'NULL_VALUE_INPUT_FIX.md',
  'ONBOARDING_COMPLETE.md',
  'ONBOARDING_STATUS.md',
  'ONBOARDING_WEBSITE_GUIDE.md',
  'OPTIMIZATION_GUIDE.md',
  'ORBIT360_LOGIN_LOGOUT.md',
  'ORBIT_INTEGRATION_GUIDE.md',
  'PROVISIONING_DOCUMENTATION_INDEX.md',
  'PROVISIONING_IMPLEMENTATION_SUMMARY.md',
  'PROVISIONING_QUICK_REFERENCE.md',
  'PROVISIONING_README.md',
  'PROVISIONING_SETUP_GUIDE.md',
  'PROVISIONING_WORKFLOW_DIAGRAM.md',
  'QUICK_ONBOARDING_STEPS.md',
  'QUICK_START.md',
  'QUICK_TEMPLATE_CONVERSION_GUIDE.md',
  'README_DEMO_READY.md',
  'README_TEMPLATES.md',
  'REAL_TEMPLATES_GUIDE.md',
  'REPLICATE_THEME_SETUP.md',
  'RESTART_BACKEND_AUTH_FIX.md',
  'RESTART_BACKEND_NOW.md',
  'SHOPIFY_LIKE_INTEGRATION_PLAN.md',
  'START_ALL_THEMES.md',
  'START_ORBIT360.md',
  'START_REAL_TEMPLATES.md',
  'START_STOREFRONT.md',
  'START_STOREFRONT_CORRECT_PORTS.md',
  'START_VISUAL_EDITOR.md',
  'TECHNICAL_IMPLEMENTATION_GUIDE.md',
  'TEMPLATE_ANALYSIS.md',
  'TEMPLATE_API_INTEGRATION_COMPLETE.md',
  'TEMPLATE_API_INTEGRATION_GUIDE.md',
  'TEMPLATE_API_INTEGRATION_STATUS.md',
  'TEMPLATE_COMPLETION_GUIDE.md',
  'TEMPLATE_CONVERSION_COMPLETE.md',
  'TEMPLATE_CONVERSION_GUIDE.md',
  'TEMPLATE_CONVERSION_PROGRESS.md',
  'TEMPLATE_CONVERSION_SUMMARY.md',
  'TEMPLATE_STATUS_QUICK_VIEW.md',
  'TEST_CATEGORY_THEMES.md',
  'THEME_INTEGRATION_PROMPT.md',
  'TROUBLESHOOTING.md',
  'UNIFIED_HUB_IMPLEMENTATION_PLAN.md',
  'UPFRONT_TEMPLATES_INTEGRATION_GUIDE.md',
  'VIEW_MERCHANT_STOREFRONT.md'
];

function cleanupDocumentation() {
  console.log('🧹 Cleaning up unnecessary documentation files...\n');
  
  let removedCount = 0;
  let keptCount = 0;
  
  // Remove unnecessary files
  filesToRemove.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
        console.log(`✓ Removed: ${file}`);
        removedCount++;
      } catch (error) {
        console.log(`✗ Failed to remove: ${file} - ${error.message}`);
      }
    }
  });
  
  // Verify essential files are kept
  essentialFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      console.log(`✓ Kept: ${file}`);
      keptCount++;
    } else {
      console.log(`⚠ Missing: ${file}`);
    }
  });
  
  console.log(`\n✅ Cleanup complete!`);
  console.log(`   Removed: ${removedCount} files`);
  console.log(`   Kept: ${keptCount} essential files`);
  console.log(`\n📁 Essential documentation preserved:`);
  essentialFiles.forEach(file => console.log(`   • ${file}`));
}

cleanupDocumentation();