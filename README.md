
# Odisea - Study Abroad Platform

A platform to help students find study abroad opportunities around the world.

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Environment Setup

1. Copy the environment template:
```bash
cp .env.template .env
```

2. Fill in your Supabase credentials in `.env`:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase service role key (for migrations only)

### Development

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Database Migration

To populate the countries table with initial data:

1. Make sure your `.env` file has the correct Supabase credentials
2. Run the migration script:
```bash
node scripts/migrateCountries.js
```

## Project Structure

- `/src` - React frontend application
- `/data` - Static data files (countries.json)
- `/scripts` - Database migration and utility scripts
- `/supabase` - Supabase configuration and migrations

## Features

- 🌍 Browse study abroad destinations
- 🔍 Search and filter countries
- 👤 User authentication
- 💎 Premium features
- 📝 User testimonials
- 🗺️ Interactive world map

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Supabase (Database + Auth)
- React Query
- React Router
