import type React from "react";
import { useTranslation } from "react-i18next";
import SEO from "../components/SEO";
import SkillCard from "../components/SkillCard";
import TerminalPrompt from "../components/TerminalPrompt";

const Home: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className="space-y-12">
			<SEO title={t("seo.home_title")} />
			<section>
				<TerminalPrompt path="~">
					<span className="text-white">whoami</span>
				</TerminalPrompt>

				<div className="pl-0 sm:pl-4 md:pl-8 border-l-0 sm:border-l-2 border-white/20 mt-4 space-y-6">
					<h1 className="text-3xl sm:text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">
						Fullstack Developer <br />
						<span className="bg-white text-black px-2 inline-block mt-2 sm:mt-0">
							Systems Enthusiast
						</span>
					</h1>

					<p className="text-base sm:text-lg max-w-2xl leading-relaxed opacity-80">
						Passionate about building efficient, scalable, and minimalist
						software. I specialize in React, TypeScript, and the surrounding
						ecosystem, with a deep love for terminal-based workflows and
						monochrome aesthetics.
					</p>

					<div className="flex flex-col sm:flex-row gap-4 pt-4">
						<button
							type="button"
							className="terminal-button uppercase font-bold tracking-widest text-sm sm:text-base"
						>
							Download_CV.pdf
						</button>
						<button
							type="button"
							className="terminal-button uppercase font-bold tracking-widest opacity-60 hover:opacity-100 text-sm sm:text-base"
						>
							Contact_Me
						</button>
					</div>
				</div>
			</section>

			<section>
				<TerminalPrompt path="~">
					<span className="text-white">cat skills.json</span>
				</TerminalPrompt>

				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-4 pl-0 sm:pl-4 md:pl-8">
					<SkillCard
						title="Frontend"
						skills={[
							"React / Next.js",
							"TypeScript",
							"Tailwind CSS",
							"Redux / Zustand",
						]}
					/>
					<SkillCard
						title="Backend"
						skills={[
							"Node.js / Express",
							"PostgreSQL / MongoDB",
							"GraphQL / REST",
							"Docker / Kubernetes",
						]}
					/>
					<SkillCard
						title="Tools"
						skills={[
							"Git / GitHub Actions",
							"Neovim / Tmux",
							"Linux (Arch/Debian)",
							"AWS / Vercel",
						]}
					/>
				</div>
			</section>

			<section className="text-center py-12 border-t-2 border-white/10">
				<p className="text-gray-500 italic">
					"Simplicity is the ultimate sophistication." — Leonardo da Vinci
				</p>
			</section>
		</div>
	);
};

export default Home;
