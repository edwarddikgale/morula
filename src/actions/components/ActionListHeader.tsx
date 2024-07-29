import React, { useEffect } from 'react';
import { Accordion, Button, Col, Row } from 'react-bootstrap';
import './styles/action-list-header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSeedling, faCircleCheck, faInfoCircle, faTasks, faSyncAlt , faExclamationTriangle} from '@fortawesome/free-solid-svg-icons';
import { sdgListGetter } from 'common/data/sdgListGetter';
import { SdgHeader } from '../types/Sdg';
import { Link } from 'react-router-dom';
import { pageNames } from 'config/pageNames';

interface ActionListHeaderProps {
    sdg: number,
    eventId?: string,
    showDescription?: boolean,
    changeSdg: () => void,
    onShowMore: () => void,
    expand?: boolean,
    sdgHeader: SdgHeader | null,
    canChange: boolean
}

const ActionListHeader: React.FC<ActionListHeaderProps> = (props: ActionListHeaderProps): JSX.Element => {
    const { sdg, sdgHeader, changeSdg, showDescription, onShowMore, expand, eventId, canChange } = props;

    useEffect(() =>{
        console.log("SDG Header: " + JSON.stringify(sdgHeader));
    },[sdgHeader])    
    return (
        <div className="accordion-container">
            <Accordion defaultActiveKey={expand ? "0" : null} flush>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>
                        <h5>
                            {!sdgHeader && 
                            <div style={{ padding: "10px", fontSize: '1.05rem', color:'red' }}>
                                <p className="warning mb-1">
                                    <FontAwesomeIcon icon={faExclamationTriangle} className="me-3 text-warning" size="lg" />
                                    We recommend doing your materiality exercise to get more relevant actions for your event(s).
                                    Click for <Link to={pageNames.SDG_SELECTOR}>Materiality Excercise</Link>
                                </p>
                            </div>
                            }      
                            {sdgHeader && 
                            <span className="capitalized-text">
                                {sdgHeader?.title}:{" "} <FontAwesomeIcon icon={faSeedling} className="primary-color" color='green' /> {sdgHeader?.shortTitle}
                            </span>
                            }   
                            {sdgHeader && canChange &&
                            <div
                                className="btn btn-outline-secondary ms-2"
                                onClick={() => changeSdg()}
                                style={{ display: 'inline-block', cursor: 'pointer', fontSize:"0.8rem", marginTop: "0px" }}
                            >
                                <FontAwesomeIcon icon={faSyncAlt} className="me-2" />
                                <span className='small'>CHANGE...</span>
                            </div>
                            }
                        </h5>
                    </Accordion.Header>
                    {showDescription &&
                        <Accordion.Body>
                            <Row>
                                <Col md={8}>
                                    <h6 className="secondary">
                                        This platform will help you generate a list of actions to address the goal above:
                                    </h6>
                                </Col>
                            </Row>
                            <div className="card-text">
                                {sdgHeader?.goal}:
                                <div className='indicators'>
                                    {sdgHeader?.indicators.map((indicator) => (
                                        <Row key={indicator.index}>
                                            <Col xs="auto">
                                                <FontAwesomeIcon icon={faSeedling} style={{ color: 'gray' }} />
                                            </Col>
                                            <Col xs="auto">{indicator.index}</Col>
                                            <Col>{indicator.title}</Col>
                                        </Row>
                                    ))}
                                </div>

                                <div className='benefits'>
                                    <Row>
                                        <Col xs="auto">
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        </Col>
                                        <Col>
                                            Advance The Paris Agreement
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="auto">
                                            <FontAwesomeIcon icon={faCircleCheck} />
                                        </Col>
                                        <Col>
                                            Advance Race to Zero commitments
                                        </Col>
                                    </Row>
                                </div>
                            </div>
                        </Accordion.Body>
                    }
                    {!showDescription &&
                        <Accordion.Body>
                            <Row>
                                <Col md={12}>
                                    <div className="d-flex justify-content-center mt-3 gap-2">
                                        <Button
                                            variant="outline-primary"
                                            className='changeSdg'
                                            onClick={onShowMore}
                                        >
                                            <FontAwesomeIcon icon={faInfoCircle} className="me-2" />
                                            <span>Click for detailed instructions ...</span>
                                        </Button>
                                        {eventId &&
                                            <Link
                                                to={`${pageNames.ACTIONS_BOARD}?eventId=${eventId}`}
                                                className={`btn btn-outline-primary py-3 px-4`}
                                            >
                                                <FontAwesomeIcon icon={faTasks} className="me-2" />
                                                Work on the tasks
                                            </Link>
                                        }
                                    </div>
                                </Col>
                            </Row>
                        </Accordion.Body>
                    }
                </Accordion.Item>
            </Accordion>
        </div>
    );
};

export default ActionListHeader;
