import {
	CheckCheck,
	Eye,
	EyeOff,
	FileType,
	Languages,
	Plus,
} from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import TerminalPrompt from "../TerminalPrompt";

interface AdminBlogFormProps {
	editingId: string | null;
	blog: any;
	setBlog: (b: any) => void;
	translations: any;
	setTranslations: (t: any) => void;
	autoCorrect: () => void;
	autoTranslate: () => void;
	loadTemplate: (type: "tutorial" | "release" | "thought") => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
}

const AdminBlogForm: React.FC<AdminBlogFormProps> = ({
	editingId,
	blog,
	setBlog,
	translations,
	setTranslations,
	autoCorrect,
	autoTranslate,
	loadTemplate,
	onSubmit,
	onCancel,
}) => {
	const { t } = useTranslation();

	return (
		<section className="xl:col-span-2 space-y-6">
			<TerminalPrompt path="/home/admin/blog">
				<span className="text-white">
					{editingId
						? `edit_article --slug ${blog.slug}`
						: "write_article --output article.md"}
				</span>
			</TerminalPrompt>

			<div className="flex flex-wrap gap-4 pl-0 md:pl-8 mb-4">
				<div className="flex gap-2 border-r border-white/20 pr-4">
					<button
						type="button"
						onClick={() => loadTemplate("tutorial")}
						className="text-[10px] border border-white/40 px-2 py-1 hover:bg-white hover:text-black flex items-center gap-1"
					>
						<FileType size={10} /> TUTORIAL
					</button>
					<button
						type="button"
						onClick={() => loadTemplate("release")}
						className="text-[10px] border border-white/40 px-2 py-1 hover:bg-white hover:text-black flex items-center gap-1"
					>
						<FileType size={10} /> RELEASE
					</button>
				</div>
				<div className="flex gap-2">
					<button
						type="button"
						onClick={autoCorrect}
						className="text-xs border border-white/40 px-2 py-1 hover:bg-white hover:text-black flex items-center gap-2"
					>
						<CheckCheck size={14} /> {t("admin.correct")}
					</button>
					<button
						type="button"
						onClick={autoTranslate}
						className="text-xs border border-white/40 px-2 py-1 hover:bg-white hover:text-black flex items-center gap-2"
					>
						<Languages size={14} /> {t("admin.translate")}
					</button>
				</div>
			</div>

			<form
				onSubmit={onSubmit}
				className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-8"
			>
				<div className="space-y-2">
					<label
						htmlFor="blog-title-fr"
						className="block text-xs uppercase font-bold"
					>
						Title (FR):
					</label>
					<input
						id="blog-title-fr"
						type="text"
						value={blog.title}
						required
						onChange={(e) => {
							const slug = e.target.value
								.toLowerCase()
								.replace(/ /g, "-")
								.replace(/[^\w-]/g, "");
							setBlog({ ...blog, title: e.target.value, slug });
						}}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="blog-title-en"
						className="block text-xs uppercase font-bold"
					>
						Title (EN):
					</label>
					<input
						id="blog-title-en"
						type="text"
						value={translations.en?.title || ""}
						onChange={(e) =>
							setTranslations({
								...translations,
								en: { ...translations.en, title: e.target.value },
							})
						}
						className="w-full bg-black border border-white/20 p-2 outline-none focus:border-white font-mono text-gray-400 focus:text-white"
					/>
				</div>
				<div className="md:col-span-2 space-y-2">
					<label
						htmlFor="blog-summary-fr"
						className="block text-xs uppercase font-bold"
					>
						Summary (FR):
					</label>
					<input
						id="blog-summary-fr"
						type="text"
						value={blog.summary}
						required
						onChange={(e) => setBlog({ ...blog, summary: e.target.value })}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono"
					/>
				</div>
				<div className="md:col-span-2 space-y-2">
					<label
						htmlFor="blog-summary-en"
						className="block text-xs uppercase font-bold"
					>
						Summary (EN):
					</label>
					<input
						id="blog-summary-en"
						type="text"
						value={translations.en?.summary || ""}
						onChange={(e) =>
							setTranslations({
								...translations,
								en: { ...translations.en, summary: e.target.value },
							})
						}
						className="w-full bg-black border border-white/20 p-2 outline-none focus:border-white font-mono text-gray-400 focus:text-white"
					/>
				</div>
				<div className="md:col-span-2 space-y-2">
					<label
						htmlFor="blog-content-fr"
						className="block text-xs uppercase font-bold"
					>
						Content (FR - Markdown):
					</label>
					<textarea
						id="blog-content-fr"
						value={blog.content}
						required
						onChange={(e) => setBlog({ ...blog, content: e.target.value })}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono h-64"
					/>
				</div>
				<div className="md:col-span-2 space-y-2">
					<label
						htmlFor="blog-content-en"
						className="block text-xs uppercase font-bold"
					>
						Content (EN - Markdown):
					</label>
					<textarea
						id="blog-content-en"
						value={translations.en?.content || ""}
						onChange={(e) =>
							setTranslations({
								...translations,
								en: { ...translations.en, content: e.target.value },
							})
						}
						className="w-full bg-black border border-white/20 p-2 outline-none focus:border-white font-mono h-64 text-gray-400 focus:text-white"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="blog-read-time"
						className="block text-xs uppercase font-bold"
					>
						Read Time:
					</label>
					<input
						id="blog-read-time"
						type="text"
						value={blog.readTime}
						onChange={(e) => setBlog({ ...blog, readTime: e.target.value })}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="blog-date"
						className="block text-xs uppercase font-bold"
					>
						Date:
					</label>
					<input
						id="blog-date"
						type="text"
						value={blog.date}
						onChange={(e) => setBlog({ ...blog, date: e.target.value })}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono"
					/>
				</div>
				<div className="flex items-center gap-4 py-2">
					<input
						type="checkbox"
						id="blog-draft"
						checked={blog.isDraft}
						onChange={(e) => setBlog({ ...blog, isDraft: e.target.checked })}
						className="appearance-none w-4 h-4 border-2 border-white checked:bg-white cursor-pointer"
					/>
					<label
						htmlFor="blog-draft"
						className="text-xs uppercase font-bold cursor-pointer select-none flex items-center gap-2"
					>
						{blog.isDraft ? <EyeOff size={14} /> : <Eye size={14} />}{" "}
						{t("admin.draft")}
					</label>
				</div>
				<div className="md:col-span-2 pt-4 flex gap-4">
					<button
						type="submit"
						className="terminal-button flex-grow flex items-center justify-center gap-2 font-black"
					>
						<Plus size={18} />{" "}
						{editingId ? "COMMIT_CHANGES" : "PUBLISH_ARTICLE"}
					</button>
					{editingId && (
						<button
							type="button"
							onClick={onCancel}
							className="terminal-button opacity-60"
						>
							{t("common.cancel")}
						</button>
					)}
				</div>
			</form>
		</section>
	);
};

export default AdminBlogForm;
