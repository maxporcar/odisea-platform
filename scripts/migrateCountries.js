
// Migration script to populate countries table in Supabase
// Run with: node scripts/migrateCountries.js

const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing required environment variables:');
  console.error('- SUPABASE_URL');
  console.error('- SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

// Create Supabase client with service role key
const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateCountries() {
  try {
    console.log('🚀 Starting countries migration...');
    
    // Read countries data
    const countriesPath = path.join(__dirname, '..', 'data', 'countries.json');
    const countriesData = JSON.parse(fs.readFileSync(countriesPath, 'utf8'));
    
    console.log(`📊 Found ${countriesData.length} countries to migrate`);
    
    // Transform data to match database schema
    const dbCountries = countriesData.map(country => ({
      id: country.id,
      name: country.name,
      capital: country.capital,
      continent: country.continent,
      language: country.language,
      currency: country.currency,
      population: country.population,
      cost_of_living: country.costOfLiving,
      description: country.description,
      capital_description: country.capitalDescription,
      student_population: country.studentPopulation,
      flag: country.flag
    }));
    
    // Insert countries in batches
    const batchSize = 10;
    let inserted = 0;
    
    for (let i = 0; i < dbCountries.length; i += batchSize) {
      const batch = dbCountries.slice(i, i + batchSize);
      
      const { data, error } = await supabase
        .from('countries')
        .upsert(batch, { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ Error inserting batch ${Math.floor(i/batchSize) + 1}:`, error);
        throw error;
      }
      
      inserted += batch.length;
      console.log(`✅ Inserted ${inserted}/${dbCountries.length} countries`);
    }
    
    console.log('🎉 Migration completed successfully!');
    console.log(`📈 Total countries inserted: ${inserted}`);
    
  } catch (error) {
    console.error('💥 Migration failed:', error);
    process.exit(1);
  }
}

// Run migration
migrateCountries();
