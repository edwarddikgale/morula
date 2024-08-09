import React, { useEffect, useState } from 'react';
import SdgPicker from './SdgPicker';
import './sdg-picker-container.css';
import useUserSDG from 'principles/hooks/userSDGs';
import { SdgHeader } from 'actions/types/Sdg';
import { sdgListGetter } from 'common/data/sdgListGetter';
import { SdgSelection } from './SdgSelection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';

interface SdgPickerContainerProps {
  onCancel: () => void;
  onApply: (sdg: number | undefined) => void;
  currentSdg: number;
}

const SdgPickerContainer: React.FC<SdgPickerContainerProps> = (props: SdgPickerContainerProps) => {
  const { onCancel, onApply, currentSdg } = props;
  const [sdg, setSdg] = useState<number>();
  const {userSDG, loading, error} = useUserSDG();
  const [sdgHeaders, setSdgHeaders] = useState<SdgHeader[] | undefined>();

  useEffect(() => {
      if(userSDG && !loading){
          const sdgHeaders = sdgListGetter(userSDG.sdgs);
          setSdgHeaders(sdgHeaders);
      }
  }, [userSDG]); // The empty dependency array ensures the effect runs only once on mount
   
  return (
    <div className="sdg-picker-container">
      <div className="sdg-picker-header">
        <h5>Selected AN SDG's For Generating Actions</h5>
      </div>
      <div className="sdg-picker-body">
        <SdgPicker 
          sdgHeaders={sdgHeaders}
          index={1}
          data={{Sdg: currentSdg} as SdgSelection}
          onSelectItem={(sdgVal) => setSdg(sdgVal)}
          key={{} as any}
        />
      </div>
      <div className="sdg-picker-footer d-flex justify-content-center mt-3 gap-2">
        <button className="btn btn-outline-danger py-3 px-4" onClick={onCancel}>
          <FontAwesomeIcon icon={faTimes} className="me-2" />
          Cancel
        </button>
        <button className="btn btn-outline-primary py-3 px-4" onClick={() => onApply(sdg)}>
          <FontAwesomeIcon icon={faCheck} className="me-2" />
          Apply
        </button>
      </div>
    </div>
  );
};

export default SdgPickerContainer;
