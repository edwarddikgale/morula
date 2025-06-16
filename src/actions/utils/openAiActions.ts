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
        return aiResponse;

    } catch (error: any) {
        throw new Error(`Failed to get a response from OpenAI: ${error.message}`);
    }
};

const openAiActions = {
  getScrumMasterActions: async (details: ActionGeneratorPayload): Promise<Action[]> => {
    const aiPrompt = `Give me recommended action list for a scrum team to improve a scrum event ${details.event.category},  ${details.event.category} based on hypothesis generated from this event as ${JSON.stringify(details.hypothesisList)}. Please format the response as JSON of pairs {title, description} with a return like {"recommendedActions":[{"title":"xxx","description":"xxx"},...]}. Make the description at least one sentence. Limit the list to max ${details.limit || 1} actions`;

    const aiActions = (await actionGenerator(aiPrompt)).recommendedActions;

    return aiActions.map((action) => ({
      ...action,
      source: "ai",
      hypotheses: details.hypothesisList
    }));
  },

  getPoActions: async (details: ActionGeneratorPayload): Promise<Action[]> => {
    const aiPrompt = `You are a highly experienced Agile Product Owner.
        Given the Scrum event category: "${details.event.category}", description: "${details.event.description}", and the following hypothesis list (if any): ${JSON.stringify(details.hypothesisList)},
        generate a focused set of actions for a Product Owner to follow up on.

        Return a JSON object with:
        {
        "recommendedActions": [
            { "title": "...", "description": "...", "actionType": "userStory" },
            { "title": "...", "description": "...", "actionType": "followUp" },
            { "title": "...", "description": "...", "actionType": "question" },
            { "title": "...", "description": "...", "actionType": "improvement" }
        ]
        }

        The "actionType" must be one of: "userStory", "followUp", "question", or "improvement".
        All descriptions must be at least one sentence. Limit the list to max ${details.limit || 4} actions.
        Ensure the JSON structure matches the spec exactly.`;

    const aiActions = (await actionGenerator(aiPrompt)).recommendedActions;

    return aiActions.map((action) => ({
      ...action,
      source: "ai",
      hypotheses: details.hypothesisList
    }));
  }
};

export default openAiActions;
