'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
export default function Home() {
  const router = useRouter()
  useEffect(()=>{
    // router.push('/productionServices')
    router.push('/gateways')
  })
  return (
    <> 
    {/* <div className="grid grid-cols-7 gap-5 place-content-center	">  
      <div className="col-span-3 h-screen">  
      { console.log('productionServices')}  
        <img
          className={`w-full ${styles.image_fluid} lg:rounded-tr-[2.5rem] lg:rounded-br-[2.5rem]`}
          src="/images/soufiane-boissady-SmYgs9HJZu8-unsplash.jpg"        
          alt="soufiane-boissady-SmYgs9HJZu8-unsplash"
        />
      </div>
      <div className="relative col-span-4 py-5 pl-[4rem] flex items-center ">
        <div className='mr-auto max-w-[575px]  '>          
          <h1 className='text-[3rem] font-[700] text-primary-100'>Success! Welcome to Javelin Preview!</h1>          
          <div className='my-4 text-black-100'>Enjoy the closed alpha free of charge. During the closed alpha, we appreciate your feedback and ask you to keep instances tidy and delete instances not in use. We may reach out from time to time about idle instances.</div>
            <div className='my-4 text-black-100'>As we introduce production resource pricing in our Beta, for those production workloads in our alpha, we will apply a deep, long-term discount to those workloads, along with a great swag box.</div>
          <div className='my-4 text-black-100'>Click <Link href="/gateways" className='text-primary-300'> here</Link> to navigate to the <Link href="/gateways" className='text-primary-300'>Javelin Dashboard</Link></div>
          <div className='flex items-center justify-start mt-5'>
            <h2 className='text-[1.5rem] font-bold mr-5 text-black-100'>Time to build. Let&apos;s go</h2>
            <Link href='/gateways' className='btn border-primary-100 text-sm text-white bg-primary-100 rounded-full inline-flex items-center hover:bg-primary-100 hover:text-white'>Javelin Dashboard</Link>
          </div>
        </div>
      </div>
    </div> */}
    </>
  )
}
