import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import { Sdg, SdgHeader } from '../../types/Sdg';
import { SdgSelection } from './SdgSelection';
import { sdgListGetter } from 'common/data/sdgListGetter';

interface SdgPickerProps {
    index: number | null,
    data: SdgSelection;
    onSelectItem: (sdg:number) => void;
    key:number;
    sdgHeaders?: SdgHeader[] | undefined;
  }

  const SdgPicker = (props: SdgPickerProps) => {
    const {index, data, onSelectItem, sdgHeaders} = props;
    const initialFormData: SdgSelection = {Sdg: 13, SdgId: 'SDG-13', IndicatorIds: []};
    const [formData, setFormData] = useState<SdgSelection>({
        ...(data || initialFormData)
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        onSelectItem(parseInt(value));
    };

    return (
        <div className='p-3'>
            <form>
                <p className='mb-4'>
                    The Agile Principle you select below is the one that will be used to generate
                    recommended actions for your event including tasks from both our curated database and
                    our AI model
                </p>
                <div className="form-floating mb-3">
                    <select
                        className="form-select"
                        id="selectedSDG"
                        name="selectedSDG"
                        value={formData.SdgId}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Select ...{data.Sdg}</option>
                        {sdgHeaders?.map((sdgHeader, index) => (
                            <option     
                                key={index} 
                                value={sdgHeader.id}
                                selected={data.Sdg === sdgHeader.id}
                                >
                                {sdgHeader.title}
                            </option>
                        ))}
                    </select>
                    <label htmlFor="selectedSDG">Select An Agile Principle</label>
                </div>
            </form>       
        </div>
      );
  }

export default SdgPicker;  
