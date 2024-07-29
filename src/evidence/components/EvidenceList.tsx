import React, { useState } from "react";
import "../styles/evidence.css";
import { evidenceFormData } from "../types/evidenceTypes";
import { AttacSmIcon, DeleteSmIcon, EditSmIcon } from "../../utils/CustomIcon";
import { Link } from "react-router-dom";
import DeleteConfirmation from "../../common/components/alert/DeleteConfirmation";
import { LoaderPrimary } from "../../common/components/Loader/Loader";

interface IProps {
  setEditId: React.Dispatch<React.SetStateAction<string | null>>;
  onDelete?: (id: string) => void;
  onEdit?: (id: string) => void;
  isLoading?: boolean,
  //onUpdate?: (formData: evidenceFormData, id: string) => void
  data: evidenceFormData[]
}

const EvidenceList = ({ setEditId, data, onDelete, onEdit, isLoading }: IProps) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedId, setSelectedId] = useState<string|null>(null);

  const handleEdit = (id?: string) => {
    setEditId(id as string);
    if (id && onEdit){
      onEdit(id);
    }  
  };

  const deleteItem = (id?: string) =>{
    if(!id) return;
    setSelectedId(id);
    setShowConfirmation(true);
  }

  const handleDelete = (id?: string) => {
    if(onDelete && selectedId){
      onDelete(selectedId);
      setShowConfirmation(false);
    }
  };
  return (
    <>
      <div style={{ marginTop: "70px" }}>
        <div>
          <p className='fw-bold mb-1'>Evidence List {data && data.length > 0? `(${data.length})`: ``}</p>
        </div>
        <hr className='ev-seperator' />
        {isLoading && <LoaderPrimary />}
        <div>
          {data.map((evidence: evidenceFormData, index: number) => (
            <div className='row' key={index}>
              <div className="col-md-1">
                <span className='me-3'>{index + 1}.</span>
              </div>  
              <div className='col-md-5'>
                <p>
                  {evidence.title}
                </p>
              </div>
              <div className='col-md-6'>
                <div className='row'>
                  <div className='col-md-6'>
                    <p>{evidence.type}</p>
                  </div>

                  <div className='col-md-6'>
                    <div className='d-flex justify-content-between '>
                      <div>
                        <Link to={"/"}>
                          <div className='d-flex '>
                            <span className='me-2'>
                              <AttacSmIcon />
                            </span>
                            <p className='atachment'>See attachment</p>
                          </div>
                        </Link>
                      </div>
                      <div className='ms-3 d-flex'>
                        <div className='ms-2 cursor-pointer' onClick={() => handleEdit(evidence.id)}>
                          <span>
                            <EditSmIcon />
                          </span>
                        </div>
                        <div className='ms-3 cursor-pointer' onClick={() => deleteItem(evidence.id)}>
                          <span>
                            <DeleteSmIcon />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showConfirmation && (
        <DeleteConfirmation
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          handleDelete={handleDelete}
          label=''
          item={""}
        />
      )}
    </>
  );
};

export default EvidenceList;
