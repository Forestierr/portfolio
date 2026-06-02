import { CheckCheck, Eye, EyeOff, Languages, Save } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import TerminalPrompt from "../TerminalPrompt";

interface AdminProjectFormProps {
	editingId: string | null;
	project: any;
	setProject: (p: any) => void;
	translations: any;
	setTranslations: (t: any) => void;
	autoCorrect: () => void;
	autoTranslate: () => void;
	onSubmit: (e: React.FormEvent) => void;
	onCancel: () => void;
}

const AdminProjectForm: React.FC<AdminProjectFormProps> = ({
	editingId,
	project,
	setProject,
	translations,
	setTranslations,
	autoCorrect,
	autoTranslate,
	onSubmit,
	onCancel,
}) => {
	const { t } = useTranslation();

	return (
		<section className="space-y-6">
			<TerminalPrompt path="/home/admin/projects">
				<span className="text-white">
					{editingId ? `edit_project --id ${editingId}` : "add_new_project"}
				</span>
			</TerminalPrompt>

			<div className="flex gap-4 pl-0 md:pl-8 mb-4">
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

			<form
				onSubmit={onSubmit}
				className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-0 md:pl-8"
			>
				<div className="space-y-2">
					<label
						htmlFor="proj-title-fr"
						className="block text-xs uppercase font-bold"
					>
						Title (FR):
					</label>
					<input
						id="proj-title-fr"
						type="text"
						value={project.title}
						required
						onChange={(e) => setProject({ ...project, title: e.target.value })}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="proj-title-en"
						className="block text-xs uppercase font-bold"
					>
						Title (EN):
					</label>
					<input
						id="proj-title-en"
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
						htmlFor="proj-desc-fr"
						className="block text-xs uppercase font-bold"
					>
						Description (FR):
					</label>
					<textarea
						id="proj-desc-fr"
						value={project.description}
						required
						onChange={(e) =>
							setProject({ ...project, description: e.target.value })
						}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono h-24"
					/>
				</div>
				<div className="md:col-span-2 space-y-2">
					<label
						htmlFor="proj-desc-en"
						className="block text-xs uppercase font-bold"
					>
						Description (EN):
					</label>
					<textarea
						id="proj-desc-en"
						value={translations.en?.description || ""}
						onChange={(e) =>
							setTranslations({
								...translations,
								en: { ...translations.en, description: e.target.value },
							})
						}
						className="w-full bg-black border border-white/20 p-2 outline-none focus:border-white font-mono h-24 text-gray-400 focus:text-white"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="proj-date"
						className="block text-xs uppercase font-bold"
					>
						Date (YYYY-MM):
					</label>
					<input
						id="proj-date"
						type="text"
						value={project.date}
						required
						onChange={(e) => setProject({ ...project, date: e.target.value })}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="proj-tags"
						className="block text-xs uppercase font-bold"
					>
						Tags:
					</label>
					<input
						id="proj-tags"
						type="text"
						value={project.tags}
						onChange={(e) => setProject({ ...project, tags: e.target.value })}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="proj-link"
						className="block text-xs uppercase font-bold"
					>
						Link:
					</label>
					<input
						id="proj-link"
						type="text"
						value={project.link}
						onChange={(e) => setProject({ ...project, link: e.target.value })}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono"
					/>
				</div>
				<div className="space-y-2">
					<label
						htmlFor="proj-repo"
						className="block text-xs uppercase font-bold"
					>
						Repo URL:
					</label>
					<input
						id="proj-repo"
						type="text"
						value={project.repo}
						onChange={(e) => setProject({ ...project, repo: e.target.value })}
						className="w-full bg-black border border-white/40 p-2 outline-none focus:border-white font-mono"
					/>
				</div>
				<div className="flex items-center gap-4 py-2">
					<input
						type="checkbox"
						id="proj-draft"
						checked={project.isDraft}
						onChange={(e) =>
							setProject({ ...project, isDraft: e.target.checked })
						}
						className="appearance-none w-4 h-4 border-2 border-white checked:bg-white cursor-pointer"
					/>
					<label
						htmlFor="proj-draft"
						className="text-xs uppercase font-bold cursor-pointer select-none flex items-center gap-2"
					>
						{project.isDraft ? <EyeOff size={14} /> : <Eye size={14} />}{" "}
						{t("admin.draft")}
					</label>
				</div>
				<div className="md:col-span-2 pt-4 flex gap-4">
					<button
						type="submit"
						className="terminal-button flex-grow flex items-center justify-center gap-2 font-black"
					>
						<Save size={18} /> {editingId ? "COMMIT_CHANGES" : "EXECUTE_SAVE"}
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

export default AdminProjectForm;
