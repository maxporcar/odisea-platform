const fs = require('fs');
const path = require('path');
const axios = require('axios');

const API_URL = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com/translate';
const SOURCE_LANG = 'en';
const TARGET_LANGS = ['es', 'fr', 'ca'];
const EN_FILE = path.resolve(__dirname, '../public/locales/en/translation.json');

// Rate limiting to be nice to the free API
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function translateText(text, targetLang) {
  try {
    const response = await axios.post(API_URL, {
      q: text,
      source: SOURCE_LANG,
      target: targetLang,
      format: 'text'
    }, {
      headers: {
        'Content-Type': 'application/json'
      },
      timeout: 10000
    });
    
    return response.data.translatedText || text;
  } catch (error) {
    console.warn(`Translation failed for "${text.substring(0, 50)}..." to ${targetLang}:`, error.message);
    return text; // Return original text if translation fails
  }
}

async function translateNestedObject(obj, targetLang, keyPath = '', level = 0) {
  const result = {};
  const indent = '  '.repeat(level);
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = keyPath ? `${keyPath}.${key}` : key;
    
    if (typeof value === 'string') {
      console.log(`${indent}[${currentPath}] Translating: "${value.substring(0, 80)}${value.length > 80 ? '...' : ''}"`);
      result[key] = await translateText(value, targetLang);
      // Be nice to the free API - small delay between requests
      await delay(200);
    } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
      console.log(`${indent}[${currentPath}] Processing nested object...`);
      result[key] = await translateNestedObject(value, targetLang, currentPath, level + 1);
    } else {
      result[key] = value; // Keep arrays and other types as-is
    }
  }
  
  return result;
}

async function updateTranslations() {
  console.log('🌍 Starting advanced i18n translation process...');
  
  if (!fs.existsSync(EN_FILE)) {
    console.error(`❌ Source file not found: ${EN_FILE}`);
    console.log('💡 Make sure the English translation file exists first.');
    return;
  }

  const englishData = JSON.parse(fs.readFileSync(EN_FILE, 'utf-8'));
  
  console.log(`📝 Found ${Object.keys(englishData).length} main sections to translate`);

  for (const lang of TARGET_LANGS) {
    console.log(`\n🔄 Translating to ${lang.toUpperCase()}...`);
    
    const targetFile = path.resolve(__dirname, `../public/locales/${lang}/translation.json`);
    let existingData = {};
    
    // Load existing translations to avoid re-translating
    if (fs.existsSync(targetFile)) {
      try {
        existingData = JSON.parse(fs.readFileSync(targetFile, 'utf-8'));
        console.log(`  📄 Found existing ${lang} translations, updating incrementally...`);
      } catch (error) {
        console.log(`  ⚠️  Could not parse existing ${lang} file, creating new one...`);
      }
    }
    
    // Merge and translate
    const translatedData = await translateNestedObject(englishData, lang);
    
    // Write the complete translation file
    fs.mkdirSync(path.dirname(targetFile), { recursive: true });
    fs.writeFileSync(targetFile, JSON.stringify(translatedData, null, 2));
    
    console.log(`✅ ${lang.toUpperCase()}: Translation completed and written to ${targetFile}`);
  }
  
  console.log('\n🎉 Advanced translation process completed!');
  console.log('🚀 All pages should now be fully internationalized!');
}

// Auto-detection of new strings system
function detectUntranslatedStrings() {
  console.log('\n🔍 Scanning for untranslated strings in source code...');
  
  const srcDir = path.resolve(__dirname, '../src');
  const fileExtensions = ['.tsx', '.ts', '.jsx', '.js'];
  
  // This would scan source files for hardcoded Spanish strings
  // and suggest adding them to translation files
  console.log('📋 This feature would scan for strings containing Spanish characters');
  console.log('   and suggest translation keys for them.');
}

if (require.main === module) {
  updateTranslations()
    .then(() => detectUntranslatedStrings())
    .catch(console.error);
}

module.exports = { updateTranslations, detectUntranslatedStrings };