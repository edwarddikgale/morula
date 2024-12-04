// Board.tsx
import React, { useEffect, useState } from 'react';
import '../styles/board.css';
import { Task } from 'board/types/Task';
import Board,{TaskData} from 'board/components/Board';
import { ActionTask } from 'actions/types/task';
import { eventTasksAPI } from 'board/utils/API';
import { actionAPI} from '../../actions/utils/actionAPI';
import { LoaderPrimary } from '../../common/components/Loader/Loader';
import EventDetails from 'event/components/EventDetails';
import useQueryParameter from '../../common/url/useQueryParameter';
import useAuthUserId from 'auth/hooks/useAuthUser';
import RightOverlay from 'common/components/overlay/RightOverlay';
import ActionView from 'actions/components/ActionView';
import { UserAction } from 'actions/types/UserAction';

interface SeedData {
    tasks: { [key: string]: Task };
}

const ActionBoardPage: React.FC = () => {
    const eventIdParam = useQueryParameter("eventId");
    const userId = useAuthUserId();
    const [taskData, setTaskData] = useState<TaskData>();
    const [taskList, setTaskList] = useState<ActionTask[]>([]);
    const [fetchDone, setFetchDone] = useState<boolean>(false);
    const [showActionDetails, setShowActionDetails] = useState<boolean>(false);
    const [eventId, setEventId] = useState<string | null>(eventIdParam || null);
    const [userAction, setUserAction] = useState<UserAction | null>(null);
    const [actionViewIsLoading, setActionViewIsLoading] = useState<boolean>(false);
    const [currTaskId, setCurrTaskId] = useState<string | undefined>();
    
    const handleTasksFetch = async(eventId: string, userId: string) => {

        const response = await eventTasksAPI.getTasksByEvent(eventId, userId as string);
        if(response){
          setTaskList(response.records);
          const tasksSeedData = convertTaskListToSeedData(response.records);
          setTaskData(tasksSeedData);
          setFetchDone(true);
        }
        else{
            setFetchDone(false);
        }
    };

    const convertTaskListToSeedData = (taskList: ActionTask[]): SeedData => {
        const tasks = taskList.reduce((acc, task, index) => {
            const taskId = `task-${index + 1}`;
            acc[taskId] = {
                id: taskId,
                refId: task.id!,
                content: task.title,
                parentTitle: task.actionTitle!,
                parentId: task.actionId,
                status: task.status,
                sdg: task.sdg!
            };
            return acc;
        }, {} as { [key: string]: Task });
        return { tasks };
    };

    const handleTaskStatusChange = async (taskGridId: string, newStatus: string) =>{
        const taskId = taskData?.tasks[taskGridId].refId;
        const task: ActionTask = {...taskList.find(task => task.id === taskId), status: newStatus} as ActionTask;
        const response = await eventTasksAPI.UpdateActionTask(task, taskId as string);
    }

    const handleShowAction = async (actionId: string, taskId: string) => {
        setCurrTaskId(taskId);
        const response = await actionAPI.getUserAction(actionId);
        setUserAction(response.record);
        setActionViewIsLoading(true);
        setShowActionDetails(true);
    }

    useEffect(() => {
        if(eventId && userId){
            handleTasksFetch(eventId, userId);
        }
    }, [eventId, userId]);

    return (
        <div>
            <div className='mb-4'>
                {eventId && 
                    <EventDetails 
                        eventId={eventId} 
                        preText={`${""} Actions for event: `}
                        showSubDetails={true} />
                }
            </div>    
            {
                fetchDone &&
                <Board 
                    seedData={taskData}
                    onTaskStatusChange={handleTaskStatusChange}
                    onShowAction={handleShowAction}
                />
            }
            {
                (!fetchDone) &&
                <LoaderPrimary />
            }
            {
                showActionDetails &&
                <RightOverlay 
                    onClose={() => setShowActionDetails(false)}
                    isOpen={showActionDetails}
                    children={
                    <div>
                        {showActionDetails && userAction && (
                        <ActionView
                            userProfile={null}
                            event={null}
                            data={userAction}
                            onCancel={() => setShowActionDetails(false)} 
                            selectedTaskId={currTaskId}
                            onLoadDone={() => setActionViewIsLoading(false)}                        
                        />
                        )}
                    </div>
                }
              /> 
            }
        </div>

    );
};


export default ActionBoardPage;

//DONE: handle when data first loads using col.taskIds []
//DONE: handle when item (task) changes status
//handle asking for evidence when status changes to done
//DONE: handle changing of header to task's action title
//DONE: handle fetching all tasks under all actions under an event
//DONE: handle retrieving event-id from params
//DONE view action details when header is clicked
//handle view item (task) details when it is clicked
//DONE: handle view event when it is clicked