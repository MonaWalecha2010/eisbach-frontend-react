
import { NextResponse } from "next/server";
import { MailConfig, toFromEmails } from "../mailConfig";

export async function POST(req: Request) {
    const {gateway_name , account_id, organization_id, organization_name, user_id, user_name, user_email} = await req.json()
    let nodemailer = require('nodemailer')
    const transporter = nodemailer.createTransport({...MailConfig})
    const mailData = {
        ...toFromEmails,
        subject: `JavelinUI - New Gateway Created`,
        text: `JavelinUI - New Gateway - Name : ${gateway_name} | Account ID :  ${account_id}`,
        html: ` <div>
                    <h2>Gateway Details </h2>               
                    <p> Gateway Name  : ${gateway_name} </p>
                    <p> Account ID : ${account_id} </p>                   
                    <h3>Other Details </h3> 
                    <p> Organization ID : ${organization_id} </p>
                    <p> Organization Name  : ${organization_name} </p>                    
                    <p> User ID : ${user_id} </p>
                    <p> User Name  : ${user_name} </p>
                    <p> User Email  : ${user_email} </p> 
                </div>`
    }
    const response = await transporter.sendMail(mailData);  
    return NextResponse.json(response)  
}
