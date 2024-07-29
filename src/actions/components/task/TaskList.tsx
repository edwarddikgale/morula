import React from 'react';
import { TaskIcon, DeleteSmIcon, EditSmIcon } from 'utils/CustomIcon';
import LimitedCharacters from "../../../common/components/ui/LimitedCharacters";
import StatusIcon from './StatusIcon';
import { Link } from 'react-router-dom';
import { pageNames } from 'config/pageNames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCircleQuestion, faStar } from '@fortawesome/free-solid-svg-icons';
import { taskType } from 'actions/types/task';

import '../styles/task-list.css';

interface IProps{
    taskList: taskType[];
    selectedTaskId?: string;
    onOpenEvidence: (taskId: string) => void,
    onEdit: (taskId: string) => void,
    onDelete: (taskId: string) => void,
    isReadonly?: boolean;
}
const TaskList: React.FC<IProps> = ({taskList, onOpenEvidence, onEdit, onDelete, selectedTaskId, isReadonly = false}: IProps) =>{
    return (
        <div>
        {taskList.map((task, index) => (
          <div key={task.id} className={task.id === selectedTaskId? 'task-item task-selected' : 'task-item'}>
            <div className='row my-3 align-items-center'>
              <div className='col-4'>
                <div>
                  <span onClick={() =>onOpenEvidence(task.id)}>
                    <TaskIcon />
                    {(task.id === selectedTaskId) && <FontAwesomeIcon icon={faStar} color='green' size='lg' />}
                  </span>
                  <span className='ms-2 me-4' style={{ fontStyle: "italic" }}>
                    T-{index + 1}
                  </span>
                  <span className='ms-2 me-4'>
                    {task.status === "new" && <StatusIcon status={"new"} />} 
                    {task.status === "in-progress" && <StatusIcon status={"in-progress"} />} 
                    {task.status === "done" && <StatusIcon status={"done"} />}                            
                    <span className='tiny-text raise-text'>{task.status}</span>
                  </span>
                </div>
              </div>
              <div className={isReadonly? "col-8": "col-6"}>
                <div className='task-title'>
                  <LimitedCharacters text={task.title} limit={isReadonly? 55: 35} />
                </div>
              </div>
              <div className='col-2' style={{display: isReadonly? "none": ""}}>
                <div className='d-flex'>
                  <div className='ms-2 cursor-pointer' onClick={() => onEdit(task.id)}>
                    <span>
                      <EditSmIcon />
                    </span>
                  </div>
                  <div className='ms-2 cursor-pointer'>                       
                    <Link to={`${pageNames.EVIDENCE}?taskId=${task.id}`}>
                      <span>
                        <FontAwesomeIcon icon={faFileCircleQuestion} size='lg' />
                      </span>
                    </Link>
                  </div>
                  <div
                    className='ms-2 cursor-pointer'
                    onClick={() => { onDelete(task.id)}}
                    >
                    <span>
                      <DeleteSmIcon />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
};

export default TaskList;