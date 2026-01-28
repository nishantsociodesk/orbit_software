# Meta Integration - Deployment Checklist

Use this checklist to ensure your Meta integration is properly set up and ready for use.

## 📋 Pre-Deployment Checklist

### Backend Setup
- [ ] Node.js 18+ installed
- [ ] PostgreSQL database running
- [ ] MongoDB database running
- [ ] Backend dependencies installed (`npm install` in `backend/`)
- [ ] `.env` file created and configured
- [ ] All required environment variables set:
  - [ ] `DATABASE_URL`
  - [ ] `MONGODB_URI`
  - [ ] `JWT_SECRET`
  - [ ] `META_APP_ID`
  - [ ] `META_APP_SECRET`
  - [ ] `META_REDIRECT_URI`
  - [ ] `META_API_VERSION`
  - [ ] `META_TOKEN_ENC_KEY`
  - [ ] `FRONTEND_URL`

### Frontend Setup
- [ ] Frontend dependencies installed (`npm install` in `software/Orbit-360/`)
- [ ] `.env.local` file created
- [ ] `NEXT_PUBLIC_API_URL` configured

### Meta Developer Setup
- [ ] Meta Developer account created
- [ ] Meta app created
- [ ] Facebook Login product added
- [ ] Marketing API product added
- [ ] OAuth Redirect URI configured
- [ ] App ID and Secret copied to backend `.env`
- [ ] Required permissions requested:
  - [ ] `ads_read`
  - [ ] `ads_management`
  - [ ] `business_management`

### Database Setup
- [ ] Prisma schema updated with Meta fields
- [ ] Database migration created and applied
- [ ] Prisma client generated
- [ ] Seed data created (admin user)

## 🚀 Deployment Steps

### Step 1: Database Migration
```bash
cd D:\orbit\backend
node migrate-meta.js
```
- [ ] Migration script completed successfully
- [ ] No errors in console output
- [ ] Database schema updated

**Alternative (if script fails):**
```bash
npx prisma migrate dev --name add_meta_fields
npx prisma generate
```

### Step 2: Verify Backend
```bash
cd D:\orbit\backend
npm run dev
```
- [ ] Server starts without errors
- [ ] Console shows "Server running on port 5000"
- [ ] MongoDB connection successful
- [ ] Prisma connection successful

**Test endpoints:**
- [ ] `http://localhost:5000/health` returns `{"status":"ok"}`
- [ ] Can access auth endpoints

### Step 3: Verify Frontend
```bash
cd D:\orbit\software\Orbit-360
npm run dev
```
- [ ] Server starts without errors
- [ ] Console shows "Ready on http://localhost:3000"
- [ ] No compilation errors
- [ ] No TypeScript errors

**Test frontend:**
- [ ] `http://localhost:3000` loads successfully
- [ ] Can navigate to login page
- [ ] UI renders correctly

## ✅ Integration Testing

### 1. Authentication Flow
- [ ] Can log in with admin credentials
- [ ] JWT token is generated
- [ ] Token is stored correctly
- [ ] Can access authenticated pages

### 2. Integrations Page
- [ ] Navigate to Integrations page
- [ ] Meta integration card displays
- [ ] "Connect Meta Account" button visible
- [ ] Page loads without errors

### 3. OAuth Connection
- [ ] Click "Connect Meta Account"
- [ ] Redirected to Facebook OAuth
- [ ] Meta login page displays
- [ ] Can grant permissions
- [ ] Redirected back to application
- [ ] Connection status shows "Connected"
- [ ] No errors in console

### 4. Ad Accounts Tab
- [ ] "Ad Accounts" tab is visible
- [ ] Click "Refresh Accounts"
- [ ] Ad accounts load successfully
- [ ] Account names display correctly
- [ ] Permission badges show correct status
- [ ] Can click to select an account
- [ ] Selected account is highlighted

