require("dotenv").config({ path: path.join(__dirname, ".env") });
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("node:fs").promises;
const path = require("node:path");
const deepl = require("deepl-node");

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "data.json");
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin";

// Initialize DeepL
let translator = null;
if (process.env.DEEPL_API_KEY) {
	translator = new deepl.Translator(process.env.DEEPL_API_KEY);
}

app.use(cors());
app.use(bodyParser.json());

// Static files (Production)
const DIST_PATH = path.join(__dirname, "../dist");
app.use(express.static(DIST_PATH));

// Helper to read data
async function readData() {
	try {
		const content = await fs.readFile(DATA_FILE, "utf8");
		return JSON.parse(content);
	} catch (_error) {
		return { projects: [], blogPosts: [] };
	}
}

// Helper to write data
async function writeData(data) {
	await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

// DeepL API Endpoints
app.post("/api/translate", async (req, res) => {
	if (!translator)
		return res.status(500).json({ error: "DeepL API key not configured" });
	const { text, targetLang } = req.body;
	try {
		const result = await translator.translateText(
			text,
			null,
			targetLang || "en-US",
		);
		res.json({ text: result.text });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Note: DeepL Write requires Pro key, we'll try it but handle errors
app.post("/api/correct", async (req, res) => {
	if (!translator)
		return res.status(500).json({ error: "DeepL API key not configured" });
	const { text, lang } = req.body;
	try {
		// Currently deepl-node supports rephraseText/correctText in some versions
		// or we can use a "translate to same lang" hack as a fallback if not available
		if (typeof translator.correctText === "function") {
			const result = await translator.correctText(text, {
				targetLang: lang || "fr",
			});
			res.json({ text: result.text });
		} else {
			// Fallback: translate to same language often triggers grammar fixes in some engines
			// but let's be honest and report if not supported in this client version
			res.status(501).json({
				error:
					"DeepL Write (correctText) not supported by current library version or plan",
			});
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// Routes
app.get("/api/projects", async (_req, res) => {
	const data = await readData();
	res.json(data.projects);
});

app.get("/api/projects/:id", async (req, res) => {
	const data = await readData();
	const project = data.projects.find((p) => p.id === req.params.id);
	if (project) {
		res.json(project);
	} else {
		res.status(404).json({ error: "Project not found" });
	}
});

app.post("/api/projects", async (req, res) => {
	const data = await readData();
	const newProject = { ...req.body, id: Date.now().toString() };
	data.projects.push(newProject);
	await writeData(data);
	res.status(201).json(newProject);
});

app.put("/api/projects/:id", async (req, res) => {
	const data = await readData();
	const index = data.projects.findIndex((p) => p.id === req.params.id);
	if (index !== -1) {
		data.projects[index] = { ...req.body, id: req.params.id };
		await writeData(data);
		res.json(data.projects[index]);
	} else {
		res.status(404).json({ error: "Project not found" });
	}
});

app.delete("/api/projects/:id", async (req, res) => {
	const data = await readData();
	data.projects = data.projects.filter((p) => p.id !== req.params.id);
	await writeData(data);
	res.status(204).end();
});

app.get("/api/blog", async (_req, res) => {
	const data = await readData();
	res.json(data.blogPosts);
});

app.get("/api/blog/:slug", async (req, res) => {
	const data = await readData();
	const post = data.blogPosts.find((p) => p.slug === req.params.slug);
	if (post) {
		res.json(post);
	} else {
		res.status(404).json({ error: "Post not found" });
	}
});

app.post("/api/blog", async (req, res) => {
	const data = await readData();
	const newPost = { ...req.body, id: Date.now().toString() };
	data.blogPosts.push(newPost);
	await writeData(data);
	res.status(201).json(newPost);
});

app.put("/api/blog/:id", async (req, res) => {
	const data = await readData();
	const index = data.blogPosts.findIndex((p) => p.id === req.params.id);
	if (index !== -1) {
		data.blogPosts[index] = { ...req.body, id: req.params.id };
		await writeData(data);
		res.json(data.blogPosts[index]);
	} else {
		res.status(404).json({ error: "Post not found" });
	}
});

app.delete("/api/blog/:id", async (req, res) => {
	const data = await readData();
	data.blogPosts = data.blogPosts.filter((p) => p.id !== req.params.id);
	await writeData(data);
	res.status(204).end();
});

// Fallback to index.html for SPA routing (Production)
app.get("/*splat", (req, res, next) => {
	if (!req.path.startsWith("/api")) {
		res.sendFile(path.join(DIST_PATH, "index.html"), (err) => {
			if (err) {
				next(); // Pass to 404 handler if file doesn't exist (e.g. during dev)
			}
		});
	} else {
		next();
	}
});

// Simple Auth check (token based)
const ADMIN_TOKEN = "admin123"; // In a real app, use env vars
app.post("/api/login", (req, res) => {
	const { password } = req.body;
	if (password === ADMIN_PASSWORD) {
		// Simple password
		res.json({ token: ADMIN_TOKEN });
	} else {
		res.status(401).json({ error: "Unauthorized" });
	}
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`);
});
