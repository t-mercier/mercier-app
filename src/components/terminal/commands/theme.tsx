import { Command } from '../types';

const themes = {
  green: {
    name: 'green',
    color: '#00ff7f'
  },
  amber: {
    name: 'amber', 
    color: '#ffcc66'
  },
  ice: {
    name: 'ice',
    color: '#9be7ff'
  }
};

const theme: Command = {
  name: 'theme',
  description: 'Change terminal color theme',
  usage: 'theme [green|amber|ice]',
  handler: (args, ctx) => {
    if (args.length === 0) {
      return (
        <div className="space-y-2">
          <div className="text-hacker-green font-bold">Available themes:</div>
          {Object.values(themes).map((theme) => (
            <div key={theme.name} className="flex items-center space-x-3">
              <span 
                className="w-4 h-4 border border-current"
                style={{ backgroundColor: theme.color }}
              ></span>
              <span className="text-gray-300">
                <span className="font-mono">{theme.name}</span> - {theme.description}
              </span>
            </div>
          ))}
          <div className="text-gray-400 text-sm mt-2">
            Current theme: <span className="font-mono text-hacker-green">{ctx.theme}</span>
          </div>
        </div>
      );
    }

    const themeName = args[0].toLowerCase();
    if (themeName in themes) {
      ctx.setTheme(themeName);
      return (
        <div className="text-hacker-green">
          Theme changed to <span className="font-mono">{themeName}</span>
        </div>
      );
    } else {
      return (
        <div className="text-red-400">
          Unknown theme &apos;{themeName}&apos;. Available themes: {Object.keys(themes).join(', ')}
        </div>
      );
    }
  }
};

export default theme;
