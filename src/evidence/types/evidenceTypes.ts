export interface evidenceFormData {
  title: string;
  type: string;
  description: string;
  file: File | null;
  fileName: string | null;
  fileUrl: string | null;
  id?: string;
  taskId?:string;
}
