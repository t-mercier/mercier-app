import { parseCommand } from '../Autocomplete';

describe('Command Parser', () => {
  test('parses simple command', () => {
    const result = parseCommand('help');
    expect(result.command).toBe('help');
    expect(result.args).toEqual([]);
  });

  test('parses command with arguments', () => {
    const result = parseCommand('help skills');
    expect(result.command).toBe('help');
    expect(result.args).toEqual(['skills']);
  });

  test('parses command with multiple arguments', () => {
    const result = parseCommand('projects tomtom unity');
    expect(result.command).toBe('projects');
    expect(result.args).toEqual(['tomtom', 'unity']);
  });

  test('parses command with quoted arguments', () => {
    const result = parseCommand('help "skills command"');
    expect(result.command).toBe('help');
    expect(result.args).toEqual(['skills command']);
  });

  test('parses command with single quotes', () => {
    const result = parseCommand("help 'skills command'");
    expect(result.command).toBe('help');
    expect(result.args).toEqual(['skills command']);
  });

  test('handles empty input', () => {
    const result = parseCommand('');
    expect(result.command).toBe('');
    expect(result.args).toEqual([]);
  });

  test('handles whitespace-only input', () => {
    const result = parseCommand('   ');
    expect(result.command).toBe('');
    expect(result.args).toEqual([]);
  });

  test('trims whitespace from arguments', () => {
    const result = parseCommand('help  skills  ');
    expect(result.command).toBe('help');
    expect(result.args).toEqual(['skills']);
  });
});
