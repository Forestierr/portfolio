import type React from "react";

interface SkillCardProps {
	title: string;
	skills: string[];
}

const SkillCard: React.FC<SkillCardProps> = ({ title, skills }) => {
	return (
		<div className="border border-white/40 p-4">
			<h3 className="font-bold border-b border-white mb-2 uppercase">
				{title}
			</h3>
			<ul className="list-none space-y-1">
				{skills.map((skill) => (
					<li key={skill}>
						{">"} {skill}
					</li>
				))}
			</ul>
		</div>
	);
};

export default SkillCard;
