import { Calendar, Clock } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { BlogPost } from "../types";

interface BlogCardProps {
	post: BlogPost;
}

const BlogCard: React.FC<BlogCardProps> = ({ post }) => {
	const { t, i18n } = useTranslation();
	const lang = i18n.language as "en" | "fr";
	const title = post.translations?.[lang]?.title || post.title;
	const summary = post.translations?.[lang]?.summary || post.summary;

	return (
		<article className="group">
			<Link to={`/blog/${post.slug}`} className="block space-y-3">
				<div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-xs opacity-60 group-hover:opacity-100">
					<div className="flex items-center gap-1">
						<Calendar size={14} /> {post.date}
					</div>
					<div className="hidden md:block">|</div>
					<div className="flex items-center gap-1">
						<Clock size={14} /> {post.readTime}
					</div>
				</div>

				<h2 className="text-2xl font-bold uppercase tracking-tight group-hover:bg-white group-hover:text-black inline-block transition-colors">
					{title}
				</h2>

				<p className="opacity-80 max-w-3xl line-clamp-2">{summary}</p>

				<div className="text-sm font-bold uppercase tracking-widest pt-2">
					[ {t("common.read_more")} {">"} ]
				</div>
			</Link>
		</article>
	);
};

export default BlogCard;
