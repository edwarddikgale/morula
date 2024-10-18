import OpenAI from "openai";
import { Action } from "actions/types/Action";
import { ActionGeneratorPayload } from "actions/types/ActionGeneratorPayload";

const actionGenerator = async (aiPrompt: string) => {

    // Initialize OpenAI API client
    const openai = new OpenAI({
        apiKey: process.env.REACT_APP_OPENAI_API_KEY,
        dangerouslyAllowBrowser: true
    });

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
            temperature: 0.7
        });

        // Parse the AI response as JSON
        const aiResponse = JSON.parse(response.choices[0].message.content as unknown as string) as Action[];
        return aiResponse;
    } catch (error: any) {
        throw new Error(`Failed to get a response from OpenAI: ${error.message}`);
    }
};

const openAiActions = {
    getActions: async (details: ActionGeneratorPayload): Promise<Action[]> => {

        // Create the AI prompt based on the provided details
        const aiPrompt = `Give me recommended actions for a scrum team to improve a scrum event ${details.event.category} based on hypothesis generated from this event ${JSON.stringify(details.hypothesisList)}. Please format the response as JSON of pairs {title, description}. Make the description at least one sentence.`;

        console.log(`AI prompt: ${aiPrompt}`);

        // Call the action generator
        const aiActions = await actionGenerator(aiPrompt);

        // Return the generated actions from OpenAI
        return aiActions.map((action) => ({
            ...action,
            source: "ai"
        }));
    }
};

export default openAiActions;
