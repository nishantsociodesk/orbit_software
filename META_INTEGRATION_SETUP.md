# Meta (Facebook/Instagram) Integration Setup Guide

This guide will help you set up Meta Ads integration in the Orbit 360 platform.

## Overview

The Meta integration allows you to:
- Connect your Meta Business account via OAuth
- View and manage multiple ad accounts
- Create, pause, and resume advertising campaigns
- Monitor campaign performance with real-time insights
- Track metrics like impressions, clicks, spend, CTR, and CPC

## Prerequisites

1. A Meta Business account
2. Access to Meta Business Manager
3. A Meta App with the following permissions:
   - `ads_read`
   - `ads_management`
   - `business_management`

## Step 1: Create a Meta App

1. Go to [Meta for Developers](https://developers.facebook.com/)
2. Click on "My Apps" → "Create App"
3. Select "Business" as the app type
4. Fill in the app details:
   - **App Name**: Orbit 360 Integration (or your choice)
   - **App Contact Email**: Your email
5. Click "Create App"

## Step 2: Configure Meta App Settings

### Add Facebook Login Product
1. In your app dashboard, click "Add Product"
2. Find "Facebook Login" and click "Set Up"
3. Select "Web" as the platform

### Configure OAuth Settings
1. Go to "Facebook Login" → "Settings"
2. Add your OAuth Redirect URI:
   ```
   http://localhost:5000/auth/meta/callback
   ```
   For production, use:
   ```
   https://your-domain.com/auth/meta/callback
   ```

### Add Marketing API
1. In your app dashboard, click "Add Product"
2. Find "Marketing API" and click "Set Up"
3. Accept the terms and conditions

### Get App Credentials
1. Go to "Settings" → "Basic"
2. Copy your **App ID**
3. Copy your **App Secret** (click "Show")

## Step 3: Configure Backend Environment

1. Navigate to the backend folder:
   ```bash
   cd D:\orbit\backend
   ```

2. Create a `.env` file (copy from `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Update the following Meta-related variables in `.env`:
   ```env
   META_APP_ID="your-app-id-here"
   META_APP_SECRET="your-app-secret-here"
   META_REDIRECT_URI="http://localhost:5000/auth/meta/callback"
   META_API_VERSION="v19.0"
   META_TOKEN_ENC_KEY="a-secure-random-string-at-least-32-characters-long"
   ```

   > **Security Note**: Generate a secure encryption key for `META_TOKEN_ENC_KEY`:
   > ```bash
   > node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   > ```

## Step 4: Configure Frontend Environment

1. Navigate to the frontend folder:
   ```bash
   cd D:\orbit\software\Orbit-360
   ```

2. Create a `.env.local` file:
   ```bash
   cp .env.local.example .env.local
   ```

3. Update the API URL:
   ```env
   NEXT_PUBLIC_API_URL="http://localhost:5000"
   ```

## Step 5: Install Dependencies

### Backend
```bash
cd D:\orbit\backend
npm install
```

### Frontend
```bash
cd D:\orbit\software\Orbit-360
npm install
```

## Step 6: Database Setup

The Meta integration requires user authentication. Make sure your database is set up:

```bash
cd D:\orbit\backend
npx prisma migrate dev
npm run seed
```

## Step 7: Start the Servers

### Start Backend Server
```bash
cd D:\orbit\backend
npm start
```
Backend will run on: http://localhost:5000

### Start Frontend Server
```bash
cd D:\orbit\software\Orbit-360
npm run dev
```
Frontend will run on: http://localhost:3000

## Step 8: Test the Integration

1. Open your browser and navigate to: http://localhost:3000
2. Log in with your user credentials
3. Navigate to the **Integrations** page
4. Click **Connect Meta Account**
5. You'll be redirected to Facebook for authorization
6. Grant the necessary permissions
7. You'll be redirected back to Orbit 360

## Using the Meta Integration

### View Ad Accounts
1. After connecting, go to the **Ad Accounts** tab
2. Click **Refresh Accounts** to load your ad accounts
3. Click on an account to select it

### Manage Campaigns
1. Go to the **Campaigns** tab
2. Select an ad account from the dropdown
3. View all campaigns for that account
4. Use the **Pause** or **Resume** buttons to control campaigns

### Create New Campaign
1. Go to the **Create Campaign** tab
2. Fill in the campaign details:
   - **Ad Account**: Select your ad account
   - **Campaign Name**: Enter a name
   - **Objective**: Choose campaign objective
   - **Daily Budget**: Enter in cents (e.g., 5000 = $50.00)
   - **Initial Status**: Paused or Active
3. Click **Create Campaign**

### View Insights
1. Go to the **Insights** tab
2. Select an ad account
3. View performance metrics:
   - Impressions
   - Clicks
   - Spend
   - CTR (Click-Through Rate)
   - CPC (Cost Per Click)

## API Endpoints

The following API endpoints are available:

### Authentication
- `GET /auth/meta/login` - Initiate OAuth flow
- `GET /auth/meta/callback` - OAuth callback handler

### Meta API (Requires Authentication)
- `GET /api/meta/status` - Check connection status
- `GET /api/meta/ad-accounts` - List ad accounts
- `GET /api/meta/campaigns?adAccountId={id}` - List campaigns
- `POST /api/meta/campaigns` - Create campaign
- `PATCH /api/meta/campaigns/:id/pause` - Pause campaign
- `PATCH /api/meta/campaigns/:id/resume` - Resume campaign
- `GET /api/meta/insights?adAccountId={id}` - Get insights

## Troubleshooting

### "Meta account not connected" error
- Ensure you've completed the OAuth flow
- Check if your token has expired (tokens expire after some time)
- Re-authenticate by clicking "Connect Meta Account" again

### "No permission" error
- Verify you have advertiser access to the ad account
- Check that you granted all required permissions during OAuth
- Ensure your Meta app has the necessary permissions enabled

### "Invalid token" error
- Your access token may have expired
- Re-authenticate by connecting Meta again
- Check that `META_TOKEN_ENC_KEY` hasn't changed

### OAuth redirect not working
- Verify `META_REDIRECT_URI` matches exactly in:
  - Your `.env` file
  - Meta App settings (OAuth Redirect URIs)
- Check that your backend server is running

### CORS errors
- Ensure the backend `FRONTEND_URL` in `.env` matches your frontend URL
- Check that CORS is properly configured in `server.js`

## Security Best Practices

1. **Never commit `.env` files** to version control
2. Use strong, unique values for:
   - `JWT_SECRET`
   - `META_TOKEN_ENC_KEY`
3. In production:
   - Use HTTPS for all endpoints
   - Set up proper environment variables
   - Use secure database connections
   - Enable rate limiting (already configured)
4. Regularly rotate your Meta App Secret
5. Monitor API usage in Meta Business Manager

## Production Deployment

When deploying to production:

1. Update environment variables:
   ```env
   NODE_ENV=production
   FRONTEND_URL="https://your-production-domain.com"
   META_REDIRECT_URI="https://your-api-domain.com/auth/meta/callback"
   ```

2. Add production OAuth redirect URI in Meta App settings

3. Use environment variables provided by your hosting platform (Vercel, Heroku, etc.)

4. Ensure all secrets are securely stored

## Support

For issues or questions:
- Check Meta's [Marketing API Documentation](https://developers.facebook.com/docs/marketing-apis)
- Review [Meta Business Manager Help](https://www.facebook.com/business/help)
- Check application logs for detailed error messages

## Features Coming Soon

- Ad set management
- Ad creative management
- Advanced audience targeting
- Automated reporting
- Budget optimization suggestions
- Multi-account campaign management
