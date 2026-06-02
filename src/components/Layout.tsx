import {
	GitBranch as Github,
	Languages,
	Link as Linkedin,
	Mail,
	Terminal,
} from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

interface LayoutProps {
	children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const { t, i18n } = useTranslation();
	const location = useLocation();
	const currentPath = location.pathname === "/" ? "~" : `~${location.pathname}`;

	const toggleLanguage = () => {
		i18n.changeLanguage(i18n.language === "fr" ? "en" : "fr");
	};

	return (
		<div className="min-h-screen bg-black text-white p-4 md:p-8 font-mono flex flex-col">
			{/* Terminal Header Bar */}
			<header className="border-2 border-white p-2 mb-8 flex justify-between items-center sticky top-4 bg-black z-10">
				<div className="flex items-center gap-2">
					<Terminal size={20} />
					<span className="font-bold hidden sm:inline">
						DEV_TERMINAL v{new Date().getDay()}.{new Date().getMonth()}.
						{new Date().getFullYear()}
					</span>
					<span className="text-gray-400">|</span>
					<span className="animate-pulse">●</span>
				</div>

				<nav className="flex gap-4 items-center">
					<Link
						to="/"
						className={`terminal-link ${location.pathname === "/" ? "bg-white text-black" : ""}`}
					>
						{t("nav.home")}
					</Link>
					<Link
						to="/projects"
						className={`terminal-link ${location.pathname === "/projects" ? "bg-white text-black" : ""}`}
					>
						{t("nav.projects")}
					</Link>
					<Link
						to="/blog"
						className={`terminal-link ${location.pathname.startsWith("/blog") ? "bg-white text-black" : ""}`}
					>
						{t("nav.blog")}
					</Link>
					<Link
						to="/terminal"
						className={`terminal-link ${location.pathname === "/terminal" ? "bg-white text-black" : ""}`}
					>
						{t("nav.terminal")}
					</Link>
					<button
						type="button"
						onClick={toggleLanguage}
						className="terminal-link flex items-center gap-1 uppercase font-bold text-xs ml-2 border border-white px-1 hover:bg-white hover:text-black"
					>
						<Languages size={14} /> {i18n.language}
					</button>
				</nav>
			</header>

			{/* Main Content Area */}
			<main className="flex-grow max-w-5xl mx-auto w-full border-x-0 md:border-x-2 border-white px-4 md:px-12 py-8 relative">
				<div className="absolute top-0 right-4 text-xs text-gray-500 py-2">
					LOC: {currentPath}
				</div>
				{children}
			</main>

			{/* Terminal Footer */}
			<footer className="mt-12 border-2 border-white p-4 flex flex-col md:flex-row justify-between items-center gap-4">
				<div className="text-sm">
					© {new Date().getFullYear()} - ROOB@PORTFOLIO ~ BUILD_SUCCESSFUL
				</div>
				<div className="flex gap-6">
					<a
						href="https://github.com/Forestierr"
						target="_blank"
						rel="noopener noreferrer"
						className="terminal-link flex items-center gap-2"
					>
						<Github size={18} /> GitHub
					</a>
					<a
						href="https://linkedin.com/in/Forestierr"
						target="_blank"
						rel="noopener noreferrer"
						className="terminal-link flex items-center gap-2"
					>
						<Linkedin size={18} /> LinkedIn
					</a>
					<a
						href="mailto:robinforestier1407@gmail.com"
						className="terminal-link flex items-center gap-2"
					>
						<Mail size={18} /> Email
					</a>
				</div>
			</footer>

			{/* Retro Scanline Effect */}
			<div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]"></div>
		</div>
	);
};

export default Layout;
