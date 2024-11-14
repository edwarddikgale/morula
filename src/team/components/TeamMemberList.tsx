import React from 'react';
import { TeamMember } from '../types/TeamMember'; // Ensure this path is correct
import { Button, Spinner } from 'react-bootstrap';
import LimitedCharacters from 'common/components/ui/LimitedCharacters';
import RoundNumber from 'common/components/ui/RoundNumber';
import DeleteConfirmation from 'common/components/ui/DeleteConfirmation';
import { IonIcon } from '@ionic/react';
import { pencil } from 'ionicons/icons';

import '../styles/team-member-list.css';
import { Team } from 'team/types/Team';

interface TeamMemberListProps {
  data: TeamMember[];
  team: Team;
  onDeleteItem: (index: number) => void;
  onEditItem: (index: number, item: TeamMember) => void;
  isLoading?: boolean;
}

const TeamMemberList: React.FC<TeamMemberListProps> = ({ data, team, onDeleteItem, onEditItem, isLoading }) => {
  return (
    <>
        <div>
            <h5 className='mb-4'>( {data?.length} ) Team Members for team :: {team.name}</h5>
        </div>
        <div className="list-group my-3 ms-2">
            {(!data || data.length === 0) &&
                <div className="text-warning">This team currently has no members</div>
            }
            {data.map((member, index) => (
                <div key={member._id || `key-${index}`} className="list-group-item d-flex justify-content-between align-items-center mb-4 p-3 border rounded">
                    <RoundNumber text={`${index + 1}`} />
                    <div>
                        <h5>{member.firstName} {member.lastName}</h5>
                        <LimitedCharacters text={member.description} limit={100} />
                        <div className="team-member-details">
                        <p className="mb-0">
                            <strong>Nickname:</strong> {member.nickName || 'N/A'} &nbsp; | &nbsp;
                            <strong>Job Title:</strong> {member.jobTitle}
                        </p>
                        <p className="mb-0">
                            <strong>Status:</strong> {member.isActive ? 'Active' : 'Inactive'}
                        </p>
                        <p className="mb-0">
                            <strong>Work Start:</strong> {member.workStartTime} &nbsp; | &nbsp;
                            <strong>Work End:</strong> {member.workEndTime}
                        </p>
                        <p className="mb-0">
                            <strong>Time Zone:</strong> {member.timeZone} &nbsp; | &nbsp;
                            <strong>Language:</strong> {member.language || 'Not specified'}
                        </p>
                        </div>
                    </div>
                    <div>
                        <div className="d-flex justify-content-between mb-2 mr-2">
                        <div
                            className="custom-button"
                            onClick={() => onEditItem(index, member)}
                            title="Edit Team Member"
                        >
                            <IonIcon icon={pencil} className="custom-button-icon" />
                            <span className="small">Edit</span>
                        </div>
                        <DeleteConfirmation
                            index={index}
                            item={member}
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
    </>
  );
};

export default TeamMemberList;
