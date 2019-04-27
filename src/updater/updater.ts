import {execSync} from "child_process";
import {resolve} from "path";
import {existsSync, readdirSync, lstatSync, unlinkSync, rmdirSync} from "fs";

const rmrf = function(path:string) {
	if (existsSync(path)) {
		readdirSync(path).forEach(file => {
			let curPath = path + "/" + file;
			if (lstatSync(curPath).isDirectory()) {
				rmrf(curPath);
			} else {
				unlinkSync(curPath);
			}
		});
		rmdirSync(path);
	}
};
export function update(dir:string, repo: string) {
	const pth = resolve(process.cwd(), dir);
	const pthRepo = resolve(pth, repo);
	if (existsSync(pthRepo)){
		rmrf(pthRepo)
	}
	execSync(`git clone https://github.com/7aske/${repo}`, {cwd:pth, stdio:'inherit'});
}
