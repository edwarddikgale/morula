import React, { useState } from 'react';
import { Action } from '../types';
import SearchBox from 'common/components/search/SearchBox';
import ActionList from "./Actions";

interface ActionListContainerProps {
  actionList: Action[];
  filteredActionList: Action[];
  searchQuery: string;
  //setSearchQuery: (query: string) => void;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteAction: (index: number) => void;
  handleEditAction: (index: number, item: Action) => void;
  handleCreateAction: (index: number, item: Action) => void;
}

const ActionListContainer: React.FC<ActionListContainerProps> = ({ actionList, filteredActionList, searchQuery, setSearchQuery, handleDeleteAction, handleEditAction, handleCreateAction }) => {
  return (
    <div>
      <SearchBox searchQuery={searchQuery} setSearchQuery={setSearchQuery} placeholder={"Search actions..."} />
      <ActionList
        data={searchQuery.length > 0 ? filteredActionList : actionList}
        onDeleteItem={handleDeleteAction}
        onEditItem={handleEditAction}
        onCreateItem={handleCreateAction}
      />
    </div>
  );
};

export default ActionListContainer;
