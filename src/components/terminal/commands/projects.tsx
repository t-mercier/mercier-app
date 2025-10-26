import { Command } from '../types';
import projectsData from '../../../data/projects.json';

const projects: Command = {
  name: 'projects',
  description: 'Show selected work with short highlights',
  usage: 'projects [filter]',
  aliases: ['ls'],
  handler: (args, ctx) => {
    const filter = args.join(' ').toLowerCase();
    const filteredProjects = filter 
      ? projectsData.filter(p => 
          p.title.toLowerCase().includes(filter) ||
          p.stack.some(s => s.toLowerCase().includes(filter)) ||
          p.highlights.some(h => h.toLowerCase().includes(filter))
        )
      : projectsData;

    if (filteredProjects.length === 0) {
      return (
        <div className="text-red-400">
          No projects found matching &apos;{filter}&apos;. Try a different filter or run &apos;projects&apos; to see all.
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <div className="font-bold text-hacker-green text-lg">
          Selected Projects {filter && `(filtered by "${filter}")`}
        </div>
        <div className="space-y-4">
          {filteredProjects.map((project, index) => (
            <div key={index} className="border-l-2 border-hacker-green/30 pl-4 space-y-2">
              <div className="flex items-start justify-between">
                <div className="font-semibold text-hacker-green text-base">
                  {project.title}
                </div>
                <div className="text-gray-400 text-sm">
                  {project.period}
                </div>
              </div>
              <div className="text-gray-300 text-sm">
                <span className="text-hacker-green">Role:</span> {project.role}
              </div>
              <div className="text-gray-300 text-sm">
                {project.description}
              </div>
              <div className="space-y-1">
                <div className="text-gray-400 text-sm">
                  <span className="text-hacker-green">Stack:</span> {project.stack.join(', ')}
                </div>
                <div className="space-y-1">
                  {project.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="text-gray-300 text-sm ml-2">
                      • {highlight}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 text-sm mt-4 border-t border-gray-800 pt-4">
          <span className="text-hacker-green">Tip:</span> Use &apos;projects &lt;keyword&gt;&apos; to filter by technology, role, or project name.
        </div>
      </div>
    );
  }
};

export default projects;
