import React, { useEffect, useState } from "react";
import "../styles/evidence.css";
import { evidenceFormData } from "../types/evidenceTypes";
import FileUploader from "./FileUploader";

interface IProps {
  evidenceId: string;
  data: evidenceFormData;
  onSubmit: (formData: evidenceFormData) => void;
  onReset: () => void;
}

const UpdateEvidence = ({ data, evidenceId, onSubmit, onReset }: IProps) => {
  const [title, setTitle] = useState<string>("");
  const [evidenceType, setEvidenceType] = useState<string>("");
  const [comments, setComments] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>("");
  const [fileUrl, setFileUrl] = useState<string | null>(""); 

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {

    if (evidenceId) {
      setTitle(data.title);
      setEvidenceType(data.type);
      setComments(data.description);
      setFile(data.file);
      setFileName(data.fileName);
      setFileUrl(data.fileUrl);
    }
  }, [evidenceId, data]);

  const resetFrom = () => {
    /*setTitle("");
    setEvidenceType("");
    setComments("");
    setFile(null);
    setFileName(null);*/
    onReset();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const formData: evidenceFormData = {
      title: title,
      type: evidenceType,
      description: comments,
      file: file,
      fileName: fileName,
      fileUrl: fileUrl
    };

    onSubmit(formData);
    console.log({ formData });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* evidence title */}
        <div className='mt-5'>
          <h4 className='fw-bold mb-4'>Update Evidence for actions and tasks</h4>
          <p className='text-muted'>Provide info about your action its sub actions (tasks)</p>
          <p className='fw-bold mb-1'>Title</p>
          <input
            type='text'
            className='form-control'
            id='evidenceTitle'
            placeholder='Title or name of evidence'
            value={title}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          />
        </div>

        {/* select evidenceType */}
        <div className='mt-5'>
          <p className='fw-bold mb-1'>Evidence Type</p>
          <p>
            Choose the <strong>type</strong> of evidence you are providing
          </p>
          <div className='row'>
            <div className='col-md-6'>
              <div className='row g-4'>
                <div className='col-md-6'>
                  <div className='d-grid'>
                    <button
                      type='button'
                      className={`my-1 me-3 btn btn-light btn-setting-date ${
                        evidenceType === "Screenshot" ? "btn-setting-date-selected" : ""
                      } `}
                      onClick={() => setEvidenceType("Screenshot")}
                    >
                      Screenshot
                    </button>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='d-grid'>
                    <button
                      type='button'
                      className={`my-1 me-3 btn btn-light btn-setting-date ${
                        evidenceType === "Website link" ? "btn-setting-date-selected" : ""
                      } `}
                      onClick={() => setEvidenceType("Website link")}
                    >
                      Website Link
                    </button>
                  </div>
                </div>
                <div className='col-md-6'>
                  <div className='d-grid'>
                    {" "}
                    <button
                      type='button'
                      className={`my-1 me-3 btn btn-light btn-setting-date ${
                        evidenceType === "Email communication" ? "btn-setting-date-selected" : ""
                      } `}
                      onClick={() => setEvidenceType("Email communication")}
                    >
                      Email
                    </button>
                  </div>
                </div>
                <div className='col-md-6 '>
                  <div className='d-grid'>
                    <button
                      type='button'
                      className={`my-1 me-3 btn btn-light btn-setting-date ${
                        evidenceType === "Other" ? "btn-setting-date-selected" : ""
                      } `}
                      onClick={() => setEvidenceType("Other")}
                    >
                      Other
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-6'></div>
          </div>
        </div>

        <div className='mt-5'>
          <FileUploader 
            file={file} 
            setFile={setFile} 
            fileName={fileName} 
            setFileName={setFileName} 
            onViewFile={() => {}}/>
        </div>

        {/* comments */}
        <div className='mt-5'>
          <p className='fw-bold mb-1'>Comments/Notes</p>

          <textarea
            className='form-control'
            id='evenSummary'
            placeholder=''
            value={comments}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setComments(e.target.value)}
          />
        </div>

        <div className='mt-5'>
          <button type='reset' className='btn btn-secondary px-5' onClick={() => resetFrom()}>
            Cancel
          </button>
          <button type='submit' className='btn btn-dark px-5 ms-5'>
            Submit
            {/* {isLoading && <LoaderSm />} */}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateEvidence;
