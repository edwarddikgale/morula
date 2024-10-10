import { Action, UserAction } from "actions/types";
import { actionAPI } from "actions/utils/actionAPI";
import { UserProfile } from 'profile/types/profile';

export interface ICreateActionHandlerProps{
    index: number, 
    item: Action, 
    userProfile: UserProfile | null, 
    eventId: string | null,
    actionList: Action[]
}
const createActionHandler = ({index, item, userProfile, eventId, actionList}: ICreateActionHandlerProps): Promise<Action[]> =>{
    return new Promise(async(resolve, reject) => {
        try{
            const response = await actionAPI.createUserAction({ ...item, userId: userProfile?.userId, eventId: eventId });
            const userAction: UserAction = response.userAction;//response.data.userAction;
        
            const updatedList = [...actionList];
            updatedList[index] = userAction;
            
            resolve(updatedList);
        }
        catch(e){
            reject(e);
        }
    });    
};

export {createActionHandler};