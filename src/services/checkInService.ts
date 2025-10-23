import AsyncStorage from '@react-native-async-storage/async-storage';
import { CheckInRecord } from '../types';

class CheckInService {
  private readonly CHECK_IN_RECORDS_KEY = 'check_in_records';

  async checkIn(userId: string): Promise<CheckInRecord> {
    const record: CheckInRecord = {
      id: `${userId}-${Date.now()}`,
      userId,
      checkInTime: new Date().toISOString(),
    };

    const records = await this.getCheckInRecords(userId);
    records.push(record);

    await AsyncStorage.setItem(
      `${this.CHECK_IN_RECORDS_KEY}_${userId}`,
      JSON.stringify(records)
    );

    // Save current check-in status
    await AsyncStorage.setItem(`current_check_in_${userId}`, JSON.stringify(record));

    return record;
  }

  async checkOut(userId: string): Promise<CheckInRecord | null> {
    const currentCheckIn = await this.getCurrentCheckIn(userId);
    
    if (!currentCheckIn) {
      return null;
    }

    const updatedRecord: CheckInRecord = {
      ...currentCheckIn,
      checkOutTime: new Date().toISOString(),
    };

    // Update records
    const records = await this.getCheckInRecords(userId);
    const recordIndex = records.findIndex(r => r.id === currentCheckIn.id);
    
    if (recordIndex >= 0) {
      records[recordIndex] = updatedRecord;
      await AsyncStorage.setItem(
        `${this.CHECK_IN_RECORDS_KEY}_${userId}`,
        JSON.stringify(records)
      );
    }

    // Remove current check-in status
    await AsyncStorage.removeItem(`current_check_in_${userId}`);

    return updatedRecord;
  }

  async getCurrentCheckIn(userId: string): Promise<CheckInRecord | null> {
    const recordJson = await AsyncStorage.getItem(`current_check_in_${userId}`);
    return recordJson ? JSON.parse(recordJson) : null;
  }

  async isCheckedIn(userId: string): Promise<boolean> {
    const currentCheckIn = await this.getCurrentCheckIn(userId);
    return currentCheckIn !== null;
  }

  async getCheckInRecords(userId: string): Promise<CheckInRecord[]> {
    const recordsJson = await AsyncStorage.getItem(`${this.CHECK_IN_RECORDS_KEY}_${userId}`);
    return recordsJson ? JSON.parse(recordsJson) : [];
  }

  async getLastCheckInTime(userId: string): Promise<string | null> {
    const currentCheckIn = await this.getCurrentCheckIn(userId);
    return currentCheckIn?.checkInTime ?? null;
  }
}

export default new CheckInService();
