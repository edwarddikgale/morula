import { Action } from "actions/types";
import { actionAPI } from "actions/utils/actionAPI";

const deleteActionHandler = async (actionList: Action[] ,index: number): Promise<Action[]> => { 
    return new Promise(async(resolve, reject) => {
        try{
            const thisAction = actionList && actionList.length >= 0 ? actionList[index] : null;
            if (thisAction && thisAction.id) {
              await actionAPI.DeleteUserAction(thisAction.id);
            }
            const updatedItems = [...actionList];
            updatedItems.splice(index, 1);
            resolve(updatedItems);
        }
        catch(e){
            reject(e);
        }
    });
};

export  {deleteActionHandler};