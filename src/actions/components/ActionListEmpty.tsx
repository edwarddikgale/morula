import React, { useEffect, useState } from 'react';
import { Card, Col, Container, Row } from "react-bootstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComputerMouse} from '@fortawesome/free-solid-svg-icons';
import './styles/action-list-empty.css';

interface ActionListEmptyProps{
  sdg: number | undefined
}
const ActionListEmpty: React.FC<ActionListEmptyProps> = (props: ActionListEmptyProps) => {
    const {sdg} = props;
    const cardStyle = {
        border: '4px solid white',
        margin: '20px 0',
        borderRadius: '25px', 
        backgroundColor: "#e6f0dd",
        
    };

    return (
      <Container>
        <Row>
          <Col className="col-12 col-md-12 p-2 d-flex justify-content-center">
            <Card className="background-primary p-1" style={cardStyle}>
              <Card.Body className="p-2">
                <h6 className="card-subtitle mb-2 text-muted">
                Start to create a list of actions which you can share with your supply chain, client or others in your stakeholder commmunity 
                </h6>
                <div className="click-intructions">
                  <h6>
                    so you can demonstrate how your event will advance progress to acheiving Sustainable Development Goal {sdg}
                  </h6>
                  <div>
                    <Row>
                      <Col xs={1}>
                        <FontAwesomeIcon icon={faComputerMouse} />
                      </Col>
                      <Col>
                        Press Generate Actions to get new, creative ideas based on best practice.
                      </Col>
                    </Row>
                    <Row>
                      <Col xs={1}>
                        <FontAwesomeIcon icon={faComputerMouse} />
                      </Col>
                      <Col>
                        Press Add My Action to add your own ideas.
                      </Col>
                    </Row>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
  
  export { ActionListEmpty };