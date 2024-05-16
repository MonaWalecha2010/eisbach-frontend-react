
import { NextResponse } from "next/server";
import { MailConfig, toFromEmails } from "../mailConfig";

export async function POST(req: Request) {
  const {email , organization, organization_id} = await req.json()
  let nodemailer = require('nodemailer')
  const transporter = nodemailer.createTransport({...MailConfig})
  const mailData = {
    ...toFromEmails,
    subject: `JavelinUI - New User with email ${email} onboarded`,
    text: `JavelinUI - New User with Email ${email} | orgnization : ${organization} | Organisation ID :  ${organization_id}`,
    html: `<div>
                <h2>JavelinUI </h2>
                <p> New User Onboarded on JavelinUi </p>
                <p> Email : ${email} </p>
                <p> Orgnization : ${organization} </p>
                <p> Organisation ID : ${organization_id} </p>
            </div>`
  }
  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, function (err:any, info:any) {
      if(err){
        reject(err)
        return NextResponse.json({status: 400, error:err})
      }else{
        resolve(info);
        return NextResponse.json({status: 200, error:info})
      }
    })
  });
  return NextResponse.json({status: 200})  
}
