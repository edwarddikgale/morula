import OpenAI from "openai";
import {OpenAIResponse} from "../../common/ai/openai/models";
import { SdgHeader } from "actions/types/Sdg";
import { Action } from "actions/types/Action";

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;

const openAiActions = {

    getActionBySdg : async (sdgNum: number) => {

        //const indicatorPrompt = sdgHeader?.indicators.map((ind) => `.${ind.index}`).join(" & ");
        const aiPrompt = `Give me recommended actions for a supplier in the event industry to operate sustainably under UN SDG ${sdgNum} and its indicators? Please format the response as JSON of pairs {title, description}. make the description min 1 sentence`;
        console.log(`ai prompt: ${aiPrompt}`);
        
        const openai = new OpenAI({
            apiKey: API_KEY, //process.env.OPENAI_API_KEY,
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
            max_tokens: 64,
            top_p: 1,
            response_format: { type: "json_object" },
        });

        const action = JSON.parse(response.choices[0].message.content as unknown as string) as Action;
        return {...action, source: "ai"};
    }      
}

export default openAiActions;