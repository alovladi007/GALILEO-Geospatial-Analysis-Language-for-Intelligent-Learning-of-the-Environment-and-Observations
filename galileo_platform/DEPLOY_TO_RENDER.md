# Deploy GALILEO to Render

This guide will help you deploy the GALILEO platform to Render.com

## Prerequisites

1. Create a free account at [render.com](https://render.com)
2. Fork or clone this repository to your GitHub account

## Step 1: Deploy the Backend API

1. Go to your Render Dashboard
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `galileo-api`
   - **Root Directory**: `galileo_platform/backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Click "Create Web Service"
6. Wait for the deployment to complete
7. Copy the service URL (e.g., `https://galileo-api.onrender.com`)

## Step 2: Deploy the Frontend

1. Go back to Render Dashboard
2. Click "New +" → "Web Service"
3. Connect the same repository
4. Configure the service:
   - **Name**: `galileo-frontend`
   - **Root Directory**: `galileo_platform`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   - Click "Environment" tab
   - Add variable: `NEXT_PUBLIC_API_URL` = `[your-backend-url-from-step-1]`
   - Add variable: `PORT` = `3000`
6. Click "Create Web Service"
7. Wait for deployment to complete

## Step 3: Access Your Application

Once both services are deployed:
- Frontend: `https://galileo-frontend.onrender.com`
- Backend API Docs: `https://galileo-api.onrender.com/docs`

## Alternative: One-Click Deploy

You can also use the render.yaml blueprint file:

1. In Render Dashboard, click "New +" → "Blueprint"
2. Connect your repository
3. Select the `galileo_platform/render.yaml` file
4. Click "Apply"
5. This will create both services automatically

## Troubleshooting

### Frontend can't connect to backend
- Make sure the `NEXT_PUBLIC_API_URL` environment variable is set correctly
- Check that CORS is enabled in the backend (it is by default)

### Build failures
- Check the build logs in Render dashboard
- Make sure all dependencies are listed in package.json and requirements.txt

### Slow initial load
- Render free tier services sleep after 15 minutes of inactivity
- First request will take ~30 seconds to wake up
- Consider upgrading to paid tier for always-on services

## Environment Variables Reference

### Backend (Optional)
- `DATABASE_URL`: PostgreSQL connection string (if using database)
- `SECRET_KEY`: JWT secret key for authentication
- `CORS_ORIGINS`: Allowed CORS origins (default: "*")

### Frontend (Required)
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `PORT`: Port for the frontend service (default: 3000)

## Support

For issues specific to:
- Render deployment: Check [Render docs](https://render.com/docs)
- GALILEO platform: Open an issue in the GitHub repository