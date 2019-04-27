import { NextFunction, Request, Response } from "express";
interface Indexable {
	[state: string]: string;
}
export function bodyparser(req: Request, res: Response, next: NextFunction) {
	let data = "";
	req.on("data", chunk => {
		data += chunk;
	});
	req.on("end", () => {
		data = data.replace("%40", "@");
		if (req.headers["content-type"] === "application/x-www-form-urlencoded") {
			req.body = parseUrlencoded(data);
		} else if (req.headers["content-type"] === "application/json") {
			req.body = parseJSON(data);
		} else {
			req.body = data;
		}
		next();
	});
}

function parseUrlencoded(data: string): any {
	const out: Indexable  = {};
	const keyValPairs = data.split("&");
	keyValPairs.forEach(kv => {
		let fields = kv.split("=");
		if (fields.length === 2) {
			out[fields[0]] =fields[1];
		}
	});
	Object.freeze(out);
	return out;
}

function parseJSON(data: string): any {
	return JSON.parse(data);
}
