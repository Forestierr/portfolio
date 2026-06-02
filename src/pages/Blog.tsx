import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import BlogCard from "../components/BlogCard";
import SEO from "../components/SEO";
import TerminalPrompt from "../components/TerminalPrompt";
import { useFetch } from "../hooks/useFetch";
import type { BlogPost } from "../types";

const Blog: React.FC = () => {
	const { t, i18n } = useTranslation();
	const { data: posts, loading } = useFetch<BlogPost[]>("/api/blog");
	const [searchQuery, setSearchQuery] = useState("");

	const filteredPosts = (posts || [])
		.filter((p) => !p.isDraft)
		.filter((p) => {
			const lang = i18n.language as "en" | "fr";
			const title = p.translations?.[lang]?.title || p.title;
			const summary = p.translations?.[lang]?.summary || p.summary;
			const query = searchQuery.toLowerCase();
			return (
				title.toLowerCase().includes(query) ||
				summary.toLowerCase().includes(query)
			);
		});

	return (
		<div className="space-y-8">
			<SEO title={t("seo.blog_title")} />
			<section>
				<TerminalPrompt path="~/blog">
					<span className="text-white">grep -r ".*" ./articles</span>
				</TerminalPrompt>

				<div className="mb-8 pl-0 sm:pl-4 md:pl-8">
					<div className="flex items-center gap-2 border-2 border-white/20 p-2 focus-within:border-white transition-colors max-w-md">
						<span className="text-white opacity-50">$ grep</span>
						<input
							type="text"
							placeholder="Search_articles..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="bg-transparent border-none outline-none flex-grow text-white placeholder:text-white/30"
						/>
					</div>
				</div>

				{loading ? (
					<div className="animate-pulse py-10 text-center uppercase">
						{t("common.searching")}
					</div>
				) : (
					<div className="mt-8 space-y-8 md:space-y-12 pl-0 sm:pl-4 md:pl-8">
						{filteredPosts.map((post) => (
							<BlogCard key={post.id} post={post} />
						))}
					</div>
				)}
			</section>
		</div>
	);
};

export default Blog;
