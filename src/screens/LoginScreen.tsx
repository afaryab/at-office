import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import authService from '../services/authService';
import biometricService from '../services/biometricService';
import { BiometricUser } from '../types';

interface LoginScreenProps {
  navigation: any;
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [biometricAvailable, setBiometricAvailable] = useState(false);
  const [biometricUsers, setBiometricUsers] = useState<BiometricUser[]>([]);

  useEffect(() => {
    checkBiometric();
    loadBiometricUsers();
  }, []);

  const checkBiometric = async () => {
    const available = await biometricService.isAvailable();
    setBiometricAvailable(available);
  };

  const loadBiometricUsers = async () => {
    const users = await biometricService.getBiometricUsers();
    setBiometricUsers(users);
  };

  const handleLogin = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter username and password');
      return;
    }

    setLoading(true);
    try {
      const tokens = await authService.login(username, password);
      const user = await authService.getUserInfo(tokens.accessToken);
      await authService.saveUser(user);
      onLogin();
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  const handleBiometricLogin = async (userId: string, username: string) => {
    const success = await biometricService.authenticate('Login with biometrics');
    
    if (success) {
      setLoading(true);
      try {
        // In a real app, you would retrieve stored credentials securely
        // For now, we'll just mark the user as authenticated
        Alert.alert('Success', `Biometric login successful for ${username}`);
        // You would need to implement secure credential storage for full biometric login
        // For demo purposes, we'll show this message
        Alert.alert(
          'Note',
          'In production, securely stored credentials would be used here'
        );
      } catch (error) {
        Alert.alert('Error', 'Biometric login failed');
      } finally {
        setLoading(false);
      }
    } else {
      Alert.alert('Error', 'Biometric authentication failed');
    }
  };

  const handleEnableBiometric = async () => {
    if (!username) {
      Alert.alert('Error', 'Please enter your username first');
      return;
    }

    const success = await biometricService.authenticate('Enable biometric login');
    
    if (success) {
      // In a real app, you would generate a userId after successful login
      const tempUserId = `user_${Date.now()}`;
      await biometricService.saveBiometricUser(tempUserId, username);
      Alert.alert('Success', 'Biometric login enabled');
      loadBiometricUsers();
    } else {
      Alert.alert('Error', 'Biometric authentication failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>At Office</Text>
      <Text style={styles.subtitle}>Login to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Signup')}
      >
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </TouchableOpacity>

      {biometricAvailable && (
        <View style={styles.biometricSection}>
          <Text style={styles.sectionTitle}>Biometric Login</Text>
          
          {biometricUsers.length > 0 && (
            <View style={styles.biometricUsers}>
              <Text style={styles.biometricLabel}>Login as:</Text>
              {biometricUsers.map((user) => (
                <TouchableOpacity
                  key={user.userId}
                  style={styles.biometricUserButton}
                  onPress={() => handleBiometricLogin(user.userId, user.username)}
                >
                  <Text style={styles.biometricUserText}>{user.username}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <TouchableOpacity
            style={styles.biometricEnableButton}
            onPress={handleEnableBiometric}
          >
            <Text style={styles.biometricEnableText}>
              Enable Biometric for Current User
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    padding: 10,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
  },
  biometricSection: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  biometricUsers: {
    marginBottom: 15,
  },
  biometricLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  biometricUserButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  biometricUserText: {
    fontSize: 16,
    color: '#333',
  },
  biometricEnableButton: {
    backgroundColor: '#34C759',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  biometricEnableText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default LoginScreen;
