# At Office - Architecture Overview

## Application Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        App Start                             │
└────────────────────────┬────────────────────────────────────┘
                         │
                    Check Auth?
                    ┌────┴────┐
                    │  No │ Yes
                    ▼         ▼
         ┌──────────────┐  ┌──────────────────┐
         │ Auth Stack   │  │  Main Stack      │
         │              │  │  (with Drawer)   │
         └──────────────┘  └──────────────────┘
                │                    │
        ┌───────┴────────┐    ┌─────┴──────────────┐
        │                │    │                     │
    ┌───▼────┐    ┌──────▼──┐ │                    │
    │ Login  │◄───┤ Signup  │ │                    │
    └───┬────┘    └─────────┘ │                    │
        │                      │                    │
        │ Login Success        │                    │
        └──────────────────────┘                    │
                │                                    │
                ▼                                    │
         ┌──────────────┐      ┌──────────────┐   │
         │   Home       │◄─────┤  Dashboard   │◄──┤
         │  Screen      │      │   Screen     │   │
         └──────────────┘      └──────────────┘   │
                │                                   │
                │                                   │
                ▼                                   │
         ┌──────────────┐                          │
         │   Profile    │◄─────────────────────────┘
         │   Screen     │
         └──────────────┘
```

## Screen Components

### Authentication Stack
- **LoginScreen**: Main entry point with username/password and biometric login options
- **SignupScreen**: User registration with email and password

### Main Stack (Drawer Navigation)
- **HomeScreen**: Check-in/out functionality with status display
- **DashboardScreen**: Attendance history and statistics
- **ProfileScreen**: User info, settings, and biometric toggle

## Services Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Services Layer                       │
├─────────────────┬─────────────────┬─────────────────────────┤
│                 │                 │                          │
│  AuthService    │ BiometricService│  CheckInService         │
│                 │                 │                          │
│ • login()       │ • isAvailable() │ • checkIn()             │
│ • signup()      │ • authenticate()│ • checkOut()            │
│ • logout()      │ • saveBiometric │ • getCurrentCheckIn()   │
│ • refreshToken()│ • getBiometric  │ • getRecords()          │
│ • getUserInfo() │ • removeBiometric│ • isCheckedIn()        │
│ • saveTokens()  │                 │                          │
│ • getTokens()   │                 │                          │
└────────┬────────┴────────┬────────┴────────┬────────────────┘
         │                 │                 │
         ▼                 ▼                 ▼
    ┌────────────────────────────────────────────┐
    │         AsyncStorage (Local Data)          │
    ├────────────────────────────────────────────┤
    │ • auth_tokens                              │
    │ • current_user                             │
    │ • biometric_users                          │
    │ • check_in_records_{userId}                │
    │ • current_check_in_{userId}                │
    └────────────────────────────────────────────┘
```

## Data Flow

### Login Flow
```
User Input → AuthService.login() → Keycloak API
    ↓
Tokens Received → Save to AsyncStorage
    ↓
Get User Info → Save User Data
    ↓
Navigate to Home Screen
```

### Check-in Flow
```
User Clicks Check-in → CheckInService.checkIn()
    ↓
Create Record → Save to AsyncStorage
    ↓
Update UI → Show Last Check-in Time
```

### Biometric Flow
```
User Enables Biometric → BiometricService.authenticate()
    ↓
System Biometric Prompt
    ↓
On Success → Save User ID mapping
    ↓
Next Login → Show User in Biometric List
    ↓
User Clicks Username → Authenticate → Auto Login
```

## Key Features Implementation

### 1. Multi-User Biometric Support
```typescript
// Each device stores mapping of:
{
  userId: "unique-user-id",
  username: "display-name",
  biometricEnabled: true
}

// On login screen:
- Display all registered biometric users
- Each user can authenticate independently
- Biometric data managed at OS level
```

### 2. Check-in/Check-out Logic
```typescript
// Check-in:
- Store check-in time with user ID
- Mark as current active session
- Display time on home screen

// Check-out:
- Find active session
- Add check-out time
- Calculate duration
- Move to history
```

### 3. State Management
```
App Level:
- isAuthenticated: boolean
- currentUser: User | null

Screen Level:
- loading states
- form inputs
- UI state

Persisted:
- tokens (AsyncStorage)
- user data (AsyncStorage)
- check-in records (AsyncStorage)
- biometric mappings (AsyncStorage)
```

## Technology Stack

```
┌─────────────────────────────────────────────────┐
│                  React Native                    │
├─────────────────────────────────────────────────┤
│ Framework: Expo                                  │
│ Language: TypeScript                             │
│ State: React Hooks                               │
│ Navigation: React Navigation (Drawer + Stack)   │
│ Storage: AsyncStorage                            │
│ Auth: Keycloak (OAuth2/OIDC)                    │
│ Biometric: expo-local-authentication            │
│ HTTP: Axios                                      │
│ Build: EAS Build                                 │
│ CI/CD: GitHub Actions                            │
└─────────────────────────────────────────────────┘
```

## Security Considerations

### Token Management
- Access tokens stored in AsyncStorage
- Refresh tokens for long-lived sessions
- Automatic token refresh on expiry
- Logout clears all tokens

### Biometric Security
- OS-level biometric authentication
- No biometric data stored in app
- User ID mapping only
- Device keychain for credentials (future)

### Network Security
- HTTPS required for Keycloak
- Token-based authentication
- No passwords stored locally
- Secure credential transmission

## File Structure

```
at-office/
├── src/
│   ├── screens/              # UI Components
│   │   ├── LoginScreen.tsx
│   │   ├── SignupScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── DashboardScreen.tsx
│   │   └── ProfileScreen.tsx
│   │
│   ├── navigation/           # Routing
│   │   ├── AuthNavigator.tsx
│   │   └── MainNavigator.tsx
│   │
│   ├── services/             # Business Logic
│   │   ├── authService.ts
│   │   ├── biometricService.ts
│   │   └── checkInService.ts
│   │
│   └── types/               # TypeScript Types
│       └── index.ts
│
├── .github/
│   └── workflows/           # CI/CD
│       └── build-and-release.yml
│
├── App.tsx                  # Root Component
├── app.json                 # Expo Config
├── eas.json                 # Build Config
└── package.json             # Dependencies
```

## Deployment Pipeline

```
Push to main branch
    ↓
GitHub Actions Triggered
    ↓
┌────────────────┬────────────────┐
│                │                │
│ Build Android  │  Build Windows │
│    (EAS)       │   (Web Build)  │
│                │                │
└────────┬───────┴────────┬───────┘
         │                │
         ▼                ▼
    Create GitHub Release
         │
         ▼
    APK + Windows App Available
```

## Future Enhancements

1. **Backend Integration**
   - Custom API server
   - Database for records
   - Real-time sync

2. **Advanced Features**
   - Offline mode
   - Location verification
   - QR code check-in
   - Push notifications

3. **Analytics**
   - Attendance reports
   - Team statistics
   - Export functionality

4. **UI/UX**
   - Dark mode
   - Themes
   - Animations
   - Customization
