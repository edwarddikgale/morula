import { LoaderPrimary } from 'common/components/Loader/Loader';
import { eventsAPI } from 'event/utils/API';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import './styles/sprint-summary.css'; // Create a new CSS file for styling

const SprintSummary: React.FC<{ eventId?: string }> = ({ eventId }) => {
  const [summary, setSummary] = useState<any>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!eventId) return;
      const result = await eventsAPI.getSprintSummary(eventId);
      setSummary(result);
    };
    fetchSummary();
  }, [eventId]);

  if (!summary) return <LoaderPrimary />;

  return (
    <div className="container mt-5">
      {/* Attendance Stats */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Daily Average Attendance</Card.Title>
              <Card.Text className="fw-bold">{summary.attendance.dailyAverage}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Retro Attendance</Card.Title>
              <Card.Text className="fw-bold">{summary.attendance.retro}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Refinement Attendance</Card.Title>
              <Card.Text className="fw-bold">{summary.attendance.refinement}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title>Review Attendance</Card.Title>
              <Card.Text className="fw-bold">{summary.attendance.review}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Design Patterns & Anti Patterns Side by Side */}
      <Row className="mb-4">
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Top 5 Design Patterns</Card.Title>
              <ul className="list-group styled-list">
                {summary.designPatterns.map((dp: any, index: number) => (
                  <li key={index} className="list-group-item">
                    <span className="fw-bold">{dp.pattern.title}</span>: {dp.occurrences} times
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6}>
          <Card>
            <Card.Body>
              <Card.Title>Top 5 Anti Patterns</Card.Title>
              <ul className="list-group styled-list">
                {summary.antiPatterns.map((ap: any, index: number) => (
                  <li key={index} className="list-group-item">
                    <span className="fw-bold">{ap.pattern.title}</span>: {ap.occurrences} times
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Hypothesis Summary */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Hypothesis Summary</Card.Title>
              <ul className="list-group styled-list">
                {summary.hypothesisSummary.hypotheses.map((hyp: any, index: number) => (
                  <li key={index} className="list-group-item">
                    <strong>Summary:</strong> {hyp.summary}<br />
                    <strong>Root Cause:</strong> {hyp.rootCause}<br />
                    <strong>Impact:</strong> {hyp.impact}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Note Summary */}
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Note Summary</Card.Title>
              <ul className="list-group styled-list">
                {summary.noteSummary.notes.map((note: any, index: number) => (
                  <li key={index} className="list-group-item">
                    <strong>Note:</strong> {note.note}<br />
                    <strong>Explanation:</strong> {note.explanation}
                  </li>
                ))}
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export { SprintSummary };
