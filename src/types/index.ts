export interface Project {
	id: string;
	title: string;
	description: string;
	tags: string[];
	link: string;
	repo?: string;
	date: string;
	isDraft?: boolean;
	translations?: {
		en?: { title?: string; description?: string };
		fr?: { title?: string; description?: string };
	};
}

export interface BlogPost {
	id: string;
	slug: string;
	title: string;
	summary: string;
	content: string;
	date: string;
	readTime: string;
	isDraft?: boolean;
	translations?: {
		en?: { title?: string; summary?: string; content?: string };
		fr?: { title?: string; summary?: string; content?: string };
	};
}

export interface ApiResponse<T> {
	data: T | null;
	loading: boolean;
	error: string | null;
}
