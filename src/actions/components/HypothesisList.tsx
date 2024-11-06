import React from 'react';
import { ProbabilitySlider } from 'common/components/custom/ProbabilitySlider';
import RoundNumber from 'common/components/ui/RoundNumber';
import { Hypothesis } from 'observation/types/ScrumAnalysis';

import './styles/hypothesis-list.css';

interface HypothesisListProps {
    hypotheses?: Hypothesis[];
}

const HypothesisList: React.FC<HypothesisListProps> = ({ hypotheses }) => {
    const handleProbabilityChange = (index:number, value:number) =>{}
    return (
      <div className="hypothesis-list">
        <h3 className="mb-4">Hypotheses ({hypotheses?.length || 0})</h3>
        {hypotheses &&
        <div>
            {hypotheses.map((item, index) => (
              <div key={index} className="list-group-item d-flex justify-content-between align-items-center mb-4 p-3 border rounded">
                  <RoundNumber text={`${index + 1}`} />
                  <div>
                    <h5 className="hypothesis-title mb-2">{item.hypothesis}</h5>
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

