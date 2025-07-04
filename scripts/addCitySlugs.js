import { createClient } from '@supabase/supabase-js';
import slugify from 'slugify';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const SUPABASE_URL = "https://wqmokzfmioaqqlitlvnb.supabase.co";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is required. Please set it in your environment variables.');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// City name to English slug mapping
const cityNameMap = {
  // Spanish cities
  'Barcelona': 'barcelona',
  'Madrid': 'madrid',
  'Valencia': 'valencia',
  'Sevilla': 'seville',
  'Bilbao': 'bilbao',
  'Granada': 'granada',
  
  // French cities
  'París': 'paris',
  'Lyon': 'lyon',
  'Marseille': 'marseille',
  'Toulouse': 'toulouse',
  'Nice': 'nice',
  'Nantes': 'nantes',
  
  // Italian cities
  'Roma': 'rome',
  'Milano': 'milan',
  'Napoli': 'naples',
  'Torino': 'turin',
  'Palermo': 'palermo',
  'Génova': 'genoa',
  
  // Canadian cities
  'Toronto': 'toronto',
  'Montreal': 'montreal',
  'Vancouver': 'vancouver',
  'Calgary': 'calgary',
  'Edmonton': 'edmonton',
  'Ottawa': 'ottawa'
};

function generateEnglishSlug(cityName) {
  // First check if we have a manual mapping
  if (cityNameMap[cityName]) {
    return cityNameMap[cityName];
  }
  
  // Use slugify for automatic conversion
  return slugify(cityName, {
    lower: true,
    remove: /[*+~.()'"!:@]/g,
    replacement: '-'
  });
}

async function updateCitySlugs() {
  console.log('🏙️ Updating city slugs...');
  
  const { data: cities, error } = await supabase
    .from('cities')
    .select('*')
    .order('name');
  
  if (error) {
    console.error('❌ Error fetching cities:', error);
    return;
  }
  
  console.log(`Found ${cities.length} cities to process`);
  
  const slugConflicts = new Map();
  const processedSlugs = new Set();
  
  for (const city of cities) {
    let slug = generateEnglishSlug(city.name);
    
    // Handle conflicts by adding city index
    if (processedSlugs.has(slug)) {
      let counter = 2;
      let newSlug = `${slug}-${counter}`;
      while (processedSlugs.has(newSlug)) {
        counter++;
        newSlug = `${slug}-${counter}`;
      }
      slug = newSlug;
      console.log(`⚠️  Slug conflict for ${city.name}, using: ${slug}`);
    }
    
    processedSlugs.add(slug);
    
    // Update the city with the new slug
    const { error: updateError } = await supabase
      .from('cities')
      .update({ slug })
      .eq('id', city.id);
    
    if (updateError) {
      console.error(`❌ Error updating ${city.name}:`, updateError);
    } else {
      console.log(`✅ Updated ${city.name} → ${slug}`);
    }
  }
}

async function validateSlugs() {
  console.log('🔍 Validating slugs...');
  
  const { data: cities, error } = await supabase
    .from('cities')
    .select('name, slug')
    .order('name');
  
  if (error) {
    console.error('❌ Error validating slugs:', error);
    return;
  }
  
  console.log('\n📋 City Slug Mapping:');
  cities.forEach(city => {
    console.log(`${city.name} → ${city.slug}`);
  });
  
  // Check for duplicates
  const slugCount = {};
  cities.forEach(city => {
    if (city.slug) {
      slugCount[city.slug] = (slugCount[city.slug] || 0) + 1;
    }
  });
  
  const duplicates = Object.entries(slugCount).filter(([slug, count]) => count > 1);
  if (duplicates.length > 0) {
    console.log('\n⚠️  Duplicate slugs found:');
    duplicates.forEach(([slug, count]) => {
      console.log(`${slug}: ${count} times`);
    });
  } else {
    console.log('\n✅ No duplicate slugs found');
  }
}

async function main() {
  console.log('🚀 Starting city slug update process...');
  
  try {
    await updateCitySlugs();
    await validateSlugs();
    
    console.log('\n✅ City slug update process completed!');
    
  } catch (error) {
    console.error('❌ Error in main process:', error);
  }
}

main();