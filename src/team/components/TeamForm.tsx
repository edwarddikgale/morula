import React, { useState, useEffect } from 'react';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Checkbox, FormSectionContainer, TimeZoneSelect } from 'common/components/ui'; // assuming you have a similar component for form sections
import { Team } from '../types/Team'; // make sure to point to the correct model location

import '../styles/team-form.css';
import AnimatedButton from 'common/components/ui/AnimatedButton';

interface TeamFormProps {
  team?: Team;
  onSubmit: (data: Team) => void;
  onDelete?: (id: string) => void;
  onCancel?: () => void;
}

const TeamForm: React.FC<TeamFormProps> = ({ team, onSubmit, onDelete, onCancel }) => {
  const [teamName, setTeamName] = useState(team?.name || '');
  const [description, setDescription] = useState(team?.description || '');
  const [code, setCode] = useState(team?.code || '');
  const [isActive, setIsActive] = useState<boolean>(team?.isActive || false);
  const [dailyStartTime, setDailyStartTime] = useState(team?.dailyStartTime || '');
  const [dailyEndTime, setDailyEndTime] = useState(team?.dailyEndTime || '');
  const [timeZone, setTimeZone] = useState(team?.timeZone || 'America/New_York');
  const [language, setLanguage] = useState(team?.language || 'en');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTeam: Team = {
      ...team,
      name: teamName,
      description,
      code,
      isActive,
      dailyStartTime,
      dailyEndTime,
      timeZone,
      language,
      userId: team?.userId || '', // fill in from session or auth as needed
      createdAt: team?.createdAt || new Date(),
      updatedAt: new Date(),
      _id: team?._id || '',
    };
    onSubmit(updatedTeam);
  };

  const handleDelete = () => {
    if (team && team._id && onDelete) {
      onDelete(team._id);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <FormSectionContainer
          isHr={true}
          className="basic-info"
          icon={faInfoCircle}
          title="Team Information"
          description="Provide basic information about the team."
        >
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="teamName"
                  placeholder="Team Name"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  required
                />
                <label htmlFor="teamName">Team Name</label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="teamCode"
                  placeholder="Code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
                <label htmlFor="teamCode">Code</label>
              </div>
            </div>
          </div>

          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="teamDescription"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              required
            ></textarea>
            <label htmlFor="teamDescription">Description</label>
          </div>

          <div className="form-check mb-3">
            <Checkbox 
                label={'Active '} 
                checked={isActive}
                onChange={(checked:boolean) => setIsActive(checked)}            
            />
          </div>
        </FormSectionContainer>

        {/* Schedule Section */}
        <FormSectionContainer
          isHr={true}
          className="schedule"
          icon={faInfoCircle}
          title="Team Schedule"
          description="Specify the daily schedule and time zone."
        >
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="time"
                  className="form-control"
                  id="dailyStartTime"
                  value={dailyStartTime}
                  onChange={(e) => setDailyStartTime(e.target.value)}
                />
                <label htmlFor="dailyStartTime">Daily Start Time</label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="time"
                  className="form-control"
                  id="dailyEndTime"
                  value={dailyEndTime}
                  onChange={(e) => setDailyEndTime(e.target.value)}
                />
                <label htmlFor="dailyEndTime">Daily End Time</label>
              </div>
            </div>
          </div>

          <div className="form-floating mb-3">
            <TimeZoneSelect 
                    onChange={(e:any) => setTimeZone(e.target.value)} 
                    value={timeZone} 
                    className="form-floating mb-3"/>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="language"
              placeholder="Language"
              value={language || ''}
              onChange={(e) => setLanguage(e.target.value)}
            />
            <label htmlFor="language">Language</label>
          </div>
        </FormSectionContainer>

        <div className="d-flex justify-content-end mt-3">
          {onCancel &&   
            <button type="button" className="btn btn-warning me-3 py-3 px-4" onClick={onCancel}>
                Cancel
            </button>  
          }
          <AnimatedButton type="submit" className="btn btn-primary me-3">
            Save Team
          </AnimatedButton>
          {team && onDelete && (
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete Team
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TeamForm;
