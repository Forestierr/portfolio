import { FileText, LayoutGrid, LogOut } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";

interface AdminHeaderProps {
	activeTab: "projects" | "blog";
	setActiveTab: (tab: "projects" | "blog") => void;
	handleLogout: () => void;
	resetForms: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
	activeTab,
	setActiveTab,
	handleLogout,
	resetForms,
}) => {
	const { t } = useTranslation();

	return (
		<header className="flex justify-between items-center border-b-2 border-white pb-4">
			<div className="flex items-center gap-4">
				<h1 className="text-2xl font-black uppercase tracking-tighter bg-white text-black px-2">
					{t("admin.dashboard")}
				</h1>
				<nav className="flex gap-4">
					<button
						type="button"
						onClick={() => {
							setActiveTab("projects");
							resetForms();
						}}
						className={`terminal-link flex items-center gap-2 ${activeTab === "projects" ? "bg-white text-black" : ""}`}
					>
						<LayoutGrid size={16} /> [{t("admin.projects")}]
					</button>
					<button
						type="button"
						onClick={() => {
							setActiveTab("blog");
							resetForms();
						}}
						className={`terminal-link flex items-center gap-2 ${activeTab === "blog" ? "bg-white text-black" : ""}`}
					>
						<FileText size={16} /> [{t("admin.blog")}]
					</button>
				</nav>
			</div>
			<button
				type="button"
				onClick={handleLogout}
				className="terminal-link flex items-center gap-2 text-red-500"
			>
				<LogOut size={16} /> [LOGOUT]
			</button>
		</header>
	);
};

export default AdminHeader;
