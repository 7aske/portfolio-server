import { NextFunction, Request, Response } from "express";
import { resolve } from "path";
import nodemailer from "nodemailer";

let recentIps: any = {};

export async function mailer(req: Request, res: Response, next: NextFunction) {

	if (req.method.toUpperCase() == "POST") {
		if (recentIps[req.ip] == undefined){
			recentIps[req.ip] = 0;
		}
		if (recentIps[req.ip] < 2){
			if (req.body.hasOwnProperty("name") &&
				req.body.hasOwnProperty("email") &&
				req.body.hasOwnProperty("message")) {
				try {
					await sendMail(req.body);
					recentIps[req.ip] += 1;
					res.location("/").status(200).sendFile(resolve(process.cwd(), "dist/static/pages/mail_success.html"));
				} catch (e) {
					console.log(e);
					res.location("/").status(400).sendFile(resolve(process.cwd(), "dist/static/pages/mail_error.html"));
				}
			}
		} else {
			res.status(429).sendFile(resolve(process.cwd(), "dist/static/pages/mail_429.html"));
		}

	}
	next();
}

export function resetIps() {
	recentIps = {};
}

const sendMail = async (body: any) => {
	const username = process.env.MAILER_USERNAME;
	const password = process.env.MAILER_PASSWORD;
	const mailto = process.env.MAILER_SENDTO;

	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false,
		auth: {
			user: username,
			pass: password,
		},
	});

	let msg = await transporter.sendMail({
		from: `"Portfolio Mailer 🤖" <${username}@gmail.com>`,
		to: mailto, // list of receivers
		subject: "Portfolio Message ✔",
		text: `${body["name"]} ${body["email"]}\n${body["message"]}`,
		html: htmlTemplate(body),

	});
	console.log("Message sent: %s", msg.messageId);
};

function htmlTemplate(body: any): string {
	return `<!doctype html>
	<html lang="en">
	<head>
    <style>
        body, html {
            margin: 0;
            padding: 0;
            font-family: Helvetica, sans-serif;
			width: 500px;
        }
        a {
        	text-decoration: none;
        	color: #232323;
        }
        .body {
            margin: 10px;
            padding: 10px;
            background-color: #f5f5f5f5;
            border: 2px solid #aaaaaa;
            border-radius: 7px;
        }
        .body p {
            width: 500px;
        }
        .body h3 {
            font-weight: normal;
        }
		.body h2 {
            font-weight: 700;
		}
        .body h3 i {
        	font-style: italic;
        }
    </style>
</head>
<body>
<div class="body">
    <h2>${body["name"]}<h3>
    <h3><a href="mailto:${body["email"]}?body=Response"><i>${body["email"]}</i></a>	</h3>
    <hr>
    <h5>Message:</h5>
    <p>${body["message"]}</p>
</div>
</body>
</html>`;
}
