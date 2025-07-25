export interface Recording {
  id: string;
  title: string;
  blob: Blob;
  createdAt: Date;
  duration?: number;
  selectCount?: number;
}