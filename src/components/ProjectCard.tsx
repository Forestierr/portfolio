import { Calendar, ExternalLink, GitBranch as Github, Tag } from "lucide-react";
import type React from "react";
import type { Project } from "../data/projects";

interface ProjectCardProps {
	project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	return (
		<div className="border-2 border-white p-4 sm:p-6 hover:bg-white hover:text-black transition-all duration-300 group">
			<div className="flex justify-between items-start mb-4 gap-2">
				<h3 className="text-lg sm:text-xl font-bold uppercase tracking-tighter">
					{project.title}
				</h3>
				<div className="flex gap-3 pt-1">
					{project.repo && (
						<a
							href={project.repo}
							target="_blank"
							rel="noopener noreferrer"
							className="group-hover:text-black"
						>
							<Github size={20} />
						</a>
					)}
					<a
						href={project.link}
						target="_blank"
						rel="noopener noreferrer"
						className="group-hover:text-black"
					>
						<ExternalLink size={20} />
					</a>
				</div>
			</div>

			<p className="mb-6 opacity-80 group-hover:opacity-100">
				{project.description}
			</p>

			<div className="flex flex-wrap gap-2 mb-4">
				{project.tags.map((tag) => (
					<span
						key={tag}
						className="text-xs border border-current px-2 py-0.5 flex items-center gap-1"
					>
						<Tag size={10} /> {tag}
					</span>
				))}
			</div>

			<div className="text-xs flex items-center gap-1 opacity-60 group-hover:opacity-100">
				<Calendar size={12} /> {project.date}
			</div>
		</div>
	);
};

export default ProjectCard;
