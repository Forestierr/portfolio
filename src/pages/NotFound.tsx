import type React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import SEO from "../components/SEO";
import TerminalPrompt from "../components/TerminalPrompt";

const NotFound: React.FC = () => {
	const { t } = useTranslation();
	const location = useLocation();

	return (
		<div className="animate-in fade-in duration-500">
			<SEO title={t("seo.error_404_title")} />
			<TerminalPrompt path="/errors">
				<span className="text-red-500 font-bold">
					curl --head {location.pathname}
				</span>
			</TerminalPrompt>

			<div className="mt-8 space-y-6">
				<div className="terminal-border p-6 bg-red-500/5">
					<h1 className="text-4xl font-bold text-red-500 mb-2">
						HTTP_ERROR 404
					</h1>
					<p className="text-xl uppercase tracking-widest">Page_Not_Found</p>
				</div>

				<div className="space-y-4 font-mono">
					<p className="text-gray-400">
						[!] EXCEPTION: The requested resource could not be found on this
						server.
					</p>
					<p className="text-gray-400">
						[!] TRACE:
						<br />
						&nbsp;&nbsp;at RequestHandler.handle (router.ts:404)
						<br />
						&nbsp;&nbsp;at Pipeline.process (middleware.ts:12)
						<br />
						&nbsp;&nbsp;at System.init (core.ts:0)
					</p>
				</div>

				<div className="pt-4">
					<Link
						to="/"
						className="terminal-button uppercase font-bold tracking-widest inline-block"
					>
						[ RETURN_TO_HOME ]
					</Link>
				</div>
			</div>
		</div>
	);
};

export default NotFound;
