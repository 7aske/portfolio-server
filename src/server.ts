import express from "express";
import dotenv from "dotenv";
import { middleware } from "./middleware/middleware";
import { resolve } from "path";
import { mailer, resetIps } from "./middleware/mailer";
import { bodyparser } from "./middleware/bodyparser";
import { notFound } from "./middleware/notFound";
import { update } from "./updater/updater";

const env = dotenv.config({path: resolve(process.cwd(), "config/.env")});
if (env.error){
	throw env.error;
} else {
	console.log(env.parsed)
}
const server = express();

export const MAILER_TIMEOUT = 60 * 60 * 1000;
export const PORT: number = parseInt(process.env.PORT) || 3000;
export const REPO_DIR = process.env.REPO_DIR || "dist/static";
export const REPO_NAME = process.env.REPO_NAME || "portfolio";

setInterval(resetIps, MAILER_TIMEOUT);

server.use(bodyparser);
server.use(middleware);
server.use("/api/mailer", mailer);
server.use("/api", express.static(`${REPO_DIR}/${REPO_NAME}`));
server.use(express.static(`${REPO_DIR}/${REPO_NAME}`));
server.use(notFound);

update(REPO_DIR, REPO_NAME)

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
