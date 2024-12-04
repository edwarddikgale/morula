import React from "react";
import TaskForm from './TaskForm';

interface IProps {
  taskTitle: string;
  setTaskTitle: React.Dispatch<React.SetStateAction<string>>;
  taskDescription: string;
  setTaskDescription: React.Dispatch<React.SetStateAction<string>>;
  selectedStatusValue: string;
  setSelectedStatusValue: React.Dispatch<React.SetStateAction<string>>;
  handleEditTask: () => void;
  onCancel: () => void;
}

const EditTask: React.FC<IProps> = ({
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  selectedStatusValue,
  setSelectedStatusValue,
  handleEditTask,
  onCancel
}) => {
  return (
    <TaskForm
      taskTitle={taskTitle}
      setTaskTitle={setTaskTitle}
      taskDescription={taskDescription}
      setTaskDescription={setTaskDescription}
      selectedStatusValue={selectedStatusValue}
      setSelectedStatusValue={setSelectedStatusValue}
      onSubmit={handleEditTask}
      onCancel={onCancel}
      submitButtonText="Update"
    />
  );
};

export default EditTask;
