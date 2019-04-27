import { NextFunction, Request, Response } from "express";
import { resolve } from "path";

const invalidPaths: string[] = ["/.git", "package.json", "package-lock.json", ".gitignore"];

// TODO: lol not like this
function isPathValid(path: string): boolean {
	if (path.startsWith("/.")) {
		return false;
	}
	for (let i = 0; i < invalidPaths.length; i++) {
		const p = invalidPaths[i];
		if (path.indexOf(p) != -1) {
			return false;
		}
	}
	return true;
}

export function middleware(req: Request, res: Response, next: NextFunction) {
	if (isPathValid(req.path)) {
		next();
	} else {
		res.status(404).sendFile(resolve(process.cwd(), "dist/static/pages/404.html"));
	}
}
