
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const API_URL = process.env.LIBRETRANSLATE_URL || 'https://libretranslate.com/translate';
const SOURCE_LANG = 'en';
const TARGET_LANGS = ['es', 'fr'];
const INPUT_FILE = path.resolve(__dirname, '../public/locales/en/translation.json');

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
    console.warn(`Translation failed for "${text}" to ${targetLang}:`, error.message);
    return text; // Return original text if translation fails
  }
}

async function translateObject(obj, targetLang, keyPath = '') {
  const result = {};
  
  for (const [key, value] of Object.entries(obj)) {
    const currentPath = keyPath ? `${keyPath}.${key}` : key;
    
    if (typeof value === 'string') {
      console.log(`  [${currentPath}] Translating: "${value.substring(0, 50)}${value.length > 50 ? '...' : ''}"`);
      result[key] = await translateText(value, targetLang);
      // Be nice to the free API - small delay between requests
      await delay(100);
    } else if (typeof value === 'object' && value !== null) {
      result[key] = await translateObject(value, targetLang, currentPath);
    } else {
      result[key] = value;
    }
  }
  
  return result;
}

async function translateAll() {
  console.log('🌍 Starting auto-translation process...');
  
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Source file not found: ${INPUT_FILE}`);
    console.log('💡 Run "npm run extract-i18n" first to generate the English translation file.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
  
  console.log(`📝 Found translation keys to translate`);

  for (const lang of TARGET_LANGS) {
    console.log(`\n🔄 Translating to ${lang.toUpperCase()}...`);
    
    const translatedData = await translateObject(data, lang);
    
    const outPath = path.resolve(__dirname, `../public/locales/${lang}/translation.json`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(translatedData, null, 2));
    
    console.log(`✅ ${lang.toUpperCase()}: Translation completed and written to ${outPath}`);
  }
  
  console.log('\n🎉 Translation process completed!');
}

translateAll().catch(console.error);
