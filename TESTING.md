# At Office - Testing Guide

This guide helps you test the application features.

## Prerequisites for Testing

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Keycloak** (Optional for basic testing)
   - For full authentication testing, set up a Keycloak server
   - For basic UI testing, you can skip this step

## Testing Features

### 1. Run the App

```bash
# Start the development server
npm start

# For web testing
npm run web

# For Android (requires Android Studio/device)
npm run android

# For iOS (requires macOS and Xcode)
npm run ios
```

### 2. Login/Signup Flow

**Test Scenario: Basic Navigation**
- Open the app
- View the login screen
- Click "Don't have an account? Sign up"
- View the signup screen
- Click "Already have an account? Login" to return

**Test Scenario: Authentication (with Keycloak configured)**
- Enter valid credentials
- Click "Login"
- Should navigate to Home screen

### 3. Home Screen - Check-in/out

**Test Scenario: Check-in**
- After login, view the Home screen
- When not checked in, see "Check In" button
- Click "Check In"
- View confirmation message
- See last check-in time displayed

**Test Scenario: Check-out**
- When checked in, see "Check Out" button
- Click "Check Out"
- Confirm the action in the alert
- View confirmation message
- Check-in button should reappear

### 4. Biometric Authentication

**Test Scenario: Enable Biometric** (requires physical device or simulator with biometric support)
- Go to Profile screen
- Toggle "Biometric Login" switch
- Complete biometric authentication
- Logout
- On login screen, see your username in biometric section
- Click on your username to login with biometrics

**Test Scenario: Multi-User Biometric**
- Login as User 1 and enable biometric
- Logout
- Login as User 2 and enable biometric
- Logout
- Both users should appear in the biometric login section

### 5. Navigation - Sidebar

**Test Scenario: Sidebar Navigation**
- Open the hamburger menu (three lines icon)
- View menu items: Home, Dashboard, Profile
- Navigate to each screen
- Verify each screen loads correctly

### 6. Dashboard

**Test Scenario: Attendance History**
- Navigate to Dashboard
- View list of check-in records
- Verify records show:
  - Check-in time
  - Check-out time (if completed)
  - Duration
  - Status badge (Active/Complete)

### 7. Profile

**Test Scenario: View Profile**
- Navigate to Profile
- View user information:
  - Username
  - Email
  - Name (if available)

**Test Scenario: Logout**
- Click "Logout" button
- Confirm the action
- Verify navigation to login screen
- Verify authentication state cleared

## Testing Without Keycloak

If you don't have Keycloak configured, you can test the UI by:

1. **Mock Authentication**: Modify `src/services/authService.ts` to use mock data
2. **Bypass Login**: Set `isAuthenticated` to `true` in `App.tsx`

Example mock in authService.ts:
```typescript
async login(username: string, password: string): Promise<AuthTokens> {
  // Mock response
  return {
    accessToken: 'mock-token',
    refreshToken: 'mock-refresh',
    idToken: 'mock-id',
  };
}

async getUserInfo(accessToken: string): Promise<User> {
  // Mock user
  return {
    id: 'mock-user-id',
    username: 'testuser',
    email: 'test@example.com',
    name: 'Test User',
  };
}
```

## Automated Testing

### TypeScript Type Checking
```bash
npx tsc --noEmit
```

### Build Testing
```bash
# Test Android build configuration
eas build --platform android --profile preview --local

# Test web build
npm run web
```

## Expected Behavior

### ✅ Success Cases
- Login redirects to Home screen
- Check-in creates a new record
- Check-out updates the current record
- Biometric authentication works on supported devices
- Navigation between screens is smooth
- Data persists across app restarts

### ⚠️ Error Cases to Test
- Invalid login credentials show error
- Empty form fields show validation errors
- Network errors show appropriate messages
- Biometric failure allows password fallback

## Performance Testing

- App should load within 2-3 seconds
- Navigation transitions should be smooth
- Check-in/out operations should be instant
- Data should persist even after app closure

## Device Testing

### Recommended Test Devices
- **Android**: Physical device with fingerprint sensor
- **iOS**: iPhone with Face ID/Touch ID
- **Web**: Modern browser (Chrome, Safari, Firefox)

### Biometric Testing Requirements
- Device must have biometric hardware
- Biometric authentication must be set up
- At least one fingerprint/face enrolled

## Security Testing

- Verify tokens are stored securely
- Check that passwords are not logged
- Ensure biometric data is handled properly
- Verify logout clears all sensitive data

## Troubleshooting Tests

### App won't start
```bash
rm -rf node_modules
npm install
npm start
```

### TypeScript errors
```bash
npx tsc --noEmit
```

### Build errors
```bash
expo doctor
```

### Biometric not working
- Check device has biometric capability
- Verify biometric is set up on device
- Check app permissions

## CI/CD Testing

The GitHub Actions workflow will:
1. Install dependencies
2. Run TypeScript checks
3. Build Android APK
4. Create release artifacts

Monitor builds at: https://github.com/afaryab/at-office/actions

## Reporting Issues

When reporting bugs, include:
- Device type and OS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable
- Error messages from console

## Next Steps

After basic testing:
1. Configure production Keycloak server
2. Test with multiple users
3. Verify biometric on various devices
4. Test offline functionality
5. Performance profiling
6. Security audit
