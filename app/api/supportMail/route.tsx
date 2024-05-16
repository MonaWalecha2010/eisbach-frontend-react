
import { NextResponse } from "next/server";
import { MailConfig, toFromEmails } from "../mailConfig";

export async function POST(req: Request) {
  const data = await req.json()
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({...MailConfig})
  const mailData = {
    ...toFromEmails,
    subject: `JavelinUI - New Support Request - ${data?.subject}`,
    attachments: [...data?.screenshots],
    text: `JavelinUI \n
            New Support Request \n
            User : ${data?.email} \n
            What are you are having problem with? : ${data?.api_issues} \n
            Which project is affected? : ${data?.gateway} \n
            Severity : ${data?.severity} \n
            Which library you are having problem with? : ${data?.library} \n
            Message : ${data?.message} `,
    html: `<div>
                <h2>JavelinUI </h2>
                <p> New Support Request </p>
                <p> User : ${data?.email} </p>
                <p> What are you are having problem with? : ${data?.api_issues} </p>
                <p> Which project is affected? : ${data?.gateway} </p>
                <p> Severity : ${data?.severity} </p>
                <p> Which library you are having problem with? : ${data?.library} </p>
                <p> Message : ${data?.message} </p>
            </div>`
  } 
  const info = await transporter.sendMail(mailData);
  return NextResponse.json(info);
}
