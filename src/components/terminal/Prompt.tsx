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

  return (
    <div className="relative">
      <div className="flex items-center space-x-2">
        <span className="text-hacker-green font-mono select-none">
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
            className="bg-transparent border-none outline-none text-gray-300 font-mono w-full caret-hacker-green"
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
        <div className="absolute bottom-full left-0 right-0 mb-1 bg-black border border-hacker-green/30 rounded max-h-48 overflow-y-auto z-50">
          {autocompleteSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onAutocompleteSelect(suggestion)}
              className="w-full text-left px-3 py-1 text-gray-300 hover:bg-hacker-green/10 hover:text-hacker-green transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
