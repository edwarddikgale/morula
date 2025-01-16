import React, { useEffect, useRef, useState } from 'react';
import { TeamMemberSelect } from 'team/components/TeamMemberSelect';
import { teamMemberService } from 'team/services/teamMemberService';
import { TeamMember } from 'team/types/TeamMember';

interface IEventAttendeesProps{
    teamId: string,
    readonly?: boolean,
    onSelectMembers?: (members: TeamMember[]) => void,
    selectedMemberIds: Set<string>
}   

const EventAttendees: React.FC<IEventAttendeesProps> = ({ onSelectMembers, selectedMemberIds, teamId, readonly = false }) => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);
    const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);

    const dataFetchedRef = useRef(false);
  
    const fetchMembers = async (teamId: string) => {
      const response = await teamMemberService.getTeamMembers(teamId);
      setTeamMembers(response.teamMembers?.filter(tm => tm.isActive)); // Fetch and set the team members
      setSelectedMembers([...response.teamMembers.filter(member => selectedMemberIds.has(member._id!))]);
    };
  
    useEffect(() => {
      if (teamId && !dataFetchedRef.current) { // Only fetch if teamId is available and teamMembers is null
        fetchMembers(teamId);
        dataFetchedRef.current = true; 
      }
    }, [teamId]); // Dependency array with teamId and teamMembers
  
    const handleSelectChange = (selected: TeamMember[]) => {
      setSelectedMembers(selected);
      if(onSelectMembers){ onSelectMembers(selected); }
    };

  return (
    <div>
      {!readonly && <h3>Team Member Selection</h3>}
      {teamMembers &&   
        <TeamMemberSelect
            teamMembers={teamMembers}
            selectAllByDefault={true}
            onSelectChange={handleSelectChange}
            selectedMemberIds={selectedMemberIds}
            readonly={readonly}
        />
      }
    </div>
  );
};

export  {EventAttendees};
