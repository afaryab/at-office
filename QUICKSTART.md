# Quick Start Guide

Get up and running with At Office in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies (1 minute)
```bash
npm install
```

### 2. Start the App (30 seconds)
```bash
npm start
```

Then press:
- `w` for web
- `a` for Android (requires Android Studio)
- `i` for iOS (requires macOS and Xcode)

### 3. Test Without Keycloak (2 minutes)

For quick testing without setting up Keycloak, modify the login method in `src/services/authService.ts`:

```typescript
async login(username: string, password: string): Promise<AuthTokens> {
  // TEMPORARY: Mock for testing
  if (username && password) {
    const mockTokens = {
      accessToken: 'mock-access-token',
      refreshToken: 'mock-refresh-token',
      idToken: 'mock-id-token',
    };
    await this.saveTokens(mockTokens);
    
    // Create mock user
    const mockUser: User = {
      id: `user-${Date.now()}`,
      username: username,
      email: `${username}@example.com`,
      name: username,
    };
    await this.saveUser(mockUser);
    
    return mockTokens;
  }
  throw new Error('Invalid credentials');
}
```

Now you can login with any username/password!

## 📱 Test the App

1. **Login**: Enter any username and password
2. **Check-in**: Click the green "Check In" button
3. **View Time**: See your check-in time displayed
4. **Navigate**: Open the menu (☰) and explore Dashboard and Profile
5. **Check-out**: Click "Check Out" when done
6. **View History**: Go to Dashboard to see your records

## 🔐 Enable Biometric (Optional)

**On Physical Device:**
1. Go to Profile screen
2. Toggle "Biometric Login"
3. Authenticate with fingerprint/face
4. Logout and login with biometrics!

**Note:** Biometric won't work in web browser or some simulators.

## 🛠️ Common Commands

```bash
# Start development server
npm start

# Run on specific platform
npm run web
npm run android
npm run ios

# Check for errors
npx tsc --noEmit

# Build for production
eas build --platform android
```

## 📚 Next Steps

### For Full Production Setup:

1. **Set up Keycloak** (30 minutes)
   - Read [KEYCLOAK_SETUP.md](./KEYCLOAK_SETUP.md)
   - Configure your server
   - Update credentials in `src/services/authService.ts`

2. **Configure Build** (15 minutes)
   - Install EAS CLI: `npm install -g eas-cli`
   - Login: `eas login`
   - Configure: `eas build:configure`

3. **Customize App** (varies)
   - Change app name in `app.json`
   - Update bundle identifiers
   - Customize colors and styling

## 🆘 Troubleshooting

### App won't start?
```bash
rm -rf node_modules
npm install
npm start
```

### Metro bundler issues?
```bash
npx expo start --clear
```

### Biometric not working?
- Use a physical device
- Ensure biometric is set up on device
- Check app has required permissions

## 💡 Tips

- Press `r` in terminal to reload the app
- Shake device to open developer menu
- Use `console.log()` for debugging
- Check terminal for error messages

## 🎯 Key Features to Test

- ✅ Login/Signup screens
- ✅ Check-in button appears when not checked in
- ✅ Last check-in time displays when checked in
- ✅ Sidebar navigation works
- ✅ Dashboard shows history
- ✅ Profile displays user info
- ✅ Biometric toggle in Profile
- ✅ Logout clears session

## 📖 Full Documentation

- [README.md](./README.md) - Complete documentation
- [TESTING.md](./TESTING.md) - Testing guide
- [CONTRIBUTING.md](./CONTRIBUTING.md) - How to contribute
- [KEYCLOAK_SETUP.md](./KEYCLOAK_SETUP.md) - Keycloak configuration

## 🎉 You're Ready!

You now have a working attendance tracking app with biometric support!

---

Need help? Open an issue on GitHub or check the documentation.
