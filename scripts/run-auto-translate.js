#!/usr/bin/env node

const { updateTranslations } = require('./auto-translate-advanced');

console.log('🌐 Starting automatic translation update...');
console.log('📋 This will update all translation files based on the English version');
console.log('⏳ Please wait, this may take a few moments...\n');

updateTranslations()
  .then(() => {
    console.log('\n✅ Translation update completed successfully!');
    console.log('🎯 All language files have been updated with the latest content');
  })
  .catch((error) => {
    console.error('\n❌ Translation update failed:', error.message);
    process.exit(1);
  });