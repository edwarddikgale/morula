import React, { useEffect, useState } from 'react';
import { ProbabilitySlider } from 'common/components/custom/ProbabilitySlider';
import RoundNumber from 'common/components/ui/RoundNumber';
import { Hypothesis } from 'observation/types/ScrumAnalysis';

import './styles/hypothesis-list.css';
import { Checkbox } from 'common/components/ui/Checkbox';

interface HypothesisListProps {
    hypotheses?: Hypothesis[];
    selectable: boolean;
    onSelectionChange?: (selectedList: Hypothesis[]) => void;
}

const cleanList = (list?: Hypothesis[]) =>{
  return list?.filter(hyp => (hyp && hyp !== null)) || []
}

const HypothesisList: React.FC<HypothesisListProps> = ({ hypotheses = [], selectable, onSelectionChange }) => {
    const [selected, setSelected] = useState<Hypothesis[]>([]);
    const [hypothesisList, setHypothesisList] = useState<Hypothesis[]>(cleanList(hypotheses));


    useEffect(() => {
      setHypothesisList(cleanList(hypotheses));
    }, [hypotheses])
    
    const handleProbabilityChange = (index:number, value:number) =>{}
    const handleCheckChange = (checked: boolean, index: number) =>{
      let currentSelection = [...selected];
      if(checked && hypotheses){
        currentSelection.push(hypotheses[index]);
      }
      else{
        currentSelection.splice(index, 1);
      }

      setSelected(currentSelection);
      if(onSelectionChange){
        onSelectionChange(currentSelection);
      }
    }
    
    return (
      <div className="hypothesis-list">
        <h3 className="mb-4">Hypotheses ({hypotheses?.length || 0})</h3>
        {hypotheses &&
        <div>
            {hypothesisList.map((item, index) => (
              <div key={index} className="list-group-item mb-4 p-3 border rounded">
                  <RoundNumber text={`${index + 1}`} />
                  <div>
                    <div className='d-flex w-100'>
                      <div className='w-75'>
                        <h5 className="hypothesis-title mb-2">{item.hypothesis}</h5>
                        {/*
                        <small className='ms-auto'>
                          <i className='muted'>Created</i>: 
                          <strong>{item. && <TimeAgo date={new Date(item.createdAt)} />} </strong> 
                          on {item.createdAt? new Date(item.createdAt).toLocaleDateString(): 'Unknown'}
                        </small>
                        */}
                      </div>
                      {selectable &&
                        <div className='d-flex justify-content-end align-items-center w-25'>
                          <Checkbox 
                            label={''} 
                            checked={false} 
                            onChange={(checked) => handleCheckChange(checked, index)}
                            borderStyle='dark-bordered'
                            />
                        </div>
                      }    
                    </div>
                    <p className="hypothesis-explanation text-muted">{item.explanation}</p>
                    <div className='probability'>
                      <ProbabilitySlider 
                        labelText={'Likelyhood'} 
                        controlId={`prob-slider-${index}`} 
                        value={item.probability} 
                        onChange={(newVal:number) => handleProbabilityChange (index, newVal)}                      
                      />
                    </div> 
                  </div>  
              </div>
            ))}
        </div>
        }
      </div>
    );
};

export  {HypothesisList};

