import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Language code mapping for LibreTranslate compatibility
const languageMapping: Record<string, string> = {
  'en': 'en',
  'es': 'es', 
  'fr': 'fr',
  'ca': 'ca', // Catalan
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { text, targetLang, sourceLang = 'en' } = await req.json()

    if (!text || !targetLang) {
      return new Response(
        JSON.stringify({ error: 'Missing text or targetLang parameter' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Map language codes
    const mappedTargetLang = languageMapping[targetLang] || targetLang
    const mappedSourceLang = languageMapping[sourceLang] || sourceLang

    // If target language is the same as source, return original text
    if (mappedTargetLang === mappedSourceLang) {
      return new Response(
        JSON.stringify({ translatedText: text }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Call LibreTranslate API
    const translateResponse = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: mappedSourceLang,
        target: mappedTargetLang,
        format: 'text'
      })
    })

    if (!translateResponse.ok) {
      throw new Error(`Translation API error: ${translateResponse.status}`)
    }

    const translationResult = await translateResponse.json()
    
    return new Response(
      JSON.stringify({ 
        translatedText: translationResult.translatedText || text,
        success: true
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Translation error:', error)
    
    // Return original text in case of error
    const { text } = await req.json().catch(() => ({ text: '' }))
    
    return new Response(
      JSON.stringify({ 
        translatedText: text,
        error: 'Translation failed, returning original text',
        success: false
      }),
      { 
        status: 200, // Don't fail the request, just return original text
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    )
  }
})