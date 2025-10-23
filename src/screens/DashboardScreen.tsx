import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import authService from '../services/authService';
import checkInService from '../services/checkInService';
import { User, CheckInRecord } from '../types';

const DashboardScreen: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [records, setRecords] = useState<CheckInRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const currentUser = await authService.getCurrentUser();
    setUser(currentUser);

    if (currentUser) {
      const checkInRecords = await checkInService.getCheckInRecords(currentUser.id);
      setRecords(checkInRecords.reverse()); // Show most recent first
    }
    setLoading(false);
  };

  const formatDateTime = (isoString: string): string => {
    const date = new Date(isoString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const calculateDuration = (checkIn: string, checkOut?: string): string => {
    const startTime = new Date(checkIn).getTime();
    const endTime = checkOut ? new Date(checkOut).getTime() : Date.now();
    const durationMs = endTime - startTime;
    const hours = Math.floor(durationMs / (1000 * 60 * 60));
    const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const renderRecord = ({ item }: { item: CheckInRecord }) => (
    <View style={styles.recordCard}>
      <View style={styles.recordHeader}>
        <Text style={styles.recordDate}>
          {formatDateTime(item.checkInTime)}
        </Text>
        <Text style={[styles.badge, item.checkOutTime ? styles.completeBadge : styles.activeBadge]}>
          {item.checkOutTime ? 'Complete' : 'Active'}
        </Text>
      </View>
      <View style={styles.recordDetails}>
        <View style={styles.recordRow}>
          <Text style={styles.recordLabel}>Check In:</Text>
          <Text style={styles.recordValue}>{formatDateTime(item.checkInTime)}</Text>
        </View>
        {item.checkOutTime && (
          <View style={styles.recordRow}>
            <Text style={styles.recordLabel}>Check Out:</Text>
            <Text style={styles.recordValue}>{formatDateTime(item.checkOutTime)}</Text>
          </View>
        )}
        <View style={styles.recordRow}>
          <Text style={styles.recordLabel}>Duration:</Text>
          <Text style={styles.recordValue}>
            {calculateDuration(item.checkInTime, item.checkOutTime)}
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Text style={styles.subtitle}>Your attendance history</Text>
      </View>

      {records.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No check-in records yet</Text>
        </View>
      ) : (
        <FlatList
          data={records}
          renderItem={renderRecord}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  listContent: {
    padding: 15,
  },
  recordCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  recordDate: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '600',
  },
  activeBadge: {
    backgroundColor: '#34C759',
    color: '#fff',
  },
  completeBadge: {
    backgroundColor: '#007AFF',
    color: '#fff',
  },
  recordDetails: {
    gap: 8,
  },
  recordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  recordLabel: {
    fontSize: 14,
    color: '#666',
  },
  recordValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
});

export default DashboardScreen;
