import { loadRecordingsFromDB } from './localDb'; // adjust path if needed
import { Recording } from '../types/Recording';

export const loadCachedRecordings = async (): Promise<Recording[]> => {
  try {
    const recordings = await loadRecordingsFromDB();
    return recordings;
  } catch (e) {
    console.warn('Failed to load recordings from DB:', e);
    return [];
  }
};
