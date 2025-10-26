import { useState, useCallback, useEffect, useMemo } from 'react';
import { TerminalState, TerminalContext, OutputBlock } from './types';

export function useTerminalState() {
  const [state, setState] = useState<TerminalState>({
    input: '',
    history: [],
    historyIndex: -1,
    output: [],
    theme: 'green',
    cursorPosition: 0,
    autocompleteSuggestions: [],
    showAutocomplete: false,
  });

  // Load theme and history from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('terminal-theme');
    const savedHistory = localStorage.getItem('terminal-history');
    
    if (savedTheme) {
      setState(prev => ({ ...prev, theme: savedTheme }));
    }
    
    if (savedHistory) {
      try {
        const history = JSON.parse(savedHistory);
        setState(prev => ({ ...prev, history }));
      } catch (e) {
        console.warn('Failed to parse saved history:', e);
      }
    }
  }, []);

  // Save theme to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('terminal-theme', state.theme);
  }, [state.theme]);

  // Save history to localStorage when it changes (keep last 20)
  useEffect(() => {
    const recentHistory = state.history.slice(-20);
    localStorage.setItem('terminal-history', JSON.stringify(recentHistory));
  }, [state.history]);

  const setTheme = useCallback((theme: string) => {
    setState(prev => ({ ...prev, theme }));
  }, []);

  const clearOutput = useCallback(() => {
    setState(prev => ({ ...prev, output: [] }));
  }, []);

  const addOutput = useCallback((node: React.ReactNode, command?: string) => {
    const newOutput: OutputBlock = {
      id: Date.now().toString(),
      node,
      timestamp: new Date(),
      command,
    };
    setState(prev => ({ ...prev, output: [...prev.output, newOutput] }));
  }, []);

  const updateInput = useCallback((input: string) => {
    setState(prev => ({ ...prev, input }));
  }, []);

  const setCursorPosition = useCallback((position: number) => {
    setState(prev => ({ ...prev, cursorPosition: position }));
  }, []);

  const addToHistory = useCallback((command: string) => {
    setState(prev => ({
      ...prev,
      history: [...prev.history, command],
      historyIndex: -1,
    }));
  }, []);

  const navigateHistory = useCallback((direction: 'up' | 'down') => {
    setState(prev => {
      if (prev.history.length === 0) return prev;

      let newIndex = prev.historyIndex;
      if (direction === 'up') {
        newIndex = newIndex === -1 ? prev.history.length - 1 : Math.max(0, newIndex - 1);
      } else {
        newIndex = newIndex === -1 ? -1 : Math.min(prev.history.length - 1, newIndex + 1);
      }

      const input = newIndex === -1 ? '' : prev.history[newIndex];
      return {
        ...prev,
        historyIndex: newIndex,
        input,
        cursorPosition: input.length,
      };
    });
  }, []);

  const setAutocompleteSuggestions = useCallback((suggestions: string[]) => {
    setState(prev => ({ ...prev, autocompleteSuggestions: suggestions }));
  }, []);

  const setShowAutocomplete = useCallback((show: boolean) => {
    setState(prev => ({ ...prev, showAutocomplete: show }));
  }, []);

  const context: TerminalContext = useMemo(() => ({
    theme: state.theme,
    setTheme,
    clearOutput,
    addOutput,
  }), [state.theme, setTheme, clearOutput, addOutput]);

  return {
    state,
    setState,
    updateInput,
    setCursorPosition,
    addToHistory,
    navigateHistory,
    setAutocompleteSuggestions,
    setShowAutocomplete,
    context,
  };
}
