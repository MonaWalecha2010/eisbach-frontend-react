import { DynamoDB } from 'aws-sdk';
import { NextResponse, NextRequest } from 'next/server';
const AWSConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
  sessionToken: process.env.AWS_SESSION_TOKEN
};
const dynamoDB = new DynamoDB.DocumentClient(AWSConfig);
export async function GET(req:NextRequest) {
  let namespace = req.nextUrl.searchParams.get("namespace")
  try {
  const params = {
    TableName: namespace + '-LogsTable',
  };
  const result = await dynamoDB.scan(params).promise()
  // console.log(JSON.stringify(result.Items))
  return NextResponse.json({status : 200 , data: result.Items});    
  } catch (error) {
    console.error('Error fetching item:', error);
    return NextResponse.json({ error: 'Failed to fetch item' });
  }
}