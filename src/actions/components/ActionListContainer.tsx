import React, { useState } from 'react';
import { Action } from '../types';
import SearchBox from 'common/components/search/SearchBox';
import ActionList from "./Actions";
import ActionButtons from './ActionButtons';

interface ActionListContainerProps {
  actionList: Action[];
  filteredActionList: Action[];
  searchQuery: string;
  isLoadingActions: boolean;
  isCreating: boolean;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  handleDeleteAction: (index: number) => void;
  handleEditAction: (index: number, item: Action) => void;
  handleCreateAction: (index: number, item: Action) => void;
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
  handleCreateAction }) => {
  const createCustomAction = () => {}
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
            createCustomAction={createCustomAction}
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
