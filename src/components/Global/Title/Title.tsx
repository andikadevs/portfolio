import { markupAccents } from '@/utils/Global';
import { TitleProps } from './TitleProps'; 

export const Title: React.FC<TitleProps> = ({ title, description = '', className = '' }) => {
  const createMarkup = (text: string) => {
    return { __html: text };
  };

  const formattedTitle = markupAccents(title);
  const formattedDescription = markupAccents(description || '');

  return (
    <div className={`flex flex-col items-center px-2 mb-8 ${className}`}>
      <h2 className='text-center text-text text-4xl fontweight-600'>
        <span dangerouslySetInnerHTML={createMarkup(formattedTitle)} />
      </h2>
      {description && (
        <p className='text-text text-center'>
          <span dangerouslySetInnerHTML={createMarkup(formattedDescription)} />
        </p>
      )}
    </div>
  );
};
