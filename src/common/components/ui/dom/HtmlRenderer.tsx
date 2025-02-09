import React from 'react';
import DOMPurify from 'dompurify';

interface HtmlRendererProps {
  htmlContent: string;
}

const HtmlRenderer: React.FC<HtmlRendererProps> = ({ htmlContent }) => {
  const sanitizedContent = DOMPurify.sanitize(htmlContent);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="html-renderer"
    />
  );
};

export {HtmlRenderer};
