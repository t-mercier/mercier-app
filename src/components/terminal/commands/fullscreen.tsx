import { Command } from '../types';

const fullscreen: Command = {
  name: 'fullscreen',
  description: 'Toggle browser fullscreen mode',
  handler: (args, ctx) => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch((err) => {
        console.log("Exit fullscreen failed:", err);
      });
      return (
        <div className="text-hacker-green">
          Exited fullscreen mode. Press ESC to exit this terminal overlay.
        </div>
      );
    } else {
      document.documentElement.requestFullscreen().catch((err) => {
        console.log("Fullscreen request failed:", err);
      });
      return (
        <div className="text-hacker-green">
          Entered fullscreen mode. Press ESC to exit fullscreen or this terminal overlay.
        </div>
      );
    }
  }
};

export default fullscreen;
