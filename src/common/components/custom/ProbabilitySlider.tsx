import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';

interface IProps{
    labelText: string,
    controlId: string,
    value: number,
    onChange: (newVal: number) => void
}

const ProbabilitySlider: React.FC<IProps> = ({labelText, controlId, value, onChange}: IProps) =>{
    return (
        <Form.Group controlId={controlId}>
            <Form.Label className="text-muted text-strong">{labelText || 'Probability'}</Form.Label>
            <Row className="align-items-center">
            <Col>
                <Form.Range
                min={0}
                max={100}
                step={1}
                value={value || 100}
                className="probability-slider"
                onChange={(e) => onChange(parseInt(e.target.value))}
                />
            </Col>
            <Col xs="auto" className="text-muted">
                {value || 100}%
            </Col>
            </Row>
      </Form.Group>
    )
}

export {ProbabilitySlider};