# Vercel Deployment Guide

## Prerequisites
1. Install Vercel CLI: `npm i -g vercel`
2. Login to Vercel: `vercel login`

## Deploy Backend

### Step 1: Navigate to backend folder
```bash
cd apps/backend
```

### Step 2: Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → `fitness-backend` (or your preferred name)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

### Step 3: Add Environment Variables
After deployment, add these environment variables in Vercel Dashboard:

1. Go to your project settings on Vercel
2. Navigate to **Environment Variables**
3. Add the following:

```
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret_key
OPENAI_API_KEY=your_openai_api_key
NODE_ENV=production
```

### Step 4: Redeploy with environment variables
```bash
vercel --prod
```

**Your backend URL will be:** `https://fitness-backend.vercel.app`

---

## Deploy Fitness-Web (Frontend)

### Step 1: Update API Base URL
Before deploying, update the API base URL in your frontend:

File: `apps/fitness-web/src/redux/services/api.ts`
```typescript
baseUrl: "https://fitness-backend.vercel.app/api/v1"
```

Or use environment variable:
File: `apps/fitness-web/.env.production`
```
VITE_API_BASE_URL=https://fitness-backend.vercel.app/api/v1
```

### Step 2: Navigate to fitness-web folder
```bash
cd apps/fitness-web
```

### Step 3: Deploy to Vercel
```bash
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Select your account
- **Link to existing project?** → No
- **Project name?** → `fitness-web` (or your preferred name)
- **Directory?** → `./` (current directory)
- **Override settings?** → No

### Step 4: Production Deployment
```bash
vercel --prod
```

**Your frontend URL will be:** `https://fitness-web.vercel.app`

---

## Quick Deploy Commands

### Deploy Both Projects (from root)

```bash
# Deploy backend
cd apps/backend && vercel --prod && cd ../..

# Deploy frontend
cd apps/fitness-web && vercel --prod && cd ../..
```

---

## Environment Variables Required

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@host:5432/database
JWT_SECRET=your-super-secret-jwt-key-change-this
OPENAI_API_KEY=sk-your-openai-api-key
NODE_ENV=production
PORT=4000
```

### Frontend (.env.production)
```env
VITE_API_BASE_URL=https://your-backend-url.vercel.app/api/v1
```

---

## Important Notes

1. **Database**: Make sure your PostgreSQL database is accessible from Vercel (use services like Neon, Supabase, or Railway)

2. **CORS**: The backend already has CORS enabled. Update if you need to restrict origins:
   ```typescript
   app.use(cors({
     origin: 'https://fitness-web.vercel.app'
   }));
   ```

3. **Prisma**: Vercel will automatically run `prisma generate` during build. Make sure your database migrations are applied:
   ```bash
   npx prisma migrate deploy
   ```

4. **Build Command**: Vercel auto-detects build commands, but you can override in `vercel.json` if needed

5. **Logs**: View deployment logs with `vercel logs [deployment-url]`

---

## Troubleshooting

### Backend Issues
- **500 Errors**: Check Vercel function logs
- **Database Connection**: Ensure DATABASE_URL is set correctly
- **Prisma Errors**: Run `npx prisma generate` locally first

### Frontend Issues
- **API Calls Failing**: Verify VITE_API_BASE_URL is correct
- **404 on Refresh**: The `vercel.json` rewrites should fix this
- **Build Errors**: Check TypeScript errors with `pnpm run build`

---

## Custom Domains (Optional)

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain
4. Update DNS records as instructed

---

## Continuous Deployment

Connect your GitHub repository to Vercel for automatic deployments:

1. Go to Vercel Dashboard
2. Click **Import Project**
3. Select your GitHub repository
4. Configure root directory for each project:
   - Backend: `apps/backend`
   - Frontend: `apps/fitness-web`
5. Add environment variables
6. Deploy!

Every push to `main` branch will trigger automatic deployment.
