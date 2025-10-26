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

const getThemeColor = (theme: string) => {
  if (theme === 'amber') return '#ffcc66';
  if (theme === 'ice') return '#9be7ff';
  return '#00ff7f'; // default green
};

const theme: Command = {
  name: 'theme',
  description: 'Change terminal color theme',
  usage: 'theme [green|amber|ice]',
  handler: (args, ctx) => {
    if (args.length === 0) {
      return (
        <div className="space-y-2">
          <div className="font-bold" style={{ color: getThemeColor(ctx.theme) }}>
            Available themes:
          </div>
          {Object.values(themes).map((themeOption) => (
            <div 
              key={themeOption.name} 
              className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                if (ctx.executeCommand) {
                  ctx.executeCommand(`theme ${themeOption.name}`);
                }
              }}
            >
              <span 
                className="w-4 h-4 border border-current"
                style={{ backgroundColor: themeOption.color }}
              ></span>
              <span 
                className="font-mono"
                style={{ color: getThemeColor(ctx.theme) }}
              >
                {themeOption.name}
              </span>
            </div>
          ))}
          <div className="text-gray-400 text-sm mt-2">
            Current theme: <span className="font-mono" style={{ color: getThemeColor(ctx.theme) }}>{ctx.theme}</span>
          </div>
        </div>
      );
    }

    const themeName = args[0].toLowerCase();
    if (themeName in themes) {
      ctx.setTheme(themeName);
      return (
        <div style={{ color: getThemeColor(themeName) }}>
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
