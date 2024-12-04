import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

interface ContextForAiProps<T> {
  value: T; // Generic type to support flexible input
  onReEvaluate: (value: T) => void;
}

const ContextForAi = <T extends { context: string }>({
  value,
  onReEvaluate,
}: ContextForAiProps<T>) => {
  const [contextText, setContextText] = useState(value.context);
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setIsChanged(contextText !== value.context);
  }, [contextText, value.context]);

  const handleReEvaluate = () => {
    if (isChanged) {
      onReEvaluate({ ...value, context: contextText });
    }
  };

  return (
    <div className="d-flex align-items-center">
      <Form.Control
        as="textarea"
        value={contextText}
        onChange={(e) => setContextText(e.target.value)}
        placeholder="Provide context or explanation"
        className="me-3"
        style={{ minHeight: "4rem" }}
      />
      <Button
        onClick={handleReEvaluate}
        disabled={!isChanged}
        variant="primary"
        className="ms-3"
      >
        Re-Evaluate
      </Button>
    </div>
  );
};

export  {ContextForAi};
