import { faImage, faXmark, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useRef } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Link } from "react-router-dom";
import { AddIcon, AttacIcon } from "../../utils/CustomIcon";

interface ImageUploaderProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  fileName: string | null;
  setFileName: React.Dispatch<React.SetStateAction<string | null>>;
  onViewFile: () => void
}

const FileUploader: React.FC<ImageUploaderProps> = ({ file, setFile, setFileName, fileName, onViewFile }) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      // Handle rejected files (e.g., files that exceed the size limit)
      console.error("File is too large");
    } else if (acceptedFiles.length > 0) {
      console.log("acceptedFiles", acceptedFiles);
      const file = acceptedFiles[0];
      setFileName(file.name);
      const reader = new FileReader();
      //reader.onload = () => {
      //  setImage(reader.result);
      //};
      reader.readAsDataURL(file);
      setFile(file);
    }
  }, []);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: ["image/*"] as any, // Allow only image files
    multiple: false, // Allow only a single file
    maxSize, // Set the maximum file size to 10MB
    noClick: true, // Disable clicking to open the file dialog
  });

  const handleUploadButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Programmatically open the file dialog
    }
  };

  const removeImage = () => {
    setFile(null);
    setFileName(null);
  };

  return (
    <div className=''>
      <p>Optionally <strong>Attach</strong> a file as part of evidence of doing this task</p>
      <div className=' d-flex align-items-center'>
        <button className='btn btn-outline-primary px-5 rounded-4' type='button' onClick={open}>
          Attach File
          <span className='ms-3'>
            <AddIcon />
          </span>
          {/* <FontAwesomeIcon icon={FaCirclePlus} size='xs' className='me-2' /> */}
        </button>

        {fileName && (
          <div className='d-flex ms-5 '>
            <span className='me-2'>
              <AttacIcon />
            </span>
            <span className='me-2'>
              <FontAwesomeIcon icon={faEye} onClick={onViewFile} size='lg' />
            </span>
            <p className='me-2'>{fileName}</p>
            <span style={{ cursor: "pointer" }}>
              <FontAwesomeIcon icon={faXmark} onClick={removeImage} size='lg' />
            </span>
          </div>
        )}
      </div>
      <input type='file' accept='image/*' ref={fileInputRef} style={{ display: "none" }} />
    </div>
  );
};

export default FileUploader;
