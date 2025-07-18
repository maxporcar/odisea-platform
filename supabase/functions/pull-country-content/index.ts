
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface CountryRow {
  country_id: string;
  overview_md: string;
  culture_md: string;
  life_activities_md: string;
  scholarships_md: string;
  visa_md: string;
  medical_md: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting Google Sheets sync...');
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Fetch CSV data from Google Sheets
    const sheetsUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRa6-tCniHEkpjW23o5fYRiVCFRRdUF9CI0XuZ95YQ4OzcaTrgoDikZuxMq1-4L_zVd1tr7h5wiwl7_/pub?output=csv';
    
    console.log('Fetching CSV from Google Sheets...');
    const response = await fetch(sheetsUrl);
    const csvText = await response.text();
    
    console.log('CSV fetched, parsing rows...');
    
    // Parse CSV (simple parser for this specific format)
    const lines = csvText.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    
    console.log('Headers:', headers);
    
    const rows: CountryRow[] = [];
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      if (!line.trim()) continue;
      
      // Simple CSV parsing - handle quoted fields
      const values: string[] = [];
      let current = '';
      let inQuotes = false;
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          values.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }
      values.push(current.trim());
      
      if (values.length >= headers.length) {
        const row: any = {};
        headers.forEach((header, index) => {
          row[header] = values[index] || '';
        });
        
        if (row.country_id) {
          rows.push({
            country_id: row.country_id,
            overview_md: row.overview_md || '',
            culture_md: row.culture_md || '',
            life_activities_md: row.life_activities_md || '',
            scholarships_md: row.scholarships_md || '',
            visa_md: row.visa_md || '',
            medical_md: row.medical_md || ''
          });
        }
      }
    }
    
    console.log(`Parsed ${rows.length} rows`);
    
    // Upsert content for each country
    let upsertCount = 0;
    for (const row of rows) {
      const sections = [
        { section: 'overview', content: row.overview_md },
        { section: 'culture', content: row.culture_md },
        { section: 'life_activities', content: row.life_activities_md },
        { section: 'scholarships', content: row.scholarships_md },
        { section: 'visa', content: row.visa_md },
        { section: 'medical', content: row.medical_md }
      ];
      
      for (const { section, content } of sections) {
        if (content && content.trim()) {
          const { error } = await supabase
            .from('country_content')
            .upsert({
              country_id: row.country_id,
              section: section,
              content_md: content.trim()
            }, {
              onConflict: 'country_id,section'
            });
          
          if (error) {
            console.error(`Error upserting ${row.country_id}/${section}:`, error);
          } else {
            upsertCount++;
            console.log(`Upserted: ${row.country_id}/${section}`);
          }
        }
      }
    }
    
    console.log(`Sync complete! Upserted ${upsertCount} content sections.`);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: `Synced ${rows.length} countries, upserted ${upsertCount} content sections` 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );
    
  } catch (error) {
    console.error('Error in pull-country-content:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
