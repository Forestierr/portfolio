export interface Project {
	id: string;
	title: string;
	description: string;
	tags: string[];
	link: string;
	repo?: string;
	date: string;
	isDraft?: boolean;
}

export const projects: Project[] = [
	{
		id: "1",
		title: "TERMINAL_OS_CLONE",
		description:
			"A fully functional terminal emulator built with React and Xterm.js. Supports custom commands and file system simulation.",
		tags: ["React", "TypeScript", "Xterm.js"],
		link: "https://example.com/project1",
		repo: "https://github.com/user/project1",
		date: "2024-03",
	},
	{
		id: "2",
		title: "MINIMAL_MARKDOWN_PARSER",
		description:
			"High-performance markdown to HTML converter with support for custom terminal-style extensions.",
		tags: ["Node.js", "AST", "Regex"],
		link: "https://example.com/project2",
		date: "2024-01",
	},
	{
		id: "3",
		title: "NEO_VIM_CONFIG_GEN",
		description:
			"Interactive CLI tool to generate optimized Lua configurations for Neovim based on user preferences.",
		tags: ["Go", "CLI", "Lua"],
		link: "https://example.com/project3",
		repo: "https://github.com/user/project3",
		date: "2023-11",
	},
];
