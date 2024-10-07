import React from 'react';
import { Action } from '../types/Action';
import { Button } from 'react-bootstrap';

interface ActionListProps {
  data: Action[];
  onDeleteItem: (index: number) => void;
  onEditItem: (index: number, item: Action) => void;
  onCreateItem: (index: number, item: Action) => void;
}

const Actions: React.FC<ActionListProps> = ({ data, onDeleteItem, onEditItem }) => {
  return (
    <div className="list-group">
      {data.map((item, index) => (
        <div key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <h5>{item.title}</h5>
            <p>{item.description}</p>
            <small>Created on: {item.createdOn? new Date(item.createdOn).toLocaleDateString(): 'Unknown'}</small>
          </div>
          <div>
            <Button
              variant="primary"
              className="me-2"
              onClick={() => onEditItem(index, item)}
            >
              Edit
            </Button>
            <Button variant="danger" onClick={() => onDeleteItem(index)}>
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

//export default ActionList;
export default Actions;
