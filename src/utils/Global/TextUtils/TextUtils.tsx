export const markupAccents = (text: string): string => {
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