# 🚀 Quick Deployment Steps

## Option 1: Automated Deployment (Recommended)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```

### Step 3: Run the deployment script
```bash
./deploy.sh
```

That's it! The script will deploy both backend and frontend automatically.

---

## Option 2: Manual Deployment

### Backend Deployment

1. **Navigate to backend**
   ```bash
   cd apps/backend
   ```

2. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

3. **Add Environment Variables in Vercel Dashboard**
   - Go to your project on vercel.com
   - Settings → Environment Variables
   - Add:
     - `DATABASE_URL` = your PostgreSQL connection string
     - `JWT_SECRET` = your secret key
     - `OPENAI_API_KEY` = your OpenAI key

4. **Redeploy**
   ```bash
   vercel --prod
   ```

5. **Copy your backend URL** (e.g., `https://fitness-backend-xxx.vercel.app`)

### Frontend Deployment

1. **Update API URL**
   
   Edit `apps/fitness-web/.env.production`:
   ```env
   VITE_API_BASE_URL=https://your-backend-url.vercel.app/api/v1
   ```

2. **Navigate to frontend**
   ```bash
   cd apps/fitness-web
   ```

3. **Deploy to Vercel**
   ```bash
   vercel --prod
   ```

4. **Done!** Your frontend URL will be displayed

---

## Important: Database Setup

Your PostgreSQL database from Neon is already configured. Just make sure:

1. The database is accessible from the internet
2. Add the DATABASE_URL to Vercel environment variables
3. Run migrations (if needed):
   ```bash
   npx prisma migrate deploy
   ```

---

## Testing Your Deployment

1. **Test Backend**
   ```bash
   curl https://your-backend-url.vercel.app/api/v1/health
   ```

2. **Test Frontend**
   - Open `https://your-frontend-url.vercel.app`
   - Try logging in
   - Check if API calls work

---

## URLs You'll Get

After deployment, you'll have:
- **Backend**: `https://fitness-backend-xxx.vercel.app`
- **Frontend**: `https://fitness-web-xxx.vercel.app`

You can customize these domains in Vercel settings!

---

## Need Help?

Check the full `DEPLOYMENT_GUIDE.md` for detailed troubleshooting and advanced configuration.
