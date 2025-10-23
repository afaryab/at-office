# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-10-23

### Added
- Initial release of At Office mobile application
- Keycloak authentication integration
  - Login screen with username/password
  - Signup screen for new user registration
  - Token-based authentication
  - Refresh token support
- Home screen with check-in/check-out functionality
  - Check-in button when not checked in
  - Display last check-in time when checked in
  - Check-out confirmation dialog
  - Real-time status updates
- Biometric authentication support
  - Face ID support (iOS)
  - Touch ID support (iOS)
  - Fingerprint authentication (Android)
  - Multi-user biometric login on same device
  - Biometric user management
  - Secure credential storage
- Navigation and UI
  - Drawer navigation with sidebar
  - Home, Dashboard, and Profile screens
  - Smooth transitions between screens
  - Mobile-responsive design
- Dashboard screen
  - Attendance history list
  - Check-in/check-out timestamps
  - Duration calculation
  - Active/Complete status badges
  - Chronological sorting
- Profile screen
  - User information display
  - Biometric toggle setting
  - Logout functionality
  - Avatar with user initial
- Data persistence
  - AsyncStorage for local data
  - Check-in records storage
  - User preferences
  - Biometric user mapping
- CI/CD pipeline
  - GitHub Actions workflow
  - Automatic Android APK builds
  - Windows app build support
  - Automated releases
  - Build notifications
- Documentation
  - Comprehensive README
  - Keycloak setup guide
  - Testing guide
  - Contributing guidelines
  - Quick start guide
  - Environment configuration template
- Security
  - CodeQL security scanning
  - Proper GitHub Actions permissions
  - Secure token storage
  - Biometric authentication
  - Input validation

### Security
- Implemented secure token storage using AsyncStorage
- Added biometric authentication for enhanced security
- CodeQL security scanning with zero vulnerabilities
- Proper GITHUB_TOKEN permissions in workflows

### Technical
- React Native with Expo
- TypeScript for type safety
- React Navigation for routing
- expo-local-authentication for biometrics
- AsyncStorage for data persistence
- Axios for HTTP requests
- EAS Build for production builds

## [Unreleased]

### Planned Features
- Offline support with data sync
- Push notifications for reminders
- Location-based check-in verification
- QR code check-in option
- Analytics and reports
- Team management features
- Calendar integration
- Export attendance data
- Dark mode support
- Multiple language support

---

For more details, see the [README](./README.md) and [documentation](./docs/).
