import React, { useEffect, useState } from "react";
import impedimentTypes from "../data/impedimentTypes.json";
import impedimentStatus from "../data/impedimentStatus.json";
import { Impediment } from "../types/Impediment";
import { LoaderSm } from "common/components/Loader/Loader";
import { TeamMemberSearch } from "team/components/TeamMemberSearch";
import { TeamMember } from "team/types";
import { teamMemberService } from "team/services/teamMemberService";

interface ImpedimentCreateProps {
  onCreate?: (impediment: Impediment) => void;
  onCancel: () => void;
  onUpdate?: (impediment: Impediment) => void;
  impediment?: Impediment;
}

const ImpedimentCreate: React.FC<ImpedimentCreateProps> = ({ onCreate, onCancel, onUpdate, impediment }) => {
  const [id, setId] = useState(impediment?._id || undefined);
  const [title, setTitle] = useState(impediment?.title || "");
  const [notes, setNotes] = useState(impediment?.notes || "");
  const [type, setType] = useState(impediment?.type || "");
  const [status, setStatus] = useState(impediment?.status || "");
  const [ownerId, setOwnerId] = useState(impediment?.ownerId || "");
  const [owner, setOwner] = useState<TeamMember | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchOwner = async (ownerId: string) => {
    try{
      const response = await teamMemberService.getTeamMember(ownerId);
      setOwner(response.teamMember);
    }
    catch(e){}
  }

  useEffect(() => {
    if(impediment && impediment.ownerId && impediment.ownerId.length > 0){
      fetchOwner(impediment.ownerId);
    }
  }, [impediment])

  const handleSubmit = () => {
    if(id && onUpdate && impediment){
      onUpdate({...impediment, title, notes, type, status, ownerId, updatedAt: new Date()});
    }

    if (!id && onCreate && title && type) {
      onCreate({
          title, notes, type, status, createdAt: new Date(), updatedAt: new Date(), eventId: "",
          ownerId: ownerId, creatorId: ""
      });
      setTitle("");
      setNotes("");
      setType("");
      setStatus("")
    }
  
  };

  const handleImpedimentOwnerChange = (member: TeamMember | null) => {
    console.log(`(member?._id || "" : ${member?._id || ""} `);
    setOwnerId(member?._id || "");
  }

  return (
    <div className="impediment-create mb-4 p-3 border rounded">
      <h5>Add Impediment</h5>
      <div className="mb-3">
        <select className="form-select" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="">Select Type</option>
          {impedimentTypes.map((impType) => (
            <option key={impType.code} value={impType.code}>
              {impType.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">Select Status</option>
          {impedimentStatus.map((status:any) => (
            <option key={status.value} value={status.value}>
              {status.title}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <TeamMemberSearch 
          placeholder="Select Impediment Owner" 
          selected={owner}
          onSelectChange={handleImpedimentOwnerChange}
          />
      </div>
      <div className='text-end pb-4'>
        <button className="btn btn-secondary py-2 px-4" type="button" onClick={onCancel}>
            Cancel
        </button>
        {onCreate &&
          <button className="btn btn-primary ms-2 py-2 px-4" onClick={handleSubmit}>
              Add Impediment
              {isLoading && <LoaderSm />}
          </button>
        }
        {onUpdate &&
          <button className="btn btn-primary ms-2 py-2 px-4" onClick={handleSubmit}>
              Update Impediment
              {isLoading && <LoaderSm />}
          </button>
        }
      </div>


    </div>
  );
};

export default ImpedimentCreate;
