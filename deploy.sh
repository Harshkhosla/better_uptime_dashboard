#!/bin/bash

echo "🚀 Deploying Fitness App to Vercel"
echo "=================================="
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm i -g vercel
fi

# Deploy Backend
echo "📦 Deploying Backend..."
cd apps/backend
vercel --prod
BACKEND_URL=$(vercel ls --prod | grep "fitness-backend" | awk '{print $2}' | head -1)
cd ../..

echo ""
echo "✅ Backend deployed!"
echo "Backend URL: https://$BACKEND_URL"
echo ""

# Update Frontend env with backend URL
echo "⚙️  Updating frontend environment..."
cd apps/fitness-web
echo "VITE_API_BASE_URL=https://$BACKEND_URL/api/v1" > .env.production

# Deploy Frontend
echo "📦 Deploying Frontend..."
vercel --prod
FRONTEND_URL=$(vercel ls --prod | grep "fitness-web" | awk '{print $2}' | head -1)
cd ../..

echo ""
echo "✅ Frontend deployed!"
echo "Frontend URL: https://$FRONTEND_URL"
echo ""

echo "=================================="
echo "🎉 Deployment Complete!"
echo "=================================="
echo "Backend:  https://$BACKEND_URL"
echo "Frontend: https://$FRONTEND_URL"
echo ""
echo "⚠️  Don't forget to:"
echo "1. Add environment variables in Vercel Dashboard (DATABASE_URL, JWT_SECRET, OPENAI_API_KEY)"
echo "2. Run database migrations: npx prisma migrate deploy"
echo "3. Test your deployed apps!"
