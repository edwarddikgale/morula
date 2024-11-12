import React, { useEffect, useRef, useState } from 'react';
import { TeamMemberSelect } from 'team/components/TeamMemberSelect';
import { teamMemberService } from 'team/services/teamMemberService';
import { TeamMember } from 'team/types/TeamMember';

interface IEventAttendeesProps{
    teamId: string
}   

const EventAttendees: React.FC<IEventAttendeesProps> = ({ teamId }) => {
    const [selectedMembers, setSelectedMembers] = useState<TeamMember[]>([]);
    const [teamMembers, setTeamMembers] = useState<TeamMember[] | null>(null);
    const dataFetchedRef = useRef(false);
  
    const fetchMembers = async (teamId: string) => {
      const response = await teamMemberService.getTeamMembers(teamId);
      setTeamMembers(response.teamMembers); // Fetch and set the team members
      console.log(`Members fetched as ${JSON.stringify(response.teamMembers)}`);
    };
  
    useEffect(() => {
      if (teamId && !dataFetchedRef.current) { // Only fetch if teamId is available and teamMembers is null
        fetchMembers(teamId);
        dataFetchedRef.current = true; 
      }
    }, [teamId]); // Dependency array with teamId and teamMembers
  
    const handleSelectChange = (selected: TeamMember[]) => {
      setSelectedMembers(selected);
    };

  return (
    <div>
      <h3>Team Member Selection</h3>
      {teamMembers &&   
        <TeamMemberSelect
            teamMembers={teamMembers}
            selectAllByDefault={true}
            onSelectChange={handleSelectChange}
        />
      }
    </div>
  );
};

export  {EventAttendees};
