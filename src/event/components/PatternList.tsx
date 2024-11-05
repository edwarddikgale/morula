import React from 'react';
import { Card } from 'react-bootstrap';

interface PatternListProps {
  title: string;
  patterns: { [key: string]: number };
  //patterns: PatternOccurrence[]
}

const PatternList: React.FC<PatternListProps> = ({ title, patterns }) => {
  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <ul className="list-group styled-list">
          {Object.entries(patterns).map(([key, occurrences], index) => (
            <li key={index} className="list-group-item">
              <span className="fw-bold">{key.replace(/_/g, ' ')}</span>: {occurrences} times
            </li>
          ))}
        </ul>
      </Card.Body>
    </Card>
  );
};

export default PatternList;
