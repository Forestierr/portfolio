import type React from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import TerminalPrompt from "../components/TerminalPrompt";
import { useFetch } from "../hooks/useFetch";
import type { Project } from "../types";

const Projects: React.FC = () => {
	const { t, i18n } = useTranslation();
	const { data: projectList, loading } = useFetch<Project[]>("/api/projects");

	const filteredProjects = projectList?.filter((p) => !p.isDraft) || [];

	return (
		<div className="space-y-8">
			<section>
				<TerminalPrompt path="~/projects">
					<span className="text-white">ls -la ./showcase</span>
				</TerminalPrompt>

				{loading ? (
					<div className="animate-pulse py-10 text-center uppercase">
						{t("common.loading")}
					</div>
				) : (
					<div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
						{filteredProjects.map((project) => {
							const lang = i18n.language as "en" | "fr";
							const displayProject = {
								...project,
								title: project.translations?.[lang]?.title || project.title,
								description:
									project.translations?.[lang]?.description ||
									project.description,
							};
							return <ProjectCard key={project.id} project={displayProject} />;
						})}
					</div>
				)}
			</section>

			<section className="border-2 border-white border-dashed p-8 text-center mt-12">
				<p className="text-lg opacity-60 italic">
					More projects are being indexed in the database...
				</p>
				<a
					href="https://github.com"
					target="_blank"
					rel="noopener noreferrer"
					className="inline-block mt-4 terminal-link uppercase font-bold"
				>
					View all on GitHub
				</a>
			</section>
		</div>
	);
};

export default Projects;
