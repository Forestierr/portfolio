export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	summary: string;
	content: string;
	date: string;
	readTime: string;
	isDraft?: boolean;
}

export const blogPosts: BlogPost[] = [
	{
		id: "1",
		slug: "why-monochrome-matters",
		title: "The Philosophy of Monochrome Design",
		summary:
			"Exploring why reducing color can increase focus and clarity in developer tools.",
		content: `
# The Philosophy of Monochrome Design

In a world full of distractions and vibrant colors, monochrome design stands as a pillar of focus. 
When we remove the noise of color, we are left with the core of the experience: **content and structure**.

## Why Developers Love Terminals
The terminal isn't just a tool; it's an environment where the interface is minimal, and the feedback loop is direct. 

### Key Benefits:
1. **Reduced Cognitive Load**: No need to process complex visual cues.
2. **High Contrast**: White on black (or green on black) provides maximum readability.
3. **Consistency**: A terminal looks and behaves the same way across different systems.

This portfolio aims to capture that essence. It's not about being "retro"; it's about being **efficient**.
    `,
		date: "2024-05-20",
		readTime: "5 min",
	},
	{
		id: "2",
		slug: "mastering-the-cli",
		title: "Mastering the CLI Workflow",
		summary:
			"Tips and tricks for building your own CLI tools using modern technologies.",
		content: `
# Mastering the CLI Workflow

Building a CLI tool is one of the most rewarding experiences for a developer. 

## The Stack
I personally prefer using **Go** or **Node.js** for building CLI applications. 

- **Go**: Great for binaries and performance.
- **Node.js (oclif/commander)**: Excellent ecosystem and ease of development.

Stay tuned for a deep dive into building a custom shell.
    `,
		date: "2024-04-15",
		readTime: "8 min",
	},
];
