import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {organizationId , data} = await req.json()
        try{
            const updatedmeta = await clerkClient.organizations.updateOrganizationMetadata(organizationId, {
                publicMetadata:{...data}
            });

            if(updatedmeta){
                return NextResponse.json({data : updatedmeta});
            }
        }catch(error){
            console.log(error);
            return NextResponse.json({error : error});
        }
}
