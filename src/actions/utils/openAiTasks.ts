import OpenAI from "openai";
import { ActionTask, taskType } from "actions/types/task";
import { Action } from "actions/types/Action";
import { Event } from "event/types/Event";
import { UserProfile } from "profile/types/profile";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const openAiTasks = {

    getActionTask : async (profile: UserProfile | null, event: Event | null, action: Action | null, taskList: ActionTask[] | null) => {
        const actionAsJson = JSON.stringify(action);
        const eventAsJson = JSON.stringify(event);
        const profileAsJson = JSON.stringify(profile);
        const taskListAsJson = JSON.stringify(taskList);
    
        const aiPrompt = `Given the following details:
        - User Profile: ${profileAsJson}
        - Event: ${eventAsJson}
        - Action: ${actionAsJson}
        - Existing Tasks: ${taskListAsJson}
        
        Suggest a new and creative task that can help progress the given action in a sustainable way. The task should be different from the existing tasks and should complement the action. Please format the response as JSON with fields {title, status}, where status should always be "new".`;
        
        console.log(`AI Prompt: ${aiPrompt}`);
    
        const openai = new OpenAI({
            apiKey: API_KEY,
            dangerouslyAllowBrowser: true    
        });
    
        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    "role": "user",
                    "content": aiPrompt
                }
            ],
            temperature: 0.5,
            max_tokens: 150,
            top_p: 1,
        });
    
        const task = JSON.parse(response.choices[0].message.content as unknown as string) as ActionTask;
        return { ...task };
    }
    
}    

export default openAiTasks;