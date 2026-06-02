/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				"terminal-black": "#000000",
				"terminal-white": "#ffffff",
				"terminal-gray": "#a0a0a0",
			},
			fontFamily: {
				mono: [
					"JetBrains Mono",
					"Fira Code",
					"ui-monospace",
					"SFMono-Regular",
					"Menlo",
					"Monaco",
					"Consolas",
					"Liberation Mono",
					"Courier New",
					"monospace",
				],
			},
			animation: {
				blink: "blink 1s step-end infinite",
			},
			keyframes: {
				blink: {
					"0%, 100%": { opacity: 1 },
					"50%": { opacity: 0 },
				},
			},
		},
	},
	plugins: [],
};
