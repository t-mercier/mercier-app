"use client";

import React, { useEffect, useRef, useCallback, useState, useMemo } from 'react';
import { useTerminalState } from './useTerminalState';
import { findCommand } from './commands';
import { parseCommand, getAutocompleteSuggestions } from './Autocomplete';
import Prompt from './Prompt';
import OutputBlock from './OutputBlock';

interface TerminalProps {
  className?: string;
}

export default function Terminal({ className = '' }: TerminalProps) {
  const [mounted, setMounted] = useState(false);
  
  const {
    state,
    updateInput,
    setCursorPosition,
    addToHistory,
    navigateHistory,
    setAutocompleteSuggestions,
    setShowAutocomplete,
    context: baseContext,
  } = useTerminalState();

  const handleExecuteCommand = useCallback((command: string) => {
    updateInput(command);
    setCursorPosition(command.length);
    // Execute the command
    setTimeout(() => {
      const { command: cmdName, args } = parseCommand(command);
      const cmd = findCommand(cmdName);
      if (cmd) {
        const result = cmd.handler(args, { ...baseContext, executeCommand: handleExecuteCommand });
        if (result !== null) {
          if (result instanceof Promise) {
            result.then((resolvedResult) => {
              if (resolvedResult !== null) {
                baseContext.addOutput(resolvedResult, command);
              }
            });
          } else {
            baseContext.addOutput(result, command);
          }
        }
      }
    }, 0);
  }, [updateInput, setCursorPosition, baseContext]);

  // Create context with executeCommand
  const context = useMemo(() => ({ ...baseContext, executeCommand: handleExecuteCommand }), [baseContext, handleExecuteCommand]);

  const outputRef = useRef<HTMLDivElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when new output is added
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [state.output]);

  // Handle client-side mounting
  useEffect(() => {
    setMounted(true);
    const input = terminalRef.current?.querySelector('input');
    if (input) {
      input.focus();
    }
  }, []);

  const handleSubmit = useCallback(() => {
    if (!state.input.trim()) return;

    const { command, args } = parseCommand(state.input);
    const cmd = findCommand(command);

    // Add to history
    addToHistory(state.input);

    if (cmd) {
      try {
        const result = cmd.handler(args, context);
        if (result !== null) {
          // Handle both sync and async results
          if (result instanceof Promise) {
            result.then((resolvedResult) => {
              if (resolvedResult !== null) {
                context.addOutput(resolvedResult, state.input);
              }
            }).catch((error) => {
              context.addOutput(
                <div className="text-red-400">
                  Error executing command: {error instanceof Error ? error.message : 'Unknown error'}
                </div>,
                state.input
              );
            });
          } else {
            context.addOutput(result, state.input);
          }
        }
      } catch (error) {
        context.addOutput(
          <div className="text-red-400">
            Error executing command: {error instanceof Error ? error.message : 'Unknown error'}
          </div>,
          state.input
        );
      }
    } else {
      context.addOutput(
        <div className="text-red-400">
          Command &apos;{command}&apos; not found. Type &apos;help&apos; for available commands.
        </div>,
        state.input
      );
    }

    // Clear input and reset autocomplete
    updateInput('');
    setCursorPosition(0);
    setShowAutocomplete(false);
    setAutocompleteSuggestions([]);
  }, [state.input, context, addToHistory, updateInput, setCursorPosition, setShowAutocomplete, setAutocompleteSuggestions]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        e.preventDefault();
        navigateHistory('up');
        break;
      case 'ArrowDown':
        e.preventDefault();
        navigateHistory('down');
        break;
      case 'Tab':
        e.preventDefault();
        const suggestions = getAutocompleteSuggestions(state.input);
        if (suggestions.length === 1) {
          updateInput(suggestions[0] + ' ');
          setCursorPosition(suggestions[0].length + 1);
        } else if (suggestions.length > 1) {
          setAutocompleteSuggestions(suggestions);
          setShowAutocomplete(true);
        }
        break;
      case 'Escape':
        setShowAutocomplete(false);
        setAutocompleteSuggestions([]);
        break;
    }
  }, [state.input, navigateHistory, updateInput, setCursorPosition, setAutocompleteSuggestions, setShowAutocomplete]);

  const handleAutocompleteSelect = useCallback((suggestion: string) => {
    updateInput(suggestion + ' ');
    setCursorPosition(suggestion.length + 1);
    setShowAutocomplete(false);
    setAutocompleteSuggestions([]);
  }, [updateInput, setCursorPosition, setShowAutocomplete, setAutocompleteSuggestions]);

  const handleInputChange = useCallback((input: string) => {
    updateInput(input);
    
    // Update autocomplete suggestions
    const suggestions = getAutocompleteSuggestions(input);
    setAutocompleteSuggestions(suggestions);
    setShowAutocomplete(suggestions.length > 0 && input.trim().length > 0);
  }, [updateInput, setAutocompleteSuggestions, setShowAutocomplete]);

  // Apply theme class to terminal
  const themeClass = `theme-${state.theme}`;
  
  // Get theme color for border
  const getThemeBorderColor = () => {
    if (state.theme === 'amber') return 'rgba(255, 204, 102, 0.3)';
    if (state.theme === 'ice') return 'rgba(155, 231, 255, 0.3)';
    return 'rgba(0, 255, 127, 0.3)'; // default green
  };

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-hacker-green font-mono">Loading terminal...</div>
      </div>
    );
  }

  return (
    <div 
      ref={terminalRef}
      data-terminal
      className={`min-h-screen bg-black text-hacker-green font-mono crt-effect ${themeClass} ${className}`}
      role="region"
      aria-label="Interactive terminal"
    >
      {/* CRT Scanlines */}
      <div className="absolute inset-0 pointer-events-none crt-scanlines"></div>
      
      {/* Output area */}
      <div 
        ref={outputRef}
        className="h-screen overflow-y-auto p-4 pb-20"
        aria-live="polite"
        aria-label="Terminal output"
      >
        <div className="space-y-2">
          {/* Welcome message on first load */}
          {state.output.length === 0 && (
            <div className="space-y-2">
              <div className="text-hacker-green font-bold">
                Welcome to mercier.app terminal
              </div>
              <div className="text-gray-300">
                Type <span 
                  className="text-green-400 font-mono font-bold bg-green-400/5 px-1 py-0.5 rounded cursor-pointer hover:bg-green-400/10 transition-colors"
                  onClick={() => {
                    if (context.executeCommand) {
                      context.executeCommand('help');
                    }
                  }}
                >help</span> to see available commands.
              </div>
              <div className="text-gray-400 text-sm">
                Use ↑/↓ for history, Tab for autocomplete, ESC to cancel.
              </div>
            </div>
          )}
          
          {state.output.map((block) => (
            <OutputBlock key={block.id} block={block} />
          ))}
        </div>
      </div>

      {/* Input area */}
      <div className="fixed bottom-0 left-0 right-0 bg-black border-t p-4" style={{ borderColor: getThemeBorderColor() }}>
        <Prompt
          input={state.input}
          cursorPosition={state.cursorPosition}
          theme={state.theme}
          onInputChange={handleInputChange}
          onCursorChange={setCursorPosition}
          onKeyDown={handleKeyDown}
          onSubmit={handleSubmit}
          autocompleteSuggestions={state.autocompleteSuggestions}
          showAutocomplete={state.showAutocomplete}
          onAutocompleteSelect={handleAutocompleteSelect}
        />
      </div>
    </div>
  );
}
