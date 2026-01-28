# Data Troubleshooting Guide

## Current Status

✅ **Completed**:
- Currency formatting changed from USD ($) to INR (₹)
- Backend now requests campaign insights including spend, impressions, clicks, purchases, revenue
- Frontend properly parses nested insights data from Meta API
- Debug logging added to track what Meta returns

⚠️ **Issue**: All metrics showing zero (₹0.00, 0 impressions, etc.)

## Why You Might See Zeros

### 1. **Campaigns Haven't Run Yet** (Most Common)
If your Meta campaigns:
- Are newly created
- Haven't started running
- Are paused/inactive
- Have no budget allocated

**Solution**: 
- Activate campaigns in Meta Ads Manager
- Ensure they have budget
- Wait for them to generate impressions

### 2. **No Data in Last 30 Days**
The backend fetches data for `last_30d` by default. If your campaigns ran earlier:

**Solution**: 
Edit `backend/src/services/metaApiService.js`:
```javascript
insights.date_preset(last_90d)  // Change from last_30d to last_90d
```

### 3. **Ad Account Has No Active Campaigns**
Test/demo ad accounts often have zero data.

**Solution**: 
- Use a production ad account with real campaigns
- Or create test campaigns with small budgets ($1-5)

### 4. **Currency Mismatch**
If your Meta ad account is in USD but you're viewing in INR:
- Meta returns USD values
- No automatic conversion happens
- $0.01 USD shows as ₹0.01 (incorrect)

**Solution**: Add currency conversion in `Orbit-360/lib/dataService.ts`:
```typescript
const USD_TO_INR = 83; // Update with current rate
const spend = parseFloat(insightsData.spend || 0) * USD_TO_INR;
```

## How to Debug

### Step 1: Check Meta Ads Manager
1. Go to https://business.facebook.com/adsmanager
2. Select your ad account
3. Verify campaigns have:
   - Status: ACTIVE
   - Impressions > 0
   - Spend > 0
4. Check the date range (last 30 days)

### Step 2: Check Backend Logs

**Restart backend**:
```powershell
cd D:\orbit\backend
npm start
```

**In your browser**:
1. Open Orbit-360 frontend
2. Go to Marketing > Campaigns
3. Select an ad account

**Check backend terminal for**:
```
=== META CAMPAIGNS RAW RESPONSE ===
{
  "data": [
    {
      "id": "123456",
      "name": "My Campaign",
      "status": "ACTIVE",
      "insights": {
        "data": [
          {
            "spend": "10.50",      ← Should have values here
            "impressions": "1250",
            "clicks": "45"
          }
        ]
      }
    }
  ]
}
=== END META RESPONSE ===
```

### Step 3: Check Browser Console

**In your browser** (Press F12):
1. Go to Console tab
2. Look for: `Raw campaigns from API:`
3. Check if data exists

### Step 4: Test Meta API Directly

Open this URL in your browser (replace placeholders):
```
https://graph.facebook.com/v21.0/act_YOUR_ACCOUNT_ID/campaigns?fields=id,name,status,insights.date_preset(last_30d){spend,impressions}&access_token=YOUR_TOKEN
```

Get your access token from MongoDB:
```javascript
// In MongoDB Compass or mongo shell
db.users.findOne({ email: "your@email.com" })
// Look at metaAccessToken field (it's encrypted)
```

## Changes Made

### Backend Changes

**File: `backend/src/services/metaApiService.js`**
- Updated `getCampaigns()` to request insights fields
- Added fields: `spend`, `impressions`, `clicks`, `actions`, `action_values`, `purchase_roas`

**File: `backend/src/controllers/metaController.js`**
- Added debug logging for campaigns and insights
- Expanded insights metrics to include revenue/purchase data

### Frontend Changes

**File: `Orbit-360/lib/currency.ts`** (NEW)
- Created INR currency formatter
- Formats numbers as ₹1,234.56

**File: `Orbit-360/lib/dataService.ts`**
- Updated `fetchCampaignsData()` to parse nested insights
- Extracts spend, revenue, purchases from Meta's nested structure
- Handles both `purchase` and `offsite_conversion.fb_pixel_purchase` action types

**File: `Orbit-360/app/marketing/campaigns/page.tsx`**
- Imported `formatCurrency` for INR display
- Updated all `$` displays to use `formatCurrency()`

**File: `Orbit-360/components/marketing-metrics-cards.tsx`**
- Updated to use `formatCurrency` and `formatCompactNumber`
- All metrics now show in INR format

## Next Steps

1. **Restart Backend**: 
   ```powershell
   cd D:\orbit\backend
   npm start
   ```

2. **Check Logs**: Look for the debug output when loading campaigns

3. **Share Debug Output**: If still showing zeros, share:
   - Backend terminal log (the `=== META CAMPAIGNS RAW RESPONSE ===` section)
   - Browser console log (the `Raw campaigns from API:` line)

4. **Verify in Meta**: Confirm your campaigns actually have data in Meta Ads Manager

## Expected Behavior After Fix

When campaigns have data, you should see:

```
Total Spend: ₹1,250.50
Total Revenue: ₹3,500.00
Total Purchases: 15
Impressions: 45.2K
```

Campaign table should show:
| Campaign | Status | Spend | Revenue | ROAS |
|----------|--------|-------|---------|------|
| Summer Sale | ACTIVE | ₹500.00 | ₹1,200.00 | 2.4x |
