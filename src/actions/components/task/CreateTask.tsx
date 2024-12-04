import React from "react";
import { Action } from "actions/types/Action";
import { UserProfile } from "profile/types/profile";
import { Event } from "event/types/Event";
import { ActionTask } from "actions/types/task";
import TaskForm from './TaskForm';

interface IProps {
  userProfile: UserProfile | null,
  event: Event | null,
  action: Action;
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  taskDescription: string;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  selectedStatusValue: string;
  setSelectedStatusValue: React.Dispatch<React.SetStateAction<string>>;
  onCreateTask: () => void;
  onCancel: () => void;
  onSuggestTask: () => Promise<ActionTask>;
}

const CreateTask: React.FC<IProps> = ({
  userProfile,
  event,
  action,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  selectedStatusValue,
  setSelectedStatusValue,
  onCreateTask,
  onCancel,
  onSuggestTask
}) => {
  return (
    <div>
      <TaskForm
        taskTitle={taskTitle}
        setTaskTitle={setTaskTitle}
        taskDescription={taskDescription}
        setTaskDescription={setTaskDescription}
        selectedStatusValue={selectedStatusValue}
        setSelectedStatusValue={setSelectedStatusValue}
        onSubmit={onCreateTask}
        onCancel={onCancel}
        onSuggestTask={onSuggestTask} submitButtonText={"+ Create"}      />
    </div>
  );
};

export default CreateTask;
