/* This is a script to create a new post markdown file with front-matter */

import fs from "node:fs";
import path from "node:path";

function getDate() {
	const now = new Date();
	const totalDiffMinutes = now.getTimezoneOffset();
	const diffHours = String(
		Math.abs(Math.floor(totalDiffMinutes / 60)),
	).padStart(2, "0");
	const diffMinutes = String(Math.abs(totalDiffMinutes % 60)).padStart(2, "0");

	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");
	const minutes = String(now.getMinutes()).padStart(2, "0");
	const seconds = String(now.getSeconds()).padStart(2, "0");

	const tzSign = totalDiffMinutes >= 0 ? "-" : "+";

	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}${tzSign}${diffHours}:${diffMinutes}`;
}

function getDateDir() {
	const now = new Date();
	const year = now.getFullYear();
	const month = String(now.getMonth() + 1).padStart(2, "0");
	const day = String(now.getDate()).padStart(2, "0");
	const hours = String(now.getHours()).padStart(2, "0");

	return `${year}/${month}/${day}${hours}`;
}

const args = process.argv.slice(2);

if (args.length === 0) {
	console.error(`Error: No filename argument provided
Usage: npm run new-post -- <filename>`);
	process.exit(1); // Terminate the script and return error code 1
}

let fileName = args[0];

// Add .md extension if not present
const fileExtensionRegex = /\.(md|mdx)$/i;
if (!fileExtensionRegex.test(fileName)) {
	fileName += ".md";
}

const targetDir = `./src/content/posts/${getDateDir()}/`;
const fullPath = path.join(targetDir, "index.md");

if (fs.existsSync(fullPath)) {
	console.error(`Error: File ${fullPath} already exists `);
	process.exit(1);
}

// recursive mode creates multi-level directories
const dirPath = path.dirname(fullPath);
if (!fs.existsSync(dirPath)) {
	fs.mkdirSync(dirPath, { recursive: true });
}

const content = `---
title: ${args[0]}
published: ${getDate()}
updated: ${getDate()}
description: ''
image: ''
tags: []
category: ''
draft: false 
lang: ''
---
`;

fs.writeFileSync(path.join(targetDir, "index.md"), content);

console.log(`Post ${fullPath} created`);
