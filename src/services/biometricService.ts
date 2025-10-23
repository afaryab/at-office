import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BiometricUser } from '../types';

class BiometricService {
  private readonly BIOMETRIC_USERS_KEY = 'biometric_users';

  async isAvailable(): Promise<boolean> {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    if (!compatible) return false;

    const enrolled = await LocalAuthentication.isEnrolledAsync();
    return enrolled;
  }

  async getSupportedTypes(): Promise<LocalAuthentication.AuthenticationType[]> {
    return await LocalAuthentication.supportedAuthenticationTypesAsync();
  }

  async authenticate(reason: string = 'Authenticate to continue'): Promise<boolean> {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: reason,
        fallbackLabel: 'Use Passcode',
        disableDeviceFallback: false,
      });

      return result.success;
    } catch (error) {
      console.error('Biometric authentication error:', error);
      return false;
    }
  }

  async saveBiometricUser(userId: string, username: string): Promise<void> {
    const users = await this.getBiometricUsers();
    const existingUserIndex = users.findIndex(u => u.userId === userId);

    const biometricUser: BiometricUser = {
      userId,
      username,
      biometricEnabled: true,
    };

    if (existingUserIndex >= 0) {
      users[existingUserIndex] = biometricUser;
    } else {
      users.push(biometricUser);
    }

    await AsyncStorage.setItem(this.BIOMETRIC_USERS_KEY, JSON.stringify(users));
  }

  async getBiometricUsers(): Promise<BiometricUser[]> {
    const usersJson = await AsyncStorage.getItem(this.BIOMETRIC_USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  async removeBiometricUser(userId: string): Promise<void> {
    const users = await this.getBiometricUsers();
    const filteredUsers = users.filter(u => u.userId !== userId);
    await AsyncStorage.setItem(this.BIOMETRIC_USERS_KEY, JSON.stringify(filteredUsers));
  }

  async isBiometricEnabledForUser(userId: string): Promise<boolean> {
    const users = await this.getBiometricUsers();
    const user = users.find(u => u.userId === userId);
    return user?.biometricEnabled ?? false;
  }

  async getBiometricUser(userId: string): Promise<BiometricUser | null> {
    const users = await this.getBiometricUsers();
    return users.find(u => u.userId === userId) ?? null;
  }
}

export default new BiometricService();
