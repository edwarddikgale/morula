import React, { useEffect, useState } from 'react';
import "../styles/hypothesis-list.css";
import { ProbabilitySlider } from 'common/components/custom/ProbabilitySlider';
import { Hypothesis } from 'observation/types/ScrumAnalysis';

interface HypothesisListProps {
  hypotheses: Hypothesis[];
  onUpdate: (index:number, hypothesis: Hypothesis) => void
}

const cleanList = (list?: Hypothesis[]) =>{
  return list?.filter(hyp => (hyp && hyp !== null)) || []
}

const HypothesisList: React.FC<HypothesisListProps> = ({ hypotheses, onUpdate }) => {
  const [hypothesisData, setHypothesisData] = useState(cleanList(hypotheses));
  
  console.log(hypothesisData);
  // Synchronize hypothesisData with hypotheses prop
  useEffect(() => {
    if(hypotheses){
      setHypothesisData(cleanList(hypotheses));
    }
  }, [hypotheses]);

  const handleProbabilityChange = (index: number, newProbability: number) => {
    const updatedHypotheses = hypothesisData.map((hypothesis, i) =>
      i === index ? { ...hypothesis, probability: newProbability } : hypothesis
    );
    console.log(updatedHypotheses);
    setHypothesisData(updatedHypotheses);
    onUpdate(index, updatedHypotheses[index]);
  }

  const handleContextChange = (index: number, newContext: string) => {
    const updatedHypotheses = hypothesisData.map((hypothesis, i) =>
      i === index ? { ...hypothesis, context: newContext } : hypothesis
    );
    console.log(updatedHypotheses);
    setHypothesisData(updatedHypotheses);
    onUpdate(index, updatedHypotheses[index]);
  }

  return (
    <div className="hypothesis-list container mt-4">
      <h3 className="mb-4">Hypotheses ( {hypotheses?.length} )</h3>
      {hypothesisData.map((item, index) => (
        <div key={index} className="hypothesis-item mb-4 p-4 border rounded shadow-sm">
          <h5 className="hypothesis-title mb-2">{item.hypothesis}</h5>
          <p className="hypothesis-explanation text-muted">{item.explanation}</p>
          <div>
            <ProbabilitySlider 
              labelText={'Likelyhood'} 
              controlId={`probability-slider-${index}`} 
              value={item.probability || 100} 
              onChange={(newVal: number) => handleProbabilityChange(index, newVal)}            
            />
          </div>
          {/* Context */}
          <div className='form-floating mb-3'>
              <textarea
                className='form-control'
                id={`hypothesisContext-${index}`}
                placeholder='Provide hypothesis context/explanation if needed'
                value={item.context}
                style={{ minHeight: `${2   * 1.5}em` }}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleContextChange(index, e.target.value)}
              />
              <label htmlFor={`hypothesisContext-${index}`}>
                Further Context <span className='text-warning'> ? </span>
              </label>
            </div> 
        </div>
      ))}
      
    </div>
  );
};

export default HypothesisList;
