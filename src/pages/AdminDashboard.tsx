import type React from "react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminBlogForm from "../components/admin/AdminBlogForm";
import AdminHeader from "../components/admin/AdminHeader";
import AdminItemList from "../components/admin/AdminItemList";
import AdminProjectForm from "../components/admin/AdminProjectForm";
import type { BlogPost, Project } from "../types";

const AdminDashboard: React.FC = () => {
	const [activeTab, setActiveTab] = useState<"projects" | "blog">("projects");
	const [status, setStatus] = useState("");
	const [projects, setProjects] = useState<Project[]>([]);
	const [posts, setPosts] = useState<BlogPost[]>([]);
	const [editingId, setEditingId] = useState<string | null>(null);
	const navigate = useNavigate();

	const [translations, setTranslations] = useState<any>({ en: {} });

	const [project, setProject] = useState({
		title: "",
		description: "",
		tags: "",
		link: "",
		repo: "",
		date: new Date().toISOString().slice(0, 7),
		isDraft: false,
	});

	const [blog, setBlog] = useState({
		title: "",
		slug: "",
		summary: "",
		content: "",
		date: new Date().toISOString().slice(0, 10),
		readTime: "5 min",
		isDraft: false,
	});

	const fetchData = useCallback(async () => {
		try {
			const [projRes, blogRes] = await Promise.all([
				fetch("/api/projects"),
				fetch("/api/blog"),
			]);
			setProjects(await projRes.json());
			setPosts(await blogRes.json());
		} catch (_err) {
			setStatus("ERROR_FETCHING_DATA");
		}
	}, []);

	useEffect(() => {
		const token = localStorage.getItem("adminToken");
		if (!token) {
			navigate("/admin");
		} else {
			fetchData();
		}
	}, [navigate, fetchData]);

	const handleLogout = () => {
		localStorage.removeItem("adminToken");
		navigate("/admin");
	};

	const resetForms = () => {
		setEditingId(null);
		setTranslations({ en: {} });
		setProject({
			title: "",
			description: "",
			tags: "",
			link: "",
			repo: "",
			date: new Date().toISOString().slice(0, 7),
			isDraft: false,
		});
		setBlog({
			title: "",
			slug: "",
			summary: "",
			content: "",
			date: new Date().toISOString().slice(0, 10),
			readTime: "5 min",
			isDraft: false,
		});
	};

	const autoTranslate = async (type: "projects" | "blog") => {
		setStatus("TRANSLATING...");
		const fields =
			type === "projects"
				? { title: project.title, description: project.description }
				: { title: blog.title, summary: blog.summary, content: blog.content };

		const translated: any = {};
		try {
			for (const [key, value] of Object.entries(fields)) {
				const res = await fetch("/api/translate", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({ text: value, targetLang: "en-US" }),
				});
				const data = await res.json();
				translated[key] = data.text;
			}
			setTranslations({
				...translations,
				en: { ...translations.en, ...translated },
			});
			setStatus("TRANSLATION_COMPLETE");
		} catch (_err) {
			setStatus("TRANSLATION_FAILED");
		}
	};

	const autoCorrect = async (type: "projects" | "blog") => {
		setStatus("CORRECTING...");
		const text = type === "projects" ? project.description : blog.content;

		try {
			const res = await fetch("/api/correct", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ text, lang: "fr" }),
			});
			if (res.ok) {
				const data = await res.json();
				if (type === "projects")
					setProject({ ...project, description: data.text });
				else setBlog({ ...blog, content: data.text });
				setStatus("CORRECTION_COMPLETE");
			} else {
				const data = await res.json();
				setStatus(data.error || "CORRECTION_UNAVAILABLE");
			}
		} catch (_err) {
			setStatus("CORRECTION_FAILED");
		}
	};

	const saveProject = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus(editingId ? "UPDATING_PROJECT..." : "SAVING_PROJECT...");
		const url = editingId ? `/api/projects/${editingId}` : "/api/projects";
		const method = editingId ? "PUT" : "POST";

		try {
			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...project,
					tags:
						typeof project.tags === "string"
							? project.tags.split(",").map((t) => t.trim())
							: project.tags,
					translations,
				}),
			});
			if (res.ok) {
				setStatus(editingId ? "PROJECT_UPDATED" : "PROJECT_SAVED");
				resetForms();
				fetchData();
			}
		} catch (_err) {
			setStatus("ERROR_PERSISTING_DATA");
		}
	};

	const deleteProject = async (id: string) => {
		if (!confirm(`CONFIRM_DELETION: project/${id}`)) return;
		try {
			const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
			if (res.ok) {
				setStatus("PROJECT_DELETED");
				fetchData();
			}
		} catch (_err) {
			setStatus("ERROR_DELETING_PROJECT");
		}
	};

	const editProject = (p: Project) => {
		setEditingId(p.id);
		setTranslations(p.translations || { en: {} });
		setProject({
			title: p.title,
			description: p.description,
			tags: p.tags.join(", "),
			link: p.link,
			repo: p.repo || "",
			date: p.date,
			isDraft: !!p.isDraft,
		});
		setActiveTab("projects");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const saveBlog = async (e: React.FormEvent) => {
		e.preventDefault();
		setStatus(editingId ? "UPDATING_ARTICLE..." : "SAVING_ARTICLE...");
		const url = editingId ? `/api/blog/${editingId}` : "/api/blog";
		const method = editingId ? "PUT" : "POST";

		try {
			const res = await fetch(url, {
				method,
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ ...blog, translations }),
			});
			if (res.ok) {
				setStatus(editingId ? "ARTICLE_UPDATED" : "ARTICLE_PUBLISHED");
				resetForms();
				fetchData();
			}
		} catch (_err) {
			setStatus("ERROR_PERSISTING_DATA");
		}
	};

	const deleteBlog = async (id: string) => {
		if (!confirm(`CONFIRM_DELETION: blog/${id}`)) return;
		try {
			const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
			if (res.ok) {
				setStatus("ARTICLE_DELETED");
				fetchData();
			}
		} catch (_err) {
			setStatus("ERROR_DELETING_ARTICLE");
		}
	};

	const editBlog = (p: BlogPost) => {
		setEditingId(p.id);
		setTranslations(p.translations || { en: {} });
		setBlog({
			title: p.title,
			slug: p.slug,
			summary: p.summary,
			content: p.content,
			date: p.date,
			readTime: p.readTime,
			isDraft: !!p.isDraft,
		});
		setActiveTab("blog");
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	const BLOG_TEMPLATES = {
		tutorial:
			"# Tutorial: Title\n\n## Introduction\nBriefly describe what we will build.\n\n## Prerequisites\n- Knowledge of X\n- Tool Y installed\n\n## Implementation\nStep-by-step guide goes here.\n\n## Conclusion\nFinal thoughts.",
		release:
			"# Release Notes: v1.x.x\n\n## Features\n- Added X functionality\n- Improved Y performance\n\n## Bug Fixes\n- Fixed Z crash\n\n## Contributors\nThanks to everyone involved!",
		thought:
			"# Dev Thoughts: Topic\n\nI've been thinking about X lately...\n\n> Quote or main point here\n\nWhat do you think? Let me know!",
	};

	const loadTemplate = (type: keyof typeof BLOG_TEMPLATES) => {
		setBlog({ ...blog, content: BLOG_TEMPLATES[type] });
	};

	return (
		<div className="space-y-8 pb-20">
			<AdminHeader
				activeTab={activeTab}
				setActiveTab={setActiveTab}
				handleLogout={handleLogout}
				resetForms={resetForms}
			/>

			{status && (
				<div className="border-2 border-white p-2 text-center animate-pulse uppercase text-sm font-bold">
					{status}
				</div>
			)}

			<div className="grid grid-cols-1 xl:grid-cols-3 gap-12">
				{activeTab === "projects" ? (
					<>
						<div className="xl:col-span-2">
							<AdminProjectForm
								editingId={editingId}
								project={project}
								setProject={setProject}
								translations={translations}
								setTranslations={setTranslations}
								autoCorrect={() => autoCorrect("projects")}
								autoTranslate={() => autoTranslate("projects")}
								onSubmit={saveProject}
								onCancel={resetForms}
							/>
						</div>
						<AdminItemList
							title="Existing_Projects"
							items={projects}
							getId={(p) => p.id}
							renderTitle={(p) => p.title}
							renderDate={(p) => p.date}
							isDraft={(p) => !!p.isDraft}
							onEdit={editProject}
							onDelete={deleteProject}
						/>
					</>
				) : (
					<>
						<div className="xl:col-span-2">
							<AdminBlogForm
								editingId={editingId}
								blog={blog}
								setBlog={setBlog}
								translations={translations}
								setTranslations={setTranslations}
								autoCorrect={() => autoCorrect("blog")}
								autoTranslate={() => autoTranslate("blog")}
								loadTemplate={loadTemplate}
								onSubmit={saveBlog}
								onCancel={resetForms}
							/>
						</div>
						<AdminItemList
							title="Existing_Articles"
							items={posts}
							getId={(p) => p.id}
							renderTitle={(p) => p.title}
							renderDate={(p) => p.date}
							isDraft={(p) => !!p.isDraft}
							onEdit={editBlog}
							onDelete={deleteBlog}
						/>
					</>
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
