import React, { useState } from 'react';
import { Form, Row, Col } from "react-bootstrap";
import "../styles/hypothesis-list.css";
import { ProbabilitySlider } from 'common/components/custom/ProbabilitySlider';

interface Hypothesis {
  hypothesis: string;
  explanation: string;
  probability: number;
}

interface HypothesisListProps {
  hypotheses: Hypothesis[];
  onUpdate: (index:number, hypothesis: Hypothesis) => void
}

const HypothesisList: React.FC<HypothesisListProps> = ({ hypotheses, onUpdate }) => {
  const [hypothesisData, setHypothesisData] = useState(hypotheses);
  
  const handleProbabilityChange = (index: number, newProbability: number) => {
    const updatedHypotheses = hypothesisData.map((hypothesis, i) =>
      i === index ? { ...hypothesis, probability: newProbability } : hypothesis
    );
    setHypothesisData(updatedHypotheses);
    onUpdate(index, updatedHypotheses[index]);
  }

  return (
    <div className="hypothesis-list container mt-4">
      <h3 className="mb-4">Hypotheses</h3>
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
        </div>
      ))}
    </div>
  );
};

export default HypothesisList;
