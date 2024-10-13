import RoundNumber from 'common/components/ui/RoundNumber';
import { Hypothesis } from 'observation/types/ScrumAnalysis';
import React from 'react';

interface HypothesisListProps {
    hypotheses?: Hypothesis[];
}

const HypothesisList: React.FC<HypothesisListProps> = ({ hypotheses }) => {
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
                  </div>  
              </div>
            ))}
        </div>
        }
      </div>
    );
};

export  {HypothesisList};

