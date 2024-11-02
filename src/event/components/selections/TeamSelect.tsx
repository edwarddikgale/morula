import React from 'react';
import { Team } from 'team/types/Team';

interface TeamSelectProps {
  teams: Team[];
  selectedTeamId: string | null;
  onSelectChange: (teamId: string) => void;
}

const TeamSelect: React.FC<TeamSelectProps> = ({ teams, selectedTeamId, onSelectChange }) => {
  
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectChange(event.target.value);
  };

  return (
    <div className='form-floating'>
      <select
        className='form-select'
        id='TeamSelect'
        aria-label='Select a Team'
        value={selectedTeamId || ''}
        onChange={handleSelectChange}
      >
        <option value=''>Select Team...</option>
        {teams.map((team) => (
          <option key={team._id} value={team._id}>
            {team.name}
          </option>
        ))}
      </select>
      <label htmlFor='TeamSelect'>Team</label>
    </div>
  );
};

export default TeamSelect;
