import type React from "react";

interface MarkdownRendererProps {
	content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
	return (
		<div
			className="prose prose-invert max-w-none 
            prose-headings:uppercase prose-headings:tracking-tighter prose-headings:font-black
            prose-p:leading-relaxed prose-p:text-lg prose-p:opacity-90
            prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/20 prose-pre:rounded-none
            prose-strong:text-white prose-strong:bg-white/10 prose-strong:px-1
          "
		>
			{content.split("\n").map((line, i) => {
				if (line.startsWith("# "))
					return (
						<h1 key={`${i}-${line}`} className="text-4xl mt-12 mb-6">
							{line.replace("# ", "")}
						</h1>
					);
				if (line.startsWith("## "))
					return (
						<h2 key={`${i}-${line}`} className="text-2xl mt-8 mb-4">
							{line.replace("## ", "")}
						</h2>
					);
				if (line.startsWith("### "))
					return (
						<h3 key={`${i}-${line}`} className="text-xl mt-6 mb-3 font-bold">
							{line.replace("### ", "")}
						</h3>
					);
				if (line.trim() === "") return <br key={`${i}-br`} />;
				return (
					<p key={`${i}-p`} className="mb-4">
						{line}
					</p>
				);
			})}
		</div>
	);
};

export default MarkdownRenderer;
