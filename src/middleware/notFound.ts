import { NextFunction, Request, Response } from "express";
import { resolve } from "path";

export function notFound(req: Request, res: Response, next: NextFunction) {
	res.status(404).sendFile(resolve(process.cwd(), "dist/static/pages/404.html"));
}
