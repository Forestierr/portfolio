import type React from "react";
import { useTranslation } from "react-i18next";

interface MoonViewProps {
	frame: string[];
}

const MoonView: React.FC<MoonViewProps> = ({ frame }) => {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center justify-center h-full">
			<div className="text-white font-mono whitespace-pre leading-tight scale-125 mb-8">
				{frame.map((line, i) => (
					<div
						key={i}
						className={
							i === frame.length - 1
								? "mt-4 text-center text-xs opacity-50 font-bold"
								: ""
						}
					>
						{i === frame.length - 1 ? `[ ${t(line)} ]` : line}
					</div>
				))}
			</div>
			<div className="mt-8 text-[10px] uppercase tracking-[0.3em] text-white/30 animate-pulse">
				Press 'q' to break orbit
			</div>
		</div>
	);
};

export default MoonView;
