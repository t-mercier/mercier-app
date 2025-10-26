import { Command } from '../types';
import linksData from '../../../data/links.json';

const contact: Command = {
  name: 'contact',
  description: 'Get in touch - email and social links',
  handler: (args, ctx) => {
    return (
      <div className="space-y-4">
        <div className="font-bold text-hacker-green text-lg">Contact & Links</div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-hacker-green font-mono min-w-0">email</span>
            <a 
              href={`mailto:${linksData.email}`}
              className="text-gray-300 hover:text-hacker-green transition-colors"
            >
              {linksData.email}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-hacker-green font-mono min-w-0">linkedin</span>
            <a 
              href={linksData.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-hacker-green transition-colors"
            >
              {linksData.linkedin}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-hacker-green font-mono min-w-0">github</span>
            <a 
              href={linksData.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-hacker-green transition-colors"
            >
              {linksData.github}
            </a>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-hacker-green font-mono min-w-0">twitter</span>
            <a 
              href={linksData.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-hacker-green transition-colors"
            >
              {linksData.twitter}
            </a>
          </div>
        </div>
        <div className="text-gray-400 text-sm border-t border-gray-800 pt-4">
          <span className="text-hacker-green">Best ways to reach me:</span> Email for professional inquiries, LinkedIn for networking, GitHub for code collaboration.
        </div>
      </div>
    );
  }
};

export default contact;
