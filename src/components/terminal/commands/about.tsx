import { Command } from '../types';

const about: Command = {
  name: 'about',
  description: 'Short bio and philosophy',
  aliases: ['whoami'],
  handler: (args, ctx) => {
    return (
      <div className="space-y-4">
        <div className="font-bold text-hacker-green text-lg">About</div>
        <div className="space-y-3 text-gray-300">
          <p>
            I&apos;m a software engineer and creative director based in Amsterdam, where I build 
            navigation systems by day and explore the intersection of technology and art by night.
          </p>
          <p>
            My journey spans from creative direction and event design to low-level programming 
            and system architecture. I believe the best solutions emerge when technical precision 
            meets creative thinking.
          </p>
          <p>
            Currently working at <span className="text-hacker-green">TomTom</span> on core 
            navigation services, I focus on building and maintaining our premium map rendering engine. 
            My background in creative direction helps me think beyond pure functionality to consider user experience and narrative.
          </p>
          <p>
            When I&apos;m not working, I&apos;m coding apps for myself to make my life easier, 
            exploring the beauty of AI, or doing any kind of craft, DIY, interior design, 
            or creating any kind of stuff.
          </p>
        </div>
        <div className="text-gray-400 text-sm border-t border-gray-800 pt-4">
          <span className="text-hacker-green">Philosophy:</span> Technology should serve human creativity, not replace it.
        </div>
      </div>
    );
  }
};

export default about;
