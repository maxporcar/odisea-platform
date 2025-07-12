#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const { updateTranslations } = require('./auto-translate-advanced');

console.log('🔥 Starting i18n file watcher...');
console.log('👁️  Watching for changes in English translation file...');

const EN_FILE = path.resolve(__dirname, '../public/locales/en/translation.json');

// Watch the English translation file for changes
const watcher = chokidar.watch(EN_FILE, {
  persistent: true,
  ignoreInitial: true
});

let translationTimeout = null;

watcher.on('change', () => {
  console.log('📝 English translations changed, updating other languages...');
  
  // Debounce rapid changes
  if (translationTimeout) {
    clearTimeout(translationTimeout);
  }
  
  translationTimeout = setTimeout(async () => {
    try {
      await updateTranslations();
      console.log('✨ Automatic translation update completed!');
    } catch (error) {
      console.error('❌ Error during automatic translation:', error.message);
    }
  }, 2000); // Wait 2 seconds after last change
});

watcher.on('error', (error) => {
  console.error('🔥 Watcher error:', error);
});

console.log('✅ i18n watcher is running. Press Ctrl+C to stop.');
console.log('💡 Any changes to public/locales/en/translation.json will automatically');
console.log('   trigger translation updates for Spanish and French.');

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n👋 Stopping i18n watcher...');
  watcher.close();
  process.exit(0);
});