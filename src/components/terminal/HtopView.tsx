import type React from "react";

interface HtopViewProps {
	stats: {
		cpu: number;
		mem: number;
		uptime: string;
	};
}

const HtopView: React.FC<HtopViewProps> = ({ stats }) => {
	return (
		<div className="bg-black text-green-400 p-2 font-mono text-xs border border-green-400 animate-in fade-in zoom-in duration-300">
			<div className="flex justify-between mb-2 border-b border-green-800 pb-1">
				<span>HTOP v1.0.0 - PORTFOLIO_V2</span>
				<span>Uptime: {stats.uptime}</span>
			</div>
			<div className="space-y-1 mb-4">
				<div className="flex gap-2">
					<span className="w-8">CPU:</span>
					<span className="flex-grow border border-green-900 h-3 relative">
						<div
							className="bg-green-500 h-full transition-all duration-500"
							style={{ width: `${stats.cpu}%` }}
						></div>
						<span className="absolute inset-0 text-center text-[8px] mix-blend-difference">
							{stats.cpu}%
						</span>
					</span>
				</div>
				<div className="flex gap-2">
					<span className="w-8">MEM:</span>
					<span className="flex-grow border border-green-900 h-3 relative">
						<div
							className="bg-blue-500 h-full transition-all duration-500"
							style={{ width: `${stats.mem}%` }}
						></div>
						<span className="absolute inset-0 text-center text-[8px] mix-blend-difference">
							{stats.mem}% / 16.0G
						</span>
					</span>
				</div>
			</div>
			<table className="w-full text-left text-[10px]">
				<thead>
					<tr className="bg-green-900 text-black px-1 font-bold">
						<th className="px-1">PID</th>
						<th className="px-1">USER</th>
						<th className="px-1">CPU%</th>
						<th className="px-1">MEM%</th>
						<th className="px-1">TIME+</th>
						<th className="px-1">COMMAND</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td className="px-1">1024</td>
						<td className="px-1">visitor</td>
						<td className="px-1">{stats.cpu}</td>
						<td className="px-1">{stats.mem}</td>
						<td className="px-1">0:04.12</td>
						<td className="px-1">/usr/bin/vite</td>
					</tr>
					<tr>
						<td className="px-1">2048</td>
						<td className="px-1">root</td>
						<td className="px-1">0.1</td>
						<td className="px-1">2.4</td>
						<td className="px-1">12:10:05</td>
						<td className="px-1">/usr/sbin/sshd</td>
					</tr>
					<tr>
						<td className="px-1">4096</td>
						<td className="px-1">visitor</td>
						<td className="px-1">0.5</td>
						<td className="px-1">1.2</td>
						<td className="px-1">0:00.45</td>
						<td className="px-1">htop</td>
					</tr>
				</tbody>
			</table>
			<div className="mt-4 flex justify-between items-center">
				<div className="text-[10px] opacity-60 uppercase font-bold hidden sm:block">
					Press 'q' to quit htop
				</div>
				<button
					type="button"
					onClick={() => {
						const event = new KeyboardEvent("keydown", { key: "q" });
						window.dispatchEvent(event);
					}}
					className="sm:hidden terminal-button text-[10px] py-1 px-3 uppercase font-bold"
				>
					[ Quit_Htop ]
				</button>
			</div>
		</div>
	);
};

export default HtopView;
