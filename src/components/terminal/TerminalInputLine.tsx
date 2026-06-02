import type React from "react";

interface TerminalInputLineProps {
	input: string;
	currentPath: string[];
	isMatrix: boolean;
	cursorPos: number;
	inputRef: React.RefObject<HTMLInputElement | null>;
	handleKeyDown: (e: React.KeyboardEvent) => void;
	handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	updateCursorPos: () => void;
	onSubmit: (e: React.FormEvent) => void;
}

const TerminalInputLine: React.FC<TerminalInputLineProps> = ({
	input,
	currentPath,
	isMatrix,
	cursorPos,
	inputRef,
	handleKeyDown,
	handleInputChange,
	updateCursorPos,
	onSubmit,
}) => {
	return (
		<form
			onSubmit={onSubmit}
			className="flex gap-2 items-center border-t border-white/10 pt-4 shrink-0 relative"
			onClick={() => inputRef.current?.focus()}
		>
			<span className={isMatrix ? "text-green-500" : "text-white"}>
				visitor@portfolio
			</span>
			<span className="text-gray-500">:</span>
			<span className={isMatrix ? "text-green-300" : "text-white"}>
				/{currentPath.join("/")}
			</span>
			<span>$</span>

			{/* Virtual Input Container */}
			<div className="flex items-center flex-grow relative overflow-hidden h-5">
				<div
					className={`flex whitespace-pre z-10 font-mono ${isMatrix ? "text-green-400" : "text-white"}`}
				>
					<span>{input.slice(0, cursorPos)}</span>
					<div
						className={`w-2 h-4 shrink-0 animate-blink ${isMatrix ? "bg-green-400 shadow-[0_0_8px_#4ade80]" : "bg-white"}`}
					></div>
					<span>{input.slice(cursorPos)}</span>
				</div>

				{/* Actual Hidden Input */}
				<input
					ref={inputRef}
					type="text"
					value={input}
					onKeyDown={handleKeyDown}
					onSelect={updateCursorPos}
					onClick={updateCursorPos}
					onFocus={updateCursorPos}
					onChange={handleInputChange}
					className="absolute inset-0 opacity-0 cursor-default"
				/>
			</div>
		</form>
	);
};

export default TerminalInputLine;
