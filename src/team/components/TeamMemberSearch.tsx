import React, { useState, useEffect, useCallback } from "react";
import SearchInput from "common/components/search/SearchInput";
import { TeamMember } from 'team/types/TeamMember';
import debounce from "lodash.debounce";
import '../styles/team-member-search.css';

interface TeamMemberSearchProps{
    placeholder?: string
}

const TeamMemberSearch: React.FC<TeamMemberSearchProps> = ({placeholder}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<TeamMember[]>([]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Fetch team members based on search query
  const fetchTeamMembers = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setSearchResults([]);
        return;
      }

      try {
        const response = await fetch(`/team/member/find?query=${query}`);
        const data: TeamMember[] = await response.json();
        setSearchResults(data.slice(0, 5)); // Limit to 5 results
      } catch (error) {
        console.error("Error fetching team members:", error);
      }
    }, 500),
    []
  );

  useEffect(() => {
    fetchTeamMembers(searchQuery);
  }, [searchQuery, fetchTeamMembers]);

  return (
    <div className="team-member-search">
      {selectedMember ? (
        <div className="selected-member">
          <p>
            Selected: {selectedMember.firstName} {selectedMember.lastName}
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
