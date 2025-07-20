import { WordInfo } from "./WordInfo";

export const mockDictionaryCall = async (word: string, sentence: string): Promise<WordInfo> => {
  const OPENAI_API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
  const OPENAI_MODEL = process.env.REACT_APP_OPENAI_MODEL || 'gpt-4';

  const prompt = `
Translate the German word "${word}" to English.
- Provide the translation.
- Explain its meaning based on the sentence: "${sentence}".
- Give one example sentence using the word in English.
- Then list two more example sentences using the word (In German).

Respond in the following JSON format exactly:
{
  "word": "<word>",
  "translation": "<english translation>",
  "contextExplanation": "<explanation of the word in the context>",
  "exampleSentence": "<example sentence>",
  "otherExamples": ["<example 1>", "<example 2>"]
}
`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: OPENAI_MODEL,
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.3,
    }),
  });

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  try {
    const parsed: WordInfo = JSON.parse(content);
    return parsed;
  } catch (err) {
    console.error('❌ Failed to parse OpenAI response as valid JSON:', content);
    throw new Error('Invalid JSON response from OpenAI');
  }
};