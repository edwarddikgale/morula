    // Interface for the message content in the choice object
    interface MessageContent {
        role: string;
        content: string;
    }

    // Interface for each choice in the choices array
    interface Choice {
        index: number;
        message: MessageContent;
        logprobs: null | any;
        finish_reason: string;
    }

    // Interface for the usage object
    interface Usage {
        prompt_tokens: number;
        completion_tokens: number;
        total_tokens: number;
    }

    // Interface for the overall response object from the OpenAI API
    interface OpenAIResponse {
        id: string;
        object: string;
        created: number;
        model: string;
        choices: Choice[];
        usage: Usage;
        system_fingerprint: null | string;
    }

  export type {MessageContent, Choice, Usage, OpenAIResponse};