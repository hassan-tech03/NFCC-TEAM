# Cricket Team Website 🏏

A modern, full-featured cricket team website built with Next.js 15, Tailwind CSS, and Supabase.

![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![Supabase](https://img.shields.io/badge/Supabase-Database-green?style=for-the-badge&logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss)

## ✨ Features

### Public Website
- **Homepage**: Team banner, stats, featured players, upcoming matches, recent results, and latest news
- **Players Page**: Complete squad listing with player profiles and stats
- **Upcoming Matches**: Schedule of future matches with venue and timing details
- **Previous Matches**: Match results with scores, summaries, and top performers
- **News & Updates**: Latest team news and announcements
- **About Us**: Team story and values
- **Contact**: Contact form and information

### Database (Supabase)
- PostgreSQL database with full CRUD operations
- Real-time data updates
- File storage for images
- Row-level security
- Auto-generated REST API

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Database**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Image Optimization**: Next.js Image
- **Rendering**: ISR (Incremental Static Regeneration)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- A Supabase account (free at [supabase.com](https://supabase.com))

### Installation

1. **Clone and install dependencies**:
```bash
cd cricket-team-website
npm install
```

2. **Set up Supabase** (5 minutes):
   - Go to https://supabase.com
   - Create a new project
   - Copy your Project URL and anon key
   - Go to SQL Editor and run `supabase-schema.sql`

3. **Configure environment variables**:
Create a `.env.local` file:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **Run the development server**:
```bash
npm run dev
```

5. **Access the application**:
- Website: http://localhost:3000

## 📁 Project Structure

```
cricket-team-website/
├── src/
│   ├── app/
│   │   ├── about/              # About page
│   │   ├── contact/            # Contact page
│   │   ├── matches/            # Upcoming matches pages
│   │   ├── news/               # News articles pages
│   │   ├── players/            # Players pages
│   │   ├── previous-matches/   # Match results pages
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Homepage
│   ├── components/
│   │   ├── Footer.tsx          # Site footer
│   │   └── Header.tsx          # Site header
│   └── lib/
│       ├── supabase.client.ts  # Supabase client
│       └── supabase.queries.ts # Database queries
├── supabase-schema.sql         # Database schema
├── tailwind.config.js          # Tailwind configuration
└── next.config.js              # Next.js configuration
```

## 📊 Database Schema

### Tables
- **settings**: Team information and branding
- **players**: Player profiles with stats
- **matches**: Upcoming match schedule
- **previous_matches**: Match results and scorecards
- **news**: News articles and announcements

See `supabase-schema.sql` for complete schema with sample data.

## 📝 Adding Content

### Via Supabase Dashboard
1. Go to your Supabase project
2. Click "Table Editor"
3. Select a table
4. Click "Insert row"
5. Fill in the data and save

### Via SQL
```sql
-- Add a player
INSERT INTO players (name, slug, role, age, jersey_number, stats)
VALUES (
  'Player Name',
  'player-name',
  'batsman',
  25,
  11,
  '{"matches": 30, "runs": 1200}'
);
```

## 🎨 Customization

### Change Team Colors
Edit `tailwind.config.js`:
```js
colors: {
  primary: {
    600: '#0284c7',  // Main color
    700: '#0369a1',  // Hover color
  }
}
```

### Upload Images
1. Go to Supabase Storage
2. Create a public bucket
3. Upload images
4. Use the public URL in your database

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy

## 📚 Documentation

- `SUPABASE_SETUP_QUICK.md` - Quick 5-minute setup guide
- `SUPABASE_MIGRATION_GUIDE.md` - Detailed setup instructions
- `supabase-schema.sql` - Complete database schema

## 🆘 Support

For issues or questions:
- Next.js: https://nextjs.org/docs
- Supabase: https://supabase.com/docs
- Tailwind CSS: https://tailwindcss.com/docs

## 📄 License

MIT

---

**Built with ❤️ for cricket teams everywhere** 🏏
