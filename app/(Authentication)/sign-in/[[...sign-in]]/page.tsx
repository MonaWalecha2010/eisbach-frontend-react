import { SignIn } from "@clerk/nextjs";
import styles from '../../../styles/styles.module.scss'
export default function Page() {
  return <>
    <div className="grid grid-cols-1 md:grid-cols-8 gap-0 md:gap-5 place-content-center	">
      <div className="hidden md:block md:col-span-4 h-screen order-2 md:order-1" >  
        <div className={`relative h-full md:rounded-tr-[2.5rem] md:rounded-br-[2.5rem]   ${styles.authBg}`} style={{backgroundImage:'url(/images/javelin_flying_upwards_with_speed.png)'}}>
          <h2 className="absolute bottom-1 right-3 md:bottom-[2.25rem] md:right-[3.25rem] text-base md:text-xl text-white font-bold">Javelin</h2>
        </div>
      </div>
      <div className={`relative md:col-span-4 h-full overflow-y-auto md:py-5 md:justify-self-center md:pl-[3rem] flex items-center order-1 md:order-2 ${styles.smAuthbg}`}>            
        <div className={`mx-auto py-4 h-full flex flex-col justify-center`}>     
          <SignIn 
            appearance={{
              elements:{
                card:{
                  backgroundColor: 'rgba(255,255,255, 0.8)',                  
                }
              }
            }}
          />
          <h2 className="block mt-4 text-right mr-3 md:hidden text-xl text-white font-bold">Javelin</h2>
        </div> 
      </div>
    </div>    
  </>;
}