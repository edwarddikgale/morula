import React, { useState } from 'react';
import { Action, UserAction } from '../types';
import SearchBox from 'common/components/search/SearchBox';
import ActionList from "./ActionList";
import ActionButtons from './ActionButtons';

interface ActionListContainerProps {
  actionList: UserAction[];
  filteredActionList: UserAction[];
  searchQuery: string;
  isLoadingActions: boolean;
  isCreating: boolean;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteAction: (index: number) => void;
  handleEditAction: (index: number, item: Action) => void;
  handleCreateAction: (index: number, item: Action) => void;
  handleCreateCustomAction: () => void;
  generateActions: () => void;
}

const ActionListContainer: React.FC<ActionListContainerProps> = ({ 
  actionList, 
  filteredActionList, 
  searchQuery, 
  isLoadingActions,
  isCreating,
  generateActions,
  setSearchQuery, 
  handleDeleteAction, 
  handleEditAction, 
  handleCreateAction,
  handleCreateCustomAction }) => {

  return (
    <div className='mb-2'>
      <div className='row'>
        <div className="col-8">
          <SearchBox 
            searchQuery={searchQuery} 
            setSearchQuery={setSearchQuery} 
            placeholder={"Search actions..."} />
        </div>
        <div className='col-4 d-flex justify-content-end'>
          <ActionButtons
            getActions={generateActions}
            createCustomAction={handleCreateCustomAction}
            isLoading={isLoadingActions}
            actionList={actionList}
            hideExport={true} />
        </div>
      </div>
        
      <ActionList
        data={searchQuery.length > 0 ? filteredActionList : actionList}
        onDeleteItem={handleDeleteAction}
        onEditItem={handleEditAction}
        onCreateItem={handleCreateAction}
        isCreating={isCreating}
      />
    </div>
  );
};

export default ActionListContainer;
