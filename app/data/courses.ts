// Fetching of courses goes here

import axios from "axios";
import remarkParse from "remark-parse";
import { visit } from "unist-util-visit";
import { unified } from "unified";


interface Course {
	subject: string;
	title: string;
	url: string;
}

export async function parseCourses(): Promise<Course[]> {
	const { data: markdown } = await axios.get(
		"https://raw.githubusercontent.com/Developer-Y/cs-video-courses/master/README.md"
	);

	const tree = unified().use(remarkParse).parse(markdown);

	let currentSubject = "";
	let inTOC = true;
	const courses: Course[] = [];

	visit(tree, (node: any) => {
		// Skip all nodes until we pass the Table of Contents heading
		if (node.type === "heading" && node.depth === 2) {
			const headingText = node.children
				.map((c: any) => c.value)
				.join("")
				.trim();
			if (/table of contents/i.test(headingText)) {
				inTOC = true;
				return;
			}
			if (inTOC) {
				// we found the first heading after TOC — turn flag off
				inTOC = false;
			}
		}

		// Process only ### headings (subjects) after TOC
		if (!inTOC && node.type === "heading" && node.depth === 3) {
			currentSubject = node.children
				.map((c: any) => c.value)
				.join("")
				.trim();
		}

		// Process list items after current subject is set
		if (!inTOC && node.type === "listItem" && currentSubject) {
			const linkNode = node.children?.[0]?.children?.[0];
			if (linkNode?.type === "link") {
				const title = linkNode.children
					.map((c: any) => c.value)
					.join("");
				courses.push({
					subject: currentSubject,
					title,
					url: linkNode.url,
				});
			}
		}
	});

	return courses;
}



parseCourses().then((courses) => {
	//console.log("Subjects found:", [...new Set(courses.map((c) => c.subject))]);
	console.log("Total courses found: ", courses.length);
});

