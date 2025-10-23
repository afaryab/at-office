import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { AuthTokens, KeycloakConfig, User } from '../types';

// Default Keycloak configuration - should be replaced with actual values
const KEYCLOAK_CONFIG: KeycloakConfig = {
  url: 'https://your-keycloak-server.com',
  realm: 'at-office',
  clientId: 'at-office-app',
};

class AuthService {
  private keycloakUrl: string;
  private realm: string;
  private clientId: string;

  constructor(config: KeycloakConfig = KEYCLOAK_CONFIG) {
    this.keycloakUrl = config.url;
    this.realm = config.realm;
    this.clientId = config.clientId;
  }

  private getTokenUrl(): string {
    return `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/token`;
  }

  private getUserInfoUrl(): string {
    return `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/userinfo`;
  }

  private getRegistrationUrl(): string {
    return `${this.keycloakUrl}/realms/${this.realm}/protocol/openid-connect/registrations`;
  }

  async login(username: string, password: string): Promise<AuthTokens> {
    try {
      const response = await axios.post(
        this.getTokenUrl(),
        new URLSearchParams({
          grant_type: 'password',
          client_id: this.clientId,
          username,
          password,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const tokens: AuthTokens = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        idToken: response.data.id_token,
      };

      await this.saveTokens(tokens);
      return tokens;
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Login failed');
    }
  }

  async signup(username: string, email: string, password: string): Promise<void> {
    try {
      // Note: Direct registration via API requires proper Keycloak setup
      // This is a simplified version
      const response = await axios.post(
        this.getRegistrationUrl(),
        {
          username,
          email,
          enabled: true,
          credentials: [
            {
              type: 'password',
              value: password,
              temporary: false,
            },
          ],
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      
      return response.data;
    } catch (error) {
      console.error('Signup error:', error);
      throw new Error('Signup failed');
    }
  }

  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await axios.post(
        this.getTokenUrl(),
        new URLSearchParams({
          grant_type: 'refresh_token',
          client_id: this.clientId,
          refresh_token: refreshToken,
        }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      const tokens: AuthTokens = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        idToken: response.data.id_token,
      };

      await this.saveTokens(tokens);
      return tokens;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw new Error('Token refresh failed');
    }
  }

  async getUserInfo(accessToken: string): Promise<User> {
    try {
      const response = await axios.get(this.getUserInfoUrl(), {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      return {
        id: response.data.sub,
        username: response.data.preferred_username,
        email: response.data.email,
        name: response.data.name,
      };
    } catch (error) {
      console.error('Get user info error:', error);
      throw new Error('Failed to get user info');
    }
  }

  async saveTokens(tokens: AuthTokens): Promise<void> {
    await AsyncStorage.setItem('auth_tokens', JSON.stringify(tokens));
  }

  async getTokens(): Promise<AuthTokens | null> {
    const tokensJson = await AsyncStorage.getItem('auth_tokens');
    return tokensJson ? JSON.parse(tokensJson) : null;
  }

  async saveUser(user: User): Promise<void> {
    await AsyncStorage.setItem('current_user', JSON.stringify(user));
  }

  async getCurrentUser(): Promise<User | null> {
    const userJson = await AsyncStorage.getItem('current_user');
    return userJson ? JSON.parse(userJson) : null;
  }

  async logout(): Promise<void> {
    await AsyncStorage.removeItem('auth_tokens');
    await AsyncStorage.removeItem('current_user');
  }

  async isAuthenticated(): Promise<boolean> {
    const tokens = await this.getTokens();
    return tokens !== null;
  }
}

export default new AuthService();
