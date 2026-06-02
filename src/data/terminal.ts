export interface FileSystemNode {
	type: "file" | "dir";
	content?: string;
	children?: Record<string, FileSystemNode>;
	permissions?: string;
	size?: string;
	date?: string;
}

export const VFS: Record<string, FileSystemNode> = {
	home: {
		type: "dir",
		permissions: "drwxr-xr-x",
		size: "4.0K",
		date: "Jun 01 23:30",
		children: {
			visitor: {
				type: "dir",
				permissions: "drwxr-xr-x",
				size: "4.0K",
				date: "Jun 01 23:35",
				children: {
					"readme.txt": {
						type: "file",
						permissions: "-rw-r--r--",
						size: "156B",
						date: "Jun 01 23:40",
						content:
							"Welcome to my interactive terminal. You can explore the site using CLI commands.",
					},
					"about.md": {
						type: "file",
						permissions: "-rw-r--r--",
						size: "210B",
						date: "Jun 01 23:42",
						content:
							"# About Me\nI am a Fullstack Developer specializing in React and Systems Design.",
					},
					"contact.txt": {
						type: "file",
						permissions: "-rw-r--r--",
						size: "84B",
						date: "Jun 01 23:45",
						content: "Email: contact@example.com\nGitHub: github.com/user",
					},
				},
			},
		},
	},
	projects: {
		type: "dir",
		permissions: "drwxr-xr-x",
		size: "4.0K",
		date: "Jun 01 23:30",
		children: {
			terminal_os: {
				type: "file",
				permissions: "-rwxr-xr-x",
				size: "1.2M",
				date: "May 12 10:15",
				content:
					"Project: Terminal OS\nDescription: A terminal emulator in React.\nStatus: DEPLOYED",
			},
			portfolio_v2: {
				type: "file",
				permissions: "-rwxr-xr-x",
				size: "850K",
				date: "Jun 01 22:00",
				content:
					"Project: Portfolio V2\nDescription: This current monochrome site.\nStatus: ACTIVE",
			},
		},
	},
	etc: {
		type: "dir",
		permissions: "drwxr-xr-x",
		size: "4.0K",
		date: "May 01 00:00",
		children: {
			passwd: {
				type: "file",
				permissions: "-rw-r--r--",
				size: "1.2K",
				date: "May 01 00:00",
				content:
					"root:x:0:0:root:/root:/bin/bash\nvisitor:x:1000:1000:visitor:/home/visitor:/bin/bash\nadmin:admin123:access_granted",
			},
			motd: {
				type: "file",
				permissions: "-rw-r--r--",
				size: "45B",
				date: "May 01 00:00",
				content:
					"Permission denied. Only authorized users can read the message of the day.",
			},
			shadow: {
				type: "file",
				permissions: "-rw-------",
				size: "852B",
				date: "May 01 00:00",
				content: "Nice try. Your IP has been logged. (Easter Egg #1)",
			},
		},
	},
	secret: {
		type: "dir",
		permissions: "drwx------",
		size: "4.0K",
		date: "Jun 01 23:55",
		children: {
			"easter_egg.txt": {
				type: "file",
				permissions: "-rw-------",
				size: "12B",
				date: "Jun 01 23:55",
				content:
					'Congrats! You found a secret. Use command "matrix" for a surprise.',
			},
		},
	},
};

export const COMMAND_MANUALS: Record<string, string[]> = {
	ls: [
		"ls - list directory contents",
		"Usage: ls [-la] [directory]",
		"Options:",
		"  -l  use a long listing format",
		"  -a  do not ignore entries starting with .",
	],
	cd: ["cd - change the shell working directory", "Usage: cd [directory]"],
	cat: [
		"cat - concatenate files and print on the standard output",
		"Usage: cat [file]",
	],
	tree: [
		"tree - list contents of directories in a tree-like format",
		"Usage: tree [directory]",
	],
	htop: ["htop - interactive process viewer", "Usage: htop"],
	ping: [
		"ping - send ICMP ECHO_REQUEST to network hosts",
		"Usage: ping [host]",
	],
	goto: [
		"goto - portfolio custom navigation command",
		"Usage: goto [home|projects|blog]",
	],
	lang: ["lang - change the system language", "Usage: lang [fr|en]"],
};

export const ROOB_ASCII = [
	"______ _____  _____ _____ ",
	"| ___ \\  _  ||  _  | ___ \\",
	"| |_/ / | | || | | | |_/ /",
	"|    /| | | || | | | ___ \\",
	"| |\\ \\\\ \\_/ /\\ \\_/ / |_/ /",
	"\\_| \\_|\\___/  \\___/\\____/ ",
	"",
];

export const MOON_FRAMES = [
	[
		"       _..._     ",
		"     .:::::::.   ",
		"    :::::::::::  ",
		"    :::::::::::  ",
		"    `:::::::::'  ",
		"      `':::''    ",
		"terminal.moon_1",
	],
	[
		"       _..._     ",
		"     .::::. `.   ",
		"    :::::::.  :  ",
		"    ::::::::  :  ",
		"    `::::::' .'  ",
		"      `'::'-'    ",
		"terminal.moon_2",
	],
	[
		"       _..._     ",
		"     .::::  `.   ",
		"    ::::::    :  ",
		"    ::::::    :  ",
		"    `:::::   .'  ",
		"      `'::.-'    ",
		"terminal.moon_3",
	],
	[
		"       _..._     ",
		"     .::'   `.   ",
		"    :::       :  ",
		"    :::       :  ",
		"    `::.     .'  ",
		"      `':..-'    ",
		"terminal.moon_4",
	],
	[
		"       _..._     ",
		"     .'     `.   ",
		"    :         :  ",
		"    :         :  ",
		"    `.       .'  ",
		"      `-...-'    ",
		"terminal.moon_5",
	],
	[
		"       _..._     ",
		"     .'   `::.   ",
		"    :       :::  ",
		"    :       :::  ",
		"    `.     .::'  ",
		"      `-..:''    ",
		"terminal.moon_6",
	],
	[
		"       _..._     ",
		"     .'  ::::.   ",
		"    :    ::::::  ",
		"    :    ::::::  ",
		"    `.   :::::'  ",
		"      `-.::''    ",
		"terminal.moon_7",
	],
	[
		"       _..._     ",
		"     .' .::::.   ",
		"    :  ::::::::  ",
		"    :  ::::::::  ",
		"    `. '::::::'  ",
		"       `-.::''   ",
		"terminal.moon_8",
	],
];
