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
          {filter && `(filtered by "${filter}")`}
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
                {project.images && project.images.length > 0 && (
                  <div className="flex gap-2 mt-2">
                    {project.images.map((image, imgIndex) => (
                      <div key={imgIndex} className="relative inline-block">
                        <img
                          src={image}
                          alt={`${project.title} demo ${imgIndex + 1}`}
                          className="w-32 h-24 object-cover rounded border border-gray-600 hover:border-green-400 transition-all duration-300 cursor-pointer hover:scale-105 hover:z-10 hover:shadow-lg"
                          style={{ imageRendering: 'pixelated' }}
                          onMouseEnter={(e) => {
                            const popup = e.currentTarget.nextElementSibling;
                            if (popup) popup.style.opacity = '1';
                          }}
                          onMouseLeave={(e) => {
                            const popup = e.currentTarget.nextElementSibling;
                            if (popup) popup.style.opacity = '0';
                          }}
                        />
                        {/* Large preview on hover */}
                        <div 
                          className="absolute top-0 left-full ml-4 w-[800px] h-[600px] transition-opacity duration-300 pointer-events-none z-50"
                          style={{ opacity: 0 }}
                        >
                          <img
                            src={image}
                            alt={`${project.title} demo ${imgIndex + 1} - enlarged`}
                            className="w-full h-full object-cover rounded-lg shadow-2xl"
                            style={{ imageRendering: 'pixelated' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div className="space-y-1">
                  {project.highlights.map((highlight, hIndex) => (
                    <div key={hIndex} className="text-gray-300 text-sm ml-2">
                      • {highlight}
                    </div>
                  ))}
                </div>
                {(project.github || project.website) && (
                  <div className="flex gap-3 mt-2">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 text-sm underline"
                      >
                        📁 GitHub
                      </a>
                    )}
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-400 hover:text-green-300 text-sm underline"
                      >
                        🌐 Website
                      </a>
                    )}
                  </div>
                )}
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
