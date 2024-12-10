import React from 'react';
import { Team } from '../types/Team'; // Ensure this path is correct
import { Button, Spinner } from 'react-bootstrap';
import DeleteConfirmation from 'common/components/ui/DeleteConfirmation';
import LimitedCharacters from 'common/components/ui/LimitedCharacters';
import RoundNumber from 'common/components/ui/RoundNumber';
import { IonIcon } from '@ionic/react';
import { pencil, peopleCircleOutline } from 'ionicons/icons';

import '../styles/team-list.css';

interface TeamListProps {
  data: Team[];
  onDeleteItem: (index: number) => void;
  onEditItem: (index: number, item: Team) => void;
  onViewMembers: (item: Team) => void;
  isLoading?: boolean;
}

const TeamList: React.FC<TeamListProps> = ({ data, onDeleteItem, onEditItem, onViewMembers, isLoading }) => {
  return (
    <div className="list-group my-3 ms-2">
      {(!data || data.length === 0) &&
        <div className="text-warning">You currently have no teams setup.</div>
      }
      {data.map((team, index) => (
        <div key={team._id || `key-${index}`} className="list-group-item d-flex justify-content-between align-items-center mb-4 p-3 border rounded">
          <RoundNumber text={`${index + 1}`} />
          <div>
            <h5>{team.name}</h5>
            <LimitedCharacters text={team.description} limit={100} />
            <div className="team-details">
              <p className="mb-0">
                <strong>Parent:</strong> {team.parentName} &nbsp; | &nbsp;
                <strong>Code:</strong> {team.code} &nbsp; | &nbsp;
                <strong>Status:</strong> {team.isActive ? 'Active' : 'Inactive'}
              </p>
              <p className="mb-0">
                <strong>Daily Start:</strong> {team.dailyStartTime} &nbsp; | &nbsp;
                <strong>Daily End:</strong> {team.dailyEndTime}
              </p>
              <p className="mb-0">
                <strong>Time Zone:</strong> {team.timeZone} &nbsp; | &nbsp;
                <strong>Language:</strong> {team.language || 'Not specified'}
              </p>
            </div>
          </div>
          <div>
            <div className="d-flex justify-content-between mb-2 mr-2">
              <div
                className="custom-button"
                onClick={() => onViewMembers(team)}
                title="View Team Members"
                >
                <IonIcon icon={peopleCircleOutline} className="custom-button-icon" />
                <span className="small">Members ( {team.memberCount || 0} )</span>
              </div>  
              <div
                className="custom-button"
                onClick={() => onEditItem(index, team)}
                title="Edit Team"
              >
                <IonIcon icon={pencil} className="custom-button-icon" />
                <span className="small">Edit</span>
              </div>
              <DeleteConfirmation
                index={index}
                item={team}
                label="Delete"
                buttonIsCustom={true}
                onDelete={() => onDeleteItem(index)}
              />
              {isLoading && (
                <Spinner animation="border" variant="light" size="sm" className="custom-spinner" />
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamList;
