import type React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TerminalPrompt from "../components/TerminalPrompt";

const AdminLogin: React.FC = () => {
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch("/api/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ password }),
			});

			if (res.ok) {
				const data = await res.json();
				localStorage.setItem("adminToken", data.token);
				navigate("/admin/dashboard");
			} else {
				setError("ACCESS_DENIED: Invalid Credentials");
				setPassword("");
			}
		} catch (_err) {
			setError("SYSTEM_ERROR: Connection Failed");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-20 p-8 border-2 border-white">
			<TerminalPrompt path="/etc/auth">
				<span className="text-white">login --admin</span>
			</TerminalPrompt>

			<form onSubmit={handleLogin} className="space-y-6 mt-8">
				<div>
					<label
						htmlFor="admin-password"
						className="block mb-2 text-sm uppercase font-bold tracking-widest"
					>
						Enter_Password:
					</label>
					<input
						id="admin-password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="w-full bg-black border-2 border-white p-2 outline-none focus:bg-white focus:text-black transition-all font-mono"
					/>
				</div>

				{error && (
					<div className="text-red-500 text-xs animate-pulse uppercase font-bold">
						{error}
					</div>
				)}

				<button
					type="submit"
					className="w-full terminal-button uppercase font-bold tracking-widest"
				>
					Authenticate
				</button>
			</form>

			<div className="mt-8 text-[10px] text-gray-500 text-center uppercase">
				Warning: Unauthorized access is logged and monitored.
			</div>
		</div>
	);
};

export default AdminLogin;
