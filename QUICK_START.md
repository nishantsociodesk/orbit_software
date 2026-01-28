# Orbit 360 - Meta Integration Quick Start Guide

This guide will get you up and running with the Meta integration in under 10 minutes.

## Prerequisites

- Node.js 18+ installed
- PostgreSQL database running
- MongoDB database running
- Meta Developer account

## Step 1: Backend Setup (2 minutes)

### 1.1 Navigate to backend folder
```bash
cd D:\orbit\backend
```

### 1.2 Install dependencies (if not already done)
```bash
npm install
```

### 1.3 Create .env file
Copy the following into a new `.env` file:

```env
NODE_ENV=development
PORT=5000

# Database URLs - UPDATE THESE
DATABASE_URL="postgresql://user:password@localhost:5432/orbit360?schema=public"
MONGODB_URI="mongodb://localhost:27017/orbit360"

# JWT Configuration
JWT_SECRET="your-secret-key-change-this-in-production"
JWT_EXPIRE="7d"

# Frontend URL
FRONTEND_URL="http://localhost:3000"

# Meta Configuration - GET FROM META DEVELOPER CONSOLE
META_APP_ID="your-meta-app-id"
META_APP_SECRET="your-meta-app-secret"
META_REDIRECT_URI="http://localhost:5000/auth/meta/callback"
META_API_VERSION="v19.0"
META_TOKEN_ENC_KEY="generate-a-secure-32-char-key"

# Default Admin
DEFAULT_ADMIN_EMAIL="admin@orbit360.com"
DEFAULT_ADMIN_PASSWORD="change-this-password"
```

### 1.4 Generate encryption key
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output and use it for `META_TOKEN_ENC_KEY`

### 1.5 Run database migrations
```bash
npx prisma migrate dev --name add_meta_fields
npx prisma generate
npm run seed
```

### 1.6 Start backend server
```bash
npm run dev
```

Backend should now be running on http://localhost:5000

## Step 2: Frontend Setup (2 minutes)

### 2.1 Navigate to frontend folder
```bash
cd D:\orbit\software\Orbit-360
```

### 2.2 Install dependencies (if not already done)
```bash
npm install
```

### 2.3 Create .env.local file
```env
NEXT_PUBLIC_API_URL="http://localhost:5000"
```

### 2.4 Start frontend server
```bash
npm run dev
```

Frontend should now be running on http://localhost:3000

## Step 3: Meta App Setup (3 minutes)

### 3.1 Go to Meta for Developers
Visit: https://developers.facebook.com/

### 3.2 Create a new app
1. Click "My Apps" → "Create App"
2. Select "Business" type
3. Fill in app details
4. Click "Create App"

### 3.3 Add Facebook Login
1. In app dashboard, click "Add Product"
2. Find "Facebook Login" → "Set Up"
3. Select "Web" platform
4. Go to Settings
5. Add OAuth Redirect URI:
   ```
   http://localhost:5000/auth/meta/callback
   ```

### 3.4 Add Marketing API
1. In app dashboard, click "Add Product"
2. Find "Marketing API" → "Set Up"
3. Accept terms

### 3.5 Get credentials
1. Go to "Settings" → "Basic"
2. Copy your **App ID**
3. Copy your **App Secret**
4. Update your backend `.env` file with these values

### 3.6 Configure permissions
1. Go to "App Review" → "Permissions and Features"
2. Request these permissions:
   - `ads_read`
   - `ads_management`
   - `business_management`

## Step 4: Test the Integration (3 minutes)

### 4.1 Access the application
1. Open http://localhost:3000 in your browser
2. Log in with admin credentials:
   - Email: admin@orbit360.com
   - Password: (the one you set in .env)

### 4.2 Navigate to Integrations
1. Click on "Integrations" in the sidebar
2. You should see the Meta Ads card

### 4.3 Connect Meta account
1. Click "Connect Meta Account"
2. You'll be redirected to Facebook
3. Log in and grant permissions
4. You'll be redirected back to Orbit 360

### 4.4 Test features
1. **Ad Accounts Tab**: Click "Refresh Accounts" to load your ad accounts
2. **Campaigns Tab**: Select an account to view campaigns
3. **Create Campaign Tab**: Try creating a test campaign
4. **Insights Tab**: View performance metrics

## Troubleshooting

### Backend won't start
```bash
# Check if port 5000 is in use
netstat -ano | findstr :5000

# Check logs for specific errors
npm run dev
```

### Frontend won't start
```bash
# Check if port 3000 is in use
netstat -ano | findstr :3000

# Clear cache and reinstall
rm -rf .next node_modules
npm install
npm run dev
```

### Database connection errors
```bash
# Test PostgreSQL connection
psql -U your_user -d orbit360

# Test MongoDB connection
mongosh mongodb://localhost:27017/orbit360

# If databases don't exist, create them
createdb orbit360
mongosh
> use orbit360
```

### OAuth redirect fails
- Verify `META_REDIRECT_URI` in `.env` exactly matches the one in Meta app settings
- Ensure backend server is running and accessible
- Check Meta app is in "Development" mode (allows localhost)

### "Meta account not connected" error
- Complete the OAuth flow first
- Check if token expired (reconnect if needed)
- Verify `META_TOKEN_ENC_KEY` is set

### CORS errors
- Verify `FRONTEND_URL` in backend `.env` is correct
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Restart both servers after environment changes

## Verification Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Can log in to the application
- [ ] Can see Integrations page
- [ ] Can click "Connect Meta Account"
- [ ] OAuth flow completes successfully
- [ ] Can see ad accounts after connecting
- [ ] Can view campaigns for an account
- [ ] Can create a test campaign
- [ ] Can view insights

## Next Steps

Once everything is working:

1. **Configure production environment**
   - See `META_INTEGRATION_SETUP.md` for production deployment

2. **Customize the integration**
   - See `README_META_INTEGRATION.md` for customization options

3. **Add more features**
   - Ad set management
   - Creative uploads
   - Advanced analytics

## Getting Help

If you encounter issues:

1. Check the logs:
   - Backend: Console output where you ran `npm run dev`
   - Frontend: Browser console (F12)
   
2. Review the documentation:
   - `META_INTEGRATION_SETUP.md` - Detailed setup guide
   - `README_META_INTEGRATION.md` - Frontend documentation

3. Meta API Documentation:
   - https://developers.facebook.com/docs/marketing-apis

## Environment Variables Quick Reference

### Backend (.env)
```
DATABASE_URL          - PostgreSQL connection string
MONGODB_URI           - MongoDB connection string
JWT_SECRET            - JWT signing key
META_APP_ID           - From Meta Developer Console
META_APP_SECRET       - From Meta Developer Console
META_REDIRECT_URI     - OAuth callback URL
META_TOKEN_ENC_KEY    - 32+ char encryption key
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL   - Backend API URL
```

## Common Commands

### Backend
```bash
# Start development server
npm run dev

# Run migrations
npx prisma migrate dev

# Seed database
npm run seed

# Generate Prisma client
npx prisma generate
```

### Frontend
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

---

**Success!** You should now have a fully functional Meta integration in Orbit 360.

For detailed documentation, see:
- Backend API: http://localhost:5000/health
- Frontend App: http://localhost:3000
- Meta Developer: https://developers.facebook.com/apps/
