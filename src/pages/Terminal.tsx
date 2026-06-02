import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import SEO from "../components/SEO";
import CameraView from "../components/terminal/CameraView";
import HtopView from "../components/terminal/HtopView";
import MoonView from "../components/terminal/MoonView";
import TerminalHistory from "../components/terminal/TerminalHistory";
import TerminalInputLine from "../components/terminal/TerminalInputLine";
import {
	COMMAND_MANUALS,
	type FileSystemNode,
	MOON_FRAMES,
	ROOB_ASCII,
	VFS,
} from "../data/terminal";

const MAX_HISTORY_LINES = 100;

const Terminal: React.FC = () => {
	const { t, i18n } = useTranslation();
	const [history, setHistory] = useState<
		{ input?: string; output: string[]; path?: string[] }[]
	>([]);

	// Initial welcome message
	useEffect(() => {
		setHistory([
			{
				output: [
					...ROOB_ASCII,
					t("terminal.welcome"),
					t("terminal.help_hint"),
					t("terminal.features"),
					"",
				],
			},
		]);
	}, [t]);

	const [input, setInput] = useState("");
	const [currentPath, setCurrentPath] = useState(["home", "visitor"]);
	const [isMatrix, setIsMatrix] = useState(false);
	const [isHtop, setIsHtop] = useState(false);
	const [isMoon, setIsMoon] = useState(false);
	const [isCamera, setIsCamera] = useState(false);
	const [moonFrame, setMoonFrame] = useState(0);
	const [commandHistory, setCommandHistory] = useState<string[]>([]);
	const [historyPointer, setHistoryPointer] = useState(-1);
	const [htopStats, setHtopStats] = useState({
		cpu: 12,
		mem: 45,
		uptime: "02:14:55",
	});
	const [cursorPos, setCursorPos] = useState(0);

	const scrollRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const navigate = useNavigate();

	const updateCursorPos = () => {
		if (inputRef.current) {
			setCursorPos(inputRef.current.selectionStart || 0);
		}
	};

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
		}
	}, [history, isHtop, isMoon]);

	useEffect(() => {
		const interval = setInterval(updateCursorPos, 50);
		return () => clearInterval(interval);
	}, []);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (isHtop) {
			interval = setInterval(() => {
				setHtopStats((prev) => ({
					cpu: Math.floor(Math.random() * 20) + 5,
					mem: Math.floor(Math.random() * 5) + 42,
					uptime: prev.uptime,
				}));
			}, 1000);

			const handleHtopKey = (e: KeyboardEvent) => {
				if (e.key === "q") {
					setIsHtop(false);
					setHistory((prev) => [...prev, { output: ["htop terminated."] }]);
				}
			};

			window.addEventListener("keydown", handleHtopKey);
			return () => {
				clearInterval(interval);
				window.removeEventListener("keydown", handleHtopKey);
			};
		}
	}, [isHtop]);

	useEffect(() => {
		let interval: ReturnType<typeof setInterval>;
		if (isMoon) {
			interval = setInterval(() => {
				setMoonFrame((prev) => (prev + 1) % MOON_FRAMES.length);
			}, 400);

			const handleMoonKey = (e: KeyboardEvent) => {
				if (e.key === "q") {
					setIsMoon(false);
					setHistory((prev) => [...prev, { output: ["Orbit exited."] }]);
				}
			};

			window.addEventListener("keydown", handleMoonKey);
			return () => {
				clearInterval(interval);
				window.removeEventListener("keydown", handleMoonKey);
			};
		}
		return () => clearInterval(interval);
	}, [isMoon]);

	const getDir = (pathArr: string[]) => {
		let curr: FileSystemNode | undefined = { type: "dir", children: VFS };
		for (const p of pathArr) {
			if (curr?.children) curr = curr.children[p];
			else return null;
		}
		return curr;
	};

	const generateTree = (
		node: FileSystemNode,
		name: string,
		prefix = "",
	): string[] => {
		let result = [`${prefix}${prefix ? "└── " : ""}${name}`];
		if (node.type === "dir" && node.children) {
			const keys = Object.keys(node.children);
			for (let index = 0; index < keys.length; index++) {
				const key = keys[index];
				const childNode = node.children[key];
				if (childNode) {
					const isLast = index === keys.length - 1;
					const childPrefix = prefix + (isLast ? "    " : "│   ");
					result = [...result, ...generateTree(childNode, key, childPrefix)];
				}
			}
		}
		return result;
	};

	const resolvePath = (pathArg: string): string[] | null => {
		if (!pathArg || pathArg === "~") return ["home", "visitor"];
		if (pathArg === "/") return [];

		const newPath = pathArg.startsWith("/") ? [] : [...currentPath];
		const segments = pathArg
			.split("/")
			.filter((s) => s.length > 0 && s !== ".");

		for (const segment of segments) {
			if (segment === "..") {
				if (newPath.length > 0) newPath.pop();
			} else {
				newPath.push(segment);
			}
		}
		return newPath;
	};

	const handleAutocomplete = () => {
		const parts = input.split(" ");
		const lastPart = parts[parts.length - 1];

		// Handle path-based autocomplete (e.g., cd home/vis[TAB])
		const lastSlashIndex = lastPart.lastIndexOf("/");
		const dirPart =
			lastSlashIndex !== -1 ? lastPart.slice(0, lastSlashIndex) : "";
		const prefix =
			lastSlashIndex !== -1 ? lastPart.slice(lastSlashIndex + 1) : lastPart;

		// Resolve the directory to look in
		const dirPathToSearch =
			lastSlashIndex !== -1
				? resolvePath(dirPart || (lastPart.startsWith("/") ? "/" : "."))
				: currentPath;

		if (!dirPathToSearch) return;

		const dir = getDir(dirPathToSearch);
		if (dir?.children) {
			const matches = Object.keys(dir.children).filter((name) =>
				name.startsWith(prefix),
			);
			if (matches.length === 1) {
				const completion = matches[0];
				const newLastPart =
					lastSlashIndex !== -1 ? `${dirPart}/${completion}` : completion;

				parts[parts.length - 1] = newLastPart;
				const newInput = parts.join(" ");
				setInput(newInput);
				setTimeout(() => {
					if (inputRef.current) {
						inputRef.current.selectionStart = inputRef.current.selectionEnd =
							newInput.length;
						updateCursorPos();
					}
				}, 0);
			} else if (matches.length > 1) {
				setHistory((prev) => [...prev, { output: [matches.join("  ")] }]);
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Tab") {
			e.preventDefault();
			handleAutocomplete();
		} else if (e.key === "ArrowUp") {
			e.preventDefault();
			if (historyPointer < commandHistory.length - 1) {
				const newPointer = historyPointer + 1;
				setHistoryPointer(newPointer);
				const prevCmd = commandHistory[commandHistory.length - 1 - newPointer];
				setInput(prevCmd);
				setTimeout(() => {
					if (inputRef.current) {
						inputRef.current.selectionStart = inputRef.current.selectionEnd =
							prevCmd.length;
						updateCursorPos();
					}
				}, 0);
			}
		} else if (e.key === "ArrowDown") {
			e.preventDefault();
			if (historyPointer > 0) {
				const newPointer = historyPointer - 1;
				setHistoryPointer(newPointer);
				const prevCmd = commandHistory[commandHistory.length - 1 - newPointer];
				setInput(prevCmd);
				setTimeout(() => {
					if (inputRef.current) {
						inputRef.current.selectionStart = inputRef.current.selectionEnd =
							prevCmd.length;
						updateCursorPos();
					}
				}, 0);
			} else if (historyPointer === 0) {
				setHistoryPointer(-1);
				setInput("");
				setCursorPos(0);
			}
		}
	};

	const handleCommand = (cmdStr: string) => {
		const parts = cmdStr.trim().split(/\s+/);
		const cmd = parts[0].toLowerCase();
		const args = parts.slice(1);
		let output: string[] = [];
		const snapshotPath = [...currentPath];

		setCommandHistory((prev) => [...prev, cmdStr]);
		setHistoryPointer(-1);
		setCursorPos(0);

		switch (cmd) {
			case "help":
				output = [
					"Available commands:",
					"  ls [-la]       List directory contents",
					"  cd <dir>       Change directory",
					"  cat <file>     Read file content",
					"  tree           Show directory structure",
					"  man <cmd>      Show manual for command",
					"  htop           Interactive process viewer (press q to quit)",
					"  ping <host>    Ping a host",
					"  lang <fr|en>   Change interface language",
					"  clear          Clear terminal",
					"  goto <page>    Navigate to pages",
					"  matrix         Wake up, Neo...",
					"  exit           Close session",
				];
				break;
			case "man":
				if (!args[0]) output = ["What manual page do you want?"];
				else if (COMMAND_MANUALS[args[0]]) output = COMMAND_MANUALS[args[0]];
				else output = [`No manual entry for ${args[0]}`];
				break;
			case "ls": {
				let showHidden = false;
				let longFormat = false;
				let targetArg = "";
				args.forEach((arg) => {
					if (arg.startsWith("-")) {
						if (arg.includes("a")) showHidden = true;
						if (arg.includes("l")) longFormat = true;
					} else targetArg = arg;
				});

				const targetPath = targetArg ? resolvePath(targetArg) : currentPath;
				if (!targetPath) {
					output = [
						`ls: cannot access '${targetArg}': No such file or directory`,
					];
					break;
				}

				const dir = getDir(targetPath);
				if (dir && dir.type === "dir" && dir.children) {
					const entries = Object.entries(dir.children);
					if (longFormat) {
						output = entries.map(
							([name, node]) =>
								`${node.permissions}  1 visitor  visitor  ${(node.size || "0").padStart(6)} ${node.date || "Jan 01 00:00"} ${name}`,
						);
						if (showHidden) {
							output = [
								"drwxr-xr-x  2 visitor  visitor    4.0K Jun 01 00:00 .",
								"drwxr-xr-x  2 visitor  visitor    4.0K Jun 01 00:00 ..",
								...output,
							];
						}
					} else output = [entries.map(([name]) => name).join("  ")];
				} else
					output = [
						`ls: cannot access '${targetArg}': No such file or directory`,
					];
				break;
			}
			case "tree": {
				const dir = getDir(currentPath);
				if (dir)
					output = generateTree(
						dir,
						currentPath[currentPath.length - 1] || "/",
					);
				break;
			}
			case "top":
			case "htop":
				setIsHtop(true);
				return;
			case "camera.sh":
				setIsCamera(true);
				return;
			case "ping": {
				const host = args[0] || "google.com";
				output = [`PING ${host} (142.250.190.46): 56 data bytes`];
				setHistory((prev) => [...prev, { input: cmdStr, output }]);
				let count = 0;
				const interval = setInterval(() => {
					setHistory((prev) => [
						...prev,
						{
							output: [
								`64 bytes from 142.250.190.46: icmp_seq=${count} ttl=117 time=${(Math.random() * 10 + 20).toFixed(3)} ms`,
							],
						},
					]);
					count++;
					if (count >= 4) {
						clearInterval(interval);
						setHistory((prev) => [
							...prev,
							{
								output: [
									"",
									`--- ${host} ping statistics ---`,
									"4 packets transmitted, 4 packets received, 0.0% packet loss",
								],
							},
						]);
					}
				}, 800);
				return;
			}
			case "cd": {
				const targetPath = resolvePath(args[0]);
				if (targetPath) {
					const dir = getDir(targetPath);
					if (dir && dir.type === "dir") {
						setCurrentPath(targetPath);
					} else {
						output = [`cd: ${args[0]}: No such directory`];
					}
				} else {
					output = [`cd: ${args[0]}: No such directory`];
				}
				break;
			}
			case "cat": {
				const targetPath = resolvePath(args[0]);
				if (targetPath) {
					const node = getDir(targetPath);
					if (node && node.type === "file") {
						output = node.content?.split("\n") || [];
					} else {
						output = [`cat: ${args[0]}: No such file`];
					}
				} else {
					output = [`cat: ${args[0]}: No such file`];
				}
				break;
			}
			case "lang":
				if (["fr", "en"].includes(args[0]?.toLowerCase())) {
					i18n.changeLanguage(args[0].toLowerCase());
					output = [t("terminal.lang_switched")];
				} else output = ["Usage: lang <fr|en>", `Current: ${i18n.language}`];
				break;
			case "clear":
				setHistory([]);
				return;
			case "goto": {
				const dest = args[0]?.toLowerCase();
				if (["moon", "lune"].includes(dest)) {
					setIsMoon(true);
					output = ["Initiating orbit... target: MOON"];
				} else if (["home", "/", "projects", "blog"].includes(dest)) {
					const target = dest === "home" || dest === "/" ? "/" : `/${dest}`;
					output = [`Navigating to ${target}...`];
					setTimeout(() => navigate(target), 1000);
				} else output = [`goto: ${args[0]}: unknown destination`];
				break;
			}
			case "matrix":
				setIsMatrix(true);
				output = ["Waking up... follow the white rabbit."];
				setTimeout(() => setIsMatrix(false), 5000);
				break;
			case "exit":
				navigate("/");
				return;
			case "":
				break;
			default:
				output = [`command not found: ${cmd}`];
		}

		setHistory((prev) => {
			const newHistory = [
				...prev,
				{ input: cmdStr, output, path: snapshotPath },
			];
			return newHistory.slice(-MAX_HISTORY_LINES);
		});
	};

	return (
		<div
			className={`min-h-[60vh] md:min-h-[75vh] max-h-[85vh] md:max-h-[75vh] border-2 border-white p-2 md:p-4 font-mono text-[10px] sm:text-xs md:text-sm flex flex-col transition-all duration-1000 ${isMatrix ? "bg-green-950 text-green-400 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.3)]" : "bg-black text-white"}`}
			onClick={() => inputRef.current?.focus()}
		>
			<SEO title={t("nav.terminal").replace("[", "").replace("]", "")} />
			{isHtop ? (
				<HtopView stats={htopStats} />
			) : isMoon ? (
				<MoonView frame={MOON_FRAMES[moonFrame]} />
			) : isCamera ? (
				<CameraView
					onClose={() => {
						setIsCamera(false);
						setHistory((prev) => [
							...prev,
							{ output: ["Camera stream closed."] },
						]);
					}}
				/>
			) : (
				<div className="flex flex-col h-full overflow-hidden">
					<div
						ref={scrollRef}
						className="flex-grow overflow-y-auto mb-2 pr-1 sm:pr-2 custom-scrollbar flex flex-col justify-end"
					>
						<TerminalHistory
							history={history}
							currentPath={currentPath}
							isMatrix={isMatrix}
						/>
					</div>

					<TerminalInputLine
						input={input}
						currentPath={currentPath}
						isMatrix={isMatrix}
						cursorPos={cursorPos}
						inputRef={inputRef}
						handleKeyDown={handleKeyDown}
						handleInputChange={(e) => {
							setInput(e.target.value);
							updateCursorPos();
						}}
						updateCursorPos={updateCursorPos}
						onSubmit={(e) => {
							e.preventDefault();
							if (input.trim()) {
								handleCommand(input);
								setInput("");
							}
						}}
					/>
				</div>
			)}
		</div>
	);
};

export default Terminal;
