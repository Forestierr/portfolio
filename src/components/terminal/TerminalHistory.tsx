import type React from "react";

interface TerminalHistoryProps {
	history: { input?: string; output: string[]; path?: string[] }[];
	currentPath: string[];
	isMatrix: boolean;
}

const TerminalHistory: React.FC<TerminalHistoryProps> = ({
	history,
	currentPath,
	isMatrix,
}) => {
	return (
		<div className="space-y-1">
			{history.map((entry, i) => {
				const displayPath = entry.path || currentPath;
				return (
					<div
						key={i}
						className="animate-in fade-in slide-in-from-left-2 duration-300"
					>
						{entry.input !== undefined && (
							<div className="flex gap-2">
								<span className={isMatrix ? "text-green-500" : "text-white"}>
									visitor@portfolio
								</span>
								<span className="text-gray-500">:</span>
								<span className={isMatrix ? "text-green-300" : "text-white"}>
									/{displayPath.join("/")}
								</span>
								<span>$</span>
								<span>{entry.input}</span>
							</div>
						)}
						{entry.output.map((line, j) => (
							<div
								key={j}
								className={
									line === "" ? "h-2" : "break-all opacity-90 whitespace-pre"
								}
							>
								{line}
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
};

export default TerminalHistory;
