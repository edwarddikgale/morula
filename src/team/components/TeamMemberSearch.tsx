import React, { useState, useEffect, useCallback } from "react";
import SearchInput from "common/components/search/SearchInput";
import { TeamMember, TeamMemberBase } from 'team/types/TeamMember';
import debounce from "lodash.debounce";
import '../styles/team-member-search.css';
import useAuthUserId from "auth/hooks/useAuthUser";
import { teamMemberService } from "team/services/teamMemberService";

interface TeamMemberSearchProps{
    placeholder?: string,
    onSelectChange?: (member: TeamMember | null) => void,
    selectedMember?: TeamMemberBase
}

const TeamMemberSearch: React.FC<TeamMemberSearchProps> = ({placeholder, onSelectChange}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const userId = useAuthUserId();

  // Fetch team members based on search query
  const fetchTeamMembers = useCallback(
    debounce(async (userId: string, query: string) => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await teamMemberService.getPossibleTeamMembers(userId, query);
        const data: TeamMember[] = response.teamMembers;
        setSearchResults(data.slice(0, 5)); // Limit to 5 results
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    if(userId){
        fetchTeamMembers(userId, searchQuery);
    }
  }, [userId, searchQuery, fetchTeamMembers]);

  const handleMemberSelect = (member: TeamMember | null) => {
    setSelectedMember(member);
    if(onSelectChange){
        onSelectChange(member);
    }
  }

  return (
    <div className="team-member-search">
      {selectedMember ? (
        <div className="selected-member">
          <p>
            Owner: {selectedMember.firstName} {selectedMember.lastName}
          </p>
          <button onClick={() => setSelectedMember(null)}>Cancel</button>
        </div>
      ) : (
        <div className="search-container">
          <SearchInput 
            onSearch={setSearchQuery} 
            placeholder={placeholder || "Search team members..."}
           />
          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((member) => (
                <li key={member._id} onClick={() => setSelectedMember(member)}>
                  {member.firstName} {member.lastName} ({member.nickName}) - {member.jobTitle}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export { TeamMemberSearch };