### 5. Campaigns Tab
- [ ] "Campaigns" tab is visible
- [ ] Can select ad account from dropdown
- [ ] Campaigns load for selected account
- [ ] Campaign table displays:
  - [ ] Campaign names
  - [ ] Status badges
  - [ ] Objectives
  - [ ] Daily budgets
- [ ] Can click "Pause" on active campaigns
- [ ] Can click "Resume" on paused campaigns
- [ ] Actions trigger loading states
- [ ] Success toasts appear
- [ ] Campaign list updates after actions

### 6. Create Campaign Tab
- [ ] "Create Campaign" tab is visible
- [ ] All form fields display:
  - [ ] Ad Account selector
  - [ ] Campaign name input
  - [ ] Objective selector
  - [ ] Budget input
  - [ ] Status selector
- [ ] Can fill in all fields
- [ ] Form validation works
- [ ] "Create Campaign" button enabled when valid
- [ ] Campaign creation succeeds
- [ ] Success toast appears
- [ ] New campaign appears in campaigns list
- [ ] Form resets after creation

### 7. Insights Tab
- [ ] "Insights" tab is visible
- [ ] Can select ad account
- [ ] Insights load for selected account
- [ ] All metrics display:
  - [ ] Impressions
  - [ ] Clicks
  - [ ] Spend
  - [ ] CTR
  - [ ] CPC
- [ ] Numbers are formatted correctly
- [ ] Cards display properly

## 🔍 Error Handling Tests

### Token Expiration
- [ ] Wait for token to expire (or manually expire in DB)
- [ ] Try to fetch data
- [ ] Error message displays
- [ ] User prompted to reconnect
- [ ] Can reconnect successfully

### Permission Errors
- [ ] Try to access ad account without permissions
- [ ] "NO_PERMISSION" status displays
- [ ] Cannot view campaigns for restricted account
- [ ] Error message is clear

### Network Errors
- [ ] Stop backend server
- [ ] Try to perform action in frontend
- [ ] Error toast appears
- [ ] User-friendly error message shown
- [ ] No crashes or unhandled errors

### Validation Errors
- [ ] Try to create campaign with empty name
- [ ] Validation error displays
- [ ] Cannot submit invalid form
- [ ] Error messages are clear

## 📱 UI/UX Testing

### Responsive Design
- [ ] Desktop view (1920x1080)
- [ ] Tablet view (768x1024)
- [ ] Mobile view (375x667)
- [ ] All elements are accessible
- [ ] No horizontal scrolling
- [ ] Buttons are clickable
- [ ] Text is readable

### Loading States
- [ ] Loading indicators show during API calls
- [ ] Buttons disable during operations
- [ ] Skeleton loaders (if implemented)
- [ ] Smooth transitions

### Visual Design
- [ ] Colors match brand
- [ ] Spacing is consistent
- [ ] Typography is clear
- [ ] Icons display correctly
- [ ] Badges have proper colors
- [ ] Cards have proper shadows

## 🔐 Security Testing

### Backend Security
- [ ] All Meta endpoints require authentication
- [ ] Invalid tokens are rejected
- [ ] Expired tokens are rejected
- [ ] Rate limiting is active
- [ ] CORS is properly configured
- [ ] Tokens are encrypted in database
- [ ] No sensitive data in logs

### Frontend Security
- [ ] API URL from environment variable
- [ ] No hardcoded credentials
- [ ] No sensitive data in localStorage (except token)
- [ ] XSS protection in place
- [ ] CSRF protection (if applicable)

## 📊 Performance Testing

### Load Times
- [ ] Integrations page loads in < 2 seconds
- [ ] Ad accounts load in < 3 seconds
- [ ] Campaigns load in < 3 seconds
- [ ] Insights load in < 3 seconds
- [ ] No unnecessary re-renders

### API Response Times
- [ ] `/api/meta/status` < 500ms
- [ ] `/api/meta/ad-accounts` < 2s
- [ ] `/api/meta/campaigns` < 2s
- [ ] `/api/meta/insights` < 3s

