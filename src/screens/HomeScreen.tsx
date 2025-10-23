import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from 'react-native';
import authService from '../services/authService';
import checkInService from '../services/checkInService';
import { User, CheckInRecord } from '../types';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentCheckIn, setCurrentCheckIn] = useState<CheckInRecord | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const checkedIn = await checkInService.isCheckedIn(currentUser.id);
      setIsCheckedIn(checkedIn);

      if (checkedIn) {
        const checkIn = await checkInService.getCurrentCheckIn(currentUser.id);
        setCurrentCheckIn(checkIn);
      }
    }
  };

  const handleCheckIn = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const checkIn = await checkInService.checkIn(user.id);
      setIsCheckedIn(true);
      setCurrentCheckIn(checkIn);
      Alert.alert('Success', 'Checked in successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to check in');
    } finally {
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!user) return;

    Alert.alert(
      'Check Out',
      'Are you sure you want to check out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Check Out',
          onPress: async () => {
            setLoading(true);
            try {
              await checkInService.checkOut(user.id);
              setIsCheckedIn(false);
              setCurrentCheckIn(null);
              Alert.alert('Success', 'Checked out successfully');
            } catch (error) {
              Alert.alert('Error', 'Failed to check out');
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const formatTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.welcomeText}>
          Welcome, {user?.name || user?.username || 'User'}!
        </Text>
      </View>

      <View style={styles.statusCard}>
        {isCheckedIn && currentCheckIn ? (
          <View style={styles.checkedInContainer}>
            <Text style={styles.statusText}>You are checked in</Text>
            <View style={styles.timeContainer}>
              <Text style={styles.timeLabel}>Check-in Time:</Text>
              <Text style={styles.timeValue}>
                {formatTime(currentCheckIn.checkInTime)}
              </Text>
              <Text style={styles.dateValue}>
                {formatDate(currentCheckIn.checkInTime)}
              </Text>
            </View>
            <TouchableOpacity
              style={[styles.button, styles.checkOutButton]}
              onPress={handleCheckOut}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Check Out</Text>
              )}
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.notCheckedInContainer}>
            <Text style={styles.statusText}>Ready to start your day?</Text>
            <TouchableOpacity
              style={[styles.button, styles.checkInButton]}
              onPress={handleCheckIn}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Check In</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Use the menu to access Dashboard and Profile
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statusCard: {
    margin: 20,
    padding: 25,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  checkedInContainer: {
    alignItems: 'center',
  },
  notCheckedInContainer: {
    alignItems: 'center',
  },
  statusText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 20,
  },
  timeContainer: {
    alignItems: 'center',
    marginBottom: 25,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: '100%',
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  timeValue: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  dateValue: {
    fontSize: 14,
    color: '#666',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 200,
  },
  checkInButton: {
    backgroundColor: '#34C759',
  },
  checkOutButton: {
    backgroundColor: '#FF3B30',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  infoContainer: {
    margin: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen;
