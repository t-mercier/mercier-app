import React, { useRef, useEffect } from 'react';

interface PromptProps {
  input: string;
  cursorPosition: number;
  theme: string;
  onInputChange: (input: string) => void;
  onCursorChange: (position: number) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  onSubmit: () => void;
  autocompleteSuggestions: string[];
  showAutocomplete: boolean;
  onAutocompleteSelect: (suggestion: string) => void;
}

export default function Prompt({
  input,
  cursorPosition,
  theme,
  onInputChange,
  onCursorChange,
  onKeyDown,
  onSubmit,
  autocompleteSuggestions,
  showAutocomplete,
  onAutocompleteSelect,
}: PromptProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInputChange(e.target.value);
    onCursorChange(e.target.selectionStart || 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    } else {
      onKeyDown(e);
    }
  };

  const handleClick = () => {
    if (inputRef.current) {
      const position = inputRef.current.selectionStart || 0;
      onCursorChange(position);
    }
  };

  const getThemeColor = () => {
    const terminal = document.querySelector('[data-terminal]');
    if (terminal?.classList.contains('theme-amber')) return '#ffcc66';
    if (terminal?.classList.contains('theme-ice')) return '#9be7ff';
    return '#00ff7f'; // default green
  };

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <span className="font-mono select-none" style={{ color: getThemeColor() }}>
          mercier.app $
        </span>
        <div className="flex-1 relative">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onClick={handleClick}
            className="bg-transparent border-none outline-none text-gray-300 font-mono w-full"
            style={{ caretColor: 'var(--terminal-color)' }}
            placeholder=""
            autoComplete="off"
            spellCheck="false"
            aria-label="Terminal input"
            aria-describedby="terminal-hint"
          />
          <div id="terminal-hint" className="sr-only">
            Type help to see available commands
          </div>
        </div>
      </div>
      
      {showAutocomplete && autocompleteSuggestions.length > 0 && (
        <div 
          className="absolute bottom-full left-0 right-0 mb-1 bg-black border rounded max-h-48 overflow-y-auto z-50"
          style={{ 
            borderColor: getThemeColor() === '#ffcc66' 
              ? 'rgba(255, 204, 102, 0.3)' 
              : getThemeColor() === '#9be7ff'
              ? 'rgba(155, 231, 255, 0.3)'
              : 'rgba(0, 255, 127, 0.3)'
          }}
        >
          {autocompleteSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onAutocompleteSelect(suggestion)}
              className="w-full text-left px-3 py-1 text-gray-300 transition-colors"
              onMouseEnter={(e) => {
                const termColor = getThemeColor();
                if (termColor === '#ffcc66') {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 204, 102, 0.1)';
                  e.currentTarget.style.color = '#ffcc66';
                } else if (termColor === '#9be7ff') {
                  e.currentTarget.style.backgroundColor = 'rgba(155, 231, 255, 0.1)';
                  e.currentTarget.style.color = '#9be7ff';
                } else {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 127, 0.1)';
                  e.currentTarget.style.color = '#00ff7f';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '';
                e.currentTarget.style.color = 'rgb(209, 213, 219)';
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
