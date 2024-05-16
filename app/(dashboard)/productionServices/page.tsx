import React from 'react'
import Link from 'next/link'
import PageTitle from '@/app/components/PageTitle'
import CardOne from '@/app/components/card/CardOne'
import styles from '../../styles/styles.module.scss'
const ProductionServices = () => {
    const breadcrumbs=[
        {
            name: 'Home',
            link: '/'
        },
        {
            name: 'Production Services',
            link: '/productionServices'
        }
    ];
    return (<>
        <div className='flex justify-between items-center'>
            <PageTitle pageTitle="Production Services" icon={false} breadcrumbData={breadcrumbs} />                
        </div>
        <div className='p-4 md:px-6 md:py-6 border rounded-xl bg-white border-blue-700 h-full min-h-[82vh]'>
            <div className="flex flex-wrap gap-4">
                <CardOne classList='relative rounded-xl w-full mx-auto sm:mx-0 max-w-[17.5rem] sm:max-w-auto sm:min-w-[17.5rem] lg:min-w-[24.875rem] min-h-[17rem] sm:w-auto p-3 md:py-[32px] md:px-[1.75rem] lg:py-[.938rem]'>
                    <Link className='h-full flex flex-col items-center justify-center cursor-pointer' href='/evaluations'>                                   
                        <div className='flex flex-col items-center justify-between'>                                      
                            <p className={`mt-1 ${styles.card_text} text-black-100 text-center text-bold`}>Model & Application <br /> Evaluations</p>
                        </div>          
                    </Link>
                </CardOne>
                <CardOne classList='relative rounded-xl w-full mx-auto sm:mx-0 max-w-[17.5rem] sm:max-w-auto sm:min-w-[17.5rem] lg:min-w-[24.875rem] min-h-[17rem] sm:w-auto p-3 md:py-[32px] md:px-[1.75rem] lg:py-[.938rem]'>
                    <Link className='h-full flex flex-col items-center justify-center cursor-pointer' href='/gateways'>                                   
                        <div className='flex flex-col items-center justify-between'>                                      
                            <p className={`mt-1 ${styles.card_text} text-black-100`}>Routing and Guardrails</p>
                        </div>          
                    </Link>
                </CardOne>
            </div>
        </div>
    </>)
}

export default ProductionServices