// utils/createDownloadUrl.ts

const mimeTypeToExtension = (type: string): string => {
  switch (type) {
    case 'audio/webm': return '.webm';
    case 'audio/wav': return '.wav';
    case 'audio/mpeg': return '.mp3';
    case 'audio/ogg': return '.ogg';
    default: return '';
  }
};

export const createDownloadUrl = (blob: Blob, baseName: string): { url: string; filename: string } => {
  const extension = mimeTypeToExtension(blob.type);
  const filename = baseName.endsWith(extension) ? baseName : `${baseName}${extension}`;
  const url = URL.createObjectURL(blob);
  return { url, filename };
};
