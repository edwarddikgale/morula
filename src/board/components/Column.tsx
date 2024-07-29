import { SwimLane } from "board/types/SwimLane";
import { Task } from "board/types/Task";
import React from "react";
import { Droppable } from "react-beautiful-dnd";
import TaskComponent from "./Task";

interface ColumnProps {
    column: SwimLane;
    tasks: Task[];
    onShowAction: (actionId: string, taskId: string) => void;
}

const Column: React.FC<ColumnProps> = ({ column, tasks, onShowAction }) => {
    return (
        <div className="column">
            <h2>
                {column.title} 
                {tasks && ` ( ${tasks.length} )`}
            </h2>
            <Droppable droppableId={column.id}>
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="task-list"
                    >
                        {tasks.map((task, index) => (
                            <TaskComponent 
                                key={task.id} 
                                task={task} 
                                index={index} 
                                onShowAction={onShowAction}/>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};

export default Column;