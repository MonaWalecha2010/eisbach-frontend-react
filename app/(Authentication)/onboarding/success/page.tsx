import React from 'react'
import styles from '../../../styles/styles.module.scss';
import Link from 'next/link';
const success = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-8 gap-5 place-content-center">  
        <div className="lg:col-span-4 h-screen order-2 lg:order-1">
          <div className={`relative h-full md:rounded-tr-[2.5rem] md:rounded-br-[2.5rem]   ${styles.authBg}`} style={{backgroundImage:'url(/images/javelin_flying_upwards_with_speed.png)'}}>
            <h2 className="absolute bottom-1 right-3 md:bottom-[2.25rem] md:right-[3.25rem] text-base md:text-xl text-white font-bold">Javelin</h2>
          </div>           
        </div>
      <div className="relative lg:col-span-4 px-3 py-5 md:px-0 sm:pl-[3rem] md:pl-[4rem] flex items-center order-1 lg:order-2">
        <div className='text-left md:mr-auto max-w-[575px] md:max-w-[28.875rem]  '>          
          <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-[700] text-primary-100'>Success! Welcome to Javelin Cloud!</h1>
          {/* <h1 className='text-[2rem] font-bold'>Welcome to Javelin Ui!</h1> */}
          <div className='my-4 text-black-100'>You&apos;ve successfully joined Javelin Cloud! From here, you can navigate to the Javelin Dashboard, where you can manage and safeguard your production large language model (LLM) application workloads with ease.</div>                      
          <div className='flex items-center flex-wrap justify-start mt-5'>
            <h2 className='text-base font-bold mr-5 text-black-100'>Lets go!</h2>
            <Link href='/gateways' className='btn btn-sm border-primary-100 text-white bg-primary-100 rounded-full inline-flex items-center hover:bg-primary-100 hover:text-white text-xs'>Javelin Dashboard</Link>
          </div>
          <div className='text-primary-100 w-full text-center mt-[3rem] font-medium text-xs'>Step &nbsp;<span className='font-bold text-md text-primary-100'> 3 &nbsp; </span> of &nbsp;3&nbsp; </div>
        </div>
      </div>
    </div>
  )
}

export default success