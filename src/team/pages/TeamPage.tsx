import React, { useState, useEffect } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';
import TeamList from '../components/TeamList';
import TeamForm from '../components/TeamForm';
import { Team } from '../types/Team';
import { teamService } from '../services/teamService';
import '../styles/team-page.css';
import useAuthUserId from 'auth/hooks/useAuthUser';
import TeamMemberContainer from 'team/components/TeamMemberContainer';

const TeamPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isMembersVisible, setIsMembersVisible] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  //Currently logged in user
  const userId = useAuthUserId();
  
  useEffect(() => {
    if(!userId) return;
    const fetchTeams = async () => {
      const fetchedTeams = await teamService.getTeams(userId);
      setTeams(fetchedTeams.teams);
    };
    fetchTeams();
  }, [userId]);

  const handleCreateClick = () => {
    if(!userId) return;
    setSelectedTeam({userId: userId} as Team)
    setIsFormVisible(true);
  };

  const handleEditTeam = (index: number, team: Team) => {
    setSelectedTeam(team);
    setIsFormVisible(true);
  };

  const handleFormSubmit = async (team: Team) => {
    if(!userId) return;

    if (team._id) {
      // Update existing team
      await teamService.updateTeam(team._id, team);
    } else {
      // Create new team
      delete team._id;
      await teamService.createTeam(team);
    }
    setIsFormVisible(false);
    const updatedTeams = await teamService.getTeams(userId);
    setTeams(updatedTeams.teams);
  };

  const handleDeleteTeam = async (index: number) => {
    if(!userId) return;

    const teamToDelete = teams[index];
    await teamService.deleteTeam(teamToDelete._id!);
    const updatedTeams = await teamService.getTeams(userId);
    setTeams(updatedTeams.teams);
  };

  const handleViewMembers = (team: Team) =>{   
    setSelectedTeam(team); 
    setIsMembersVisible(true);
    setIsFormVisible(false);
  }

  const handleHideMembers = () =>{
    console.log(`Hiding Memebers`);
    setIsMembersVisible(false);
    setIsFormVisible(false);
  }

  return (
    <Container className="team-page mt-5">
        {!isMembersVisible &&
            <div>
                {!isFormVisible ? (
                    <>
                    <Row className="mb-4">
                        <Col>
                            <h3 className="fw-bold">Teams</h3>
                        </Col>
                        <Col className="text-end">
                        <Button variant="primary" onClick={handleCreateClick}>
                            + Create Team
                        </Button>
                        </Col>
                    </Row>
                    <TeamList 
                        data={teams} 
                        onEditItem={handleEditTeam} 
                        onDeleteItem={handleDeleteTeam} 
                        onViewMembers={handleViewMembers}
                        />
                    </>
                ) : (
                    selectedTeam &&
                        <TeamForm
                            teams={teams}
                            team={selectedTeam}
                            onSubmit={handleFormSubmit}
                            onCancel={() => setIsFormVisible(false)}
                    />
                )}
            </div>
        }
        {isMembersVisible && userId && selectedTeam && 
            <>
                <TeamMemberContainer 
                    team={selectedTeam} 
                    userId={userId} 
                    onClickBack={handleHideMembers}
                />
            </>
        }
    </Container>
  );
};

export default TeamPage;
