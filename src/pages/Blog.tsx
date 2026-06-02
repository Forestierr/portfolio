import type React from "react";
import { useTranslation } from "react-i18next";
import BlogCard from "../components/BlogCard";
import TerminalPrompt from "../components/TerminalPrompt";
import { useFetch } from "../hooks/useFetch";
import type { BlogPost } from "../types";

const Blog: React.FC = () => {
	const { t } = useTranslation();
	const { data: posts, loading } = useFetch<BlogPost[]>("/api/blog");

	const filteredPosts = posts?.filter((p) => !p.isDraft) || [];

	return (
		<div className="space-y-8">
			<section>
				<TerminalPrompt path="~/blog">
					<span className="text-white">grep -r ".*" ./articles</span>
				</TerminalPrompt>

				{loading ? (
					<div className="animate-pulse py-10 text-center uppercase">
						{t("common.searching")}
					</div>
				) : (
					<div className="mt-8 space-y-12 pl-0 md:pl-8">
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
