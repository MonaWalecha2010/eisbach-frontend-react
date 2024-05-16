import { describe } from 'node:test'
import React from 'react'

const ProcessorHub = () => {
    const processorHubData=[
        {
            title:"Competitor & Keyword Check",
            description: "Flags and filters competitor names from requests before sending them to the model"
        },
        { 
            title: "Sensitive Data Detection",
            description:"Detects PII, PHI and other sensitive fields in model requests and notifies, redacts or masks them before sending to models"
        },
        {
            title:"Hallucination Detection",
            description:"Detects hallucinations in model responses"
        },
        {
            title:" Check Malware",
            description:"Checks for Malware in model responses"
        },
        {
            title:"Check Phishing",
            description:"Checks for Phishing links in model responses"
        },
        {
            title:"Advanced Content Moderation",
            description:"Checks for toxic language, bias, profanity, restricted topics in model responses"
        },
        {
            title:"Regex Matching",
            description:"Detects and matches model requests against configured regex"
        },
        {
            title:"Prompt Injection Detection",
            description:"Detects for prompt injection attacks"
        },
        {
            title:"Jailbreak Detection",
            description:"Checks for jailbreak attempts"
        },
        {
            title:"Archive",
            description:"Archives Request & Response pairs"
        },
        {
            title:"Enhanced Telemetry",
            description:"Provides enhanced request and response telemetry back in response"
        },
        {
            title:"Prompt Decorator",
            description:"Decorates prompt with additional information"
        },
        {
            title:"Model Accuracy Checker & Annotator",
            description:"Checks model accuracy by validating output with another LLM and scores the response with accuracy score"
        },
        {
            title:"Detect Secrets & Sensitive Credentials",
            description:"Detects secrets and sensitive credentials in model requests and notifies, redacts or masks them before sending to models"
        },
        {
            title:"Custom Validators",
            description:"Custom validators to validate formatting or structure of model requests and responses"
        },
        {
            title:"Garbage & Repeated Content Detection",
            description:"Detects garbage and repeated content in model responses"
        },
        {
            title:"Trigger Webhook",
            description:"Triggers a webhook based on model response"
        },
    ]

  return (
    <div className="h-full min-h-[69vh]">
        <div className="grid grid-cols-6 gap-x-4 gap-y-3">
            {processorHubData && processorHubData.map((data,index)=>{
                return(
                    <div key={`phub-${index}`} className="col-span-6 sm:col-span-3 lg:col-span-2 rounded-md px-3 py-3 shadow-sm border bg-white border-blue-700">
                        <h3 className="text-black-100 text-[.725rem] sm:text-xs font-semibold">{data.title}</h3>
                        <p className='text-gray-700 text-[.725rem] sm:text-xs'>{data.description}</p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ProcessorHub