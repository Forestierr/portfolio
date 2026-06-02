import type React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import TerminalPrompt from "../components/TerminalPrompt";

const ServerError: React.FC = () => {
	const { t } = useTranslation();

	return (
		<div className="animate-in fade-in duration-500">
			<SEO title={t("seo.error_500_title")} />
			<TerminalPrompt path="/sys/kernel">
				<span className="text-red-500 font-bold">tail -f /var/log/syslog</span>
			</TerminalPrompt>

			<div className="mt-8 space-y-6">
				<div className="terminal-border p-6 bg-red-500/10 border-red-500 animate-pulse">
					<h1 className="text-4xl font-bold text-red-500 mb-2">
						CRITICAL_FAILURE 500
					</h1>
					<p className="text-xl uppercase tracking-widest text-red-400">
						Internal_Server_Error
					</p>
				</div>

				<div className="space-y-4 font-mono bg-black/50 p-4 border border-dashed border-gray-700">
					<p className="text-red-500 font-bold">
						*** KERNEL PANIC - NOT SYNCING: FATAL ERROR ***
					</p>
					<p className="text-gray-400 text-sm">
						A critical error occurred while processing your request. The system
						has been halted to prevent data corruption.
					</p>
					<p className="text-gray-500 text-xs">
						Register dump:
						<br />
						EAX: 0x000001F4 EBX: 0x00000000 ECX: 0xDEADBEEF EDX: 0xCAFEBABE
						<br />
						ESI: 0x00000001 EDI: 0x00000000 EBP: 0x00000000 ESP: 0x00000000
					</p>
				</div>

				<div className="pt-4 flex gap-4">
					<Link
						to="/"
						className="terminal-button border-red-500 text-red-500 hover:bg-red-500 hover:text-white uppercase font-bold tracking-widest inline-block"
					>
						[ REBOOT_SYSTEM ]
					</Link>
					<button
						type="button"
						onClick={() => window.location.reload()}
						className="terminal-link uppercase font-bold text-sm"
					>
						[ RETRY_REQUEST ]
					</button>
				</div>
			</div>
		</div>
	);
};

export default ServerError;
