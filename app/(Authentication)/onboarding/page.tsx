'use client';
import React, {useEffect} from 'react'
import styles from '../../styles/styles.module.scss'
import { useRouter } from 'next/navigation';
import { useClerk } from "@clerk/clerk-react";
import { CircleCloseXs } from '@/app/components/icons/svgIcons';
import Link from 'next/link';
export default function Page() {
  const { signOut } = useClerk();
  const router = useRouter();

  return (
      <div className="grid grid-cols-1 lg:grid-cols-8 gap-5 place-content-center">  
        <div className="lg:col-span-4 h-screen order-2 lg:order-1"> 
          <div className={`relative h-full md:rounded-tr-[2.5rem] md:rounded-br-[2.5rem]   ${styles.authBg}`} style={{backgroundImage:'url(/images/javelin_flying_upwards_with_speed.png)'}}>
            <h2 className="absolute bottom-1 right-3 md:bottom-[2.25rem] md:right-[3.25rem] text-base md:text-xl text-white font-bold">Javelin</h2>
          </div> 
        </div>
        <div className="relative lg:col-span-4 px-3 py-5 md:px-0 sm:pl-[3rem] md:pl-[4rem] flex items-center order-1 lg:order-2">
          <div className='text-left md:mr-auto max-w-[560px] md:max-w-[28.875rem]'>
            <div className='absolute top-1 right-1 md:top-5 md:right-5'>
              <button onClick={() => signOut(() => router.push("/sign-in"))} className='btn btn-sm border-primary-100 text-xs text-white bg-primary-100 rounded-full inline-flex items-center hover:bg-primary-100 hover:text-white w-[30px] h-[30px] p-0 md:p-2 md:w-auto md:h-auto'><span className='hidden md:block'>Exit</span> <CircleCloseXs color="white" /></button>
            </div>
            <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-5xl font-[700] text-primary-100'>Welcome to Javelin Cloud!</h1>            
            <div className='my-4 text-sm text-black-100'>You are exclusively invited to participate in our closed alpha phase completely free of charge. During this period, your insights and experiences are incredibly valuable to us, and we look forward to your constructive feedback.</div>
            <div className='my-4 text-sm text-black-100'>As we prepare to evolve into the Beta phase, which will introduce a pricing model for production workloads, we promise to honor your early support. All active production workloads from the alpha will benefit from a significant, ongoing discount.</div>
            <div className='flex items-center justify-start mt-5'>
              <h2 className='text-base font-bold mr-5 text-black-100'>Ready to embark on this journey? </h2>
              <Link href='/onboarding/create-organization' className='btn btn-sm border-primary-100 text-white bg-primary-100 rounded-full inline-flex items-center hover:bg-primary-100 hover:text-white text-xs'>Get Started</Link>
            </div>
            <div className='text-primary-100 w-full text-center mt-[3rem] font-medium text-xs'>Step &nbsp;<span className='font-bold text-md text-primary-100'> 1 &nbsp; </span> of &nbsp;3&nbsp; </div>
          </div>
        </div>
      </div>
  )
}