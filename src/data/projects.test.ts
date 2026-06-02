import { expect, test } from "vitest";
import { projects } from "./projects";

test("projects data is valid", () => {
	expect(Array.isArray(projects)).toBe(true);
	expect(projects.length).toBeGreaterThan(0);

	projects.forEach((project) => {
		expect(project).toHaveProperty("id");
		expect(project).toHaveProperty("title");
		expect(project).toHaveProperty("description");
		expect(project).toHaveProperty("tags");
		expect(project).toHaveProperty("date");
	});
});
