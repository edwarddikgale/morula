import React, { useState } from 'react';
import { faUser, faClock, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { Checkbox, FormSectionContainer, TimeZoneSelect } from 'common/components/ui'; // assuming you have this component for sections
import { TeamMember } from '../types/TeamMember'; // make sure to point to the correct model location

import '../styles/team-form.css';

interface TeamMemberFormProps {
  member?: TeamMember;
  onSubmit: (data: TeamMember) => void;
  onDelete?: (id: string) => void;
  onCancel?: () => void
}

const TeamMemberForm: React.FC<TeamMemberFormProps> = ({ member, onSubmit, onDelete, onCancel }) => {
  const [firstName, setFirstName] = useState(member?.firstName || '');
  const [lastName, setLastName] = useState(member?.lastName || '');
  const [nickName, setNickName] = useState(member?.nickName || '');
  const [jobTitle, setJobTitle] = useState(member?.jobTitle || '');
  const [description, setDescription] = useState(member?.description || '');
  const [isActive, setIsActive] = useState<boolean>(member?.isActive || true);
  const [workStartTime, setWorkStartTime] = useState(member?.workStartTime || '');
  const [workEndTime, setWorkEndTime] = useState(member?.workEndTime || '');
  const [timeZone, setTimeZone] = useState(member?.timeZone || 'America/New_York');
  const [language, setLanguage] = useState(member?.language || 'en');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedMember: TeamMember = {
      ...member,
      firstName,
      lastName,
      nickName,
      jobTitle,
      description,
      isActive,
      workStartTime,
      workEndTime,
      timeZone,
      language,
      teamIds: member?.teamIds || [],
      createdAt: member?.createdAt || new Date(),
      updatedAt: new Date(),
      _id: member?._id || '',
    };
    onSubmit(updatedMember);
  };

  const handleDelete = () => {
    if (member && member._id && onDelete) {
      onDelete(member._id);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <FormSectionContainer
          isHr={true}
          className="basic-info"
          icon={faUser}
          title="Personal Information"
          description="Provide basic information about the team member."
        >
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <label htmlFor="firstName">First Name</label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                <label htmlFor="lastName">Last Name</label>
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="nickName"
                  placeholder="Nickname"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
                <label htmlFor="nickName">Nickname</label>
              </div>
            </div>
          </div>

          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="jobTitle"
              placeholder="Job Title"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
            />
            <label htmlFor="jobTitle">Job Title</label>
          </div>

          <div className="form-floating mb-3">
            <textarea
              className="form-control"
              id="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            ></textarea>
            <label htmlFor="description">Description</label>
          </div>

          <div className="form-check mb-3">
            <Checkbox 
                label={'Active'} 
                checked={false}
                onChange={(checked:boolean) => setIsActive(checked)}            
            />
          </div>
        </FormSectionContainer>

        {/* Work Schedule Section */}
        <FormSectionContainer
          isHr={true}
          className="work-schedule"
          icon={faClock}
          title="Work Schedule"
          description="Specify the working hours and time zone for the team member."
        >
          <div className="row g-2 mb-3">
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="time"
                  className="form-control"
                  id="workStartTime"
                  value={workStartTime}
                  onChange={(e) => setWorkStartTime(e.target.value)}
                />
                <label htmlFor="workStartTime">Work Start Time</label>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="form-floating">
                <input
                  type="time"
                  className="form-control"
                  id="workEndTime"
                  value={workEndTime}
                  onChange={(e) => setWorkEndTime(e.target.value)}
                />
                <label htmlFor="workEndTime">Work End Time</label>
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
            <button type="button" className="btn btn-warning me-3 py-3" onClick={onCancel}>
              Cancel
            </button>
          }
          <button type="submit" className="btn btn-primary me-3">
            Save Team Member
          </button>
          {member && onDelete && (
            <button type="button" className="btn btn-danger" onClick={handleDelete}>
              Delete Team Member
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default TeamMemberForm;
