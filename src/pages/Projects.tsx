import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import ProjectCard from "../components/ProjectCard";
import SEO from "../components/SEO";
import TerminalPrompt from "../components/TerminalPrompt";
import { useFetch } from "../hooks/useFetch";
import type { Project } from "../types";

const Projects: React.FC = () => {
	const { t, i18n } = useTranslation();
	const { data: projectList, loading } = useFetch<Project[]>("/api/projects");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredProjects = (projectList || [])
		.filter((p) => !p.isDraft)
		.filter((p) => {
			const lang = i18n.language as "en" | "fr";
			const title = p.translations?.[lang]?.title || p.title;
			const description = p.translations?.[lang]?.description || p.description;
			const query = searchQuery.toLowerCase();
			return (
				title.toLowerCase().includes(query) ||
				description.toLowerCase().includes(query) ||
				p.tags.some((tag) => tag.toLowerCase().includes(query))
			);
		});

	return (
		<div className="space-y-8">
			<SEO title={t("seo.projects_title")} />
			<section>
				<TerminalPrompt path="~/projects">
					<span className="text-white">ls -la ./showcase</span>
				</TerminalPrompt>

				<div className="mb-8 pl-0 sm:pl-4 md:pl-8">
					<div className="flex items-center gap-2 border-2 border-white/20 p-2 focus-within:border-white transition-colors max-w-md">
						<span className="text-white opacity-50">$ grep</span>
						<input
							type="text"
							placeholder="Filter_projects..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="bg-transparent border-none outline-none flex-grow text-white placeholder:text-white/30"
						/>
					</div>
				</div>

				{loading ? (
					<div className="animate-pulse py-10 text-center uppercase">
						{t("common.loading")}
					</div>
				) : (
					<div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
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
