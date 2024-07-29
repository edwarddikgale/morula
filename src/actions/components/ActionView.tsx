import React, { useEffect, useState } from "react";
import { UserAction } from "../types/UserAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Button, ProgressBar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ActionTask } from "../types/task";
import TaskList from "./task/TaskList";
import { UserProfile } from "profile/types/profile";
import { Event } from "event/types/Event";
import { actionTaskAPI } from "actions/utils/taskAPI";

interface ActionViewProps {
  userProfile: UserProfile | null,
  event: Event | null,
  data: UserAction;
  selectedTaskId?: string;
  onCancel: () => void;
  onLoadDone?: () => void;
}

const ActionView: React.FC<ActionViewProps> = (props: ActionViewProps) => {
  const { userProfile, selectedTaskId, data, onCancel, onLoadDone } = props;
  const [taskList, setTaskList] = useState<ActionTask[]>([]);

  const handleTasksFetch = async() => {
    const response = await actionTaskAPI.getTasksByAction(data.id as string);
    if(response){
      setTaskList(response.records);
      if(onLoadDone) onLoadDone();
    }
  };

  useEffect(() => {
    if(data && data.id != null){
      handleTasksFetch();
    }
  }, []);

  return (
    <>
      <div className='p-3'>
        <div>
          <div className="mb-3">
            <h4>View Action</h4>
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
              value={data.title}
              readOnly
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
              value={data.description}
              readOnly
            />
          </div>
          {data.piResource && (
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
                      to={data.resourceUrl}
                      target='_blank'
                    >
                      <FontAwesomeIcon icon={faCircleInfo} />
                      &nbsp; {data.piResource}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Task */}
          <div className='task-section p-2 mt-4' style={{ display: data.id ? '' : 'none' }}>
            <p className='fw-bold px-2 mt-2 ms-2'>
              ( {taskList.length} ) TASKS
            </p>

            <div className="mb-2">
              {taskList && taskList.length > 0 && <ProgressBar now={(taskList.filter(t => t.status === "done").length / taskList.length) * 100} />}
            </div>
            
            <TaskList 
              taskList={taskList}
              onOpenEvidence={() => {}}
              onEdit={() => {}}
              onDelete={() => {}}
              isReadonly={true}
              selectedTaskId={selectedTaskId}
            />
          </div>

          <div className='d-flex justify-content-center gap-3 mt-4 pb-4 my-4'>
            <button onClick={onCancel} type='button' className='btn btn-outline-warning py-3 px-4'>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ActionView;
