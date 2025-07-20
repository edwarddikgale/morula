import React, { useState } from 'react';
import { WordInfo } from './WordInfo';
import { mockDictionaryCall } from './dictionaryService';
import './GermanWordExplorer.css';

const GermanWordExplorer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [wordData, setWordData] = useState<WordInfo | null>(null);
  const [loadingWord, setLoadingWord] = useState<string | null>(null);
  const [activeWord, setActiveWord] = useState<string | null>(null);

  const getWordInfo = async (word: string, sentence: string) => {
    setLoadingWord(word);
    setActiveWord(word);
    try {
      const info = await mockDictionaryCall(word, sentence);
      setWordData(info);
    } catch (err) {
      console.error('Error fetching word info:', err);
    } finally {
      setLoadingWord(null);
    }
  };

  const renderWords = (text: string) => {
    const sentences = text.match(/[^.!?]+[.!?]?/g) || [];
    return sentences.map((sentence, i) => (
      <p key={i}>
        {sentence.trim().split(/\s+/).map((word, j) => {
          const cleanWord = word.replace(/[.,!?;:()"]/g, '');
          const isLoading = loadingWord === cleanWord;
          const isActive = activeWord === cleanWord;
          return (
            <span
              key={j}
              onClick={() => getWordInfo(cleanWord, sentence)}
              className={`clickable-word ${isLoading ? 'loading' : ''} ${isActive ? 'active' : ''}`}
            >
              {word}
              {isLoading && <span className="spinner ms-1"></span>}
            </span>
          );
        })}
      </p>
    ));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h3>German Word Explorer</h3>
      <textarea
        rows={6}
        className="form-control mb-3"
        placeholder="Füge hier einen deutschen Text ein..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      {renderWords(inputText)}

      {wordData && (
        <div className="mt-4 p-3 border rounded bg-light">
          <h5>{wordData.word}</h5>
          <p><strong>Translation:</strong> {wordData.translation}</p>
          <p><strong>Context Meaning:</strong> {wordData.contextExplanation}</p>
          <p><strong>Example:</strong> {wordData.exampleSentence}</p>
          <p><strong>Other Examples:</strong></p>
          <ul>
            {wordData.otherExamples.map((ex, i) => (
              <li key={i}>{ex}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default GermanWordExplorer;
