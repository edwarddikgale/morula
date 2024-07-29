import LimitedCharacters from "../../common/components/ui/LimitedCharacters";
import { Task } from "board/types/Task";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import RoundNumber from "common/components/ui/RoundNumber";
import getTaskColors from "board/utils/getTaskColors";
import { LoaderSm } from "common/components/Loader/Loader";

interface IProps {
    key: string,
    task: Task;
    index: number;
    onShowAction: (actionId: string, taskId: string) => void;
}

const TaskComponent: React.FC<IProps> = ({ task, index, onShowAction }) => {
    const {color, bgColor} = getTaskColors(task);
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

    const handleShowAction = (actionId: string, taskId: string) =>{
        setLoadingDetails(true);
        onShowAction(actionId, taskId);
        setTimeout(() => setLoadingDetails(false), 3000);
    }
    return (
        <Draggable draggableId={`${task.id}`} index={index}>
            {(provided) => (
                <div
                    className="task"
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <div className="task-content">
                        <strong><LimitedCharacters text={task.content} limit={100} /></strong>
                    </div>
                    <div className="task-parent" onClick={() => handleShowAction(task.parentId, task.refId)}> 
                        <div className="row">
                            <div className="col-10 d-flex align-items-centre gap-2">
                                <FontAwesomeIcon icon={faArrowRight} className="me-2 parent-icon" />
                                <LimitedCharacters text={task.parentTitle} limit={100} />
                            </div>
                            <div className="col-1">
                                <p className='action-sdg'>SDG-{task.sdg}</p>
                                {loadingDetails && <LoaderSm />}
                            </div>
                        </div>
                    </div>
                    <RoundNumber text={`${index + 1}`} circleColor={bgColor} textColor={color} />
                </div>
            )}
        </Draggable>
    );
};

export default TaskComponent;