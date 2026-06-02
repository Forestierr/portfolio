import type React from "react";
import SkillCard from "../components/SkillCard";
import TerminalPrompt from "../components/TerminalPrompt";

const Home: React.FC = () => {
	return (
		<div className="space-y-12">
			<section>
				<TerminalPrompt path="~">
					<span className="text-white">whoami</span>
				</TerminalPrompt>

				<div className="pl-0 md:pl-8 border-l-2 border-white/20 mt-4 space-y-6">
					<h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
						Fullstack Developer <br />
						<span className="bg-white text-black px-2">Systems Enthusiast</span>
					</h1>

					<p className="text-lg max-w-2xl leading-relaxed">
						Passionate about building efficient, scalable, and minimalist
						software. I specialize in React, TypeScript, and the surrounding
						ecosystem, with a deep love for terminal-based workflows and
						monochrome aesthetics.
					</p>

					<div className="flex flex-wrap gap-4 pt-4">
						<button
							type="button"
							className="terminal-button uppercase font-bold tracking-widest"
						>
							Download_CV.pdf
						</button>
						<button
							type="button"
							className="terminal-button uppercase font-bold tracking-widest opacity-60 hover:opacity-100"
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

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-4 pl-0 md:pl-8">
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
