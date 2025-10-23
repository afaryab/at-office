# At Office

A React Native mobile application for office attendance management with Keycloak authentication and biometric login support.

## Features

- 🔐 **Keycloak Authentication**: Secure login, signup, and user management via Keycloak
- ✅ **Check-in/Check-out**: Track attendance with timestamps
- 👆 **Biometric Login**: Support for Face ID, Touch ID, and fingerprint authentication
- 👥 **Multi-User Biometric**: Multiple users can use biometric login on the same device
- 📊 **Dashboard**: View attendance history and statistics
- 👤 **Profile Management**: View and manage user profile settings
- 🧭 **Sidebar Navigation**: Easy access to Home, Dashboard, and Profile
- 🚀 **Auto-Build**: Automatic APK and Windows app builds on push to main

## Prerequisites

- Node.js 18+ and npm
- Expo CLI
- EAS CLI (for building)
- A Keycloak server instance (see [KEYCLOAK_SETUP.md](./KEYCLOAK_SETUP.md))

## Installation

1. Clone the repository:
```bash
git clone https://github.com/afaryab/at-office.git
cd at-office
```

2. Install dependencies:
```bash
npm install
```

3. Configure Keycloak:
   - See [KEYCLOAK_SETUP.md](./KEYCLOAK_SETUP.md) for detailed instructions
   - Update the configuration in `src/services/authService.ts`

## Running the App

### Development Mode

```bash
# Start Expo development server
npm start

# Run on Android
npm run android

# Run on iOS (macOS only)
npm run ios

# Run on Web
npm run web
```

## Building for Production

### Android APK

```bash
# Install EAS CLI globally
npm install -g eas-cli

# Login to Expo
eas login

# Configure the project
eas build:configure

# Build APK
eas build --platform android --profile preview
```

### Windows App

For a Windows desktop application, consider using:
- Electron with React
- React Native Windows
- Progressive Web App (PWA)

The current web build can be packaged using Electron or similar tools.

## Project Structure

```
at-office/
├── src/
│   ├── screens/          # Screen components
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── navigation/       # Navigation configuration
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   ├── services/         # Business logic and API services
│   │   ├── authService.ts
│   │   ├── biometricService.ts
│   │   └── checkInService.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   └── components/      # Reusable components
├── .github/
│   └── workflows/       # CI/CD workflows
│       └── build-and-release.yml
├── App.tsx              # Root component
├── app.json            # Expo configuration
├── eas.json            # EAS Build configuration
└── package.json        # Dependencies and scripts
```

## Features in Detail

### Authentication Flow

1. **Login**: Users enter credentials authenticated via Keycloak
2. **Signup**: New users can register (requires Keycloak configuration)
3. **Biometric**: After initial login, users can enable biometric authentication
4. **Multi-User**: Device stores biometric data for multiple users

### Check-in/Check-out

- **Home Screen**: Shows current status (checked in or not)
- **Check-in Button**: Visible when not checked in
- **Last Check-in Time**: Displayed when currently checked in
- **Check-out**: Confirms before checking out
- **History**: All records saved in Dashboard

### Biometric Authentication

- Automatically detects available biometric hardware
- Supports Face ID, Touch ID, and fingerprint
- Associates biometric data with user ID
- Allows multiple users on same device
- Secure credential storage

### Dashboard

- Lists all check-in/check-out records
- Shows duration for each session
- Displays status badges (Active/Complete)
- Sorted by most recent first

### Profile

- View user information
- Toggle biometric login
- Logout functionality

## CI/CD

The app includes GitHub Actions workflow for automatic building:

1. **On push to main**: Automatically triggers builds
2. **Android APK**: Built using EAS Build
3. **Windows App**: Web build generated
4. **Release**: Creates GitHub release with download links

### Setup CI/CD

1. Add `EXPO_TOKEN` to GitHub repository secrets:
   - Go to https://expo.dev/accounts/[account]/settings/access-tokens
   - Create a new token
   - Add it as `EXPO_TOKEN` in GitHub repo settings

2. Push to main branch to trigger automated builds

## Security Considerations

- Never commit Keycloak credentials to the repository
- Use environment variables for sensitive data
- Enable HTTPS for all Keycloak endpoints
- Store biometric data securely using device keychain
- Implement token refresh logic for long sessions
- Use Keycloak's security features (2FA, password policies)

## Development Notes

- The app uses AsyncStorage for local data persistence
- Biometric authentication requires physical device or simulator with biometric support
- Keycloak configuration must be updated before authentication works
- For production, implement proper error handling and logging

## Troubleshooting

### Biometric not working
- Ensure device has biometric hardware
- Check that biometric authentication is set up on device
- Verify app permissions in app.json

### Keycloak connection fails
- Verify Keycloak server URL is accessible
- Check realm and client ID configuration
- Ensure Keycloak client has correct settings
- Check network connectivity

### Build failures
- Verify all dependencies are installed
- Check Node.js version (18+ required)
- Clear cache: `npm cache clean --force`
- Delete node_modules and reinstall

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Open an issue on GitHub
- Check the Keycloak setup guide
- Review Expo documentation

## Acknowledgments

- Built with React Native and Expo
- Authentication powered by Keycloak
- Biometric authentication via expo-local-authentication
- Navigation by React Navigation