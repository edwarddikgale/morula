// FileUpload.tsx
import React, { useState } from "react";
import uploadFile from "../uploadFile";

interface IProps{

    onUploadComplete: () => void;
}

const FileUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [downloadURL, setDownloadURL] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file) {
      setUploading(true);
      setError(null);
      try {
        const url = await uploadFile(file);
        setDownloadURL(url);
      } catch (error) {
        setError("Failed to upload file");
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading || !file}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {error && <p>{error}</p>}
      {downloadURL && (
        <div>
          <p>File uploaded successfully!</p>
          <a href={downloadURL} target="_blank" rel="noopener noreferrer">
            View File
          </a>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
