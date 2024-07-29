// Board.tsx
import React, { useEffect, useState } from 'react';
import { DragDropContext, Draggable, DropResult } from 'react-beautiful-dnd';
import '../styles/board.css';
import { Task } from 'board/types/Task';
import { SwimLane } from 'board/types/SwimLane';
import Column from 'board/components/Column';

interface TaskData {
    tasks: { [key: string]: Task };
}

export interface SetupData {
    columns: { [key: string]: SwimLane };
    columnOrder: string[];
}

const initialSetupData: SetupData = {
    columns: {
        'new': {
            id: 'new',
            title: 'To Do',
            taskIds: [],
        },
        'in-progress': {
            id: 'in-progress',
            title: 'In Progress',
            taskIds: [],
        },
        'done': {
            id: 'done',
            title: 'Done',
            taskIds: [],
        },
    },
    columnOrder: ['new', 'in-progress', 'done'],
};

interface IBoardProps{
    seedData?: TaskData;
    onTaskStatusChange: (taskGridId: string, newStatus: string) => void;
    onShowAction: (actionId: string, taskId: string) => void;
}

interface Data{
    tasks?: { [key: string]: Task };
    columns: { [key: string]: SwimLane };
    columnOrder: string[];
}

const filterTasksByStatus = (taskData: TaskData, status: string): Task[] =>{
    let filteredTasks: Task[] = [];
    for(const key in taskData.tasks){
        if(taskData.tasks[key] && taskData.tasks[key].status === status){
            filteredTasks.push(taskData.tasks[key]);
        }
    }
    return filteredTasks;
}

const Board: React.FC<IBoardProps> = ({seedData, onTaskStatusChange, onShowAction}: IBoardProps) => {
    const [taskData, setTaskData] = useState<TaskData>(seedData || {} as TaskData);
    const [data, setData] = useState<Data>({
        columns: initialSetupData.columns, 
        columnOrder: initialSetupData.columnOrder, 
        tasks: seedData?.tasks});

    useEffect(() => {
        if (!taskData || !taskData.tasks) return;
    
        const newData = { ...data }; // Create a shallow copy of data
    
        for (const columnKey in initialSetupData.columns) {
            const colTasks = filterTasksByStatus(taskData, columnKey);
            const colTaskIds = colTasks.map(task => task.id);
    
            // Ensure to make a copy of the column to avoid direct state mutation
            newData.columns = {
                ...newData.columns,
                [columnKey]: {
                    ...newData.columns[columnKey],
                    taskIds: colTaskIds
                }
            };
        }
    
        setData(newData); // Set the new data state
    }, [taskData]);

    const onDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;
        
        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = data.columns[source.droppableId];
        const finish = data.columns[destination.droppableId];

        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };

            setData({
                ...data,
                columns: {
                    ...data.columns,
                    [newColumn.id]: newColumn,
                },
            });
            return;
        }

        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };

        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };

        setData({
            ...data,
            columns: {
                ...data.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        });

        onTaskStatusChange(draggableId, destination.droppableId);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban-board">
                {
                    data.columnOrder.map((columnId) => {
                        const column = data.columns[columnId];
                        const tasks = data.tasks && column.taskIds ? column.taskIds.map((taskId) => data.tasks?.[taskId] ?? {} as Task) : [];
                        return (
                            <Column 
                                key={column.id} 
                                column={column} 
                                tasks={tasks} 
                                onShowAction={onShowAction}
                                />
                        );
                })}
            </div>
        </DragDropContext>
    );
};


export default Board;
export type {IBoardProps, TaskData};
