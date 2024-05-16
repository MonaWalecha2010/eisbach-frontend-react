import { clerkClient } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const payload = await req.json()
  let organization = await clerkClient.organizations.createOrganization(payload);
  return NextResponse.json(organization);
}