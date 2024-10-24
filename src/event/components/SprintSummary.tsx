import React from 'react';

const SprintSummary = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        {/* Attendance Stats */}
        <div className="col-md-3">
          <div className="bg-primary text-white p-3 rounded text-center">
            Daily Average Attendance: <span className="fw-bold">9.25</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-primary text-white p-3 rounded text-center">
            Retro Attendance: <span className="fw-bold">14</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-primary text-white p-3 rounded text-center">
            Refinement Attendance: <span className="fw-bold">11</span>
          </div>
        </div>
        <div className="col-md-3">
          <div className="bg-primary text-white p-3 rounded text-center">
            Review Attendance: <span className="fw-bold">27</span>
          </div>
        </div>
      </div>

      {/* Top 3 Design Patterns */}
      <div className="p-4 mt-4 rounded">
        <h5 className="fw-bold">Top 3 Design Patterns (Team Scrum Strengths)</h5>
        <ul className="list-group">
          <li className="list-group-item">Everyone on time: 9 times</li>
          <li className="list-group-item">Team is very focused: 7 times</li>
        </ul>
      </div>

      {/* Top 3 Anti Patterns */}
      <div className="p-4 mt-4 rounded">
        <h5 className="fw-bold">Top 3 Anti Patterns (Team Scrum Weaknesses)</h5>
        <ul className="list-group">
          <li className="list-group-item">Team not discussing impediments: 6 times</li>
          <li className="list-group-item">Team lacks direction: 6 times</li>
          <li className="list-group-item">Overcrowded: 10 times</li>
        </ul>
      </div>

      {/* Top 5 General Observations */}
      <div className="p-4 mt-4 rounded">
        <h5 className="fw-bold">Top 5 General Observations</h5>
        <ul className="list-group">
          {/* Add your observations here */}
          <li className="list-group-item">Observation 1</li>
          <li className="list-group-item">Observation 2</li>
          <li className="list-group-item">Observation 3</li>
          <li className="list-group-item">Observation 4</li>
          <li className="list-group-item">Observation 5</li>
        </ul>
      </div>

      {/* Top 3 Hypotheses */}
      <div className="p-4 mt-4 rounded">
        <h5 className="fw-bold">Top 3 Hypotheses</h5>
        <ul className="list-group">
          {/* Add your hypotheses here */}
          <li className="list-group-item">Hypothesis 1</li>
          <li className="list-group-item">Hypothesis 2</li>
          <li className="list-group-item">Hypothesis 3</li>
        </ul>
      </div>

      {/* Top 3 Recommended Actions */}
      <div className="p-4 mt-4 rounded">
        <h5 className="fw-bold">Top 3 Recommended Actions</h5>
        <ul className="list-group">
          {/* Add your recommended actions here */}
          <li className="list-group-item">Action 1</li>
          <li className="list-group-item">Action 2</li>
          <li className="list-group-item">Action 3</li>
        </ul>
      </div>
    </div>
  );
};

export  {SprintSummary};
