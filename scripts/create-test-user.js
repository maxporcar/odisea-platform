// Script to create the test user Flavie Tandar
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wqmokzfmioaqqlitlvnb.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxbW9remZtaW9hcXFsaXRsdm5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE0NTU3NTAsImV4cCI6MjA2NzAzMTc1MH0.nfapWebe5PWhFUlwO14glcnItQC0F2uibLuKceKzCv4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createTestUser() {
  try {
    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'flavie.tandar@gmail.com',
      password: 'flavie@odisea',
      options: {
        data: {
          full_name: 'Flavie Tandar'
        }
      }
    });

    if (authError) {
      console.error('Error creating auth user:', authError);
      return;
    }

    console.log('User created successfully!');
    console.log('User ID:', authData.user?.id);

    // Wait a bit for the trigger to create the profile
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Update the profile with additional information
    if (authData.user?.id) {
      const { error: profileError } = await supabase
        .from('profiles')
        .update({
          country: 'France',
          language: 'fr',
          is_premium: true
        })
        .eq('id', authData.user.id);

      if (profileError) {
        console.error('Error updating profile:', profileError);
      } else {
        console.log('Profile updated successfully!');
      }

      // Create the trip
      const { error: tripError } = await supabase
        .from('user_trips')
        .insert({
          user_id: authData.user.id,
          destination_name: 'Mérida, Mexique',
          country_id: 'mexico',
          departure_date: '2024-09-01'
        });

      if (tripError) {
        console.error('Error creating trip:', tripError);
      } else {
        console.log('Trip created successfully!');
      }
    }

    console.log('\n=== TEST USER CREDENTIALS ===');
    console.log('Email: flavie.tandar@gmail.com');
    console.log('Password: flavie@odisea');
    console.log('=============================\n');

  } catch (error) {
    console.error('Unexpected error:', error);
  }
}

createTestUser();