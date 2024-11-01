import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import { Team } from '../types/Team';
import { teamMemberService } from '../services/teamMemberService';
import '../styles/team-page.css';
import TeamMemberList from 'team/components/TeamMemberList';
import { TeamMember } from 'team/types/TeamMember';
import TeamMemberForm from './TeamMemberForm';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { pageNames } from 'config/pageNames';

export interface TeamMemberContainerProps{
    team: Team,
    userId: string,
    onClickBack?: () => void
}

const TeamMemberContainer: React.FC<TeamMemberContainerProps> = ({team, userId, onClickBack}: TeamMemberContainerProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedTeamMember, setSelectedTeamMember] = useState<TeamMember | null>(null);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  
  const fetchTeamMembers = async (teamId:string) => {
    const fetchedTeams = await teamMemberService.getTeamMembers(teamId);
    setTeamMembers(fetchedTeams.teamMembers);
  };

  useEffect(() => {
    if(!userId && !team) return;
    fetchTeamMembers(team._id!);
  }, [userId, team]);

  const handleCreateClick = () => {
    if(!userId) return;
    setSelectedTeamMember({teamIds: [team._id!]} as TeamMember)
    setIsFormVisible(true);
  };

  const handleEdit = (index: number, member: TeamMember) => {
    setSelectedTeamMember(member);
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (member: TeamMember) => {
    if(!userId) return;

    if (member._id) {
      // Update existing team
      await teamMemberService.updateTeamMember(member._id, member);
    } else {
      // Create new team
      delete member._id;
      await teamMemberService.createTeamMember(member);
    }
    setIsFormVisible(false);
    const updatedTeamMembers = await teamMemberService.getTeamMembers(team._id!);
    setTeamMembers(updatedTeamMembers.teamMembers);
  };

  const handleDelete = async (index: number) => {
    if(!userId && !team._id) return;

    const memberToDelete = teamMembers[index];
    await teamMemberService.deleteMember(memberToDelete._id!);
    const updatedTeamMembers = await teamMemberService.getTeamMembers(team._id!);
    setTeamMembers(updatedTeamMembers.teamMembers);
  };

  return (
    <Container className="team-page mt-5">
      
        <div>
            {!isFormVisible ? (
                <>
                <Row className="mb-2">
                    <Col>
                        <h3 className="fw-bold">Team Members</h3>
                        <Button variant="secondary-border-outline" onClick={onClickBack}>
                            <FontAwesomeIcon icon={faChevronLeft} /> {" "}
                            Back To Teams
                        </Button>
                    </Col>
                    <Col className="text-end">
                        <Button variant="primary" onClick={handleCreateClick}>
                            + Add Team Member
                        </Button>
                    </Col>
                </Row>
                <TeamMemberList 
                    team={team} 
                    data={teamMembers} 
                    onEditItem={handleEdit} 
                    onDeleteItem={handleDelete} 
                    />
                </>
            ) : (
                selectedTeamMember &&
                    <TeamMemberForm
                        member={selectedTeamMember}
                        onSubmit={handleFormSubmit}
                        onCancel={() => setIsFormVisible(false)}
                />
            )}
        </div>
        
    </Container>
  );
};

export default TeamMemberContainer;
