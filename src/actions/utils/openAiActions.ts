import OpenAI from "openai";
import { Action } from "actions/types/Action";
import { ActionGeneratorPayload } from "actions/types/ActionGeneratorPayload";

interface ActionGeneratorResponse {recommendedActions: Action[];}
const actionGenerator = async (aiPrompt: string): Promise<ActionGeneratorResponse> => {

    // Initialize OpenAI API client
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });

    console.log(`Ai MODEL: ${process.env.REACT_APP_OPENAI_MODEL}`);

    try {
        // Call the OpenAI API
        const response = await openai.chat.completions.create({
            model: `${process.env.REACT_APP_OPENAI_MODEL}`,  // Fetch model from environment variables
            messages: [
                {
                    "role": "user",
                    "content": aiPrompt
                }
            ],
            max_tokens: 1000,  // Increased token limit as per your requirements
            temperature: 0.7,
            response_format: { type: "json_object" }
        });

        // Parse the AI response as JSON
        const aiResponse = JSON.parse(response.choices[0].message.content as unknown as string);
         console.log(`aiResponse : ${JSON.stringify(aiResponse)}`);
        return aiResponse;

    } catch (error: any) {
        throw new Error(`Failed to get a response from OpenAI: ${error.message}`);
    }
};

const openAiActions = {
    getActions: async (details: ActionGeneratorPayload): Promise<Action[]> => {

        // Create the AI prompt based on the provided details
        const aiPrompt = `Give me recommended action list for a scrum team to improve a scrum event ${details.event.category} based on hypothesis generated from this event as ${JSON.stringify(details.hypothesisList)}. Please format the response as JSON of pairs {title, description} with a return like {"recommendedActions":[{"title":"xxx","description":"xxx"},...]}. Make the description at least one sentence. Limit the list to max ${details.limit || 1} actions`;

        // Call the action generator
        const aiActions = (await actionGenerator(aiPrompt)).recommendedActions;

        // Return the generated actions from OpenAI
        return aiActions.map((action) => ({
            ...action,
            source: "ai"
        }));
    }
};

export default openAiActions;
