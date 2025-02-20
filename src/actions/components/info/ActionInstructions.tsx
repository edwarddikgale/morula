import React from 'react';
import { Link } from 'react-router-dom';
import { Col, Container, Row, Button } from 'react-bootstrap';
import '../styles/action-intro.css';
import instructionsImage from '../../assets/images/instructions-1.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleQuestion} from '@fortawesome/free-solid-svg-icons';
import { pageNames } from 'config/pageNames';

const ActionInstructions: React.FC = () => {
  return (
    <Container className="how-to-use">
      <Row className="justify-content-end">
        <Col className="col-2 offset-10 mb-2">
          <Link to={pageNames.HOME}>
            <Button variant="outline-secondary">Skip Instructions</Button>
          </Link>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={6}>
          <div>
            <h1>How to use this platform:</h1>
            <p className="smaller-text">
              Remember you are now part of a community co-creating a platform. This means what you will see next may not look perfect and could have glitches. But it is the perfect place for you to get involved!
            </p>
            <ul>
              <li><strong>GENERATE MORE ACTIONS:</strong> Press this button to get a choice of credible and create actions that you could take so your event advances sustainability commitments</li>
              <li><strong>ADD:</strong> Press this button if the action sounds relevant to YOUR specific event to add it to your list</li>
              <li><strong>CUSTOMISE:</strong> Press this button to tailor the action to YOUR specific event. Remember a benefit of this platform is you can download the list and share it with your suppliers, clients, or anyone else so you can tailor the action with information relevant to these stakeholders</li>
              <li><strong>REMOVE:</strong> Press this button if you don’t want this action on your list</li>
              <li><strong>SPECIAL ACTIONS:</strong> 
                Please note that if you see an action marked with this icon
                <FontAwesomeIcon icon={faFileCircleQuestion} color="green" />, it implies that the action has support material(s) associated with it, click on customise to view links to the materials.
              </li>
            </ul>
          </div>
        </Col>
        <Col xs={12} md={6}>
            <img src={instructionsImage} alt="Instructions Image" className="img-fluid" />
        </Col>
      </Row>
      <Row className='words-advice'>
        <Col>
          <p className='bold-italic d-none'>A few words of advice from initial co-creators Fiona Pelham and Eddie Dikgale:</p>
            <blockquote>
              “This platform has been created so that events are recognized as an engagement tool that can advance progress towards The Paris Agreement, Race to Zero commitments, and The United Nations Sustainable Development goals. We understand the creativity of the global event supply chain, and we hope this platform will be a resource to inspire and enable creativity that aligns with regulation, addresses greenwash, and advances sustainability”
            </blockquote>
          <p className="smaller-text d-none">
            Here is the advice to our first 1,000 curious users who will help shape the future of this platform:
          </p>
          <ul>
            <li>Press all the buttons - it's ok if you break something!</li>
            <li>Focus on a future event, share your action list with your client or supply chain and ask if this helps them</li>
            <li>Customize and Add your own actions should be your favorite sections - Over 50% of your list should be your own actions because YOUR event is unique (of course, you may be a supplier that delivers the same thing to the same place at the same time, but most of the event supply chain is constantly creating something new)</li>
            <li>Remove anything that isn’t useful - encourage yourself to use the remove button without double guessing yourself!</li>
          </ul>
          <p className="smaller-text">
            Finally, Thank You for participating with a global community of curious and collaborative event professionals keen to demonstrate how events are the way to advance progress and address the challenges of our time
          </p>
        </Col>
      </Row>
      <Row className="justify-content-end">
        <Col className="col-3 offset-9 mb-2">
          <Link to={pageNames.HOME}>
            <Button variant="outline-primary">Return To Welcome Page ...</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default ActionInstructions;
