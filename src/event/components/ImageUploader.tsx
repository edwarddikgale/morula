import { faImage, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useRef } from "react";
import { useDropzone, FileRejection } from "react-dropzone";
import { Link } from "react-router-dom";
import canvaImg from "../assets/Canva_.png";

interface ImageUploaderProps {
  image: string | null;
  setImage: React.Dispatch<React.SetStateAction<string | null>>;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, setImage }) => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], fileRejections: FileRejection[]) => {
    if (fileRejections.length > 0) {
      // Handle rejected files (e.g., files that exceed the size limit)
      console.error("File is too large");
    } else if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
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
    setImage(null);
  };

  return (
    <div className='my-3 '>
      <div className='uploader-container'>
        <div
          {...getRootProps()}
          className='dropzone p-5 dropzone-container'
          onClick={handleUploadButtonClick}
        >
          <FontAwesomeIcon icon={faImage} size='2xl' className='pb-3' style={{ color: "lightgray" }} />
          <input {...getInputProps()} />
          <h5 className='text-center fw-bolder'>Drag and drop an image or</h5>
        </div>
        <div className='upload-btn-box'>
          <button
            className='btn btn-light btn-upload my-3 my-md-1 mx-0 mx-md-2 mx-lg-3'
            type='button'
            onClick={open}
          >
            <FontAwesomeIcon icon={faImage} size='xs' className='me-2' />
            Upload Image
          </button>
          <Link
            className='btn btn-light btn-upload my-3 my-md-1 mx-0 mx-md-2 mx-lg-3'
            type='button'
            to='https://www.canva.com/'
            target='_blank'
          >
            <img className='me-2' src={canvaImg} alt='canva' style={{ width: "18px" }} />
            Design with canva
          </Link>
        </div>
        <input type='file' accept='image/*' ref={fileInputRef} style={{ display: "none" }} />
        {image && (
          <div className='image-preview'>
            <div className='position-relative'>
              <img className='premImg' src={image} alt='Preview' />
              <FontAwesomeIcon icon={faXmark} onClick={removeImage} size='2xs' className='close' />
            </div>
          </div>
        )}
      </div>

      <ul className='d-flex justify-content-between align-items-center flex-wrap fs-14 mt-2'>
        <li>Recommended image size:2160 * 1080px</li>
        <li>Maximum size: 10 MB</li>
        <li>Supported image files: JPEG or PNG</li>
      </ul>
    </div>
  );
};

export default ImageUploader;
