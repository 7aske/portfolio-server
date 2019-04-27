import { NextFunction, Request, Response } from "express";
import { resolve } from "path";
import nodemailer from "nodemailer";

export async function mailer(req: Request, res: Response, next: NextFunction) {
	if (req.method.toUpperCase() == "POST") {
		if (req.body.hasOwnProperty("name")
			&& req.body.hasOwnProperty("email")
			&& req.body.hasOwnProperty("message")) {
			try {
				await sendMail(req.body);
				res.status(200).sendFile(resolve(process.cwd(), "dist/static/pages/mail_success.html"));
			} catch (e) {
				console.log(e);
				res.status(400).sendFile(resolve(process.cwd(), "dist/static/pages/mail_error.html"));
			}
		}
	}
	next();
}

const sendMail = async (body: any) => {
	const username = process.env.MAILER_USERNAME;
	const password = process.env.MAILER_PASSWORD;
	const mailto = process.env.MAILER_SENDTO;

	// create reusable transporter object using the default SMTP transport
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: username, // generated ethereal user
			pass: password, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: `"Portfolio Mailer 🤖" <${username}@gmail.com>`, // sender address
		to: mailto, // list of receivers
		subject: "Portfolio Message ✔", // Subject line
		text: `${body["name"]} ${body["email"]}\n${body["message"]}`, // plain text body
		html: htmlTemplate(body), // html body
	});
	console.log("Message sent: %s", info.messageId);
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

        .body h3 i {
            font-weight: 700;
        }
    </style>
</head>
<body>
<div class="body">
    <h3>${body["name"]} <i>${body["email"]}</i></h3>
    <h5>Message:</h5>
    <p>${body["message"]}</p>
</div>
</body>
</html>`;
}
