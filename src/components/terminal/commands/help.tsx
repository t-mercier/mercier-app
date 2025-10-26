import { Command } from '../types';
import { registry } from './index';

const help: Command = {
  name: 'help',
  description: 'Show available commands or get help for a specific command',
  usage: 'help [command]',
  handler: (args, ctx) => {
    if (args.length > 0) {
      const commandName = args[0].toLowerCase();
      const command = registry.find(c => 
        c.name === commandName || c.aliases?.includes(commandName)
      );
      
      if (command) {
        return (
          <div className="space-y-2">
            <div className="font-bold text-hacker-green">{command.name}</div>
            <div className="text-gray-300">{command.description}</div>
            {command.usage && (
              <div className="text-gray-400">
                <span className="text-hacker-green">Usage:</span> {command.usage}
              </div>
            )}
            {command.aliases && command.aliases.length > 0 && (
              <div className="text-gray-300">
                <span className="text-hacker-green">Aliases:</span> {command.aliases.join(', ')}
              </div>
            )}
          </div>
        );
      } else {
        return (
          <div className="text-red-400">
            Command &apos;{commandName}&apos; not found. Type &apos;help&apos; to see available commands.
          </div>
        );
      }
    }

    return (
      <div className="space-y-3">
        <div className="font-bold text-hacker-green text-lg">mercier.app commands:</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          {registry.map((cmd) => (
            <div 
              key={cmd.name} 
              className="flex items-start space-x-2 group cursor-pointer rounded px-1 py-0.5 -mx-1 transition-colors"
              style={{
                backgroundColor: 'rgba(var(--theme-color-rgb), 0.05)'
              }}
              onMouseEnter={(e) => {
                const terminal = document.querySelector('[data-terminal]');
                if (terminal?.classList.contains('theme-amber')) {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 204, 102, 0.1)';
                } else if (terminal?.classList.contains('theme-ice')) {
                  e.currentTarget.style.backgroundColor = 'rgba(155, 231, 255, 0.1)';
                } else {
                  e.currentTarget.style.backgroundColor = 'rgba(0, 255, 127, 0.05)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(var(--theme-color-rgb), 0.05)';
              }}
              onClick={() => {
                if (ctx.executeCommand) {
                  ctx.executeCommand(cmd.name);
                }
              }}
            >
              <span 
                className="text-green-400 font-mono min-w-0 flex-shrink-0 font-bold px-1 py-0.5 rounded transition-colors"
                style={{ 
                  backgroundColor: 'rgba(0, 255, 127, 0.05)',
                  color: 'var(--terminal-color)'
                }}
                onMouseEnter={(e) => {
                  const terminal = document.querySelector('[data-terminal]');
                  if (terminal?.classList.contains('theme-amber')) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 204, 102, 0.1)';
                  } else if (terminal?.classList.contains('theme-ice')) {
                    e.currentTarget.style.backgroundColor = 'rgba(155, 231, 255, 0.1)';
                  } else {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 255, 127, 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  const terminal = document.querySelector('[data-terminal]');
                  if (terminal?.classList.contains('theme-amber')) {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 204, 102, 0.05)';
                  } else if (terminal?.classList.contains('theme-ice')) {
                    e.currentTarget.style.backgroundColor = 'rgba(155, 231, 255, 0.05)';
                  } else {
                    e.currentTarget.style.backgroundColor = 'rgba(0, 255, 127, 0.05)';
                  }
                }}
              >
                {cmd.name}
              </span>
              <span className="text-green-600 flex-1">
                {cmd.description}
              </span>
            </div>
          ))}
        </div>
        <div className="text-gray-500 text-sm mt-4">
          Type <span className="text-hacker-green">help &lt;command&gt;</span> for detailed information about a specific command.
        </div>
      </div>
    );
  }
};

export default help;
