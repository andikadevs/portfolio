import React from 'react';

interface TitleProps {
  title: string;
  description?: string | null;
  className?: string;
}

export const Title: React.FC<TitleProps> = ({ title, description = '', className = '' }) => {
  // Function to extract and properly format text with bracketed segments
  const formatTextWithAccents = (text: string) => {
    const bracketRegex = /\[(.*?)\]/g;
    let result    = '';
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = bracketRegex.exec(text)) !== null) {
      result += text.slice(lastIndex, match.index);
      result += `<span class="text-accent">${match[1]}</span>`;
      lastIndex = match.index + match[0].length;
    }

    result += text.slice(lastIndex);
    return result;
  };

  const createMarkup = (text: string) => {
    return { __html: text };
  };

  const formattedTitle = formatTextWithAccents(title);
  const formattedDescription = formatTextWithAccents(description || '');

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <h2 className='text-center text-text text-4xl fontweight-600'>
        <span dangerouslySetInnerHTML={createMarkup(formattedTitle)} />
      </h2>
      {description && (
        <p className='text-text'>
          <span dangerouslySetInnerHTML={createMarkup(formattedDescription)} />
        </p>
      )}
    </div>
  );
};
