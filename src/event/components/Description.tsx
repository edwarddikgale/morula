import React, { useState, useRef, useMemo } from "react";
import JoditEditor, { Jodit } from "jodit-react";
import { removePTags } from "./utils/utils";

interface ExampleProps {
  placeholder?: string;
  content: string; // Assuming content is a string, you can adjust the type as needed
  setContent: (newContent: string) => void;
}

const Description: React.FC<ExampleProps> = ({ placeholder, content, setContent }) => {
  const editor = useRef<Jodit | null>(null);

  const config = useMemo(() => {
    return {
      readonly: false,
      // All options from https://xdsoft.net/jodit/doc/
      placeholder: placeholder || "Start typing...",
      buttons: [
        "fontsize",
        "font",
        "|", // Separator

        "bold",
        "italic",
        "underline",
        "|", // Separator
        "fullsize",
        "ul",
        "ol",
      ],

      statusbar: false,
    };
  }, [placeholder]);

  const handleBlur = (newContent: string) => {
    const content = newContent; //removePTags(newContent);
    setContent(content);
  };

  const handleChange = (newContent: string) => {};

  return (
    <JoditEditor ref={editor} value={content} config={config} onBlur={handleBlur} onChange={handleChange} />
  );
};

export default Description;
