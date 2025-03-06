// ImpedimentList.tsx
import React, { useEffect, useState } from 'react';
import { Impediment } from '../types/Impediment';
import RoundNumber from 'common/components/ui/RoundNumber';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import LimitedCharacters from 'common/components/ui/LimitedCharacters';
import DeleteConfirmation from 'common/components/alert/DeleteConfirmation';
import TimeAgo from 'react-timeago';

import '../styles/impediment-list.css';

interface ImpedimentListProps {
  eventId?: string;
  impediments: Impediment[];
  eventData: any; // Replace with your EventFormData type if available
  onSelect: (impediment: Impediment) => void;
  onDelete: (impediment: Impediment) => void;
}

const ImpedimentList: React.FC<ImpedimentListProps> = ({
  impediments,
  onSelect,
  onDelete,
}) => {
  const [impedimentList, setImpedimentList] = useState<Impediment[]>(impediments || []);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<Impediment | undefined>();

  useEffect(() => {
    // Ensure we only keep non-null impediments
    setImpedimentList(impediments.filter(item => item !== null));
  }, [impediments]);

  const handleDeleteClick = (item: Impediment) => {
    setShowConfirmation(true);
    setSelectedItem(item);
    //onSelect(item);
  };

  const deleteItem = () => {
    if (selectedItem) {
      onDelete(selectedItem);
    }
    setShowConfirmation(false);
    setSelectedItem(undefined);
  };

  const handleEdit = (imp: Impediment) => {
    setSelectedItem(imp);
    onSelect(imp);
  };

  return (
    <div className="container">
      {impedimentList.map((imp, index) => (
        <div key={index} className="observation-entry mb-2" style={{ position: 'relative' }}>
          <RoundNumber text={`${index + 1}`} />
          <h6>{imp.title}</h6>
          <div className="impediment-notes">
            <LimitedCharacters text={imp.notes} limit={150} />
          </div>
          <p>
            <small>
              <strong>
                {imp.createdAt && <TimeAgo date={new Date(imp.createdAt)} />}
              </strong>
            </small>
          </p>
          <small className="impediment-title">{imp.type}</small>
          <small className="impediment-status ms-1">{imp.status || 'new'}</small>
          {/* Delete Icon */}
          <div className="ms-2">
            <FontAwesomeIcon
              icon={faTrash}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '5px',
                cursor: 'pointer',
                color: '#e05260',
              }}
              onClick={() => handleDeleteClick(imp)}
            />
          </div>
          {/* Edit Icon */}
          <div className="ms-2">
            <FontAwesomeIcon
              icon={faEdit}
              style={{
                position: 'absolute',
                bottom: '10px',
                right: '40px',
                cursor: 'pointer',
                color: '#6666ff',
              }}
              onClick={() => handleEdit(imp)}
            />
          </div>
        </div>
      ))}
      {showConfirmation && selectedItem && (
        <DeleteConfirmation
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          handleDelete={deleteItem}
          label=""
          item={{ name: selectedItem.title }}
        />
      )}
    </div>
  );
};

export default ImpedimentList;
