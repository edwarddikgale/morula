import { Recording } from '../types/Recording'; // adjust path as needed
import { base64ToBlob } from './base64ToBlob'; // assuming you have this helper

export const loadCachedRecordings = (): Promise<Recording[]> => {
  return new Promise(async (resolve) => {
    const stored = localStorage.getItem('meeting-recordings');

    if (!stored) return resolve([]);

    try {
      const parsed = JSON.parse(stored);
      const loaded: Recording[] = await Promise.all(
        parsed.map(async (r: any) => {
          const blob = await base64ToBlob(r.base64);
          return {
            ...r,
            blob,
            createdAt: new Date(r.createdAt),
          };
        })
      );
      resolve(loaded);
    } catch (e) {
      console.warn('Failed to restore recordings:', e);
      localStorage.removeItem('meeting-recordings');
      resolve([]);
    }
  });
};
