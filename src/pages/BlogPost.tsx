import { ArrowLeft, Calendar, Clock } from "lucide-react";
import type React from "react";
import { useTranslation } from "react-i18next";
import { Link, Navigate, useParams } from "react-router-dom";
import MarkdownRenderer from "../components/MarkdownRenderer";
import SEO from "../components/SEO";
import TerminalPrompt from "../components/TerminalPrompt";
import { useFetch } from "../hooks/useFetch";
import type { BlogPost as BlogPostType } from "../types";

const BlogPost: React.FC = () => {
	const { t, i18n } = useTranslation();
	const { slug } = useParams<{ slug: string }>();
	const { data: post, loading } = useFetch<BlogPostType>(`/api/blog/${slug}`);

	if (loading) {
		return (
			<div className="animate-pulse py-20 text-center uppercase font-mono">
				{t("common.loading")}
			</div>
		);
	}

	if (!post) {
		return <Navigate to="/blog" replace />;
	}

	const lang = i18n.language as "en" | "fr";
	const title = post.translations?.[lang]?.title || post.title;
	const summary = post.translations?.[lang]?.summary || post.summary;
	const content = post.translations?.[lang]?.content || post.content;

	return (
		<div className="space-y-8 pb-20">
			<SEO title={title} description={summary} article />
			<Link
				to="/blog"
				className="terminal-link inline-flex items-center gap-2 mb-4 uppercase text-sm font-bold"
			>
				<ArrowLeft size={16} /> [ {t("common.back")} ]
			</Link>

			<section>
				<TerminalPrompt path={`~/blog/${post.slug}`}>
					<span className="text-white">cat article.md</span>
				</TerminalPrompt>

				<div className="mt-8 pl-0 sm:pl-4 md:pl-8">
					<header className="mb-8 md:mb-12 border-b-2 border-white/20 pb-8">
						<h1 className="text-2xl sm:text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6 leading-tight">
							{title}
						</h1>

						<div className="flex flex-wrap gap-4 md:gap-6 text-xs opacity-60">
							<div className="flex items-center gap-2">
								<Calendar size={16} /> {post.date}
							</div>
							<div className="flex items-center gap-2">
								<Clock size={16} /> {post.readTime}
							</div>
						</div>
					</header>

					<MarkdownRenderer content={content} />
				</div>
			</section>

			<div className="mt-20 pt-12 border-t-2 border-white/20 flex justify-between items-center">
				<Link
					to="/blog"
					className="terminal-link uppercase font-bold tracking-widest"
				>
					[ EOF ]
				</Link>
				<button
					type="button"
					onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
					className="terminal-link uppercase font-bold tracking-widest"
				>
					[ TOP ^ ]
				</button>
			</div>
		</div>
	);
};

export default BlogPost;