### Memory Usage
- [ ] No memory leaks in browser
- [ ] No memory leaks in Node.js
- [ ] Proper cleanup on unmount

## 📝 Documentation Review

### User Documentation
- [ ] QUICK_START.md is accurate
- [ ] META_INTEGRATION_SETUP.md is complete
- [ ] README_META_INTEGRATION.md is up to date
- [ ] INTEGRATION_SUMMARY.md reflects current state
- [ ] All links work
- [ ] Screenshots (if any) are current

### Code Documentation
- [ ] Code comments are clear
- [ ] API endpoints documented
- [ ] Function purposes explained
- [ ] Complex logic explained

## 🚀 Production Readiness

### Environment Configuration
- [ ] Production `.env` configured
- [ ] Production database URLs set
- [ ] Production Meta app created
- [ ] Production OAuth redirect URI configured
- [ ] Production secrets are secure
- [ ] No development credentials in production

### Deployment
- [ ] Backend deployed to hosting platform
- [ ] Frontend deployed to hosting platform
- [ ] Environment variables set on hosting
- [ ] Database migrations run on production
- [ ] SSL certificates configured
- [ ] Domain names configured
- [ ] CORS allows production domains

### Monitoring
- [ ] Error logging configured
- [ ] Performance monitoring set up
- [ ] Usage analytics (if applicable)
- [ ] Alert system for errors
- [ ] Backup strategy in place

## ✅ Final Checks

### Functionality
- [ ] All features work as expected
- [ ] No console errors
- [ ] No TypeScript errors
- [ ] No linter warnings
- [ ] All tests pass (if tests exist)

### Documentation
- [ ] README files updated
- [ ] API documentation current
- [ ] Changelog updated
- [ ] Version numbers updated

### Security
- [ ] Security scan completed
- [ ] Dependencies updated
- [ ] No known vulnerabilities
- [ ] Secrets properly managed

### Performance
- [ ] Performance benchmarks met
- [ ] No memory leaks
- [ ] API response times acceptable
- [ ] Frontend load times acceptable

## 📞 Post-Deployment

### User Training
- [ ] Team trained on Meta integration
- [ ] Documentation shared
- [ ] Support channels established
- [ ] FAQs created

### Monitoring
- [ ] First 24 hours: Check logs hourly
- [ ] First week: Check logs daily
- [ ] Monitor error rates
- [ ] Monitor API usage
- [ ] Monitor Meta API quotas

### Support
- [ ] Support team briefed
- [ ] Known issues documented
- [ ] Escalation process defined
- [ ] Feedback mechanism in place

## 🎉 Success Criteria

The deployment is successful when:
- ✅ All checklist items are completed
- ✅ No critical errors in production
- ✅ Users can connect Meta accounts
- ✅ Users can manage campaigns
- ✅ Users can view insights
- ✅ Performance meets expectations
- ✅ Security requirements met
- ✅ Documentation is complete
- ✅ Team is trained
- ✅ Monitoring is active

---

## 📊 Tracking

**Deployment Date**: _______________

**Deployed By**: _______________

**Backend Version**: _______________

**Frontend Version**: _______________

**Meta API Version**: _______________

**Notes**:
_______________________________________________
_______________________________________________
_______________________________________________

---

## ⚠️ Rollback Plan

If critical issues occur:

1. **Backend Rollback**:
   ```bash
   git checkout [previous-commit]
   npm install
   npm run dev
   ```

2. **Database Rollback**:
   ```bash
   npx prisma migrate reset
   ```

3. **Frontend Rollback**:
   ```bash
   git checkout [previous-commit]
   npm install
   npm run build
   ```

4. **Meta App**:
   - Disable OAuth redirect URIs
   - Revoke app permissions if needed

---

**Sign-off**:

Backend Lead: _______________ Date: ___________

Frontend Lead: _______________ Date: ___________

QA Lead: _______________ Date: ___________

DevOps Lead: _______________ Date: ___________

Product Owner: _______________ Date: ___________
