import React, { useEffect, useState } from "react";
import CreateEvidence from "../components/CreateEvidence";
import EvidenceList from "../components/EvidenceList";
import UpdateEvidence from "../components/UpdateEvidence";
import { TaskEvidenceAPI } from "evidence/utils/API";
import { evidenceFormData } from "evidence/types/evidenceTypes";
import { confirmError, confirmSuccess } from "../../common/components/confirmation/confirm";
import useQueryParameter from '../../common/url/useQueryParameter';

interface IProps{
  taskId?: string;
}

const EvidencePage: React.FC<IProps> = ({taskId}: IProps) => {

  const queryTaskId: string | null = useQueryParameter("taskId");
  const [editId, setEditId] = useState<string | null>("");
  const [evidenceList, setEvidenceList] = useState<evidenceFormData[]>([] as any);
  const [selectedEvidence, setSelectedEvidence] = useState<evidenceFormData>({} as any);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const parentTaskId: string = (taskId? taskId: queryTaskId) as string;

  console.log(`Task Id: ${parentTaskId}`);

  const handleEvidenceCreation = async (formData: evidenceFormData) =>{
    try{
      setIsProcessing(true);
      const response = await TaskEvidenceAPI.CreateTaskEvidence(formData);
      evidenceList.push(response.taskEvidence);
      setIsProcessing(false);
      confirmSuccess({actionTitle : `Created new evidence`});
    }
    catch(e){
      confirmError({actionTitle : `Creating new evidence`});
    }  
  }

  const handleEvidenceEdit = (id: string) =>{
    const evidence = evidenceList.filter(ev => ev.id === id)[0];
    setSelectedEvidence(evidence);
    setEditId(id);
  }

  const handleOnEditReset = () => {
    setEditId(null);
  }

  const handleEvidenceUpdate = async (formData: evidenceFormData) =>{
    try{
      const response = await TaskEvidenceAPI.UpdateTaskEvidence(formData, editId as string);
      const updatedEvidence = response.taskEvidence;
      const updatedList = evidenceList.map(evidence =>{
        if(evidence.id === editId) return updatedEvidence;
        return evidence;
      });
      setEvidenceList(updatedList);
      confirmSuccess({actionTitle: `Updated evidence`});
    }catch(e){
      confirmError({actionTitle: `Updating evidence`});
    }  
  }

  const handleEvidenceDelete = async(id: string) => {
    try{
      const response = await TaskEvidenceAPI.DeleteTaskEvidence(id);
      setEvidenceList(evidenceList.filter(ev => ev.id !== id));
      confirmSuccess({actionTitle: `Evidence Deleted`});
    }
    catch(e){
      confirmError({actionTitle: `Deleting Evidence`});
    }
  }
  
  const fetchEvidence = async () =>{
    setIsLoading(true);
    const response = await TaskEvidenceAPI.getEvidenceByTask(parentTaskId);
    setEvidenceList(response.taskEvidences);
    setIsLoading(false);
  } 

  useEffect(() => {
    console.log(`TaskId : ${taskId}`);
    if(parentTaskId){
      fetchEvidence();
    }
  }, [parentTaskId])

  return (
    <div className='evidence-container my-5'>
      {editId ? (
        <UpdateEvidence
          data={selectedEvidence} 
          evidenceId={editId} 
          onSubmit = {handleEvidenceUpdate}
          onReset = {handleOnEditReset}
          />
      ) : (
        <CreateEvidence
          taskId={parentTaskId}
          isProcessing={isProcessing}
          onSubmit={handleEvidenceCreation}
        />
      )}
      <EvidenceList 
        data = {evidenceList}
        onDelete = {handleEvidenceDelete}
        onEdit = {handleEvidenceEdit}
        setEditId={setEditId} 
        isLoading={isLoading}
      />
    </div>
  );
};

export default EvidencePage;
