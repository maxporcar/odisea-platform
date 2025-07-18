
const { createClient } = require('@supabase/supabase-js');
const Papa = require('papaparse');

// Configuración
const SHEET_CSV_URL = process.env.SHEET_CSV_URL || 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSH8xQqQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQzQ/pub?output=csv';
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing required environment variables');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Función para generar slug
function generateSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

// Función para obtener ID de país por slug
async function getCountryIdBySlug(countrySlug) {
  const { data, error } = await supabase
    .from('countries')
    .select('id')
    .eq('slug', countrySlug)
    .single();
  
  if (error) {
    console.warn(`⚠️ Country not found for slug: ${countrySlug}`);
    return null;
  }
  
  return data.id;
}

// Función para sincronizar países
async function syncCountries(csvUrl) {
  console.log('📥 Fetching countries CSV...');
  
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    const { data: rows, errors } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });
    
    if (errors.length > 0) {
      console.error('❌ CSV parsing errors:', errors);
      return;
    }
    
    console.log(`📊 Found ${rows.length} countries to process`);
    
    for (const row of rows) {
      if (!row.name || !row.id) {
        console.warn('⚠️ Skipping row with missing name or id:', row);
        continue;
      }
      
      const countryData = {
        id: row.id,
        name: row.name,
        slug: row.slug || generateSlug(row.name),
        capital: row.capital || '',
        continent: row.continent || '',
        language: row.language || '',
        currency: row.currency || '',
        population: row.population || '',
        description: row.description || '',
        capital_description: row.capital_description || '',
        overview_md: row.overview_md || '',
        big_cities_vs_small_towns_md: row.bigCitiesVsSmallTowns_md || row.big_cities_vs_small_towns_md || '',
        culture_md: row.culture_md || '',
        dos_and_donts_md: row.dosAndDonts_md || row.dos_and_donts_md || '',
        visa_information_md: row.visaInformation_md || row.visa_information_md || '',
        life_activities_travel_md: row.lifeActivitiesTravel_md || row.life_activities_travel_md || '',
        medical_md: row.medical_md || '',
        student_benefits_scholarships_md: row.studentBenefitsScholarships_md || row.student_benefits_scholarships_md || '',
        cost_of_living: row.cost_of_living || 'medium',
        student_population: row.student_population || null,
        visa_info: row.visa_info || null,
        housing: row.housing || null,
        transportation: row.transportation || null,
        flag: row.flag || null,
        image_url: row.image_url || null,
        latitude: row.latitude ? parseFloat(row.latitude) : null,
        longitude: row.longitude ? parseFloat(row.longitude) : null
      };
      
      console.log(`🔄 Upserting country: ${countryData.name}`);
      
      const { error } = await supabase
        .from('countries')
        .upsert(countryData, { onConflict: 'id' });
      
      if (error) {
        console.error(`❌ Error upserting country ${countryData.name}:`, error);
      } else {
        console.log(`✅ Successfully upserted: ${countryData.name}`);
      }
    }
    
    console.log('🎉 Countries sync completed!');
    
  } catch (error) {
    console.error('❌ Error syncing countries:', error);
  }
}

// Función para sincronizar ciudades
async function syncCities(csvUrl) {
  console.log('📥 Fetching cities CSV...');
  
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();
    
    const { data: rows, errors } = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (header) => header.trim()
    });
    
    if (errors.length > 0) {
      console.error('❌ CSV parsing errors:', errors);
      return;
    }
    
    console.log(`📊 Found ${rows.length} cities to process`);
    
    for (const row of rows) {
      if (!row.name || !row.country_slug) {
        console.warn('⚠️ Skipping row with missing name or country_slug:', row);
        continue;
      }
      
      // Obtener country_id por slug
      const countryId = await getCountryIdBySlug(row.country_slug);
      if (!countryId) {
        console.warn(`⚠️ Skipping city ${row.name} - country not found for slug: ${row.country_slug}`);
        continue;
      }
      
      const cityData = {
        country_id: countryId,
        country_slug: row.country_slug,
        name: row.name,
        slug: row.slug || generateSlug(row.name),
        climate_md: row.climate_md || '',
        cost_of_living_md: row.costOfLiving_md || row.cost_of_living_md || '',
        safety_md: row.safety_md || '',
        rent_md: row.rent_md || '',
        events_md: row.events_md || '',
        social_md: row.social_md || '',
        universities_md: row.universities_md || '',
        description: row.description || null,
        image_url: row.image_url || null,
        latitude: row.latitude ? parseFloat(row.latitude) : null,
        longitude: row.longitude ? parseFloat(row.longitude) : null
      };
      
      console.log(`🔄 Upserting city: ${cityData.name} (${row.country_slug})`);
      
      const { error } = await supabase
        .from('cities')
        .upsert(cityData, { onConflict: 'slug' });
      
      if (error) {
        console.error(`❌ Error upserting city ${cityData.name}:`, error);
      } else {
        console.log(`✅ Successfully upserted: ${cityData.name}`);
      }
    }
    
    console.log('🎉 Cities sync completed!');
    
  } catch (error) {
    console.error('❌ Error syncing cities:', error);
  }
}

// Función principal
async function main() {
  console.log('🚀 Starting sync from Google Sheets...');
  console.log('📍 Sheet URL:', SHEET_CSV_URL);
  
  // Para este ejemplo, asumo que tienes URLs separadas para países y ciudades
  // Ajusta según tu estructura de Google Sheets
  const countriesUrl = SHEET_CSV_URL.replace('gid=0', 'gid=0'); // Pestaña Countries
  const citiesUrl = SHEET_CSV_URL.replace('gid=0', 'gid=1'); // Pestaña Cities
  
  await syncCountries(countriesUrl);
  await syncCities(citiesUrl);
  
  console.log('✨ Sync process completed!');
}

// Ejecutar si es llamado directamente
if (require.main === module) {
  main().catch(console.error);
}

module.exports = { syncCountries, syncCities };
