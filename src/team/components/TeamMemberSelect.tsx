import React, { useState, useEffect, useRef } from 'react';
import { Checkbox } from 'common/components/ui'; // Assuming Checkbox is located in this path
import { TeamMember } from 'team/types/TeamMember';

interface TeamMemberSelectProps {
  teamMembers: TeamMember[];
  selectedMemberIds?: Set<string>;
  selectAllByDefault?: boolean;
  onSelectChange: (selectedMembers: TeamMember[]) => void;
  readonly?:boolean;
}

const TeamMemberSelect: React.FC<TeamMemberSelectProps> = ({ teamMembers, selectedMemberIds, selectAllByDefault = false, readonly = false, onSelectChange }) => {
  // State to track selected members as a Set of strings (IDs)
  const [selectedMembers, setSelectedMembers] = useState<Set<string>>(selectedMemberIds || new Set());
  const [members, setMembers] = useState<TeamMember[]>(!readonly? teamMembers: teamMembers.filter(member => selectedMemberIds?.has(member._id!)));
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);
  // useRef to track the state of data fetching or selection
  const isSelectionInitialized = useRef(false); // Ref to prevent initial effect from causing loop

  const updateAndRaiseSelection = (selectedMemberIds: Set<string>) =>{
    setSelectedMembers(selectedMemberIds);
    onSelectChange(members.filter(member => selectedMemberIds.has(member._id!)));
  }
  // Handle change when a checkbox is toggled
  const handleSelectChange = (id: string, checked: boolean) => {
    const updatedSelectedMembers = new Set(selectedMembers);
    if (checked) {
      updatedSelectedMembers.add(id);
    } else {
      updatedSelectedMembers.delete(id);
    }

    updateAndRaiseSelection(updatedSelectedMembers);
  };

  // Handle the select all or unselect all checkbox
  const handleSelectAllChange = (checked: boolean) => {
    const updatedSelectedMembers = new Set<string>();
    if (checked) {
      members.forEach((member) => updatedSelectedMembers.add(member._id!));
    }

    updateAndRaiseSelection(updatedSelectedMembers);
  };

  // Update the parent with the selected members whenever selection changes
  useEffect(() => {
    // Only execute this logic if the selection is initialized (to avoid infinite loop)
    if (isSelectionInitialized.current) {
      const selected = members.filter((member) => selectedMembers.has(member._id!));
      onSelectChange(selected);
    } else {
      // Mark the selection as initialized
      isSelectionInitialized.current = true;
    }
  }, [members]);


  useEffect(() =>{
    // Determine if all members are selected
    const allSelected = members.every((member) =>
      [...selectedMembers].includes(member._id!) // Convert Set to array and check inclusion
    );

    setIsAllSelected(allSelected);
  }, [selectedMembers]);

  return (
    <div className="team-member-select">
      {/* Select All Checkbox */}
      <div className="row mb-3">
        {!readonly &&
        <div className="col-12">
          <Checkbox
            label="Select All"
            checked={isAllSelected}
            onChange={handleSelectAllChange}
            readonly={readonly}
          />
        </div>
        }
      </div>

      {/* Team Member List */}
      <div className="row mb-3">
        <div className="col-12 list-group">
        
          {members.map((member, index) => {
            const fullName = `${member.firstName} ${member.lastName}`;
            const isSelected = selectedMembers.has(member._id!); // Check if the member is selected
            
            return (
              <div className="row list-group-item d-flex justify-content-between align-items-center mb-1 p-3 border rounded" key={member._id || `key-${index}`}>
                <div className="col-1">
                  <Checkbox
                    label=""
                    checked={isSelected}
                    onChange={(checked) => handleSelectChange(member._id!, checked)}
                    readonly={readonly}
                  />
                </div>
                <div className="col-3">
                  {member.nickName}
                </div>
                <div className="col-5">
                  {fullName}
                </div>
                <div className="col-3">
                  {member.jobTitle}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export { TeamMemberSelect };
