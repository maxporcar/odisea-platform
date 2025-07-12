
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

async function translateAll() {
  console.log('🌍 Starting auto-translation process...');
  
  if (!fs.existsSync(INPUT_FILE)) {
    console.error(`❌ Source file not found: ${INPUT_FILE}`);
    console.log('💡 Run "npm run extract-i18n" first to generate the English translation file.');
    return;
  }

  const data = JSON.parse(fs.readFileSync(INPUT_FILE, 'utf-8'));
  const keys = Object.keys(data);
  
  console.log(`📝 Found ${keys.length} keys to translate`);

  for (const lang of TARGET_LANGS) {
    console.log(`\n🔄 Translating to ${lang.toUpperCase()}...`);
    const output = {};
    let translatedCount = 0;
    
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const text = data[key];
      
      if (!text || text.trim() === '') {
        output[key] = '';
        continue;
      }

      console.log(`  [${i + 1}/${keys.length}] Translating: "${text.substring(0, 50)}${text.length > 50 ? '...' : ''}"`);
      
      const translatedText = await translateText(text, lang);
      output[key] = translatedText;
      translatedCount++;
      
      // Be nice to the free API - small delay between requests
      await delay(100);
    }
    
    const outPath = path.resolve(__dirname, `../public/locales/${lang}/translation.json`);
    fs.mkdirSync(path.dirname(outPath), { recursive: true });
    fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
    
    console.log(`✅ ${lang.toUpperCase()}: ${translatedCount} translations written to ${outPath}`);
  }
  
  console.log('\n🎉 Translation process completed!');
}

translateAll().catch(console.error);
