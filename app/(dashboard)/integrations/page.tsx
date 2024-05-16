import React from 'react'
import PageTitle from '@/app/components/PageTitle';
const breadcrumbs=[
    {
        name: 'Home',
        link: '/'
    },
    {
        name: 'Integrations',
        link: '/integrations'
    }
];
const Integrations = () => {
    return (<>
        <div className='flex justify-between items-center'>
            <PageTitle pageTitle="Integrations" icon={false} breadcrumbData={breadcrumbs} />                
        </div>
        <div className='p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full'>
            <div className="py-4">
                {/* <div>
                    <h1 className="text-4xl font-bold leading-tight mb-8">Integrations</h1>
                </div> */}
                <div className="bg-white rounded-lg p-3 xs:p-4 xs:shadow-lg md:p-6 mb-6">
                    <h2 className="text-lg font-semibold leading-tight text-black-100">Datastores</h2>
                    <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Snowflake"
                                className=""                                
                                src="/images/providers/snowflake.svg"                                
                                width={150}
                                height='auto'
                            />
                        </div>
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Postgres"
                                className=""                                                                
                                src="/images/providers/postgresq.png"
                                width={80}
                                height='auto'
                            />
                        </div>
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Amazon Redshift"
                                className=""                               
                                src="/images/providers/amazon-redshift.png"                                
                                width={200}
                                height='auto'
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-3 xs:p-4 xs:shadow-lg md:p-6 mb-6">
                    <h2 className="text-lg font-semibold leading-tight text-black-100">Notifications</h2>
                    <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Slack"
                                className=""                                
                                src="/images/providers/slack.svg"
                                height="auto"
                                width={100}
                            />
                        </div>
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Email"
                                className=""                                
                                src="/images/providers/email.png"
                                height="auto"
                                width={70}
                            />
                        </div>
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Pagerduty"
                                className=""
                                src="/images/providers/pagerduty.png"
                                height="auto"
                                width={85}
                            />
                        </div>
                    </div>
                </div>
                <div className="bg-white rounded-lg p-3 xs:p-4 xs:shadow-lg md:p-6 mb-6">
                    <h2 className="text-lg font-semibold leading-tight text-black-100">Compliance</h2>
                    <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Vanta"
                                className=""                               
                                src="/images/providers/vanta.svg"
                                height="auto"
                                width={100}
                            />
                        </div>
                        <div className="hidden" />
                        <div className="hidden" />
                    </div>
                </div>
                <div className="bg-white rounded-lg p-3 xs:p-4 xs:shadow-lg md:p-6 mb-6">
                    <h2 className="text-lg font-semibold leading-tight text-black-100">Monitoring</h2>
                    <div className="mt-6 grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Datadog"
                                className=""                                
                                src="/images/providers/data-dog.png"                                
                                width={90}
                                height="auto"
                            />
                        </div>
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Splunk"
                                className=""                                
                                src="/images/providers/splunk-logo-dark.svg"                                
                                width={100}
                                height="auto"
                            />
                        </div>
                        <div className="rounded overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200 ease-in-out bg-white inline-flex justify-center items-center h-[10rem]">
                            <img
                                alt="Weights Biases"
                                className="bg-black-100 p-2"                                
                                src="/images/providers/weights-biases.svg"                                
                                width={200}
                                height="auto"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}
export default Integrations;