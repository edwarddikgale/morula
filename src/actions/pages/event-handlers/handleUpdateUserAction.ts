import { UserAction, Action } from "actions/types";
import { actionAPI } from "actions/utils/actionAPI";

interface IProps {
    actionList: Action[]
    index: number | null;
    data: UserAction;
}

const handleUpdateUserAction = ({actionList, index, data}: IProps): Promise<Action[]> => {
  return new Promise(async (resolve, reject) => {
    //setTimeout(() => setIsEditOpen(false), 400);

    try {
        const actionIsNew = !data.id;
        let response: any = null;

        // Either update or create user action
        response = data.id
        ? await actionAPI.UpdateUserAction(data, data.id)
        : await actionAPI.CreateUserAction(data);

        const userAction: UserAction = response.userAction;

      
        const updatedActionList = actionList.map((action: Action) => {
          return action.id === userAction.id ? userAction : action;
        });

        // If the action doesn't exist in the array, add it (new)
        if (!index || index < 0) {
          updatedActionList.push(userAction);
        }

        // If the action was not part of user's saved (bookmarked) actions before
        if (index && !data.id) {
          updatedActionList[index] = userAction;
        }

      //setIndex(-1);
      // Resolve the promise if successful
      resolve(updatedActionList);
    } catch (error) {
      console.error(error);

      // Reject the promise if there's an error
      reject(error);
    }
  });
};

export default handleUpdateUserAction;
