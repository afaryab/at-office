export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
}

export interface BiometricUser {
  userId: string;
  username: string;
  biometricEnabled: boolean;
}

export interface CheckInRecord {
  id: string;
  userId: string;
  checkInTime: string;
  checkOutTime?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  idToken?: string;
}

export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}
