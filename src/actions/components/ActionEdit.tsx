import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { UserAction } from "../types/UserAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import "./styles/action-edit.css"; // Import the CSS file for styling
import { Button, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreateTask from "./task/CreateTask";
import { ActionTask } from "../types/task";
import EditTask from "./task/EditTask";
import DeleteConfirmation from "../../common/components/alert/DeleteConfirmation";
import { actionTaskAPI } from "actions/utils/taskAPI";
import TaskList from "./task/TaskList";
import { UserProfile } from "profile/types/profile";
import { Event } from "event/types/Event";
import openAiTasks from "actions/utils/openAiTasks";
import { LoaderPrimary } from "common/components/Loader/Loader";

interface ActionEditProps {
  userProfile: UserProfile | null,
  event: Event | null,
  data: UserAction;
  index: number | null;
  onUpdate: (index: number | null, data: UserAction) => void;
  onDelete: (index: number) => void;
  onCancel: () => void;
}

const ActionEdit: React.FC<ActionEditProps> = (props: ActionEditProps) => {
  
  const { userProfile, event, index, data, onUpdate, onCancel, onDelete } = props;
  const [canDelete, setCanDelete] = useState<boolean>(index && index === -1 ? false : true);

  // Task start
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [taskDescription, setTaskDescription] = useState<string>("");
  const [selectedStatusValue, setSelectedStatusValue] = useState<string>("new");
  const [editId, setEditId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string>();
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isEvidenceOpen, SetIsEvidenceOpen] = useState(false); 

  const [taskList, setTaskList] = useState<ActionTask[]>([]);
  const [tasksLoading, setTasksLoading] = useState<boolean>(false);
  const [taskId, setTaskId] = useState<string>("");
  const [showTaskCreate, setShowTaskCreate] = useState<boolean>(false);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState<boolean>(false);

  useEffect(() => {
    setIsTaskFormOpen(editId !== null || showTaskCreate);
  }, [editId, showTaskCreate]);

  //Fetch task list under this action
  const handleTasksFetch = async() => {
    setTasksLoading(true);
    const response = await actionTaskAPI.getTasksByAction(data.id as string);
    if(response){
      setTaskList(response.records);
    }
    setTimeout(() => setTasksLoading(false), 500);
  };

  const handleTaskDelete = (taskId: string) =>{
    setShowConfirmation(true);
    setDeleteId(taskId);
  };

  const handleTaskEdit = (taskId: string) =>{
    setEditId(taskId);
  };

  const handleOpenEvidence = (taskId: string) =>{
    SetIsEvidenceOpen(true);
  };

  useEffect(() => {
    if(data && data.id != null){
      handleTasksFetch();
    }
  }, [])

  useEffect(() => {
    if (editId) {
      const task = taskList.find((task) => task.id === editId);
      if (task) {
        setTaskTitle(task.title);
        setTaskDescription(task.description || "");
        setSelectedStatusValue(task.status);
      }
    }
  }, [editId]);

  // task end
  const initialFormData: UserAction = {
    userId: null,
    id: null,
    title: "",
    description: "",
    requirement: "Recommended",
    actionType: "Experiment",
    frequency: "NA",
    piResource: "",
    resourceUrl: "",
    source: "",
    sdg: null,
  };

  const [formData, setFormData] = useState<UserAction>({
    ...(data || initialFormData),
    requirement: data?.requirement || "Recommended",
    frequency: data?.frequency || "NA",
    actionType: data?.actionType || "Experiment"
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    /*setFormData(prevFormData => {
            if(prevFormData.hasOwnProperty(name)){
                return { ...formData, [name]: value };
            }
            return prevFormData;
        });*/
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(index, formData);
  };

  const handleDelete = () => {
    if (canDelete && index) onDelete(index);
  };

  const handleSuggesTask = async () : Promise<ActionTask> =>{
    const response = await openAiTasks.getActionTask(userProfile, event, data, taskList);
    return response;
  }

  // Task start
  const handleCreateTask = async () => {
    if (taskTitle === "" || selectedStatusValue === "") {
      return;
    }

    const response = await actionTaskAPI.CreateActionTask({
      actionId: data.id!,
      title: taskTitle,
      description: taskDescription,
      status: selectedStatusValue,
      assignedToId: data.id || undefined,
      createdById: data.id || undefined
    });

    const newTask = response.actionTask;
    setTaskList([...taskList, newTask]);

    setTaskTitle("");
    setSelectedStatusValue("new");
    setShowTaskCreate(false);
  };

  const deleteTask = async () => {
    const taskToDelete = {...taskList.filter((task) => task.id === deleteId)[0]};
    const updatedTaskList = taskList.filter((task) => task.id !== deleteId);
    setTaskList(updatedTaskList);
    setShowConfirmation(false);
    setDeleteId(undefined);
    const response: any = await actionTaskAPI.DeleteActionTask(taskToDelete.id!);
  };

  const handleEditTask = async () => {
    if (taskTitle === "" || selectedStatusValue === "") {
      return;
    }

    const response = await actionTaskAPI.UpdateActionTask({
      actionId: data.id!,
      title: taskTitle,
      description: taskDescription,
      status: selectedStatusValue,
      assignedToId: data.id || undefined,
      createdById: data.id || undefined
    }, editId as string);

    const updatedTask = response.actionTask;
    const updatedTaskList = taskList.map((task) => {
      if (task.id === editId) {
        return {
          ...task,
          title: updatedTask.title,
          description: updatedTask.description,
          status: updatedTask.status,
        };
      }
      return task;
    });

    setTaskList(updatedTaskList);
    setEditId(null);
    setTaskTitle("");
    setTaskDescription("");
    setSelectedStatusValue("");
  };

  // Task end

  return (
    <>
      <div className='p-3'>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <h4>{`${data.id? "Update": "Create"}`} your action</h4>
          </div>
          <div className='mb-3'>
            <div className='row'>
              <div className='col'>
                <label className='form-label fw-bold'>Is this action Recommended or Required?</label>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='btn-group' role='group' aria-label='actionType'>
                  <input
                    type='radio'
                    className='btn-check'
                    id='radioExperiment'
                    name='actionType'
                    value='Experiment'
                    checked={formData.actionType === "Experiment"}
                    onChange={handleInputChange}
                    required
                  />
                  <label className='btn btn-outline-warning' htmlFor='radioExperiment'>
                    Experiment
                  </label>

                  <input
                    type='radio'
                    className='btn-check'
                    id='radioConcrete'
                    name='actionType'
                    value='Concrete'
                    checked={formData.actionType === "Concrete"}
                    onChange={handleInputChange}
                    required
                  />
                  <label className='btn btn-outline-warning' htmlFor='radioConcrete'>
                    Concrete
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className='mb-3'>
            <label className='form-label'>
              <span className='fw-bold'>Title</span>
              <p className='small explainer'>i.e. "One line summary of your action"</p>
            </label>
            <input
              type='text'
              className='form-control'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              required
              minLength={1}
              maxLength={255}
            />
          </div>
          <div className='mb-3'>
            <label className='form-label'>
              <span className='fw-bold'>Description</span>
              <p className='small explainer'>i.e. "Few line summary of how you will take this action"</p>
            </label>
            <textarea
              className='form-control'
              name='description'
              value={formData.description}
              onChange={handleInputChange}
              minLength={0}
              maxLength={1000}
            />
          </div>
          <div className='mb-3'>
            <div className='row'>
              <div className='col'>
                <label className='form-label fw-bold'>Is this action Recommended or Required?</label>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='btn-group' role='group' aria-label='requirement'>
                  <input
                    type='radio'
                    className='btn-check'
                    id='radioSuggested'
                    name='requirement'
                    value='Recommended'
                    checked={formData.requirement === "Recommended"}
                    onChange={handleInputChange}
                    required
                  />
                  <label className='btn btn-outline-warning' htmlFor='radioSuggested'>
                    Recommended
                  </label>

                  <input
                    type='radio'
                    className='btn-check'
                    id='radioRequired'
                    name='requirement'
                    value='Required'
                    checked={formData.requirement === "Required"}
                    onChange={handleInputChange}
                    required
                  />
                  <label className='btn btn-outline-warning' htmlFor='radioRequired'>
                    Required
                  </label>
                </div>
              </div>
            </div>
          </div>
          {formData.piResource && (
            <div className='mb-3'>
              <div className='row'>
                <div className='col'>
                  <label className='form-label'>
                    <span className='fw-bold'>Resources</span>
                    <p className='small explainer'>
                      i.e. "Clicking on the button below will take you to the resources"
                    </p>
                  </label>
                </div>
              </div>
              <div className='row'>
                <div className='col'>
                  <div className='btn-group' role='group' aria-label='resources'>
                    <Button
                      variant='btn btn-outline-primary me-2'
                      as={Link as any}
                      to={formData.resourceUrl}
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faCircleInfo} />
                      &nbsp; {formData.piResource}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className='mb-3'>
            <div className='row'>
              <div className='col'>
                <label className='form-label'>
                  <span className='fw-bold'>Frequency</span>
                  <p className='small explainer'>i.e. "How often should this be done"</p>
                </label>
              </div>
            </div>
            <div className='row'>
              <div className='col'>
                <div className='btn-group' role='group' aria-label='frequency'>
                  <input
                    type='radio'
                    className='btn-check'
                    id='radioNA'
                    name='frequency'
                    value='NA'
                    checked={formData.frequency === "NA"}
                    onChange={handleInputChange}
                  />
                  <label className='btn btn-outline-warning' htmlFor='radioNA'>
                    N.A
                  </label>
                  <input
                    type='radio'
                    className='btn-check'
                    id='radioDaily'
                    name='frequency'
                    value='Daily'
                    checked={formData.frequency === "Daily"}
                    onChange={handleInputChange}
                  />
                  <label className='btn btn-outline-warning' htmlFor='radioDaily'>
                    Daily
                  </label>

                  <input
                    type='radio'
                    className='btn-check'
                    id='radioWeekly'
                    name='frequency'
                    value='Weekly'
                    checked={formData.frequency === "Weekly"}
                    onChange={handleInputChange}
                  />
                  <label className='btn btn-outline-warning' htmlFor='radioWeekly'>
                    Weekly
                  </label>

                  <input
                    type='radio'
                    className='btn-check'
                    id='radioMonthly'
                    name='frequency'
                    value='Monthly'
                    checked={formData.frequency === "Monthly"}
                    onChange={handleInputChange}
                  />
                  <label className='btn btn-outline-warning' htmlFor='radioMonthly'>
                    Monthly
                  </label>

                  <input
                    type='radio'
                    className='btn-check'
                    id='radioYearly'
                    name='frequency'
                    value='Yearly'
                    checked={formData.frequency === "Yearly"}
                    onChange={handleInputChange}
                  />
                  <label className='btn btn-outline-warning' htmlFor='radioYearly'>
                    Yearly
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Task */}

          <div className='task-section p-2 mt-4' style={{display: formData.id ? '' : 'none'}}>
            <p className='fw-bold px-2 mt-2 ms-2'>
                ( {taskList.length} ) TASKS
                <button type='button' className='btn btn-outline-primary btn-sm ms-3' onClick={() => setShowTaskCreate(true)}>
                  + Add Task
                </button>
            </p>

            {tasksLoading && <LoaderPrimary />}

            {taskList && taskList.length > 0 && <ProgressBar now={(taskList.filter(t => t.status === "done").length /taskList.length)*100} />}
            
            <TaskList 
                taskList = {taskList}
                onOpenEvidence = {handleOpenEvidence}
                onEdit = {handleTaskEdit}
                onDelete = {handleTaskDelete}
            />

            {editId ? (
              <>
                <pre>{editId}</pre>
                <EditTask
                  taskTitle={taskTitle}
                  setTaskTitle={setTaskTitle}
                  taskDescription={taskDescription}
                  setTaskDescription={setTaskDescription}
                  selectedStatusValue={selectedStatusValue}
                  setSelectedStatusValue={setSelectedStatusValue}
                  handleEditTask={handleEditTask}
                  onCancel={() => setEditId(null)}
                />
              </>
            ) : (
              <div className="">
                {showTaskCreate &&
                  <CreateTask
                    action={data}
                    userProfile={userProfile}
                    event={event}
                    taskTitle={taskTitle}
                    setTaskTitle={setTaskTitle}
                    taskDescription={taskDescription}
                    setTaskDescription={setTaskDescription}
                    selectedStatusValue={selectedStatusValue}
                    setSelectedStatusValue={setSelectedStatusValue}
                    onCreateTask={handleCreateTask}
                    onSuggestTask={handleSuggesTask}
                    onCancel={() => {setShowTaskCreate(false)}}
                  />
                }
              </div>
            )}
          </div>
     
          {!isTaskFormOpen &&
            <div className='d-flex justify-content-center gap-3 mt-4 pb-4 my-4'>
              <button onClick={onCancel} type='button' className='btn btn-outline-warning py-3 px-4'>
                Cancel
              </button>
              <button onClick={handleDelete} className={`btn btn-danger py-3 px-4 ${canDelete ? "d-none" : ""}`}>
                Delete
              </button>
              <button type='submit' className='btn btn-primary py-3 px-4'>
                Submit
              </button>
            </div>
         }
        </form>
      </div>

      {showConfirmation && (
        <DeleteConfirmation
          showConfirmation={showConfirmation}
          setShowConfirmation={setShowConfirmation}
          handleDelete={deleteTask}
          label=''
          item={""}
        />
      )}
      {/* 
      <RightOverlay 
        onClose={() => SetIsEvidenceOpen(false)}
        isOpen={isEvidenceOpen}
        children={
          <div>
              {isEvidenceOpen && (
              <EvidencePage taskId={taskId}
              />
            )}
          </div>
        }
      />
      */}
    </>
  );
};
export default ActionEdit;
