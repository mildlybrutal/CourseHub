# CourseHub Deployment Guide 🚀

## Prerequisites

1. **Database**: PostgreSQL with pgvector extension
2. **API Keys**: Google OAuth credentials and Gemini API key
3. **Platform**: Vercel account (recommended)

## Quick Deploy to Vercel

### 1. Database Setup
Choose one of these PostgreSQL providers with pgvector support:

**Option A: Neon (Recommended)**
```bash
# Create account at neon.tech
# Create new project with PostgreSQL
# Enable pgvector extension in SQL editor:
CREATE EXTENSION IF NOT EXISTS vector;
```

**Option B: Supabase**
```bash
# Create account at supabase.com
# Create new project
# pgvector is pre-installed
```

### 2. Environment Variables
Set these in Vercel dashboard or use Vercel CLI:

```bash
# Database
DATABASE_URL="postgresql://user:pass@host:5432/dbname"

# Authentication (create at console.cloud.google.com)
BETTER_AUTH_SECRET="generate-random-32-char-string"
BETTER_AUTH_URL="https://your-app.vercel.app"
GOOGLE_CLIENT_ID="your-google-oauth-client-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-client-secret"

# AI (get from ai.google.dev)
GEMINI_API_KEY="your-gemini-api-key"
```

### 3. Deploy Steps

**Via Vercel Dashboard:**
1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically

**Via Vercel CLI:**
```bash
npm i -g vercel
vercel --prod
```

### 4. Post-Deployment Setup

**Run database migrations:**
```bash
# In Vercel dashboard, go to Functions tab
# Or run locally with production DATABASE_URL
npx prisma migrate deploy
```

**Seed the database:**
```bash
npm run db:seed
```

**Generate vector embeddings:**
```bash
# Call the ingestion endpoint
curl -X POST https://your-app.vercel.app/api/ingest
```

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URIs:
   - `https://your-app.vercel.app/api/auth/callback/google`
   - `http://localhost:3000/api/auth/callback/google` (for development)

## Gemini API Setup

1. Visit [Google AI Studio](https://ai.google.dev)
2. Create API key
3. Add to environment variables

## Troubleshooting

### Common Issues:

**Build Errors:**
- Ensure all environment variables are set
- Check Prisma schema is valid
- Verify pgvector extension is enabled

**Database Connection:**
- Verify DATABASE_URL format
- Check database allows external connections
- Ensure pgvector extension is installed

**Authentication Issues:**
- Verify Google OAuth redirect URIs
- Check BETTER_AUTH_URL matches deployment URL
- Ensure BETTER_AUTH_SECRET is set

## Local Development

```bash
# Clone and install
git clone https://github.com/mildlybrutal/CourseHub.git
cd CourseHub
npm install

# Setup environment
cp .env.example .env
# Fill in your values

# Setup database
npx prisma migrate dev
npm run seed

# Start development server
npm run dev
```

## Production Checklist

- [ ] Database deployed with pgvector
- [ ] Environment variables configured
- [ ] Google OAuth app created
- [ ] Gemini API key obtained
- [ ] Migrations run successfully
- [ ] Seed data populated
- [ ] Vector embeddings generated
- [ ] Authentication working
- [ ] AI search functional

## Support

For deployment issues, check:
1. Vercel deployment logs
2. Database connection status
3. Environment variable configuration
4. API endpoint responses

Happy deploying! 🎉