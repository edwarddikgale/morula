import { LoaderPrimary } from 'common/components/Loader/Loader';
import { eventsAPI } from 'event/utils/API';
import React, { useEffect, useState } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine, faUsers, faCheckCircle, faExclamationCircle, faList, faBullseye, faEye, faHandshake, faHeart } from '@fortawesome/free-solid-svg-icons';
import './styles/sprint-summary.css';
import { SprintEvaluation } from './types/SprintEvaluation';
import PatternList from './PatternList';

const SprintSummary: React.FC<{ eventId?: string }> = ({ eventId }) => {
  const [summary, setSummary] = useState<SprintEvaluation | null>(null);

  useEffect(() => {
    const fetchSummary = async () => {
      if (!eventId) return;
      const result = await eventsAPI.getSprintSummary(eventId) as SprintEvaluation;
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
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faChartLine} className="icon-green" size="lg" />
              <Card.Title>Number of Events</Card.Title>
              <Card.Text className="fw-bold">{summary.eventCount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} className="icon-yellow" size="lg" />
              <Card.Title>Daily Average Attendance</Card.Title>
              <Card.Text className="fw-bold">{summary.attendance.dailyAverage}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} className="icon-green" size="lg" />
              <Card.Title>Retrospective Attendance</Card.Title>
              <Card.Text className="fw-bold">{summary.attendance.retro}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} className="icon-yellow" size="lg" />
              <Card.Title>Refinement Attendance</Card.Title>
              <Card.Text className="fw-bold">{summary.attendance.refinement}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faUsers} className="icon-red" size="lg" />
              <Card.Title>Review Attendance</Card.Title>
              <Card.Text className="fw-bold">{summary.attendance.review}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* Scrum Value Averages */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faCheckCircle} className="icon-green" size="lg" />
              <Card.Title>Commitment</Card.Title>
              <Card.Text className="fw-bold">
                {summary.scrumValueAverages.commitment !== null ? summary.scrumValueAverages.commitment : 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faBullseye} className="icon-blue" size="lg" />
              <Card.Title>Focus</Card.Title>
              <Card.Text className="fw-bold">
                {summary.scrumValueAverages.focus !== null ? summary.scrumValueAverages.focus : 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faEye} className="icon-purple" size="lg" />
              <Card.Title>Openness</Card.Title>
              <Card.Text className="fw-bold">
                {summary.scrumValueAverages.openness !== null ? summary.scrumValueAverages.openness : 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faHandshake} className="icon-orange" size="lg" />
              <Card.Title>Respect</Card.Title>
              <Card.Text className="fw-bold">
                {summary.scrumValueAverages.respect !== null ? summary.scrumValueAverages.respect : 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={2}>
          <Card className="text-center custom-card summary-count">
            <Card.Body>
              <FontAwesomeIcon icon={faHeart} className="icon-red" size="lg" />
              <Card.Title>Courage</Card.Title>
              <Card.Text className="fw-bold">
                {summary.scrumValueAverages.courage !== null ? summary.scrumValueAverages.courage : 'N/A'}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Design Patterns & Anti Patterns Side by Side */}
      <Row>
        <Col lg={6}>
          <PatternList 
            title="Top 5 Design Patterns" 
            patterns={summary.designPatterns} />
        </Col>
        <Col lg={6}>
          <PatternList 
            title="Top 5 Anti Patterns" 
            patterns={summary.antiPatterns} />
        </Col>
      </Row>

      {/* Hypothesis Summary */}
      <Row className="mb-4">
        <Col>
          <Card className="custom-card">
            <Card.Body>
              <FontAwesomeIcon icon={faList} className="icon-yellow" size="lg" />
              <Card.Title>Hypothesis Summary</Card.Title>
              <ul className="list-group styled-list">
                {false && summary?.hypothesisSummary && summary?.hypothesisSummary?.hypotheses.map((hyp: any, index: number) => (
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
          <Card className="custom-card">
            <Card.Body>
              <FontAwesomeIcon icon={faList} className="icon-green" size="lg" />
              <Card.Title>Note Summary</Card.Title>
              <ul className="list-group styled-list">
                {false && summary?.noteSummary && summary?.noteSummary?.notes.map((note: any, index: number) => (
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
