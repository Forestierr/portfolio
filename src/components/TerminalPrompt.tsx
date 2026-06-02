import type React from "react";

interface TerminalPromptProps {
	path?: string;
	user?: string;
	machine?: string;
	children?: React.ReactNode;
}

const TerminalPrompt: React.FC<TerminalPromptProps> = ({
	path = "~",
	user = "visitor",
	machine = "portfolio",
	children,
}) => {
	return (
		<div className="flex flex-col gap-1 mb-4">
			<div className="flex flex-wrap items-center gap-2">
				<span className="text-white font-bold">
					{user}@{machine}
				</span>
				<span className="text-gray-400">:</span>
				<span className="text-white font-bold">{path}</span>
				<span className="text-white">$</span>
				{children}
			</div>
		</div>
	);
};

export default TerminalPrompt;
