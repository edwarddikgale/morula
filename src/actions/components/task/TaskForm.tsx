import React, { useState } from "react";
import { Textbox } from 'common/components/ui/Textbox';
import { Dropdown } from "common/components/ui/Dropdown"; 
import { ActionTask } from "actions/types/task";
import { LoaderSm } from "common/components/Loader/Loader";
import AnimatedButton from "common/components/ui/AnimatedButton";

interface TaskFormProps {
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  taskDescription: string;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  selectedStatusValue: string;
  setSelectedStatusValue: React.Dispatch<React.SetStateAction<string>>;
  onSubmit: () => void;
  onCancel: () => void;
  onSuggestTask?: () => Promise<ActionTask>;
  submitButtonText: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  selectedStatusValue,
  setSelectedStatusValue,
  onSubmit,
  onCancel,
  onSuggestTask,
  submitButtonText
}) => {
  const [suggestionLoading, setSuggestionLoading] = useState<boolean>(false);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedStatusValue(value);
  };

  const handleClear = () => {
    setTaskTitle("");
    setSelectedStatusValue("new");
  };

  const handleGetSuggestion = async () => {
    if (onSuggestTask) {
      setSuggestionLoading(true);
      const task = await onSuggestTask();
      setTaskTitle(task.title);
      setSelectedStatusValue(task.status);
      setSuggestionLoading(false);
    }
  }

  const statusOptions = [
    { value: 'new', label: 'New' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'done', label: 'Done' },
  ];

  return (
    <div>
      {suggestionLoading && <LoaderSm />}  
      <Textbox 
        className="form-control"
        id="taskTitle"
        placeholder="Type your task summary"
        required
        value={taskTitle}
        onChange={e => setTaskTitle(e.target.value)}
        isLoading={suggestionLoading}
        labelText="Task Summary"
      />

      <div className='my-3'>
        <Dropdown
          value={selectedStatusValue}
          onChange={handleSelectChange}
          options={statusOptions}
          id="status"
          htmlFor="status"
          labelText="Select action status"
        />
      </div>

      <textarea 
        className="form-control"
        id="taskDescription"
        placeholder="Type your task description or notes here"
        required
        value={taskDescription}
        onChange={e => setTaskDescription(e.target.value)}
        style={{ minHeight: `${5   * 1.5}em` }}
      />

      <div className=''>
        {onSuggestTask && (
          <button type='button' className='btn btn-outline-secondary btn-round  btn-sm ms-3' onClick={handleGetSuggestion}>
            + Get Suggestion
            {suggestionLoading && <LoaderSm />}
          </button>
        )}
        <button type='button' className='btn btn-warning btn-sm ms-3' onClick={onCancel}>
          Cancel
        </button>
        <button onClick={onSubmit} type='button' className='d-none btn btn-primary btn-sm ms-3'>
          {submitButtonText}
        </button>
        <AnimatedButton onClick={onSubmit} type="button" className="btn btn-primary btn-sm ms-3">
          {submitButtonText}
        </AnimatedButton>
      </div>
    </div>
  );
};

export default TaskForm;
