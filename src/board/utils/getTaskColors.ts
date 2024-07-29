import { Task } from "board/types/Task";

const getTaskColors = (task: Task) => {
    switch (task.status) {
        case 'new':
            return { color: 'white', bgColor: '#f54236' };
        case 'in-progress':
            return { color: 'black', bgColor: 'orange' };
        case 'done':
            return { color: 'white', bgColor: 'green' };
        default:
            return { color: 'black', bgColor: 'grey' }; // default case if status doesn't match any
    }
};

export default getTaskColors;
