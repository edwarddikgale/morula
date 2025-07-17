// utils/localDb.ts
import { openDB } from 'idb';
import { Recording } from '../types/Recording';

const DB_NAME = 'meeting-recorder-db';
const STORE_NAME = 'recordings';

const initDB = async () => {
  return await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: 'id' });
        store.createIndex('createdAt', 'createdAt');
      }
    },
  });
};

export const saveRecordingToDB = async (recording: Recording) => {
  const db = await initDB();
  await db.put(STORE_NAME, recording);
};

export const loadRecordingsFromDB = async (): Promise<Recording[]> => {
  const db = await initDB();
  const all = await db.getAll(STORE_NAME);
  return all.map(r => ({ ...r, createdAt: new Date(r.createdAt) }));
};

export const deleteRecordingFromDB = async (id: string) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};
