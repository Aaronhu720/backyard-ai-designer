# Backyard AI Designer

AI-powered backyard makeover tool for outdoor living / landscaping companies. Customers upload backyard photos, choose styles and features, and receive AI-generated design concepts with budget estimates.

## Tech Stack

- **Frontend**: Next.js 15 + React 19 + Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite via Prisma (swap to PostgreSQL/Supabase for production)
- **AI**: Mock images for MVP, ready for OpenAI / Replicate / Flux integration

## Quick Start

```bash
# Install dependencies
npm install

# Initialize database
npx prisma db push

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── start/page.tsx              # Customer info form
│   ├── upload/page.tsx             # Photo upload
│   ├── design-preferences/page.tsx # Style & feature selection
│   ├── generating/page.tsx         # AI generation loading
│   ├── result/[projectId]/page.tsx # Design results & estimate
│   ├── admin/page.tsx              # Lead dashboard
│   ├── admin/project/[projectId]/  # Lead detail page
│   └── api/
│       ├── projects/               # CRUD for projects
│       ├── generate/               # AI design generation
│       └── estimate/               # Budget calculation
├── lib/
│   ├── constants.ts                # Styles, features, budget ranges
│   ├── budget-engine.ts            # Cost estimation logic
│   ├── prompt-builder.ts           # AI prompt templates
│   ├── mock-generate.ts            # Mock AI image generation
│   └── db.ts                       # Prisma client
├── components/
│   ├── Header.tsx
│   └── StepIndicator.tsx
└── prisma/
    └── schema.prisma               # Database schema
```

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with CTA |
| `/start` | Customer info form |
| `/upload` | Photo upload (3-10 photos) |
| `/design-preferences` | Style, feature, budget selection |
| `/generating` | AI generation loading animation |
| `/result/[id]` | Design concepts + budget estimate |
| `/admin` | Lead dashboard with status filters |
| `/admin/project/[id]` | Lead detail with notes & actions |

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | List all projects |
| POST | `/api/projects` | Create project + generate designs |
| GET | `/api/projects/[id]` | Get project detail |
| PATCH | `/api/projects/[id]` | Update status / add note |
| POST | `/api/generate` | Generate AI design concepts |
| POST | `/api/estimate` | Calculate budget estimate |

## Development Phases

1. **Phase 1** ✅ UI prototype with mock data
2. **Phase 2**: Supabase/PostgreSQL + real file upload
3. **Phase 3**: Budget engine refinement
4. **Phase 4**: Real AI image generation (OpenAI / Replicate)
5. **Phase 5**: PDF proposal generation

## Production Deployment

1. Switch database to PostgreSQL (update `schema.prisma` provider)
2. Set up Supabase Storage or AWS S3 for image uploads
3. Add environment variables for AI API keys
4. Deploy to Vercel: `npx vercel`

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Database connection string |
| `OPENAI_API_KEY` | OpenAI API key (Phase 4) |
| `REPLICATE_API_TOKEN` | Replicate API token (Phase 4) |
