import { createClient } from '@supabase/supabase-js';
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

// Unsplash API (free tier)
const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY || 'your-unsplash-access-key';

async function fetchImageFromUnsplash(query, width = 400) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&w=${width}`,
      {
        headers: {
          'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`
        }
      }
    );
    
    const data = await response.json();
    
    if (data.results && data.results.length > 0) {
      return data.results[0].urls.regular;
    }
    
    return null;
  } catch (error) {
    console.error(`❌ Error fetching image for "${query}":`, error.message);
    return null;
  }
}

async function updateCountryImages() {
  console.log('🌍 Fetching country images...');
  
  const { data: countries, error } = await supabase
    .from('countries')
    .select('*')
    .is('image_url', null);
  
  if (error) {
    console.error('❌ Error fetching countries:', error);
    return;
  }
  
  for (const country of countries) {
    console.log(`🔍 Searching image for: ${country.name}`);
    
    const imageUrl = await fetchImageFromUnsplash(`${country.name} city landscape`);
    
    if (imageUrl) {
      const { error: updateError } = await supabase
        .from('countries')
        .update({ image_url: imageUrl })
        .eq('id', country.id);
      
      if (updateError) {
        console.error(`❌ Error updating ${country.name}:`, updateError);
      } else {
        console.log(`✅ Updated ${country.name} with image`);
      }
    } else {
      console.log(`⚠️  No image found for ${country.name}`);
    }
    
    // Rate limiting - wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function updateCityImages() {
  console.log('🏙️ Fetching city images...');
  
  const { data: cities, error } = await supabase
    .from('cities')
    .select('*')
    .is('image_url', null);
  
  if (error) {
    console.error('❌ Error fetching cities:', error);
    return;
  }
  
  for (const city of cities) {
    console.log(`🔍 Searching image for: ${city.name}`);
    
    const imageUrl = await fetchImageFromUnsplash(`${city.name} city skyline`);
    
    if (imageUrl) {
      const { error: updateError } = await supabase
        .from('cities')
        .update({ image_url: imageUrl })
        .eq('id', city.id);
      
      if (updateError) {
        console.error(`❌ Error updating ${city.name}:`, updateError);
      } else {
        console.log(`✅ Updated ${city.name} with image`);
      }
    } else {
      console.log(`⚠️  No image found for ${city.name}`);
    }
    
    // Rate limiting - wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function updateUniversityImages() {
  console.log('🎓 Fetching university images...');
  
  const { data: universities, error } = await supabase
    .from('universities')
    .select('*')
    .is('image_url', null);
  
  if (error) {
    console.error('❌ Error fetching universities:', error);
    return;
  }
  
  for (const university of universities) {
    console.log(`🔍 Searching image for: ${university.name}`);
    
    const imageUrl = await fetchImageFromUnsplash(`${university.name} university campus`);
    
    if (imageUrl) {
      const { error: updateError } = await supabase
        .from('universities')
        .update({ image_url: imageUrl })
        .eq('id', university.id);
      
      if (updateError) {
        console.error(`❌ Error updating ${university.name}:`, updateError);
      } else {
        console.log(`✅ Updated ${university.name} with image`);
      }
    } else {
      console.log(`⚠️  No image found for ${university.name}`);
    }
    
    // Rate limiting - wait 1 second between requests
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function main() {
  console.log('🚀 Starting image fetch process...');
  
  try {
    await updateCountryImages();
    await updateCityImages();
    await updateUniversityImages();
    
    console.log('✅ Image fetch process completed!');
    
    // Show summary
    const { data: countriesWithImages } = await supabase
      .from('countries')
      .select('id')
      .not('image_url', 'is', null);
    
    const { data: citiesWithImages } = await supabase
      .from('cities')
      .select('id')
      .not('image_url', 'is', null);
    
    const { data: universitiesWithImages } = await supabase
      .from('universities')
      .select('id')
      .not('image_url', 'is', null);
    
    console.log('\n📊 SUMMARY:');
    console.log(`Countries with images: ${countriesWithImages?.length || 0}`);
    console.log(`Cities with images: ${citiesWithImages?.length || 0}`);
    console.log(`Universities with images: ${universitiesWithImages?.length || 0}`);
    
  } catch (error) {
    console.error('❌ Error in main process:', error);
  }
}

main();